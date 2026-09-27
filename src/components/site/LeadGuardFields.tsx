import { useEffect, useRef } from "react";
import { HONEYPOT_NAME, setTurnstileToken } from "@/lib/lead-guard-client";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; remove: (id: string) => void };
  }
}

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.getElementById("cf-turnstile-js") as HTMLScriptElement | null;
  return new Promise((resolve) => {
    const s = existing ?? document.createElement("script");
    s.addEventListener("load", () => resolve());
    if (!existing) {
      s.id = "cf-turnstile-js";
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      document.head.appendChild(s);
    }
  });
}

/** Hidden honeypot + optional Cloudflare Turnstile (only when a site key is configured). */
export function LeadGuardFields() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let id: string | null = null;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !ref.current || !window.turnstile) return;
      id = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        action: "lead_submit",
        callback: (t: string) => setTurnstileToken(t),
        "expired-callback": () => setTurnstileToken(null),
      });
    });
    return () => {
      cancelled = true;
      if (id && window.turnstile) window.turnstile.remove(id);
    };
  }, []);
  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {SITE_KEY ? <div ref={ref} className="mt-2" /> : null}
    </>
  );
}
