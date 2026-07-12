import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { About } from "@/components/site/About";
import { Transformation } from "@/components/site/Transformation";
import { masterImages } from "@/lib/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Master Anil Choudhary — Founder of Yog Jivan Hai Duong" },
      { name: "description", content: "Meet Master Anil Choudhary, founder of Yog Jivan yoga studio in Hai Duong, Vietnam. 12+ years teaching authentic Indian yoga, therapeutic practice and holistic wellness to 1000+ students in 20+ countries." },
      { property: "og:title", content: "About Master Anil Choudhary — Yog Jivan" },
      { property: "og:description", content: "Authentic Indian yoga rooted in tradition, taught in Hai Duong, Vietnam by Master Anil Choudhary." },
      { property: "og:url", content: "https://www.yogjivan.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/about" }],
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
