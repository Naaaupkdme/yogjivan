import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { LuxuryImage } from "@/components/site/LuxuryImage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SOCIAL } from "@/lib/social";
import { masterImages, socialImageMeta } from "@/lib/images";
import { TEACHER, TRIAL, ONLINE_CLASS, STUDIO_LIST, PUBLIC_TRUST, HEALTH_DISCLAIMER } from "@/lib/facts";
import {
  Award, Users, Globe2, CheckCircle2, Sparkles, MessageCircle,
  ShieldCheck, GraduationCap, Stethoscope, Quote, MapPin, Video,
} from "lucide-react";

const CANONICAL = "https://yogjivan.com/yoga-for-beginners";
const WA = SOCIAL.whatsapp;

/* ---------- Content ---------- */

const TITLE = "Yoga for Beginners in Hai Duong & Live Online | Yog Jivan";
const DESCRIPTION =
  "Beginner yoga classes at two studios in the Hai Duong urban area, plus live online classes worldwide. No flexibility needed. Small groups, beginner-first pacing.";

const ANSWER_CAPSULE =
  "Yoga for beginners at Yog Jivan is designed for people who have never practised before — no flexibility, strength or experience is required. You can start in person at either of our two studios serving the Hai Duong urban area of Hai Phong, Vietnam, or join a live online class from anywhere in the world. Classes are taught in small groups by the Yog Jivan teaching team, founded and led by Master Anil Choudhary, Founder & Lead Yoga Teacher, so you are corrected by name rather than left to copy a screen. The next step is simple: enquire about a studio class, or start the online introductory offer.";

const QUICK_ANSWERS = [
  { label: "Who it is for", text: "Complete beginners, returning practitioners, and people who feel stiff, stressed or unsure where to start." },
  { label: "Flexibility needed", text: "None. Every posture is taught in stages and props are used from day one." },
  { label: "Where", text: "Two studios serving the Hai Duong urban area, plus live online classes worldwide." },
  { label: "Who teaches", text: `The Yog Jivan teaching team, founded and led by ${TEACHER.name}, ${TEACHER.title} — ${TEACHER.yearsTeaching} years teaching.` },
  { label: "Next step", text: "Enquire about a studio class, or start the online introductory offer." },
];

const TRUST_STATS = [
  { k: PUBLIC_TRUST.yearsTeaching, v: "Years Teaching" },
  { k: PUBLIC_TRUST.studentsTaught, v: "Students Guided" },
  { k: PUBLIC_TRUST.countries, v: "Countries" },
  { k: `Max ${ONLINE_CLASS.maxGroupSize}`, v: "Per Live Class" },
  { k: "2", v: "Hai Duong Studios" },
];

const CREDENTIALS = [
  { icon: GraduationCap, label: `${TEACHER.title} — classical Hatha, Ashtanga & pranayama` },
  { icon: Stethoscope, label: "Teaches absolute beginners with safety-first sequencing — no forced ranges" },
  { icon: Users, label: `${PUBLIC_TRUST.studentsTaught} students guided — many arrived as complete beginners` },
  { icon: Globe2, label: `Students in ${PUBLIC_TRUST.countries} countries — Vietnam, India, USA, EU, Australia` },
  { icon: Award, label: "Founder of Yog Jivan Sanctuary and the Yog Jivan online school" },
  { icon: ShieldCheck, label: "Beginner-first pacing — you move only when your body is ready" },
];

type QA = { q: string; bullets: string[]; answer: string };

const QUESTIONS: QA[] = [
  {
    q: "Do I need to be flexible to start yoga?",
    answer:
      "No. Flexibility is something practice develops over time, not something you need before you begin. Every posture is taught in scalable stages, so you start exactly where your body is today, and props such as blocks, straps, blankets and chairs make each pose accessible from your first class.",
    bullets: [
      "Flexibility is a result of practice — not a requirement to attend.",
      "Every posture has several stages; you work at the stage your body allows today.",
      "Props (blocks, straps, blankets, chairs) are used from day one.",
      "Stiff hips, tight hamstrings and desk-bound shoulders are welcome.",
      "Progress differs from person to person; individual experience varies.",
    ],
  },
  {
    q: "What happens in a beginner's first class?",
    answer:
      "A beginner class is calm and unhurried: gentle breath awareness, guided joint warm-ups, a handful of foundation postures taught with clear verbal cueing, closing pranayama and a guided savasana rest. There is no choreography to memorise. For live online students, a short onboarding conversation happens before the first class.",
    bullets: [
      `Online students: a ${ONLINE_CLASS.onboarding.minutes}-minute onboarding and health-assessment conversation before the first live class.`,
      "Breath awareness and gentle centering to settle the nervous system.",
      "Sukshma Vyayama — simple joint-mobility warm-ups to prepare the body safely.",
      "A few foundation postures (Mountain, Cat-Cow, Child, gentle standing poses) with cueing by name.",
      "Closing pranayama and a guided savasana rest.",
      "A short debrief so you leave knowing what to practise and what to rest.",
    ],
  },
  {
    q: "Should a beginner choose the studio in Hai Duong or live online?",
    answer:
      "Both work well for beginners because both are live and small. The studios serving the Hai Duong urban area give you in-person adjustments and community. Live online gives you the same teacher, the same small-group attention and the same sequencing from anywhere in the world, with camera on so your alignment can be corrected in real time.",
    bullets: [
      "Studio: in-person adjustments and community — ideal if you are local to the Hai Duong urban area.",
      `Live online: ${ONLINE_CLASS.platform}, maximum ${ONLINE_CLASS.maxGroupSize} students, ${ONLINE_CLASS.durationMinutes}-minute sessions.`,
      "Camera on is encouraged online so your alignment can be seen and corrected.",
      "Same teacher and same beginner-first pacing in either format.",
      "Classes are taught in English, Vietnamese and Hindi.",
      "Many students combine a mid-week online session with a weekend studio class.",
    ],
  },
  {
    q: "What should I wear or bring to my first class?",
    answer:
      "Wear comfortable, stretchy clothing you can move and breathe in, and practise barefoot. For studio classes, bring water — mats and props are provided. For live online classes you will want a yoga mat, two blocks (or thick books), a strap (or belt), a bolster (or firm cushion) and roughly two metres of clear floor space.",
    bullets: [
      "Comfortable, breathable clothing you can bend forward in.",
      "Practise barefoot — no shoes or socks on the mat.",
      "Studio: bring water; mats, blocks, straps and bolsters are provided.",
      "Online: a mat, 2 blocks (or books), 1 strap (or belt), 1 bolster (or cushion).",
      "About 2×2m of clear floor space with your device placed so your full body is visible.",
      "Come lightly fed — nothing heavy for about two hours before class.",
    ],
  },
  {
    q: "Is beginner yoga safe if I have an injury or a health condition?",
    answer:
      "Tell us before you practise. Live online students have a short onboarding conversation before the first class, and studio students can share anything relevant on arrival, so postures can be adapted or substituted. Yoga is a wellness practice and is not a substitute for medical care — please consult your doctor about any medical condition.",
    bullets: [
      "Tell us anything relevant to practising safely before your first class.",
      "Postures are adapted or substituted rather than forced.",
      "What you share is passed on so your practice stays adapted from class to class.",
      HEALTH_DISCLAIMER.short,
    ],
  },
];

/* ---------- Route ---------- */

export const Route = createFileRoute("/yoga-for-beginners")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.meditationPortrait),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://yogjivan.com/" },
            { "@type": "ListItem", position: 2, name: "Yoga for Beginners", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: YogaForBeginnersPage,
});

/* ---------- Reusable bits ---------- */

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{eyebrow}<span className="h-px w-10 bg-primary" /></p>
      <h2 className="mt-4 font-display leading-[1.12]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground leading-relaxed">{sub}</p>}
    </div>
  );
}

/** Two visibly distinct paths: local studio enquiry vs. online introductory offer. */
function PathCards() {
  return (
    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
      <div className="glass-luxe rounded-[1.75rem] border border-[color:var(--gold)]/25 p-6">
        <p className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
          <MapPin className="h-4 w-4" /> In the Hai Duong urban area
        </p>
        <h3 className="mt-3 font-display text-lg leading-snug">Enquire about a studio beginner class</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
          Two studios serving the Hai Duong urban area of Hai Phong, Vietnam. Tell us your
          schedule and any injuries, and we will recommend a beginner-appropriate class time.
          Studio membership rates are shared directly.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/contact" hash="consultation" className="btn-gold">
            <Sparkles className="h-4 w-4" /> Enquire About Studio Classes
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
        </div>
      </div>

      <div className="glass-luxe rounded-[1.75rem] border border-white/10 p-6">
        <p className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
          <Video className="h-4 w-4" /> Live online, worldwide
        </p>
        <h3 className="mt-3 font-display text-lg leading-snug">Start the online introductory offer</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{TRIAL.summary}</p>
        <ul className="mt-3 space-y-2">
          {TRIAL.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-xs leading-relaxed text-foreground/80">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[color:var(--gold)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          This introductory offer applies to live online classes only — it is not a studio membership offer.
        </p>
        <div className="mt-5">
          <Link to="/online-yoga-classes" className="btn-ghost-gold">See Live Online Classes</Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

function YogaForBeginnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Beginner-Friendly · Hai Duong Studios & Live Online"
        title="Yoga for Beginners in Hai Duong and Live Online"
        sub={`Small-group, beginner-first yoga taught personally by ${TEACHER.name}, ${TEACHER.title}. In person at two studios serving the Hai Duong urban area, and live online worldwide. No flexibility or experience required.`}
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Link to="/contact" hash="consultation" className="btn-gold">
            <Sparkles className="h-4 w-4" /> Enquire About Studio Classes
          </Link>
          <Link to="/online-yoga-classes" className="btn-ghost-gold">See Live Online Classes</Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
            <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp Us
          </a>
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

      {/* Answer capsule + quick answers */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{ANSWER_CAPSULE}</p>
            <dl className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              {QUICK_ANSWERS.map((a) => (
                <div key={a.label} className="glass-soft rounded-2xl p-4">
                  <dt className="text-[0.58rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">{a.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90">{a.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Opening CTA — two distinct paths */}
      <section className="section-tight">
        <div className="container-luxe">
          <PathCards />
        </div>
      </section>

      {/* EEAT / Master Anil */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Our Founder & Lead Teacher"
            title={TEACHER.name}
            sub={`${TEACHER.title}, Yog Jivan Sanctuary`}
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <LuxuryImage
                src={masterImages.meditationPortrait}
                alt={`${TEACHER.name} — ${TEACHER.title}`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-foreground/90 leading-relaxed">
                Master Anil began teaching in India and has taught authentic Indian yoga for over {PUBLIC_TRUST.yearsTeaching.replace("+", "")} years.
                Many of the {PUBLIC_TRUST.studentsTaught} students he has taught arrived as absolute beginners — plenty of them
                had never rolled out a mat before. His beginner classes are unhurried, alignment-first and free of the
                pressure that makes newcomers give up after one attempt.
              </p>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                His teaching principle for beginners is simple: <span className="italic text-gold-gradient">&ldquo;Yoga must fit the person — never force the person to fit the yoga.&rdquo;</span>{" "}
                Every first-time student is taught breath, safe alignment and a handful of foundation postures before
                anything more demanding is introduced.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CREDENTIALS.map(({ icon: Icon, label }) => (
                  <div key={label} className="glass-soft flex items-start gap-3 rounded-2xl p-4">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold)]" />
                    <p className="text-sm leading-snug text-foreground/90">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Read more <Link to="/about" className="text-[color:var(--gold)] hover:underline">about Master Anil Choudhary</Link>{" "}
                or see how <Link to="/private-online-yoga" className="text-[color:var(--gold)] hover:underline">1-on-1 personal training</Link> works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual breather */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 md:col-span-2 md:aspect-[16/9]">
              <LuxuryImage
                src={masterImages.studioAdjustment}
                alt="A gentle hands-on adjustment for a beginner student in the Yog Jivan studio"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                Beginner-first adjustments · Hai Duong urban area
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

      {/* Studio vs online decision */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Choosing Your Format"
            title="Studio or live online?"
            sub="Both are live and small. The difference is in-person adjustment versus practising from wherever you are."
          />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="glass-soft rounded-2xl p-6">
              <h3 className="font-display text-lg">Studio — Hai Duong urban area</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
                <li>In-person adjustments and community.</li>
                <li>Mats, blocks, straps and bolsters provided.</li>
                {STUDIO_LIST.map((s) => (
                  <li key={s.id}>
                    <a href={s.googleMaps} target="_blank" rel="noopener noreferrer" className="text-[color:var(--gold)] hover:underline">
                      {s.name}
                    </a>{" "}
                    — {s.full}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-soft rounded-2xl p-6">
              <h3 className="font-display text-lg">Live online — worldwide</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
                <li>{ONLINE_CLASS.durationMinutes}-minute live sessions on {ONLINE_CLASS.platform}.</li>
                <li>Maximum {ONLINE_CLASS.maxGroupSize} students, so you are corrected by name.</li>
                <li>Camera on is encouraged for correction; your session is never shared.</li>
                <li>Missed a class? A recording is available to members for {ONLINE_CLASS.recordings.windowHours} hours.</li>
                <li>Teaching available across {ONLINE_CLASS.languages.join(", ")}, subject to availability.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Questions — single visible source, mirrored by the FAQ schema */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Everything Beginners Ask"
            title="Your first questions, answered honestly"
            sub="No jargon and no pressure — so you know what to expect before you step on the mat."
          />
          <div className="mx-auto mt-10 max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {QUESTIONS.map((qa, i) => (
                <AccordionItem key={qa.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display text-base md:text-lg">{qa.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm md:text-base leading-relaxed text-foreground/85">{qa.answer}</p>
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {qa.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contextual reading + next steps */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <SectionHead eyebrow="Keep Reading" title="Helpful next steps for beginners" />
            <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/85">
              If you want to practise between classes, our journal entry on{" "}
              <Link to="/blog/$slug" params={{ slug: "building-a-home-practice-you-will-keep" }} className="text-[color:var(--gold)] hover:underline">
                building a home practice you&rsquo;ll keep
              </Link>{" "}
              is the most useful place to start, and{" "}
              <Link to="/blog/$slug" params={{ slug: "beginners-guide-to-20-minutes-of-stillness" }} className="text-[color:var(--gold)] hover:underline">
                meditation for beginners
              </Link>{" "}
              explains the breathing and meditation side of the practice. If you are choosing a first class locally, read{" "}
              <Link to="/blog/$slug" params={{ slug: "yoga-classes-hai-duong-beginners-guide" }} className="text-[color:var(--gold)] hover:underline">
                our beginner&rsquo;s guide to yoga classes in Hai Duong
              </Link>
              , or see{" "}
              <Link to="/blog/$slug" params={{ slug: "first-live-online-yoga-class" }} className="text-[color:var(--gold)] hover:underline">
                what happens in a first live online class
              </Link>
              . To understand the tradition behind what we teach, read{" "}
              <Link to="/blog/$slug" params={{ slug: "why-traditional-hatha-still-matters" }} className="text-[color:var(--gold)] hover:underline">
                why traditional Hatha still matters
              </Link>.
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/85">
              Once you are comfortable with the basics, most students move on to a condition-specific{" "}
              <Link to="/programs" className="text-[color:var(--gold)] hover:underline">yoga program</Link>{" "}
              such as back pain, PCOD or stress, continue with{" "}
              <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">live online yoga classes</Link>, or work privately through{" "}
              <Link to="/private-online-yoga" className="text-[color:var(--gold)] hover:underline">1-on-1 personal training</Link>.
            </p>
          </div>
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
              Enquire about a beginner class at either studio serving the Hai Duong urban area, or start the
              online introductory offer and practise live with a Yog Jivan teacher from anywhere in the world.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/contact" hash="consultation" className="btn-gold">
                <Sparkles className="h-4 w-4" /> Enquire About Studio Classes
              </Link>
              <Link to="/online-yoga-classes" className="btn-ghost-gold">See Live Online Classes</Link>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-xs leading-relaxed text-muted-foreground">{HEALTH_DISCLAIMER.long}</p>
          </div>
        </div>
      </section>
    </>
  );
}
