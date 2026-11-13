import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { COUPLES_OFFER } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Online Couples Yoga for Two | Yog Jivan";
const DESCRIPTION =
  "Book a live private yoga class for two adults. One certified teacher guides both partners and adapts the movements to each person’s level.";
const CANONICAL = "https://www.yogjivan.com/online-couples-yoga";

const FAQS = [
  {
    q: "Can we be beginners?",
    a: "Yes. Tell the teacher each person’s experience before booking so they can offer suitable options and adapt the movements.",
  },
  {
    q: "Do we need to be a couple?",
    a: "No. This is a private session for two adults, including friends, spouses, or family relatives.",
  },
  {
    q: "How do we set up?",
    a: "Leave room to move and position the camera so the teacher can see both people on their mats.",
  },
  {
    q: "What if one of us is new to yoga?",
    a: "Tell us each person's level before booking. Your teacher can guide a shared warm-up and give each adult a suitable version of the movement.",
  },
  {
    q: "Do we need partner poses or special equipment?",
    a: "Start with clear space to move and a camera that can show both people. Ask the teacher about any equipment for the session. Movements can be guided individually within the same class, with no acrobatic lifts or forced stretches.",
  },
  {
    q: "Can we join from two homes?",
    a: "The standard setup is two mats in the same space sharing one camera. Ask us before booking if you need two locations.",
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
            name: "Live Online Couples Yoga for Two",
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
      {/* 1 — FIRST SCREEN: HERO */}
      <PageHero
        eyebrow="Partner & Couples Yoga"
        title="Live Online Yoga for Two"
        sub="Practise together in a private 60-minute session. One experienced, certified Yog Jivan yoga teacher guides both adults and adapts the movements to each person."
        image768="/assets/preview/couples-yoga-768.webp"
        image1400="/assets/preview/couples-yoga-1400.webp"
        imageWidth={1400}
        imageHeight={788}
        imageAspectRatio="16/9"
        imageAlt="Two adults practicing yoga together at home on separate mats during an online session"
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
              const el = document.getElementById("book-session");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Enquire for two adults
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("how-it-works");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost-gold"
          >
            See how the session works
          </button>
        </div>
      </PageHero>

      {/* 2 — SECOND SWIPE: DIFFERENT LEVELS? YOU CAN STILL PRACTISE TOGETHER */}
      <section id="how-it-works" className="section-pad border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              Shared Practice
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Different levels? You can still practise together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Start with the same guided warm-up. Your teacher can offer different versions of a movement so each person can work at a comfortable pace. A partner can be your spouse, friend or another adult.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="glass-luxe rounded-2xl p-6 border border-white/10 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground text-base">One session together</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Share a dedicated practice time and one experienced teacher from the comfort and privacy of your home.
              </p>
            </div>

            <div className="glass-luxe rounded-2xl p-6 border border-white/10 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground text-base">Options for each person</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Your teacher provides dual-track cues and variations so beginners and experienced practitioners both thrive safely.
              </p>
            </div>

            <div className="glass-luxe rounded-2xl p-6 border border-white/10 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                <Video className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground text-base">Guidance in real time</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Live, two-way video where your teacher observes both mats continuously and provides real-time verbal alignment cues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — WHAT HAPPENS IN YOUR FIRST SESSION */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                First Session Walkthrough
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                What happens in your first session?
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Tell your teacher about your experience and goals. Set up your camera so both people are visible, begin with a gentle warm-up, then practise guided movements and finish with a short cooldown.
                </p>
                <p>
                  Sessions focus on authentic, grounded yoga practice side by side. No acrobatic partner lifts, forced stretches, or awkward partner gymnastics are required.
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

      {/* 4 — SESSION PRICE FOR TWO */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[color:var(--gold)]/30 bg-[color-mix(in_oklab,var(--gold)_6%,var(--onyx))] p-6 md:p-8">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Session pricing</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Session price for two
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              A live session costs <strong>US$45 for two adults</strong>, or <strong>US$22.50 each</strong> if you split it.
              Two separate standard solo sessions would cost US$60 total. A shared class gives you one practice time and one teacher, while Solo gives one person the full session.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Every session is led by an experienced, certified Yog Jivan yoga teacher.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
              <span>Practising with a child or a third family member? For 3 or 4 household participants, see </span>
              <Link to="/online-family-yoga" className="text-[color:var(--gold)] hover:underline font-medium">
                Family Yoga for 3 or 4
              </Link>
              <span>.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — QUESTIONS ABOUT ONLINE COUPLES YOGA */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Questions about online couples yoga
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Common questions about preparing for and booking private couples yoga online.
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

      {/* 6 — BOOK A SESSION FOR TWO */}
      <section id="book-session" className="section-pad bg-muted/10">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Book a session for two
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share your time zone and two preferred times. We’ll confirm teacher availability and the booking details.
              </p>
            </div>

            <div id="shared-enquiry-form">
              <SharedYogaEnquiryForm
                initialFormat="couples"
                heading="Enquire About Live Couples Yoga"
                subheading="Share your contact information and two preferred times. We reply with schedule options and confirmation on WhatsApp."
              />
            </div>

            {/* Cross-linking to Solo and Family Offers */}
            <div className="mt-12 border-t border-border/40 pt-8">
              <h3 className="text-center text-sm font-semibold text-foreground">Looking for a different format?</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  to="/private-online-yoga"
                  className="glass-luxe flex items-center justify-between rounded-xl p-4 transition hover:border-[color:var(--gold)]/50"
                >
                  <div>
                    <p className="font-semibold text-sm text-foreground">Prefer one-to-one guidance?</p>
                    <p className="text-xs text-muted-foreground">Explore private online yoga</p>
                  </div>
                  <span className="text-xs text-[color:var(--gold)] font-medium">&rarr;</span>
                </Link>
                <Link
                  to="/online-family-yoga"
                  className="glass-luxe flex items-center justify-between rounded-xl p-4 transition hover:border-[color:var(--gold)]/50"
                >
                  <div>
                    <p className="font-semibold text-sm text-foreground">Planning for three or four people?</p>
                    <p className="text-xs text-muted-foreground">See family yoga</p>
                  </div>
                  <span className="text-xs text-[color:var(--gold)] font-medium">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
