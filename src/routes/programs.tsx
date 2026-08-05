import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Programs } from "@/components/site/Programs";
import { Services } from "@/components/site/Services";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const PROGRAMS_FAQS = [
  {
    q: "Is there a yoga studio near me in Hai Duong?",
    a: "Yes — Yog Jivan runs two premium yoga studios in the Hai Duong urban area of Hai Phong, Vietnam, plus outdoor and online programs, so you can practise near you whether you are in Lê Thanh Nghị, Thành Đông or elsewhere nearby.",
  },
  {
    q: "Do you offer online yoga classes for beginners?",
    a: "Yes. Our online yoga classes include dedicated beginner tracks, live cohort programs and on-demand series taught by Master Anil Choudhary, joinable from anywhere in the world.",
  },
  {
    q: "Do you offer private one-on-one yoga sessions?",
    a: "Yes. Private yoga sessions in Hai Duong and online are our signature offering — every session is personalized to your body, health history and goals.",
  },
  {
    q: "Can yoga help with back pain, PCOD, or anxiety?",
    a: "Yes. Our therapeutic yoga programs are designed for back and neck pain, PCOD and hormonal balance, anxiety, sleep and post-injury recovery — integrating pranayama and meditation.",
  },
  {
    q: "Do you offer yoga retreats?",
    a: "Yes. Our retreat and nature experiences combine daily practice, breathwork, meditation and immersive nature settings for a deep reset.",
  },
];

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Yoga Programs & Pricing | Yog Jivan Sanctuary" },
      { name: "description", content: "Studio memberships, private sessions, beginner and therapeutic yoga, pranayama, meditation, kids and corporate programs at Yog Jivan, Hai Duong." },
      { property: "og:title", content: "Yoga Programs & Pricing — Yog Jivan Hai Duong" },
      { property: "og:description", content: "Studio, private, online, therapeutic and retreat yoga programs with Master Anil Choudhary." },
      { property: "og:url", content: "https://yogjivan.com/programs" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga Programs & Pricing — Yog Jivan Hai Duong" },
      { name: "twitter:description", content: "Studio, private, online, therapeutic and retreat yoga programs with Master Anil Choudhary." },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/programs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PROGRAMS_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Programs", "/programs")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Therapeutic Yoga",
          serviceType: "Therapeutic Yoga",
          description: "Evidence-informed therapeutic yoga for back pain, PCOD, anxiety, insomnia and recovery, integrating asana, pranayama and meditation.",
          areaServed: "Hai Duong, Vietnam",
          url: "/programs",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Private Yoga Sessions",
          serviceType: "Private Yoga Session",
          description: "One-on-one yoga sessions with Master Anil Choudhary — bespoke sequencing, alignment coaching and therapeutic protocols.",
          areaServed: "Hai Duong, Vietnam",
          url: "/personal-training",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Online Yoga Classes",
          serviceType: "Online Yoga Class",
          description: "Live, small-batch online yoga classes led by Master Anil Choudhary — classical Hatha, Ashtanga, pranayama, meditation and therapeutic yoga for global students.",
          areaServed: "Worldwide",
          url: "/online-yoga-classes",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Corporate Wellness Yoga",
          serviceType: "Corporate Wellness Program",
          description: "On-site and virtual corporate yoga and wellness programs for teams in Vietnam — stress reduction, posture, breathwork and meditation.",
          areaServed: "Vietnam",
          url: "/corporate",
        })),
      },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Programs & Investment" title="Choose your" accent="pathway." sub="Studio, private, online, therapeutic and retreat programs — asana, pranayama and meditation woven into a longer relationship with your body, breath and life. Designed for back pain recovery, PCOD, anxiety and corporate wellness alike." />
      <Programs />
      <Services />
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Explore further</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Practice from anywhere with <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>.</span>
            <span>Go one-on-one with <Link to="/personal-training" className="text-[color:var(--gold)] hover:underline">personal training</Link>.</span>
            <span>Bring practice to your team with <Link to="/corporate" className="text-[color:var(--gold)] hover:underline">corporate wellness yoga</Link>.</span>
          </div>
          <div className="mt-6">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Therapeutic focus areas</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span><Link to="/yoga-for-back-pain" className="text-[color:var(--gold)] hover:underline">Yoga for back pain</Link></span>
              <span><Link to="/yoga-for-stress" className="text-[color:var(--gold)] hover:underline">Yoga for stress & anxiety</Link></span>
              <span><Link to="/yoga-for-weight-loss" className="text-[color:var(--gold)] hover:underline">Yoga for weight loss</Link></span>
            </div>
          </div>
        </div>
      </section>
      <CTABanner title="Not sure which path is yours?" sub="Book a free consultation — we'll guide you." />
    </>
  ),
});
