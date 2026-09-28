import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL (seen as 404 in Search Console) → closest canonical page. One-hop 301. */
export const Route = createFileRoute("/online-yoga-programs")({
  beforeLoad: () => {
    throw redirect({ to: "/online-yoga-classes", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://yogjivan.com/online-yoga-classes" }],
  }),
  component: () => null,
});
