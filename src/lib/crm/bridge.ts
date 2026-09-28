// n8n Telegram CRM bridge — pure, testable core. Lovable Cloud stays the only DB writer.
import { timingSafeEqual } from "crypto";
import { z } from "zod";

export const CRM_ACTIONS = [
  "Contacted", "Interested", "No Response", "Trial Booked", "Trial Attended",
  "Reschedule", "Hold", "Converted", "Lost", "Add Note",
] as const;

const id = (max: number) => z.union([z.string().trim().min(1).max(max), z.number().int()]).transform(String);

export const crmRequestSchema = z.object({
  crm_lead_id: z.string().trim().regex(/^YJ-WEB-\d{4,}$/),
  action: z.enum(CRM_ACTIONS),
  note: z.string().trim().max(1000).optional().nullable(),
  telegram_user_id: id(40).refine((v) => /^-?\d{1,20}$/.test(v)),
  telegram_chat_id: id(40).refine((v) => /^-?\d{1,20}$/.test(v)),
  request_id: z.string().trim().min(8).max(120).regex(/^[A-Za-z0-9._:-]+$/),
}).refine((d) => d.action !== "Add Note" || (d.note && d.note.length > 0), { path: ["note"] });

export type CrmRpc = (args: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;

type Result = { status: number; body: Record<string, unknown> };
const err = (status: number, error: string): Result => ({ status, body: { ok: false, error } });

export function bearerMatches(header: string | null, secret: string | undefined): boolean {
  if (!secret) return false;
  const m = /^Bearer (.+)$/.exec(header ?? "");
  if (!m) return false;
  const a = Buffer.from(m[1]), b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function handleCrmControl(
  input: { authorization: string | null; body: unknown },
  deps: { secret: string | undefined; rpc: CrmRpc },
): Promise<Result> {
  if (!deps.secret) return err(503, "Disabled");
  if (!bearerMatches(input.authorization, deps.secret)) return err(401, "Unauthorized");
  const p = crmRequestSchema.safeParse(input.body);
  if (!p.success) return err(400, "Invalid request");
  const d = p.data;
  const { data, error } = await deps.rpc({
    p_request_id: d.request_id, p_crm_lead_id: d.crm_lead_id, p_action: d.action,
    p_note: d.note || null, p_tg_user: d.telegram_user_id, p_tg_chat: d.telegram_chat_id,
  });
  if (error) return err(500, "Update failed");
  const r = (data ?? {}) as Record<string, unknown>;
  if (r.outcome === "not_found") return err(404, "Lead not found");
  if (r.outcome !== "updated" && r.outcome !== "duplicate") return err(500, "Update failed");
  return {
    status: 200,
    body: {
      ok: true,
      duplicate: r.outcome === "duplicate",
      crm_lead_id: r.crm_lead_id,
      source_uuid: r.source_uuid,
      status: r.status ?? null,
      updated_at: r.updated_at,
      // Safe data for n8n to mirror into the CRM Sheet (match Source UUID, then CRM Lead ID).
      sheet_mirror: { match: ["Source UUID", "CRM Lead ID"], "Lead Status": r.status ?? null },
    },
  };
}
