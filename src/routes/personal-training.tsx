import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import img from "@/assets/file_00000000704c71fb99f50d9c4f4b74ce.png.asset.json";

export const Route = createFileRoute("/personal-training")({
  head: () => ({
    meta: [
      { title: "Personal Yoga Training in Hai Duong — Yog Jivan" },
      { name: "description", content: "Private 1-on-1 yoga sessions with Master Anil Choudhary. Custom 90-day transformation plans for serious students." },
      { property: "og:title", content: "Personal Yoga Training — Yog Jivan" },
      { property: "og:description", content: "Bespoke private sessions designed entirely around you." },
      { property: "og:url", content: "/personal-training" },
    ],
    links: [{ rel: "canonical", href: "/personal-training" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Personal Training" title="A practice shaped entirely" accent="around you." sub="One student. One master. One uninterrupted hour. The most direct way to transform your body and mind." image={img.url} />
      <CTABanner title="Reserve a private session." sub="Limited weekly slots. Apply for an introductory consultation." />
    </>
  ),
});
