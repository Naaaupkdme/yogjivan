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

const TITLE = "Private Online Family Yoga for 3 or 4 | Yog Jivan";
const DESCRIPTION =
  "Practise live online yoga together at home with a Yog Jivan teacher. Compare total prices for three and four family members and ask about Parent–Child sessions.";
const CANONICAL = "https://www.yogjivan.com/online-family-yoga";

const FAQS = [
  {
    q: "Can three of us join?",
    a: "Yes. A three-person session is US$55 total.",
  },
  {
    q: "What if a fourth person joins?",
    a: "Select the four-person option at US$65 total.",
  },
  {
    q: "Can beginners join?",
    a: "Yes. The teacher offers accessible options, subject to suitability and confirmed age guidelines.",
  },
  {
    q: "Does one price cover everyone?",
    a: "Yes. The price is for the confirmed participant count in one household booking.",
  },
  {
    q: "Can an adult caregiver practise alongside a child?",
    a: "Yes, adult participation is a core feature of our family sessions. An adult caregiver participates throughout the practice to model movements, assist with spacing, and share a positive wellness routine.",
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
        eyebrow="Household & Family Yoga"
        title="Private Online Family Yoga for Three or Four —"
        accent="with an experienced, certified teacher."
        sub="Make time to move together at home. One experienced, certified yoga teacher leads your family live through a shared practice, with simpler options when someone needs a different pace."
        image768="/assets/preview/family-yoga-768.webp"
        image1400="/assets/preview/family-yoga-1400.webp"
        imageWidth={1400}
        imageHeight={1050}
        imageAspectRatio="4/3"
        imageAlt="AI-generated illustration: Four household members practicing yoga together at home on mats with an adult caregiver"
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
              const el = document.getElementById("shared-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Choose your family size
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

      {/* Pricing & Pack Options */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/30 bg-[color-mix(in_oklab,var(--gold)_6%,var(--onyx))] p-6 md:p-8">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Household pricing</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Choose a session for three or four
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              Your price covers the whole household booking. A fourth family member adds US$10 to the single-session total.
              The amount you see is the total for the group.
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
                    <strong>Pack launch preview:</strong> Book 4 sessions for US$220 total and receive 1 additional session for the same family (5 sessions in total, US$44 effective per session).
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
                    <strong>Pack launch preview:</strong> 4 sessions for US$240 total (US$60 per session total).
                  </p>
                  <p className="mt-1 text-[0.68rem] text-muted-foreground">Covers up to 4 participants from one household.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What your family does together */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                Collaborative Practice
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                What your family does together
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Set up a mat or clear space for each person. Your teacher starts with an easy shared movement, explains options and gives cues while everyone practises. A participating adult helps set up the room and stays with the children throughout the class.
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
              1 Adult + 1 Child
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Want to practise with one child?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Ask about the Parent–Child format. Tell us the child's age range and your preferred time so we can confirm a suitable session. An adult participates throughout.
            </p>
            <p className="mt-2 text-xs text-foreground/75 font-medium">
              We collect only adult contact details. Age range is discussed during enquiry; no child-identifying information or health records are requested.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Every session is led by an experienced, certified Yog Jivan yoga teacher.
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
                alt="AI-generated illustration: An adult caregiver and child practicing yoga together at home with blocks"
                width={768}
                height={432}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </picture>
            <p className="mx-auto mb-8 max-w-md text-xs text-muted-foreground/80">
              AI-generated preview illustration · Does not depict Yog Jivan students or teachers
            </p>
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
