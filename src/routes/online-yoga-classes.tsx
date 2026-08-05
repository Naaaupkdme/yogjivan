import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CTABanner } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { LuxuryImage } from "@/components/site/LuxuryImage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SOCIAL } from "@/lib/social";
import { TRIAL, REFUND_POLICY, ONLINE_CLASS } from "@/lib/facts";
import { masterImages, socialImageMeta } from "@/lib/images";
import heroVideoAsset from "@/assets/hero-meditation.mp4.asset.json";
import {
  Award, Users, Globe2, CheckCircle2, XCircle, Sparkles, Eye, Wind, Activity,
  Brain, HeartPulse, Flower2, Sunrise, ClipboardCheck, TrendingUp, Leaf, Calendar,
  MessageCircle, PhoneCall, ShieldCheck, GraduationCap, Stethoscope, Compass, Circle,
  Quote, Star, Crown, Zap,
  type LucideIcon,
} from "lucide-react";

/* ---------- Pricing data (single source of truth) ---------- */

type Plan = {
  id: "m1" | "m3" | "m6" | "m12";
  label: string;
  plan: string;
  months: number;
  price: number;
  tagline: string;
  cta: string;
  badge?: string;
  featured?: boolean;
  accent?: "gold" | "royal";
  icon: LucideIcon;
};

const PLANS: Plan[] = [
  {
    id: "m1", label: "Starter Access", plan: "1 Month", months: 1, price: 19.99,
    tagline: "Best for trying the live class experience",
    cta: "Start Now", icon: Zap,
  },
  {
    id: "m3", label: "Most Popular", plan: "3 Months", months: 3, price: 54.99,
    tagline: "Best for consistency and better progress",
    cta: "Choose 3 Months", badge: "Most Popular", featured: true, accent: "gold", icon: Star,
  },
  {
    id: "m6", label: "Best Value", plan: "6 Months", months: 6, price: 99.99,
    tagline: "Best for deeper improvement and stronger routine building",
    cta: "Choose Best Value", badge: "Best Value", accent: "gold", icon: Award,
  },
  {
    id: "m12", label: "Premium Plan", plan: "12 Months", months: 12, price: 179.99,
    tagline: "Best for long-term lifestyle change and maximum savings",
    cta: "Join Premium Plan", accent: "royal", icon: Crown,
  },
];

const PLAN_BENEFITS = [
  "Live online group classes",
  "Live human correction",
  "Small-batch learning (max 8)",
  "Therapeutic guidance",
  "Beginner-friendly support",
  "WhatsApp support with Master Anil",
  "Free assessment before you start",
  "Flexible weekly schedule",
];

function fmtPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
function monthlyEq(p: Plan) {
  return `$${(p.price / p.months).toFixed(2)}/mo`;
}
function savingsVsMonthly(p: Plan) {
  const base = 19.99 * p.months;
  const saved = base - p.price;
  if (saved <= 0) return null;
  const pct = Math.round((saved / base) * 100);
  return { saved: saved.toFixed(2), pct };
}

const CANONICAL = "https://yogjivan.com/online-yoga-classes";
const ONLINE_TITLE = "Live Online Yoga Classes | Small Groups with Master Anil";
const ONLINE_DESC =
  "Join live online yoga classes with Master Anil in small groups of up to 8. Beginner-friendly guidance, real-time posture correction and a free introductory offer.";
const WA = SOCIAL.whatsapp;


/* ---------- Content Data ---------- */

// NOTE: Unlike large marketplace platforms (e.g. MyYogaTeacher) that rotate substitute
// teachers when your regular teacher is away, Yog Jivan is intentionally single-teacher —
// every class, in-studio or online, is led personally by Master Anil Choudhary. This is
// the continuity differentiator; keep it explicit in the answer capsule below.
const GEO_ANSWER =
  "Yog Jivan delivers live, interactive online yoga classes globally, led personally by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years of teaching in the classical Indian tradition. Every class — in-studio or on Zoom — is taught by Master Anil himself; there are no rotating substitute teachers, so your practice, cues and progress stay consistent. Unlike pre-recorded yoga apps, every session is a real-time small-batch class (max 8 students, 60 minutes) with verbal cueing and personalized posture correction, and therapeutic sequencing adapted for concerns such as PCOD, back pain, stress and sleep. Rooted in classical Hatha, Ashtanga and yoga therapy from India, classes integrate asana, pranayama (breathwork), meditation and lifestyle guidance. Students from 20+ countries practice live over Zoom or Google Meet, in English, Vietnamese or Hindi. Start with a free trial — 3 days of live group access plus one complimentary private session, no card required. Yoga supports wellbeing and complements, but never replaces, medical care.";


const TRUST_STATS = [
  { k: "12+", v: "Years Teaching" },
  { k: "1000+", v: "Students Guided" },
  { k: "20+", v: "Countries" },
  { k: "Max 8", v: "Per Live Class" },
  { k: "Free", v: "Live Trial" },
];

const CREDENTIALS = [
  { icon: GraduationCap, label: "Trained in classical Hatha, Ashtanga & pranayama — Indian lineage" },
  { icon: Stethoscope, label: "Therapeutic, safety-first sequencing — back, neck, cycle, stress and sleep support" },
  { icon: Users, label: "1000+ students taught in studio & online" },
  { icon: Globe2, label: "Weekly students across 20+ countries — Asia, EU, Americas" },
  { icon: Award, label: "Founder & Lead Yoga Teacher, Yog Jivan Sanctuary (Vietnam) & global online school" },
  { icon: ShieldCheck, label: "Trauma-aware, injury-safe adjustments — no forced ranges" },
];

const IDEAL_FOR = [
  "Adults 25–65 seeking authentic, teacher-led yoga (not app-based)",
  "Beginners nervous about starting — want live guidance from day one",
  "Professionals with back / neck / shoulder pain from desk work",
  "Women with PCOD, PCOS, irregular cycles or perimenopausal symptoms",
  "People managing anxiety, insomnia, stress or burnout",
  "Post-injury or post-surgery recovery (with medical clearance)",
  "Advanced practitioners refining alignment, pranayama & meditation",
  "Frequent travelers who need a consistent practice across timezones",
];

const AVOID_IF = [
  "Uncontrolled cardiovascular condition without physician clearance",
  "Acute injury within the last 2 weeks — wait for medical release",
  "1st trimester pregnancy without OB/GYN clearance (2nd/3rd trimester: prenatal-only sessions)",
  "Uncontrolled severe hypertension, retinal detachment or recent eye surgery (no inversions)",
  "Acute vertigo or inner-ear infection (no fast transitions or inversions)",
  "Severe untreated psychiatric episode — please stabilize with a clinician first",
];

const APP_VS_LIVE = [
  { dim: "Instruction",    app: "Pre-recorded video — same for everyone",              live: "Live teacher watching you — corrections in real time" },
  { dim: "Posture Correction", app: "None — you cannot be seen",                       live: "Verbal cues by name every 60–90 seconds when needed" },
  { dim: "Personalization", app: "Algorithmic, generic sequences",                     live: "Sequence adapted to your body, health history & goals" },
  { dim: "Therapeutic Depth", app: "Fitness-first, generic sequencing",             live: "Supportive sequencing adapted to your body, health history and goals" },
  { dim: "Breathwork (Pranayama)", app: "Rarely taught correctly",                     live: "Nadi Shodhana, Bhramari, Ujjayi, Kapalabhati — taught in sequence" },
  { dim: "Accountability",  app: "Streaks & badges",                                   live: "Teacher notices when you miss class and checks in" },
  { dim: "Community",       app: "Anonymous comments",                                 live: "Small cohort — you learn names, faces & journeys" },
  { dim: "Injury Risk",     app: "High — no feedback loop",                            live: "Low — teacher stops or modifies unsafe patterns instantly" },
  { dim: "Cost",            app: "$10–20/mo but plateaus fast",                        live: "From $19.99/mo — live teaching with a real teacher" },
];

const CORRECTION_LAYERS = [
  { icon: Eye, title: "Visual scanning", body: "Master Anil pins each student's video and scans alignment head-to-toe within the first breath of every pose." },
  { icon: MessageCircle, title: "Verbal cueing", body: "Corrections are called by name — e.g. 'Linh, drop your right shoulder 2cm and press the ball of the big toe down.'" },
  { icon: Wind, title: "Breath pacing", body: "Breath is used as the primary correction tool — a wobble usually resolves the moment inhale-exhale ratio is fixed." },
  { icon: Activity, title: "Micro-progressions", body: "Complex postures are broken into 3–5 stages; you never leapfrog to a shape your body is not ready for." },
  { icon: Compass, title: "Prop & wall use", body: "Blocks, straps, chairs and walls are prescribed on-camera to protect joints and deepen sensation safely." },
];

const FIRST_CLASS = [
  { step: "0", title: "Onboarding & health-assessment conversation", body: `${ONLINE_CLASS.onboarding.minutes}-minute conversation with Master Anil about your health history, injuries, goals, sleep and timezone before your first live class. No sales pressure.` },
  { step: "1", title: "Your practice is mapped", body: "Master Anil notes what to avoid, which props you'll need and how your first sessions should be paced for your body." },
  { step: "2", title: "First live class", body: "Camera on, mat down, 2m clear space. We open with breath awareness, then a body-appropriate warm-up." },
  { step: "3", title: "Guided sequence", body: "Sun salutations at your level, targeted asana for your condition, and a closing pranayama + savasana." },
  { step: "4", title: "Post-class debrief", body: "A short WhatsApp note: what worked, what to rest, home practice for the next 48 hours." },
  { step: "5", title: "Personalized plan", body: "Within 24h you receive a written 4-week practice map with weekly milestones." },
];

const CLASS_WORKFLOW = [
  { min: "0–5",  block: "Arrival & Centering",     detail: "Seated grounding, intention setting, quick body scan." },
  { min: "5–12", block: "Pranayama Priming",       detail: "Diaphragmatic breath, Nadi Shodhana or Ujjayi to regulate the nervous system." },
  { min: "12–20", block: "Joint & Fascia Warm-up", detail: "Sukshma Vyayama — 27 micro-movements to lubricate every joint." },
  { min: "20–35", block: "Core Asana Sequence",    detail: "Standing → balancing → seated → prone/supine, adapted to the day's therapeutic focus." },
  { min: "35–45", block: "Therapeutic Deep Work",  detail: "Condition-specific work: hips for PCOD, spine for back pain, forward folds for anxiety, etc." },
  { min: "45–52", block: "Cooling Pranayama",      detail: "Bhramari (humming breath) or Sheetali to downshift heart rate and mind." },
  { min: "52–60", block: "Yoga Nidra / Savasana",  detail: "Guided rest with breath awareness — the most restorative segment, never skipped." },
];

const JOURNEY = [
  { phase: "Weeks 1–2",  title: "Foundation & Assessment", body: "Learn breath-body coordination, baseline mobility test, sleep and pain journal begins." },
  { phase: "Weeks 3–4",  title: "Alignment Literacy",      body: "You learn to feel — not force — postures. First measurable ROM and pain-score improvements." },
  { phase: "Weeks 5–8",  title: "Therapeutic Deepening",   body: "Your condition-specific protocol goes live: PCOD hormone sequence, back-safe core, anxiety downshift." },
  { phase: "Weeks 9–12", title: "Integration & Autonomy",  body: "You can self-practice 15 min/day, understand your body's signals, and use pranayama as first-aid." },
  { phase: "Month 4+",   title: "Mastery & Lifestyle",     body: "Advanced pranayama, meditation, and Ahara–Vihara (food/lifestyle) coaching become part of your rhythm." },
];

const TRACKING = [
  { icon: ClipboardCheck, title: "Baseline intake", body: "Range-of-motion, pain scores (VAS), sleep quality (PSQI-informed), stress index, cycle log." },
  { icon: TrendingUp, title: "Bi-weekly check-ins", body: "10-minute WhatsApp voice/video review — we re-measure and adjust your protocol." },
  { icon: Calendar, title: "Weekly practice log", body: "Simple 3-question log after each class: sensation, breath, mood. Trends become visible in 2 weeks." },
  { icon: HeartPulse, title: "How you feel over time", body: "We simply check in on comfort, mobility, energy and sleep quality as you practise. Experiences differ from person to person, and we never treat this as a medical measurement." },
];

const PRANAYAMA = [
  { name: "Diaphragmatic Breath", use: "Foundation — retrain shallow chest breathing (taught in Week 1)." },
  { name: "Nadi Shodhana (Alternate Nostril)", use: "Balances nervous system. Prescribed for anxiety, insomnia, hormonal disruption." },
  { name: "Ujjayi (Ocean Breath)", use: "Focus + heat generation during asana. Steadies the mind." },
  { name: "Bhramari (Humming Bee)", use: "A calming, soothing breath many students use to settle the mind before rest." },
  { name: "Kapalabhati (Skull-Shining)", use: "Digestive fire, PCOD support (contraindicated in pregnancy, hypertension)." },
  { name: "Sheetali & Sitkari", use: "Cooling breaths — perimenopause, hot flashes, agitation." },
];

const LIFESTYLE = [
  { icon: Leaf, title: "Ahara (Food)", body: "Simple, sattvic guidance: meal timing, hydration, warm/cold food principles for your dosha profile." },
  { icon: Sunrise, title: "Vihara (Routine)", body: "Circadian anchoring — sleep-wake window, screen curfew, morning sunlight, walking rhythm." },
  { icon: Brain, title: "Achara (Conduct)", body: "Mental hygiene: 10-min silence, gratitude, boundaries — the invisible half of yoga therapy." },
  { icon: Sparkles, title: "Sadhana (Practice)", body: "Micro-practice cards: 5–10 min sequences for busy days so you never break the streak." },
];

const CONDITIONS = [
  {
    icon: Activity,
    tag: "Back Pain",
    title: "Yoga for Back Pain (Online)",
    body: "Spinal decompression, core stabilization (Transverse abdominis + multifidus activation), hip mobility to offload the lumbar spine, and posture retraining for desk workers.",
    to: "/personal-training",
    cta: "See therapeutic program",
  },
  {
    icon: Flower2,
    tag: "PCOD / PCOS",
    title: "Yoga for PCOD & Hormonal Balance",
    body: "Gentle hip-opening sequences, twists, Kapalabhati and Bhramari pranayama, plus simple food and routine guidance. This supports general wellbeing alongside — never instead of — care from your doctor. Individual experiences vary.",
    to: "/programs",
    cta: "Explore programs",
  },
  {
    icon: Brain,
    tag: "Anxiety",
    title: "Yoga for Anxiety & Sleep",
    body: "Slow forward folds, restorative supported poses, Nadi Shodhana, Bhramari and a 15-minute Yoga Nidra rest practice. Many students find this calming, though results vary; please continue any clinical care you are receiving.",
    to: "/programs",
    cta: "See anxiety protocol",
  },
];

const CLASS_DETAILS = [
  { label: "Mode",       value: "Live via Zoom / Google Meet (never pre-recorded)" },
  { label: "Batch Size", value: "Small group (max 8) or 1-on-1 private" },
  { label: "Duration",   value: "60 minutes per session, 3–5 sessions/week recommended" },
  { label: "Levels",     value: "Beginner → Advanced, plus dedicated therapeutic tracks" },
  { label: "Languages",  value: "English, Vietnamese and Hindi" },
  {
    label: "Timings",
    value: "Morning: 06:30 IST · 01:00 GMT · 20:00 EST (prev day)  |  Evening: 18:30 IST · 13:00 GMT · 08:00 EST  |  Late: 21:00 IST · 15:30 GMT · 10:30 EST",
  },
  {
    label: "Pricing",
    value: "Free trial (3 days of live group classes + one complimentary private session, no card required) · Memberships $19.99 / 1 month, $54.99 / 3 months, $99.99 / 6 months, $179.99 / 12 months · 1-on-1 private and corporate packages on request.",
  },
  { label: "Trial",      value: "3 days of free live group access, plus one complimentary private session — no card required, one introductory offer per new student" },
];

const FAQS_20: { q: string; a: string }[] = [
  { q: "Are these online yoga classes truly live or pre-recorded?",
    a: "100% live. Every class runs on Zoom or Google Meet with Master Anil watching each student. Cameras stay on so we can correct posture in real time — this is the core reason our results differ from app-based yoga." },
  { q: "I am a complete beginner. Can I really start with a live class?",
    a: "Yes — most of our students had never done yoga before joining. Beginners get the highest personal attention. The first two weeks are dedicated to breath, alignment basics and joint mobility before any complex postures." },
  { q: "How is this different from Alo Moves, Glo, Down Dog or YouTube yoga?",
    a: "Those platforms deliver pre-recorded content to millions with zero feedback. You cannot be corrected, cannot be adapted to, and cannot be prescribed for a condition. Our classes are teacher-led therapy — closer to physiotherapy + yoga than fitness content." },
  { q: "Can online yoga help with chronic back pain?",
    a: "It can be a useful support alongside medical care. Structured, well-taught yoga is widely used for chronic lower-back discomfort, and our live format means a teacher can see and correct you rather than leaving you to copy a video. We do not promise a specific outcome or timeline, and we ask you to keep working with your doctor or physiotherapist." },
  { q: "Can yoga support PCOD and hormonal balance?",
    a: "Many students find a consistent practice helps with stress, sleep and general wellbeing, which are part of the wider picture in PCOD and PCOS. We combine hip-opening asana, targeted pranayama and lifestyle guidance. This supports — it does not replace — care from your gynaecologist or endocrinologist, and we make no claim to treat or cure the condition." },
  { q: "I have anxiety and poor sleep — will this help?",
    a: "Slow-paced yoga with Nadi Shodhana and Bhramari pranayama is calming for many people, and students often tell us their sleep and daily stress feel easier. Responses vary from person to person, so we avoid promising fixed results. If you are under clinical care for anxiety or insomnia, please continue it." },
  { q: "Can I join if I am not flexible at all?",
    a: "Flexibility is the outcome of yoga, not a prerequisite. Every posture has 3–5 scalable stages. You start where your body is today; ROM improves within weeks." },
  { q: "What equipment do I need at home?",
    a: "A yoga mat, 2 blocks (or thick books), a strap (or a belt), a bolster (or firm cushion), and about 2×2m of clear space. A laptop or tablet gives the teacher a better view than a phone." },
  { q: "How do you correct my posture if I am on another continent?",
    a: "Master Anil pins your video and gives verbal cues by name every 60–90 seconds when needed. Adjustments are made through breath pacing, prop use, micro-progressions and, for 1-on-1 clients, screen-share drawings on your video." },
  { q: "How large are the classes?",
    a: "Small Group is capped at 8 students. Private 1-on-1 sessions are also available. We do not run mega-classes — feedback is impossible above ~10 students." },
  { q: "What timings are available across timezones?",
    a: "Three anchor slots cover most timezones: 06:30 IST, 18:30 IST and 21:00 IST. That maps to friendly windows in Asia, Europe, UK, US East Coast and Oceania. Additional slots on request." },
  { q: "Do you record classes I miss?",
    a: "For members, yes — a 48-hour catch-up recording is shared. But we strongly encourage attending live, because recordings cannot correct you." },
  { q: "How much do the classes cost?",
    a: "Start with a free trial — 3 days of live group access plus one complimentary private session with Master Anil, no card required. Memberships are then $19.99 for 1 month, $54.99 for 3 months, $99.99 for 6 months, or $179.99 for 12 months. 1-on-1 private and corporate packages are quoted on request." },
  { q: "How long until I see results?",
    a: "It varies from person to person, so we avoid fixed timelines. Students commonly mention feeling calmer and sleeping better within the first few weeks, with mobility and strength changes building gradually over months of consistent practice. Your onboarding conversation sets realistic expectations for your body and history." },
  { q: "Is this safe during pregnancy or postpartum?",
    a: "Prenatal and postpartum students are welcome in dedicated 1-on-1 sessions once your doctor, midwife or OB/GYN has given clearance. There is no universal start date — we follow your clinician's guidance and adapt every session to how you feel." },
  { q: "Can I switch between group and private sessions?",
    a: "Yes. Many students combine 2 group classes + 1 private session per week — the private session addresses their specific condition, the group builds discipline and community." },
  { q: "Is this only for adults?",
    a: "Adults are our primary community. Teenagers (14+) can join with parental consent. Family and kids programs are available privately on request." },
  { q: "Which lineage do you teach?",
    a: "Classical Hatha and Ashtanga foundations with therapeutic yoga (Krishnamacharya lineage principles) — meaning we adapt yoga to the person, not the person to yoga." },
  { q: "Do you offer certification or teacher training?",
    a: "Not currently as a certified 200-hour YTT. Our focus is student transformation and yoga therapy. We refer serious teacher-training aspirants to trusted Indian schools we personally trust." },
  { q: "How do I book my free live trial?",
    a: "Message us on WhatsApp or use the contact form. We reply within a few hours (usually minutes), send a short intake, schedule a 15-min consultation, then place you in the right live class." },
];

const RELATED_LINKS = [
  { to: "/personal-training", label: "1-on-1 Personal Training" },
  { to: "/programs", label: "All Yoga Programs" },
  { to: "/about", label: "About Master Anil Choudhary" },
  { to: "/testimonials", label: "Student Transformations" },
  { to: "/corporate", label: "Corporate Online Yoga" },
  { to: "/blog", label: "Yoga Journal & Guides" },
  { to: "/contact", label: "Book Free Live Trial" },
];

/* ---------- Route ---------- */

export const Route = createFileRoute("/online-yoga-classes")({
  head: () => ({
    meta: [
      { title: ONLINE_TITLE },
      { name: "description", content: ONLINE_DESC },
      { property: "og:title", content: ONLINE_TITLE },
      { property: "og:description", content: ONLINE_DESC },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.meditationPortrait),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ONLINE_TITLE },
      { name: "twitter:description", content: ONLINE_DESC },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Live Online Yoga Classes with Master Anil Choudhary",
          description: "Live, interactive, small-batch online yoga classes led personally by Master Anil Choudhary, Founder & Lead Yoga Teacher. Supportive, therapeutic sequencing for beginners to advanced students.",
          provider: { "@type": "Organization", name: "Yog Jivan", url: "https://yogjivan.com", sameAs: "https://yogjivan.com" },
          url: CANONICAL,
          image: masterImages.meditationPortrait,
          educationalLevel: "Beginner to Advanced",
          teaches: ["Hatha Yoga", "Ashtanga Yoga", "Therapeutic Yoga", "Pranayama", "Meditation"],
          inLanguage: ["en", "vi", "hi"],
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: "PT60M",
            location: { "@type": "VirtualLocation", url: CANONICAL },
            instructor: {
              "@type": "Person",
              name: "Master Anil Choudhary",
              jobTitle: "Founder & Lead Yoga Teacher",
              image: masterImages.meditationPortrait,
              url: "https://yogjivan.com/about",
            },
          },
        }),
      },

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS_20.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://yogjivan.com/" },
            { "@type": "ListItem", position: 2, name: "Online Yoga Classes", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: OnlineYogaClassesPage,
});

/* ---------- Reusable bits ---------- */

function InlineCTA({ variant = "gold" }: { variant?: "gold" | "ghost" }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link to="/contact" hash="consultation" className={variant === "gold" ? "btn-gold" : "btn-ghost-gold"}>
        <Sparkles className="h-4 w-4" /> Book Free Live Trial
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

/* ---------- Pricing components ---------- */

function PricingTeaser() {
  return (
    <section className="section-tight">
      <div className="container-luxe">
        <div className="mx-auto max-w-5xl">
          <div className="glass-luxe rounded-[1.75rem] border border-[color:var(--gold)]/25 p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 md:items-center">
                <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 md:grid">
                  <Sparkles className="h-5 w-5 text-[color:var(--gold)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Membership · From $19.99</p>
                  <p className="mt-1 font-display text-lg leading-snug md:text-xl">
                    Live online group classes with Master Anil — plans from <span className="text-gold-gradient">$19.99/month</span>. Free trial before you decide.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:shrink-0">
                {PLANS.map((p) => (
                  <a
                    key={p.id}
                    href="#pricing"
                    className={`rounded-full border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
                      p.featured
                        ? "border-[color:var(--gold)]/60 bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
                        : "border-white/15 text-foreground/85 hover:border-[color:var(--gold)]/40 hover:text-[color:var(--gold)]"
                    }`}
                  >
                    {p.plan} · {fmtPrice(p.price)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  const sav = savingsVsMonthly(plan);
  const isFeatured = !!plan.featured;
  const isBest = plan.id === "m6";
  const isPremium = plan.id === "m12";
  const cardRing =
    isFeatured
      ? "border-[color:var(--gold)]/60 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)] md:scale-[1.03]"
      : isBest
      ? "border-[color:var(--gold)]/40"
      : isPremium
      ? "border-white/20"
      : "border-white/10";

  return (
    <article
      className={`glass-luxe relative flex flex-col rounded-[1.75rem] border p-6 md:p-7 ${cardRing}`}
    >
      {plan.badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${
            isFeatured
              ? "bg-gradient-to-r from-[color:var(--gold)] to-amber-300 text-black shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--gold)_70%,transparent)]"
              : "border border-[color:var(--gold)]/50 bg-background/80 text-[color:var(--gold)]"
          }`}
        >
          {plan.badge}
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10">
          <Icon className="h-5 w-5 text-[color:var(--gold)]" />
        </div>
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{plan.label}</p>
      </div>

      <h3 className="mt-4 font-display text-2xl">{plan.plan}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

      <div className="mt-5 flex items-end gap-2">
        <span className="font-display text-4xl leading-none text-gold-gradient md:text-5xl">
          {fmtPrice(plan.price)}
        </span>
        <span className="pb-1 text-xs text-muted-foreground">/ {plan.plan.toLowerCase()}</span>
      </div>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        ≈ {monthlyEq(plan)}
        {sav && <span className="ml-2 text-[color:var(--gold)]">· save {sav.pct}%</span>}
      </p>

      <ul className="mt-6 space-y-2.5">
        {PLAN_BENEFITS.slice(0, 5).map((b) => (
          <li key={b} className="flex gap-2.5 text-sm leading-snug text-foreground/85">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          to="/contact"
          hash="consultation"
          aria-label={`${plan.cta} — ${plan.plan} plan`}
          className={isFeatured ? "btn-gold w-full justify-center" : "btn-ghost-gold w-full justify-center"}
        >
          <Sparkles className="h-4 w-4" /> {plan.cta}
        </Link>
      </div>
    </article>
  );
}

function PricingCards() {
  return (
    <section id="pricing" className="section-y scroll-mt-24">
      <div className="container-luxe">
        <SectionHead
          eyebrow="Online Group Classes Pricing"
          title="Choose the plan that fits your journey"
          sub="Start with one month, build consistency over three months, go deeper in six months, or commit for a full year for the best value."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          {TRIAL.summary}
        </p>
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/10 p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{REFUND_POLICY.title}</p>
          <p className="mt-2">{REFUND_POLICY.summary}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {REFUND_POLICY.exceptions.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="mt-3">{REFUND_POLICY.howTo}</p>
        </div>
      </div>
    </section>
  );
}

function PricingRecap() {
  return (
    <section className="section-tight">
      <div className="container-luxe">
        <div className="mx-auto max-w-5xl glass-luxe rounded-[1.75rem] border border-[color:var(--gold)]/25 p-6 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Pricing at a glance</p>
              <p className="mt-1 font-display text-xl leading-snug">
                From <span className="text-gold-gradient">$19.99/month</span> — longer plans save up to <span className="text-gold-gradient">25%</span>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:shrink-0">
              {PLANS.map((p) => (
                <a
                  key={p.id}
                  href="#pricing"
                  className={`rounded-2xl border px-3 py-2 text-center transition-colors ${
                    p.featured
                      ? "border-[color:var(--gold)]/60 bg-[color:var(--gold)]/10"
                      : "border-white/10 hover:border-[color:var(--gold)]/40"
                  }`}
                >
                  <div className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">{p.plan}</div>
                  <div className="mt-0.5 font-display text-base text-gold-gradient">{fmtPrice(p.price)}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingFinal() {
  return (
    <section className="section-y">
      <div className="container-luxe">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[color:var(--gold)]/30 glass-luxe">
          <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
            <div className="p-7 md:p-10">
              <p className="eyebrow"><span className="h-px w-10 bg-primary" />Ready to begin<span className="h-px w-10 bg-primary" /></p>
              <h2 className="mt-4 font-display leading-[1.15]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                Start with any plan — begin with a free trial
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Plans start at $19.99 for a month, and the 3- and 6-month plans are where most students
                settle in and see visible change. Try a live class first — we'll match you to the right plan afterwards.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" hash="consultation" className="btn-gold">
                  <Sparkles className="h-4 w-4" /> Book Free Live Trial
                </Link>
                <a href="#pricing" className="btn-ghost-gold">
                  See All Plans
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-0 border-t border-[color:var(--gold)]/20 md:border-l md:border-t-0">
              {PLANS.map((p) => (
                <a
                  key={p.id}
                  href="#pricing"
                  className={`flex flex-col items-start justify-between border-b border-r border-white/10 p-5 last:border-r-0 md:p-6 ${
                    p.featured ? "bg-[color:var(--gold)]/10" : ""
                  }`}
                >
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">{p.label}</p>
                    <p className="mt-1 font-display text-lg">{p.plan}</p>
                  </div>
                  <div className="mt-3">
                    <div className="font-display text-2xl text-gold-gradient">{fmtPrice(p.price)}</div>
                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">≈ {monthlyEq(p)}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function OnlineYogaClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Live · Global · Authentic Indian Yoga"
        title="Live Online Yoga Classes with Master Anil Choudhary"
        sub="Small-batch, therapeutic yoga taught live over Zoom by Master Anil Choudhary. Personalized for back pain, PCOD, anxiety and sleep. Students in 20+ countries. Free live trial — no card required."
      >
        <div className="mt-2 flex flex-wrap gap-3">
          <Link to="/contact" hash="consultation" className="btn-gold"><Sparkles className="h-4 w-4" /> Book Free Live Trial</Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold"><MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Us</a>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
          {[
            "3-day free group access",
            "1 private session included",
            "No card required",
            "Max 8 students per class",
            "Taught by Master Anil personally",
          ].map((chip) => (
            <li key={chip} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              {chip}
            </li>
          ))}
        </ul>
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

      <PricingTeaser />

      {/* GEO answer capsule */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-10">
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{GEO_ANSWER}</p>
          </div>
        </div>
      </section>

      {/* Video breather — a live-class glimpse */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--gold)]/30 shadow-2xl">
              <video
                src={heroVideoAsset.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="A short cinematic glimpse of practice at Yog Jivan"
                className="aspect-video w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/80">
                  A glimpse of practice · placeholder — a dedicated class-demo video will replace this shortly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EEAT / Master Anil */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Your Teacher · E-E-A-T" title="Master Anil Choudhary" sub="Founder & Lead Yoga Teacher, Yog Jivan Sanctuary" />
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <LuxuryImage src={masterImages.meditationPortrait} alt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Therapist" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div>
              <p className="text-foreground/90 leading-relaxed">
                Master Anil Choudhary has taught authentic Indian yoga for over 12 years. His work sits at the intersection of classical Indian yoga and modern therapeutic understanding — meaning every posture, breath and cue is chosen for how it serves your body, not how it photographs. He has personally guided more than 1,000 students in-studio and online, most of whom arrived as complete beginners.
              </p>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                His teaching philosophy is simple: <span className="italic text-gold-gradient">"Yoga must fit the person — never force the person to fit the yoga."</span> He focuses on therapeutic, safety-first practice for back and neck comfort, PCOD and cycle-related concerns, stress, sleep and post-injury recovery, and refuses to teach a class larger than eight students online.
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

      {/* Who this is for / Who should avoid */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Fit Check" title="Who these online yoga classes are for" />
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
            <article className="glass-luxe rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <h3 className="font-display text-2xl">This is for you if</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {IDEAL_FOR.map((x) => (
                  <li key={x} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" /><span>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="glass-luxe rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-rose-400" />
                <h3 className="font-display text-2xl">Please consult a doctor first if</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {AVOID_IF.map((x) => (
                  <li key={x} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <Circle className="mt-1.5 h-2 w-2 flex-shrink-0 fill-rose-400 text-rose-400" /><span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">Yoga is complementary — not a substitute for medical care. We coordinate with your physician when needed.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Image breather */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 aspect-[4/3]">
              <LuxuryImage
                src={masterImages.warriorClass}
                alt="Master Anil leading a live Warrior II class — the same sequencing streamed to online students worldwide"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                Live class · same teacher, in-studio & on Zoom
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/10 aspect-[4/3]">
              <LuxuryImage
                src={masterImages.wallSeated}
                alt="Student in a supported seated stretch — the kind of therapeutic online yoga posture prescribed for back pain and desk fatigue"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-xs uppercase tracking-[0.22em] text-white/85">
                Therapeutic prop use · corrected on camera
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Live vs Recorded Apps */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Live Class vs Yoga App"
            title="Why a live teacher outperforms every recorded app"
            sub="Recorded apps scale — but they cannot see you. Here is what changes when a certified teacher watches every breath."
          />
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 glass-luxe">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.2fr_1.4fr_1.4fr]">
              <div className="hidden bg-black/30 p-4 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground md:block">Dimension</div>
              <div className="hidden bg-black/20 p-4 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground md:block">Recorded Apps</div>
              <div className="hidden bg-[color:var(--gold)]/10 p-4 text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)] md:block">Yog Jivan Live</div>
              {APP_VS_LIVE.map((r) => (
                <div key={r.dim} className="contents">
                  <div className="border-t border-white/10 p-4 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--gold)] md:text-[0.7rem]">{r.dim}</div>
                  <div className="border-t border-white/10 p-4 text-sm leading-relaxed text-foreground/80"><span className="mr-2 inline md:hidden text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">Apps:</span>{r.app}</div>
                  <div className="border-t border-white/10 bg-[color:var(--gold)]/5 p-4 text-sm leading-relaxed text-foreground"><span className="mr-2 inline md:hidden text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Yog Jivan:</span>{r.live}</div>
                </div>
              ))}
            </div>
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* Live posture correction */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Method" title="How live posture correction actually works" sub="Five layers of feedback, delivered on camera — the closest thing to being in the room." />
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CORRECTION_LAYERS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-luxe rounded-2xl p-6">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10">
                  <Icon className="h-5 w-5 text-[color:var(--gold)]" />
                </div>
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapeutic Methodology */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Therapeutic Yoga Methodology"
            title="Evidence-informed yoga therapy — not fitness content"
            sub="Every therapeutic protocol combines classical Indian yoga therapy with modern movement science and outcome tracking."
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2">
            {[
              { title: "1. Intake & assessment", body: "Health history, medications, sleep, cycle, pain map, functional ROM screen. Nothing prescribed before we know your body." },
              { title: "2. Individualized protocol", body: "A written 4-week plan built on Krishnamacharya-lineage principle: adapt the practice to the person, in this season of their life." },
              { title: "3. Corrected live practice", body: "Each class runs the protocol with real-time correction so the therapeutic dose actually lands in your body — not on a screen." },
              { title: "4. Home practice cards", body: "Short 5–15 min sequences for non-class days. Consistency, not intensity, drives clinical change." },
              { title: "5. Bi-weekly outcome review", body: "Re-measure ROM, pain, sleep, mood. Progress or plateau triggers a protocol update — no autopilot." },
              { title: "6. Lifestyle integration", body: "Food (Ahara), rhythm (Vihara) and conduct (Achara) coaching — the invisible 60% of every yoga therapy result." },
            ].map((b) => (
              <div key={b.title} className="glass-luxe rounded-2xl p-6">
                <h3 className="font-display text-xl text-gold-gradient">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{b.body}</p>
              </div>
            ))}
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* First class walkthrough */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Your First Class" title="What happens in the first 7 days" />
          <ol className="mx-auto mt-10 max-w-4xl space-y-4">
            {FIRST_CLASS.map((s) => (
              <li key={s.step} className="glass-luxe flex gap-5 rounded-2xl p-5 md:p-6">
                <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 font-display text-lg text-gold-gradient">{s.step}</div>
                <div>
                  <h3 className="font-display text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Class Workflow */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Inside a 60-minute class" title="The anatomy of one live session" />
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 glass-luxe">
            <div className="grid grid-cols-[80px_1fr] items-center gap-4 border-b border-white/10 bg-black/20 p-4 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground md:grid-cols-[100px_240px_1fr]">
              <div>Minutes</div>
              <div className="hidden md:block">Block</div>
              <div>What happens</div>
            </div>
            {CLASS_WORKFLOW.map((r) => (
              <div key={r.min} className="grid grid-cols-[80px_1fr] items-start gap-4 border-b border-white/10 p-4 last:border-b-0 md:grid-cols-[100px_240px_1fr]">
                <div className="font-display text-[color:var(--gold)]">{r.min}</div>
                <div className="text-sm font-semibold text-foreground/90">{r.block}<div className="md:hidden mt-1 text-xs font-normal text-muted-foreground">{r.detail}</div></div>
                <div className="hidden text-sm text-muted-foreground md:block">{r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Journey */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Student Journey" title="Weeks 1 → Month 4+ · The measurable arc" />
          <div className="mx-auto mt-10 max-w-5xl">
            <ol className="relative border-l border-[color:var(--gold)]/30 pl-6">
              {JOURNEY.map((j) => (
                <li key={j.phase} className="relative mb-8 last:mb-0">
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-[color:var(--gold)]/50 bg-background">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                  </span>
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{j.phase}</p>
                  <h3 className="mt-1 font-display text-xl">{j.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{j.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Recovery / Progress Tracking */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Progress Tracking" title="How we measure recovery, not just attendance" />
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TRACKING.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-luxe rounded-2xl p-6">
                <Icon className="h-6 w-6 text-[color:var(--gold)]" />
                <h3 className="mt-4 font-display text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull-quote break */}
      <section className="section-tight">
        <div className="container-luxe">
          <figure className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-[color:var(--gold)]/70" />
            <blockquote className="mt-4 font-display text-2xl md:text-3xl italic leading-[1.3] text-foreground/95">
              "The real-time posture corrections and therapeutic approach eased my back pain within weeks. It feels as effective as being in a physical studio — from the other side of the world."
            </blockquote>
            <figcaption className="mt-5 text-xs uppercase tracking-[0.28em] text-[color:var(--gold)]">
              Tim · Online Student · USA
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Breathing / Pranayama */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Pranayama" title="How breathing is taught — six techniques in sequence" sub="Pranayama is the fastest lever we have for the nervous system, and the most under-taught part of app-based yoga." />
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 glass-luxe">
            <dl className="divide-y divide-white/10">
              {PRANAYAMA.map((p) => (
                <div key={p.name} className="grid grid-cols-1 gap-2 p-5 md:grid-cols-[260px_1fr] md:gap-6 md:p-6">
                  <dt className="font-display text-lg text-gold-gradient">{p.name}</dt>
                  <dd className="text-sm leading-relaxed text-foreground/85">{p.use}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Lifestyle coaching */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Lifestyle Coaching" title="The invisible half of yoga therapy" sub="Yoga on the mat is 40% of the result. What you eat, when you sleep and how you think is the other 60% — we coach all of it." />
          <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {LIFESTYLE.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-luxe rounded-2xl p-6">
                <Icon className="h-6 w-6 text-[color:var(--gold)]" />
                <h3 className="mt-4 font-display text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* Condition-specific programs */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Related Conditions" title="Therapeutic programs by condition" sub="Every condition has a dedicated protocol. Explore the ones that match you — or ask us on WhatsApp." />
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
            {CONDITIONS.map(({ icon: Icon, tag, title, body, to, cta }) => (
              <article key={tag} className="glass-luxe flex flex-col rounded-[1.75rem] p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-[color:var(--gold)]" />
                  <span className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{tag}</span>
                </div>
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                <Link to={to} className="mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--gold)] hover:text-foreground">
                  {cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Class Details */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="Class Details" title="Everything at a glance" />
          <div className="mx-auto mt-10 max-w-3xl glass-luxe overflow-hidden rounded-[2rem] border border-white/10">
            <dl className="divide-y divide-white/10">
              {CLASS_DETAILS.map((row) => (
                <div key={row.label} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-4 sm:gap-6 md:p-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)] sm:col-span-1">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-foreground/90 sm:col-span-3">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* Live Correction Explanation */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Live · In Real Time"
            title="How Master Anil corrects your posture on Zoom"
            sub="Live verbal correction from a real teacher — not a recorded video. Personal attention is possible because batches stay small (max 8)."
          />
          <div className="mx-auto mt-8 max-w-4xl glass-luxe rounded-[2rem] p-6 md:p-8 space-y-4 text-sm md:text-base leading-relaxed text-foreground/85">
            <p>Every online class runs live over Zoom or Google Meet with cameras on. Master Anil pins each student's video and watches you move — the same way he would in the studio, just through a screen.</p>
            <p>Corrections come as verbal cues, called by name: a note on your shoulder line, your breath rhythm, the angle of a knee, when to soften and when to hold. Because the group is capped at eight, each student is seen and adjusted individually across the hour — not lost in a crowd.</p>
            <p>This is not a pre-recorded video that plays the same way for everyone. It is a live teacher adapting instructions to the person in front of him — the reason students progress safely, especially those working with pain, injury or a therapeutic goal.</p>
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Setup Guide"
            title="How to set up for your first online class"
            sub="A few small things make the difference between being seen clearly and being missed by the camera."
          />
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
            {[
              { title: "Camera at mat level", body: "Place your device on the floor or on a low stool at the level of your mat — not on a desk. Master Anil needs to see your whole body, head to toes, during standing and floor postures." },
              { title: "Enough space to move", body: "Clear roughly 2×2 metres around your mat so you can extend your arms and legs freely in every direction without hitting furniture." },
              { title: "Mat or non-slip surface", body: "A yoga mat is ideal. If you don't have one yet, a non-slip rug on a hard floor works for the first class." },
              { title: "Stable internet", body: "Wi-Fi or wired both work well — avoid mobile hotspot if possible so the video stays smooth for real-time corrections." },
              { title: "Device propped up", body: "Prop your phone, tablet or laptop against a wall or use a small stand. Handheld cameras move too much for the teacher to read your alignment." },
              { title: "Quiet, warm space", body: "A calm corner, softly lit, warm enough that your muscles relax. Turn notifications off for the full 60 minutes." },
            ].map((x) => (
              <div key={x.title} className="glass-luxe rounded-2xl p-6">
                <h3 className="font-display text-lg text-gold-gradient">{x.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backup Policy */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="If Something Goes Wrong"
            title="Connection drops or missed classes"
          />
          <div className="mx-auto mt-8 max-w-3xl glass-luxe rounded-[2rem] p-6 md:p-8 space-y-4 text-sm md:text-base leading-relaxed text-foreground/85">
            <p>If your internet disconnects mid-class, message us on WhatsApp — we'll help you rejoin quickly, or reschedule the session into another live slot the same week.</p>
            <p>If you know in advance that you will miss a class, tell us and we'll place you in a different live batch that fits your timezone. Because groups are small, we can almost always accommodate a swap.</p>
            <p>If you miss a class entirely, members receive a 48-hour catch-up recording so you can practice along at home. We still strongly encourage attending live whenever possible — recordings cannot correct your posture the way Master Anil can in real time.</p>
          </div>
        </div>
      </section>

      {/* Health & Safety Intake */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Health & Safety"
            title="A short conversation before your first class"
            sub="Every new student has a brief health check-in with Master Anil before stepping on the mat. This is how the practice stays safe — and how it stays therapeutic."
          />
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              { title: "Health history", body: "Any current conditions, past injuries, surgeries, chronic pain, medications and — for women — cycle-related symptoms." },
              { title: "What to avoid", body: "Movements, ranges or breathing techniques that are not appropriate for your body right now. These are respected in every class you attend." },
              { title: "How we adapt", body: "Your first class is sequenced with modifications ready — props, alternative postures and pacing chosen for your body, not a generic level." },
            ].map((x) => (
              <div key={x.title} className="glass-luxe rounded-2xl p-6">
                <ShieldCheck className="h-6 w-6 text-[color:var(--gold)]" />
                <h3 className="mt-3 font-display text-lg">{x.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingCards />

      {/* Hybrid Flexibility */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Studio + Online"
            title="Move between in-person and online — same teacher, same practice"
          />
          <div className="mx-auto mt-8 max-w-4xl glass-luxe rounded-[2rem] p-6 md:p-8 space-y-4 text-sm md:text-base leading-relaxed text-foreground/85">
            <p>Because every class — in-studio in Hai Duong and online worldwide — is led personally by Master Anil, students move fluidly between the two without starting over.</p>
            <p>Visiting Vietnam for work or a holiday? Practice in-studio while you're here, then continue live on Zoom after you fly home. Based abroad and joining us on a trip? Your online practice picks up the moment you land back home.</p>
            <p>The cues, the sequencing, the therapeutic focus and the teacher stay the same. Only the room changes.</p>
          </div>
        </div>
      </section>

      {/* Live vs App-Based Comparison */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead
            eyebrow="Two Approaches"
            title="Live teacher vs app-based yoga"
            sub="Both have their place. Here is the honest difference in shape and experience."
          />
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 glass-luxe">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">App-based yoga</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                  <li className="flex gap-3"><Circle className="mt-1.5 h-2 w-2 flex-shrink-0 fill-muted-foreground text-muted-foreground" /><span>Pre-recorded video with no feedback on how you're actually moving</span></li>
                  <li className="flex gap-3"><Circle className="mt-1.5 h-2 w-2 flex-shrink-0 fill-muted-foreground text-muted-foreground" /><span>A rotating library of instructors — no continuity from class to class</span></li>
                  <li className="flex gap-3"><Circle className="mt-1.5 h-2 w-2 flex-shrink-0 fill-muted-foreground text-muted-foreground" /><span>Generic content designed for thousands of anonymous users at once</span></li>
                </ul>
              </div>
              <div className="bg-[color:var(--gold)]/5 p-6 md:p-8">
                <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Live teacher · Yog Jivan</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90">
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" /><span>Live teacher correcting you in real time, by name</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" /><span>The same teacher — Master Anil — every class, every week</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" /><span>Small batch of eight, personal attention on every posture</span></li>
                </ul>
              </div>
            </div>
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials
        items={[
          { name: "Tim", initial: "T", country: "USA", flag: "🇺🇸", category: "Online Student",
            quote: "The real-time posture corrections and therapeutic approach eased my back pain within weeks. It feels as effective as being in a physical studio — from the other side of the world." },
          { name: "Sophie Laurent", initial: "S", country: "France", flag: "🇫🇷", category: "Online Client",
            quote: "Even from Europe, the online experience feels intimate and refined. The guidance is personal, elegant, and deeply grounding." },
          { name: "Emily Tran", initial: "E", country: "Canada", flag: "🇨🇦", category: "Therapeutic Program",
            quote: "My chronic back pain eased within weeks. The therapeutic precision and warmth here are unlike any studio I've tried." },
        ]}
      />

      <PricingRecap />

      {/* 20 FAQs */}
      <section className="section-y">
        <div className="container-luxe">
          <SectionHead eyebrow="20 Advanced FAQs" title="Everything you might ask before joining" sub="If your question isn't answered, message Master Anil on WhatsApp — he replies personally, usually within minutes." />
          <div className="mx-auto mt-10 max-w-4xl glass-luxe rounded-[2rem] p-4 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS_20.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-white/10 last:border-b-0">
                  <AccordionTrigger className="text-left font-display text-base md:text-lg text-foreground hover:no-underline">
                    <span className="mr-3 font-mono text-xs text-[color:var(--gold)]">{String(i + 1).padStart(2, "0")}</span>{f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-foreground/85 md:text-base">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <InlineCTA />
        </div>
      </section>

      {/* Related / Internal Link cluster */}
      <section className="section-tight">
        <div className="container-luxe">
          <SectionHead eyebrow="Explore More" title="Related pages" />
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {RELATED_LINKS.map((r) => (
              <Link key={r.to} to={r.to} className="glass-soft rounded-full border border-[color:var(--gold)]/25 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-foreground/90 transition-colors hover:border-[color:var(--gold)]/60 hover:text-[color:var(--gold)]">
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl text-center">
            <p className="italic text-lg text-muted-foreground">
              "Yoga is the art of returning home to yourself — one breath, one correction, one class at a time."
            </p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]">— Master Anil Choudhary</p>
          </div>
        </div>
      </section>

      <PricingFinal />

      <CTABanner title="Ready for your first live class?" sub="Free live trial with Master Anil Choudhary. No card required. Reply within minutes." />

      {/* Final tri-CTA row */}
      <section className="section-tight">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
            <Link to="/contact" hash="consultation" className="glass-luxe flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm text-foreground hover:text-[color:var(--gold)]">
              <Sparkles className="h-4 w-4 text-[color:var(--gold)]" /> Book Free Trial
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="glass-luxe flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm text-foreground hover:text-[color:var(--gold)]">
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Chat
            </a>
            <Link to="/contact" hash="consultation" className="glass-luxe flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm text-foreground hover:text-[color:var(--gold)]">
              <PhoneCall className="h-4 w-4 text-[color:var(--gold)]" /> Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
