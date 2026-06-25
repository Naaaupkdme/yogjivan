import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Programs } from "@/components/site/Programs";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Pricing — Yog Jivan Yoga Studio" },
      { name: "description", content: "Studio memberships, personal training and online yoga programs at Yog Jivan. Transparent premium pricing in VND." },
      { property: "og:title", content: "Programs & Pricing — Yog Jivan" },
      { property: "og:description", content: "Studio memberships, personal training and online yoga programs." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Programs & Investment" title="Choose your" accent="pathway." sub="Every program is an invitation into a longer relationship with your body, breath and life." />
      <Programs />
      <Services />
      <CTABanner title="Not sure which path is yours?" sub="Book a free consultation — we'll guide you." />
    </>
  ),
});
