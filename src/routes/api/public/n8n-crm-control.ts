import { createFileRoute } from "@tanstack/react-router";

// n8n CRM controller bridge. Disabled unless N8N_CRM_BRIDGE_TOKEN is set; Bearer-authenticated.
export const Route = createFileRoute("/api/public/n8n-crm-control")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const text = await request.text();
        if (text.length > 8192) return Response.json({ ok: false, error: "Too large" }, { status: 413 });
        let body: unknown = null;
        try { body = JSON.parse(text); } catch { /* invalid */ }
        const { handleCrmControl } = await import("@/lib/crm/bridge");
        const secret = process.env.N8N_CRM_BRIDGE_TOKEN;
        const r = await handleCrmControl(
          { authorization: request.headers.get("authorization"), body },
          {
            secret,
            rpc: async (args) => {
              const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
              const res = await (supabaseAdmin as any).rpc("crm_apply_action", args);
              if (res.error) console.error("crm bridge rpc failed:", res.error.code ?? "unknown");
              return res;
            },
          },
        );
        return Response.json(r.body, { status: r.status, headers: { "cache-control": "no-store" } });
      },
    },
  },
});
