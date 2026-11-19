import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import routeIndex from "virtual:yj-search-index";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildSitemapEntries, SITEMAP_BASE_URL } from "@/lib/sitemap-entries";

// Canonical, indexable HTML routes only — generated automatically from each
// route's head() metadata (same source as site search) plus blog posts.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = buildSitemapEntries(routeIndex, BLOG_POSTS).map((e) =>
          [
            `  <url>`,
            `    <loc>${SITEMAP_BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>weekly</changefreq>`,
            `    <priority>${e.path === "/" ? "1.0" : "0.8"}</priority>`,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
