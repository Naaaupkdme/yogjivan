import { createFileRoute } from "@tanstack/react-router";
import { MAX_BODY_BYTES, clientIp, finalLeadSchema, isAllowedOrigin, publicResponse } from "@/lib/leads/intake";

// Single trusted path for every website final (status='submitted') lead.
// Browser-only: requires an allowed Origin; no CORS headers are emitted.
export const Route = createFileRoute("/api/public/leads/submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (!isAllowedOrigin(origin)) return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
        const len = Number(request.headers.get("content-length") ?? 0);
        if (len > MAX_BODY_BYTES) return Response.json({ ok: false, error: "Too large" }, { status: 413 });
        const text = await request.text();
        if (text.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "Too large" }, { status: 413 });
        let json: unknown;
        try { json = JSON.parse(text); } catch { json = null; }
        const parsed = finalLeadSchema.safeParse(json);
        if (!parsed.success) {
          const r = publicResponse("invalid");
          return Response.json(r.body, { status: r.status });
        }
        const { acceptLead } = await import("@/lib/leads/intake.server");
        const r = await acceptLead(parsed.data, { ip: clientIp(request.headers), source: parsed.data.source }, {
          requireTurnstile: true,
          allowedHost: (h) => isAllowedOrigin(`https://${h}`),
        });
        return Response.json(r.body, { status: r.status, headers: { "cache-control": "no-store" } });
      },
    },
  },
});
