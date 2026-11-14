import { createFileRoute } from "@tanstack/react-router";
import { clientIp, isAllowedOrigin } from "@/lib/leads/intake";

const MAX_SUPPORT_BYTES = 8192; // 8KB is plenty for text-only ticket

export const Route = createFileRoute("/api/public/support/submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        // Allow same-origin or configured domains
        if (origin && !isAllowedOrigin(origin)) {
          return Response.json({ ok: false, error: "Forbidden origin" }, { status: 403 });
        }

        const len = Number(request.headers.get("content-length") ?? 0);
        if (len > MAX_SUPPORT_BYTES) {
          return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
        }

        const text = await request.text();
        if (text.length > MAX_SUPPORT_BYTES) {
          return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
        }

        let json: unknown;
        try {
          json = JSON.parse(text);
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON format" }, { status: 400 });
        }

        const { processSupportSubmission } = await import(
          "@/lib/support/support-intake.server"
        );

        const r = await processSupportSubmission(json, {
          ip: clientIp(request.headers),
          origin,
        });

        return Response.json(r.body, {
          status: r.status,
          headers: { "cache-control": "no-store" },
        });
      },
    },
  },
});
