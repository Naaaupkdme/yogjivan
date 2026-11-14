import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CorporateEnquiryForm } from "@/components/site/CorporateEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_CORPORATE } from "@/lib/locale-routes";
import { Clock, CheckCircle2, Users, FileDown, Sparkles, ArrowDown } from "lucide-react";

const TITLE = "Corporate Yoga in Vietnam | Yog Jivan";
const DESCRIPTION =
  "On-site chair yoga and guided movement for teams in Vietnam. Based in the Hải Dương area, Hải Phòng. Request a complimentary 30-minute office demo or download our proposal.";
const CANONICAL = "https://www.yogjivan.com/corporate";
const PROPOSAL_PDF_URL = "/assets/proposals/yog-jivan-corporate-yoga-proposal.pdf";

const FAQS = [
  {
    q: "Do employees need mats or sportswear for the chair demo?",
    a: "No. The 30-minute chair session uses stable office chairs and clear floor space. Staff can participate comfortably in normal work clothing without needing to change.",
  },
  {
    q: "How does the complimentary 30-minute demo work?",
    a: "We offer one free 30-minute chair yoga pilot session so HR managers and team members can experience the format firsthand with no ongoing commitment.",
  },
  {
    q: "Can you visit workplaces outside the Hải Dương area?",
    a: "Our teaching base is in the Hải Dương area of Hải Phòng. We travel to nearby industrial parks, Hanoi, and Northern Vietnam by enquiry. Share your venue location and we will confirm availability.",
  },
  {
    q: "What do we need to host a chair yoga session?",
    a: "Provide a clear meeting room or open hall with stable chairs (without wheels or with locked castors) and enough space for staff to move their arms freely.",
  },
  {
    q: "What happens after the initial demo?",
    a: "If your team wishes to continue, we review feedback together and suggest a tailored 4-session package or recurring schedule with transparent VND quotation based on location and headcount.",
  },
];

const DEMO_TIMELINE = [
  { time: "4 min", step: "Setup & Settle", desc: "Welcome, room setup verification, and quick comfort check." },
  { time: "6 min", step: "Warm-Up", desc: "Gentle joint mobility for fingers, wrists, neck, and shoulders." },
  { time: "14 min", step: "Guided Movement", desc: "Guided seated or standing movement to release desk stiffness." },
  { time: "4 min", step: "Breathing & Relaxation", desc: "Mindful diaphragmatic breathing to steady focus and ease mental fatigue." },
  { time: "2 min", step: "Closing & Feedback", desc: "Closing stretch and participant feedback on favorite moves to repeat at work." },
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
            areaServed: "Hai Duong, Hai Phong, Vietnam",
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
        sub="Give your team a guided movement break with gentle chair exercises and breathing they can repeat at their desks."
        image768="/assets/preview/corporate-hero-768.webp"
        image1400="/assets/preview/corporate-hero-1280.webp"
        imageWidth={1280}
        imageHeight={720}
        imageAlt="Team practicing seated chair yoga in an office setting"
        imageCaption="AI-generated preview illustration · Does not depict Yog Jivan students or teachers"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Based in the Hải Dương area, Hải Phòng. Share your workplace location and we’ll confirm on-site availability.
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
          <a
            href={PROPOSAL_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="yog-jivan-corporate-yoga-proposal.pdf"
            className="btn-ghost-gold inline-flex items-center gap-2"
          >
            <FileDown className="h-4 w-4 text-[color:var(--gold)]" />
            Download the corporate yoga proposal (PDF)
          </a>
        </div>
      </PageHero>

      {/* 2 — WHAT EMPLOYEES TAKE AWAY */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Employee Wellbeing</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                What employees take away
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Move gently after long periods of sitting. Practise slow breathing between tasks. Learn a few desk-friendly moves to repeat later.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Move gently after long periods of sitting</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Simple joint rotations and seated stretches relieve neck, shoulder, and spinal stiffness accumulated from desk work.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Practise slow breathing between tasks</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Structured breathing pauses help calm the nervous system, reset focus, and restore energy during busy workdays.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Learn a few desk-friendly moves to repeat later</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Practical, accessible micro-movements that staff can repeat independently at their workstation whenever tension builds up.
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

      {/* 3 — CHOOSE CHAIR OR MAT YOGA */}
      <section className="section-pad-sm border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Session Formats<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Choose chair or mat yoga
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A 30-minute chair session fits a lunch break or shift transition. Use stable chairs with room to move. A 45-minute mat session is available where the room has enough floor space.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-[color:var(--gold)]/40 relative">
              <div className="absolute top-4 right-4 rounded-full bg-[color:var(--gold)]/15 border border-[color:var(--gold)]/30 px-3 py-1 text-[0.68rem] font-bold text-[color:var(--gold)] uppercase tracking-wider">
                Complimentary Demo Offer
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

      {/* 4 — INSIDE THE COMPLIMENTARY CHAIR DEMO */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Sample Schedule<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Inside the complimentary chair demo
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A structured 30-minute timeline designed to fit your workday schedule.
            </p>
          </div>

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

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Total session duration: <strong className="text-foreground">30 minutes</strong> · Guided by an experienced, certified Yog Jivan teacher
          </div>
        </div>
      </section>

      {/* 5 — WHAT HR AND YOG JIVAN ORGANISE */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Coordination & Setup</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                What HR and Yog Jivan organise
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Your organiser shares the location, headcount, room and two suitable times. Yog Jivan confirms the teaching language and offers movement options. Participation is voluntary.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <span><strong>Workplace location:</strong> Based in the Hải Dương area, Hải Phòng. Travel confirmed after enquiry.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <span><strong>Room setup:</strong> A clear room with stable chairs and room to move.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <span><strong>Teaching language:</strong> English or Vietnamese per team choice.</span>
                </div>
              </div>
              <p className="mt-6 text-xs font-semibold text-[color:var(--gold)]">
                Every session is led by an experienced, certified Yog Jivan yoga teacher.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Organiser Checklist</h3>
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
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Detailed 7-step guide:</span>
                <Link to="/blog/$slug" params={{ slug: "checklist-to-chuc-buoi-yoga-tai-van-phong" }} className="text-xs text-[color:var(--gold)] hover:underline">
                  Read office checklist &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — AFTER THE DEMO & PROPOSAL / ENQUIRY */}
      <section className="section-pad bg-muted/10 border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Next Steps<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              After the demo
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Review participation and room setup with us. A suggested four-session series covers chair basics, shoulders and back, hips and legs, then a short routine to repeat at work. We quote in VND based on location, headcount and equipment.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Supported across ~15 workplaces in Vietnam · Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
              <a
                href={PROPOSAL_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="yog-jivan-corporate-yoga-proposal.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-2.5 text-xs font-semibold text-[color:var(--gold)] hover:bg-[color:var(--gold)]/20"
              >
                <FileDown className="h-4 w-4" />
                Download the corporate yoga proposal (PDF)
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <CorporateEnquiryForm
              lang="EN"
              heading="Request a Complimentary 30-Minute Office Demo"
              subheading="Share your organization name, workplace location (city and venue), headcount, and two preferred times. We will confirm room suitability and pilot schedule."
            />
          </div>
        </div>
      </section>

      {/* FAQS */}
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
