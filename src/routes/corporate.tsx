import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CorporateEnquiryForm } from "@/components/site/CorporateEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_CORPORATE } from "@/lib/locale-routes";
import { waHref } from "@/lib/wa";
import { Briefcase, Building2, Clock, CheckCircle2, ShieldCheck, Users } from "lucide-react";

const TITLE = "Corporate Yoga in Hai Duong | Office Wellness | Yog Jivan";
const DESCRIPTION =
  "On-site chair yoga and guided movement for teams in the Hai Duong area. Ask Yog Jivan about an office pilot or recurring classes.";
const CANONICAL = "https://www.yogjivan.com/corporate";

const FAQS = [
  {
    q: "Do employees need mats?",
    a: "Chair sessions use stable office chairs and clear space. Mat requirements are agreed in advance if your team chooses the 45-minute mat format.",
  },
  {
    q: "Can we book a one-off pilot?",
    a: "Yes. Tell us the site, expected headcount and preferred time so we can arrange a trial session for your team.",
  },
  {
    q: "How is pricing calculated?",
    a: "We quote for your location, session length, headcount and series size (single pilot or four-session series).",
  },
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
            name: "Corporate Yoga in Hai Duong",
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
        eyebrow="Corporate Wellness · Hai Duong"
        title="Corporate Yoga in Hai Duong —"
        accent="guided movement at work."
        sub="Give your team a guided movement break at work. An experienced, certified Yog Jivan yoga teacher leads chair-friendly or mat-based sessions at your workplace, with the format planned around your space and schedule."
        contrastVeil
      >
        <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
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
            Request an office pilot
          </button>
          <a
            href={waHref("corporate")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[color:var(--gold)] hover:underline"
          >
            Ask a question on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* 2 — FORMATS */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Session Formats</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            Workplace movement tailored to your schedule
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-white/10">
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
                Designed for staff seated at desks or workstations. Gentle stretches for the neck, shoulders, spine and wrists that require no change of clothes or special mats.
              </p>
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
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">45-Minute Mat Session</h3>
                  <p className="text-xs text-muted-foreground">For teams with dedicated space</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                For offices, meeting rooms or multipurpose spaces where mats can be rolled out. Focuses on full-body posture alignment, core activation, and breath regulation.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Start with one pilot or discuss a 4-session series</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Paced around team energy and workspace layout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — VALUE & LOGISTICS */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Practical Organization</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Value and logistics for organizers
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  The session gives staff time to move, breathe and reset together. We confirm participant count, room layout, language (English, Vietnamese or Hindi) and equipment directly with your organiser.
                </p>
                <p>
                  We keep planning straightforward: venue checklist, staff opt-in, optional feedback, and transparent pricing by quotation. We avoid clinical claims or productivity guarantees.
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
                  <span><strong>Timing window:</strong> A protected 30-min or 45-min slot that does not cut into urgent shifts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Voluntary participation:</strong> Staff join voluntarily; all movements include gentle options.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Language support:</strong> Instruction available in English or Vietnamese according to team preference.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — ENQUIRY FORM */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <CorporateEnquiryForm
              lang="EN"
              heading="Request an Office Yoga Pilot in Hai Duong"
              subheading="Share your organization name, site, and headcount. We will confirm room layout and propose pilot scheduling."
            />
          </div>
        </div>
      </section>

      {/* 5 — FAQS */}
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
