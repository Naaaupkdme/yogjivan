import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { masterImages, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { FAMILY_OFFER, PARENT_CHILD_SECTION } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Live Online Family Yoga for Up to Four | Yog Jivan";
const DESCRIPTION =
  "Private online family yoga for up to four participants from one household. Live 60-minute sessions guided by a dedicated Yog Jivan teacher with an adult participating. Quoted by enquiry.";
const CANONICAL = "https://www.yogjivan.com/online-family-yoga";

const FAQS = [
  {
    q: "How many people from our household can participate?",
    a: "Our private family format accommodates up to four participants from the same household in one live session. This ensures the instructor can keep all participants safely in view on camera and deliver personal alignment guidance.",
  },
  {
    q: "Can an adult caregiver practise alongside a child?",
    a: "Yes, adult participation is a core feature of our family sessions. An adult caregiver participates throughout the practice to model movements, assist with spacing, and share a positive wellness routine.",
  },
  {
    q: "Can all four participants share one camera and device?",
    a: "Yes. In fact, sharing a single room and camera is our recommended setup. Positioning your device 2.5 to 3.5 metres back in landscape orientation allows all mats to be framed clearly.",
  },
  {
    q: "How do you handle different ages and experience levels?",
    a: "Your teacher structures the session around fundamental mobility, breath awareness, and accessible posture flows. Variations are offered continuously so adults experience genuine engagement while younger participants enjoy playful, safe movement.",
  },
  {
    q: "What equipment do we need for a family session?",
    a: "A comfortable floor space, non-slip yoga mats (or clean towels/rugs), a stable stand or low table for your laptop or tablet, and drinking water. No special gym equipment is required.",
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
      ...socialImageMeta(masterImages.kidsYoga),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Family Yoga", "/online-family-yoga")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Live Online Family Yoga",
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

  return (
    <>
      <PageHero
        eyebrow={FAMILY_OFFER.eyebrow}
        title={FAMILY_OFFER.h1}
        accent="live at home for up to four."
        sub={FAMILY_OFFER.tagline}
        image="/assets/preview/hero-family.svg"
        imageAlt="Concept preview: Four household members on staggered mats in living room with participating adult caregiver"
      >
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 md:text-base">
          Bring mindful movement into your household. Live private 60-minute yoga sessions for up to four family members, guided by a dedicated Yog Jivan teacher with an adult participating.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("shared-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Enquire About Family Yoga
          </button>
          <a
            href={waHref("family")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[color:var(--gold)] hover:underline inline-flex items-center gap-1.5"
          >
            Or ask a question on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Trust & Key Features */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Users className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">Up to 4</p>
              <p className="text-xs text-muted-foreground">Household members</p>
            </div>
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Clock className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">60 Minutes</p>
              <p className="text-xs text-muted-foreground">Live video session</p>
            </div>
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Heart className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">Adult Included</p>
              <p className="text-xs text-muted-foreground">Caregiver participation</p>
            </div>
            <div className="glass-luxe rounded-xl p-4 text-center">
              <ShieldCheck className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">Safe Practice</p>
              <p className="text-xs text-muted-foreground">Child-safe standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Family Practice Details */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                Household Movement
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Who fits one shared family session?
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  A family yoga session is crafted for up to four members of one household to practice simultaneously. Whether it is two parents and two children, or a parent and teen, the session creates an active, screen-positive habit together.
                </p>
                <p>
                  Your teacher arranges the session around joint mobility, posture foundations, breathing games, and relaxation. The adult caregiver participates side by side, making the experience collaborative rather than a passive kids' video.
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
                  camera setup guide
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

      {/* Dedicated Parent + Child Section */}
      <section id="parent-child" className="section-pad border-t border-border/40 bg-card/30">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              {PARENT_CHILD_SECTION.eyebrow}
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {PARENT_CHILD_SECTION.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {PARENT_CHILD_SECTION.summary}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            <img
              src="/assets/preview/section-parent-child.svg"
              alt="Concept preview: Adult caregiver and child practicing together on mats with blocks"
              className="mx-auto mb-8 max-w-xl rounded-2xl border border-[color:var(--gold)]/30 shadow-xl"
            />
            <button
              type="button"
              data-cta="parent-child-enquiry"
              onClick={() => {
                setSelectedFormat("parent_child");
                const el = document.getElementById("shared-enquiry-form");
                el?.scrollIntoView({ behavior: "smooth" });
                const select = document.getElementById("shared-format-select") as HTMLSelectElement | null;
                select?.focus();
              }}
              className="btn-gold inline-flex items-center gap-2 text-sm"
            >
              Enquire for Parent & Child Session
            </button>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <SharedYogaEnquiryForm
              format={selectedFormat}
              onFormatChange={(fmt) => setSelectedFormat(fmt === "parent_child" ? "parent_child" : "family")}
              heading={selectedFormat === "parent_child" ? "Enquire About Parent & Child Yoga" : "Enquire About Live Family Yoga"}
              subheading={selectedFormat === "parent_child" ? "Share your preferred schedule and child age band. We reply with schedule options and private quote details on WhatsApp." : "Share your family's preferred days, participant count, and time zone. We reply with schedule options and private quote details on WhatsApp."}
            />
          </div>
        </div>
      </section>

      {/* Cross-linking to Couples and Solo Offers */}
      <section className="section-pad-sm border-t border-border/40">
        <div className="container-luxe">
          <h3 className="text-center text-lg font-semibold text-foreground">Explore other private formats</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/online-couples-yoga"
              className="glass-luxe flex items-center justify-between rounded-xl p-5 transition hover:border-[color:var(--gold)]/50"
            >
              <div>
                <p className="font-semibold text-foreground">Live Online Couples Yoga</p>
                <p className="text-xs text-muted-foreground">Private session for exactly two adult partners</p>
              </div>
              <span className="text-xs text-[color:var(--gold)] font-medium">Explore Couples &rarr;</span>
            </Link>
            <Link
              to="/private-online-yoga"
              className="glass-luxe flex items-center justify-between rounded-xl p-5 transition hover:border-[color:var(--gold)]/50"
            >
              <div>
                <p className="font-semibold text-foreground">Solo Private 1-on-1 Yoga</p>
                <p className="text-xs text-muted-foreground">Dedicated 1-on-1 personal practice coaching</p>
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
              Practical details on scheduling, supervision, and preparing for family yoga online.
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
