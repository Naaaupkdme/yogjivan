import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy URL. The private-yoga service page now lives at /private-online-yoga.
 * Permanent server-side redirect — never a client-only navigate.
 */
export const Route = createFileRoute("/personal-training")({
  beforeLoad: () => {
    throw redirect({ to: "/private-online-yoga", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/private-online-yoga" }],
  }),
  component: () => null,
});
