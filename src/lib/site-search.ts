// Sitewide search. The page index is generated automatically from each public
// route's own head() metadata (see src/lib/search/route-meta.ts and the
// yj-search-index Vite plugin); blog articles come from the editorial registry.
// Nothing here lists pages by hand: only query aliases (synonyms) live here.
import type { RouteSearchEntry } from "@/lib/search/route-meta";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  locale: "en" | "vi";
  /** Extra searchable text (FAQ questions, blog keywords). */
  text: string;
};

export type SearchResult = SearchEntry & { score: number };

/** Lowercase + strip diacritics (handles Vietnamese đ/Đ too). */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Query aliases: a normalized phrase on the left expands to extra search terms.
 * Generic vocabulary only — never page URLs — so new pages benefit automatically.
 */
const ALIASES: Record<string, string> = {
  couple: "couples partner two adults",
  couples: "couple partner two adults",
  "cap doi": "couples partner two adults",
  "yoga cap doi": "couples partner two adults",
  "vo chong": "couples partner two adults",
  family: "family families household kids parents",
  "gia dinh": "family families household",
  kids: "kids children school play based",
  kid: "kids children school",
  children: "kids school",
  child: "kids school",
  "tre em": "kids children school hoc duong",
  "thieu nhi": "kids children school",
  school: "school kids children",
  schools: "school kids",
  "hoc duong": "school kids hoc duong",
  "truong hoc": "school kids hoc duong",
  corporate: "corporate workplace company team office doanh nghiep",
  workplace: "corporate workplace office team doanh nghiep",
  office: "corporate workplace chair doanh nghiep",
  company: "corporate workplace doanh nghiep",
  business: "corporate workplace doanh nghiep",
  "doanh nghiep": "corporate workplace doanh nghiep",
  "cong ty": "corporate workplace doanh nghiep",
  "van phong": "corporate workplace doanh nghiep",
  private: "private 1 to 1 one",
  "one to one": "private 1 to 1",
  "one on one": "private 1 to 1",
  "1 on 1": "private 1 to 1",
  "1 1": "private 1 to 1",
  personal: "private 1 to 1",
  "mot kem mot": "1 kem 1 private",
  "1 kem 1": "1 kem 1 private",
  "kem rieng": "1 kem 1 private",
  online: "online live",
  "truc tuyen": "online truc tuyen",
  price: "pricing programs",
  prices: "pricing programs",
  cost: "pricing programs",
  "gia": "pricing programs",
  "hoc phi": "pricing programs",
  beginner: "beginners",
  "nguoi moi": "beginners",
  back: "back discomfort",
  stress: "stress",
  "cang thang": "stress",
  contact: "contact consultation book",
  "lien he": "contact consultation",
  teacher: "master anil founder",
  "giao vien": "master anil",
  location: "hai duong studio contact",
  "near me": "hai duong studio",
};

function expand(q: string): string[] {
  const hit = Object.keys(ALIASES).filter(
    (k) => q === k || q.startsWith(`${k} `) || q.endsWith(` ${k}`) || q.includes(` ${k} `),
  );
  // Longest phrase wins: "gia dinh" (family) must not also trigger "gia" (price).
  return hit.filter((k) => !hit.some((o) => o !== k && o.includes(k))).map((k) => ALIASES[k]!);
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length]!;
}

function tokenScore(token: string, haystack: string, weight: number): number {
  if (!token) return 0;
  if (` ${haystack} `.includes(` ${token}`)) return weight * (haystack.startsWith(token) ? 1.2 : 1);
  if (token.length >= 4 && haystack.includes(token)) return weight * 0.7;
  if (token.length >= 4) {
    for (const word of haystack.split(" ")) {
      if (Math.abs(word.length - token.length) <= 2 && editDistance(token, word) <= 1) return weight * 0.6;
    }
  }
  return 0;
}

const STOP = new Set(["yoga", "the", "a", "for", "in", "and", "of", "lop", "cho", "tai", "va"]);

/** Turn generated route metadata + editorial posts into searchable entries. */
export function buildEntries(
  routes: RouteSearchEntry[],
  posts: { slug: string; title: string; excerpt: string; cat: string; faqs?: { q: string }[] }[] = [],
): SearchEntry[] {
  const pages: SearchEntry[] = routes.map((r) => ({
    id: `page:${r.p}`,
    title: r.t,
    description: r.d,
    category: r.l === "vi" ? "Trang" : "Page",
    href: r.p,
    locale: r.l,
    text: r.k,
  }));
  const seen = new Set(pages.map((p) => p.href));
  const blog: SearchEntry[] = posts
    .filter((p) => !seen.has(`/blog/${p.slug}`))
    .map((p) => ({
      id: `blog:${p.slug}`,
      title: p.title,
      description: p.excerpt.length > 180 ? `${p.excerpt.slice(0, 179)}…` : p.excerpt,
      category: `Blog · ${p.cat}`,
      href: `/blog/${p.slug}`,
      locale: /[ăâđêôơư]/i.test(p.title) ? "vi" : "en",
      text: [p.slug.replace(/-/g, " "), ...(p.faqs ?? []).slice(0, 4).map((f) => f.q)].join(" "),
    }));
  return [...pages, ...blog];
}

type Prepared = { e: SearchEntry; title: string; desc: string; text: string; path: string };
const cache = new WeakMap<SearchEntry[], Prepared[]>();
function prepare(entries: SearchEntry[]): Prepared[] {
  let p = cache.get(entries);
  if (!p) {
    p = entries.map((e) => ({
      e,
      title: normalize(e.title),
      desc: normalize(e.description),
      text: normalize(e.text),
      path: normalize(e.href.replace(/[/-]/g, " ")),
    }));
    cache.set(entries, p);
  }
  return p;
}

/**
 * Scoped leadership section aliases: only an exact normalized query triggers
 * this result, so generic words like "form" never fuzzily match the profile.
 */
export const LEADERSHIP_ALIASES = new Set(
  ["Sonu Ghanghas", "Sonu", "co-founder", "co founder", "cofounder", "co form", "Dong sang lap", "đồng sáng lập"].map(normalize),
);
export const LEADERSHIP_RESULTS: Record<"en" | "vi", SearchEntry> = {
  en: {
    id: "section:sonu-ghanghas:en", title: "Sonu Ghanghas — Co-founder & Growth Partner",
    description: "Leadership profile: website, SEO and enquiry-workflow work behind Yog Jivan.",
    category: "Leadership", href: "/about#sonu-ghanghas", locale: "en", text: "",
  },
  vi: {
    id: "section:sonu-ghanghas:vi", title: "Sonu Ghanghas — Đồng sáng lập & phụ trách phát triển",
    description: "Hồ sơ lãnh đạo: website, SEO và quy trình xử lý yêu cầu của Yog Jivan.",
    category: "Lãnh đạo", href: "/vi/gioi-thieu#sonu-ghanghas", locale: "vi", text: "",
  },
};

export function searchSite(
  query: string,
  entries: SearchEntry[],
  opts: { limit?: number; locale?: "en" | "vi" } = {},
): SearchResult[] {
  const { limit = 8, locale } = opts;
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter((t) => t && !STOP.has(t));
  const aliasTokens = expand(q).join(" ").split(" ").filter((t) => t && !STOP.has(t) && !tokens.includes(t));
  if (!tokens.length && !aliasTokens.length) tokens.push(...q.split(" "));

  const results: SearchResult[] = [];
  for (const p of prepare(entries)) {
    let score = 0;
    if (p.title === q) score += 200;
    else if (p.title.startsWith(q)) score += 120;
    else if (p.title.includes(q)) score += 90;
    if (p.path.includes(q)) score += 60;
    if (p.desc.includes(q)) score += 30;
    if (p.text.includes(q)) score += 20;

    let hits = 0;
    for (const t of tokens) {
      const s = tokenScore(t, p.title, 24) + tokenScore(t, p.path, 20) + tokenScore(t, p.desc, 8) + tokenScore(t, p.text, 5);
      if (s > 0) hits++;
      score += s;
    }
    for (const t of aliasTokens) {
      score += tokenScore(t, p.title, 24) + tokenScore(t, p.path, 20) + 0.5 * tokenScore(t, p.desc, 6);
    }
    // Multi-word queries must match most of their words directly unless an alias carried them.
    if (tokens.length > 1 && hits < Math.ceil(tokens.length / 2) && score < 40) continue;
    if (score <= 0) continue;
    if (!p.e.href.startsWith("/blog/")) score *= 1.6;
    if (locale && p.e.locale === locale) score *= 1.3;
    results.push({ ...p.e, score });
  }
  const sorted = results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  if (LEADERSHIP_ALIASES.has(q)) sorted.unshift({ ...LEADERSHIP_RESULTS[locale ?? "en"], score: 1000 });
  return sorted.slice(0, limit);
}

/** Lazily load the generated page index + blog registry (kept out of the main bundle). */
let loading: Promise<SearchEntry[]> | null = null;
export function loadSearchEntries(): Promise<SearchEntry[]> {
  loading ??= Promise.all([import("virtual:yj-search-index"), import("@/lib/blog-posts")]).then(
    ([routes, blog]) => buildEntries(routes.default, blog.BLOG_POSTS),
  );
  return loading;
}

export const POPULAR_SEARCHES = {
  en: ["Private online yoga", "Online classes", "Couples yoga", "Family yoga", "Corporate yoga", "Kids yoga"],
  vi: ["Yoga 1 kèm 1", "Lớp yoga online", "Yoga cặp đôi", "Yoga gia đình", "Yoga doanh nghiệp", "Yoga học đường"],
};

export const FALLBACK_LINKS = {
  en: [
    { label: "Online Classes", href: "/online-yoga-classes" },
    { label: "Beginner Yoga", href: "/yoga-for-beginners" },
    { label: "Private Training", href: "/private-online-yoga" },
    { label: "Programs", href: "/programs" },
    { label: "Contact", href: "/contact" },
  ],
  vi: [
    { label: "Lớp yoga online", href: "/vi/lop-yoga-online" },
    { label: "Yoga 1 kèm 1", href: "/vi/yoga-1-kem-1-online" },
    { label: "Yoga Hải Dương", href: "/vi/yoga-hai-duong" },
    { label: "Trang chủ", href: "/vi" },
  ],
};
