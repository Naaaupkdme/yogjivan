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

import { submitLeadToCrm } from "./submit-lead.functions";

export async function submitLead(payload: SubmitPayload) {
  const session_id = getSessionId();
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


  // CRM sync is a best-effort convenience — the lead is already saved.
  // If the webhook fails we log server-side but do NOT surface an error
  // to the visitor (they'd see a scary error even though their data was
  // captured). Server logs remain the source of truth for CRM sync health.
  try {
    await submitLeadToCrm({
      data: {
        name: payload.name,
        whatsapp: payload.whatsapp,
        email: payload.email || "",
        goals: payload.goals,
        preferred_experience: payload.preferred_experience,
        preferred_time: payload.preferred_time,
        health_notes: payload.health_notes,
        health_tags: payload.health_tags,
        experience_level: payload.experience_level,
        status: payload.status,
      },
    });
  } catch (e) {
    // Non-fatal — logged server-side inside submitLeadToCrm too.
    console.warn("CRM webhook sync failed (lead still saved):", e);
  }
}

