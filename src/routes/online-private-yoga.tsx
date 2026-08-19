import { createFileRoute, redirect } from "@tanstack/react-router";

/** Alternate discovery URL → canonical private page. */
export const Route = createFileRoute("/online-private-yoga")({
  beforeLoad: () => {
    throw redirect({ to: "/private-online-yoga", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://yogjivan.com/private-online-yoga" }],
  }),
  component: () => null,
});
