import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "crypto";

// Called only by the database (wake-on-enqueue + self-arming retry).
// Authenticated with a random token stored in the service-only settings row.
export const Route = createFileRoute("/api/public/leads/dispatch")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("x-dispatch-token") ?? "";
        if (!token || token.length > 200) return new Response("Unauthorized", { status: 401 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const admin = supabaseAdmin as any;
        const { data: s, error } = await admin
          .from("automation_settings")
          .select("telegram_enabled,telegram_chat_id,sheet_enabled,spreadsheet_id,sheet_tab,sheet_gid,dispatch_token")
          .eq("id", 1)
          .maybeSingle();
        if (error || !s?.dispatch_token) return new Response("Unavailable", { status: 503 });

        const a = Buffer.from(token);
        const b = Buffer.from(s.dispatch_token);
        if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response("Forbidden", { status: 403 });

        const { dispatchLeads } = await import("@/lib/leads/dispatch.server");
        try {
          const r = await dispatchLeads(admin, s);
          return Response.json({ ok: true, ...r });
        } catch (e) {
          console.error("lead dispatch failed:", (e as Error).message);
          return Response.json({ ok: false }, { status: 500 });
        }
      },
    },
  },
});
