import { createFileRoute } from "@tanstack/react-router";
import { clientIp, isAllowedOrigin } from "@/lib/leads/intake";
import { FEEDBACK_MAX_PER_HOUR, feedbackSchema, redactContact } from "@/lib/help/feedback";

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Private feedback intake. Independent from leads: no Lead event, no CRM.
// Never logs message or contact.
export const Route = createFileRoute("/api/public/help/feedback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const nostore = { "cache-control": "no-store" };
        if (!isAllowedOrigin(request.headers.get("origin"))) return Response.json({ ok: false }, { status: 403 });
        const text = await request.text();
        if (text.length > 4000) return Response.json({ ok: false }, { status: 413 });
        let json: unknown = null;
        try { json = JSON.parse(text); } catch { /* invalid */ }
        const parsed = feedbackSchema.safeParse(json);
        if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: st } = await supabaseAdmin.from("automation_settings").select("fingerprint_key").eq("id", 1).maybeSingle();
        const ipHash = await sha256(`${st?.fingerprint_key ?? "yj"}:help:${clientIp(request.headers) ?? "unknown"}`);
        const since = new Date(Date.now() - 3600_000).toISOString();
        const { count, error: cErr } = await supabaseAdmin
          .from("help_feedback").select("id", { count: "exact", head: true })
          .eq("ip_hash", ipHash).gte("created_at", since);
        if (cErr) return Response.json({ ok: false }, { status: 500 });
        if ((count ?? 0) >= FEEDBACK_MAX_PER_HOUR) return Response.json({ ok: false, error: "rate" }, { status: 429 });
        const d = parsed.data;
        const hasContact = Boolean(d.reply_contact && d.contact_consent);
        const { data: row, error } = await supabaseAdmin.from("help_feedback").insert({
          kind: d.kind, message: redactContact(d.message), page_path: d.page_path ?? null, lang: d.lang ?? null,
          ip_hash: ipHash, has_contact: hasContact,
        }).select("id,ticket_id").single();
        if (error || !row) return Response.json({ ok: false }, { status: 500 });
        if (hasContact) {
          const { error: ce } = await supabaseAdmin.from("help_feedback_contacts").insert({ feedback_id: row.id, contact: d.reply_contact! });
          if (ce) await supabaseAdmin.from("help_feedback").update({ has_contact: false }).eq("id", row.id);
        }
        const { notifyFeedback } = await import("@/lib/help/notify.server");
        let notify = "failed";
        try { notify = await notifyFeedback(supabaseAdmin, row.id); } catch { /* stays pending for catch-up */ }
        return Response.json({ ok: true, ticket_id: row.ticket_id, notified: notify === "sent" }, { headers: nostore });
      },
    },
  },
});
