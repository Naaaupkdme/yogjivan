import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { FAMILY_OFFER, PARENT_CHILD_SECTION } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Private Online Family Yoga for 3 or 4 | Yog Jivan";
const DESCRIPTION =
  "Take a live private yoga session with three or four family members. Explore age-appropriate options and parent–child yoga with a participating adult.";
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
    q: "What if three or four family members want to join?",
    a: "Choose three or four participants in the enquiry. We’ll confirm availability and the total for your household.",
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
        href: "/assets/preview/family-yoga-768.webp",
        type: "image/webp",
        media: "(max-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/family-yoga-1400.webp",
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

  return (
    <>
      {/* 1 — FIRST SCREEN: HERO */}
      <PageHero
        eyebrow="Household & Family Yoga"
        title="Private Online Family Yoga for 3 or 4"
        sub="Make time to move together at home. An experienced, certified Yog Jivan yoga teacher guides your family live and adapts the session to the group."
        image768="/assets/preview/family-yoga-768.webp"
        image1400="/assets/preview/family-yoga-1400.webp"
        imageWidth={1400}
        imageHeight={1050}
        imageAspectRatio="4/3"
        imageAlt="Four household members practicing yoga together at home on mats with an adult caregiver"
        imageCaption="AI-generated preview illustration · Does not depict Yog Jivan students or teachers"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          3 participants · US$55 total &nbsp;|&nbsp; 4 participants · US$65 total
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
            className="btn-gold"
          >
            Choose your family size
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("parent-child");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost-gold"
          >
            See the parent–child option
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

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
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
              A parent or caregiver takes part alongside the child. The teacher adjusts activities to the child’s age range and the space available.
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
            <picture className="mx-auto mb-3 block max-w-xl overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 shadow-xl aspect-[16/9]">
              <source
                media="(max-width: 768px)"
                srcSet="/assets/preview/parent-child-yoga-768.webp"
                type="image/webp"
                width={768}
                height={432}
              />
              <source
                media="(min-width: 769px)"
                srcSet="/assets/preview/parent-child-yoga-1400.webp"
                type="image/webp"
                width={1400}
                height={788}
              />
              <img
                src="/assets/preview/parent-child-yoga-768.webp"
                alt="An adult caregiver and child practicing yoga together at home"
                width={768}
                height={432}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </picture>
            <p className="mx-auto mb-6 max-w-md text-xs text-muted-foreground/80">
              AI-generated preview illustration · Does not depict Yog Jivan students or teachers
            </p>
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

      {/* 5 — PRICE FOR YOUR HOUSEHOLD */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/30 bg-[color-mix(in_oklab,var(--gold)_6%,var(--onyx))] p-6 md:p-8">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Household pricing</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Price for your household
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              Your price covers the whole household booking. Three participants are <strong>US$55 total</strong>; a fourth family member adds US$10 to make <strong>US$65 total</strong>.
              The amount you see is the total for the entire group.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                  Family of 3 (60 min)
                </span>
                <div className="mt-2 font-display text-2xl font-bold text-foreground">US$55 total</div>
                <p className="mt-1 text-xs text-muted-foreground">Single session rate for 3 participants.</p>
                <div className="mt-4 rounded-lg border border-[color:var(--gold)]/30 bg-black/30 p-3">
                  <p className="text-xs font-medium text-foreground">
                    <strong>4-session package:</strong> Book 4 sessions for US$220 total and receive 1 additional session for the same family (5 sessions in total, US$44 effective per session).
                  </p>
                  <p className="mt-1 text-[0.68rem] text-muted-foreground">Same household, subject to teacher schedule confirmation.</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                  Family of 4 (60 min)
                </span>
                <div className="mt-2 font-display text-2xl font-bold text-foreground">US$65 total</div>
                <p className="mt-1 text-xs text-muted-foreground">Single session rate for 4 participants.</p>
                <div className="mt-4 rounded-lg border border-[color:var(--gold)]/30 bg-black/30 p-3">
                  <p className="text-xs font-medium text-foreground">
                    <strong>4-session package:</strong> 4 sessions for US$240 total (US$60 per session total).
                  </p>
                  <p className="mt-1 text-[0.68rem] text-muted-foreground">Covers up to 4 participants from one household.</p>
                </div>
              </div>
            </div>
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
