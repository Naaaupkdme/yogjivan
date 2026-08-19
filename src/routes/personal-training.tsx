import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FurtherReading } from "@/components/site/FurtherReading";
import { PrivateYogaEnquiryForm } from "@/components/site/PrivateYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { masterImages, masterAlts, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { TEACHER } from "@/lib/facts/teacher";
import { TEAM_MODEL } from "@/lib/facts/team";
import { PUBLIC_TRUST } from "@/lib/facts/trust";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { CONTACT } from "@/lib/facts/contact";
import teachingAdjustment from "@/assets/paid/teaching-adjustment.webp.asset.json";
import liveGuidanceFloor from "@/assets/paid/live-guidance-floor.webp.asset.json";

/* ---------------------------------------------------------------------------
   MEDIA SLOTS — replaceable without redesign.
   1) HERO BACKDROP  — currently masterImages.acroHero.
      Ideal: 16:9 or 16:10, 1920x1080 / 1920x1200, WebP. Crop: teaching moment,
      space on the left for the headline. Optional later: muted 6-12s loop.
   2) LIVE-GUIDANCE DEMO — currently paid/live-guidance-floor.webp (authentic
      in-studio teaching photo used as a poster, never presented as a video call).
      Ideal replacement: real private online session recording, 16:9, 1920x1080,
      30-60s, MP4/WebM + 1600x900 WebP poster. Drops into the same frame.
   3) TEACHER PORTRAIT — currently masterImages.founderPortrait.
      Ideal: 4:5, 1200x1500 WebP, head-and-shoulders to mid-torso.
   4) STUDENT PROOF (NOT RENDERED) — only once written permission exists.
      4:5, ~1000x1250 WebP, or 9:16 1080x1920 video.
--------------------------------------------------------------------------- */

const PT_TITLE = "Private Online Yoga Classes & 1-on-1 Yoga | Yog Jivan";
const PT_DESC =
  "Book live private online yoga with the Yog Jivan teaching team. One dedicated teacher, 60-minute 1-on-1 sessions for beginners, intermediate and advanced practitioners worldwide.";

/** Exact AEO/GEO direct-answer capsule. Keep fact-first and chunkable. */
const DIRECT_ANSWER =
  "Private online yoga at Yog Jivan is a live 60-minute one-to-one session with a teacher from the Yog Jivan team. You are matched with a dedicated teacher based on your level and goals, and that same teacher continues with you session after session so they can understand your movement patterns, questions and progress. Sessions are live on video, available worldwide, and adapted for beginners, intermediate students and advanced practitioners. Private-session pricing and scheduling are arranged by enquiry.";

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
      "Inversions",
      "Arm balances",
      "Backbends",
      "Balance work and controlled transitions",
      "Precision, technique and individual feedback on what you are practising",
    ],
    note: "Progression depends on your body and your practice. We do not promise specific poses or fixed timelines.",
  },
] as const;

const FOCUS_AREAS = [
  { t: "Beginner foundations & alignment", d: "Unhurried guidance through standing, seated and floor postures." },
  { t: "Flexibility & mobility", d: "Gradual work on range of movement, guided in real time." },
  { t: "Strength & balance", d: "Sustainable stability and steady endurance for your level." },
  { t: "Transitions & technique", d: "The parts between postures, refined with live yoga posture guidance." },
  { t: "Advanced asana progression", d: "Inversions, arm balances and backbends, according to current ability." },
  { t: "Pranayama & breathwork", d: "Breathing practices taught individually rather than in a group." },
  { t: "Meditation & relaxation", d: "Stillness practices to close a session or stand on their own." },
  { t: "Stress support & a calmer practice", d: "A gentler, slower session when that is what your week needs." },
  { t: "Consistency & home practice", d: "Optional simple guidance for practising between sessions." },
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
  { n: "02", t: "We understand your level and schedule", d: "A short conversation about what you want to work on and which times realistically fit your week." },
  { n: "03", t: "We match you with a Yog Jivan teacher", d: "A teacher from the team is matched to your level and goals, and the match is agreed with you." },
  { n: "04", t: "Your live 60-minute session", d: "Your dedicated teacher guides the full hour live on video with real-time verbal guidance." },
  { n: "05", t: "Continue with the same teacher", d: "Future sessions build on the last one and adapt as your practice develops." },
];

const SESSION_DETAILS = [
  { t: "Format", d: `Live ${ONLINE_CLASS.durationMinutes}-minute one-to-one session on video — never a recording.` },
  { t: "Where", d: "Online worldwide, wherever you have space for a mat and a stable connection." },
  { t: "Your teacher", d: "Matched from the Yog Jivan teaching team, then the same dedicated teacher continues with you." },
  { t: "Languages", d: `${ONLINE_CLASS.languages.join(", ")}.` },
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
    a: "Yes. You are matched with a teacher from the Yog Jivan team based on your level and goals, and that same dedicated teacher continues with you session after session. We do not confirm a specific teacher until the match is agreed with you.",
  },
  {
    q: "Can a teacher really correct me online?",
    a: "Your teacher watches your live camera view throughout the session and gives real-time verbal guidance — where to shift weight, how to place a hand or foot, when to ease off. It is verbal rather than hands-on, and in a one-to-one session all of that attention is on you.",
  },
  {
    q: "How should I position my camera?",
    a: "Place your phone, tablet or laptop so your full body is visible, usually side-on and a couple of metres back, with enough light on you. Your teacher will help you adjust it at the start of the first session.",
  },
  {
    q: "What equipment do I need?",
    a: "A yoga mat, clear floor space and a device with a stable connection. Blocks, a strap or a chair are useful but household substitutes are fine.",
  },
  {
    q: "How are session times arranged across time zones?",
    a: "Times are agreed directly with you rather than fixed to a group timetable, so your session is scheduled around your local time zone.",
  },
  {
    q: "Which languages are available?",
    a: `Sessions are taught in ${ONLINE_CLASS.languages.join(", ")}. Tell us your preference in your enquiry so you can be matched accordingly.`,
  },
  {
    q: "How much does private online yoga cost?",
    a: "Private-session pricing is arranged by enquiry, because the format and frequency vary from student to student. Send an enquiry and we will explain the options directly.",
  },
  {
    q: "Can I practise while travelling?",
    a: "Yes. Sessions are online, so you can practise from another city or country as long as you have space and a stable connection. Let your teacher know your temporary time zone.",
  },
  {
    q: "What if I have an injury or a medical condition?",
    a: "Please follow your clinician's advice. Yoga at Yog Jivan is a wellness practice and does not replace medical care. Tell your teacher about any relevant limitations before you practise so movements can be adapted.",
  },
];

export const Route = createFileRoute("/personal-training")({
  head: () => ({
    meta: [
      { title: PT_TITLE },
      { name: "description", content: PT_DESC },
      { property: "og:title", content: PT_TITLE },
      { property: "og:description", content: PT_DESC },
      { property: "og:url", content: "https://yogjivan.com/personal-training" },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.founderPortrait),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PT_TITLE },
      { name: "twitter:description", content: PT_DESC },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/personal-training" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Private Online Yoga", "/personal-training")),
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
          url: "/personal-training",
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
          url: "/personal-training",
        })),
      },
    ],
  }),
  component: PrivateYogaPage,
});

function PrivateYogaPage() {
  return (
    <>
      {/* 1 — HERO: commercial intent, trust strip, continuity micro-proof, CTA */}
      <PageHero
        eyebrow="Private Online Yoga & 1-on-1 Sessions"
        title="Private Online Yoga Classes —"
        accent="1-on-1 live with the Yog Jivan team."
        sub="One student. One dedicated teacher. A live 60-minute practice shaped around your level, goals and schedule — from beginner foundations to advanced yoga progression."
        image={masterImages.acroHero}
      >
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/85">
          Matched with a Yog Jivan teacher. Continue with the same dedicated teacher session after
          session.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href="#private-enquiry" className="btn-gold">Enquire About Private 1-on-1 Yoga</a>
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
            <div key={m.l} className="glass-soft rounded-2xl px-4 py-3">
              <dt className="sr-only">{m.l}</dt>
              <dd className="font-display text-lg leading-tight text-[color:var(--gold)]">{m.v}</dd>
              <dd className="mt-1 text-[0.68rem] leading-snug text-muted-foreground">{m.l}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Taught in {ONLINE_CLASS.languages.join(", ")}.
        </p>
      </PageHero>

      {/* 2 — INLINE ENQUIRY FORM (early on mobile, alongside proof on desktop) */}
      <section id="private-enquiry" className="section-pad-sm relative isolate scroll-mt-28">
        <div aria-hidden="true" className="liquid-veil" />
        <div className="container-luxe">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
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
              <ul className="mt-6 grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
                <li>— Live 60-minute one-to-one sessions</li>
                <li>— Same dedicated teacher each session</li>
                <li>— Beginner, intermediate and advanced</li>
                <li>— Flexible online yoga schedule, worldwide</li>
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
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
            <p className="mt-4 text-xs text-muted-foreground">
              Yoga supports general wellbeing and does not replace medical care.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — LEVELS: beginner / intermediate / advanced */}
      <LevelSelector />

      {/* 5 — WHY THE SAME DEDICATED TEACHER MATTERS */}
      <section className="section-pad-sm relative isolate">
        <div aria-hidden="true" className="liquid-veil-alt" />
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Dedicated teacher continuity</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Why the same teacher, session after session, matters
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            {TEAM_MODEL.continuityShort} It is the difference between being taught and being known.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONTINUITY.map((c) => (
              <div key={c.t} className="glass-soft rounded-2xl p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
                <div className="font-display text-lg text-foreground">{c.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — WHAT YOUR PRACTICE CAN FOCUS ON */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Personalized online yoga classes</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            What can your private practice focus on?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((c) => (
              <div key={c.t} className="glass-soft rounded-2xl p-5">
                <div className="font-display text-lg text-foreground">{c.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Yoga at Yog Jivan supports movement, breathing, relaxation and general wellbeing alongside
            medical care where relevant. It is not medical treatment and does not replace advice from
            your doctor.
          </p>
        </div>
      </section>

      {/* 7 — COMPARISON */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Choosing a format</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Private, small group or recorded — which fits you?
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {COMPARISON.map((c) => (
              <div
                key={c.t}
                className={`glass-soft rounded-2xl p-5 ${c.highlight ? "border border-[color:var(--gold)]/30" : ""}`}
              >
                <div className="font-display text-lg text-foreground">{c.t}</div>
                <ul className="mt-3 grid gap-2">
                  {c.rows.map((r) => (
                    <li key={r} className="text-sm leading-relaxed text-muted-foreground">— {r}</li>
                  ))}
                </ul>
                {c.link && (
                  <Link to={c.link.to} className="mt-4 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] hover:underline">
                    {c.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — HOW IT WORKS */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />How private 1-on-1 works</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            From enquiry to your dedicated teacher
          </h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.n} className="glass-soft rounded-2xl p-5">
                <div className="text-[0.7rem] tracking-[0.24em] text-[color:var(--gold)]">{s.n}</div>
                <div className="mt-3 font-display text-lg text-foreground">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 — TEACHING TEAM */}
      <section className="section-pad-sm relative isolate">
        <div aria-hidden="true" className="liquid-veil" />
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />The Yog Jivan teaching team</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Who will teach your private sessions
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            {/*
              TEACHER CARDS — rendered from the single verified collection
              TEACHING_TEAM in src/lib/facts/team.ts. MEDIA SLOT 3 per teacher:
              real portrait, 4:5, 1200x1500 WebP. Adding another fully verified
              TeacherProfile record renders another card here with no redesign.
              Never add an unverified teacher.
            */}
            {TEACHING_TEAM.map((t) => (
              <article key={t.id} className="glass-soft overflow-hidden rounded-[1.75rem]">
                <img
                  src={t.photo}
                  alt={t.photoAlt}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-display text-xl text-foreground">{t.name}</h3>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">
                    {t.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.shortBio}</p>
                  <ul className="mt-3 grid gap-2">
                    {t.specialties.map((q) => (
                      <li key={q} className="text-sm leading-relaxed text-muted-foreground">— {q}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Teaches: {t.suitableLevels.join(" · ")} · {t.languages.join(", ")}
                  </p>
                  {t.profilePath === "/about" ? (
                    <Link to="/about" className="mt-4 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] hover:underline">
                      Read the Yog Jivan story →
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}

            <div className="glass-luxe rounded-[1.75rem] border border-[color:var(--gold)]/25 p-6 md:p-8">
              <h3 className="font-display text-xl leading-snug text-foreground">
                {TEAM_MODEL.headline}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                {TEAM_MODEL.body}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Private sessions are taught by the Yog Jivan teaching team. We match by level, goals
                and language, so the teacher you work with is suited to the practice you want to
                build.
              </p>

              <a href="#private-enquiry" className="btn-ghost-gold mt-6">Request a teacher match</a>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — LIVE GUIDANCE DEMO (MEDIA SLOT 2) */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/25 shadow-[0_40px_90px_-50px_rgba(0,0,0,1)]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
              {/*
                MEDIA SLOT 2 — live-correction demo.
                Currently an authentic in-studio teaching photograph used as a
                poster. It is NOT presented as a video-call screenshot. Replace
                with a real private online session clip (16:9, 1920x1080,
                30-60s, MP4/WebM + 1600x900 WebP poster) — same frame, no
                layout change, no autoplaying background video.
              */}
              <img
                src={liveGuidanceFloor.url}
                alt="A Yog Jivan teacher guiding a student through a floor posture in the studio"
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </div>
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Real-time yoga feedback</p>
              <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
                See how live 1-on-1 guidance works
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                Your teacher watches your live camera view for the whole session and gives real-time
                verbal guidance as you move — where to shift your weight, how to place a hand or a
                foot, when to ease out of a posture. In a one-to-one session that attention is not
                shared with anyone else.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Guidance is verbal, not hands-on. {ONLINE_CLASS.cameraRequired ? "Camera on is required so your alignment can actually be seen." : ""} Your session is private and is not shared.
              </p>
              <img
                src={teachingAdjustment.url}
                alt="A Yog Jivan teacher adjusting a student's alignment during class"
                loading="lazy"
                className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11 — SESSION DETAILS */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Private session details</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Everything confirmed, in one place
          </h2>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SESSION_DETAILS.map((d) => (
              <div key={d.t} className="glass-soft rounded-2xl p-5">
                <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">{d.t}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.d}</dd>
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
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 13 — INTERNAL LINKS + CLOSING CTA */}
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
              <a href="#private-enquiry" className="btn-gold">Enquire About Private 1-on-1 Yoga</a>
              <Link to="/online-yoga-classes" className="text-sm text-[color:var(--gold)] hover:underline">
                Compare live group classes
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <p>
              New to yoga entirely? Start with{" "}
              <Link to="/yoga-for-beginners" className="text-[color:var(--gold)] hover:underline">yoga for beginners</Link>.
              Prefer practising with others? See{" "}
              <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>{" "}
              or compare every option across our{" "}
              <Link to="/programs" className="text-[color:var(--gold)] hover:underline">yoga programs</Link>.
              You can also read about{" "}
              <Link to="/about" className="text-[color:var(--gold)] hover:underline">Yog Jivan and Master Anil</Link>.
            </p>
            <p className="mt-3">
              Working on something specific? Private sessions are often used alongside our guidance on{" "}
              <Link to="/yoga-for-back-pain" className="text-[color:var(--gold)] hover:underline">yoga for back pain</Link>{" "}
              and{" "}
              <Link to="/yoga-for-stress" className="text-[color:var(--gold)] hover:underline">yoga for stress support</Link>.
            </p>
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

/** Beginner / Intermediate / Advanced selector. Tabs on desktop, stacked-friendly on mobile. */
function LevelSelector() {
  const [active, setActive] = useState<string>(LEVELS[0].key);
  const current = LEVELS.find((l) => l.key === active) ?? LEVELS[0];

  return (
    <section className="section-pad-sm">
      <div className="container-luxe">
        <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Every stage of practice</p>
        <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
          Private yoga for every stage of practice
        </h2>

        <div role="tablist" aria-label="Practice level" className="mt-6 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              type="button"
              role="tab"
              id={`level-tab-${l.key}`}
              aria-selected={active === l.key}
              aria-controls={`level-panel-${l.key}`}
              onClick={() => setActive(l.key)}
              className={`rounded-full px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.22em] transition-colors ${
                active === l.key
                  ? "border border-[color:var(--gold)]/60 bg-[color:var(--gold)]/12 text-[color:var(--gold)]"
                  : "border border-white/10 text-muted-foreground hover:border-[color:var(--gold)]/35"
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
          className="glass-soft mt-5 rounded-[1.75rem] p-6 md:p-8"
        >
          <h3 className="font-display text-xl text-foreground md:text-2xl">{current.heading}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {current.points.map((p) => (
              <li key={p} className="text-sm leading-relaxed text-foreground/85">— {p}</li>
            ))}
          </ul>
          {"note" in current && current.note && (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{current.note}</p>
          )}
        </div>
      </div>
    </section>
  );
}
