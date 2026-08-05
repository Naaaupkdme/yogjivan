import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { About } from "@/components/site/About";
import { Transformation } from "@/components/site/Transformation";
import { masterImages } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Master Anil Choudhary — Founder of Yog Jivan Hai Duong" },
      { name: "description", content: "Meet Master Anil Choudhary, founder of Yog Jivan yoga studio in Hai Duong, Vietnam. 12+ years teaching authentic Indian yoga, therapeutic practice and holistic wellness to 1000+ students in 20+ countries." },
      { property: "og:title", content: "About Master Anil Choudhary — Yog Jivan" },
      { property: "og:description", content: "Authentic Indian yoga rooted in tradition, taught in Hai Duong, Vietnam by Master Anil Choudhary." },
      { property: "og:url", content: "https://yogjivan.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Master Anil Choudhary — Yog Jivan" },
      { name: "twitter:description", content: "Authentic Indian yoga rooted in tradition, taught in Hai Duong, Vietnam by Master Anil Choudhary." },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/about" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("About", "/about")),
    }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="The Founder" title="A life devoted to the" accent="path." sub="Master Anil Choudhary brings twelve years of traditional Indian yoga, therapeutic mastery and quiet authority to every student he touches." image={masterImages.meditationPortrait} />
      <About />
      <Transformation />
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Continue exploring</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>See how the practice is structured in our <Link to="/programs" className="text-[color:var(--gold)] hover:underline">yoga programs</Link>,</span>
            <span>or read <Link to="/testimonials" className="text-[color:var(--gold)] hover:underline">student transformation stories</Link>.</span>
          </div>
        </div>
      </section>
      <CTABanner title="Meet Master Anil in person." sub="A free consultation is the first step on the path." />
    </>
  ),
});
