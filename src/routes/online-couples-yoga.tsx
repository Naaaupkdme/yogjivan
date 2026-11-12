import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { masterImages, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { COUPLES_OFFER } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Online Couples Yoga for Two | Live Partner Yoga | Yog Jivan";
const DESCRIPTION =
  "Practise live online yoga with a partner or friend. An experienced, certified yoga teacher guides two adults with options for both levels. View the total session price and ask about times.";
const CANONICAL = "https://www.yogjivan.com/online-couples-yoga";

const FAQS = [
  {
    q: "Do we have to be a couple?",
    a: "No. Two adults can join as partners, friends or relatives.",
  },
  {
    q: "Do we need the same experience?",
    a: "No. The teacher can suggest an option for each person.",
  },
  {
    q: "Can we join from two homes?",
    a: "The standard setup is two mats in the same space. Ask us before booking if you need two locations.",
  },
  {
    q: "Do we need to lift or support each other?",
    a: "No. You can practise side by side and support each other by setting up the space and keeping a regular practice time.",
  },
  {
    q: "How are sessions booked and scheduled?",
    a: "Share your preferred times on WhatsApp or through the enquiry form below. We confirm availability and discuss booking details directly.",
  },
];

export const Route = createFileRoute("/online-couples-yoga")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta("https://www.yogjivan.com/assets/preview/couples-yoga-1400.webp"),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/couples-yoga-768.webp",
        type: "image/webp",
        media: "(max-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/couples-yoga-1400.webp",
        type: "image/webp",
        media: "(min-width: 769px)",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Couples Yoga", "/online-couples-yoga")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Live Online Couples Yoga",
            serviceType: "Private Shared Yoga Session",
            description: DESCRIPTION,
            areaServed: "Worldwide",
            url: "/online-couples-yoga",
          })
        ),
      },
    ],
  }),
  component: CouplesYogaPage,
});

function CouplesYogaPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner & Couples Yoga"
        title="Live Online Yoga for Couples and Partners —"
        accent="with an experienced, certified teacher."
        sub="Practise together at home with one experienced, certified yoga teacher guiding both of you live. Bring a partner, friend or adult relative. You can work on the same movements with options suited to each of you."
        image768="/assets/preview/couples-yoga-768.webp"
        image1400="/assets/preview/couples-yoga-1400.webp"
        imageWidth={1400}
        imageHeight={788}
        imageAspectRatio="16/9"
        imageAlt="AI-generated illustration: Two adult partners practicing yoga together at home on separate mats during an online session"
        imageCaption="AI-generated preview illustration · Does not depict Yog Jivan students or teachers"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          US$45 total for two adults · 60 minutes live · One teacher
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
          Every session is led by an experienced, certified Yog Jivan yoga teacher.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("shared-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Check times for two
          </button>
          <a
            href={waHref("couples")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[color:var(--gold)] hover:underline inline-flex items-center gap-1.5"
          >
            Or ask a question on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Pricing & Comparison Card */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[color:var(--gold)]/30 bg-[color-mix(in_oklab,var(--gold)_6%,var(--onyx))] p-6 md:p-8">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Session pricing</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              What does partner yoga cost?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              A live session costs <strong>US$45 for two adults</strong>, or <strong>US$22.50 each</strong> if you split it.
              Two separate standard solo sessions would cost US$60 total. A shared class gives you one practice time and one teacher, while Solo gives one person the full session.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>

            {/* Approved Promo Preview */}
            <div className="mt-6 rounded-xl border border-[color:var(--gold)]/40 bg-black/30 p-4">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                Launch Offer Preview · Subject to Owner Confirmation
              </span>
              <p className="mt-1 text-sm font-medium text-foreground">
                First booking for three adults? Add one adult to your first shared session at no extra charge. US$45 total for all three, subject to availability.
              </p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                Eligibility: First booking, third participant is an adult, one location/device, subject to slot confirmation, no stacking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One shared class, two ways to practise */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                Dual-track practice
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                One shared class, two ways to practise
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  If one of you is new to yoga and the other practises regularly, the teacher can show two versions of the same movement. Each person can choose what feels appropriate. Set two mats side by side and place your device so your teacher can see both of you.
                </p>
                <p>
                  Sessions focus on authentic, grounded yoga practice side by side. No partner acrobatics, forced stretches, or complicated lifts are required.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {COUPLES_OFFER.keyPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Camera & Room Setup for Two</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Setting up for two is simple with household gear. For comprehensive instructions, see our{" "}
                <Link to="/blog/$slug" params={{ slug: "online-yoga-camera-setup" }} className="text-[color:var(--gold)] hover:underline">
                  online yoga camera and space setup guide
                </Link>
                .
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Device distance:</strong> Place laptop or tablet 2.5 to 3 metres back so both mats are visible in landscape orientation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Mat placement:</strong> Position mats side by side with roughly 0.5m between them for arm movement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Lighting:</strong> Keep window or room light in front of you so your teacher can see alignment clearly.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <SharedYogaEnquiryForm
              initialFormat="couples"
              heading="Enquire About Live Couples Yoga"
              subheading="Share your contact information and preferred pacing. We reply with schedule options and private quote details on WhatsApp."
            />
          </div>
        </div>
      </section>

      {/* Cross-linking to Family and Solo Offers */}
      <section className="section-pad-sm border-t border-border/40">
        <div className="container-luxe">
          <h3 className="text-center text-lg font-semibold text-foreground">Looking for a different format?</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/online-family-yoga"
              className="glass-luxe flex items-center justify-between rounded-xl p-5 transition hover:border-[color:var(--gold)]/50"
            >
              <div>
                <p className="font-semibold text-foreground">Online Family Yoga (Up to 4)</p>
                <p className="text-xs text-muted-foreground">Practise together with children and household members</p>
              </div>
              <span className="text-xs text-[color:var(--gold)] font-medium">Explore Family &rarr;</span>
            </Link>
            <Link
              to="/private-online-yoga"
              className="glass-luxe flex items-center justify-between rounded-xl p-5 transition hover:border-[color:var(--gold)]/50"
            >
              <div>
                <p className="font-semibold text-foreground">Solo Private 1-on-1 Yoga</p>
                <p className="text-xs text-muted-foreground">100% dedicated 1-on-1 coaching for one student</p>
              </div>
              <span className="text-xs text-[color:var(--gold)] font-medium">Explore Solo &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Common questions about booking and preparing for private couples yoga online.
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
    </>
  );
}
