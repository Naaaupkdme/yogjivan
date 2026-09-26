// Lead outbox dispatcher (server-only). Uses the service-role client.
// Never selects health_notes or health_tags. Never logs lead PII.

import { buildLeadPayload, type LeadPayload, type LeadRow } from "./payload";
import { formatTelegramAlert, crmLink } from "./telegram-format";
import { planSheetUpsert, cellRange } from "./sheet-plan";
import { telegramOutcome, sheetOutcome, type Outcome } from "./outcomes";

const GATEWAY = "https://connector-gateway.lovable.dev";
const LEAD_COLS =
  "id,crm_lead_id,name,whatsapp,email,goals,preferred_experience,preferred_time,experience_level,status,source,session_id,meta,created_at,updated_at,health_present";

type Admin = any; // service-role supabase client (typed loosely for new RPCs)

export type Settings = {
  telegram_enabled: boolean;
  telegram_chat_id: string | null;
  sheet_enabled: boolean;
  spreadsheet_id: string | null;
  sheet_tab: string | null;
  sheet_gid: number | null;
  dispatch_token: string;
};

export function channelReadiness(s: Settings, env: Record<string, string | undefined>) {
  const lovable = Boolean(env.LOVABLE_API_KEY);
  return {
    sheet: s.sheet_enabled && lovable && Boolean(env.GOOGLE_SHEETS_API_KEY) && Boolean(s.spreadsheet_id && s.sheet_tab),
    telegram: s.telegram_enabled && lovable && Boolean(env.TELEGRAM_API_KEY) && Boolean(s.telegram_chat_id),
  };
}

function nextAt(sec: number) {
  return new Date(Date.now() + sec * 1000).toISOString();
}

async function prepare(admin: Admin) {
  const { data: rows } = await admin.from("lead_outbox").select("lead_id").is("prepared_at", null).limit(20);
  let n = 0;
  for (const r of rows ?? []) {
    const { data: lead } = await admin.from("leads").select(LEAD_COLS).eq("id", r.lead_id).maybeSingle();
    if (!lead) continue;
    const { payload, reply } = buildLeadPayload(lead as LeadRow);
    await admin.from("leads").update({
      country_code: payload.phone.country_code,
      mobile_number: payload.phone.mobile_number,
      whatsapp_full_number: payload.phone.whatsapp_full_number,
      phone_validation: payload.phone.phone_validation === "valid" ? "valid" : `needs_review:${payload.phone.reason}`,
      phone_normalized_at: new Date().toISOString(),
    }).eq("id", r.lead_id);
    const { error } = await admin.from("lead_outbox")
      .update({ prepared_at: new Date().toISOString(), reply_text: reply, payload, updated_at: new Date().toISOString() })
      .eq("lead_id", r.lead_id).is("prepared_at", null);
    if (!error) n++;
  }
  return n;
}

async function gw(path: string, connKey: string, init: RequestInit & { timeoutMs?: number }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), init.timeoutMs ?? 10000);
  try {
    return await fetch(`${GATEWAY}${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(t);
  }
}

function rangePath(r: string) {
  return r.replace(/ /g, "%20").replace(/'/g, "%27");
}

async function readSheet(s: Settings, key: string): Promise<string[][]> {
  const range = rangePath(`'${s.sheet_tab!.replace(/'/g, "''")}'!A1:AZ`);
  const res = await gw(`/google_sheets/v4/spreadsheets/${s.spreadsheet_id}/values/${range}?valueRenderOption=FORMATTED_VALUE`, key, { method: "GET" });
  if (!res.ok) throw Object.assign(new Error(`read ${res.status}: ${(await res.text()).slice(0, 200)}`), { status: res.status });
  const j = (await res.json()) as { values?: string[][] };
  return j.values ?? [];
}

async function upsertToSheet(s: Settings, key: string, p: LeadPayload): Promise<number> {
  // Re-read immediately before writing (the caller holds the global sheet lock).
  const values = await readSheet(s, key);
  const plan = planSheetUpsert(values, p);
  if (!plan.writes.length) return plan.row;
  const body = {
    valueInputOption: "RAW", // RAW: values are never interpreted as formulas
    data: plan.writes.map((w) => ({ range: cellRange(s.sheet_tab!, w), values: [[w.value]] })),
  };
  const res = await gw(`/google_sheets/v4/spreadsheets/${s.spreadsheet_id}/values:batchUpdate`, key, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw Object.assign(new Error(`write ${res.status}: ${(await res.text()).slice(0, 200)}`), { status: res.status });
  return plan.row;
}

function applyOutcome(prefix: "sheet" | "telegram", o: Outcome, attempts: number) {
  const base: Record<string, unknown> = {
    [`${prefix}_lease_owner`]: null,
    [`${prefix}_lease_until`]: null,
    [`${prefix}_retry_count`]: attempts,
    updated_at: new Date().toISOString(),
  };
  if (o.kind === "sent") return { ...base, [`${prefix}_status`]: "sent", [`${prefix}_last_error`]: null };
  if (o.kind === "retry")
    return { ...base, [`${prefix}_status`]: "retry", [`${prefix}_last_error`]: o.error, [`${prefix}_next_attempt_at`]: nextAt(o.afterSeconds) };
  return { ...base, [`${prefix}_status`]: o.kind, [`${prefix}_last_error`]: o.error };
}

async function runSheets(admin: Admin, s: Settings, owner: string) {
  const key = process.env.GOOGLE_SHEETS_API_KEY!;
  const { data: locked } = await admin.rpc("try_automation_lock", { p_name: "sheet-upsert", p_owner: owner, p_seconds: 90 });
  if (!locked) return 0;
  let n = 0;
  try {
    const { data: rows } = await admin.rpc("claim_lead_outbox", { p_channel: "sheet", p_owner: owner, p_limit: 10, p_lease_seconds: 90 });
    for (const row of rows ?? []) {
      const attempts = row.sheet_retry_count + 1;
      let patch: Record<string, unknown>;
      try {
        const sheetRow = await upsertToSheet(s, key, row.payload as LeadPayload);
        patch = { ...applyOutcome("sheet", { kind: "sent" }, attempts), sheet_row: sheetRow, sheet_synced_at: new Date().toISOString() };
        n++;
      } catch (e) {
        const status = (e as { status?: number }).status ?? null;
        patch = applyOutcome("sheet", sheetOutcome(status, (e as Error).message, attempts), attempts);
      }
      await admin.from("lead_outbox").update(patch).eq("lead_id", row.lead_id).eq("sheet_lease_owner", owner);
    }
  } finally {
    await admin.rpc("release_automation_lock", { p_name: "sheet-upsert", p_owner: owner });
  }
  return n;
}

async function runTelegram(admin: Admin, s: Settings, owner: string) {
  const key = process.env.TELEGRAM_API_KEY!;
  const { data: rows } = await admin.rpc("claim_lead_outbox", { p_channel: "telegram", p_owner: owner, p_limit: 10, p_lease_seconds: 60 });
  let n = 0;
  for (const row of rows ?? []) {
    const attempts = row.telegram_retry_count + 1;
    const p = row.payload as LeadPayload;
    const crm = s.spreadsheet_id ? crmLink(s.spreadsheet_id, s.sheet_gid, row.sheet_row ?? null) : null;
    const msg = formatTelegramAlert(p, row.reply_text ?? "", crm);
    let res: { status: number; body: any } | null = null;
    let netErr: string | null = null;
    try {
      const r = await gw("/telegram/sendMessage", key, {
        method: "POST",
        timeoutMs: 10000,
        body: JSON.stringify({ chat_id: s.telegram_chat_id, text: msg.text, reply_markup: msg.reply_markup, disable_web_page_preview: true }),
      });
      let body: any = null;
      try { body = await r.json(); } catch { body = null; }
      res = { status: r.status, body };
    } catch (e) {
      netErr = (e as Error).name === "AbortError" ? "timeout" : "network error";
    }
    const o = telegramOutcome(res, netErr, attempts);
    const patch: Record<string, unknown> = applyOutcome("telegram", o, attempts);
    if (o.kind === "sent") {
      patch.telegram_message_id = res?.body?.result?.message_id ?? null;
      patch.telegram_sent_at = new Date().toISOString();
      n++;
    }
    await admin.from("lead_outbox").update(patch).eq("lead_id", row.lead_id).eq("telegram_lease_owner", owner);
  }
  return n;
}

export async function dispatchLeads(admin: Admin, s: Settings) {
  const owner = crypto.randomUUID();
  await admin.rpc("recover_lead_outbox_leases");
  const prepared = await prepare(admin);
  const ready = channelReadiness(s, process.env as Record<string, string | undefined>);
  // Sheets first so the Telegram alert can deep-link to the CRM row.
  const sheets = ready.sheet ? await runSheets(admin, s, owner) : 0;
  const telegram = ready.telegram ? await runTelegram(admin, s, owner) : 0;

  const { count } = await admin.from("lead_outbox")
    .select("lead_id", { count: "exact", head: true })
    .or(
      [
        "prepared_at.is.null",
        ready.sheet ? "sheet_status.in.(pending,retry,processing)" : null,
        ready.telegram ? "telegram_status.in.(pending,retry,processing)" : null,
      ].filter(Boolean).join(","),
    );
  if ((count ?? 0) > 0) await admin.rpc("lead_outbox_arm_retry");
  return { prepared, sheets, telegram, ready };
}
