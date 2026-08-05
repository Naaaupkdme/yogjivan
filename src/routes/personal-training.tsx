import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import img from "@/assets/file_00000000704c71fb99f50d9c4f4b74ce.png.asset.json";
import { masterImages, socialImageMeta } from "@/lib/images";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const PT_TITLE = "Private Yoga & 1-on-1 Online Yoga | Yog Jivan";
const PT_DESC =
  "Book private yoga with Master Anil in Hai Duong or online. Personalized 60-minute sessions for beginners, mobility, stress support and individual goals.";

/** Visible FAQ rendered on-page. No FAQPage JSON-LD (deprecated in Google Search). */
const PT_FAQS = [
  {
    q: "Do you offer private one-on-one yoga sessions in Hai Duong?",
    a: "Yes. Private 1-on-1 sessions with Master Anil Choudhary are available at both studios serving the Hai Duong urban area and live online, with the practice shaped around your body, experience and goals.",
  },
  {
    q: "How long is a private yoga session?",
    a: "Private sessions are 60 minutes.",
  },
  {
    q: "Is private yoga suitable for absolute beginners?",
    a: "Yes. Sessions are paced entirely to your current level, and Master Anil asks about your experience, injuries and goals before you begin.",
  },
  {
    q: "Can private yoga support back discomfort, stress or hormonal health concerns?",
    a: "Private yoga is a wellness practice that can support mobility, breathing, relaxation and general wellbeing alongside medical care where relevant. It is not medical treatment and does not replace advice from your doctor.",
  },
  {
    q: "How do I book a private session?",
    a: "Send an enquiry and we will discuss your goals, suitability and scheduling directly. Private-session plans are arranged by enquiry.",
  },
];

const PRIVATE_BEST_FOR = [
  "Complete beginners",
  "Students with individual goals",
  "Students who want more personal guidance",
  "People whose schedule does not fit a group class",
  "Students practising from outside Vietnam",
];

export const Route = createFileRoute("/personal-training")({
  head: () => ({
    meta: [
      { title: PT_TITLE },
      { name: "description", content: PT_DESC },
      { property: "og:title", content: PT_TITLE },
      { property: "og:description", content: PT_DESC },
      { property: "og:url", content: "https://yogjivan.com/personal-training" },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.founderPortrait),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PT_TITLE },
      { name: "twitter:description", content: PT_DESC },
    ],
    links: [{ rel: "canonical", href: "https://yogjivan.com/personal-training" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Personal Training", "/personal-training")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Private Yoga Sessions with Master Anil Choudhary",
          serviceType: "Private Yoga Session",
          description: "Live 60-minute one-on-one yoga sessions with Master Anil Choudhary at the Hai Duong studios, shaped around your experience, mobility and individual goals. Scheduling by enquiry.",
          areaServed: "Hai Duong, Vietnam",
          url: "/personal-training",
        })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema({
          name: "Private 1-on-1 Online Yoga",
          serviceType: "Online Private Yoga Session",
          description: "Live 60-minute private online yoga sessions taught personally by Master Anil Choudhary, with real-time posture guidance for beginners and students wanting individual attention. Scheduling by enquiry.",
          areaServed: "Worldwide",
          url: "/personal-training",
        })),
      },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Private Yoga & 1-on-1 Online Yoga" title="A practice shaped entirely" accent="around you." sub="One student. One teacher. One focused hour. Private yoga with Master Anil Choudhary at the Hai Duong studios or live online — for beginners, mobility, stress support and individual goals." image={img.url} />

      {/* Quick answer + private online 1-on-1 path */}
      <section id="private-online-yoga" className="section-pad-sm scroll-mt-28">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Quick answer</p>
            <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}>
              Private 1-on-1 Online Yoga
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">
              Private 1-on-1 online yoga at Yog Jivan is a live 60-minute session taught personally by
              Master Anil Choudhary over video — never a recording. It suits complete beginners and
              students who want individual attention, because the whole hour is built around your
              experience, mobility and pace, with real-time verbal posture guidance as you practise.
              Sessions are taught in English, Vietnamese or Hindi, and scheduling is arranged by
              enquiry so the time fits your week wherever you are.
            </p>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">Best for</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {PRIVATE_BEST_FOR.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-foreground/85">— {item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/contact" hash="consultation" className="btn-gold">Enquire About Private Online Yoga</Link>
              <span className="text-sm text-muted-foreground">
                Prefer practising with others? See{" "}
                <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live small-group online classes</Link>.
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner title="Reserve a private session." sub="Limited weekly slots. Enquire about a consultation." />

      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Related focus areas</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/yoga-for-back-pain" className="glass-soft group rounded-2xl p-5 transition hover:border-[color:var(--gold)]/40">
              <div className="font-display text-lg text-foreground">Yoga for Back Pain</div>
              <p className="mt-2 text-sm text-muted-foreground">Supportive movement for a stiff or aching back — alignment, gentle strengthening and mobility, alongside medical care where relevant.</p>
              <span className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] group-hover:underline">Explore →</span>
            </Link>
            <Link to="/yoga-for-stress" className="glass-soft group rounded-2xl p-5 transition hover:border-[color:var(--gold)]/40">
              <div className="font-display text-lg text-foreground">Yoga for Stress</div>
              <p className="mt-2 text-sm text-muted-foreground">Pranayama, meditation and gentle asana as stress support and for calmer, more restful evenings.</p>
              <span className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] group-hover:underline">Explore →</span>
            </Link>
            <Link to="/yoga-for-weight-loss" className="glass-soft group rounded-2xl p-5 transition hover:border-[color:var(--gold)]/40">
              <div className="font-display text-lg text-foreground">Yoga for Weight Loss</div>
              <p className="mt-2 text-sm text-muted-foreground">A sustainable, whole-body approach — strength, breath, sleep and lifestyle.</p>
              <span className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] group-hover:underline">Explore →</span>
            </Link>
            <Link to="/yoga-for-pcod" className="glass-soft group rounded-2xl p-5 transition hover:border-[color:var(--gold)]/40">
              <div className="font-display text-lg text-foreground">Yoga for PCOD & PCOS</div>
              <p className="mt-2 text-sm text-muted-foreground">Gentle, cycle-aware practice supporting hormonal balance alongside medical care.</p>
              <span className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] group-hover:underline">Explore →</span>
            </Link>
            <Link to="/yoga-for-thyroid" className="glass-soft group rounded-2xl p-5 transition hover:border-[color:var(--gold)]/40">
              <div className="font-display text-lg text-foreground">Yoga for Thyroid Health</div>
              <p className="mt-2 text-sm text-muted-foreground">Gentle sequencing to support hypo- and hyperthyroid conditions alongside medical treatment.</p>
              <span className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] group-hover:underline">Explore →</span>
            </Link>
            <Link to="/period-safe-yoga" className="glass-soft group rounded-2xl p-5 transition hover:border-[color:var(--gold)]/40">
              <div className="font-display text-lg text-foreground">Period-Safe Yoga</div>
              <p className="mt-2 text-sm text-muted-foreground">Cycle-aware modifications — practise safely and kindly through your period.</p>
              <span className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] group-hover:underline">Explore →</span>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Prefer to practice from home? Explore <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>.</span>
            <span>Or compare full pricing across our <Link to="/programs" className="text-[color:var(--gold)] hover:underline">yoga programs</Link>.</span>
          </div>
        </div>
      </section>

      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Private session questions</p>
            <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              Before you book a private session
            </h2>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {PT_FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`pt-${i}`}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>

  ),
});
