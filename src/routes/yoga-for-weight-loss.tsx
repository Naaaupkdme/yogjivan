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
      "Yes, but not the way most fitness marketing frames it. Yoga supports weight loss in four overlapping ways: it builds functional lean muscle (which lifts your resting metabolism), it reduces cortisol and improves sleep (both of which quietly drive weight gain when disrupted), it improves digestion through breath and twist work, and — most importantly — it changes the relationship to eating so overeating and stress-eating naturally fade. It works best as a lifestyle, not a weekly workout.",
    bullets: [
      "Builds functional lean muscle that raises baseline metabolism.",
      "Lowers cortisol and improves sleep — both major hidden drivers of weight gain.",
      "Pranayama and twist sequences meaningfully improve digestion.",
      "Trains awareness around hunger, satiety and stress-eating.",
      "Works as a lifestyle — the results compound quietly over months.",
    ],
  },
  {
    q: "What Type of Yoga Is Best for Weight Loss?",
    answer:
      "A blended approach outperforms any single style. Ashtanga-inspired vinyasa builds cardiovascular demand and strength; classical Hatha with long holds builds deep muscular endurance; core-focused sequences reshape the midsection; and closing pranayama plus meditation regulates the appetite hormones (ghrelin, leptin) that dictate hunger. Master Anil weaves all four into one coherent weekly plan rather than making you pick a style.",
    bullets: [
      "Ashtanga-inspired vinyasa — cardiovascular demand, sweat, sustained flow.",
      "Classical Hatha long holds — deep muscular endurance and postural strength.",
      "Core-focused sequences — real midsection re-shaping (not just crunches).",
      "Closing pranayama & meditation — regulates hunger and satiety hormones.",
      "One coherent weekly plan, not a random pick from ten class types.",
    ],
  },
  {
    q: "How Is Yog Jivan's Approach Different From a Typical Gym Program?",
    answer:
      "A typical gym program treats weight loss as calories in versus calories out and hopes willpower does the rest. Yog Jivan treats weight loss as a full-system project — asana for strength, pranayama for digestion and stress, meditation for the emotional side of eating, and our Holistic Lifestyle Consultation to align sleep, meals and daily rhythm. It is slower on the scale in the first month, more sustainable across the next twelve. There is no shaming, no punishing intensity, no rebound.",
    bullets: [
      "Full-system: body, breath, mind, sleep, meals — not just calories.",
      "Includes the Holistic Lifestyle Consultation to align rhythm and food.",
      "No shaming, no punishing intensity, no crash-diet rebound cycle.",
      "Slower month one, dramatically more sustainable across a year.",
      "Small-batch coaching — form and consistency over ego and injury risk.",
    ],
  },
  {
    q: "How Soon Can I Expect Results?",
    answer:
      "Realistic first: you'll feel changes long before you see them. In the first 2–3 weeks, most students report better sleep, calmer cravings, easier breathing and more energy through the day. Visible body-composition changes typically begin around weeks 6–8 with 3 sessions per week plus honest lifestyle work. Real, lasting change — the kind that doesn't reverse the moment life gets busy — settles in over 3–6 months. Anyone promising you a specific number in a specific week is selling, not teaching.",
    bullets: [
      "Weeks 1–3: better sleep, calmer cravings, more daily energy.",
      "Weeks 4–6: strength gains, posture change, clothes fitting differently.",
      "Weeks 6–8: visible body-composition change with consistent practice.",
      "Months 3–6: real, lasting change that doesn't reverse when life gets busy.",
      "Anyone promising a specific number in a specific week is selling, not teaching.",
    ],
  },
];

export const Route = createFileRoute("/yoga-for-weight-loss")({
  head: () => ({
    meta: [
      { title: "Yoga for Weight Loss — Sustainable, Whole-Body Approach | Yog Jivan" },
      { name: "description", content: "Sustainable yoga for weight loss with Master Anil Choudhary — strength, breath, sleep and holistic lifestyle. Studio in Hai Duong & live online. Book a free consultation." },
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
      quote={{
        text: "I finally stopped starting over. The weight came off slowly, but this time it stayed — because everything else in my life got calmer too.",
        source: "Long-term Student · Online Community",
      }}
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
        { to: "/personal-training", label: "1-on-1 Personal Training" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
      ]}
      relatedPosts={[
        { slug: "yoga-for-sustainable-fat-loss", title: "Yoga for sustainable fat loss (without burnout)", cat: "Weight Loss", read: "8 min" },
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
      ]}
      ctaTitle="Change that actually lasts."
      ctaSub="Book a free consultation with Master Anil to design a sustainable weight and lifestyle plan."
    />
  );
}
