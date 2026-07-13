import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/online")({
  beforeLoad: () => {
    throw redirect({ to: "/online-yoga-classes", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/online-yoga-classes" }],
  }),
  component: () => null,
});
