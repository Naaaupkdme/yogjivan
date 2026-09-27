// Trusted lead intake (server-only). Every final status='submitted' lead goes through here.
import {
  contactFingerprints, fingerprint, payloadHash, publicResponse, turnstileConfigured,
  type FinalLeadInput, type GuardOutcome,
} from "./intake";

type Admin = any;

export type IntakeContext = {
  ip: string | null;
  hostname?: string | null;
  source: "website" | "website_paid_online_yoga" | "mcp";
};

async function verifyTurnstile(token: string | null | undefined, ip: string | null, allowedHost: (h: string) => boolean) {
  if (!token) return false;
  const form = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
  if (ip && !ip.includes("/")) form.set("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const j = (await r.json()) as { success?: boolean; hostname?: string; action?: string };
    return Boolean(j.success && j.action === "lead_submit" && j.hostname && allowedHost(j.hostname));
  } catch {
    return false;
  }
}

async function logAttempt(admin: Admin, row: Record<string, unknown>) {
  try { await admin.from("lead_submission_attempts").insert(row); } catch { /* audit is best-effort */ }
}

export async function acceptLead(input: FinalLeadInput, ctx: IntakeContext, opts: { requireTurnstile: boolean; allowedHost?: (h: string) => boolean }) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const admin = supabaseAdmin as Admin;
  const { data: s } = await admin.from("automation_settings").select("fingerprint_key").eq("id", 1).maybeSingle();
  if (!s?.fingerprint_key) return { status: 503, body: { ok: false, error: "Temporarily unavailable. Please message us on WhatsApp." } };
  const key = s.fingerprint_key as string;
  const ipFp = ctx.ip ? fingerprint(key, "ip", ctx.ip) : null;
  const sessionFp = input.session_id ? fingerprint(key, "session", input.session_id) : null;

  if (input.hp && input.hp.trim()) {
    await logAttempt(admin, { outcome: "honeypot", reason: "honeypot", source: ctx.source, ip_fp: ipFp, session_fp: sessionFp });
    return publicResponse("honeypot");
  }
  if (opts.requireTurnstile && turnstileConfigured(process.env as Record<string, string | undefined>)) {
    const ok = await verifyTurnstile(input.turnstile_token, ctx.ip, opts.allowedHost ?? (() => true));
    if (!ok) {
      await logAttempt(admin, { outcome: "captcha_failed", reason: "turnstile", source: ctx.source, ip_fp: ipFp, session_fp: sessionFp });
      return publicResponse("captcha_failed");
    }
  }

  const lead = {
    name: input.name, whatsapp: input.whatsapp, email: input.email || null,
    goals: input.goals ?? [], preferred_experience: input.preferred_experience || null,
    preferred_time: input.preferred_time || null, health_notes: input.health_notes || null,
    health_tags: input.health_tags ?? [], experience_level: input.experience_level || null,
    source: ctx.source, session_id: input.session_id || null, meta: input.meta ?? {},
  };
  const { data, error } = await admin.rpc("submit_lead_guarded", {
    p_lead: lead,
    p_ip_fp: ipFp,
    p_session_fp: sessionFp,
    p_contact_fps: contactFingerprints(key, input.whatsapp, input.email),
    p_idem_key: input.idempotency_key ? fingerprint(key, "idem", input.idempotency_key) : null,
    p_payload_hash: payloadHash({ ...input, source: ctx.source as FinalLeadInput["source"] }),
  });
  if (error) {
    console.error("lead intake rpc failed:", error.code ?? "unknown");
    return { status: 500, body: { ok: false, error: "Something went wrong. Please try again or message us on WhatsApp." } };
  }
  return publicResponse(((data as { outcome?: GuardOutcome })?.outcome ?? "invalid") as GuardOutcome);
}
