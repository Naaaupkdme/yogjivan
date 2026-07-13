import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { CheckCircle2, Award, Users, Globe2, Heart } from "lucide-react";

const CANONICAL = "https://www.yogjivan.com/online-yoga-classes";

const GEO_ANSWER =
  "Yog Jivan offers live, interactive online yoga classes globally, led by certified Indian Master Anil Choudhary. Unlike generic pre-recorded apps, we provide personalized, authentic Indian yoga focusing on therapeutic healing for conditions like PCOD, back pain, and anxiety. Our small-batch virtual sessions ensure real-time posture correction and holistic wellness. Join our global community from over 20 countries and experience lineage-rooted asana, pranayama, and meditation from the comfort of your home. Book your free live trial today.";

const FAQ_SECTIONS: { q: string; bullets: string[]; answer: string }[] = [
  {
    q: "What to Expect in Our Online Yoga Classes?",
    bullets: [
      "Live, interactive sessions on Zoom or Google Meet — never pre-recorded.",
      "Real-time posture correction and personalized cues from Master Anil.",
      "Balanced practice: asana, pranayama (breathwork) and meditation.",
      "Small-batch format so every student is seen and adjusted.",
      "Beginner-friendly modifications alongside advanced variations.",
    ],
    answer:
      "Live, interactive Zoom or Google Meet sessions with real-time posture correction, small-batch attention, and a balanced practice of asana, pranayama and meditation — suitable for beginners and advanced students.",
  },
  {
    q: "Can Yoga Help With PCOD or Back Pain?",
    bullets: [
      "PCOD: hormone-balancing sequences, pranayama and restorative postures.",
      "Back pain: spinal decompression, core stabilization and mobility work.",
      "Anxiety: nervous-system regulation via slow breath and meditation.",
      "Programs are therapeutic and adapted to your health history.",
      "Progress is tracked across weeks, not single classes.",
    ],
    answer:
      "Yes. Our therapeutic online programs use hormone-balancing sequences for PCOD, spinal decompression and core work for back pain, and breath-based nervous-system regulation for anxiety — all adapted to your health history.",
  },
  {
    q: "Who Is Master Anil Choudhary?",
    bullets: [
      "Certified Indian Yoga Master with 12+ years of teaching experience.",
      "Trained in classical Hatha, Ashtanga and therapeutic yoga in India.",
      "Specializes in therapeutic teaching: back pain, PCOD, anxiety, recovery.",
      "Taught 1000+ students across 20+ countries.",
      "Founder of Yog Jivan Sanctuary.",
    ],
    answer:
      "Master Anil Choudhary is a certified Indian Yoga Master with 12+ years of experience, specializing in therapeutic yoga. He has taught 1000+ students across 20+ countries and is the founder of Yog Jivan Sanctuary.",
  },
  {
    q: "How Much Do Online Yoga Classes Cost?",
    bullets: [
      "Free live trial class for every new student — no card required.",
      "Small Group live classes: monthly membership starting at $49/month.",
      "1-on-1 Private online sessions: premium personalized tier.",
      "Custom corporate and family packages available on request.",
      "Transparent pricing shared during your free consultation.",
    ],
    answer:
      "Start with a free live trial. After that, Small Group live classes start at $49/month, and 1-on-1 Private sessions are offered as a premium personalized tier. Pricing is shared transparently on your consultation call.",
  },
  {
    q: "How Do I Join My First Class?",
    bullets: [
      "Book a free consultation via WhatsApp or the contact form.",
      "Share your goals, health history and preferred timezone.",
      "Receive a Zoom/Meet link and a short pre-class checklist.",
      "Join live from home — a mat and 2m of space is enough.",
      "Get a personalized practice plan after your trial.",
    ],
    answer:
      "Book a free consultation, share your goals and timezone, receive your Zoom/Google Meet link, and join live from home. You only need a mat and about 2m of space.",
  },
];

const CLASS_DETAILS = [
  { label: "Mode", value: "Live via Zoom / Google Meet" },
  { label: "Batch Size", value: "Small group (max 8 students) or 1-on-1 private" },
  {
    label: "Timings",
    value:
      "Morning: 06:30 IST · 01:00 GMT · 20:00 EST (prev day) | Evening: 18:30 IST · 13:00 GMT · 08:00 EST | Late: 21:00 IST · 15:30 GMT · 10:30 EST",
  },
  {
    label: "Pricing",
    value:
      "Free live trial · Small Group: Monthly membership starting at $49/month · 1-on-1 Private: Premium personalized tier.",
  },
];

export const Route = createFileRoute("/online-yoga-classes")({
  head: () => ({
    meta: [
      { title: "Online Yoga Classes — Live with Certified Indian Master | Yog Jivan" },
      {
        name: "description",
        content:
          "Live online yoga classes with certified Indian Master Anil Choudhary. Small-batch, personalized, therapeutic yoga for PCOD, back pain and anxiety. Free trial. Students in 20+ countries.",
      },
      { property: "og:title", content: "Online Yoga Classes with Master Anil Choudhary — Yog Jivan" },
      {
        property: "og:description",
        content:
          "Authentic live online yoga classes globally. Small-batch, therapeutic, personalized. Free trial available.",
      },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Online Yoga Classes with Master Anil Choudhary",
          description:
            "Live, interactive online yoga classes led by certified Indian Master Anil Choudhary. Small-batch, therapeutic and personalized — for beginners and advanced students worldwide.",
          provider: {
            "@type": "Organization",
            name: "Yog Jivan Sanctuary",
            sameAs: "https://www.yogjivan.com",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: "PT5H",
            location: {
              "@type": "VirtualLocation",
              url: "https://www.yogjivan.com/online-yoga-classes",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_SECTIONS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Live Online Yoga Class with Master Anil Choudhary",
          description:
            "Daily live online yoga sessions with certified Indian Master Anil Choudhary. Multiple timezone-friendly slots (morning, evening and late slots across IST, GMT and EST). Small-batch, therapeutic and personalized.",
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "VirtualLocation",
            url: "https://www.yogjivan.com/online-yoga-classes",
          },
          organizer: {
            "@type": "Organization",
            name: "Yog Jivan Sanctuary",
            url: "https://www.yogjivan.com",
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: "Free live trial class",
            url: "https://www.yogjivan.com/online-yoga-classes",
          },
        }),
      },
    ],
  }),
  component: OnlineYogaClassesPage,
});

function OnlineYogaClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Global · Live · Authentic"
        title="Authentic Online Yoga Classes"
        sub="Live, small-batch classes with certified Indian Master Anil Choudhary — join from anywhere in the world."
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-gold">Book Free Live Trial</Link>
          <a href="https://wa.me/message/KZ43ESQDHVGWF1" target="_blank" rel="noopener" className="btn-ghost-gold">WhatsApp Us</a>
        </div>
      </PageHero>

      {/* GEO answer capsule */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{GEO_ANSWER}</p>
          </div>
        </div>
      </section>

      {/* EEAT / credentials */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />Your Teacher<span className="h-px w-10 bg-primary" /></p>
            <h2 className="mt-5 fluid-title">Master Anil Choudhary</h2>
            <p className="mt-4 text-muted-foreground">Certified Indian Yoga Master · Founder, Yog Jivan Sanctuary</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Award, label: "12+ years teaching experience" },
              { icon: Heart, label: "Certified Indian Yoga Master" },
              { icon: CheckCircle2, label: "Therapeutic expert: back pain, PCOD, anxiety" },
              { icon: Users, label: "1000+ students taught" },
              { icon: Globe2, label: "Students in 20+ countries" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="glass-luxe rounded-2xl p-5 text-center">
                <Icon className="mx-auto h-6 w-6 text-[color:var(--gold)]" />
                <p className="mt-3 text-sm leading-snug text-foreground/90">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Details table */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />Class Details<span className="h-px w-10 bg-primary" /></p>
            <h2 className="mt-5 fluid-title">Everything at a glance</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl glass-luxe overflow-hidden rounded-[2rem] border border-white/10">
            <dl className="divide-y divide-white/10">
              {CLASS_DETAILS.map((row) => (
                <div key={row.label} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-4 sm:gap-6 md:p-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)] sm:col-span-1">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-foreground/90 sm:col-span-3">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted-foreground">
            Additional slots available on request — we accommodate students across Asia, Europe, Americas and Oceania.
          </p>
        </div>
      </section>

      {/* GEO-formatted H2 Q&A sections */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl space-y-10">
            {FAQ_SECTIONS.map((s) => (
              <article key={s.q} className="glass-luxe rounded-[2rem] p-6 md:p-10">
                <h2 className="fluid-title text-2xl md:text-3xl">{s.q}</h2>
                <ul className="mt-5 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials
        items={[
          { name: "Tim", initial: "T", country: "USA", flag: "🇺🇸", category: "Online Student", quote: "I've been taking Master Anil's live online classes from the US, and the experience is incredible. The real-time posture corrections and therapeutic approach helped my back pain immensely. It feels just as effective and personalized as being in a physical studio." },
          { name: "Sophie Laurent", initial: "S", country: "France", flag: "🇫🇷", category: "Online Client", quote: "Even from Europe, the online experience feels intimate and refined. The guidance is personal, elegant, and deeply grounding." },
          { name: "Emily Tran", initial: "E", country: "Canada", flag: "🇨🇦", category: "Therapeutic Program", quote: "My chronic back pain eased within weeks. The therapeutic precision and warmth here are unlike any studio I've tried." },
        ]}
      />

      {/* Brand-voice closing (moved to bottom per spec) */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="italic text-lg text-muted-foreground">
              "Yoga is the art of returning home to yourself — one breath at a time."
            </p>
          </div>
        </div>
      </section>

      <CTABanner title="Ready for your first live class?" sub="Book a free trial — no card required." />
    </>
  );
}
