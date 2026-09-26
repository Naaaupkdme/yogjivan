// Builds the privacy-safe mirror payload saved on the outbox row.
// Input deliberately excludes health_notes / health_tags; only health_present.

import { normalizePhone, waMeLink, type NormalizedPhone } from "./phone";
import { classifyService, generateReply, isBeginner, safeGoals, type ServiceKind } from "./reply";

export type LeadRow = {
  id: string;
  crm_lead_id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  goals: string[] | null;
  preferred_experience: string | null;
  preferred_time: string | null;
  experience_level: string | null;
  status: string;
  source: string | null;
  session_id: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  health_present: boolean | null;
};

export type LeadPayload = {
  lead_id: string;
  crm_lead_id: string;
  name: string;
  email: string | null;
  goals: string[]; // raw form options (sheet only)
  safe_goals: string[]; // sensitive options removed (Telegram/reply)
  preferred_experience: string | null;
  preferred_time: string | null;
  experience_level: string | null;
  status: string;
  source: string | null;
  service: ServiceKind;
  beginner: boolean;
  priority: "High" | "Medium" | "Normal" | "Low";
  health_present: boolean;
  phone: NormalizedPhone;
  market: string | null;
  timezone: string | null;
  funnel: string | null;
  landing_page: string | null;
  landing_first_touch: string | null;
  utm_source: string | null;
  first_touch_at: string | null;
  session_id: string | null;
  meta_json: string;
  created_at: string;
  updated_at: string;
  reply_link: string | null;
};

function str(v: unknown, max = 120): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s ? s.slice(0, max) : null;
}

export function priorityFor(service: ServiceKind, phoneValid: boolean, name: string): LeadPayload["priority"] {
  if (!phoneValid || name.trim().length < 3) return "Low"; // unverified
  if (service === "private") return "High";
  if (service === "group") return "Medium";
  return "Normal";
}

export function buildLeadPayload(l: LeadRow): { payload: LeadPayload; reply: string } {
  const meta = (l.meta ?? {}) as Record<string, unknown>;
  const phone = normalizePhone(l.whatsapp);
  const funnel = str(meta.funnel);
  const health = Boolean(l.health_present);
  const goals = (l.goals ?? []).map((g) => String(g).slice(0, 80)).slice(0, 10);
  const service = classifyService({ preferred_experience: l.preferred_experience, funnel, source: l.source });
  const reply = generateReply({
    name: l.name,
    preferred_experience: l.preferred_experience,
    funnel,
    source: l.source,
    goals,
    preferred_time: l.preferred_time,
    timezone: str(meta.timezone, 60),
    experience_level: l.experience_level,
    health_present: health,
  });
  // Only non-PII attribution keys go into the JSON mirror.
  const safeMeta: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(meta)) {
    if (/^(utm_|gclid|fbclid|funnel|landing|market|timezone|referrer_host|first_touch_at|lead_event_id)/.test(k)) {
      safeMeta[k] = typeof v === "string" ? v.slice(0, 200) : v;
    }
  }
  const payload: LeadPayload = {
    lead_id: l.id,
    crm_lead_id: l.crm_lead_id,
    name: l.name.slice(0, 120),
    email: str(l.email, 200),
    goals,
    safe_goals: safeGoals(goals),
    preferred_experience: str(l.preferred_experience),
    preferred_time: str(l.preferred_time),
    experience_level: str(l.experience_level),
    status: l.status,
    source: str(l.source),
    service,
    beginner: isBeginner({ experience_level: l.experience_level, goals }),
    priority: priorityFor(service, phone.phone_validation === "valid", l.name),
    health_present: health,
    phone,
    market: str(meta.market, 10),
    timezone: str(meta.timezone, 60),
    funnel,
    landing_page: str(meta.landing_page, 200),
    landing_first_touch: str(meta.landing_first_touch, 200),
    utm_source: str(meta.utm_source),
    first_touch_at: str(meta.first_touch_at, 40),
    session_id: l.session_id,
    meta_json: JSON.stringify(safeMeta).slice(0, 2000),
    created_at: l.created_at,
    updated_at: l.updated_at,
    reply_link: waMeLink(phone.whatsapp_full_number, reply),
  };
  return { payload, reply };
}
