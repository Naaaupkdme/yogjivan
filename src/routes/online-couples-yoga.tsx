import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { waHref } from "@/lib/wa";
import { COUPLES_OFFER } from "@/lib/facts/shared-offers";
import { Users, Video, Clock, Globe2, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";

const TITLE = "Online Couples Yoga for Two Adults | Yog Jivan";
const DESCRIPTION =
  "Take a private live yoga class for two adults. Practise with a partner or friend, with movement options for each person and guidance from one teacher.";
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
    q: "How much does online couples yoga cost?",
    a: "A live 60-minute session is US$36 total for two adults (US$18 each). A four-session pack is US$132 total (US$33 per session, saving US$12 vs four single sessions). Both adults share one camera feed and practise together.",
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
        href: "/assets/preview/couples-friends-standing-side-reach-mobile.webp",
        type: "image/webp",
        media: "(max-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/couples-friends-standing-side-reach-desktop.webp",
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
        eyebrow="Partner & Couples Yoga · Live Online"
        title="Live Online Yoga for Two"
        sub="Private live yoga for two adults. Join with a partner or friend, even if you have different experience levels. Practise live with a partner or friend in a private online yoga class for two adults. One teacher guides both participants and offers movement options for different experience levels."
        image768="/assets/preview/couples-friends-standing-side-reach-mobile.webp"
        image1400="/assets/preview/couples-friends-standing-side-reach-desktop.webp"
        imageWidth={1440}
        imageHeight={960}
        imageAspectRatio="3/2"
        imageAlt="Two adults practising an active standing stretch side by side on mats during an online yoga session"
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          US$36 total for two adults (covers both participants — US$18 each) · 4-session pack US$132 · 60 minutes live
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
            Enquire for two
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
              Start with the same guided warm-up. If one person is newer, the teacher can give each of you a version of the same movement. Your teacher provides live visual cues when both participants are in view. A partner can be a friend, spouse or another adult.
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

      {/* 2B — FRIENDS YOGA SUBSECTION */}
      <section id="friends-yoga" className="section-pad-sm border-b border-border/40 bg-card/10">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--gold)]/30 bg-white/[0.02] p-6 text-center md:p-8">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Yoga With A Friend<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              Book a private online yoga session with a friend
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Book a private online yoga session with a friend. One teacher guides both adults and can offer a different version of the same movement to each person. A partner can be a friend, spouse or another adult.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("book-session");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-gold"
              >
                Enquire for two friends
              </button>
              <Link
                to="/blog/$slug"
                params={{ slug: "online-yoga-for-two-camera-setup" }}
                className="btn-ghost-gold"
              >
                Read two-person setup guide
              </Link>
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

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8 overflow-hidden">
              <div className="overflow-hidden rounded-xl border border-[color:var(--gold)]/20 shadow-md mb-6 aspect-[3/2] bg-muted/20">
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet="/assets/preview/couples-friends-seated-session-mobile.webp"
                    type="image/webp"
                    width={768}
                    height={512}
                  />
                  <source
                    media="(min-width: 769px)"
                    srcSet="/assets/preview/couples-friends-seated-session-desktop.webp"
                    type="image/webp"
                    width={1440}
                    height={960}
                  />
                  <img
                    src="/assets/preview/couples-friends-seated-session-desktop.webp"
                    alt="Two adults seated on yoga mats in front of a laptop for an online yoga consultation"
                    width={1440}
                    height={960}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Camera & Room Setup for Two</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Setting up for two is simple with household gear. For step-by-step instructions, see our{" "}
                <Link to="/blog/$slug" params={{ slug: "online-yoga-for-two-camera-setup" }} className="text-[color:var(--gold)] hover:underline">
                  online yoga camera setup guide for two at home
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
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Shared screen & single total price:</strong> Both adults practise together on one camera feed; the US$36 session rate covers both participants.</span>
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
              A live session costs <strong>US$36 total for two adults</strong> (covers both participants — <strong>US$18 each</strong>). Four sessions are <strong>US$132 total</strong> (US$33 per session, saving US$12 vs four single sessions).
              Two separate standalone solo sessions would cost US$50 total (US$25 each), saving you US$14 per class when practising together.
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
