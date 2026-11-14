import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Permanent server-side redirect to the evergreen Corporate VI route.
 */
export const Route = createFileRoute("/vi/yoga-doanh-nghiep-hai-duong")({
  beforeLoad: () => {
    throw redirect({ to: "/vi/yoga-doanh-nghiep", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/vi/yoga-doanh-nghiep" }],
  }),
  component: () => null,
});
