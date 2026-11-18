import { createFileRoute } from "@tanstack/react-router";
import { shortLinkTarget } from "@/lib/short-links";

export const Route = createFileRoute("/go/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) =>
        new Response(null, {
          status: 302,
          headers: {
            Location: shortLinkTarget(params.slug),
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
          },
        }),
    },
  },
});
