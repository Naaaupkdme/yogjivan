// Paid-traffic attribution capture.
//
// First-touch attribution is stored once per browser so the value survives
// internal navigation. NO personal data is captured here — only campaign
// parameters, click IDs, the landing path and the referring host.

const KEY = "yj.attribution.v1";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  placement?: string;
  keyword?: string;
  matchtype?: string;
  device?: string;
  market?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  ttclid?: string;
  msclkid?: string;
  li_fat_id?: string;
  referrer_host?: string;
  landing_path?: string;
  captured_at?: string;
};

const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "campaign_id",
  "adset_id",
  "ad_id",
  "placement",
  "keyword",
  "matchtype",
  "device",
  "market",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "li_fat_id",
] as const;


function clean(v: string | null): string | undefined {
  if (!v) return undefined;
  const t = v.trim().slice(0, 120);
  return t || undefined;
}

/** Reads campaign data from the current URL and stores it (first touch wins). */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const existing = readAttribution();
  const url = new URL(window.location.href);
  const fresh: Attribution = {};
  for (const p of PARAMS) {
    const v = clean(url.searchParams.get(p));
    if (v) fresh[p] = v;
  }
  const hasFresh = Object.keys(fresh).length > 0;

  // Keep the first touch unless this visit carries new campaign parameters.
  if (!hasFresh && existing.captured_at) return existing;

  let referrer_host: string | undefined;
  try {
    if (document.referrer) {
      const r = new URL(document.referrer);
      if (r.host !== window.location.host) referrer_host = r.host.slice(0, 120);
    }
  } catch {
    /* ignore malformed referrer */
  }

  const next: Attribution = {
    ...(hasFresh ? fresh : existing),
    referrer_host: referrer_host ?? existing.referrer_host,
    landing_path: existing.landing_path ?? url.pathname,
    captured_at: existing.captured_at ?? new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — attribution is best-effort */
  }
  return next;
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Coarse channel label, safe to send to analytics (never PII). */
export function channelOf(a: Attribution): string {
  if (a.gclid || a.utm_source === "google") return "google";
  if (a.fbclid || a.utm_source === "facebook" || a.utm_source === "meta") return "meta";
  if (a.utm_source) return a.utm_source;
  if (a.referrer_host) return "referral";
  return "direct";
}
