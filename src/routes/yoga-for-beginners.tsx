import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { LuxuryImage } from "@/components/site/LuxuryImage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SOCIAL } from "@/lib/social";
import { masterImages } from "@/lib/images";
import {
  Award, Users, Globe2, CheckCircle2, Sparkles, MessageCircle,
  ShieldCheck, GraduationCap, Stethoscope, Quote,
} from "lucide-react";

const CANONICAL = "https://www.yogjivan.com/yoga-for-beginners";
const WA = SOCIAL.whatsapp;

/* ---------- Content ---------- */

const ANSWER_CAPSULE =
  "New to yoga? Yog Jivan's beginner-friendly classes are designed for complete newcomers — no flexibility or experience required. Led personally by Master Anil Choudhary, every session focuses on safe alignment, breathing basics, and building confidence at your own pace. Available both in-studio in Hai Duong, Vietnam and live online worldwide. Join a small class where you're never lost in a crowd. Book your free trial class today.";

const TRUST_STATS = [
  { k: "12+", v: "Years Teaching" },
  { k: "1000+", v: "Students Guided" },
  { k: "20+", v: "Countries" },
  { k: "4.9★", v: "Google Rated" },
  { k: "Free", v: "First Class" },
];

const CREDENTIALS = [
  { icon: GraduationCap, label: "Certified Indian Yoga Master — Classical Hatha, Ashtanga & Yoga Therapy" },
  { icon: Stethoscope, label: "Trained to teach absolute beginners safely — no forced ranges, no injury shortcuts" },
  { icon: Users, label: "1000+ students taught — the majority arrived as complete beginners" },
  { icon: Globe2, label: "Beginner students in 20+ countries — Vietnam, India, USA, EU, Australia" },
  { icon: Award, label: "Founder of Yog Jivan Sanctuary (Hai Duong, Vietnam) & global online school" },
  { icon: ShieldCheck, label: "Trauma-aware, beginner-first pacing — you move only when your body is ready" },
];

type QA = { q: string; bullets: string[]; answer: string };

const QUESTIONS: QA[] = [
  {
    q: "Do I Need to Be Flexible to Start Yoga?",
    answer:
      "No. Flexibility is the outcome of yoga, not a prerequisite. Every posture is taught in 3–5 scalable stages so you begin exactly where your body is today, and range-of-motion improves within the first few weeks of consistent practice.",
    bullets: [
      "Flexibility is a result of practice — not something you need to bring to class.",
      "Every posture has 3–5 stages; you start at the stage your body allows today.",
      "Props (blocks, straps, blankets, chairs) make every pose accessible from day one.",
      "Most beginners see noticeable mobility gains within 2–4 weeks of regular classes.",
      "Stiff hips, tight hamstrings and desk-shoulders are welcomed, not gate-kept.",
    ],
  },
  {
    q: "What Happens in a Beginner's First Class?",
    answer:
      "Your first class begins with a short intake, then a gentle breath-awareness session, guided joint warm-ups, a few foundational postures with hands-on cueing, closing pranayama and a full savasana rest. It is calm, unhurried, and there is no choreography to memorize.",
    bullets: [
      "A 3-minute intake — goals, injuries, medications, sleep, cycle (if applicable).",
      "Breath awareness and gentle centering to settle the nervous system.",
      "Sukshma Vyayama — simple joint-mobility warm-ups to prepare your body safely.",
      "3–5 foundation postures (Mountain, Cat-Cow, Child, gentle standing poses) with verbal cueing by name.",
      "Closing pranayama (basic diaphragmatic breath) and a guided savasana rest.",
      "A short debrief so you leave knowing exactly what worked and what to rest.",
    ],
  },
  {
    q: "Studio or Online — Which Is Better for Beginners?",
    answer:
      "Both work for beginners when the class is small and live. In-studio in Hai Duong gives you hands-on adjustments and community; live online gives you the same teacher, same small-batch attention and identical therapeutic sequencing from anywhere in the world.",
    bullets: [
      "Studio (Hai Duong, Vietnam): hands-on adjustments, in-person energy, ideal if you are local.",
      "Online (Zoom / Google Meet): live, small-batch, camera-on — verbal cueing by name every 60–90 seconds when needed.",
      "Both formats are capped at a small group so beginners never disappear into a crowd.",
      "Same teacher (Master Anil), same lineage, same beginner-first pacing in either format.",
      "Many beginners combine one online session mid-week with a weekend studio class.",
      "If you travel or work remotely, online keeps your practice consistent across timezones.",
    ],
  },
  {
    q: "How Soon Will I See Results?",
    answer:
      "Most beginners feel calmer breathing and better sleep in the first 1–2 weeks, notice reduced stiffness and improved posture within 3–4 weeks, and see measurable changes in flexibility, back-pain hours or cycle regularity between weeks 6 and 12 with 3 sessions per week.",
    bullets: [
      "Weeks 1–2: calmer breathing, easier sleep onset, small energy shifts.",
      "Weeks 3–4: reduced neck/shoulder tension, better posture awareness, first flexibility gains.",
      "Weeks 6–8: consistent mood regulation, stronger core, real range-of-motion improvement.",
      "Weeks 8–12: measurable therapeutic outcomes — pain-free hours, cycle regularity, HRV proxy.",
      "Results scale with frequency — 3 sessions/week is the sweet spot for beginners.",
      "You will receive a written 4-week practice map so progress is tracked, not guessed.",
    ],
  },
  {
    q: "What Should I Wear or Bring to My First Class?",
    answer:
      "Wear comfortable, stretchy clothing you can move and breathe in. For studio, bring a water bottle — mats and props are provided. For online, you need a yoga mat, two blocks (or thick books), a strap (or belt), a bolster (or firm cushion), and about 2×2m of clear space.",
    bullets: [
      "Comfortable, breathable clothing — leggings/shorts and a top you can bend forward in.",
      "Practice barefoot — no shoes or socks on the mat.",
      "Studio: just bring water; mats, blocks, straps and bolsters are provided.",
      "Online: a yoga mat, 2 blocks (or thick books), 1 strap (or belt), 1 bolster (or firm cushion).",
      "Roughly 2×2m of clear floor space and a laptop/tablet placed so the teacher can see your full body.",
      "Come lightly fed — nothing heavy for 2 hours before class.",
    ],
  },
];

const RELATED_LINKS = [
  { to: "/online-yoga-classes", label: "Live Online Yoga Classes" },
  { to: "/programs", label: "All Yoga Programs" },
  { to: "/personal-training", label: "1-on-1 Personal Training" },
  { to: "/about", label: "About Master Anil Choudhary" },
  { to: "/contact", label: "Book Free Trial" },
];

/* ---------- Route ---------- */

export const Route = createFileRoute("/yoga-for-beginners")({
  head: () => ({
    meta: [
      { title: "Yoga for Beginners — Start with Confidence | Yog Jivan" },
      { name: "description", content: "Beginner-friendly yoga classes in Hai Duong, Vietnam & live online worldwide. No flexibility needed. Personally taught by Master Anil Choudhary. Book a free trial." },
      { name: "keywords", content: "yoga for beginners, beginner yoga classes, first yoga class, learn yoga online, beginner yoga Hai Duong, beginner yoga Vietnam, online yoga for beginners, Indian yoga master, safe yoga for newcomers" },
      { property: "og:title", content: "Yoga for Beginners — Start Your Practice with Confidence | Yog Jivan" },
      { property: "og:description", content: "New to yoga? Small-batch, beginner-first classes in Hai Duong & live online. Personally taught by Master Anil Choudhary. Free trial — no experience needed." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: masterImages.meditationPortrait },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Beginners | Yog Jivan" },
      { name: "twitter:description", content: "Beginner-friendly yoga in Hai Duong & live online worldwide. No flexibility required. Free trial class." },
      { name: "twitter:image", content: masterImages.meditationPortrait },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: QUESTIONS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yogjivan.com/" },
            { "@type": "ListItem", position: 2, name: "Yoga for Beginners", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: YogaForBeginnersPage,
});

/* ---------- Reusable bits ---------- */

function InlineCTA({ variant = "gold" }: { variant?: "gold" | "ghost" }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link to="/contact" hash="consultation" className={variant === "gold" ? "btn-gold" : "btn-ghost-gold"}>
        <Sparkles className="h-4 w-4" /> Book Free Trial Class
      </Link>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
        <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Master Anil
      </a>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{eyebrow}<span className="h-px w-10 bg-primary" /></p>
      <h2 className="mt-4 font-display leading-[1.12]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ---------- Page ---------- */

function YogaForBeginnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Beginner-Friendly · Studio & Online"
        title="Yoga for Beginners — Start Your Practice with Confidence"
        sub="Small-batch, beginner-first yoga taught personally by Master Anil Choudhary. In-studio in Hai Duong, Vietnam and live online worldwide. No flexibility or experience required."
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Link to="/contact" hash="consultation" className="btn-gold"><Sparkles className="h-4 w-4" /> Book Free Trial Class</Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold"><MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Us</a>
        </div>
      </PageHero>

      {/* Trust strip */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
            {TRUST_STATS.map((t) => (
              <div key={t.v} className="glass-soft rounded-[0.9rem] px-3 py-3 text-center">
                <div className="font-display text-lg leading-none text-gold-gradient sm:text-xl">{t.k}</div>
                <div className="mt-1.5 text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">{t.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Answer capsule */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{ANSWER_CAPSULE}</p>
          </div>
        </div>
      </section>

      {/* EEAT / Master Anil */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Your Teacher · E-E-A-T"
            title="Master Anil Choudhary"
            sub="Certified Indian Yoga Master · Yoga Therapist · Founder, Yog Jivan Sanctuary"
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <LuxuryImage
                src={masterImages.meditationPortrait}
                alt="Master Anil Choudhary — Certified Indian Yoga Master teaching beginners"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-foreground/90 leading-relaxed">
                Master Anil began teaching in India and has been guiding students full-time since 2013. The majority of the 1000+ students he has taught arrived as absolute beginners — many had never rolled out a mat before. His beginner classes are unhurried, alignment-first and completely free of the pressure that makes newcomers quit yoga after one attempt.
              </p>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                His teaching philosophy for beginners is simple: <span className="italic text-gold-gradient">"Yoga must fit the person — never force the person to fit the yoga."</span> Every first-time student is taught breath, safe alignment and a handful of foundation postures before anything more demanding is introduced.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CREDENTIALS.map(({ icon: Icon, label }) => (
                  <div key={label} className="glass-soft flex items-start gap-3 rounded-2xl p-4">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                    <p className="text-sm leading-snug text-foreground/90">{label}</p>
                  </div>
                ))}
              </div>
              <InlineCTA />
            </div>
          </div>
        </div>
      </section>

      {/* Visual breather — studio life */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 md:col-span-2 md:aspect-[16/9]">
              <LuxuryImage
                src={masterImages.studioAdjustment}
                alt="Master Anil giving a gentle hands-on adjustment to a beginner student inside the Hai Duong studio"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                Beginner-first adjustments · Hai Duong studio
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 aspect-[4/5] md:aspect-auto">
              <LuxuryImage
                src={masterImages.savasanaClass}
                alt="Students resting in Savasana at the end of a beginner-friendly yoga class"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                Closing Savasana · every class
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Question-based H2 sections */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Everything Beginners Ask"
            title="Your first questions, answered honestly"
            sub="No jargon. No pressure. Straight answers so you know exactly what to expect before you step on the mat."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6">
            {QUESTIONS.map((qa) => (
              <article
                key={qa.q}
                className="glass-luxe rounded-[2rem] border border-white/10 p-6 md:p-8"
              >
                <h2 className="font-display text-xl md:text-2xl leading-[1.2] text-foreground">
                  {qa.q}
                </h2>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/85">
                  {qa.answer}
                </p>
                <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {qa.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <InlineCTA />
          </div>
        </div>
      </section>

      {/* Pull-quote break */}
      <section className="section-tight">
        <div className="container-luxe">
          <figure className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-[color:var(--gold)]/70" />
            <blockquote className="mt-4 font-display text-2xl md:text-3xl italic leading-[1.3] text-foreground/95">
              "I came for flexibility, but what changed my life was the emotional calm. Yog Jivan feels premium, peaceful, and deeply authentic."
            </blockquote>
            <figcaption className="mt-5 text-xs uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Linh Pham · Studio Student · Vietnam
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Compact FAQ accordion mirroring the questions */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Quick FAQ" title="Beginner questions at a glance" />
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {QUESTIONS.map((qa, i) => (
                <AccordionItem key={qa.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{qa.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/85 leading-relaxed">
                    {qa.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Continue Exploring" title="Where beginners go next" />
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {RELATED_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="glass-soft rounded-full border border-[color:var(--gold)]/25 px-5 py-2 text-sm text-foreground/90 hover:text-foreground hover:border-[color:var(--gold)]/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground leading-relaxed">
            Once you have a few beginner classes under your belt, most students continue with our{" "}
            <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>,
            explore <Link to="/programs" className="text-[color:var(--gold)] hover:underline">condition-specific programs</Link>{" "}
            (back pain, PCOD, anxiety), or accelerate results with{" "}
            <Link to="/personal-training" className="text-[color:var(--gold)] hover:underline">1-on-1 personal training</Link>.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/30 p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl leading-[1.15]">
              Your first yoga class should feel <span className="text-gold-gradient">welcoming</span>, not intimidating.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Book a free trial — in-studio in Hai Duong or live online — and experience an authentic Indian yoga class taught personally by Master Anil Choudhary.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-gold"><Sparkles className="h-4 w-4" /> Book Free Trial Class</Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Master Anil
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
