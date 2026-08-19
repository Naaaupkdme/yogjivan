import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "Student Community & Google Reviews — Yog Jivan Yoga";
const DESC =
  "See where Yog Jivan students practise: two studios serving the Hai Duong urban area, live online classes worldwide, and verifiable Google reviews for each studio.";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://yogjivan.com/testimonials" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/testimonials" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema("Student Community", "/testimonials")),
    }],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Our students"
        title="The Yog Jivan"
        accent="community."
        sub="Rather than publishing quotes we cannot verify, we point you to reviews you can read yourself and to the classes where you can judge the teaching in person."
      />
      <Testimonials />

      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-3xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <h2 className="font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              Judge the teaching for yourself
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              The most reliable way to know whether Yog Jivan suits you is to practise with us. Start
              with a{" "}
              <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">
                live online group class
              </Link>{" "}
              or a{" "}
              <Link to="/private-online-yoga" className="text-[color:var(--gold)] hover:underline">
                private 1-on-1 session
              </Link>
              , or read about{" "}
              <Link to="/about" className="text-[color:var(--gold)] hover:underline">
                the teaching approach behind the studio
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Student photos, videos and written stories will be published here only as students give
              us written permission to share them.
            </p>
          </div>
        </div>
      </section>

      <CTABanner title="Your practice begins here." />
    </>
  );
}
