// Concise internal Telegram alert. Plain text (no parse_mode) so no markup
// injection is possible; every field is length-bounded. Never includes health text.

import type { LeadPayload } from "./payload";

const clip = (v: string | null | undefined, n = 80) => {
  const s = (v ?? "").replace(/[\r\n\t]+/g, " ").trim();
  if (!s) return "—";
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
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
  const lines = [
    "NEW YOG JIVAN LEAD",
    `ID: ${clip(p.crm_lead_id, 20)}`,
    `Name: ${clip(p.name, 60)}`,
    `Country/Market + Timezone: ${clip([p.phone.country_iso ?? p.market?.toUpperCase(), p.timezone].filter(Boolean).join(" · "), 70)}`,
    `Country Code: ${clip(p.phone.country_code, 8)}`,
    `Mobile Number: ${clip(p.phone.mobile_number, 20)}`,
    `WhatsApp Full Number: ${p.phone.whatsapp_full_number ?? `needs review (${clip(p.phone.reason, 40)})`}`,
    `Service: ${SERVICE_LABEL[p.service]}${p.preferred_experience ? ` — ${clip(p.preferred_experience, 50)}` : ""}`,
    `Goals: ${clip(p.safe_goals.join(", "), 120)}`,
    `Experience: ${clip(p.experience_level ?? (p.beginner ? "Beginner" : null), 40)}`,
    `Preferred time: ${clip(p.preferred_time, 40)}`,
    `Source + landing page: ${clip([p.source, p.landing_page].filter(Boolean).join(" · "), 100)}`,
    `Priority: ${p.priority}`,
    `WhatsApp link: ${p.phone.whatsapp_full_number ? `https://wa.me/${p.phone.whatsapp_full_number.slice(1)}` : "— (number needs review)"}`,
    `Open CRM link: ${crmUrl ?? "—"}`,
    `Health information provided: ${p.health_present ? "Yes" : "No"}`,
    "",
    "Suggested First Reply:",
    clip(reply, 900),
  ];
  const text = lines.join("\n").slice(0, 3900);
  const buttons: { text: string; url: string }[] = [];
  if (p.reply_link) buttons.push({ text: "Reply on WhatsApp", url: p.reply_link });
  if (crmUrl) buttons.push({ text: "Open CRM", url: crmUrl });
  return {
    text,
    reply_markup: buttons.length ? { inline_keyboard: [buttons] } : undefined,
  };
}
