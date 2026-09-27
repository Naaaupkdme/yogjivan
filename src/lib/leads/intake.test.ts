import { describe, expect, it } from "vitest";
import {
  clientIp, contactFingerprints, finalLeadSchema, fingerprint, isAllowedOrigin, payloadHash, publicResponse, turnstileConfigured,
} from "./intake";

const base = { name: "Asha", whatsapp: "+84782046066", source: "website" as const };

describe("lead intake helpers", () => {
  it("IP precedence: cf-connecting-ip beats spoofable x-forwarded-for", () => {
    const h = new Headers({ "cf-connecting-ip": "1.2.3.4", "x-forwarded-for": "9.9.9.9", "x-real-ip": "8.8.8.8" });
    expect(clientIp(h)).toBe("1.2.3.4");
    expect(clientIp(new Headers({ "x-forwarded-for": "5.5.5.5, 6.6.6.6" }))).toBe("5.5.5.5");
    expect(clientIp(new Headers({ "cf-connecting-ip": "2001:db8:1:2:3:4:5:6" }))).toBe("2001:db8:1:2::/64");
    expect(clientIp(new Headers())).toBeNull();
  });
  it("fingerprints are HMACs, never raw values", () => {
    const f = fingerprint("k", "ip", "1.2.3.4");
    expect(f).toMatch(/^[0-9a-f]{64}$/);
    expect(f).not.toContain("1.2.3.4");
    expect(fingerprint("k2", "ip", "1.2.3.4")).not.toBe(f);
  });
  it("same phone in different formats / email case => same contact fingerprint", () => {
    const a = contactFingerprints("k", "+84 782 046 066", "A@X.com");
    const b = contactFingerprints("k", "+84782046066", "a@x.com ");
    expect(a).toEqual(b);
    expect(a).toHaveLength(2);
  });
  it("payload hash is stable for identical retries and differs otherwise", () => {
    expect(payloadHash(base)).toBe(payloadHash({ ...base, name: " asha " }));
    expect(payloadHash(base)).not.toBe(payloadHash({ ...base, preferred_experience: "Private" }));
  });
  it("schema rejects mcp source, oversize fields and bad email; accepts minimal", () => {
    expect(finalLeadSchema.safeParse(base).success).toBe(true);
    expect(finalLeadSchema.safeParse({ ...base, source: "mcp" }).success).toBe(false);
    expect(finalLeadSchema.safeParse({ ...base, name: "x".repeat(121) }).success).toBe(false);
    expect(finalLeadSchema.safeParse({ ...base, health_notes: "x".repeat(1001) }).success).toBe(false);
    expect(finalLeadSchema.safeParse({ ...base, email: "nope" }).success).toBe(false);
    expect(finalLeadSchema.safeParse({ ...base, email: "" }).success).toBe(true);
  });
  it("origin allowlist", () => {
    expect(isAllowedOrigin("https://yogjivan.com")).toBe(true);
    expect(isAllowedOrigin("https://id-preview--x.lovable.app")).toBe(true);
    expect(isAllowedOrigin("https://evil.com")).toBe(false);
    expect(isAllowedOrigin("https://yogjivan.com.evil.com")).toBe(false);
    expect(isAllowedOrigin(null)).toBe(false);
  });
  it("public responses never reveal the matched rule; honeypot is not a conversion", () => {
    const r = publicResponse("rate_limited");
    expect(r.status).toBe(429);
    expect(JSON.stringify(r.body)).not.toMatch(/ip|session|15|block/i);
    expect(publicResponse("honeypot").body.outcome).toBe("received");
    expect(publicResponse("duplicate").body.outcome).toBe("duplicate");
  });
  it("Turnstile stays off unless both keys exist", () => {
    expect(turnstileConfigured({})).toBe(false);
    expect(turnstileConfigured({ TURNSTILE_SECRET_KEY: "s" })).toBe(false);
    expect(turnstileConfigured({ TURNSTILE_SECRET_KEY: "s", VITE_TURNSTILE_SITE_KEY: "k" })).toBe(true);
  });
});
