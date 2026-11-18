import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { clientIp, isAllowedOrigin } from "@/lib/leads/intake";
import { detectLang, factsFor, isHealthQuestion, isPriceQuestion, priceAnswer } from "@/lib/help/knowledge";
import { HELP_AI } from "@/lib/help/ask-config";

const schema = z.object({ q: z.string().trim().min(2).max(HELP_AI.maxQuestionChars), lang: z.enum(["EN", "VI"]), website: z.string().max(0).optional() });

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Help AI answers. Prices + health handoff are deterministic (no AI call).
// No question text is stored or logged; only daily aggregate outcome counts.
export const Route = createFileRoute("/api/public/help/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const h = { "cache-control": "no-store" };
        if (!isAllowedOrigin(request.headers.get("origin"))) return Response.json({ ok: false }, { status: 403 });
        const text = await request.text();
        if (text.length > 2000) return Response.json({ ok: false }, { status: 413 });
        let json: unknown = null;
        try { json = JSON.parse(text); } catch { /* invalid */ }
        const p = schema.safeParse(json);
        if (!p.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
        const lang = detectLang(p.data.q, p.data.lang);
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const outcome = (o: string) => supabaseAdmin.rpc("help_ai_outcome", { p_outcome: o }).then(() => {}, () => {});

        if (isHealthQuestion(p.data.q)) {
          await outcome("health_handoff");
          return Response.json({ ok: true, kind: "handoff", reason: "health", lang }, { headers: h });
        }
        if (isPriceQuestion(p.data.q)) {
          const a = priceAnswer(p.data.q, lang);
          await outcome("price");
          return Response.json({ ok: true, kind: "price", lang, answer: a.text, sources: factsFor(a.sources) }, { headers: h });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return Response.json({ ok: true, kind: "unavailable", lang }, { headers: h });
        const { data: st } = await supabaseAdmin.from("automation_settings").select("fingerprint_key").eq("id", 1).maybeSingle();
        const ipHash = await sha256(`${st?.fingerprint_key ?? "yj"}:helpai:${clientIp(request.headers) ?? "unknown"}`);
        const { data: take, error } = await supabaseAdmin.rpc("help_ai_take", { p_ip_hash: ipHash, p_user_cap: HELP_AI.perVisitorPerDay, p_global_cap: HELP_AI.globalPerDay });
        if (error) return Response.json({ ok: true, kind: "unavailable", lang }, { headers: h });
        if (take !== "ok") {
          await outcome(String(take));
          return Response.json({ ok: true, kind: "cap", cap: take, lang }, { headers: h });
        }
        const { askAi } = await import("@/lib/help/ask.server");
        let r = null;
        try { r = await askAi(p.data.q, lang, key); } catch { r = null; }
        if (!r) { await outcome("ai_error"); return Response.json({ ok: true, kind: "unavailable", lang }, { headers: h }); }
        if (!r.answerable || !r.answer || r.source_ids.length === 0) {
          await outcome("unanswered");
          return Response.json({ ok: true, kind: "handoff", reason: "unknown", lang }, { headers: h });
        }
        await outcome("answered");
        return Response.json({ ok: true, kind: "ai", lang, answer: r.answer, sources: factsFor(r.source_ids) }, { headers: h });
      },
    },
  },
});
