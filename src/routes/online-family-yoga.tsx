import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { FAMILY_OFFER, PARENT_CHILD_SECTION, FAMILY_3_PLANS, FAMILY_4_PLANS } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Private Online Family Yoga for 3 or 4 | Yog Jivan";
const DESCRIPTION =
  "Practise yoga live at home with three or four family members. Explore household sessions and a parent–child format with a participating adult.";
const CANONICAL = "https://www.yogjivan.com/online-family-yoga";

const FAQS = [
  {
    q: "Can three or four family members join?",
    a: "Yes. Choose the group size in the enquiry and we’ll confirm availability.",
  },
  {
    q: "Can I practise with my child?",
    a: "Yes. A parent or caregiver participates throughout and we confirm age suitability before booking.",
  },
  {
    q: "Do we need yoga experience?",
    a: "Tell us your experience and we’ll match the activities to your group.",
  },
  {
    q: "What ages can join family yoga?",
    a: "Send the general age range and group size so we can confirm suitable activities. For parent–child sessions, a parent or caregiver participates throughout.",
  },
  {
    q: "How much does online family yoga cost?",
    a: "A single 60-minute session is US$44 total for 3 household members, or US$52 total for 4 members. Multi-session plans for 3 participants are 6 sessions for US$228 (US$38.00/session, save US$36), 12 sessions for US$429 (US$35.75/session, save US$99), and 24 sessions for US$819 (US$34.13/session, save US$237). For 4 participants, plans are 6 sessions for US$276 (US$46.00/session, save US$36), 12 sessions for US$519 (US$43.25/session, save US$105), and 24 sessions for US$999 (US$41.63/session, save US$249). Custom schedules are available by enquiry. All participants share one camera feed and practise together.",
  },
  {
    q: "Can all participants share one camera and device?",
    a: "Yes. Sharing a single room and camera is our recommended setup. Positioning your device 2.5 to 3.5 metres back in landscape orientation allows all mats to be framed clearly.",
  },
];

export const Route = createFileRoute("/online-family-yoga")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta("https://www.yogjivan.com/assets/preview/family-yoga-1400.webp"),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/family-standing-upward-reach-mobile.webp",
        type: "image/webp",
        media: "(max-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/family-standing-upward-reach-desktop.webp",
        type: "image/webp",
        media: "(min-width: 769px)",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Family Yoga", "/online-family-yoga")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Private Online Family Yoga for 3 or 4",
            serviceType: "Private Shared Family Yoga Session",
            description: DESCRIPTION,
            areaServed: "Worldwide",
            url: "/online-family-yoga",
          })
        ),
      },
    ],
  }),
  component: FamilyYogaPage,
});

function FamilyYogaPage() {
  const [selectedFormat, setSelectedFormat] = useState<"family" | "parent_child">("family");
  const [selectedPax, setSelectedPax] = useState<number>(3);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  function handleSelectPlan(plan: string, pax?: number) {
    setSelectedPlan(plan);
    if (pax) setSelectedPax(pax);
    const el = document.getElementById("plan-session");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const planSelect = document.getElementById("shared-plan-select") as HTMLSelectElement | null;
      planSelect?.focus();
    }
  }

  const activeFamilyPlans = selectedPax === 4 ? FAMILY_4_PLANS : FAMILY_3_PLANS;

  return (
    <>
      {/* 1 — FIRST SCREEN: HERO */}
      <PageHero
        eyebrow="Household & Family Yoga · Live Online"
        title="Private Online Family Yoga for 3 or 4"
        sub="Practise live at home with three or four family members. Your teacher can adapt movement options to your household. Yog Jivan offers live private online yoga for three or four family members. A separate parent–child format is available with an adult participating."
        image768="/assets/preview/family-standing-upward-reach-mobile.webp"
        image1400="/assets/preview/family-standing-upward-reach-desktop.webp"
        imageWidth={1440}
        imageHeight={960}
        imageAspectRatio="3/2"
        imageAlt="Four household members standing on yoga mats reaching upward together during a private online family yoga class"
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          3 participants · US$44 total &nbsp;|&nbsp; 4 participants · US$52 total · 60 minutes live
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
          Every session is led by an experienced, certified Yog Jivan yoga teacher.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("plan-session");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cta-location="family_hero"
            className="btn-gold"
          >
            Choose your family size
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("family-plans");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cta-location="family_hero"
            className="btn-ghost-gold"
          >
            See plans and pricing
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("parent-child");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cta-location="family_hero"
            className="text-xs text-[color:var(--gold)] hover:underline inline-flex items-center gap-1 self-center"
          >
            See parent–child option &rarr;
          </button>
        </div>
      </PageHero>

      {/* 2 — SECOND SWIPE: ONE FAMILY SESSION, WITH OPTIONS FOR EACH PERSON */}
      <section className="section-pad border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              Shared Family Movement
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              One family session, with options for each person
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Your teacher guides the family together and offers simpler or more challenging options where appropriate. Tell us the group size, general age range and experience before booking so we can confirm a suitable format.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="glass-luxe flex flex-col justify-between rounded-2xl p-6 border border-white/10 text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                    Family of 3 (60 min)
                  </span>
                  <span className="rounded-full bg-[color:var(--gold)]/10 px-2.5 py-0.5 text-xs text-[color:var(--gold)] font-medium">
                    3 Participants
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl text-foreground font-semibold">Shared household practice for three</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Ideal for two parents and one child, or one parent and two children. Movement progressions, cooperative balance challenges, and mindful breathing together.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                    <span>One shared camera and room space</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                    <span>Adult participates throughout alongside children</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                data-cta="family-3-enquiry"
                onClick={() => {
                  setSelectedFormat("family");
                  setSelectedPax(3);
                  const el = document.getElementById("plan-session");
                  el?.scrollIntoView({ behavior: "smooth" });
                  const target = el?.querySelector<HTMLElement>("input, select, textarea, button") ?? el;
                  window.setTimeout(() => target?.focus({ preventScroll: true }), 350);
                }}
                className="mt-6 w-full btn-gold text-xs py-2.5"
              >
                Select 3 participants & enquire
              </button>
            </div>

            <div className="glass-luxe flex flex-col justify-between rounded-2xl p-6 border border-white/10 text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                    Family of 4 (60 min)
                  </span>
                  <span className="rounded-full bg-[color:var(--gold)]/10 px-2.5 py-0.5 text-xs text-[color:var(--gold)] font-medium">
                    4 Participants
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl text-foreground font-semibold">Full household practice for four</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Crafted for up to four family members in one household. Balanced pacing designed so adults get restorative benefits while children stay actively engaged.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                    <span>Covers whole household booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                    <span>Adapted for mixed ages with safety modifications</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                data-cta="family-4-enquiry"
                onClick={() => {
                  setSelectedFormat("family");
                  setSelectedPax(4);
                  const el = document.getElementById("plan-session");
                  el?.scrollIntoView({ behavior: "smooth" });
                  const target = el?.querySelector<HTMLElement>("input, select, textarea, button") ?? el;
                  window.setTimeout(() => target?.focus({ preventScroll: true }), 350);
                }}
                className="mt-6 w-full btn-gold text-xs py-2.5"
              >
                Select 4 participants & enquire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — WHAT HAPPENS IN A FAMILY SESSION */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                Session Structure
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                What happens in a family session?
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  We start with a quick camera and space check, move through a gentle warm-up and guided activities, then finish with slower movement or breathing.
                </p>
                <p>
                  Set up a mat or clear space for each person. Your teacher starts with an easy shared movement, explains options and gives cues while everyone practises. A participating adult helps set up the room and stays with the children throughout the class.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {FAMILY_OFFER.keyPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8 overflow-hidden">
              <div className="overflow-hidden rounded-xl border border-[color:var(--gold)]/20 shadow-md mb-6 aspect-[3/2] bg-muted/20">
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet="/assets/preview/family-seated-session-mobile.webp"
                    type="image/webp"
                    width={768}
                    height={512}
                  />
                  <source
                    media="(min-width: 769px)"
                    srcSet="/assets/preview/family-seated-session-desktop.webp"
                    type="image/webp"
                    width={1440}
                    height={960}
                  />
                  <img
                    src="/assets/preview/family-seated-session-desktop.webp"
                    alt="Four family members seated on mats facing a laptop during an online yoga setup"
                    width={1440}
                    height={960}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Room Framing for Up to Four</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                To keep all four participants in view, a wide camera angle and staggered floor layout are recommended. See our{" "}
                <Link to="/blog/$slug" params={{ slug: "online-yoga-camera-setup" }} className="text-[color:var(--gold)] hover:underline">
                  online yoga camera and space setup guide
                </Link>{" "}
                for full positioning instructions.
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Staggered mats:</strong> Place two mats in front and two slightly behind and offset, so no one blocks another from the camera view.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Camera distance:</strong> Elevate the laptop or tablet to table height (about 0.7m) and step 3 to 3.5m back.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Audio:</strong> Test speakers at comfortable volume so movement cues can be heard clearly across the room.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — PARENT-CHILD YOGA AT HOME */}
      <section id="parent-child" className="section-pad border-b border-border/40 bg-card/30">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              1 Adult + 1 Child
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Parent–child yoga at home
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              For parent–child yoga, a parent or caregiver joins the session. Share the general age range and room setup so we can plan suitable activities.
            </p>
            <p className="mt-2 text-xs text-foreground/75 font-medium">
              We collect only adult contact details. Age range is discussed during enquiry; no child-identifying information, photos or health records are requested.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARENT_CHILD_SECTION.keyPoints.map((point, idx) => (
              <div key={idx} className="glass-luxe rounded-xl p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground/90">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <picture className="mx-auto mb-3 block max-w-xl overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 shadow-xl aspect-[3/2] bg-muted/20">
              <source
                media="(max-width: 768px)"
                srcSet="/assets/preview/family-parent-child-tablet-practice-mobile.webp"
                type="image/webp"
                width={768}
                height={512}
              />
              <source
                media="(min-width: 769px)"
                srcSet="/assets/preview/family-parent-child-tablet-practice-desktop.webp"
                type="image/webp"
                width={1440}
                height={960}
              />
              <img
                src="/assets/preview/family-parent-child-tablet-practice-desktop.webp"
                alt="A parent and child practising yoga together on mats guided by a tablet in an online session"
                width={1440}
                height={960}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </picture>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                data-cta="parent-child-enquiry"
                onClick={() => {
                  setSelectedFormat("parent_child");
                  setSelectedPax(2);
                  const el = document.getElementById("plan-session");
                  el?.scrollIntoView({ behavior: "smooth" });
                  const target = el?.querySelector<HTMLElement>("input, select, textarea, button") ?? el;
                  window.setTimeout(() => target?.focus({ preventScroll: true }), 350);
                }}
                className="btn-gold"
              >
                Enquire for 1 Adult + 1 Child
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Organising for a school? See our{" "}
              <Link to="/school-yoga" className="text-[color:var(--gold)] hover:underline">
                School Yoga programme
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 5 — COMPARE ONLINE FAMILY YOGA PLANS */}
      <section id="family-plans" className="section-pad-sm relative isolate scroll-mt-24">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Session plans & pricing</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}>
            Compare online family yoga plans
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/80 md:text-base">
            Choose your household size to see the total for everyone in the session.
            Each plan shows the full package total and the effective rate per session for your whole household.
          </p>
          <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
            Every session is led by an experienced, certified Yog Jivan yoga teacher.
          </p>

          {/* HOUSEHOLD SIZE SELECTOR */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select household size:</span>
            <button
              type="button"
              onClick={() => setSelectedPax(3)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                selectedPax === 3
                  ? "bg-[color:var(--gold)] text-black shadow-sm"
                  : "border border-white/20 bg-white/5 text-foreground hover:bg-white/10"
              }`}
            >
              3 Participants · US$44 / session
            </button>
            <button
              type="button"
              onClick={() => setSelectedPax(4)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                selectedPax === 4
                  ? "bg-[color:var(--gold)] text-black shadow-sm"
                  : "border border-white/20 bg-white/5 text-foreground hover:bg-white/10"
              }`}
            >
              4 Participants · US$52 / session
            </button>
          </div>

          {/* SINGLE SESSION CARD */}
          <div className="mt-6 rounded-2xl border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_8%,var(--onyx))] p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-block rounded-full bg-[color:var(--gold)]/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                  Single Session Rate · {selectedPax} Participants
                </div>
                <h3 className="mt-2 font-display text-xl text-foreground">
                  Single session for {selectedPax} · US${selectedPax === 4 ? "52" : "44"} total · 60 minutes
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Single session rate for {selectedPax} family members from one household (both reference rates: 3 participants = US$44 total, 4 participants = US$52 total). Live 60-minute video session on a shared screen with a dedicated teacher.
                </p>
              </div>
              <button
                type="button"
                data-plan-cta={`family-${selectedPax}-plan-single`}
                onClick={() => handleSelectPlan("Single Session", selectedPax)}
                className="btn-gold text-xs shrink-0 self-start sm:self-center"
              >
                Enquire for {selectedPax} &rarr;
              </button>
            </div>
          </div>

          {/* MULTI-SESSION PACK CARDS */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {activeFamilyPlans.map((plan) => (
              <div
                key={plan.id}
                id={plan.id}
                className={`flex flex-col justify-between rounded-[1.75rem] p-6 md:p-8 transition-transform hover:-translate-y-1 ${
                  plan.featured
                    ? "glass-luxe border-2 border-[color:var(--gold)]/60 bg-[color-mix(in_oklab,var(--gold)_8%,var(--onyx))] shadow-[var(--shadow-gold)]"
                    : "glass-soft border border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">
                      {plan.badge}
                    </span>
                    <span className="text-xs text-foreground/70">{plan.duration}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{plan.title}</h3>
                  <div className="mt-1 font-display text-lg text-[color:var(--gold)]">{plan.sessionLabel}</div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{plan.subtitle}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/8 pt-6">
                    {plan.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-white/8 pt-6">
                  <div className="text-sm font-semibold text-foreground">{plan.pricing}</div>
                  {plan.effective && <div className="mt-1 text-xs font-medium text-[color:var(--gold)]">{plan.effective}</div>}
                  {plan.comparison && <p className="mt-1 text-[0.7rem] text-muted-foreground">{plan.comparison}</p>}
                  {plan.discountNote && <p className="mt-1 text-[0.7rem] font-medium text-[color:var(--gold)]">{plan.discountNote}</p>}
                  <p className="mt-2 text-xs text-foreground/65">{plan.note}</p>
                  <button
                    type="button"
                    data-plan-cta={plan.id}
                    onClick={() => handleSelectPlan(plan.planValue, selectedPax)}
                    className={`mt-5 w-full justify-center min-h-[44px] ${
                      plan.featured ? "btn-gold" : "btn-ghost-gold"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CRAWLABLE GROUP SIZE COMPARISON */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">
              Family household plan overview · 3 vs 4 participants
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              All prices cover the entire household on a shared camera feed. Standalone single sessions or multi-session plans:
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold text-foreground text-sm">3 Participants (Single: US$44 total)</p>
                <ul className="mt-2 space-y-1.5 text-foreground/80">
                  <li className="flex justify-between">
                    <span>6-session plan:</span>
                    <strong className="text-foreground">US$228 total</strong>
                  </li>
                  <li className="text-[0.7rem] text-muted-foreground">US$38.00/session · Save US$36 vs singles</li>
                  <li className="flex justify-between pt-1 border-t border-white/5">
                    <span>12-session plan (Recommended):</span>
                    <strong className="text-foreground">US$429 total</strong>
                  </li>
                  <li className="text-[0.7rem] text-muted-foreground">US$35.75/session · Save US$99 vs singles</li>
                  <li className="flex justify-between pt-1 border-t border-white/5">
                    <span>24-session plan (Lowest rate):</span>
                    <strong className="text-foreground">US$819 total</strong>
                  </li>
                  <li className="text-[0.7rem] text-muted-foreground">US$34.13/session · Save US$237 vs singles</li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold text-foreground text-sm">4 Participants (Single: US$52 total)</p>
                <ul className="mt-2 space-y-1.5 text-foreground/80">
                  <li className="flex justify-between">
                    <span>6-session plan:</span>
                    <strong className="text-foreground">US$276 total</strong>
                  </li>
                  <li className="text-[0.7rem] text-muted-foreground">US$46.00/session · Save US$36 vs singles</li>
                  <li className="flex justify-between pt-1 border-t border-white/5">
                    <span>12-session plan (Recommended):</span>
                    <strong className="text-foreground">US$519 total</strong>
                  </li>
                  <li className="text-[0.7rem] text-muted-foreground">US$43.25/session · Save US$105 vs singles</li>
                  <li className="flex justify-between pt-1 border-t border-white/5">
                    <span>24-session plan (Lowest rate):</span>
                    <strong className="text-foreground">US$999 total</strong>
                  </li>
                  <li className="text-[0.7rem] text-muted-foreground">US$41.63/session · Save US$249 vs singles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PRACTISE ALONE OR TOGETHER STRIP */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Practise alone or together</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              Solo from US$25 · Two adults US$36 total · Family from US$44 total
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Standard single session reference rates. Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground text-center">
            <span>Two adults only? For partner or friend sessions, see </span>
            <Link to="/online-couples-yoga" className="text-[color:var(--gold)] hover:underline font-medium">
              Online Couples Yoga
            </Link>
            <span>.</span>
          </div>
        </div>
      </section>

      {/* 6 — QUESTIONS ABOUT ONLINE FAMILY YOGA */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Questions about online family yoga
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Frequently asked questions about preparing for family and parent–child yoga at home.
            </p>
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — PLAN A FAMILY SESSION */}
      <section id="plan-session" className="section-pad bg-muted/10">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Plan a family session
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share your group size, time zone and preferred times. We’ll confirm teacher availability and booking details.
              </p>
            </div>

            <div id="shared-enquiry-form">
              <SharedYogaEnquiryForm
                format={selectedFormat}
                participants={selectedPax}
                plan={selectedPlan}
                onPlanChange={setSelectedPlan}
                onFormatChange={(fmt) => {
                  setSelectedFormat(fmt as "family" | "parent_child");
                  if (fmt === "family" && selectedPax < 3) setSelectedPax(3);
                }}
                onParticipantsChange={(pax) => setSelectedPax(pax)}
                heading="Enquire About Live Family Yoga"
                subheading="Select your family size (3, 4, or Parent–Child) and preferred times. We confirm availability and discuss booking details directly."
              />
            </div>

            {/* Cross-linking to Couples */}
            <div className="mt-12 border-t border-border/40 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Two adults only? See{" "}
                <Link to="/online-couples-yoga" className="text-[color:var(--gold)] font-medium hover:underline">
                  online couples yoga
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
