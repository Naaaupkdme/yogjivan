import { createFileRoute } from "@tanstack/react-router";
import { clickRowFromForm, isIntent, isNonHumanRequest, newWaRef, waDestination } from "@/lib/wa-click";

const HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer" };

function redirect(url: string, status: 302 | 303) {
  return new Response(null, { status, headers: { ...HEADERS, Location: url } });
}

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | "timeout"> {
  return Promise.race([p, new Promise<"timeout">((r) => setTimeout(() => r("timeout"), ms))]);
}

export const Route = createFileRoute("/go/whatsapp")({
  server: {
    handlers: {
      // GET: no-JS / modifier-click fallback. Never records a click (bots and
      // prefetchers issue GETs), just redirects to the business WhatsApp.
      GET: async ({ request }) => {
        const i = new URL(request.url).searchParams.get("i");
        return redirect(waDestination(isIntent(i) ? i : "general", null), 302);
      },
      // POST: issued by the click handler on a real user click.
      POST: async ({ request }) => {
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return redirect(waDestination("general", null), 303);
        }
        const i = form.get("i");
        const intent = isIntent(i) ? i : "general";
        if (isNonHumanRequest(request.headers)) return redirect(waDestination(intent, null), 303);

        const ref = newWaRef();
        let stored: string | null = null;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const r = await withTimeout(
            (supabaseAdmin as any).from("whatsapp_clicks").insert(clickRowFromForm(form, ref)),
            1500,
          );
          if (r !== "timeout" && !(r as { error?: unknown }).error) stored = ref;
        } catch {
          stored = null; // storage unavailable: redirect without a reference
        }
        return redirect(waDestination(intent, stored), 303);
      },
    },
  },
});
