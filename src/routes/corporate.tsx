import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CorporateEnquiryForm } from "@/components/site/CorporateEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_CORPORATE } from "@/lib/locale-routes";
import { waHref } from "@/lib/wa";
import { Briefcase, Building2, Clock, CheckCircle2, ShieldCheck, Users, Play, Sparkles } from "lucide-react";

const TITLE = "Corporate Yoga in Vietnam | Yog Jivan";
const DESCRIPTION =
  "On-site chair yoga and guided movement for teams in Vietnam. Based in the Hải Dương area. Ask Yog Jivan about an office pilot or recurring classes.";
const CANONICAL = "https://www.yogjivan.com/corporate";

const FAQS = [
  {
    q: "Do employees need mats?",
    a: "Chair sessions use stable office chairs and clear space. Mat requirements are agreed in advance if your team chooses the 45-minute mat format.",
  },
  {
    q: "Can we book a one-off pilot?",
    a: "Yes. Tell us the site, expected headcount and preferred time so we can arrange a complimentary 30-minute trial session for your team.",
  },
  {
    q: "How is pricing calculated?",
    a: "We quote for your location, session length, headcount and series size (single pilot or four-session series).",
  },
  {
    q: "What do we need to host a chair yoga demo?",
    a: "Provide stable chairs, clear space, an estimated headcount and preferred time. The complimentary chair demo takes 30 minutes.",
  },
  {
    q: "Can you come to our office outside Hải Dương?",
    a: "Send the venue location and headcount so our team can confirm on-site availability.",
  },
];

const DEMO_TIMELINE = [
  { time: "4 min", step: "Settle & Check Setup", desc: "Welcome, room setup verification, and quick comfort check." },
  { time: "6 min", step: "Warm-Up", desc: "Gentle joint mobility for fingers, wrists, neck, and shoulders." },
  { time: "14 min", step: "Guided Movement", desc: "Seated stretches, thoracic mobility, and gentle back resets on stable chairs." },
  { time: "4 min", step: "Breathing & Relaxation", desc: "Mindful diaphragmatic breathing to steady focus and ease mental fatigue." },
  { time: "2 min", step: "Feedback & Close", desc: "Quick participant feedback on favourite desk stretches to keep." },
];

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      ...hreflangLinks(PAIR_CORPORATE),
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: "/assets/preview/corporate-hero-768.webp",
        imageSrcSet: "/assets/preview/corporate-hero-768.webp 768w, /assets/preview/corporate-hero-1280.webp 1280w",
        imageSizes: "(max-width: 768px) 100vw, 1280px",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Corporate Yoga", "/corporate")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Corporate Yoga in Vietnam",
            serviceType: "Corporate Wellness Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/corporate",
          })
        ),
      },
    ],
  }),
  component: CorporatePage,
});

function CorporatePage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="Corporate Wellness · Hai Duong & Vietnam"
        title="Corporate yoga at your workplace"
        sub="Give your team a guided movement break with gentle chair exercises and breathing they can use again at their desks."
        image768="/assets/preview/corporate-hero-768.webp"
        image1400="/assets/preview/corporate-hero-1280.webp"
        imageWidth={1280}
        imageHeight={720}
        imageAlt="Team practicing seated chair yoga in an office setting"
        imageCaption="AI-generated preview illustration · Does not depict Yog Jivan students or teachers"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Based in the Hải Dương area. Share your location and we’ll confirm whether we can visit your workplace or school.
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
          Every session is led by an experienced, certified Yog Jivan yoga teacher.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("corporate-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Request a complimentary 30-minute demo
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("programme-overview");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost-gold"
          >
            Watch the programme overview
          </button>
        </div>
      </PageHero>

      {/* 2 — BENEFITS */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Workplace Well-being</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Gentle movement and breathing designed for the workday
              </h2>
              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Move after long periods of sitting</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Gentle movement for the neck, shoulders and back to relieve the physical strain and stiffness caused by extended desk hours.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Pause for slow breathing between tasks</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Guided breathing pauses to reset mental clarity, reduce stress, and steady the nervous system during demanding workdays.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Take away simple moves for your desk</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Practical, accessible postures that employees can easily practice independently during the workday without leaving their desks.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <picture>
                <source srcSet="/assets/preview/corporate-benefits-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/corporate-benefits-768.webp"
                  alt="Office workers doing gentle chair stretches"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </picture>
              <div className="p-3 bg-black/40 text-[0.7rem] text-muted-foreground text-center">
                AI-generated preview illustration · Does not depict Yog Jivan students or teachers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — PROGRAMME OVERVIEW & OPTIONS */}
      <section id="programme-overview" className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Programme Overview<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              See how corporate yoga runs at your office
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A structured overview designed for HR managers and team leaders.
            </p>
          </div>

          {/* Overview Card */}
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-black/40">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <picture>
                <source srcSet="/assets/preview/corporate-demo-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/corporate-demo-768.webp"
                  alt="Corporate yoga overview preview poster"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[0.7rem] font-medium text-[color:var(--gold)] border border-[color:var(--gold)]/30">
                    Programme Overview
                  </span>
                </div>
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--gold)]/20 border border-[color:var(--gold)]/40 text-[color:var(--gold)] px-4 py-2 text-xs font-semibold">
                    <Sparkles className="h-4 w-4" />
                    Programme Overview
                  </div>
                  <p className="mt-2 text-xs text-white/80 max-w-md">
                    A structured introduction designed for HR managers and team leaders: gentle movement, chair format, workday fit, and complimentary first session.
                  </p>
                </div>
              </div>
            </div>

            {/* Localized HTML Summary */}
            <div className="border-t border-white/10 bg-card/40 p-5 text-xs text-muted-foreground space-y-2">
              <div className="font-semibold text-foreground text-sm">Programme Overview Summary:</div>
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Chair yoga at work:</strong> Movement relief for stiff neck and shoulders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Gentle moves & breathing:</strong> Quick resets staff can repeat at their desk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>30-minute chair format:</strong> Settle, warm-up, chair poses, and relaxation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Fits the workday:</strong> HR selects time and room; voluntary participation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Certified teachers:</strong> ~15 workplaces supported in Vietnam.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Complimentary first session:</strong> Request your 30-minute workplace demo.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 30-min Chair vs 45-min Mat Options */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-[color:var(--gold)]/40 relative">
              <div className="absolute top-4 right-4 rounded-full bg-[color:var(--gold)]/15 border border-[color:var(--gold)]/30 px-3 py-1 text-[0.68rem] font-bold text-[color:var(--gold)] uppercase tracking-wider">
                Complimentary First Demo Offer
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">30-Minute Chair Yoga</h3>
                  <p className="text-xs text-muted-foreground">Lunch break or shift transition</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Designed for staff seated at desks or workstations. Gentle stretches for the neck, shoulders, spine and wrists. No change of clothes or special yoga mats required.
              </p>
              <div className="mt-4 rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 p-3 text-xs text-foreground/90">
                <strong>Complimentary Demo:</strong> We offer a free 30-minute chair yoga pilot session so HR and staff can experience the format firsthand.
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Uses standard office chairs and clear floor area</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Protects lunch hour or shift rotation windows</span>
                </li>
              </ul>
            </div>

            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">45-Minute Mat Yoga</h3>
                  <p className="text-xs text-muted-foreground">Dedicated space or meeting hall</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                For teams with dedicated multipurpose rooms, fitness spaces or cleared conference rooms. Full-body mobility, restorative alignment, and deep stress release.
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-muted-foreground">
                <strong>Follow-Up Series:</strong> Discuss a 4-session monthly package or weekly recurring classes with custom VND quotation.
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Requires personal yoga mats and comfortable clothing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Comprehensive posture progression and guided relaxation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — DEMO TIMELINE (MOBILE-OPTIMIZED) */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Sample Schedule</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            What happens during a 30-minute chair yoga demo
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DEMO_TIMELINE.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-[color:var(--gold)]">{item.time}</span>
                  <span className="text-[0.68rem] text-muted-foreground uppercase tracking-wider">Step {idx + 1}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{item.step}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — HR SETUP & EXPERIENCE */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />HR Logistics</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Simple coordination for workplace organizers
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  The host organisation provides the room space, estimated headcount, and protected time window. Participation is always voluntary, and every posture is adapted for comfort.
                </p>
                <p>
                  Yog Jivan coordinates workplace yoga sessions for organizations in the Hải Dương area and across Vietnam. Following the demo, an optional four-session series is quoted in transparent VND according to headcount and location.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Every session is led by an experienced, certified Yog Jivan yoga teacher.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Organizer Checklist</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Room layout:</strong> Clear open room or conference hall with stable chairs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Timing window:</strong> A protected 30-min lunch or shift-change slot.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Voluntary participation:</strong> Staff join voluntarily; gentle options for all levels.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Language support:</strong> Instruction in English or Vietnamese per team choice.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — ENQUIRY FORM */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <CorporateEnquiryForm
              lang="EN"
              heading="Request a Complimentary 30-Minute Office Demo"
              subheading="Share your organization name, workplace site, headcount, and two preferred times. We will confirm room suitability and pilot schedule."
            />
          </div>
        </div>
      </section>

      {/* 7 — FAQS */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Common questions about corporate wellness yoga at your workplace.
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

            <div className="mt-10 text-center text-xs text-muted-foreground">
              <span>Looking for individual training? Visit our </span>
              <Link to="/private-online-yoga" className="text-[color:var(--gold)] hover:underline">
                Private Online Yoga Classes
              </Link>
              <span> or contact our local studio team via </span>
              <Link to="/contact" className="text-[color:var(--gold)] hover:underline">
                Contact & Studio Details
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
