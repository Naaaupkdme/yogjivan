import { describe, expect, it } from "vitest";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateIndex } from "../../../search-index-plugin";
import { extractRouteEntry } from "./route-meta";
import { buildEntries, searchSite } from "@/lib/site-search";
import { BLOG_POSTS } from "@/lib/blog-posts";

const ROUTES = join(__dirname, "../../routes");
const index = generateIndex(ROUTES);
const entries = buildEntries(index, BLOG_POSTS);
const top = (q: string, locale?: "en" | "vi") => searchSite(q, entries, { locale, limit: 5 }).map((r) => r.href);

describe("automatic route index", () => {
  it("includes every public service page", () => {
    const paths = index.map((e) => e.p);
    for (const p of ["/private-online-yoga", "/online-couples-yoga", "/online-family-yoga", "/corporate", "/school-yoga", "/vi/yoga-doanh-nghiep", "/vi/yoga-hoc-duong"]) {
      expect(paths).toContain(p);
    }
  });

  it("excludes redirect, noindex, draft-shop, dynamic and utility routes", () => {
    const paths = index.map((e) => e.p);
    for (const p of ["/private-yoga", "/personal-training", "/book-online-yoga", "/vi/cua-hang", "/kids-yoga-hai-duong", "/services", "/auth", "/sitemap.xml"]) {
      expect(paths).not.toContain(p);
    }
    expect(paths.some((p) => p.includes("$") || p.startsWith("/api") || p.startsWith("/go"))).toBe(false);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("every indexed page has a matching route file", () => {
    for (const e of index) {
      const file = e.p === "/" ? "index.tsx" : e.p === "/vi" ? "vi.index.tsx" : e.p === "/blog" ? "blog.index.tsx" : `${e.p.slice(1).replace(/\//g, ".")}.tsx`;
      expect(existsSync(join(ROUTES, file)), file).toBe(true);
    }
  });

  it("a newly registered public page appears automatically", () => {
    const tmp = join(ROUTES, "zz-search-fixture-page.tsx");
    writeFileSync(tmp, `import { createFileRoute } from "@tanstack/react-router";
const TITLE = "Fixture Moon Yoga | Yog Jivan";
export const Route = createFileRoute("/zz-search-fixture-page")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: "Temporary fixture." }] }),
});`);
    try {
      const fresh = buildEntries(generateIndex(ROUTES));
      expect(searchSite("moon yoga", fresh)[0]?.href).toBe("/zz-search-fixture-page");
    } finally {
      rmSync(tmp);
    }
    expect(existsSync(tmp)).toBe(false);
  });

  it("skips a noindex page written the same way", () => {
    expect(extractRouteEntry(`createFileRoute("/x")({ head: () => ({ meta: [{ title: "X" }, { name: "robots", content: "noindex" }] }) })`)).toBeNull();
  });
});

describe("search queries", () => {
  it.each([
    ["couple", "/online-couples-yoga"],
    ["couples yoga", "/online-couples-yoga"],
    ["family", "/online-family-yoga"],
    ["corporate", "/corporate"],
    ["workplace", "/corporate"],
    ["school", "/school-yoga"],
    ["kids", "/school-yoga"],
    ["private online yoga", "/private-online-yoga"],
  ])("EN %s → %s", (q, href) => expect(top(q, "en")[0]).toBe(href));

  it.each([
    ["yoga cặp đôi", "/online-couples-yoga"],
    ["gia đình", "/online-family-yoga"],
    ["doanh nghiệp", "/vi/yoga-doanh-nghiep"],
    ["doanh nghiep", "/vi/yoga-doanh-nghiep"],
    ["học đường", "/vi/yoga-hoc-duong"],
    ["trẻ em", "/vi/yoga-hoc-duong"],
    ["1 kèm 1", "/vi/yoga-1-kem-1-online"],
  ])("VI %s → %s", (q, href) => expect(top(q, "vi")[0]).toBe(href));

  it("returns nothing for gibberish", () => {
    expect(searchSite("qzxwv plorbt", entries)).toEqual([]);
  });
});
