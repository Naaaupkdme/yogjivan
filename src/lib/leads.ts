import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "yj.lead.session";
const STATE_KEY = "yj.lead.state";

export function getSessionId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export type LeadState = {
  step: number;
  name: string;
  whatsapp: string;
  email: string;
  goals: string[];
  preferred_experience: string;
  preferred_time: string;
  health_notes: string;
  health_tags: string[];
  experience_level: string;
};

export const emptyLeadState: LeadState = {
  step: 0,
  name: "",
  whatsapp: "",
  email: "",
  goals: [],
  preferred_experience: "",
  preferred_time: "",
  health_notes: "",
  health_tags: [],
  experience_level: "",
};

export function loadState(): LeadState {
  if (typeof window === "undefined") return { ...emptyLeadState };
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (!raw) return { ...emptyLeadState };
    return { ...emptyLeadState, ...JSON.parse(raw) };
  } catch {
    return { ...emptyLeadState };
  }
}

export function saveState(state: LeadState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STATE_KEY);
}

type SubmitPayload = Partial<Omit<LeadState, "step">> & {
  name: string;
  whatsapp: string;
  status: string;
  /** Must be an allowed source value (see leads insert policy). */
  source?: "website" | "website_paid_online_yoga";
  /** Non-PII campaign/attribution context. */
  meta?: Record<string, string | number | boolean | null>;
};

export type SubmitResult = { outcome: "accepted" | "duplicate" | "received" | "partial" };

export class LeadSubmitError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/**
 * Supabase is the single source of truth for leads. The legacy Make.com
 * webhook forward was retired on 2026-08-28 — do NOT reintroduce a third-party
 * CRM forward here without an approved replacement.
 *
 * Final (status='submitted') leads go through the trusted server endpoint
 * (rate limits, duplicate suppression, honeypot, optional Turnstile).
 * Only fire conversion events when the result outcome is "accepted".
 */
export async function submitLead(payload: SubmitPayload): Promise<SubmitResult> {
  const session_id = getSessionId();
  if (payload.status === "submitted") {
    const { readHoneypot, takeTurnstileToken } = await import("@/lib/lead-guard-client");
    const leadEventId = payload.meta?.lead_event_id;
    const res = await fetch("/api/public/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name.slice(0, 120),
        whatsapp: payload.whatsapp.slice(0, 40),
        email: payload.email?.slice(0, 200) || null,
        goals: payload.goals || [],
        preferred_experience: payload.preferred_experience || null,
        preferred_time: payload.preferred_time || null,
        health_notes: payload.health_notes?.slice(0, 1000) || null,
        health_tags: payload.health_tags || [],
        experience_level: payload.experience_level || null,
        source: payload.source ?? "website",
        session_id,
        meta: payload.meta ?? {},
        idempotency_key: typeof leadEventId === "string" ? leadEventId : null,
        hp: readHoneypot(),
        turnstile_token: takeTurnstileToken(),
      }),
    });
    let body: { ok?: boolean; outcome?: SubmitResult["outcome"]; error?: string } = {};
    try { body = await res.json(); } catch { /* non-JSON */ }
    if (!res.ok || !body.ok) throw new LeadSubmitError(body.error ?? "Something went wrong. Please try again.", res.status);
    return { outcome: body.outcome ?? "received" };
  }
  const { error } = await supabase.from("leads").insert({
    name: payload.name.slice(0, 120),
    whatsapp: payload.whatsapp.slice(0, 40),
    email: payload.email?.slice(0, 200) || null,
    goals: payload.goals || [],
    preferred_experience: payload.preferred_experience || null,
    preferred_time: payload.preferred_time || null,
    health_notes: payload.health_notes?.slice(0, 1000) || null,
    health_tags: payload.health_tags || [],
    experience_level: payload.experience_level || null,
    status: payload.status,
    session_id,
    source: payload.source ?? "website",
    meta: payload.meta ?? {},
  });
  if (error) throw error;
  return { outcome: "partial" };
}

/** Friendly UI message for a failed submission (never reveals which rule matched). */
export function leadErrorMessage(err: unknown): string {
  return err instanceof LeadSubmitError ? err.message : "Something went wrong. Please try again or message us on WhatsApp.";
}

