import { createFileRoute } from "@tanstack/react-router";
import { clientIp, isAllowedOrigin } from "@/lib/leads/intake";
import { FEEDBACK_MAX_PER_HOUR, feedbackSchema, redactContact } from "@/lib/help/feedback";

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/api/public/help/feedback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAllowedOrigin(request.headers.get("origin"))) return Response.json({ ok: false }, { status: 403 });
        const text = await request.text();
        if (text.length > 4000) return Response.json({ ok: false }, { status: 413 });
        let json: unknown = null;
        try { json = JSON.parse(text); } catch { /* invalid */ }
        const parsed = feedbackSchema.safeParse(json);
        if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const salt = process.env.SUPABASE_URL ?? "yj";
        const ipHash = await sha256(`${salt}:${clientIp(request.headers) ?? "unknown"}`);
        const since = new Date(Date.now() - 3600_000).toISOString();
        const { count, error: cErr } = await supabaseAdmin
          .from("help_feedback").select("id", { count: "exact", head: true })
          .eq("ip_hash", ipHash).gte("created_at", since);
        if (cErr) return Response.json({ ok: false }, { status: 500 });
        if ((count ?? 0) >= FEEDBACK_MAX_PER_HOUR) return Response.json({ ok: false, error: "rate" }, { status: 429 });
        const d = parsed.data;
        const { error } = await supabaseAdmin.from("help_feedback").insert({
          kind: d.kind, message: redactContact(d.message), page_path: d.page_path ?? null, lang: d.lang ?? null, ip_hash: ipHash,
        });
        if (error) return Response.json({ ok: false }, { status: 500 });
        return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
      },
    },
  },
});
