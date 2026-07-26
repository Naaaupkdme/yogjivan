import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.yogjivan.com";
const PATHS = ["/", "/about", "/programs", "/personal-training", "/online-yoga-classes", "/yoga-for-beginners", "/yoga-for-back-pain", "/yoga-for-stress", "/yoga-for-weight-loss", "/yoga-for-pcod", "/yoga-for-thyroid", "/period-safe-yoga", "/yoga-for-expats-in-vietnam", "/corporate", "/gallery", "/testimonials", "/blog", "/contact", "/privacy", "/pricing.md"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map((p) =>
          `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
