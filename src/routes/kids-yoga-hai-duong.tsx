import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Permanent server-side redirect to the evergreen School Yoga route.
 */
export const Route = createFileRoute("/kids-yoga-hai-duong")({
  beforeLoad: () => {
    throw redirect({ to: "/school-yoga", statusCode: 301 });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/school-yoga" }],
  }),
  component: () => null,
});
