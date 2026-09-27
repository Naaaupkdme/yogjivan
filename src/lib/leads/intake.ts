// Pure, testable helpers for the trusted final-submission endpoint.
// No raw IP/phone/email is ever persisted — only HMAC fingerprints.
import { createHash, createHmac } from "crypto";
import { z } from "zod";
import { normalizePhone } from "./phone";

export const MAX_BODY_BYTES = 16_384;
export const HONEYPOT_FIELD = "yj_hp_website";

const s = (max: number) => z.string().trim().max(max);
const metaValue = z.union([z.string().max(300), z.number(), z.boolean(), z.null()]);

export const finalLeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z.string().trim().min(5).max(40),
  email: z.union([z.string().trim().max(200).email(), z.literal("")]).optional().nullable(),
  goals: z.array(s(80)).max(10).optional(),
  preferred_experience: s(120).optional().nullable(),
  preferred_time: s(120).optional().nullable(),
  health_notes: z.string().max(1000).optional().nullable(),
  health_tags: z.array(s(60)).max(10).optional(),
  experience_level: s(60).optional().nullable(),
  source: z.enum(["website", "website_paid_online_yoga"]),
  session_id: z.string().uuid().optional().nullable(),
  meta: z.record(z.string().max(60), metaValue).optional()
    .refine((m) => !m || Object.keys(m).length <= 40, "too many meta keys"),
  idempotency_key: s(100).optional().nullable(),
  hp: z.string().max(500).optional().nullable(),
  turnstile_token: z.string().max(4096).optional().nullable(),
});
export type FinalLeadInput = z.infer<typeof finalLeadSchema>;

const ALLOWED_HOSTS = new Set(["yogjivan.com", "www.yogjivan.com", "yogjivan.in", "www.yogjivan.in", "localhost", "127.0.0.1"]);
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const h = new URL(origin).hostname.toLowerCase();
    return ALLOWED_HOSTS.has(h) || h.endsWith(".lovable.app") || h.endsWith(".lovableproject.com");
  } catch {
    return false;
  }
}

/**
 * Client IP precedence: cf-connecting-ip (set by the Cloudflare edge, overwritten
 * on every request so clients cannot spoof it) > x-real-ip > first x-forwarded-for.
 * IPv6 is reduced to its /64 prefix so address rotation inside one network shares a bucket.
 */
export function clientIp(h: Headers): string | null {
  const raw = h.get("cf-connecting-ip") || h.get("x-real-ip") || (h.get("x-forwarded-for") ?? "").split(",")[0];
  const ip = (raw ?? "").trim().toLowerCase();
  if (!ip || ip.length > 64) return null;
  if (ip.includes(":")) return ip.split(":").slice(0, 4).join(":") + "::/64";
  return ip;
}

export function fingerprint(key: string, kind: string, value: string): string {
  return createHmac("sha256", key).update(`${kind}:${value}`).digest("hex");
}

export function contactFingerprints(key: string, whatsapp: string, email?: string | null): string[] {
  const out: string[] = [];
  const p = normalizePhone(whatsapp);
  const digits = (p.whatsapp_full_number ?? whatsapp).replace(/\D/g, "");
  if (digits.length >= 5) out.push(fingerprint(key, "phone", digits));
  const e = (email ?? "").trim().toLowerCase();
  if (e) out.push(fingerprint(key, "email", e));
  return out;
}

export function payloadHash(i: Pick<FinalLeadInput, "name" | "whatsapp" | "email" | "preferred_experience" | "source" | "health_notes" | "preferred_time">): string {
  const canon = JSON.stringify([
    i.name.trim().toLowerCase(), i.whatsapp.replace(/\D/g, ""), (i.email ?? "").trim().toLowerCase(),
    i.preferred_experience ?? "", i.preferred_time ?? "", i.source, (i.health_notes ?? "").trim(),
  ]);
  return createHash("sha256").update(canon).digest("hex");
}

export type GuardOutcome = "accepted" | "duplicate" | "rate_limited" | "invalid";

/** Public response mapping: never reveals which rule matched. */
export function publicResponse(outcome: GuardOutcome | "honeypot" | "captcha_failed") {
  switch (outcome) {
    case "accepted": return { status: 200, body: { ok: true, outcome: "accepted" } };
    case "duplicate": return { status: 200, body: { ok: true, outcome: "duplicate" } };
    // Honeypot looks like success to bots but is not a conversion.
    case "honeypot": return { status: 200, body: { ok: true, outcome: "received" } };
    case "rate_limited": return { status: 429, body: { ok: false, error: "Too many requests. Please try again later or message us on WhatsApp." } };
    default: return { status: 400, body: { ok: false, error: "We couldn't submit your request. Please check your details and try again." } };
  }
}

export function turnstileConfigured(env: Record<string, string | undefined>): boolean {
  return Boolean(env.TURNSTILE_SECRET_KEY && env.VITE_TURNSTILE_SITE_KEY);
}
