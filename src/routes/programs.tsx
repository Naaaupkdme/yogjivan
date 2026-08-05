import { masterImages, socialImageMeta } from "@/lib/images";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Programs } from "@/components/site/Programs";
import { Services } from "@/components/site/Services";
import { FurtherReading } from "@/components/site/FurtherReading";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Yoga Programs & Pricing in Hai Duong | Yog Jivan";
const DESCRIPTION =
  "Compare Yog Jivan studio memberships, private 60-minute yoga by enquiry, and live small-group online yoga with Master Anil in Hai Duong or worldwide.";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://yogjivan.com/programs" },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.groupCelebration),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/programs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Programs", "/programs")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Studio Yoga Classes in Hai Duong",
          serviceType: "Yoga Class",
          description: "Group yoga classes at the Yog Jivan studios in the Hai Duong urban area of Hai Phong, taught personally by Master Anil Choudhary, with attention to alignment and steady progression.",
          areaServed: "Hai Duong, Vietnam",
          url: "/programs",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Private Yoga Sessions",
          serviceType: "Private Yoga Session",
          description: "Live 60-minute one-on-one yoga sessions with Master Anil Choudhary, in studio or online, adapted to your experience and goals. Pricing and scheduling are confirmed by enquiry.",
          areaServed: "Hai Duong, Vietnam",
          url: "/personal-training",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Online Yoga Classes",
          serviceType: "Online Yoga Class",
          description: "Live small-group online yoga classes with a maximum of 8 students, led personally by Master Anil Choudhary in English, Vietnamese and Hindi, for students worldwide.",
          areaServed: "Worldwide",
          url: "/online-yoga-classes",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Corporate Wellness Yoga",
          serviceType: "Corporate Wellness Program",
          description: "On-site and online yoga sessions for teams in Vietnam — guided movement, breathing practice and relaxation suitable for workplace settings.",
          areaServed: "Vietnam",
          url: "/corporate",
        })),
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Yoga Programs & Pricing"
        title="Choose your"
        accent="pathway."
        sub="Studio group classes in the Hai Duong urban area, private 1-on-1 yoga in studio or online, and live small-group online classes with Master Anil Choudhary."
      />
      <Programs />
      <Services />
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Explore further</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Practice from anywhere with <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>.</span>
            <span>Go one-on-one with <Link to="/personal-training" hash="private-online-yoga" className="text-[color:var(--gold)] hover:underline">private yoga</Link>.</span>
            <span>Bring practice to your team with <Link to="/corporate" className="text-[color:var(--gold)] hover:underline">corporate wellness yoga</Link>.</span>
          </div>
          <div className="mt-6">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Focus areas</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span><Link to="/yoga-for-back-pain" className="text-[color:var(--gold)] hover:underline">Yoga for back pain</Link></span>
              <span><Link to="/yoga-for-stress" className="text-[color:var(--gold)] hover:underline">Yoga for stress & anxiety</Link></span>
              <span><Link to="/yoga-for-weight-loss" className="text-[color:var(--gold)] hover:underline">Yoga for weight loss</Link></span>
            </div>
          </div>
        </div>
      </section>
      <FurtherReading
        heading="Choosing your first class"
        intro="Guides that explain the studio, online and private options in more detail."
        slugs={["yoga-classes-hai-duong-beginners-guide", "private-online-yoga-vs-group-classes", "live-online-yoga-vs-youtube"]}
      />
      <CTABanner title="Not sure which path is yours?" sub="Book a free consultation — we'll guide you." />
    </>
  ),
});
