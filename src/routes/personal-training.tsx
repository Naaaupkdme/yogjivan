import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import img from "@/assets/file_00000000704c71fb99f50d9c4f4b74ce.png.asset.json";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const PT_FAQS = [
  {
    q: "Do you offer private one-on-one yoga sessions in Hai Duong?",
    a: "Yes. Private 1-on-1 sessions with Master Anil Choudhary are available at both our Hai Duong studios and online, with fully personalized plans built around your body and goals.",
  },
  {
    q: "Can yoga help with back pain, PCOD, or anxiety?",
    a: "Yes. Our therapeutic yoga sessions are designed for back and neck pain, PCOD and hormonal balance, anxiety and stress, sleep and post-injury recovery — using evidence-informed practice with pranayama and meditation.",
  },
  {
    q: "Is therapeutic yoga suitable for absolute beginners?",
    a: "Absolutely. Every personal training journey starts with a free consultation, and each session is paced entirely to your current level and health history.",
  },
  {
    q: "How long is a private yoga session?",
    a: "Standard private sessions run for 60 minutes, with 90-minute deep-work sessions available for therapeutic and transformation programs.",
  },
];

export const Route = createFileRoute("/personal-training")({
  head: () => ({
    meta: [
      { title: "Private Yoga Sessions & Therapeutic Yoga in Hai Duong — Yog Jivan" },
      { name: "description", content: "Private 1-on-1 yoga sessions with Master Anil Choudhary in Hai Duong, Vietnam. Therapeutic yoga for back pain, PCOD, anxiety, pranayama and meditation. Custom 90-day transformation plans." },
      { property: "og:title", content: "Private Yoga Sessions & Therapeutic Yoga — Yog Jivan" },
      { property: "og:description", content: "Bespoke private yoga sessions and therapeutic yoga for back pain, PCOD, anxiety and recovery." },
      { property: "og:url", content: "https://www.yogjivan.com/personal-training" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/personal-training" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PT_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Personal Training", "/personal-training")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Private Yoga Sessions with Master Anil Choudhary",
          serviceType: "Private Yoga Session",
          description: "One-on-one yoga sessions with Master Anil Choudhary in Hai Duong or online — bespoke sequences, alignment coaching, pranayama and meditation tailored to your body.",
          areaServed: "Hai Duong, Vietnam",
          url: "/personal-training",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Therapeutic Yoga",
          serviceType: "Therapeutic Yoga",
          description: "Evidence-informed therapeutic yoga protocols for back pain, PCOD, hormonal balance, anxiety, insomnia and post-injury recovery — integrating asana, pranayama and meditation.",
          areaServed: "Hai Duong, Vietnam",
          url: "/personal-training",
        })),
      },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Personal Training & Therapeutic Yoga" title="A practice shaped entirely" accent="around you." sub="One student. One master. One uninterrupted hour. Private yoga sessions and therapeutic yoga for back pain, PCOD, anxiety and recovery — integrating asana, pranayama and meditation as the most direct way to transform your body and mind." image={img.url} />
      <CTABanner title="Reserve a private session." sub="Limited weekly slots. Apply for an introductory consultation." />
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Related paths</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Prefer to practice from home? Explore <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>.</span>
            <span>Or compare full pricing across our <Link to="/programs" className="text-[color:var(--gold)] hover:underline">yoga programs</Link>.</span>
          </div>
        </div>
      </section>
    </>
  ),
});
