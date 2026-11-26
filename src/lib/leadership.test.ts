import { describe, expect, it } from "vitest";
import { join } from "node:path";
import { generateIndex } from "../../search-index-plugin";
import { buildEntries, searchSite } from "@/lib/site-search";
import { sonuSchema } from "@/lib/leadership";
import { buildSitemapEntries } from "@/lib/sitemap-entries";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { hreflangLinks, PAIR_ABOUT, languageSwitchTarget } from "@/lib/locale-routes";

describe("leadership identity and discovery", () => {
  it("links the owner-approved co-founder identity to the existing organization", () => {
    const en = sonuSchema("en");
    const vi = sonuSchema("vi");
    expect(en.name).toBe("Sonu Ghanghas");
    expect(en.jobTitle).toBe("Co-founder & Growth Partner");
    expect(vi.jobTitle).toBe("Đồng sáng lập & phụ trách phát triển");
    expect(en.worksFor["@id"]).toBe("https://www.yogjivan.com/#organization");
    expect(vi["@id"]).toBe(en["@id"]);
    expect(en).not.toHaveProperty("hasCredential");
  });
  it("discovers localized leadership through existing route metadata, without a profile route", () => {
    const routes = generateIndex(join(__dirname, "../routes"));
    const entries = buildEntries(routes);
    expect(searchSite("Sonu Ghanghas", entries, { locale: "en" })[0]?.href).toBe("/about");
    expect(searchSite("Sonu Ghanghas", entries, { locale: "vi" })[0]?.href).toBe("/vi/gioi-thieu");
    const sitemap = buildSitemapEntries(routes, BLOG_POSTS);
    for (const path of ["/about", "/vi/gioi-thieu"]) {
      expect(sitemap.filter((entry) => entry.path === path)).toHaveLength(1);
    }
    expect(sitemap.some((entry) => entry.path.includes("#") || entry.path.includes("sonu-ghanghas"))).toBe(false);
  });
  it("preserves the profile anchor across reciprocal language switching", () => {
    expect(languageSwitchTarget("/about", "", "#sonu-ghanghas").vi).toBe("/vi/gioi-thieu#sonu-ghanghas");
    expect(hreflangLinks(PAIR_ABOUT).map((link) => link.href)).toEqual([
      "https://www.yogjivan.com/about", "https://www.yogjivan.com/vi/gioi-thieu", "https://www.yogjivan.com/about",
    ]);
  });
});