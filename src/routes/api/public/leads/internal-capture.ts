import { createFileRoute } from "@tanstack/react-router";
import { handleInternalCapture } from "@/lib/leads/internal-capture";

// Authenticated internal capture endpoint for direct-WhatsApp enquiries.
// Requires Bearer INTERNAL_CAPTURE_TOKEN or N8N_CRM_BRIDGE_TOKEN.
// Disabled if neither secret is configured in the environment.
export const Route = createFileRoute("/api/public/leads/internal-capture")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const text = await request.text();
        if (text.length > 16384) {
          return Response.json({ ok: false, error: "Too large" }, { status: 413 });
        }
        let body: unknown = null;
        try {
          body = JSON.parse(text);
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const secret =
          process.env.INTERNAL_CAPTURE_TOKEN || process.env.N8N_CRM_BRIDGE_TOKEN;

        const res = await handleInternalCapture(
          { authorization: request.headers.get("authorization"), body },
          {
            secret,
            acceptLead: async (leadInput, ctx, opts) => {
              const { acceptLead } = await import("@/lib/leads/intake.server");
              return acceptLead(leadInput, ctx, opts);
            },
          }
        );

        return Response.json(res.body, {
          status: res.status,
          headers: { "cache-control": "no-store" },
        });
      },
    },
  },
});
