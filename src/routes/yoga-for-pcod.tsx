import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-pcod";

const ANSWER_CAPSULE =
  "Yog Jivan offers a gentle, supportive yoga practice for people living with PCOD or PCOS — alongside medical care, never in place of it. Sessions combine steady movement, strength and mobility as appropriate, simple pranayama, relaxation and a sustainable weekly rhythm. Practice is private or small-group for personal attention, available in-studio in Hai Duong, Vietnam with the Yog Jivan teaching team, and live online worldwide. We make no claims about yoga affecting hormones, insulin or the menstrual cycle; PCOD and PCOS are managed by your doctor, and individual experience varies.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: Stethoscope, label: "12+ years teaching yoga — beginner to advanced practice" },
  { icon: Users, label: "Private or small-group — practice adapted to your comfort on the day" },
  { icon: Globe2, label: "Studio in Hai Duong · Live online for global students" },
  { icon: Award, label: "Combines asana, pranayama, meditation and a sustainable weekly rhythm" },
  { icon: ShieldCheck, label: "Gentle pacing and dignity-first teaching — never forced" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can I Practise Yoga If I Have PCOD or PCOS?",
    answer:
      "Many people find a consistent, gentle practice a helpful support alongside their medical care. PCOD and PCOS are complex conditions managed by a doctor; yoga does not treat, cure or replace that care. What a steady practice can offer is regular movement, a calmer wind-down, and time set aside for your own wellbeing. Individual experience varies, so please keep your gynaecologist or endocrinologist involved in any decisions.",
    bullets: [
      "Offers a calmer, unhurried pace that many people find supportive during a busy week.",
      "Steady movement, strength and mobility at a level that suits you.",
      "Simple, comfortable breathing practices and an unhurried closing rest.",
      "A routine you can keep, rather than an intense short programme.",
      "Sits alongside your medical care — never in place of it.",
    ],
  },
  {
    q: "What Does the Practice Usually Include?",
    answer:
      "A balanced, breath-led practice rather than any single 'miracle pose'. Your teacher weaves gentle standing sequences for general strength, seated postures and hip openers for comfortable mobility, supported reclining postures for rest, and simple pranayama. Fast, aggressive flows are usually not the priority — many students find them draining rather than restorative. The rhythm is steady, breath-led and unhurried.",
    bullets: [
      "Gentle standing sequences — general strength without pushing.",
      "Seated postures and hip openers for comfortable mobility.",
      "Supported reclining postures (bolster-based) for rest.",
      "Bhramari and nadi shodhana pranayama — slow, comfortable breathing practices.",
      "Gentle twists offered as an option, never forced.",
      "Closing meditation to end settled rather than activated.",
    ],
  },
  {
    q: "What Happens Before My First Session?",
    answer:
      "We have a short practice-safety conversation — your practice experience, current activity level, and any injury, limitation or clinician instruction that affects how you should move. We do not ask for cycle history, medication details or lab results, and we do not track them. If there are days when you would prefer a softer practice, simply tell your teacher and the session will be adapted.",
    bullets: [
      "A short practice-safety conversation before you begin.",
      "Share only what is relevant: limitations, comfort and clinician instructions.",
      "We do not collect or track cycle history, medication or lab results.",
      "Ask for a softer practice on any day — no explanation needed.",
      "An optional short home practice you can do between sessions.",
    ],
  },
  {
    q: "Is This a Replacement for Medical Treatment?",
    answer:
      "No — and any teacher who suggests otherwise is being irresponsible. Yoga is a supportive movement and relaxation practice, not a substitute for medical care. Please continue working with your gynaecologist or endocrinologist and keep your prescribed medications and appointments on schedule. Yoga at Yog Jivan is the part that gives you regular movement, rest and a routine of your own.",
    bullets: [
      "Continue medical care with your gynaecologist or endocrinologist.",
      "Yoga complements — it never replaces — prescribed treatment.",
      "We make no hormonal, metabolic or cycle-related claims.",
      "Tell your teacher about any limitation or clinician instruction that affects practice.",
      "Individual experience varies from person to person.",
    ],
  },
];

const CAUTION =
  "PCOD and PCOS require ongoing medical care. Please continue seeing your gynaecologist or endocrinologist and maintain prescribed medication; yoga at Yog Jivan is a supportive movement practice, not treatment. If you are pregnant, recently postpartum, or have any limitation or clinician instruction that affects movement, tell your teacher so the practice can be adapted safely.";

export const Route = createFileRoute("/yoga-for-pcod")({
  head: () => ({
    meta: [
      { title: "Yoga for PCOD & PCOS — Supportive Yoga Practice | Yog Jivan" },
      { name: "description", content: "Gentle, supportive yoga for people living with PCOD or PCOS — alongside your medical care. Hai Duong studio and live online. Book a free consultation." },
      { name: "keywords", content: "yoga for pcod, yoga for pcos, pcod yoga, pcos yoga, gentle yoga women, pcod yoga Hai Duong, online pcod yoga" },
      { property: "og:title", content: "Yoga for PCOD & PCOS — Supportive Yoga Practice | Yog Jivan" },
      { property: "og:description", content: "Gentle, consistent yoga alongside your medical care. Studio in Hai Duong & live online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.rabbitPose),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for PCOD & PCOS | Yog Jivan" },
      { name: "twitter:description", content: "Supportive yoga practice alongside your medical care. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for PCOD & PCOS", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: PCODPage,
});

function PCODPage() {
  return (
    <TherapeuticLanding
      eyebrow="Supportive Yoga · Alongside Medical Care"
      heroTitle="Yoga for PCOD & PCOS — A Supportive Practice"
      heroSub="Gentle, consistent yoga with the Yog Jivan teaching team — a supportive wellbeing practice alongside your medical care. Studio in Hai Duong and live online worldwide."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for PCOD & PCOS"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote={CAUTION}
      breatherImages={[
        { src: masterImages.rabbitPose, alt: "Gentle restorative posture during a Yog Jivan studio session", caption: "Restorative practice · gentle pacing" },
        { src: masterImages.savasanaClass, alt: "Students resting at the close of a gentle class", caption: "Closing rest · unhurried, always" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Yog Jivan"
      masterIntro={
        <>
          <p>Yog Jivan was founded and is led by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years teaching classical Indian yoga — Hatha, Ashtanga and pranayama. Studio and private sessions are delivered by the Yog Jivan teaching team, with each student matched to a suitable teacher.</p>
          <p>The approach here is patient and unhurried: a practice measured in months rather than single sessions, adapted to how you feel on the day, and always sitting alongside the care your doctor provides.</p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-stress", label: "Yoga for Stress Support" },
        { to: "/period-safe-yoga", label: "Cycle-Aware Yoga" },
        { to: "/yoga-for-thyroid", label: "Yoga With a Thyroid Condition" },
        { to: "/private-online-yoga", label: "Private 1-on-1 Yoga" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
      ]}
      relatedPosts={[
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
        { slug: "yoga-for-sustainable-fat-loss", title: "Yoga for sustainable fat loss (without burnout)", cat: "Weight Loss", read: "8 min" },
        { slug: "why-traditional-hatha-still-matters", title: "Why traditional Hatha still matters in 2026", cat: "Yoga", read: "6 min" },
      ]}
      ctaTitle="A practice that meets you where you are."
      ctaSub="Book a free consultation with the Yog Jivan team to plan a supportive yoga practice that fits your week."
    />
  );
}
