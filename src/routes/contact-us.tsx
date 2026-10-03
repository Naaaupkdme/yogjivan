import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL (seen as 404 in Search Console) → closest canonical page. One-hop 301. */
export const Route = createFileRoute("/contact-us")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/contact" }],
  }),
  component: () => null,
});
