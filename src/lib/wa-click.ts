// Pure helpers for the first-party /go/whatsapp flow (unit tested).
// Destination is fixed to the business CONTACT number — no open redirects.

import { CONTACT } from "@/lib/facts/contact";
import { WA_MESSAGES, type WaIntent } from "@/lib/wa";

export const WA_REF_RE = /^YJ-WA-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/;
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function isIntent(v: unknown): v is WaIntent {
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(WA_MESSAGES, v);
}

export function newWaRef(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let s = "";
  for (const b of bytes) s += ALPHABET[b % ALPHABET.length];
  return `YJ-WA-${s}`;
}

/** Only ever the business number; ref appended only when it was actually stored. */
export function waDestination(intent: WaIntent, storedRef: string | null): string {
  const base = WA_MESSAGES[intent];
  const text = storedRef && WA_REF_RE.test(storedRef) ? `${base} (Ref: ${storedRef})` : base;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp\/|headless|lighthouse|curl|wget|python|httpclient/i;

/** True when the request must not be recorded as a click (prefetch, preview, bot). */
export function isNonHumanRequest(h: Headers): boolean {
  const purpose = `${h.get("purpose") ?? ""} ${h.get("sec-purpose") ?? ""} ${h.get("x-moz") ?? ""}`.toLowerCase();
  if (/prefetch|prerender|preview/.test(purpose)) return true;
  return BOT_RE.test(h.get("user-agent") ?? "");
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function s(v: FormDataEntryValue | null, max = 120): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().replace(/[\u0000-\u001f]/g, "");
  return t ? t.slice(0, max) : null;
}

/**
 * Builds the click row from a POSTed form. Attribution and session id are only
 * kept when the visitor accepted cookies; otherwise a minimal anonymous event.
 */
export function clickRowFromForm(f: FormData, ref: string) {
  const intent = s(f.get("i"), 20);
  const consent = s(f.get("consent"), 10) === "accepted" ? "accepted" : "denied";
  const base = {
    ref,
    intent: isIntent(intent) ? intent : "general",
    cta_location: s(f.get("cta"), 80),
    page_path: (s(f.get("p"), 200) ?? "").startsWith("/") ? s(f.get("p"), 200) : null,
    consent,
    device_type: ["mobile", "tablet", "desktop"].includes(s(f.get("dev"), 10) ?? "") ? s(f.get("dev"), 10) : null,
  };
  if (consent !== "accepted") return base;
  const sid = s(f.get("sid"), 40);
  return {
    ...base,
    session_id: sid && UUID_RE.test(sid) ? sid : null,
    landing_path: s(f.get("landing"), 200),
    referrer_host: s(f.get("ref_host"), 120),
    utm_source: s(f.get("utm_source")),
    utm_medium: s(f.get("utm_medium")),
    utm_campaign: s(f.get("utm_campaign")),
    utm_term: s(f.get("utm_term")),
    utm_content: s(f.get("utm_content")),
    gclid: s(f.get("gclid"), 200),
    fbclid: s(f.get("fbclid"), 200),
    market: s(f.get("market"), 10),
    timezone: s(f.get("tz"), 60),
  };
}
