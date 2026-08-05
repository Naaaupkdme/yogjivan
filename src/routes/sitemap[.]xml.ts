import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://yogjivan.com";
import { BLOG_POSTS } from "@/lib/blog-posts";
// Only canonical, 200-status, indexable HTML routes. /pricing.md is a raw
// machine-readable file for AI agents (linked from llms.txt), not an HTML page.
type Entry = { path: string; lastmod?: string };

const STATIC_PATHS = ["/", "/about", "/programs", "/personal-training", "/online-yoga-classes", "/yoga-for-beginners", "/yoga-for-back-pain", "/yoga-for-stress", "/yoga-for-weight-loss", "/yoga-for-pcod", "/yoga-for-thyroid", "/period-safe-yoga", "/yoga-for-expats-in-vietnam", "/corporate", "/gallery", "/testimonials", "/blog", "/contact", "/privacy"];

const ENTRIES: Entry[] = [
  ...STATIC_PATHS.map((path) => ({ path })),
  ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updated ?? p.date })),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ENTRIES.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
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
