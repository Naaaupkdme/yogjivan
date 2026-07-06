import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/online")({
  head: () => ({
    meta: [
      { title: "Online Yoga Classes with Master Anil Choudhary — Join from Anywhere" },
      { name: "description", content: "Live and on-demand online yoga classes for beginners and advanced students with Master Anil Choudhary. Yoga for back pain, PCOD, anxiety, weight loss and stress — students in 20+ countries." },
      { property: "og:title", content: "Online Yoga Classes — Yog Jivan" },
      { property: "og:description", content: "Live and on-demand online yoga classes for beginners and advanced practitioners, anywhere in the world." },
      { property: "og:url", content: "https://www.yogjivan.com/online" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/online" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Online Programs" title="The studio, wherever" accent="you are." sub="Live cohort programs and on-demand series, taught with the same depth and care as our in-person practice." />
      <Testimonials />
      <CTABanner title="Join the next cohort." sub="Limited seats. Begins monthly." />
    </>
  ),
});
