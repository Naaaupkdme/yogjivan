import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-thyroid";

const ANSWER_CAPSULE =
  "Yog Jivan offers a gentle, supportive yoga practice for people living with a thyroid condition — alongside medical care, never in place of it. Thyroid diagnosis, medication and lab monitoring belong with your doctor. What a consistent practice can offer is regular gentle movement, simple breathing, relaxation and a sustainable weekly routine, adapted to your energy and comfort on the day. Available in-studio in Hai Duong, Vietnam with the Yog Jivan teaching team, and live online worldwide. We make no claims about yoga affecting thyroid function, hormones or metabolism, and individual experience varies.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: Stethoscope, label: "12+ years teaching yoga — beginner to advanced practice" },
  { icon: Users, label: "Private or small-group attention — practice adapted to your energy today" },
  { icon: Globe2, label: "Studio in Hai Duong · Live online for global students" },
  { icon: Award, label: "Combines asana, pranayama, meditation and a sustainable weekly rhythm" },
  { icon: ShieldCheck, label: "Alignment-first — inversions modified or skipped, never forced" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can I Practise Yoga If I Have a Thyroid Condition?",
    answer:
      "Many people with a thyroid condition practise yoga as part of general wellbeing, alongside their medical care. Yoga is not a treatment and does not replace prescribed care — your thyroid condition is managed by your doctor. What a consistent, gentle practice can offer is regular movement, a calmer daily rhythm and time for rest. Individual experience varies, and any change to medication or treatment is a decision for your clinician.",
    bullets: [
      "Regular, gentle movement at a pace that suits your energy.",
      "Simple breathing practices and an unhurried closing rest.",
      "A sustainable weekly routine you can keep on lower-energy days.",
      "Practice adapted to how you feel on the day rather than a fixed plan.",
      "Sits alongside your medical care — never in place of it.",
    ],
  },
  {
    q: "What Does the Practice Usually Include?",
    answer:
      "A gentle, breath-led sequence: soft joint mobility, supported postures, comfortable seated and reclining work, simple pranayama such as ujjayi or bhramari, and an unhurried closing rest. Shoulder-stand-family postures are part of traditional Hatha, but they are always optional and are modified or replaced where your neck, blood pressure or comfort make them unsuitable. Nothing is forced, and everything is offered in stages.",
    bullets: [
      "Soft joint mobility to begin gradually.",
      "Supported postures using bolster, blocks or a wall where helpful.",
      "Optional shoulder-stand-family variations — modified or replaced as needed.",
      "Simple pranayama such as ujjayi and bhramari.",
      "A longer closing rest to finish settled rather than activated.",
      "Never forced. Never rushed. Always adapted to your energy today.",
    ],
  },
  {
    q: "What Happens Before My First Session?",
    answer:
      "We have a short practice-safety conversation — how much practice experience you have, what your energy is usually like, and any injury, limitation or clinician instruction that affects how you should move. We do not ask for lab values, medication doses or your medical history. If your doctor has given you specific movement guidance, share that and your teacher will work within it.",
    bullets: [
      "A short practice-safety conversation before you begin.",
      "Share only what is relevant: limitations, comfort and clinician instructions.",
      "We do not ask for lab results, medication doses or medical history.",
      "Sequencing adapted to your current energy — never a generic plan.",
      "An optional short home practice for lower-energy days.",
    ],
  },
  {
    q: "Is This a Replacement for Medical Treatment?",
    answer:
      "No. Thyroid conditions require ongoing medical management with a doctor, including prescribed medication and regular lab monitoring. Please do not stop or reduce medication based on how yoga makes you feel. Yoga at Yog Jivan is a supportive movement and relaxation practice for general wellbeing — it complements medical care and never replaces it.",
    bullets: [
      "Continue medical care with your endocrinologist or GP.",
      "Never stop or reduce thyroid medication based on how yoga feels.",
      "Diagnosis, medication and lab monitoring belong with medical professionals.",
      "Yoga complements — it never replaces — prescribed treatment.",
      "Tell your teacher about any limitation or clinician instruction that affects practice.",
    ],
  },
];

const CAUTION =
  "Thyroid conditions require ongoing medical management and lab monitoring. Please continue seeing your doctor and keep taking prescribed medication; yoga at Yog Jivan is a supportive movement practice, not treatment. If you have uncontrolled blood pressure, glaucoma, a recent neck injury or are pregnant, tell your teacher so shoulder-stand-family postures can be replaced with gentler alternatives.";

export const Route = createFileRoute("/yoga-for-thyroid")({
  head: () => ({
    meta: [
      { title: "Yoga for People Living With Thyroid Conditions | Yog Jivan" },
      { name: "description", content: "Gentle, supportive yoga for people living with a thyroid condition — alongside your medical care. Hai Duong studio and live online. Free consultation." },
      { name: "keywords", content: "yoga for thyroid, thyroid yoga, yoga with hypothyroidism, yoga with hyperthyroidism, gentle yoga thyroid, thyroid yoga Hai Duong" },
      { property: "og:title", content: "Yoga for People Living With Thyroid Conditions | Yog Jivan" },
      { property: "og:description", content: "Gentle, consistent yoga for general wellbeing alongside your medical care. Studio & online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.wallSeated),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga With a Thyroid Condition | Yog Jivan" },
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
            { "@type": "ListItem", position: 2, name: "Yoga With a Thyroid Condition", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: ThyroidPage,
});

function ThyroidPage() {
  return (
    <TherapeuticLanding
      eyebrow="Supportive Yoga · Alongside Medical Care"
      heroTitle="Yoga for People Living With Thyroid Conditions"
      heroSub="Gentle, consistent yoga with the Yog Jivan teaching team — a supportive wellbeing practice alongside your medical care. Studio in Hai Duong and live online worldwide."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga With a Thyroid Condition"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote={CAUTION}
      breatherImages={[
        { src: masterImages.wallSeated, alt: "Student in a supported seated stretch by the studio window", caption: "Supported, gentle practice" },
        { src: masterImages.savasanaClass, alt: "Students resting in Savasana at the close of a gentle class", caption: "Closing Savasana · unhurried rest" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Yog Jivan"
      masterIntro={
        <>
          <p>Yog Jivan was founded and is led by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years teaching classical Indian yoga — Hatha, Ashtanga and pranayama. Studio and private sessions are delivered by the Yog Jivan teaching team, with each student matched to a suitable teacher.</p>
          <p>Our approach here is patient and practical: work within whatever guidance your clinician has given you, adapt the practice to your energy each day, and build a routine that is realistic to keep over months.</p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Support" },
        { to: "/private-online-yoga", label: "Private 1-on-1 Yoga" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
      ]}
      relatedPosts={[
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
        { slug: "yoga-for-sustainable-fat-loss", title: "Yoga for sustainable fat loss (without burnout)", cat: "Weight Loss", read: "8 min" },
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
      ]}
      ctaTitle="Steadiness, not urgency."
      ctaSub="Book a free consultation with the Yog Jivan team to plan a supportive practice that fits around your medical care."
    />
  );
}
