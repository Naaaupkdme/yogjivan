import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { About } from "@/components/site/About";
import { masterImages, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Master Anil Choudhary — Founder of Yog Jivan Hai Duong" },
      { name: "description", content: "Meet Master Anil Choudhary, founder and lead yoga teacher of Yog Jivan — 12+ years teaching authentic Indian yoga in Hai Duong and live online." },
      { property: "og:title", content: "About Master Anil Choudhary — Yog Jivan" },
      { property: "og:description", content: "Authentic Indian yoga rooted in tradition, taught in Hai Duong, Vietnam by Master Anil Choudhary." },
      { property: "og:url", content: "https://yogjivan.com/about" },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.founderPortrait),
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
      <PageHero eyebrow="The Founder" title="A life devoted to the" accent="path." sub="Master Anil Choudhary brings 12+ years of authentic Indian yoga teaching, careful progression and safety-first guidance — and sets the teaching standard every Yog Jivan teacher follows." image={masterImages.meditationPortrait} />
      <About />
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Continue exploring</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>See how the practice is structured in our <Link to="/programs" className="text-[color:var(--gold)] hover:underline">yoga programs</Link>,</span>
            <span>or see <Link to="/testimonials" className="text-[color:var(--gold)] hover:underline">our student community and reviews</Link>.</span>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-luxe">
          <div className="glass-luxe relative overflow-hidden rounded-[2rem] p-8 text-center md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_70%)]" />
            <p className="eyebrow justify-center">Begin Today</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.8vw,3rem)] leading-tight">Practise the Yog Jivan way.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Start with a private 1-on-1 practice shaped around you, or join a live class. Private
              pricing and scheduling are arranged by enquiry.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/private-online-yoga" data-cta-location="about_private_primary" className="btn-gold">Enquire About Private 1-on-1 Yoga</Link>
              <Link to="/online-yoga-classes" data-cta-location="about_online_secondary" className="btn-ghost-gold">Live Online Group Classes</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  ),
});

