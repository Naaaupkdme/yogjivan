// Internal Telegram alert rendered as Telegram HTML (parse_mode=HTML).
// Every user-supplied value is length-bounded, then HTML-escaped. Never includes health text.

import type { LeadPayload } from "./payload";

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Clip raw text first (so entities are never cut), then escape. */
const clip = (v: string | null | undefined, n = 80) => {
  const s = (v ?? "").replace(/[\r\n\t]+/g, " ").trim();
  if (!s) return "—";
  return escapeHtml(s.length > n ? `${s.slice(0, n - 1)}…` : s);
};

export function crmLink(spreadsheetId: string, gid: number | null, row: number | null): string {
  const base = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/edit`;
  const g = gid ?? 0;
  return row ? `${base}#gid=${g}&range=A${row}` : `${base}#gid=${g}`;
}

const SERVICE_LABEL: Record<LeadPayload["service"], string> = {
  private: "Private 1-on-1 online",
  group: "Live online group",
  studio: "Hai Duong studio",
  other: "General enquiry",
};

export function formatTelegramAlert(p: LeadPayload, reply: string, crmUrl: string | null) {
  const service = SERVICE_LABEL[p.service] + (p.preferred_experience ? ` — ${p.preferred_experience}` : "");
  const replyText = (reply ?? "").trim().slice(0, 900);
  const lines = [
    "🚨 <b>NEW YOG JIVAN LEAD</b>",
    "",
    `🆔 <b>ID:</b> ${clip(p.crm_lead_id, 20)}`,
    `👤 <b>Name:</b> ${clip(p.name, 60)}`,
    `🌍 <b>Location:</b> ${clip([p.phone.country_iso ?? p.market?.toUpperCase(), p.timezone].filter(Boolean).join(" · "), 70)}`,
    "",
    "📞 <b>PHONE</b>",
    `• Country Code: <code>${clip(p.phone.country_code, 8)}</code>`,
    `• Mobile Number: <code>${clip(p.phone.mobile_number, 20)}</code>`,
    `• WhatsApp Full Number: ${p.phone.whatsapp_full_number ? `<code>${clip(p.phone.whatsapp_full_number, 20)}</code>` : `needs review (${clip(p.phone.reason, 40)})`}`,
    "",
    "🎯 <b>ENQUIRY</b>",
    `• Service / Preferred Experience: ${clip(service, 90)}`,
    `• Goal(s): ${clip(p.safe_goals.join(", "), 120)}`,
    `• Experience: ${clip(p.experience_level ?? (p.beginner ? "Beginner" : null), 40)}`,
    `• Preferred Time: ${clip(p.preferred_time, 40)}`,
    `• Source + Landing Page: ${clip([p.source, p.landing_page].filter(Boolean).join(" · "), 100)}`,
    `• Priority: ${clip(p.priority, 10)}`,
    "",
    `🔒 <b>Health information provided:</b> ${p.health_present ? "Yes" : "No"}`,
    "",
    "💬 <b>SUGGESTED FIRST REPLY</b>",
    `<blockquote>${replyText ? escapeHtml(replyText) : "—"}</blockquote>`,
  ];
  const text = lines.join("\n");
  const buttons: { text: string; url: string }[] = [];
  if (p.reply_link) buttons.push({ text: "Open WhatsApp", url: p.reply_link });
  if (crmUrl) buttons.push({ text: "Open CRM", url: crmUrl });
  return {
    text,
    parse_mode: "HTML" as const,
    reply_markup: buttons.length ? { inline_keyboard: [buttons] } : undefined,
  };
}
