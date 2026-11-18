import { formatFeedbackAlert, NOTIFY_MAX_ATTEMPTS } from "./feedback";

type Admin = any;
const COLS = "id,ticket_id,kind,message,page_path,lang,has_contact,notify_attempts";

/** Sends one feedback alert to the staff Telegram chat. Returns final status. */
async function sendOne(admin: Admin, row: any, chatId: string): Promise<string> {
  const lovable = process.env.LOVABLE_API_KEY, tg = process.env.TELEGRAM_API_KEY;
  const attempts = (row.notify_attempts ?? 0) + 1;
  let status = "failed", error: string | null = null;
  try {
    const r = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: { Authorization: `Bearer ${lovable}`, "X-Connection-Api-Key": tg!, "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: formatFeedbackAlert(row), parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) status = "sent";
    else error = `http ${r.status}`;
  } catch (e) {
    error = (e as Error).name === "TimeoutError" ? "timeout" : "network error";
  }
  if (status !== "sent" && attempts >= NOTIFY_MAX_ATTEMPTS) status = "dead";
  await admin.from("help_feedback").update({
    notify_status: status, notify_attempts: attempts, notify_error: error,
    notified_at: status === "sent" ? new Date().toISOString() : null,
  }).eq("id", row.id);
  return status;
}

/** Notify the new row, then retry up to 3 older unsent rows (bounded catch-up). */
export async function notifyFeedback(admin: Admin, id: string): Promise<string> {
  const { data: s } = await admin.from("automation_settings").select("telegram_enabled,telegram_chat_id").eq("id", 1).maybeSingle();
  if (!s?.telegram_enabled || !s.telegram_chat_id || !process.env.LOVABLE_API_KEY || !process.env.TELEGRAM_API_KEY) {
    await admin.from("help_feedback").update({ notify_status: "blocked", notify_error: "telegram not configured" }).eq("id", id);
    return "blocked";
  }
  const { data: row } = await admin.from("help_feedback").select(COLS).eq("id", id).maybeSingle();
  const status = row ? await sendOne(admin, row, s.telegram_chat_id) : "failed";
  const { data: older } = await admin.from("help_feedback").select(COLS)
    .in("notify_status", ["pending", "failed", "blocked"]).neq("id", id)
    .order("notify_attempts", { ascending: true }).order("created_at", { ascending: true }).limit(3);
  for (const o of older ?? []) await sendOne(admin, o, s.telegram_chat_id);
  return status;
}
