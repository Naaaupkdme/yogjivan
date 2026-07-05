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
};

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/033hlthorhbfgymbwym42o5tk1qghaa1";

async function postToMakeWebhook(payload: SubmitPayload) {
  try {
    const body = {
      full_name: payload.name || "",
      email: payload.email || "",
      phone: payload.whatsapp || "",
      country: "",
      city: "",
      service: payload.preferred_experience || "",
      message: [
        payload.health_notes,
        payload.goals?.length ? `Goals: ${payload.goals.join(", ")}` : "",
        payload.preferred_time ? `Preferred time: ${payload.preferred_time}` : "",
        payload.experience_level ? `Experience: ${payload.experience_level}` : "",
        payload.health_tags?.length ? `Health: ${payload.health_tags.join(", ")}` : "",
      ].filter(Boolean).join(" | "),
      source: "Website Contact Form",
      created_at: new Date().toISOString(),
    };
    await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch (err) {
    console.error("Make webhook failed", err);
  }
}

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
    source: "website",
  });
  if (error) throw error;

  // Fire webhook only on final submission to avoid duplicates
  if (payload.status === "submitted") {
    await postToMakeWebhook(payload);
  }
}
