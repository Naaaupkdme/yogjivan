import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FurtherReading } from "@/components/site/FurtherReading";
import { PrivateYogaEnquiryForm } from "@/components/site/PrivateYogaEnquiryForm";
import { EnquiryButton } from "@/components/site/EnquiryScroll";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { masterImages, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { TEAM_MODEL, TEACHING_TEAM } from "@/lib/facts/team";
import { PUBLIC_TRUST } from "@/lib/facts/trust";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { CONTACT } from "@/lib/facts/contact";
import teachingAdjustment from "@/assets/paid/teaching-adjustment.webp.asset.json";
import liveGuidanceFloor from "@/assets/paid/live-guidance-floor.webp.asset.json";

/* ---------------------------------------------------------------------------
   MEDIA SLOTS — replaceable without redesign.
   1) HERO BACKDROP — currently masterImages.studioAdjustment (studio teaching
      attention, NOT presented as an online session). Ideal replacement: a real
      private ONLINE session frame, 16:9 1920x1080 WebP.
   2) LIVE-GUIDANCE DEMO — currently paid/live-guidance-floor.webp, framed as
      "teacher attention in practice" (studio). Replacement target: real private
      online session clip, 16:9 1920x1080, 30-60s MP4/WebM + 1600x900 WebP
      poster. No autoplay background video. No AI/fake people or screenshots.
   3) TEACHER PORTRAIT — per TEACHING_TEAM record. Ideal: real 4:5 1200x1500
      WebP. Later teacher fields: name, public role, verified years of
      experience, languages they truly teach in, specialties, suitable levels,
      photo + alt, factual 1-2 sentence bio, optional profile link.
   4) STUDENT PROOF (NOT RENDERED) — only once written permission exists.
--------------------------------------------------------------------------- */

const PT_TITLE = "Private Online Yoga Classes & 1-on-1 Yoga | Yog Jivan";
const PT_DESC =
  "Live private online yoga with the Yog Jivan teaching team. One dedicated teacher, 60-minute 1-on-1 sessions for beginner, intermediate and advanced practitioners worldwide.";
const PT_URL = "https://yogjivan.com/private-online-yoga";

/** AEO/GEO direct-answer capsule. Fact-first and chunkable. */
const DIRECT_ANSWER =
  "Private online yoga at Yog Jivan is a live 60-minute one-to-one session with a teacher from the Yog Jivan team. You are matched with a dedicated teacher based on your level and goals, and that same teacher continues with you session after session. Sessions are live on video, available worldwide, and adapted for beginners, intermediate students and advanced practitioners. Pricing and scheduling are arranged by enquiry.";

const TRUST_STRIP = [
  { v: PUBLIC_TRUST.yearsTeaching, l: "Years teaching" },
  { v: PUBLIC_TRUST.studentsTaught, l: "Students guided" },
  { v: PUBLIC_TRUST.countries, l: "Countries" },
  { v: "Beginner → Advanced", l: "Every stage of practice" },
];

const CONTINUITY = [
  { t: "Learns how you move", d: "Your teacher sees your range, habits and what you are currently working on, rather than starting from zero each time." },
  { t: "Remembers the last session", d: "What needed more attention last week is picked up again, instead of being explained from scratch." },
  { t: "Consistent cues and progression", d: "The same language, the same alignment references and a progression that follows on from where you stopped." },
  { t: "Adapts pace and explanation", d: "Over time your teacher learns how much detail you like, how fast you absorb new movements and when to slow down." },
  { t: "Easier to ask questions", d: "A familiar teacher makes it far more comfortable to say what feels difficult, unclear or uncomfortable." },
];

const NEXT_STEPS = [
  { n: "1", t: "We read your request", d: "Your level, what you want to work on and the times that realistically suit you." },
  { n: "2", t: "We match a suitable teacher", d: "A Yog Jivan teacher is matched to your level, goals and language, and the match is agreed with you." },
  { n: "3", t: "You start a live 60-minute session", d: "Your dedicated teacher guides the full hour live, then continues with you session after session." },
];

const LEVELS = [
  {
    key: "beginner",
    label: "Beginner",
    heading: "One-on-one yoga for beginners",
    points: [
      "Posture foundations, step by step",
      "Basic breathing and how to use it while you move",
      "Alignment and safe modifications for your body",
      "Props when they genuinely help",
      "Repeat a movement and ask questions without group pressure",
      "Build confidence at a pace that is entirely your own",
    ],
  },
  {
    key: "intermediate",
    label: "Intermediate",
    heading: "Private yoga for intermediate students",
    points: [
      "Refine alignment and the transitions between postures",
      "Mobility, strength, balance and steady consistency",
      "Revisit the movements that still feel awkward",
      "Understand plateaus and the practice habits behind them",
      "Build a clearer personal progression rather than a random practice",
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    heading: "Advanced private yoga classes online",
    points: [
      "Advanced asana progression according to your current ability",
      "Inversions, arm balances and backbends",
      "Balance work and controlled transitions",
      "Precision, technique and individual feedback on what you are practising",
    ],
    note: "Progression depends on your body and your practice. We do not promise specific poses or fixed timelines.",
  },
] as const;

/** Three clusters instead of nine near-identical cards. */
const FOCUS_CLUSTERS = [
  {
    t: "Build foundations",
    d: "Where most students begin, whatever their age or flexibility.",
    rows: [
      "Beginner foundations and alignment",
      "Flexibility and mobility, guided in real time",
      "Sustainable strength and balance for your level",
    ],
  },
  {
    t: "Refine performance",
    d: "For students who already practise and want their practice to be sharper.",
    rows: [
      "Transitions and technique between postures",
      "Advanced asana progression by current ability",
      "Consistency and optional home-practice guidance",
    ],
  },
  {
    t: "Calm and restore",
    d: "Slower, breath-led work when that is what your week needs.",
    rows: [
      "Pranayama and breathwork taught individually",
      "Meditation and relaxation practices",
      "Stress support and a gentler, calmer session",
    ],
  },
];

const COMPARISON = [
  {
    t: "Private 1-on-1",
    highlight: true,
    rows: [
      "One student",
      "Full individual attention for the whole hour",
      "Same dedicated teacher, session after session",
      "Your pace and your goals",
      "Live feedback as you move",
      "Scheduling and pricing by enquiry",
    ],
  },
  {
    t: "Live small group",
    rows: [
      "Live teacher on video",
      `Attention shared with a small group — maximum ${ONLINE_CLASS.maxGroupSize} students`,
      "A shared timetable and a shared class plan",
      "Published group pricing and an introductory offer",
    ],
    link: { to: "/online-yoga-classes" as const, label: "See live online group classes →" },
  },
  {
    t: "Recorded classes & apps",
    rows: [
      "Self-paced, practise whenever you like",
      "No live teacher watching your session",
      "No real-time individual feedback",
      "A useful option for some people at some stages",
    ],
  },
];

const HOW_IT_WORKS = [
  { n: "01", t: "Send a short enquiry", d: "Your name, WhatsApp number and current level are enough to begin." },
  { n: "02", t: "Understand level & schedule", d: "A short conversation about what you want to work on and which times fit your week." },
  { n: "03", t: "Match your teacher", d: "A teacher from the team is matched to your level and goals, and the match is agreed with you." },
  { n: "04", t: "Live 60-minute session", d: "Your dedicated teacher guides the full hour live on video with real-time verbal guidance." },
  { n: "05", t: "Continue with the same teacher", d: "Future sessions build on the last one and adapt as your practice develops." },
];

const SESSION_DETAILS = [
  { t: "Format", d: `A live ${ONLINE_CLASS.durationMinutes}-minute one-to-one video session with your teacher.` },
  { t: "Where", d: "Online worldwide, wherever you have space for a mat and a stable connection." },
  { t: "Your teacher", d: "Matched from the Yog Jivan teaching team, then the same dedicated teacher continues with you." },
  { t: "Languages", d: `${ONLINE_CLASS.languages.join(", ")} — tell us your preference in your enquiry.` },
  { t: "Camera & setup", d: "Camera on, positioned so your full body is visible from the side. A mat, clear floor space and optional blocks, strap or a chair." },
  { t: "Suitability", d: "Beginner, intermediate and advanced practitioners." },
  { t: "Pricing", d: "By enquiry. No payment is requested on this page." },
  { t: "Scheduling", d: "By enquiry, arranged around your time zone." },
];

/** Visible FAQ only. Deliberately NO FAQPage JSON-LD. */
const PT_FAQS = [
  {
    q: "Is private online yoga suitable for complete beginners?",
    a: "Yes. A private session is one of the easiest ways to start, because the whole hour is paced to you. You can repeat a movement, stop to ask a question and learn the foundations without keeping up with a group.",
  },
  {
    q: "Is 1-on-1 yoga useful if I already practise regularly?",
    a: "Yes. Intermediate students usually use private sessions to refine alignment and transitions, work through movements that have stalled and build a clearer personal progression.",
  },
  {
    q: "Can advanced practitioners work on inversions, arm balances or backbends?",
    a: "Yes, according to your current ability. Advanced work is approached gradually with individual feedback on technique. We do not promise specific poses or fixed timelines.",
  },
  {
    q: "Will I have the same teacher every session?",
    a: "Yes. You are matched with a teacher from the Yog Jivan team based on your level and goals, and that same dedicated teacher continues with you session after session.",
  },
  {
    q: "Can a teacher really correct me online?",
    a: "Your teacher watches your live camera view throughout the session and gives real-time verbal guidance — where to shift weight, how to place a hand or foot, when to ease off. It is verbal rather than hands-on, and in a one-to-one session all of that attention is on you.",
  },
  {
    q: "What camera setup and equipment do I need?",
    a: "A yoga mat, clear floor space and a device with a stable connection. Place your phone, tablet or laptop so your full body is visible, usually side-on and a couple of metres back, with enough light. Blocks, a strap or a chair help but household substitutes are fine.",
  },
  {
    q: "How are session times and languages arranged?",
    a: `Times are agreed directly with you rather than fixed to a group timetable, so your session is scheduled around your local time zone. Sessions are taught in ${ONLINE_CLASS.languages.join(", ")}.`,
  },
  {
    q: "How much does private online yoga cost?",
    a: "Private-session pricing is arranged by enquiry, because the format and frequency vary from student to student. Send an enquiry and we will explain the options directly.",
  },
];

const PT_FAQS_MORE = [
  {
    q: "Can I practise while travelling?",
    a: "Yes. Sessions are online, so you can practise from another city or country as long as you have space and a stable connection. Let your teacher know your temporary time zone.",
  },
  {
    q: "What if I have an injury or a medical condition?",
    a: "Please follow your clinician's advice. Yoga at Yog Jivan is a wellness practice and does not replace medical care. Tell your teacher about any relevant limitations before you practise so movements can be adapted.",
  },
  {
    q: "Can I change teacher later?",
    a: "Yes. Continuity is the default, not a lock-in. If a different teacher would suit your practice better, tell us and we will arrange a new match.",
  },
  {
    q: "Do you record my session?",
    a: "No. Private sessions are live and are not recorded or shared by Yog Jivan.",
  },
];

const CONTINUE_EXPLORING = [
  { to: "/yoga-for-beginners" as const, label: "Yoga for beginners", d: "A structured starting path if you have never practised." },
  { to: "/online-yoga-classes" as const, label: "Live online group classes", d: "Small live groups with published membership plans." },
  { to: "/programs" as const, label: "Programs & pricing", d: "Compare studio, online and private options." },
  { to: "/about" as const, label: "About Yog Jivan", d: "The teaching approach and Indian lineage behind the studio." },
  { to: "/yoga-for-back-pain" as const, label: "Yoga for back pain", d: "Alignment-led guidance for the spine, neck and posture." },
  { to: "/yoga-for-stress" as const, label: "Yoga for stress support", d: "Slower, breath-led practice for calmer weeks." },
];

export const Route = createFileRoute("/private-online-yoga")({
  head: () => ({
    meta: [
      { title: PT_TITLE },
      { name: "description", content: PT_DESC },
      { property: "og:title", content: PT_TITLE },
      { property: "og:description", content: PT_DESC },
      { property: "og:url", content: PT_URL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.studioAdjustment),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PT_TITLE },
      { name: "twitter:description", content: PT_DESC },
    ],
    links: [{ rel: "canonical", href: PT_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Private Online Yoga", "/private-online-yoga")),
      },
      {
        type: "application/ld+json",
        // Provider is Yog Jivan (the organisation / teaching team) — NOT a single instructor.
        children: JSON.stringify(serviceSchema({
          name: "Private Online Yoga Classes (1-on-1)",
          serviceType: "Online Private Yoga Session",
          description:
            "Live 60-minute one-to-one online yoga sessions taught by the Yog Jivan teaching team. Students are matched with a dedicated teacher who continues with them session after session, for beginner, intermediate and advanced practice. Pricing and scheduling by enquiry.",
          areaServed: "Worldwide",
          url: "/private-online-yoga",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Private In-Studio Yoga Sessions",
          serviceType: "Private Yoga Session",
          description:
            "Private one-to-one yoga sessions at the Yog Jivan studios serving the Hai Duong urban area, taught by the Yog Jivan teaching team and shaped around your level and goals. Scheduling by enquiry.",
          areaServed: "Hai Phong, Vietnam",
          url: "/private-online-yoga",
        })),
      },
    ],
  }),
  component: PrivateYogaPage,
});

function PrivateYogaPage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="Private Online Yoga & 1-on-1 Sessions"
        title="Private Online Yoga Classes —"
        accent="1-on-1 live with the Yog Jivan team."
        sub="One student. One dedicated matched teacher. A live 60-minute practice shaped around your level, goals and schedule — beginner to advanced, worldwide."
        image={masterImages.studioAdjustment}
      >
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 md:text-base">
          You are matched with a Yog Jivan teacher, and the same teacher continues with you session
          after session.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <EnquiryButton ctaLocation="private_yoga_hero">Enquire About Private 1-on-1 Yoga</EnquiryButton>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="private_yoga_hero"
            className="text-sm text-[color:var(--gold)] hover:underline"
          >
            Or ask a question on WhatsApp
          </a>
        </div>
        <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST_STRIP.map((m) => (
            <div key={m.l} className="glass-soft rounded-2xl px-4 py-3.5">
              <dt className="sr-only">{m.l}</dt>
              <dd className="font-display text-xl leading-tight text-[color:var(--gold)] md:text-2xl">{m.v}</dd>
              <dd className="mt-1.5 text-[0.78rem] leading-snug text-foreground/75">{m.l}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-foreground/70">
          Taught in {ONLINE_CLASS.languages.join(", ")}.
        </p>
      </PageHero>

      {/* 2 — INLINE ENQUIRY FORM */}
      <section id="private-enquiry" className="section-pad-sm relative isolate scroll-mt-28" tabIndex={-1}>
        <div aria-hidden="true" className="liquid-veil" />
        <div className="container-luxe">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
            <div className="order-2 lg:order-1">
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Start here</p>
              <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}>
                Book private yoga online — one enquiry, no payment
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                Tell us your current level and the times you can realistically practise. We will match
                you with a suitable teacher from the Yog Jivan team and explain private-session
                options, scheduling and pricing directly.
              </p>

              <ol className="mt-7 grid gap-3">
                {NEXT_STEPS.map((s) => (
                  <li key={s.n} className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-sm text-[color:var(--gold)]">
                      {s.n}
                    </span>
                    <div>
                      <div className="font-display text-base text-foreground">{s.t}</div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/75">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-sm leading-relaxed text-foreground/70">
                We do not ask for medical details on this form. If anything about your health affects
                your practice, tell your teacher before you begin so movements can be adapted.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <PrivateYogaEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxe"><hr className="rule-glow" /></div>

      {/* 3 — AEO / GEO DIRECT ANSWER */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Direct answer</p>
            <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}>
              What is private online yoga at Yog Jivan?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">{DIRECT_ANSWER}</p>
            <p className="mt-4 text-sm text-foreground/70">
              Yoga supports general wellbeing and does not replace medical care.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — LEVELS */}
      <LevelSelector />

      {/* 5 — CONTINUITY: editorial, asymmetric */}
      <section className="section-pad-sm relative isolate">
        <div aria-hidden="true" className="liquid-veil-alt" />
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Dedicated teacher continuity</p>
              <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
                Why the same teacher, session after session, matters
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80 md:text-base">
                {TEAM_MODEL.continuityShort} It is the difference between being taught and being known.
              </p>
            </div>
            <ol className="grid gap-0 divide-y divide-white/8 border-y border-white/8">
              {CONTINUITY.map((c) => (
                <li key={c.t} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-6">
                  <div className="font-display text-lg text-foreground">{c.t}</div>
                  <p className="text-sm leading-relaxed text-foreground/75">{c.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6 — FOCUS CLUSTERS */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Personalized online yoga classes</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            What can your private practice focus on?
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {FOCUS_CLUSTERS.map((c) => (
              <div key={c.t}>
                <h3 className="font-display text-xl text-[color:var(--gold)]">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{c.d}</p>
                <ul className="mt-4 grid gap-2 border-t border-white/8 pt-4">
                  {c.rows.map((r) => (
                    <li key={r} className="text-sm leading-relaxed text-foreground/85">— {r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-foreground/70">
            Yoga at Yog Jivan supports movement, breathing, relaxation and general wellbeing alongside
            medical care where relevant. It is not medical treatment and does not replace advice from
            your doctor.
          </p>
        </div>
      </section>

      {/* 7 — COMPARISON */}
      <section className="section-pad-sm relative isolate">
        <div aria-hidden="true" className="liquid-veil" />
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Choosing a format</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Private, small group or recorded — which fits you?
          </h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/8 md:grid-cols-3">
            {COMPARISON.map((c) => (
              <div
                key={c.t}
                className={`p-6 ${c.highlight ? "bg-[color-mix(in_oklab,var(--gold)_8%,var(--onyx))]" : "bg-[color:var(--onyx)]"}`}
              >
                <div className="font-display text-lg text-foreground">{c.t}</div>
                <ul className="mt-3 grid gap-2">
                  {c.rows.map((r) => (
                    <li key={r} className="text-sm leading-relaxed text-foreground/80">— {r}</li>
                  ))}
                </ul>
                {c.link && (
                  <Link to={c.link.to} className="mt-4 inline-block text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--gold)] hover:underline">
                    {c.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — HOW IT WORKS: connected timeline */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />How private 1-on-1 works</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            From enquiry to your dedicated teacher
          </h2>
          <ol className="relative mt-8 grid gap-8 border-l border-[color:var(--gold)]/25 pl-8 lg:grid-cols-5 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.n} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.4rem] top-1 h-3 w-3 rounded-full bg-[color:var(--gold)] lg:left-0 lg:-top-[2.9rem]"
                />
                <div className="text-[0.7rem] tracking-[0.24em] text-[color:var(--gold)]">{s.n}</div>
                <div className="mt-2 font-display text-lg text-foreground">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 — TEACHING TEAM + MATCHING FLOW */}
      <section className="section-pad-sm relative isolate">
        <div aria-hidden="true" className="liquid-veil" />
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />The Yog Jivan teaching team</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Who will teach your private sessions
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
            Private sessions are taught by the Yog Jivan teaching team — not exclusively by one
            teacher. Only verified teachers are shown here.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/*
              TEACHER CARDS — rendered from the verified TEACHING_TEAM collection
              in src/lib/facts/team.ts. Adding another fully verified record
              renders another card here with no redesign. Never add an unverified
              teacher or a placeholder card.
            */}
            <div className={TEACHING_TEAM.length > 1 ? "grid gap-4 sm:grid-cols-2" : ""}>
              {TEACHING_TEAM.map((t) => (
                <article key={t.id} className="glass-soft overflow-hidden rounded-[1.75rem] sm:flex sm:items-stretch">
                  <img
                    src={t.photo}
                    alt={t.photoAlt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover sm:w-2/5"
                  />
                  <div className="p-6 sm:w-3/5">
                    <h3 className="font-display text-xl text-foreground">{t.name}</h3>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">
                      {t.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t.shortBio}</p>
                    <ul className="mt-3 grid gap-1.5">
                      {t.specialties.map((q) => (
                        <li key={q} className="text-sm leading-relaxed text-foreground/75">— {q}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                      Teaches: {t.suitableLevels.join(" · ")} · {t.languages.join(", ")}
                    </p>
                    {t.profilePath === "/about" ? (
                      <Link to="/about" className="mt-4 inline-block text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--gold)] hover:underline">
                        Read the Yog Jivan story →
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="glass-luxe rounded-[1.75rem] border border-[color:var(--gold)]/25 p-6 md:p-8">
              <h3 className="font-display text-xl leading-snug text-foreground">
                {TEAM_MODEL.headline}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                {TEAM_MODEL.body}
              </p>
              <ol className="mt-6 grid gap-3">
                {["Your level", "Your goals", "Language & availability", "Your dedicated teacher"].map((s, i, arr) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[0.7rem] text-[color:var(--gold)]">
                      {i + 1}
                    </span>
                    <span className={`text-sm ${i === arr.length - 1 ? "text-[color:var(--gold)]" : "text-foreground/85"}`}>{s}</span>
                  </li>
                ))}
              </ol>
              <EnquiryButton className="btn-ghost-gold mt-7" ctaLocation="private_yoga_team">
                Request a teacher match
              </EnquiryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — TEACHER ATTENTION MEDIA (MEDIA SLOT 2) */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <figure className="relative isolate overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/25 shadow-[0_40px_90px_-50px_rgba(0,0,0,1)]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
              <img
                src={liveGuidanceFloor.url}
                alt="A Yog Jivan teacher guiding a student through a floor posture in the studio"
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <figcaption className="bg-black/40 px-4 py-2.5 text-xs text-foreground/70">
                Photographed in the Yog Jivan studio — not an online session.
              </figcaption>
            </figure>
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Teacher attention in practice</p>
              <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
                How Yog Jivan teaches alignment and attention
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                In a private online session your teacher watches your live camera view for the whole
                hour and gives real-time verbal guidance as you move — where to shift your weight, how
                to place a hand or a foot, when to ease out of a posture. Guidance is verbal, not
                hands-on, and the attention is not shared with anyone else.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {ONLINE_CLASS.cameraRequired ? "Camera on is required so your alignment can actually be seen. " : ""}
                Your session is private and is not recorded or shared by Yog Jivan.
              </p>

              {/*
                MEDIA SLOT 2 — replacement target: a real private ONLINE session
                clip, 16:9 1920x1080, 30-60s MP4/WebM + 1600x900 WebP poster,
                click-to-play only (no autoplay background video). No AI or stock
                people, no fabricated video-call screenshots.
              */}
              <div className="mt-6 rounded-2xl border border-dashed border-[color:var(--gold)]/35 bg-white/[0.02] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Coming soon</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  A short recording of a real private online session will be published here once a
                  student has given written permission.
                </p>
              </div>

              <img
                src={teachingAdjustment.url}
                alt="A Yog Jivan teacher adjusting a student's alignment during a studio class"
                loading="lazy"
                className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11 — SESSION DETAILS: dense spec list */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Private session details</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Everything confirmed, in one place
          </h2>
          <dl className="mt-6 grid gap-x-12 border-t border-white/10 md:grid-cols-2">
            {SESSION_DETAILS.map((d) => (
              <div key={d.t} className="grid gap-1 border-b border-white/8 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">{d.t}</dt>
                <dd className="text-sm leading-relaxed text-foreground/80">{d.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 12 — FAQ */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Private yoga questions</p>
            <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              Before you book a private session
            </h2>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {PT_FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`pt-${i}`}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <h3 className="mt-10 text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">More questions</h3>
            <Accordion type="single" collapsible className="mt-3 w-full">
              {PT_FAQS_MORE.map((f, i) => (
                <AccordionItem key={f.q} value={`ptm-${i}`}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 13 — CLOSING CTA + CONTINUE EXPLORING */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-3xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 text-center md:p-10">
            <h2 className="font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              Start with a simple enquiry
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              Private-session pricing and available times are confirmed after enquiry. No payment is
              requested on this page.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <EnquiryButton ctaLocation="private_yoga_closing">Enquire About Private 1-on-1 Yoga</EnquiryButton>
              <Link to="/online-yoga-classes" className="text-sm text-[color:var(--gold)] hover:underline">
                Compare live group classes
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <h2 className="text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Continue exploring</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONTINUE_EXPLORING.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-2xl border border-white/10 p-4 transition-colors hover:border-[color:var(--gold)]/40"
                >
                  <div className="font-display text-base text-foreground">{l.label}</div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">{l.d}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FurtherReading
        heading="Deciding between private and group"
        intro="Guides that explain how one-to-one sessions compare with our live small-group classes."
        slugs={["private-online-yoga-vs-group-classes", "online-yoga-camera-setup", "first-live-online-yoga-class"]}
      />
    </>
  );
}

/** Beginner / Intermediate / Advanced selector with keyboard-accessible tabs. */
function LevelSelector() {
  const [active, setActive] = useState<string>(LEVELS[0].key);
  const current = LEVELS.find((l) => l.key === active) ?? LEVELS[0];

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + LEVELS.length) % LEVELS.length;
    const target = LEVELS[next]!;
    setActive(target.key);
    document.getElementById(`level-tab-${target.key}`)?.focus();
  }

  return (
    <section className="section-pad-sm">
      <div className="container-luxe">
        <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Every stage of practice</p>
        <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
          Private yoga for every stage of practice
        </h2>

        <div role="tablist" aria-label="Practice level" className="mt-6 flex flex-wrap gap-2">
          {LEVELS.map((l, i) => (
            <button
              key={l.key}
              type="button"
              role="tab"
              id={`level-tab-${l.key}`}
              aria-selected={active === l.key}
              aria-controls={`level-panel-${l.key}`}
              tabIndex={active === l.key ? 0 : -1}
              onKeyDown={(e) => onKey(e, i)}
              onClick={() => setActive(l.key)}
              className={`min-h-[44px] rounded-full px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] transition-colors ${
                active === l.key
                  ? "border border-[color:var(--gold)]/60 bg-[color:var(--gold)]/12 text-[color:var(--gold)]"
                  : "border border-white/10 text-foreground/70 hover:border-[color:var(--gold)]/35"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`level-panel-${current.key}`}
          aria-labelledby={`level-tab-${current.key}`}
          className="glass-soft mt-5 rounded-[1.75rem] border border-white/8 p-6 md:p-9"
        >
          <h3 className="font-display text-xl text-foreground md:text-2xl">{current.heading}</h3>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {current.points.map((p) => (
              <li key={p} className="text-sm leading-relaxed text-foreground/85">— {p}</li>
            ))}
          </ul>
          {"note" in current && current.note ? (
            <p className="mt-5 text-sm leading-relaxed text-foreground/70">{current.note}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
