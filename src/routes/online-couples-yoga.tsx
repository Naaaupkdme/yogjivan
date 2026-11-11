import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { masterImages, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { COUPLES_OFFER } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Live Online Couples Yoga Classes | Yog Jivan";
const DESCRIPTION =
  "Private online yoga for two adults with a dedicated Yog Jivan teacher. Practise together at home with individual adjustments for different experience levels. Quoted by enquiry.";
const CANONICAL = "https://www.yogjivan.com/online-couples-yoga";

const FAQS = [
  {
    q: "Do both of us need prior yoga experience?",
    a: "Not at all. It is very common for one partner to be a complete beginner while the other has practiced for years. Your teacher gives dual-track cues and modifications so each person practices at a safe, rewarding intensity.",
  },
  {
    q: "Can we join from separate devices or locations?",
    a: "Our default session format is designed for two partners sharing one room and camera. If you travel or need to join from two separate devices, please mention this in your enquiry so your teacher can confirm setup compatibility.",
  },
  {
    q: "Are acrobatic partner poses or lifts required?",
    a: "No. Sessions focus on authentic, grounded yoga practice side by side. Any shared or assisted stretches are gentle, optional, and guided only when both partners feel comfortable.",
  },
  {
    q: "How are couples yoga sessions quoted and booked?",
    a: "To ensure fairness across time zones and scheduling needs, all shared sessions are quoted individually by enquiry. We discuss your preferred weekly rhythm and confirm bookings privately on WhatsApp.",
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
        eyebrow={COUPLES_OFFER.eyebrow}
        title={COUPLES_OFFER.h1}
        accent="live with a dedicated teacher."
        sub={COUPLES_OFFER.tagline}
        image768="/assets/preview/couples-yoga-768.webp"
        image1400="/assets/preview/couples-yoga-1400.webp"
        imageWidth={1400}
        imageHeight={788}
        imageAspectRatio="16/9"
        imageAlt="AI-generated illustration: Two adult partners practicing yoga together at home on separate mats during an online session"
        imageCaption="AI-generated preview illustration · Does not depict Yog Jivan students or teachers"
        contrastVeil
      >
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 md:text-base">
          Practise together from the comfort of home. Share a live 60-minute session tailored for two adults, with personalized guidance, posture alignment, and individual modifications.
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
            Enquire About Couples Yoga
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

      {/* Trust & Key Features */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Users className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">2 Adults</p>
              <p className="text-xs text-muted-foreground">Practising together</p>
            </div>
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Clock className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">60 Minutes</p>
              <p className="text-xs text-muted-foreground">Live 1-on-2 video</p>
            </div>
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Sparkles className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">Dual Variations</p>
              <p className="text-xs text-muted-foreground">Two levels welcome</p>
            </div>
            <div className="glass-luxe rounded-xl p-4 text-center">
              <Globe2 className="mx-auto h-5 w-5 text-[color:var(--gold)]" />
              <p className="mt-2 text-base font-semibold text-foreground">Worldwide</p>
              <p className="text-xs text-muted-foreground">Tailored time zones</p>
            </div>
          </div>
        </div>
      </section>

      {/* What a 2-person class looks like */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                Shared Practice Experience
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                What a two-person session looks like
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Practising yoga with a partner at home is one of the most sustainable ways to build a healthy routine. Rather than watching a pre-recorded workout where one person gets left behind, a live private teacher observes both of you on camera in real time.
                </p>
                <p>
                  Your teacher balances the session: calling out cues suited to each partner's mobility, offering props or posture variations, and ensuring both participants feel challenged, supported, and safe throughout the hour.
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
