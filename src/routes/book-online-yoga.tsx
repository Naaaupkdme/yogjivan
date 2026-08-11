import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Clock,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

import { BookOnlineYogaForm } from "@/components/site/BookOnlineYogaForm";
import { LuxuryImage } from "@/components/site/LuxuryImage";
import { CONTACT } from "@/lib/facts/contact";
import { TEACHER } from "@/lib/facts/teacher";
import { TRIAL } from "@/lib/facts/trial";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { PUBLIC_TRUST } from "@/lib/facts/trust";
import { ONLINE_PLANS, formatUSD } from "@/lib/facts/pricing";

import teachingAdjustment from "@/assets/paid/teaching-adjustment.webp.asset.json";
import liveGuidanceFloor from "@/assets/paid/live-guidance-floor.webp.asset.json";
import smallGroupClass from "@/assets/paid/small-group-class.webp.asset.json";
import masterAnilOutdoor from "@/assets/paid/master-anil-outdoor.webp.asset.json";

const TITLE = "Book Live Online Yoga — Free 3-Day Trial | Yog Jivan";
const DESC =
  "Live online yoga with Master Anil. Small groups of 8, real-time posture correction, 3 days free plus one private session. No card required.";

export const Route = createFileRoute("/book-online-yoga")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      // Paid-traffic landing page: intentionally excluded from search indexes
      // so it never competes with /online-yoga-classes.
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookOnlineYogaPage,
});

const PROOF = [
  { Icon: Users, label: `Max ${ONLINE_CLASS.maxGroupSize} students per live class` },
  { Icon: Video, label: "Real-time posture correction, live on camera" },
  { Icon: Clock, label: `${ONLINE_CLASS.durationMinutes}-minute classes` },
  { Icon: Globe2, label: `Taught in ${ONLINE_CLASS.languages.join(", ")}` },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us about you",
    body: "Share your name, WhatsApp number and what you want from your practice. It takes under a minute.",
  },
  {
    step: "02",
    title: `${ONLINE_CLASS.onboarding.minutes}-minute onboarding conversation`,
    body: ONLINE_CLASS.onboarding.note,
  },
  {
    step: "03",
    title: "Join your first live class",
    body: `You practise live with ${TEACHER.shortName} in a group of no more than ${ONLINE_CLASS.maxGroupSize} — corrected by voice, in real time, as you move.`,
  },
];

function BookOnlineYogaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal conversion header — no site navigation, no exit paths. */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <span className="font-display text-lg tracking-[0.22em] text-[color:var(--gold)] uppercase">
            Yog Jivan
          </span>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="paid_header"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Chat</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero + form */}
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-16">
          <div>
            <p className="eyebrow">Live online yoga · Free 3-day trial</p>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.05]">
              Live yoga classes where a real teacher actually corrects you.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Every class is taught personally by {TEACHER.name}, {TEACHER.title}, in the classical
              Indian tradition. Groups of no more than {ONLINE_CLASS.maxGroupSize}, camera on, so
              your alignment is corrected as you move — not left to a recording.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {PROOF.map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
              <LuxuryImage
                src={teachingAdjustment.url}
                alt={`${TEACHER.name} guiding a student through a supported backbend at the Yog Jivan studio`}
                className="h-[280px] w-full object-cover sm:h-[380px]"
                width={1440}
                height={1920}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <BookOnlineYogaForm />
          </div>
        </section>

        {/* What the trial includes */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
              What your free trial includes
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {TRIAL.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
              <LuxuryImage
                src={liveGuidanceFloor.url}
                alt={`${TEACHER.name} kneeling beside a student to guide an inversion with blocks`}
                className="h-[260px] w-full object-cover sm:h-[360px]"
                width={1920}
                height={1440}
              />
            </div>
            <div>
              <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
                How your first week works
              </h2>
              <ol className="mt-6 space-y-6">
                {HOW_IT_WORKS.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-display text-lg text-[color:var(--gold)]">{s.step}</span>
                    <div>
                      <h3 className="text-base font-semibold">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Proof + teacher */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
                Taught by one teacher, every single class
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {TEACHER.teachesEveryNote} {PUBLIC_TRUST.yearsTeaching} years of teaching,{" "}
                {PUBLIC_TRUST.studentsTaught} students across {PUBLIC_TRUST.countries} countries.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                {TEACHER.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
                {ONLINE_CLASS.cameraNote}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10">
                <LuxuryImage
                  src={masterAnilOutdoor.url}
                  alt={`${TEACHER.name} practising a deep kneeling backbend outdoors`}
                  className="h-[220px] w-full object-cover sm:h-[300px]"
                  width={1920}
                  height={1280}
                />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10">
                <LuxuryImage
                  src={smallGroupClass.url}
                  alt="A small Yog Jivan class practising with hands-on guidance in the studio"
                  className="h-[220px] w-full object-cover sm:h-[300px]"
                  width={1440}
                  height={1920}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing after the trial */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
            After your trial
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Membership is optional and only starts if you choose to continue. Live group memberships:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ONLINE_PLANS.map((p) => (
              <div
                key={p.id}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5 text-center"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
                  {p.label}
                </p>
                <p className="mt-2 font-display text-2xl text-[color:var(--gold)]">
                  {formatUSD(p.priceUSD)}
                </p>
                {p.badge && <p className="mt-1 text-[0.65rem] text-muted-foreground">{p.badge}</p>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Private 1-on-1 online sessions are priced individually — ask us on WhatsApp for private
            session plans.
          </p>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-3xl px-5 py-14 text-center">
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight">
              {TRIAL.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {TRIAL.summary}
            </p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <a href="#top" className="btn-gold justify-center" data-cta-location="paid_closing">
                {TRIAL.ctaLabel}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="paid_closing"
                className="btn-ghost-gold justify-center"
              >
                <MessageCircle className="h-4 w-4" /> Ask a question first
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Yog Jivan Sanctuary</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
