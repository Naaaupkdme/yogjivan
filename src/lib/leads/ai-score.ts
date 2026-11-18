// AI lead scoring: pure helpers (input minimisation + result validation).
// The AI never receives name, phone, email, health notes or raw goals — only safe fields.
import type { LeadPayload } from "./payload";

export type AiScore = { score: number; fit: "High" | "Medium" | "Low"; summary: string; worth_call: boolean; reason: string; model: string };

export const IDEAL_CUSTOMER = `Yog Jivan ideal customer (most to least valuable):
1. Private 1-on-1 online yoga (flagship, premium) or couples/family private sessions; clear personal goal; valid WhatsApp; realistic preferred time; English, Hindi or Vietnamese speaker.
2. Corporate or school programme enquiries from an organisation.
3. Live online group membership with clear goal and valid contact.
4. Hai Duong studio enquiries (local members, trials).
Weak signals: invalid/ambiguous phone, no goal, vague or test-like entries.
Worth a call = likely to convert to private or organisation work, with a valid number.`;

export function buildAiInput(p: LeadPayload) {
  return {
    service: p.service,
    preferred_experience: p.preferred_experience,
    goals: p.safe_goals,
    experience_level: p.experience_level,
    beginner: p.beginner,
    preferred_time: p.preferred_time,
    timezone: p.timezone,
    country: p.phone.country_iso,
    market: p.market,
    phone_valid: p.phone.phone_validation === "valid",
    email_given: Boolean(p.email),
    landing_page: p.landing_page,
    utm_source: p.utm_source,
  };
}

export const AI_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["score", "summary", "worth_call", "reason"],
  properties: {
    score: { type: "integer", description: "0-100 fit with the ideal customer" },
    summary: { type: "string", description: "One short sentence, max 25 words, describing what the lead wants. No health details, no names." },
    worth_call: { type: "boolean" },
    reason: { type: "string", description: "Max 15 words explaining the call decision." },
  },
};

export function fitFor(score: number): AiScore["fit"] {
  return score >= 75 ? "High" : score >= 50 ? "Medium" : "Low";
}

export function parseAiResult(raw: unknown, model: string, phoneValid: boolean): AiScore | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.score !== "number" || typeof r.summary !== "string" || typeof r.worth_call !== "boolean") return null;
  const score = Math.max(0, Math.min(100, Math.round(r.score)));
  const clip = (s: unknown, n: number) => String(s ?? "").replace(/\s+/g, " ").trim().slice(0, n);
  return {
    score,
    fit: fitFor(score),
    summary: clip(r.summary, 200),
    // Never flag a call when the number can't be reached.
    worth_call: r.worth_call && phoneValid,
    reason: clip(r.reason, 120),
    model,
  };
}
