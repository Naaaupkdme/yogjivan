import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SchoolYogaEnquiryForm } from "@/components/site/SchoolYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_KIDS } from "@/lib/locale-routes";
import { waHref } from "@/lib/wa";
import { CheckCircle2, Clock, GraduationCap, Heart, ShieldCheck, Sparkles } from "lucide-react";

const TITLE = "Kids Yoga for Schools in Hai Duong | Yog Jivan";
const DESCRIPTION =
  "Play-based 35–40 minute yoga sessions for schools and children’s groups in the Hai Duong area. Ask about a teacher-led pilot.";
const CANONICAL = "https://www.yogjivan.com/kids-yoga-hai-duong";

const FAQS = [
  {
    q: "How long is a class?",
    a: "Typically 35–40 minutes, designed around children's natural attention span and physical energy.",
  },
  {
    q: "Can school staff stay?",
    a: "School staff remain present throughout the session to supervise, support room safety, and help children who wish to sit out.",
  },
  {
    q: "How many children can join?",
    a: "We agree the participant limit directly with the school based on age group, room size, and available staff supervision.",
  },
  {
    q: "Is there an option for a family at home?",
    a: "Yes. For household practice with parents, see our private Family Yoga sessions.",
  },
];

const CLASS_STRUCTURE = [
  { time: "4 min", step: "Welcome & Grounding", desc: "Setting up space, breathing check-in, and friendly introduction." },
  { time: "7 min", step: "Warm-Up Game", desc: "Gentle joint mobility and playful animal movements to warm the body." },
  { time: "15 min", step: "Story-Led Movement", desc: "Yoga postures woven naturally through engaging story themes and character adventures." },
  { time: "7 min", step: "Balance & Cooperation", desc: "Simple balance exercises or partner/group games encouraging coordination and taking turns." },
  { time: "5 min", step: "Quiet Close", desc: "Lying down, mindful breathing, and a calm, quiet transition before returning to class." },
];

export const Route = createFileRoute("/kids-yoga-hai-duong")({
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
      ...hreflangLinks(PAIR_KIDS),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Kids Yoga for Schools", "/kids-yoga-hai-duong")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Kids Yoga for Schools in Hai Duong",
            serviceType: "School Yoga Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/kids-yoga-hai-duong",
          })
        ),
      },
    ],
  }),
  component: KidsYogaPage,
});

function KidsYogaPage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="School Wellness · Hai Duong"
        title="Kids Yoga for Schools in Hai Duong —"
        accent="playful, structured movement."
        sub="A 35–40 minute class where children explore movement, balance and simple breathing through stories and games. An experienced, certified Yog Jivan yoga teacher leads the class and plans age-appropriate activities with your school."
        contrastVeil
      >
        <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
          Every session is led by an experienced, certified Yog Jivan yoga teacher.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("school-yoga-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Ask about a school pilot
          </button>
          <a
            href={waHref("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[color:var(--gold)] hover:underline"
          >
            Ask questions on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* 2 — WHAT A 38-MINUTE CLASS LOOKS LIKE */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Session Flow</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            What a 38-minute class looks like
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Structured for engagement, safety and balance. School staff supervise, children can sit out whenever they feel like taking a break, and our teacher approves age-appropriate movements and group caps.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CLASS_STRUCTURE.map((step, idx) => (
              <div key={step.step} className="glass-luxe rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-[color:var(--gold)]/15 px-2.5 py-0.5 text-[0.65rem] font-bold text-[color:var(--gold)]">
                    Step {idx + 1} · {step.time}
                  </span>
                  <h3 className="mt-3 font-display text-lg text-foreground">{step.step}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — HOW WE WORK WITH YOUR SCHOOL */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />School Collaboration</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                How we work with your school
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  We coordinate with your staff to confirm age bands, class size, venue safety, and accessibility. We deliver one introductory pilot and discuss a four-session series only after staff feedback.
                </p>
                <p>
                  Activities give children opportunities to practise balance, coordination, spatial awareness, and taking turns. We present practice as healthy physical exploration, avoiding clinical or guaranteed academic claims.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Every session is led by an experienced, certified Yog Jivan yoga teacher.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">School Safety & Supervision Standards</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Staff supervision:</strong> School teachers or coordinators remain present throughout each session.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Opt-out freedom:</strong> Children are welcome to rest or sit out whenever they choose.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Age-appropriate groups:</strong> Classes are grouped by developmental stage (Kindergarten, Primary, or Middle school).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Certified instruction:</strong> Led by verified Yog Jivan instructors trained in safe movement sequencing.</span>
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
            <SchoolYogaEnquiryForm
              lang="EN"
              heading="Ask About a School Yoga Pilot in Hai Duong"
              subheading="For school staff and program coordinators. Adult coordinator contact only — no child personal data is collected."
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
              Common questions about kids' yoga workshops and school pilots in Hai Duong.
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
                      {faq.q.includes("family") && (
                        <div className="mt-2">
                          <Link to="/online-family-yoga" className="text-[color:var(--gold)] hover:underline">
                            Explore Online Family Yoga (Up to 4) &rarr;
                          </Link>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-10 text-center text-xs text-muted-foreground">
              <span>Looking for household sessions at home? Visit our </span>
              <Link to="/online-family-yoga" className="text-[color:var(--gold)] hover:underline">
                Family Yoga
              </Link>
              <span> or learn about our teaching background on </span>
              <Link to="/about" className="text-[color:var(--gold)] hover:underline">
                About Yog Jivan
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
