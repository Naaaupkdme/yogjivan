import { z } from "zod";

// Private site feedback — deliberately separate from sales leads:
// never fires Meta Lead, never enters leads/CRM/Sheets. Staff alert goes to
// Telegram with the redacted message only; reply contact is stored separately.
export const FEEDBACK_KINDS = ["suggestion", "problem", "compliment"] as const;
export const FEEDBACK_MAX_PER_HOUR = 3;
export const NOTIFY_MAX_ATTEMPTS = 5;

export const feedbackSchema = z
  .object({
    kind: z.enum(FEEDBACK_KINDS),
    message: z.string().trim().min(5).max(1000),
    page_path: z.string().max(200).regex(/^\//).optional(),
    lang: z.enum(["EN", "VI"]).optional(),
    reply_contact: z.string().trim().max(120).optional(),
    contact_consent: z.boolean().optional(),
    website: z.string().max(0).optional(), // honeypot: must stay empty
  })
  .refine((d) => !d.reply_contact || d.contact_consent === true, { path: ["contact_consent"] });
export type FeedbackInput = z.infer<typeof feedbackSchema>;

/** Strip contact details from the message body; the reply field is kept separately. */
export function redactContact(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[email removed]")
    .replace(/\+?\d[\d\s().-]{7,}\d/g, "[number removed]");
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Staff alert text. Never includes the reply contact itself. */
export function formatFeedbackAlert(r: { ticket_id: string; kind: string; message: string; page_path: string | null; lang: string | null; has_contact: boolean }) {
  return [
    `<b>🗒 Website feedback ${esc(r.ticket_id)}</b>`,
    `Type: ${esc(r.kind)} · ${esc(r.lang ?? "EN")}`,
    r.page_path ? `Page: ${esc(r.page_path)}` : null,
    "",
    esc(r.message),
    "",
    r.has_contact ? "Reply contact: provided (see backend, consented)" : "Reply contact: none",
  ].filter((l) => l !== null).join("\n");
}
