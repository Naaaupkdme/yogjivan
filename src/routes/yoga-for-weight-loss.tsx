import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-weight-loss";

const ANSWER_CAPSULE =
  "Weight loss through yoga is not a quick-fix — it is a whole-body approach built on consistency, strength, mindful eating and better sleep. Master Anil's method combines a stronger, more active asana practice (Ashtanga-inspired flows, standing holds, core work) with breath work that improves digestion, and a supporting Holistic Lifestyle Consultation covering rhythm, food and rest. Available in-studio in Hai Duong, Vietnam and live online worldwide. Sustainable change over months, not dramatic promises in weeks.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Certified in classical Hatha and Ashtanga — strength-building lineages" },
  { icon: Stethoscope, label: "12+ years supporting sustainable body composition change" },
  { icon: Users, label: "Realistic guidance — no fad plans, no shame, no dramatic promises" },
  { icon: Globe2, label: "Live online means you never miss a session while travelling" },
  { icon: Award, label: "Integrates asana, pranayama, sleep and Holistic Lifestyle Consultation" },
  { icon: ShieldCheck, label: "Small-batch coaching — form and consistency over intensity" },
];

const QUESTIONS: QA[] = [
  {
    q: "Does Yoga Actually Help With Weight Loss?",
    answer:
      "It can be a useful part of an active lifestyle, though not in the way fitness marketing usually frames it. A regular practice builds strength and mobility, supports a calmer wind-down at the end of the day, and helps many students become more aware of how they eat and move. It works best as a sustained habit rather than a weekly workout. Individual results vary, and we do not promise a particular amount of weight loss.",
    bullets: [
      "Builds functional strength and mobility that make other activity easier.",
      "Supports a calmer end to the day, which many students find helps their sleep habits.",
      "Breathing practice and gentle twists are a comfortable, low-impact part of the routine.",
      "Trains awareness around hunger, satiety and stress-eating.",
      "Works as a lifestyle habit rather than a short programme.",
    ],
  },
  {
    q: "What Type of Yoga Is Best for Weight Loss?",
    answer:
      "A blended approach outperforms any single style. Ashtanga-inspired vinyasa builds cardiovascular demand and strength; classical Hatha with long holds builds deep muscular endurance; core-focused sequences reshape the midsection; and closing pranayama plus meditation gives the session a settled finish. Master Anil weaves these into one coherent weekly plan rather than making you pick a style.",
    bullets: [
      "Ashtanga-inspired vinyasa — cardiovascular demand, sweat, sustained flow.",
      "Classical Hatha long holds — deep muscular endurance and postural strength.",
      "Core-focused sequences — steady abdominal and postural strength work.",
      "Closing pranayama & meditation — a calm, settled finish to each session.",
      "One coherent weekly plan, not a random pick from ten class types.",
    ],
  },
  {
    q: "How Is Yog Jivan's Approach Different From a Typical Gym Program?",
    answer:
      "A typical gym program treats weight loss as calories in versus calories out and hopes willpower does the rest. Yog Jivan treats weight loss as a full-system project — asana for strength, pranayama for a calmer daily rhythm, meditation for the habit side of eating, and a conversation about sleep and daily routine. It is usually slower in the first month and easier to sustain over a year. There is no shaming and no punishing intensity. For individual dietary guidance, please speak to a registered dietitian or your doctor.",
    bullets: [
      "Considers movement, breathing, sleep and daily routine — not just training hours.",
      "Includes a conversation about routine; personalised diet plans come from your dietitian.",
      "No shaming and no punishing intensity.",
      "Slower at first, and easier to sustain across a year.",
      "Small-batch coaching — form and consistency over ego and injury risk.",
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
      { title: "Yoga for Weight Loss — Whole-Body Approach | Yog Jivan" },
      { name: "description", content: "Sustainable yoga for weight loss with Master Anil — strength, breath and lifestyle. Studio in Hai Duong and live online. Book a free consultation." },
      { name: "keywords", content: "yoga for weight loss, weight loss yoga, ashtanga weight loss, holistic weight loss, sustainable weight loss yoga, yoga fitness Hai Duong, online weight loss yoga" },
      { property: "og:title", content: "Yoga for Weight Loss — A Sustainable, Whole-Body Approach | Yog Jivan" },
      { property: "og:description", content: "Yoga, breath, sleep and lifestyle — the honest way to lasting body composition change. Studio & online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.warriorClass),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Weight Loss | Yog Jivan" },
      { name: "twitter:description", content: "Sustainable, whole-body approach to weight loss through yoga. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Weight Loss", item: CANONICAL },
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
      heroTitle="Yoga for Weight Loss — A Sustainable, Whole-Body Approach"
      heroSub="Master Anil's method blends stronger asana, breath work, sleep and the Holistic Lifestyle Consultation — for real change that lasts beyond the first month."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Weight Loss"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      breatherImages={[
        { src: masterImages.warriorClass, alt: "Master Anil leading a strong Warrior II sequence for a group class", caption: "Standing strength · warrior sequence" },
        { src: masterImages.studioSplit, alt: "Deep seated forward-fold work building endurance and body awareness", caption: "Endurance work · Hai Duong studio" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, lifestyle mentor"
      masterIntro={
        <>
          <p>Master Anil has guided long-term students through sustainable body-composition change without crash plans or shame-based coaching. The results that last, in his experience, are always the ones where sleep, meals and daily rhythm change alongside the practice — which is why every weight-loss journey at Yog Jivan is paired with a Holistic Lifestyle Consultation.</p>
          <p>His teaching principle for weight work: <span className="italic text-gold-gradient">"The body lets go of weight when the life around it feels safe. Not before."</span></p>
        </>
      }
      relatedLinks={[
        { to: "/programs", label: "Holistic Lifestyle Consultation" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Relief" },
        { to: "/private-online-yoga", label: "1-on-1 Personal Training" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
      ]}
      relatedPosts={[
        { slug: "yoga-for-sustainable-fat-loss", title: "Yoga for sustainable fat loss (without burnout)", cat: "Weight Loss", read: "8 min" },
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
      ]}
      ctaTitle="Change that actually lasts."
      ctaSub="Book a free consultation with the Yog Jivan team to design a sustainable weight and lifestyle plan."
    />
  );
}
