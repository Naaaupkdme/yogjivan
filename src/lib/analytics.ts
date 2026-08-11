/**
 * Yog Jivan — analytics core.
 *
 * Google Advanced Consent Mode v2:
 *   - consent defaults (analytics_storage / ad_storage / ad_user_data /
 *     ad_personalization) are set to "denied" BEFORE gtag.js loads,
 *   - the Google tag then loads in restricted (cookieless) mode,
 *   - a consent "update" is pushed the moment the visitor decides.
 *
 * Meta Pixel is NOT covered by Google Consent Mode, so it is only injected
 * after marketing consent is granted, and every fbq() call is gated too.
 *
 * NEVER pass PII (name, phone, email, health notes, message body) to either
 * platform — only page context and generic category labels.
 */

export const GA_MEASUREMENT_ID = "G-LFV05NVEJZ";
export const META_PIXEL_ID = "1752860699056785";

const STORAGE_KEY = "yj_cookie_consent_v2";
const LEGACY_KEY = "yj_cookie_consent";
export const CONSENT_EVENT = "yj:consent-changed";
export const OPEN_SETTINGS_EVENT = "yj:open-cookie-settings";

export type Consent = { analytics: boolean; marketing: boolean };
export type StoredConsent = Consent & { decided: boolean };

export const DENIED: Consent = { analytics: false, marketing: false };

type Gtag = (...args: unknown[]) => void;
type W = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
  fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
  _fbq?: unknown;
};

function w(): W | null {
  return typeof window === "undefined" ? null : (window as unknown as W);
}

/* ------------------------------------------------------------------ consent */

export function readConsent(): StoredConsent {
  const win = w();
  if (!win) return { ...DENIED, decided: false };
  try {
    const raw = win.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Consent>;
      return {
        analytics: parsed.analytics === true,
        marketing: parsed.marketing === true,
        decided: true,
      };
    }
    // Migrate the old single accepted/rejected flag.
    const legacy = win.localStorage.getItem(LEGACY_KEY);
    if (legacy === "accepted") return { analytics: true, marketing: true, decided: true };
    if (legacy === "rejected") return { ...DENIED, decided: true };
  } catch {
    /* storage disabled — treat as undecided */
  }
  return { ...DENIED, decided: false };
}

export function writeConsent(next: Consent) {
  const win = w();
  if (!win) return;
  try {
    win.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    win.localStorage.setItem(LEGACY_KEY, next.analytics || next.marketing ? "accepted" : "rejected");
  } catch {
    /* storage disabled — the choice simply won't persist */
  }
  applyConsent(next);
  win.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
}

/** Backwards-compatible helper used by older components. */
export function getConsent(): "accepted" | "rejected" | null {
  const c = readConsent();
  if (!c.decided) return null;
  return c.analytics || c.marketing ? "accepted" : "rejected";
}

/* ------------------------------------------------------------------- google */

function ensureGtag(): Gtag {
  const win = w()!;
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    } as unknown as Gtag;
  }
  return win.gtag!;
}

let googleBooted = false;

/** Sets denied defaults, then loads gtag.js in restricted consent mode. */
export function bootGoogle() {
  const win = w();
  if (!win || googleBooted) return;
  googleBooted = true;

  const gtag = ensureGtag();
  const stored = readConsent();

  // 1. Defaults — must be pushed BEFORE any config/event command.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);

  // 2. If the visitor already decided in a previous session, apply it now.
  if (stored.decided) pushConsentUpdate(stored);

  // 3. Load the Google tag (cookieless while denied).
  if (!document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
  }

  gtag("js", new Date());
  // Route changes are tracked manually — never let the tag auto-send page_view.
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true });
}

function pushConsentUpdate(c: Consent) {
  const gtag = ensureGtag();
  gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
}

/* --------------------------------------------------------------- meta pixel */

let metaBooted = false;

function bootMeta() {
  const win = w();
  if (!win || metaBooted) return;
  metaBooted = true;
  /* eslint-disable */
  (function (f: any, b: any, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    const t = b.createElement(e); t.async = true; t.src = v;
    const s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(win, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  win.fbq!("init", META_PIXEL_ID);
  // PageView is sent by trackPageView() so it is never duplicated.
}

/** Applies a consent decision to both platforms. */
export function applyConsent(c: Consent) {
  if (!w()) return;
  bootGoogle();
  pushConsentUpdate(c);
  if (c.marketing) bootMeta();
}

/** Initialises measurement on first client render. */
export function initAnalytics() {
  const win = w();
  if (!win) return;
  bootGoogle();
  const stored = readConsent();
  if (stored.marketing) bootMeta();
}

/* ------------------------------------------------------------------- events */

export function pagePath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname + window.location.search;
}

/** GA4 event. Safe while consent is denied (cookieless / modelled). */
export function gaEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  const win = w();
  if (!win || typeof win.gtag !== "function") return;
  win.gtag("event", name, { page_path: pagePath(), ...params });
}

/** Meta event — only fires when marketing consent is granted. */
export function metaEvent(
  name: string,
  params: Record<string, string | number> = {},
  /** Meta CAPI deduplication key — the same value must be sent server-side. */
  eventId?: string,
) {
  const win = w();
  if (!win || typeof win.fbq !== "function") return;
  if (!readConsent().marketing) return;
  if (eventId) win.fbq("track", name, params, { eventID: eventId });
  else win.fbq("track", name, params);
}


export function trackPageView() {
  const win = w();
  if (!win) return;
  gaEvent("page_view", {
    page_location: win.location.href,
    page_path: pagePath(),
    page_title: document.title,
  });
  metaEvent("PageView");
}

export type CtaEvent =
  | "book_trial_click"
  | "whatsapp_click"
  | "zalo_click"
  | "phone_click"
  | "email_click";

export function trackCta(
  name: CtaEvent,
  ctaLocation: string,
  extra: Record<string, string> = {},
) {
  gaEvent(name, { cta_location: ctaLocation, ...extra });
}

/** Reusable for the future online-pricing page. */
export function trackPricingView(planGroup = "online") {
  gaEvent("pricing_view", { plan_group: planGroup });
}

let formStarted = new Set<string>();
export function trackFormStart(formId: string) {
  if (formStarted.has(formId)) return;
  formStarted.add(formId);
  gaEvent("form_start", { form_id: formId });
}

/** Only ever call after a confirmed successful lead insert + success state. */
export function trackGenerateLead(serviceCategory: string, formId: string) {
  gaEvent("generate_lead", { form_id: formId, service_category: serviceCategory || "unspecified" });
  metaEvent("Lead", { content_category: serviceCategory || "unspecified" });
}
