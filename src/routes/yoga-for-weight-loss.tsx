import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-weight-loss";

const ANSWER_CAPSULE =
  "Yoga can be one part of an active, sustainable lifestyle rather than a weight-loss programme. At Yog Jivan the focus is movement, strength, mobility, consistency and body awareness — a stronger asana practice (Ashtanga-inspired flows, standing holds, core work), breath work, and a calm close to each session. Available in-studio in Hai Duong, Vietnam with the Yog Jivan teaching team, and live online worldwide. We do not promise weight or body-composition change; individual results vary, and personalised nutrition or diet planning belongs with a registered dietitian or your doctor.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: Stethoscope, label: "12+ years teaching yoga — beginner to advanced practice" },
  { icon: Users, label: "Realistic guidance — no fad plans, no shame, no dramatic promises" },
  { icon: Globe2, label: "Live online means you can keep practising while travelling" },
  { icon: Award, label: "Combines asana, pranayama and general lifestyle-routine conversation" },
  { icon: ShieldCheck, label: "Form and consistency over intensity" },
];

const QUESTIONS: QA[] = [
  {
    q: "Is Yoga Useful If My Goal Is Weight Management?",
    answer:
      "It can be a useful part of an active lifestyle, though not in the way fitness marketing usually frames it. A regular practice builds strength and mobility, gives your week a consistent movement habit, and helps many students become more aware of how they move and rest. It works best as a sustained habit rather than a weekly workout. Individual results vary, and we do not promise any amount of weight change.",
    bullets: [
      "Builds functional strength and mobility that make other activity easier.",
      "Gives your week a consistent, low-pressure movement habit.",
      "Breathing practice and gentle twists are a comfortable part of the routine.",
      "Encourages general body awareness.",
      "Works as a lifestyle habit rather than a short programme.",
    ],
  },
  {
    q: "What Type of Yoga Suits an Active Lifestyle?",
    answer:
      "A blended approach usually suits people best. Ashtanga-inspired vinyasa builds pace and strength; classical Hatha with long holds builds muscular endurance; core-focused sequences add steady abdominal and postural work; and closing pranayama plus meditation gives the session a settled finish. Your teacher weaves these into one coherent weekly plan rather than making you pick a style.",
    bullets: [
      "Ashtanga-inspired vinyasa — pace, effort and sustained flow.",
      "Classical Hatha long holds — muscular endurance and postural strength.",
      "Core-focused sequences — steady abdominal and postural strength work.",
      "Closing pranayama and meditation — a calm, settled finish.",
      "One coherent weekly plan, not a random pick from ten class types.",
    ],
  },
  {
    q: "How Is Yog Jivan's Approach Different From a Typical Gym Program?",
    answer:
      "A typical gym program treats training hours as the whole picture. At Yog Jivan the practice is the focus, and we may also talk generally about daily routine, rest and consistency as ordinary lifestyle habits — not as clinical advice. There is no shaming and no punishing intensity. For individual dietary guidance, please speak to a registered dietitian or your doctor.",
    bullets: [
      "Considers movement, breathing and daily routine, not just training hours.",
      "General routine conversation only; personalised diet plans come from your dietitian.",
      "No shaming and no punishing intensity.",
      "Built to be sustainable across a year.",
      "Form and consistency over ego and injury risk.",
    ],
  },
  {
    q: "How Soon Can I Expect Results?",
    answer:
      "Honestly, it varies from person to person and we cannot give you a timeline. Some students say they notice easier movement or steadier energy fairly early; others notice change more slowly. Body composition depends on many factors beyond yoga, including nutrition, sleep, medical conditions and medication. Anyone promising a specific number in a specific week is selling, not teaching.",
    bullets: [
      "Early on, many students simply report that movement feels easier.",
      "With consistency, strength and postural awareness generally improve.",
      "Body-composition change depends on many personal factors, not yoga alone.",
      "A routine you can keep through a busy month matters more than an intense one you drop.",
      "Anyone promising a specific number in a specific week is selling, not teaching.",
    ],
  },
];

export const Route = createFileRoute("/yoga-for-weight-loss")({
  head: () => ({
    meta: [
      { title: "Yoga for Weight Management & an Active Lifestyle | Yog Jivan" },
      { name: "description", content: "Yoga as one part of an active, sustainable lifestyle — strength, mobility and consistency. Studio in Hai Duong and live online. Book a free consultation." },
      { name: "keywords", content: "yoga for weight loss, weight management yoga, ashtanga yoga strength, sustainable yoga practice, yoga fitness Hai Duong, online yoga strength" },
      { property: "og:title", content: "Yoga for Weight Management & an Active Lifestyle | Yog Jivan" },
      { property: "og:description", content: "Strength, mobility, consistency and body awareness — yoga as part of an active lifestyle. Studio & online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.warriorClass),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Weight Management | Yog Jivan" },
      { name: "twitter:description", content: "Yoga as part of an active, sustainable lifestyle. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Weight Management", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: WeightLossPage,
});

function WeightLossPage() {
  return (
    <TherapeuticLanding
      eyebrow="Strength · Consistency · Lifestyle"
      heroTitle="Yoga for Weight Management & an Active Lifestyle"
      heroSub="Stronger asana, breath work and a consistent weekly rhythm with the Yog Jivan teaching team — one part of an active lifestyle, in-studio in Hai Duong and live online."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Weight Management"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote="Yoga at Yog Jivan is a movement practice, not a medical or weight-loss treatment, and we make no promises about weight or body-composition change. For individual nutrition or diet planning, please consult a registered dietitian or your doctor, and tell your teacher about any injury, limitation or clinician instruction that affects how you practise."
      breatherImages={[
        { src: masterImages.warriorClass, alt: "A strong Warrior II sequence during a Yog Jivan group class", caption: "Standing strength · warrior sequence" },
        { src: masterImages.studioSplit, alt: "Deep seated forward-fold work building endurance and body awareness", caption: "Endurance work · Hai Duong studio" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Yog Jivan"
      masterIntro={
        <>
          <p>Yog Jivan was founded and is led by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years teaching classical Indian yoga — Hatha, Ashtanga and pranayama. Studio and private sessions are delivered by the Yog Jivan teaching team, with each student matched to a suitable teacher.</p>
          <p>The approach here is unglamorous on purpose: a practice you can keep, at a pace you can sustain, without crash plans or shame-based coaching. Where individual nutrition matters to your goals, we will point you to a registered dietitian or your doctor.</p>
        </>
      }
      relatedLinks={[
        { to: "/programs", label: "Programs & Sessions" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Support" },
        { to: "/private-online-yoga", label: "1-on-1 Personal Training" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
      ]}
      relatedPosts={[
        { slug: "yoga-for-sustainable-fat-loss", title: "Yoga for sustainable fat loss (without burnout)", cat: "Weight Loss", read: "8 min" },
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
      ]}
      ctaTitle="A practice you can keep."
      ctaSub="Book a free consultation with the Yog Jivan team to talk through your practice goals."
    />
  );
}
