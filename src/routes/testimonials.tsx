import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { Transformation } from "@/components/site/Transformation";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student Stories & Testimonials — Yog Jivan" },
      { name: "description", content: "Transformation stories and testimonials from Yog Jivan students across Vietnam, India and Europe." },
      { property: "og:title", content: "Student Stories — Yog Jivan" },
      { property: "og:description", content: "Real transformations, real students." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Their Words" title="Stories of" accent="transformation." sub="From sceptics to seekers — these are the people who walked the path with us." />
      <Testimonials />
      <Transformation />
      <CTABanner title="Your story begins here." />
    </>
  ),
});
