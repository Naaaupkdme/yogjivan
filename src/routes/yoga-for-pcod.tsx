import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages } from "@/lib/images";

const CANONICAL = "https://www.yogjivan.com/yoga-for-pcod";

const ANSWER_CAPSULE =
  "Master Anil's therapeutic approach to PCOD and PCOS blends consistent asana, targeted pranayama and stress reduction — because chronic stress is one of the biggest drivers of hormonal imbalance in polycystic ovarian conditions. Sessions focus on pelvic circulation, gentle strengthening, seated forward folds and twists that support the endocrine system, and closing breath work that calms the nervous system. Practice is small-batch or private for personalized attention, available in-studio in Hai Duong, Vietnam and live online worldwide. Yoga supports — it does not replace — medical care; the strongest outcomes come from practicing alongside your doctor's plan.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Certified in classical Hatha, pranayama and therapeutic sequencing" },
  { icon: Stethoscope, label: "12+ years supporting women with PCOD, PCOS and cycle irregularity" },
  { icon: Users, label: "Small-batch or 1-on-1 — practice adapted to your cycle and symptoms" },
  { icon: Globe2, label: "Studio in Hai Duong · Live online for global students" },
  { icon: Award, label: "Integrates asana, pranayama, meditation and Holistic Lifestyle Consultation" },
  { icon: ShieldCheck, label: "Trauma-aware, cycle-aware — never forced, always titrated" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can Yoga Really Help With PCOD or PCOS?",
    answer:
      "Yes, as a consistent supporting practice. PCOD and PCOS are complex hormonal conditions driven by insulin sensitivity, chronic stress, inflammation and metabolic patterns — and yoga meaningfully influences three of those four levers. A regular practice improves insulin sensitivity through movement and breath, lowers cortisol (which directly worsens androgen levels when chronically elevated), and gently increases pelvic circulation. Research and clinical experience consistently show that women who combine yoga with medical care report calmer cycles, better sleep and reduced symptom flare-ups over months of practice.",
    bullets: [
      "Lowers chronic cortisol — a known driver of androgen elevation in PCOD/PCOS.",
      "Improves insulin sensitivity through consistent movement and breath work.",
      "Increases pelvic circulation with targeted seated postures and gentle twists.",
      "Supports better sleep — which itself regulates the hormonal cycle.",
      "Works as a long-term supporting practice, not a quick fix.",
    ],
  },
  {
    q: "What Poses or Practices Help Most With Hormonal Balance?",
    answer:
      "A balanced practice is more powerful than any single 'miracle pose'. Master Anil weaves gentle standing sequences for strength and metabolism, seated forward folds and hip openers for pelvic circulation, supported reclining postures for nervous-system rest, and pranayama that specifically down-regulates stress. Fast, aggressive flows are usually counter-productive for PCOD — they can spike cortisol further. The rhythm is steady, breath-led and unhurried.",
    bullets: [
      "Gentle standing sequences — strength and metabolic support without stress spikes.",
      "Seated forward folds and hip openers — encourage pelvic circulation.",
      "Supported reclining postures (bolster-based) — deep nervous-system rest.",
      "Bhramari and nadi shodhana pranayama — down-regulate cortisol.",
      "Twists that gently massage the abdominal organs.",
      "Closing meditation to end grounded, not activated.",
    ],
  },
  {
    q: "What to Expect in a Therapeutic PCOD Session?",
    answer:
      "Your first session starts with a private intake — cycle history, current symptoms, medications, sleep, stress load, and where you are in your cycle today. Master Anil then guides a paced sequence adapted to your body's current state: warmer, stronger sequencing when appropriate, and softer, restorative work during menstruation or high-symptom weeks. Every plan is longitudinal — we track how you feel across a full cycle, not one class.",
    bullets: [
      "Private intake — cycle history, current symptoms, medical context and goals.",
      "Sequencing adapted to where you are in your cycle today.",
      "Standing strength → seated hip and pelvic work → supported rest → pranayama.",
      "Modifications for high-symptom weeks — never forcing intensity.",
      "A short home practice map you can do between sessions.",
      "Progress tracked across cycles, not single classes.",
    ],
  },
  {
    q: "Is This a Replacement for Medical Treatment?",
    answer:
      "No — and any teacher who suggests otherwise is being irresponsible. Yoga is a genuinely powerful supporting practice for PCOD and PCOS, but it is not a substitute for medical care. Please continue working with your gynaecologist or endocrinologist, keep your prescribed medications and lab work on schedule, and consider yoga part of the long-term supporting strategy — the piece that addresses stress, sleep, insulin sensitivity and pelvic circulation. Master Anil regularly works alongside a student's medical team, never instead of them.",
    bullets: [
      "Continue medical care with your gynaecologist or endocrinologist.",
      "Yoga complements — it never replaces — prescribed treatment.",
      "Bring your medical history so the practice can be built around it.",
      "Master Anil coordinates comfortably with your doctor's guidance.",
      "The strongest outcomes come from combining both consistently.",
    ],
  },
];

const CAUTION =
  "PCOD and PCOS require ongoing medical care. Please continue seeing your gynaecologist or endocrinologist, maintain prescribed medications, and treat yoga as a powerful supporting practice — never a replacement. If you are pregnant, recently postpartum, or being investigated for related conditions, share this at your intake so the practice can be adapted safely.";

export const Route = createFileRoute("/yoga-for-pcod")({
  head: () => ({
    meta: [
      { title: "Yoga for PCOD & PCOS — A Therapeutic Approach | Yog Jivan" },
      { name: "description", content: "Therapeutic yoga for PCOD and PCOS with Master Anil Choudhary — pranayama, gentle strengthening and stress reduction. Studio in Hai Duong & live online. Free consultation." },
      { name: "keywords", content: "yoga for pcod, yoga for pcos, pcod yoga, pcos yoga, hormonal balance yoga, therapeutic yoga women, pcod yoga Hai Duong, online pcod yoga" },
      { property: "og:title", content: "Yoga for PCOD & PCOS — A Therapeutic Approach | Yog Jivan" },
      { property: "og:description", content: "Gentle, consistent yoga for hormonal balance — supporting medical care. Studio & online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: masterImages.rabbitPose },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for PCOD & PCOS | Yog Jivan" },
      { name: "twitter:description", content: "Therapeutic yoga supporting hormonal balance. Free consultation." },
      { name: "twitter:image", content: masterImages.rabbitPose },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: QUESTIONS.map((f) => ({
            "@type": "Question", name: f.q,
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
      eyebrow="Therapeutic · Hormonal Balance"
      heroTitle="Yoga for PCOD & PCOS — A Therapeutic Approach"
      heroSub="Gentle, consistent yoga with Master Anil Choudhary — supporting hormonal balance alongside your medical care. Studio in Hai Duong and live online worldwide."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for PCOD & PCOS"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote={CAUTION}
      quote={{
        text: "For the first time in years my cycle feels predictable again. My doctor is happy, and I finally feel like I'm doing something for myself — not just taking pills.",
        source: "Online Student · India",
      }}
      breatherImages={[
        { src: masterImages.rabbitPose, alt: "Gentle restorative posture supporting pelvic and hormonal balance", caption: "Restorative practice · pelvic circulation" },
        { src: masterImages.savasanaClass, alt: "Students in deep restorative rest at the close of a therapeutic class", caption: "Closing rest · nervous-system reset" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Certified Indian Yoga Master and therapeutic yoga teacher"
      masterIntro={
        <>
          <p>Master Anil has supported hundreds of women through PCOD, PCOS and cycle-related concerns over 12+ years of therapeutic teaching. His approach is patient and longitudinal — measured across months and cycles, not single sessions — because that is how hormonal systems actually respond.</p>
          <p>His teaching principle for hormonal work: <span className="italic text-gold-gradient">"The endocrine system does not respond to urgency. It responds to rhythm — of breath, sleep, meals and practice — repeated kindly, over time."</span></p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-stress", label: "Yoga for Stress Relief" },
        { to: "/period-safe-yoga", label: "Period-Safe Yoga" },
        { to: "/yoga-for-thyroid", label: "Yoga for Thyroid Health" },
        { to: "/personal-training", label: "1-on-1 Therapeutic Sessions" },
      ]}
      ctaTitle="Support your cycle. Support yourself."
      ctaSub="Book a free consultation with Master Anil to design a therapeutic PCOD or PCOS practice that fits your body."
    />
  );
}
