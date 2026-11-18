// Authenticated internal direct-WhatsApp lead capture.
// Allows authorized staff/n8n to capture an enquiry received directly on WhatsApp
// into Supabase -> lead_outbox -> Google Sheets mirror and Telegram control.
// Never exposes internal controls to public customer UI.

import { z } from "zod";
import { normalizePhone } from "./phone";
import { VALID_PLAN_SESSIONS, VALID_PREFERRED_LANGUAGES, VALID_SHARED_FORMATS, VALID_PARTICIPANT_COUNTS } from "./payload";
import { bearerMatches } from "@/lib/crm/bridge";

export const INTERNAL_CRM_STAGES = [
  "New enquiry",
  "Details needed",
  "Qualified",
  "Quoted",
  "Follow-up",
  "Won",
  "Lost",
] as const;

export const internalCaptureSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  whatsapp: z.string().trim().min(5, "Valid phone number required").max(40),
  email: z.union([z.string().trim().email().max(200), z.literal("")]).optional().nullable(),
  service: z.string().trim().max(120).default("Private 1-on-1 online yoga"),
  shared_format: z.string().trim().refine((v) => !v || VALID_SHARED_FORMATS.has(v as any), "Invalid shared format").optional().nullable(),
  participant_count: z.number().int().refine((v) => !v || VALID_PARTICIPANT_COUNTS.has(v as any), "Invalid participant count").optional().nullable(),
  plan_sessions: z.string().trim().refine((v) => !v || VALID_PLAN_SESSIONS.has(v), "Invalid plan").optional().nullable(),
  preferred_language: z.string().trim().refine((v) => !v || VALID_PREFERRED_LANGUAGES.has(v), "Invalid language").optional().nullable(),
  preferred_time: z.string().trim().max(120).optional().nullable(),
  country: z.string().trim().max(60).optional().nullable(),
  timezone: z.string().trim().max(60).optional().nullable(),
  stage: z.enum(INTERNAL_CRM_STAGES).default("New enquiry"),
  notes: z.string().trim().max(1000).optional().nullable(),
  next_follow_up: z.string().trim().max(80).optional().nullable(),
  original_ref: z.string().trim().max(40).optional().nullable(),
  idempotency_key: z.string().trim().min(8).max(100),
});

export type InternalCaptureInput = z.infer<typeof internalCaptureSchema>;

export type InternalCaptureResult = {
  status: number;
  body: {
    ok: boolean;
    outcome?: "accepted" | "duplicate" | "rate_limited" | "invalid";
    duplicate?: boolean;
    error?: string;
  };
};

export async function handleInternalCapture(
  input: { authorization: string | null; body: unknown },
  deps: {
    secret: string | undefined;
    acceptLead: (
      leadInput: any,
      ctx: { ip: string | null; source: "website" },
      opts: { requireTurnstile: boolean }
    ) => Promise<{ status: number; body: Record<string, unknown> }>;
  }
): Promise<InternalCaptureResult> {
  if (!deps.secret) {
    return { status: 503, body: { ok: false, error: "Internal capture endpoint is disabled" } };
  }
  if (!bearerMatches(input.authorization, deps.secret)) {
    return { status: 401, body: { ok: false, error: "Unauthorized" } };
  }

  const parsed = internalCaptureSchema.safeParse(input.body);
  if (!parsed.success) {
    return {
      status: 400,
      body: { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid capture payload" },
    };
  }

  const data = parsed.data;
  const phone = normalizePhone(data.whatsapp);

  // Build structured preferred_experience matching the private sessions format
  const details = [
    data.shared_format ? `Format: ${data.shared_format}` : null,
    data.participant_count ? `${data.participant_count} participants` : null,
    data.plan_sessions,
    data.preferred_language ? `Language: ${data.preferred_language}` : null,
  ].filter(Boolean).join(" · ");

  const rawExperience = details ? `${data.service} (${details})` : data.service;
  const preferredExperience = rawExperience.slice(0, 120);
  const serviceGoal = data.service.slice(0, 80);

  // Preserve DB check constraint: source must be 'website'
  const leadPayload = {
    name: data.name,
    whatsapp: phone.whatsapp_full_number ?? data.whatsapp,
    email: data.email || null,
    goals: [serviceGoal],
    preferred_experience: preferredExperience,
    preferred_time: data.preferred_time || null,
    health_notes: null, // Health/medical notes strictly excluded from public CRM intake
    health_tags: [],
    experience_level: null,
    source: "website" as const,
    session_id: null,
    idempotency_key: data.idempotency_key.slice(0, 100),
    meta: {
      channel: "whatsapp_direct",
      funnel: data.shared_format ? `${data.shared_format}_yoga_internal` : "direct_whatsapp_capture",
      stage: data.stage,
      notes: data.notes || null,
      next_follow_up: data.next_follow_up || null,
      original_ref: data.original_ref || null,
      market: data.country || phone.country_code || null,
      timezone: data.timezone || null,
      plan_sessions: data.plan_sessions || null,
      preferred_language: data.preferred_language || null,
      shared_format: data.shared_format || null,
      participant_count: data.participant_count || null,
    },
  };

  const res = await deps.acceptLead(
    leadPayload,
    { ip: "internal-crm", source: "website" },
    { requireTurnstile: false }
  );

  const outcome = (res.body as { outcome?: string }).outcome;

  if (res.status === 200) {
    return {
      status: 200,
      body: {
        ok: true,
        outcome: (outcome as any) ?? "accepted",
        duplicate: outcome === "duplicate",
      },
    };
  }

  return {
    status: res.status,
    body: {
      ok: false,
      error: (res.body as { error?: string }).error ?? "Failed to save internal lead",
    },
  };
}
