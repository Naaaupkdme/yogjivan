import { hreflangLinks, PAIR_ONLINE_GROUP } from "@/lib/locale-routes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { FurtherReading } from "@/components/site/FurtherReading";
import { Testimonials } from "@/components/site/Testimonials";
import { LuxuryImage } from "@/components/site/LuxuryImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SOCIAL } from "@/lib/social";
import { TRIAL, ONLINE_CLASS, REFUND_POLICY, HEALTH_DISCLAIMER } from "@/lib/facts";
import { TEACHER } from "@/lib/facts/teacher";
import { PUBLIC_TRUST } from "@/lib/facts/trust";
import { ONLINE_PLANS, formatUSD, perMonth } from "@/lib/facts/pricing";
import { masterImages, masterAlts, socialImageMeta } from "@/lib/images";

import {
  Users,
  Globe2,
  Clock,
  Video,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  UserRound,
} from "lucide-react";

const CANONICAL = "https://yogjivan.com/online-yoga-classes";
const ONLINE_TITLE = `Live Online Yoga Classes [Max ${ONLINE_CLASS.maxGroupSize} Students • 2-Way Video] | Yog Jivan`;
const ONLINE_DESC = `Interactive live online yoga with real-time posture correction — never pre-recorded. Groups capped at ${ONLINE_CLASS.maxGroupSize} students, ${ONLINE_CLASS.durationMinutes} minutes, taught in ${ONLINE_CLASS.languages.join(", ")}. Free introductory offer, or choose private 1-on-1.`;
const WA = SOCIAL.whatsapp;

/* ---------- Content (verified facts only — no medical or outcome promises) ---------- */

const ANSWER_CAPSULE = `Yog Jivan runs live online yoga classes taught personally by ${TEACHER.name}, ${TEACHER.title}. Every class is live on ${ONLINE_CLASS.platform} — never pre-recorded — in a group of no more than ${ONLINE_CLASS.maxGroupSize} students, ${ONLINE_CLASS.durationMinutes} minutes long, taught in ${ONLINE_CLASS.languages.join(", ")}. Camera on is required so your alignment can be corrected in real time. The same teacher takes every class, so your cues and progress stay consistent. New students start with ${TRIAL.summary} Yoga supports wellbeing and complements, but never replaces, medical care.`;

const QUICK_FACTS = [
  { Icon: Video, label: "Live, never pre-recorded", value: ONLINE_CLASS.platform },
  { Icon: Users, label: "Group size", value: `Maximum ${ONLINE_CLASS.maxGroupSize} students` },
  { Icon: Clock, label: "Class length", value: `${ONLINE_CLASS.durationMinutes} minutes` },
  { Icon: Globe2, label: "Languages", value: ONLINE_CLASS.languages.join(", ") },
];

const TRUST_STATS = [
  { k: PUBLIC_TRUST.yearsTeaching, v: "Years teaching" },
  { k: PUBLIC_TRUST.studentsTaught, v: "Students guided" },
  { k: PUBLIC_TRUST.countries, v: "Countries" },
  { k: `Max ${ONLINE_CLASS.maxGroupSize}`, v: "Per live class" },
];

/** Short, self-contained answers (40–60 words) for search and answer engines. */
const QUICK_ANSWERS: { q: string; a: string }[] = [
  {
    q: "How do live online yoga classes work?",
    a: `Classes run live on ${ONLINE_CLASS.platform} with a Yog Jivan teacher, never pre-recorded. Each class lasts ${ONLINE_CLASS.durationMinutes} minutes in a group capped at ${ONLINE_CLASS.maxGroupSize} students. Your camera stays on so your alignment is corrected in real time, and you can ask questions during the class.`,
  },
  {
    q: "How much do online yoga classes cost?",
    a: `Live group memberships are ${ONLINE_PLANS.map((p) => `${formatUSD(p.priceUSD)} for ${p.label.toLowerCase()}`).join(", ")}. Longer plans lower the monthly cost. Private 1-on-1 online sessions are arranged individually and quoted by enquiry, so message us with your goals and preferred times for a plan.`,
  },
  {
    q: "Are online yoga classes suitable for complete beginners?",
    a: `Yes. Flexibility and experience are not required. Every posture is offered in simpler stages and with props, and groups are capped at ${ONLINE_CLASS.maxGroupSize} students so beginners get direct attention. A short onboarding conversation happens before your first class so the practice is paced for you.`,
  },
  {
    q: "What do I need to join an online yoga class?",
    a: `A yoga mat, roughly 2×2m of clear floor space, and a laptop or tablet placed so your whole body is visible. Blocks, a strap and a cushion are optional. A quiet spot and a stable internet connection are the only other requirements.`,
  },
  {
    q: "Should I choose a live group class or private 1-on-1 yoga?",
    a: `Choose live group classes for a fixed schedule, shared energy and a lower monthly cost. Choose private 1-on-1 online yoga if you want the full session built around your body, level and goals, with one matched teacher kept session after session and times arranged around your week.`,
  },
];



const WHY_LIVE = [
  {
    title: "A teacher who can actually see you",
    body: `${TEACHER.shortName} watches each student and corrects alignment by name as you move. A recording cannot do that.`,
  },
  {
    title: "The same teacher every class",
    body: TEACHER.groupClassNote,
  },
  {
    title: "Small enough to be personal",
    body: `Groups are capped at ${ONLINE_CLASS.maxGroupSize} so there is time for everyone, including complete beginners.`,
  },
  {
    title: "Adapted to your body",
    body: "Postures are offered in stages and with props, so you work at the range that is comfortable for you today.",
  },
];

const FIRST_WEEK = [
  {
    step: "01",
    title: "Say hello",
    body: "Message us on WhatsApp or send the contact form with what you're looking for. We reply personally.",
  },
  {
    step: "02",
    title: ONLINE_CLASS.onboarding.label,
    body: ONLINE_CLASS.onboarding.note,
  },
  {
    step: "03",
    title: "Your first live class",
    body: `Camera on, mat down, about 2×2m of clear space. Breath work first, then a warm-up and a sequence paced for your level, with ${TEACHER.shortName} guiding you throughout.`,
  },
  {
    step: "04",
    title: "Keep going, or don't",
    body: "The introductory offer is free and there is no card on file. If it suits you, choose a membership; if not, nothing happens.",
  },
];

const SETUP = [
  "A yoga mat and roughly 2×2m of clear floor space",
  "A laptop or tablet placed so your whole body is visible — better than a phone",
  "Optional: two blocks (or thick books), a strap (or belt) and a cushion",
  "A quiet spot and a stable internet connection",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Are the classes live or pre-recorded?",
    a: `Live, always. Each class runs on ${ONLINE_CLASS.platform} with ${TEACHER.name} teaching in real time.`,
  },
  {
    q: "Do I have to keep my camera on?",
    a: ONLINE_CLASS.cameraNote,
  },
  {
    q: "I'm a complete beginner and not flexible. Can I join?",
    a: "Yes. Flexibility is not a requirement. Every posture has simpler stages and prop options, and beginners get the most attention in a small group.",
  },
  {
    q: "How many students are in a class?",
    a: `Live group classes are capped at ${ONLINE_CLASS.maxGroupSize} students. Private 1-on-1 online sessions are also available.`,
  },
  {
    q: "What if I miss a class?",
    a: ONLINE_CLASS.recordings.note,
  },
  {
    q: "Can I join from a different timezone?",
    a: "Yes. Students practise with us from many countries. Tell us your city and we will suggest the slots that work for your day.",
  },
  {
    q: "What equipment do I need?",
    a: SETUP.join("; ") + ".",
  },
  {
    q: "Which languages are the classes taught in?",
    a: `Classes are taught in ${ONLINE_CLASS.languages.join(", ")}.`,
  },
  {
    q: "Can I ask questions during class?",
    a: "Yes. The group is small, so you can ask for a modification or a repeat at any point, and you can also message us afterwards.",
  },
  {
    q: "What does it cost after the free trial?",
    a: `Live group memberships are ${ONLINE_PLANS.map((p) => `${formatUSD(p.priceUSD)} for ${p.label.toLowerCase()}`).join(", ")}. Private 1-on-1 online sessions are quoted individually.`,
  },
  {
    q: "What is included in the free trial?",
    a: TRIAL.summary,
  },
  {
    q: "I have an injury or a health condition. Is this suitable?",
    a: `Tell us at your ${ONLINE_CLASS.onboarding.minutes}-minute onboarding conversation so your practice can be adapted, and please follow your doctor's advice. ${HEALTH_DISCLAIMER.short}`,
  },
  {
    q: "Can I get a refund?",
    a: `${REFUND_POLICY.summary} ${REFUND_POLICY.howTo}`,
  },
];

const RELATED_LINKS = [
  { to: "/private-online-yoga", label: "Private 1-on-1 yoga" },
  { to: "/yoga-for-beginners", label: "Yoga for beginners" },
  { to: "/programs", label: "All programs" },
  { to: "/about", label: "About Master Anil" },
  { to: "/testimonials", label: "Student stories" },
  { to: "/corporate", label: "Corporate online yoga" },
  { to: "/contact", label: "Start your free trial" },
];

/* ---------- Route ---------- */

export const Route = createFileRoute("/online-yoga-classes")({
  head: () => ({
    meta: [
      { title: ONLINE_TITLE },
      { name: "description", content: ONLINE_DESC },
      { property: "og:title", content: ONLINE_TITLE },
      { property: "og:description", content: ONLINE_DESC },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.meditationPortrait),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ONLINE_TITLE },
      { name: "twitter:description", content: ONLINE_DESC },
    ],
    links: [{ rel: "canonical", href: CANONICAL }, ...hreflangLinks(PAIR_ONLINE_GROUP)],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Live Online Yoga Classes with Master Anil Choudhary",
          description:
            "Live, interactive small-group online yoga classes taught personally by Master Anil Choudhary, Founder & Lead Yoga Teacher. Beginner-friendly, with real-time posture correction.",
          provider: {
            "@type": "Organization",
            name: "Yog Jivan",
            url: "https://yogjivan.com",
            sameAs: "https://yogjivan.com",
          },
          url: CANONICAL,
          image: masterImages.meditationPortrait,
          educationalLevel: "Beginner to Advanced",
          teaches: ["Hatha Yoga", "Ashtanga Yoga", "Pranayama", "Meditation"],
          inLanguage: ["en", "vi", "hi"],
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: `PT${ONLINE_CLASS.durationMinutes}M`,
            location: { "@type": "VirtualLocation", url: CANONICAL },
            instructor: {
              "@type": "Person",
              name: TEACHER.name,
              jobTitle: TEACHER.title,
              image: masterImages.meditationPortrait,
              url: "https://yogjivan.com/about",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://yogjivan.com/" },
            { "@type": "ListItem", position: 2, name: "Online Yoga Classes", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: OnlineYogaClassesPage,
});

/* ---------- Reusable bits ---------- */

function InlineCTA({ variant = "gold" }: { variant?: "gold" | "ghost" }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link
        to="/contact"
        hash="consultation"
        className={variant === "gold" ? "btn-gold" : "btn-ghost-gold"}
      >
        <Sparkles className="h-4 w-4" /> {TRIAL.ctaLabel}
      </Link>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
        <MessageCircle className="h-4 w-4 text-[#25D366]" /> Ask a question on WhatsApp
      </a>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow justify-center">
        <span className="h-px w-10 bg-primary" />
        {eyebrow}
        <span className="h-px w-10 bg-primary" />
      </p>
      <h2 className="mt-4 font-display leading-[1.12]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
        {title}
      </h2>
      {sub && <p className="mt-4 leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ---------- Page ---------- */

function OnlineYogaClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Live online yoga"
        title="Live online yoga classes,"
        accent="taught by one teacher."
        sub={`Small groups of no more than ${ONLINE_CLASS.maxGroupSize}, ${ONLINE_CLASS.durationMinutes} minutes, live on camera with ${TEACHER.name} — so your posture is corrected as you move.`}
        image={masterImages.meditationPortrait}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" hash="consultation" className="btn-gold">
            <Sparkles className="h-4 w-4" /> {TRIAL.ctaLabel}
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp us
          </a>
        </div>
      </PageHero>

      {/* Decision fork — live group vs private 1-on-1 */}
      <section className="section-tight">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Choose your path"
            title="Live group class, or private 1-on-1?"
            sub="Both are live online with a Yog Jivan teacher. The difference is how much of the hour is built around you."
          />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="glass-luxe rounded-[1.75rem] p-6 md:p-8">
              <Users className="h-5 w-5 text-[color:var(--gold)]" />
              <h3 className="mt-3 font-display text-xl">Live group classes</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A shared {ONLINE_CLASS.durationMinutes}-minute class with no more than{" "}
                {ONLINE_CLASS.maxGroupSize} students, on a fixed schedule, with corrections called
                out by name. Best if you want steady practice at a set time and a lower monthly cost.
              </p>
              <Link to="/contact" hash="consultation" className="btn-gold mt-6">
                <Sparkles className="h-4 w-4" /> {TRIAL.ctaLabel}
              </Link>
            </div>
            <div className="glass-luxe rounded-[1.75rem] p-6 md:p-8">
              <UserRound className="h-5 w-5 text-[color:var(--gold)]" />
              <h3 className="mt-3 font-display text-xl">Private 1-on-1 online yoga</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A live {ONLINE_CLASS.durationMinutes}-minute session for you alone, with one matched
                teacher kept session after session, times arranged around your week. Best if you
                want a practice shaped entirely to your body, level and goals.
              </p>
              <Link to="/private-online-yoga" className="btn-ghost-gold mt-6">
                See private 1-on-1 yoga <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Comparison table */}
          <div className="mx-auto mt-8 max-w-4xl overflow-x-auto rounded-[1.5rem] border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-4 font-normal text-muted-foreground">&nbsp;</th>
                  <th className="p-4 font-display">Live group class</th>
                  <th className="p-4 font-display">Private 1-on-1</th>
                  <th className="p-4 font-display">Pre-recorded app</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-white/5 [&>tr:last-child]:border-0">
                {[
                  ["Teacher can see and correct you", "Yes, live", "Yes, the full hour", "No"],
                  [
                    "People in the session",
                    `Up to ${ONLINE_CLASS.maxGroupSize}`,
                    "Just you",
                    "Unlimited viewers",
                  ],
                  ["Session built around your body", "Partly", "Entirely", "No"],
                  ["Timing", "Fixed schedule", "Arranged with you", "Anytime"],
                  [
                    "Languages",
                    ONLINE_CLASS.languages.join(", "),
                    ONLINE_CLASS.languages.join(", "),
                    "Varies",
                  ],
                  ["Same teacher each time", "Yes", "Yes, generally your matched teacher", "No teacher"],
                  [
                    "Cost",
                    `From ${formatUSD(ONLINE_PLANS[0].priceUSD)} / ${ONLINE_PLANS[0].label.toLowerCase()}`,
                    "By enquiry",
                    "Varies",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    <th scope="row" className="p-4 font-normal text-muted-foreground">
                      {row[0]}
                    </th>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4">{row[2]}</td>
                    <td className="p-4 text-muted-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Answer capsule — the plain-language summary of what this is */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl glass-luxe rounded-[2rem] p-6 md:p-9">
            <p className="text-[0.6rem] uppercase tracking-[0.26em] text-[color:var(--gold)]">
              In short
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
              {ANSWER_CAPSULE}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_FACTS.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick answers — short, self-contained answers for search and answer engines */}
      <section className="section-tight">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Quick answers"
            title="Online yoga classes, answered simply"
            sub="The questions people ask most before their first live class."
          />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            {QUICK_ANSWERS.map(({ q, a }) => (
              <article
                key={q}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6"
              >
                <h3 className="font-display text-lg leading-snug">{q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-4xl text-xs leading-relaxed text-muted-foreground">
            {HEALTH_DISCLAIMER.short}
          </p>
        </div>
      </section>

      {/* Trust stats */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {TRUST_STATS.map((s) => (
              <div
                key={s.v}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5 text-center"
              >
                <p className="font-display text-2xl text-gold-gradient">{s.k}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why live */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Why live"
            title="What a live class gives you that a video cannot"
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {WHY_LIVE.map((w) => (
              <article key={w.title} className="glass-luxe rounded-[1.5rem] p-6">
                <h3 className="font-display text-lg leading-snug">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </article>
            ))}
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* Group vs private */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Choose your path"
            title="Live group classes or private 1-on-1 online"
            sub="Live group classes are led by Master Anil. Private 1-on-1 sessions are with a dedicated, matched Yog Jivan teacher."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            <article className="glass-luxe flex flex-col rounded-[1.75rem] border border-[color:var(--gold)]/25 p-7">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[color:var(--gold)]" />
                <h3 className="font-display text-xl">Live group classes</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  Maximum {ONLINE_CLASS.maxGroupSize} students, {ONLINE_CLASS.durationMinutes}{" "}
                  minutes
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  A set weekly rhythm and a small, familiar group
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  Memberships from {formatUSD(ONLINE_PLANS[0].priceUSD)}
                </li>
              </ul>
              <Link to="/contact" hash="consultation" className="btn-gold mt-6 justify-center">
                {TRIAL.ctaLabel}
              </Link>
            </article>

            <article className="glass-luxe flex flex-col rounded-[1.75rem] p-7">
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5 text-[color:var(--gold)]" />
                <h3 className="font-display text-xl">Private 1-on-1 online yoga</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  The whole session is built around you and your schedule
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  Individual corrections and pacing with a dedicated Yog Jivan teacher
                </li>
                <li className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  Contact us for private-session plans
                </li>
              </ul>
              <Link to="/private-online-yoga" className="btn-ghost-gold mt-6 justify-center">
                See private training <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* First week */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10">
              <LuxuryImage
                src={masterImages.studioAdjustment}
                alt={masterAlts.studioAdjustment}
                className="h-[280px] w-full md:h-[420px]"
              />
            </div>
            <div>
              <h2
                className="font-display leading-[1.12]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
              >
                How your first week works
              </h2>
              <ol className="mt-7 space-y-6">
                {FIRST_WEEK.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-display text-lg text-[color:var(--gold)]">{s.step}</span>
                    <div>
                      <h3 className="text-base font-semibold">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
            <h2 className="font-display text-2xl leading-tight">What you need at home</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {SETUP.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
              {ONLINE_CLASS.cameraNote}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Membership"
            title="Simple pricing for live group classes"
            sub={`Start with the free introductory offer. Memberships only begin if you choose to continue — ${TRIAL.cardRequired ? "" : "no card is required for the trial"}.`}
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ONLINE_PLANS.map((p) => (
              <article
                key={p.id}
                className={`glass-luxe relative flex flex-col rounded-[1.75rem] border p-6 text-center ${
                  p.badge ? "border-[color:var(--gold)]/50" : "border-white/10"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[color:var(--gold)]/50 bg-background/90 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">
                    {p.badge}
                  </span>
                )}
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {p.label}
                </p>
                <p className="mt-3 font-display text-3xl text-gold-gradient">
                  {formatUSD(p.priceUSD)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatUSD(perMonth(p))} per month
                </p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            Prices in USD. Private 1-on-1 online sessions and corporate groups are quoted
            individually — contact us for private-session plans. {REFUND_POLICY.summary}
          </p>
          <InlineCTA />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="FAQ"
            title="Questions students ask before joining"
            sub="If your question isn't here, message us on WhatsApp — we reply personally."
          />
          <div className="glass-luxe mx-auto mt-10 max-w-4xl rounded-[2rem] p-4 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-display text-base text-foreground hover:no-underline md:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground/85 md:text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {HEALTH_DISCLAIMER.long}
          </p>
        </div>
      </section>

      {/* Related pages */}
      <section className="section-tight">
        <div className="container-luxe">
          <SectionHead eyebrow="Explore more" title="Related pages" />
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {RELATED_LINKS.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="glass-soft rounded-full border border-[color:var(--gold)]/25 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-foreground/90 transition-colors hover:border-[color:var(--gold)]/60 hover:text-[color:var(--gold)]"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready for your first live class?"
        sub={TRIAL.summary}
      />

      <FurtherReading
        heading="Guides for new online students"
        intro="Practical answers to the questions students ask before their first live online session."
        slugs={[
          "first-live-online-yoga-class",
          "online-yoga-camera-setup",
          "live-online-yoga-vs-youtube",
          "private-online-yoga-vs-group-classes",
        ]}
      />
    </>
  );
}
