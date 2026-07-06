import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Programs } from "@/components/site/Programs";
import { Services } from "@/components/site/Services";

const PROGRAMS_FAQS = [
  {
    q: "Is there a yoga studio near me in Hai Duong?",
    a: "Yes — Yog Jivan runs two premium yoga studios in Hai Duong City, Vietnam, plus outdoor and online programs, so you can practice near you whether you live in Le Thanh Nghi, Thanh Dong or elsewhere in Hai Duong Province.",
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
    a: "Yes. Our therapeutic yoga programs are designed for back and neck pain, PCOD and hormonal balance, anxiety, sleep and post-injury recovery.",
  },
  {
    q: "Do you offer yoga retreats?",
    a: "Yes. Our retreat and nature experiences combine daily practice, breathwork, meditation and immersive nature settings for a deep reset.",
  },
];

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Yoga Programs & Pricing — Studio, Online, Private & Retreats | Yog Jivan" },
      { name: "description", content: "Studio memberships, private yoga sessions, online classes for beginners, therapeutic yoga, kids yoga, corporate wellness and retreats at Yog Jivan Hai Duong. Transparent premium pricing in VND." },
      { property: "og:title", content: "Yoga Programs & Pricing — Yog Jivan Hai Duong" },
      { property: "og:description", content: "Studio, private, online, therapeutic and retreat yoga programs with Master Anil Choudhary." },
      { property: "og:url", content: "https://www.yogjivan.com/programs" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/programs" }],
    scripts: [{
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
    }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Programs & Investment" title="Choose your" accent="pathway." sub="Studio, private, online, therapeutic and retreat programs — every path is an invitation into a longer relationship with your body, breath and life." />
      <Programs />
      <Services />
      <CTABanner title="Not sure which path is yours?" sub="Book a free consultation — we'll guide you." />
    </>
  ),
});
