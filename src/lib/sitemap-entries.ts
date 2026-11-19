// Sitemap URLs are derived from the same route head() metadata as site search
// (virtual:yj-search-index, which already drops noindex/redirect/utility/draft
// routes) plus the BLOG_POSTS editorial registry. No hand-typed page list.
import type { RouteSearchEntry } from "@/lib/search/route-meta";

export const SITEMAP_BASE_URL = "https://www.yogjivan.com";

export type SitemapEntry = { path: string; lastmod?: string };

export function buildSitemapEntries(
  routes: Pick<RouteSearchEntry, "p">[],
  posts: { slug: string; date: string; updated?: string }[],
): SitemapEntry[] {
  const map = new Map<string, SitemapEntry>();
  for (const r of routes) map.set(r.p, { path: r.p });
  for (const p of posts) map.set(`/blog/${p.slug}`, { path: `/blog/${p.slug}`, lastmod: p.updated ?? p.date });
  return [...map.values()].sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));
}
