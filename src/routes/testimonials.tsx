import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { Transformation } from "@/components/site/Transformation";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student Stories & Testimonials — Yog Jivan Yoga Hai Duong" },
      { name: "description", content: "Real transformation stories and testimonials from Yog Jivan yoga students across Vietnam, India and Europe." },
      { property: "og:title", content: "Student Stories — Yog Jivan" },
      { property: "og:description", content: "Real transformations from Yog Jivan students." },
      { property: "og:url", content: "https://yogjivan.com/testimonials" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Student Stories — Yog Jivan" },
      { name: "twitter:description", content: "Real transformations from Yog Jivan students." },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/testimonials" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("Testimonials", "/testimonials")),
    }],
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
