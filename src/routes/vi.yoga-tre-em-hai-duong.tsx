import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Permanent server-side redirect to the evergreen School VI route.
 */
export const Route = createFileRoute("/vi/yoga-tre-em-hai-duong")({
  beforeLoad: () => {
    throw redirect({ to: "/vi/yoga-hoc-duong", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/vi/yoga-hoc-duong" }],
  }),
  component: () => null,
});
