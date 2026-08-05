import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FurtherReading } from "@/components/site/FurtherReading";
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

const WHY_PRIVATE = [
  { t: "One teacher, one student", d: "The full hour belongs to you — no shared attention, no waiting for a turn." },
  { t: "Pace shaped around you", d: "The session moves at your speed, with as much explanation or rest as you need." },
  { t: "Real-time posture guidance", d: "Master Anil watches you practise and gives verbal cues and adjustments as you move." },
  { t: "Session adapts as your practice develops", d: "What you work on changes as your comfort, mobility and confidence change." },
  { t: "Privacy and focused attention", d: "A quieter setting to ask questions freely and practise without an audience." },
  { t: "Scheduling arranged by enquiry", d: "Times are agreed directly with you rather than fixed to a group timetable." },
];

const SESSION_FLOW = [
  "Brief check-in and readiness",
  "Breath awareness and warm-up",
  "Personalised main practice",
  "Cooldown, relaxation or meditation when appropriate",
  "Recap and optional simple home-practice guidance",
];

const PERSONALISE = [
  { t: "Beginner foundations and alignment", d: "Clear, unhurried guidance through the basics of standing, seated and floor postures." },
  { t: "Mobility and balance", d: "Gentle work to support ease of movement and steadiness." },
  { t: "Strength and steady endurance", d: "Gradual, sustainable building of stability and stamina." },
  { t: "Pranayama, relaxation and meditation", d: "Breathing and stillness practices to support calm and general wellbeing." },
  { t: "Confidence with poses and transitions", d: "Time to repeat, refine and understand movements you find difficult." },
  { t: "Individual practice goals", d: "Whatever you want to work towards, discussed openly and revisited over time." },
];

const HOW_IT_WORKS = [
  { n: "01", t: "Send an enquiry and short intake", d: "Tell us your experience, goals and anything relevant about your health so the session can be planned safely." },
  { n: "02", t: "Discuss goals, suitability and scheduling", d: "A short conversation to confirm the format, language and a time that fits your week." },
  { n: "03", t: "Join the live session; review and adapt", d: "Practise live with Master Anil, then review together and shape future sessions." },
];

const ONLINE_SETUP = [
  "A phone, tablet or laptop with a stable internet connection",
  "Camera positioned so your full body is visible",
  "A yoga mat and clear floor space",
  "Optional chair, blocks or strap — household substitutes are fine",
  "Tell Master Anil about injuries, medication, pregnancy or clinician restrictions before you practise",
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
          </div>
        </div>
      </section>

      {/* Why private yoga is different */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Why private yoga is different</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            An hour built for one person
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PRIVATE.map((c) => (
              <div key={c.t} className="glass-soft rounded-2xl p-5">
                <div className="font-display text-lg text-foreground">{c.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical session flow */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Inside a session</p>
            <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              What your 60-minute private session may include
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A typical, flexible flow — the order and emphasis change with your goals and how you feel
              on the day. Only the 60-minute total is fixed.
            </p>
            <ol className="mt-6 grid gap-3">
              {SESSION_FLOW.map((step, i) => (
                <li key={step} className="glass-soft flex items-start gap-4 rounded-2xl p-4">
                  <span className="shrink-0 text-[0.7rem] tracking-[0.2em] text-[color:var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 text-sm leading-relaxed text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What we personalise */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />What we personalise</p>
          <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
            Shaped around your body and goals
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PERSONALISE.map((c) => (
              <div key={c.t} className="glass-soft rounded-2xl p-5">
                <div className="font-display text-lg text-foreground">{c.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Yoga at Yog Jivan is a wellness practice that can support movement, breathing and relaxation
            alongside medical care where relevant. It is not medical treatment and does not replace advice
            from your doctor.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />How private yoga works</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} className="glass-soft rounded-2xl p-5">
                <div className="text-[0.7rem] tracking-[0.24em] text-[color:var(--gold)]">{s.n}</div>
                <div className="mt-3 font-display text-lg text-foreground">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online setup */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Practising online</p>
            <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              What you need for a private online session
            </h2>
            <ul className="mt-6 grid gap-2">
              {ONLINE_SETUP.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-foreground/85">— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Private or small group */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Private or small group?</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="glass-soft rounded-2xl border border-[color:var(--gold)]/25 p-5">
              <div className="font-display text-lg text-foreground">Private 1-on-1</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Fully individual 60-minute guidance with Master Anil, in studio or online, scheduled by enquiry.
              </p>
            </div>
            <div className="glass-soft rounded-2xl p-5">
              <div className="font-display text-lg text-foreground">Live small group</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Live online classes with a maximum of 8 students, with confirmed group pricing and the
                introductory trial offer.
              </p>
              <Link to="/online-yoga-classes" className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)] hover:underline">
                See online yoga classes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & scheduling note + main CTA */}
      <section className="section-pad-sm">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-3xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 text-center md:p-10">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Pricing and scheduling</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
              Private-session pricing and available times are confirmed after enquiry because the format
              and practice needs may vary. No payment is requested on this page.
            </p>
            <h2 className="mt-6 font-display leading-[1.15]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              Start with a simple enquiry
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" hash="consultation" className="btn-gold">Enquire About Private Yoga</Link>
              <Link to="/online-yoga-classes" className="text-sm text-[color:var(--gold)] hover:underline">
                Compare Online Yoga Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

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
      <FurtherReading
        heading="Deciding between private and group"
        intro="Guides that explain how one-to-one sessions compare with our live small-group classes."
        slugs={["private-online-yoga-vs-group-classes", "desk-worker-yoga-back-neck-shoulders", "therapeutic-yoga-benefits"]}
      />

    </>

  ),
});
