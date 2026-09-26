// Browser side of /go/whatsapp: turns a real click on a WhatsApp CTA into a
// POST form submission (bots/prefetchers only ever GET, which records nothing).
// Session id and attribution are included only with cookie consent.

import { getConsent } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";

const SESSION_KEY = "yj.lead.session";

function deviceType(): string {
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

export function buildWaClickFields(intent: string, cta: string): Record<string, string> {
  const consent = getConsent() === "accepted" ? "accepted" : "denied";
  const f: Record<string, string> = {
    i: intent,
    cta,
    p: window.location.pathname,
    consent,
    dev: deviceType(),
  };
  if (consent === "accepted") {
    try {
      const sid = window.localStorage.getItem(SESSION_KEY); // read only, never created here
      if (sid) f.sid = sid;
    } catch { /* storage unavailable */ }
    const a = readAttribution();
    const map: Record<string, string | undefined> = {
      landing: a.landing_path, ref_host: a.referrer_host, utm_source: a.utm_source,
      utm_medium: a.utm_medium, utm_campaign: a.utm_campaign, utm_term: a.utm_term,
      utm_content: a.utm_content, gclid: a.gclid, fbclid: a.fbclid, market: a.market,
    };
    for (const [k, v] of Object.entries(map)) if (v) f[k] = v;
    try { f.tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ""; } catch { /* optional */ }
  }
  return f;
}

export function installWaClickHandler(): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.("a[href^='/go/whatsapp']") as HTMLAnchorElement | null;
    if (!a) return;
    const url = new URL(a.href, window.location.origin);
    const intent = url.searchParams.get("i") ?? "general";
    const cta = a.closest("[data-cta-location]")?.getAttribute("data-cta-location") ?? "";
    e.preventDefault();
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/go/whatsapp";
    form.target = a.target === "_blank" ? "_blank" : "_self";
    form.style.display = "none";
    for (const [k, v] of Object.entries(buildWaClickFields(intent, cta))) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v.slice(0, 200);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };
  // Bubble phase so the existing GA4/Meta CTA tracker still sees the click.
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
