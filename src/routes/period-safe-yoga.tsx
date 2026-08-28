import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/period-safe-yoga";

const ANSWER_CAPSULE =
  "Yog Jivan teaches cycle-aware yoga as a matter of comfort and choice: softer sequencing when you want it, supported postures, and clear guidance on which practices are traditionally modified or set aside during menstruation. You are never required to share anything about your cycle — if you would like a gentler class on any day, simply say so and your teacher will offer modifications. In-studio in Hai Duong, Vietnam with the Yog Jivan teaching team, and live online worldwide. This is a movement and rest practice, not treatment; if you have symptoms that concern you, please speak with your clinician.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: Stethoscope, label: "12+ years teaching yoga — beginner to advanced practice" },
  { icon: Users, label: "Private and group sessions — a gentler option available on any day" },
  { icon: Globe2, label: "Studio in Hai Duong · Live online for global students" },
  { icon: Award, label: "Dignity-first teaching — no forced ranges, no pressure, no shame" },
  { icon: ShieldCheck, label: "Clear guidance on what is traditionally modified or set aside" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can I Practise Yoga During My Period?",
    answer:
      "That is a personal decision, and comfort is the best guide. Many people choose a gentler practice on those days; others prefer to rest completely. Traditional Hatha teaching suggests setting aside strong inversions and intense abdominal work during menstruation, and we follow that convention — as a practice preference, not a medical rule. If bleeding is unusually heavy or painful for you, or a clinician has advised rest, please follow that guidance first.",
    bullets: [
      "Comfort is the guide — practise, soften, or rest as you prefer.",
      "Traditional teaching sets aside strong inversions and intense core work.",
      "A gentler, supported option is always available in class.",
      "Follow your clinician's advice if you have symptoms that concern you.",
      "Return to your usual practice whenever it feels right to you.",
    ],
  },
  {
    q: "What Is Traditionally Modified or Set Aside?",
    answer:
      "In classical Hatha teaching, practices that strongly reverse or compress the abdomen are usually set aside during menstruation. In practical terms that means full inversions such as Sarvangasana, Sirsasana and Halasana; strong abdominal work such as Navasana and intense core sequences; and deep twists or long-held strong backbends. Fast, heating flows are often swapped for slower, breath-led sequencing. These are traditional practice preferences rather than medical necessity, and the honest rule is simple: if it feels effortful today, choose a softer version.",
    bullets: [
      "Traditionally set aside: full inversions — Sarvangasana, Sirsasana, Halasana.",
      "Traditionally set aside: strong core work such as Navasana.",
      "Modify: deep twists and long-held strong backbends — go gentler or skip.",
      "Modify: fast heating flows — swap for slower, breath-led sequencing.",
      "General rule: if it feels effortful today, choose a softer version.",
    ],
  },
  {
    q: "Which Gentle Practices Are Usually Offered?",
    answer:
      "Supported forward folds such as Balasana (child's pose) and Upavistha Konasana (wide-leg seated fold); reclining postures with a bolster such as supported Supta Baddha Konasana; gentle cat-cow and hip circles to keep the low back moving; slow bhramari and long-exhale breathing; and a longer closing rest. Whether any of these feels helpful is personal — we offer them as comfortable options, not as remedies.",
    bullets: [
      "Supported Child's Pose (Balasana) — a soft, restful shape.",
      "Supported Supta Baddha Konasana — reclining and bolster-supported.",
      "Gentle Cat-Cow and hip circles — keep the low back moving without strain.",
      "Upavistha Konasana (wide-leg seated fold) — soft, unforced.",
      "Bhramari and long-exhale breathing — slow and comfortable.",
      "A longer closing rest, whenever you want it.",
    ],
  },
  {
    q: "How Does Yog Jivan Adapt Classes?",
    answer:
      "You never have to disclose anything about your cycle. If you would like a gentler class on any given day, just tell your teacher — no explanation needed — and modifications will be offered in real time: a softer variation, a supported alternative, or simply rest. This applies equally to in-studio and live online sessions, so nobody has to choose between practising strongly on an uncomfortable day and skipping class entirely.",
    bullets: [
      "No requirement to share cycle details — ever.",
      "Ask for a gentler class on any day, without explaining why.",
      "Real-time modifications — softer variations, supported alternatives, or rest.",
      "Applies equally to in-studio and live online students.",
      "You never have to choose between practising strongly or skipping entirely.",
    ],
  },
];

export const Route = createFileRoute("/period-safe-yoga")({
  head: () => ({
    meta: [
      { title: "Cycle-Aware Yoga — Gentle Practice Choices | Yog Jivan" },
      { name: "description", content: "Cycle-aware yoga with the Yog Jivan team — which practices are traditionally modified, which are set aside, and how to ask for a gentler class. Hai Duong & online." },
      { name: "keywords", content: "period-safe yoga, yoga during period, menstruation yoga, cycle-aware yoga, gentle yoga, women's yoga Hai Duong" },
      { property: "og:title", content: "Cycle-Aware Yoga — Gentle Practice Choices | Yog Jivan" },
      { property: "og:description", content: "Gentle, cycle-aware yoga — personal, unpressured, in-studio and online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.rabbitPose),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cycle-Aware Yoga | Yog Jivan" },
      { name: "twitter:description", content: "Cycle-aware, gentle yoga practice choices. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Cycle-Aware Yoga", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: PeriodSafePage,
});

function PeriodSafePage() {
  return (
    <TherapeuticLanding
      eyebrow="Cycle-Aware · Dignity-First"
      heroTitle="Cycle-Aware Yoga — Gentle Practice Choices"
      heroSub="A gentle, cycle-aware practice with the Yog Jivan teaching team — modifications on request, no pressure, no disclosure required. Studio in Hai Duong and live online worldwide."
      answerCapsule={ANSWER_CAPSULE}
      h1="Cycle-Aware Yoga"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote="Yoga at Yog Jivan is a movement and rest practice, not medical treatment, and we make no claims about cramps, mood, fatigue or hormonal changes. If you have symptoms that concern you, please speak with a qualified clinician, and tell your teacher only what you want to share about how you would like to practise."
      breatherImages={[
        { src: masterImages.rabbitPose, alt: "Gentle restorative posture during a Yog Jivan studio session", caption: "Restorative practice · soft and supported" },
        { src: masterImages.savasanaClass, alt: "Students resting deeply at the close of a gentle class", caption: "Closing rest · unhurried, always" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Yog Jivan"
      masterIntro={
        <>
          <p>Yog Jivan was founded and is led by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years teaching classical Indian yoga — Hatha, Ashtanga and pranayama. Studio and private sessions are delivered by the Yog Jivan teaching team, with each student matched to a suitable teacher.</p>
          <p>The approach here is grounded in respect: you know your own body, and a teacher's job is to offer a gentler option kindly whenever you want one — without questions and without pressure.</p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Support" },
        { to: "/private-online-yoga", label: "1-on-1 Sessions" },
      ]}
      relatedPosts={[
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
        { slug: "why-traditional-hatha-still-matters", title: "Why traditional Hatha still matters in 2026", cat: "Yoga", read: "6 min" },
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
      ]}
      ctaTitle="Practise the way that suits you."
      ctaSub="Book a free consultation with the Yog Jivan team to begin a cycle-aware practice that meets you where you are."
    />
  );
}
