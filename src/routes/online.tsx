import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/online")({
  head: () => ({
    meta: [
      { title: "Online Yoga Classes — Global Programs | Yog Jivan" },
      { name: "description", content: "Live and on-demand online yoga programs with Master Anil Choudhary. Students from Vietnam, India, Europe and beyond." },
      { property: "og:title", content: "Online Yoga Classes — Yog Jivan" },
      { property: "og:description", content: "Live and on-demand online yoga, anywhere in the world." },
      { property: "og:url", content: "/online" },
    ],
    links: [{ rel: "canonical", href: "/online" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Online Programs" title="The studio, wherever" accent="you are." sub="Live cohort programs and on-demand series, taught with the same depth and care as our in-person practice." />
      <Testimonials />
      <CTABanner title="Join the next cohort." sub="Limited seats. Begins monthly." />
    </>
  ),
});
