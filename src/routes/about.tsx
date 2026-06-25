import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { About } from "@/components/site/About";
import { Transformation } from "@/components/site/Transformation";
import heroImg from "@/assets/file_00000000cca471fbb8967be0b0dfeda8.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Master Anil Choudhary — Yog Jivan" },
      { name: "description", content: "Meet Master Anil Choudhary, founder of Yog Jivan. 12+ years of authentic yoga, therapeutic practice and holistic wellness in Hai Duong, Vietnam." },
      { property: "og:title", content: "About Master Anil Choudhary — Yog Jivan" },
      { property: "og:description", content: "Authentic yoga rooted in tradition, taught in Vietnam by Master Anil Choudhary." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="The Founder" title="A life devoted to the" accent="path." sub="Master Anil Choudhary brings twelve years of traditional Indian yoga, therapeutic mastery and quiet authority to every student he touches." image={heroImg.url} />
      <About />
      <Transformation />
      <CTABanner title="Meet Master Anil in person." sub="A free consultation is the first step on the path." />
    </>
  ),
});
