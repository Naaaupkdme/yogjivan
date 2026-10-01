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

/** Sanitized digits as the visitor typed them (keeps a leading +). */
export function enteredDigits(original: string | null | undefined): string | null {
  const t = (original ?? "").trim();
  const d = t.replace(/[^\d]/g, "").slice(0, 20);
  if (!d) return null;
  return (t.startsWith("+") || t.startsWith("00") ? "+" : "") + (t.startsWith("00") ? d.slice(2) : d);
}

export function validationLabel(p: LeadPayload["phone"]): "Valid" | "Invalid" | "Ambiguous" {
  if (p.phone_validation === "valid") return "Valid";
  return p.reason === "no_country_code_ambiguous" ? "Ambiguous" : "Invalid";
}

export function formatTelegramAlert(p: LeadPayload, reply: string, crmUrl: string | null) {
  const valid = p.phone.phone_validation === "valid" && Boolean(p.phone.whatsapp_full_number);
  const entered = enteredDigits(p.phone.phone_original);
  const replyText = (reply ?? "").trim().slice(0, 900);
  const sections: string[][] = [
    ["🚨 <b>NEW YOG JIVAN LEAD</b>"],
    [
      `🆔 <b>ID:</b> ${clip(p.crm_lead_id, 20)}`,
      `👤 <b>Name:</b> ${clip(p.name, 60)}`,
      `🌍 <b>Location:</b> ${clip([p.phone.country_iso ?? p.market?.toUpperCase(), p.timezone].filter(Boolean).join(" · "), 70)}`,
    ],
    [
      "📞 <b>PHONE</b>",
      `• Country Code: ${p.phone.country_code ? `<code>${clip(p.phone.country_code, 8)}</code>` : "—"}`,
      `• Entered Number: ${entered ? `<code>${escapeHtml(entered)}</code>` : "—"}`,
      `• WhatsApp Number: ${valid ? `<code>${clip(p.phone.whatsapp_full_number, 20)}</code>` : "<b>Needs review</b>"}`,
      `• Validation: ${validationLabel(p.phone)}`,
      ...(valid ? [] : ["⚠️ <b>Verify phone number</b> before contacting."]),
    ],
    [
      "🎯 <b>ENQUIRY</b>",
      `• Service: ${clip(p.preferred_experience ?? SERVICE_LABEL[p.service], 60)}`,
      `• Goal: ${clip(p.safe_goals.join(", "), 80)}`,
      `• Experience: ${clip(p.experience_level ?? (p.beginner ? "Beginner" : null), 40)}`,
      `• Preferred Time: ${clip(p.preferred_time, 40)}`,
      `• Source: ${clip(p.landing_page ?? p.source, 60)}`,
      `• Priority: ${clip(p.priority, 10)}`,
    ],
    [`🔒 <b>Health information provided:</b> ${p.health_present ? "Yes" : "No"}`],
    ["💬 <b>READY TO COPY</b>", `<blockquote>${replyText ? escapeHtml(replyText) : "—"}</blockquote>`],
  ];
  const text = sections.map((l) => l.join("\n")).join("\n\n");
  const statusButton = (text: string, status: string) => ({
    text,
    callback_data: `${status}:${p.crm_lead_id}`,
  });
  const inlineKeyboard: Array<Array<{ text: string; callback_data?: string; url?: string }>> = [];
  const links: Array<{ text: string; url: string }> = [];
  if (valid && p.phone.whatsapp_full_number) {
    links.push({ text: "💬 Reply on WhatsApp", url: `https://wa.me/${p.phone.whatsapp_full_number.replace(/^\+/, "")}` });
  }
  if (crmUrl) links.push({ text: "📊 Open CRM", url: crmUrl });
  if (links.length) inlineKeyboard.push(links);
  inlineKeyboard.push(
    [statusButton("📞 Contacted", "Contacted"), statusButton("⏳ No Response", "No Response")],
    [statusButton("🌟 Interested", "Interested"), statusButton("📅 Trial Booked", "Trial Booked")],
    [statusButton("🧘 Trial Attended", "Trial Attended"), statusButton("🎉 Converted", "Converted")],
    [statusButton("❌ Lost", "Lost")],
  );
  return {
    text,
    parse_mode: "HTML" as const,
    reply_markup: { inline_keyboard: inlineKeyboard },
  };
}
