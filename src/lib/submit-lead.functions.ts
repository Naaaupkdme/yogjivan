import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z.string().trim().min(3).max(40),
  email: z.string().trim().max(200).email().optional().or(z.literal("")),
  goals: z.array(z.string().max(80)).max(20).optional(),
  preferred_experience: z.string().max(80).optional(),
  preferred_time: z.string().max(80).optional(),
  health_notes: z.string().max(1000).optional(),
  health_tags: z.array(z.string().max(80)).max(20).optional(),
  experience_level: z.string().max(80).optional(),
  status: z.string().max(40),
});

// Simple in-memory rate limit per IP (best-effort; workers are stateless but
// this still limits per-instance bursts).
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) return false;
  return true;
}

function stripFormula(v: string): string {
  // Neutralize spreadsheet-formula injection payloads.
  return v.replace(/^[=+\-@\t\r]+/, "");
}

export const submitLeadToCrm = createServerFn({ method: "POST" })
  .inputValidator((data) => payloadSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.MAKE_WEBHOOK_URL;
    if (!url) throw new Error("CRM webhook not configured");

    // Best-effort IP based rate limit using request headers.
    const { getRequestHeader, getRequestIP } = await import(
      "@tanstack/react-start/server"
    );
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      getRequestIP() ||
      "unknown";
    if (!rateLimit(ip)) {
      throw new Error("Too many requests");
    }

    const body = {
      full_name: stripFormula(data.name),
      email: stripFormula(data.email || ""),
      phone: (data.whatsapp.startsWith("+") ? "+" : "") + stripFormula(data.whatsapp),
      country: "",
      city: "",
      service: stripFormula(data.preferred_experience || ""),
      message: stripFormula(
        [
          data.health_notes,
          data.goals?.length ? `Goals: ${data.goals.join(", ")}` : "",
          data.preferred_time ? `Preferred time: ${data.preferred_time}` : "",
          data.experience_level ? `Experience: ${data.experience_level}` : "",
          data.health_tags?.length ? `Health: ${data.health_tags.join(", ")}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      ),
      source: "Website Contact Form",
      created_at: new Date().toISOString(),
    };

    const startedAt = Date.now();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const ms = Date.now() - startedAt;
      if (!res.ok) {
        console.error(
          `[submitLeadToCrm] webhook non-2xx status=${res.status} in ${ms}ms`,
        );
        throw new Error(`Webhook failed with status ${res.status}`);
      }
      console.log(`[submitLeadToCrm] webhook ok status=${res.status} in ${ms}ms`);
      return { ok: true };
    } catch (err) {
      console.error(
        `[submitLeadToCrm] webhook error after ${Date.now() - startedAt}ms:`,
        err instanceof Error ? err.message : err,
      );
      throw err;
    }
  });
