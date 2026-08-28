// SOURCE OF TRUTH — EN <-> VI route mapping and hreflang emission.
//
// Google guidance applied:
//  - different languages live on DIFFERENT URLs (not client-state toggles)
//  - hreflang sets are reciprocal and include self + x-default
//  - a genuine VI page self-canonicals; it never canonicals to EN
//  - no automatic redirect based on browser / IP / Accept-Language
//
// Only TRUE equivalents are paired. /vi/yoga-hai-duong has no English
// equivalent and is deliberately absent from this table.

export const SITE_ORIGIN = "https://yogjivan.com";

export type LocalePair = { en: string; vi: string };

export const LOCALE_PAIRS: readonly LocalePair[] = [
  { en: "/", vi: "/vi" },
  { en: "/online-yoga-classes", vi: "/vi/lop-yoga-online" },
  { en: "/private-online-yoga", vi: "/vi/yoga-1-kem-1-online" },
] as const;

/** All indexable Vietnamese routes (used by the sitemap). */
export const VI_ROUTES = [
  "/vi",
  "/vi/yoga-hai-duong",
  "/vi/lop-yoga-online",
  "/vi/yoga-1-kem-1-online",
] as const;

const normalise = (path: string) => {
  const clean = path.split("?")[0]!.split("#")[0]!;
  if (clean === "" || clean === "/") return "/";
  return clean.replace(/\/+$/, "");
};

const matches = (a: string, b: string) => normalise(a) === normalise(b);

export function viCounterpart(path: string): string | null {
  const pair = LOCALE_PAIRS.find((p) => matches(p.en, path));
  return pair ? pair.vi : null;
}

export function enCounterpart(path: string): string | null {
  const pair = LOCALE_PAIRS.find((p) => matches(p.vi, path));
  return pair ? pair.en : null;
}

export function isViPath(path: string): boolean {
  const clean = normalise(path);
  // Boundary-safe: "/video" or "/vietnam" must NOT classify as Vietnamese.
  return clean === "/vi" || clean.startsWith("/vi/");
}

/**
 * Where the language control should send the visitor.
 * Unmapped EN routes fall back to the Vietnamese hub, never to a
 * same-URL partial translation. Unmapped VI routes fall back to `/`.
 */
export function languageSwitchTarget(path: string): { en: string; vi: string } {
  if (isViPath(path)) {
    return { en: enCounterpart(path) ?? "/", vi: normalise(path) === "/vi" ? "/vi" : path };
  }
  return { en: path, vi: viCounterpart(path) ?? "/vi" };
}

type HeadLink = { rel: string; href: string; hrefLang?: string };

/**
 * Reciprocal hreflang set for a TRUE equivalent pair.
 * `xDefault` is the English URL of the pair (the homepage pair uses `/`).
 */
export function hreflangLinks(pair: LocalePair): HeadLink[] {
  const en = `${SITE_ORIGIN}${pair.en}`;
  const vi = `${SITE_ORIGIN}${pair.vi}`;
  return [
    { rel: "alternate", hrefLang: "en", href: en },
    { rel: "alternate", hrefLang: "vi", href: vi },
    { rel: "alternate", hrefLang: "x-default", href: en },
  ];
}

export const PAIR_HOME = LOCALE_PAIRS[0]!;
export const PAIR_ONLINE_GROUP = LOCALE_PAIRS[1]!;
export const PAIR_PRIVATE = LOCALE_PAIRS[2]!;
