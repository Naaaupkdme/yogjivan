import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-stress";

const ANSWER_CAPSULE =
  "Yog Jivan's stress-support practice combines gentle movement, pranayama (breath work) and meditation as a calm, unhurried part of your week. Sessions typically pair a soft asana sequence with simple breathing practices such as nadi shodhana, bhramari and extended-exhale breath, and close with a settled meditation and rest. Available in-studio in Hai Duong, Vietnam with the Yog Jivan teaching team, and live online worldwide. This is a wellbeing practice, not treatment for anxiety, burnout or insomnia; individual experience varies, and for a diagnosed condition please continue care with your clinician.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: Stethoscope, label: "12+ years teaching yoga, breath work and meditation" },
  { icon: Users, label: "Professionals, parents and students — practice adapted to real schedules" },
  { icon: Globe2, label: "Live-online support across timezones for a global community" },
  { icon: Award, label: "Gentle pacing — practices are never forced, always optional" },
  { icon: ShieldCheck, label: "Every session ends with rest, not intensity" },
];

const QUESTIONS: QA[] = [
  {
    q: "How Can Yoga Support You With Stress?",
    answer:
      "A yoga session gives you a set hour where the pace slows down. Gentle movement releases everyday physical tension, simple breathing practices give you something steady to hold on to, and a short meditation at the close lets the mind settle. Many people find this a useful part of looking after their general wellbeing. It is not a treatment for anxiety, burnout or insomnia, and individual experience varies.",
    bullets: [
      "Gentle movement to ease everyday physical tension.",
      "Simple, comfortable breathing practices you can also use at home.",
      "A short closing meditation and unhurried rest.",
      "A calm, predictable slot in a busy week.",
      "Simple tools you can return to whenever you want them.",
    ],
  },
  {
    q: "What's the Difference Between Yoga and Meditation Here?",
    answer:
      "Meditation is one part of what we teach; yoga as we practise it also includes movement and breath work. Some people find that sitting still straight away is difficult, and that moving gently first makes the sitting easier. That is why our stress-support sessions usually run in that order — movement, then breathing, then meditation. If you prefer to sit straight away, that is fine too; the practice is offered, never imposed.",
    bullets: [
      "Movement first, breathing second, meditation last — a sequence many people find easier.",
      "Meditation practices are kept short and approachable to start with.",
      "Breath work bridges the two and gives the mind a simple focus.",
      "No experience needed, and no expectation of stillness on day one.",
      "You choose the depth and length that suits you.",
    ],
  },
  {
    q: "How Often Should I Practise?",
    answer:
      "There is no required frequency and no promised outcome at any interval. Most people find that a rhythm they can actually keep matters more than an ambitious plan they abandon. Two or three sessions a week suits many schedules; one session a week plus a short home practice also works. If you want one, your teacher can suggest a simple daily routine of ten minutes as an optional habit.",
    bullets: [
      "Choose a rhythm you can sustain through a busy month.",
      "Two to three sessions a week suits many schedules.",
      "One weekly session plus a short home practice is a reasonable start.",
      "A ten-minute home routine is optional, not a requirement.",
      "Your teacher can help you plan something realistic.",
    ],
  },
  {
    q: "Can I Practise After a Long Work Day?",
    answer:
      "Yes. Evening sessions are deliberately gentler and more grounding, ending with supported postures and a longer rest rather than energising work. Live online classes make this practical even after a late finish, since there is no commute. Whether that helps you sleep is personal and varies from person to person — we would rather be honest about that than promise a result.",
    bullets: [
      "Evening sessions are gentler and more grounding by design.",
      "Ends with supported postures, long exhales and an unhurried rest.",
      "Live online means you can join from home right after work.",
      "Choose the times that fit your week rather than a fixed schedule.",
      "How it affects your evening is personal and varies.",
    ],
  },
];

export const Route = createFileRoute("/yoga-for-stress")({
  head: () => ({
    meta: [
      { title: "Yoga for Stress Support | Yog Jivan" },
      { name: "description", content: "Gentle yoga, pranayama and meditation for stress support and general wellbeing. Studio in Hai Duong and live online. Book a free consultation." },
      { name: "keywords", content: "yoga for stress, stress support yoga, pranayama for stress, meditation for stress, calming yoga, gentle evening yoga online" },
      { property: "og:title", content: "Yoga for Stress Support — Gentle Movement, Breath & Meditation | Yog Jivan" },
      { property: "og:description", content: "Gentle yoga, pranayama and meditation as part of looking after your wellbeing. Studio in Hai Duong & live online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.savasanaClass),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Stress Support | Yog Jivan" },
      { name: "twitter:description", content: "Gentle yoga, breath work and meditation for stress support. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Stress Support", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: StressPage,
});

function StressPage() {
  return (
    <TherapeuticLanding
      eyebrow="Gentle Movement · Breath · Meditation"
      heroTitle="Yoga for Stress Support — Slow Down, Breathe, Rest"
      heroSub="Pranayama, meditation and gentle asana with the Yog Jivan teaching team — in-studio in Hai Duong, Vietnam and live online worldwide. Unhurried practice for your general wellbeing."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Stress Support"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote="Yoga at Yog Jivan is a wellbeing practice, not treatment for anxiety, burnout, insomnia or any medical condition. If you are living with a diagnosed condition, or your wellbeing is causing you concern, please continue care with a qualified clinician and tell your teacher about anything that affects how you practise."
      breatherImages={[
        { src: masterImages.savasanaClass, alt: "Students resting in Savasana at the close of a gentle class", caption: "Closing Savasana · unhurried rest" },
        { src: masterImages.rabbitPose, alt: "Gentle restorative posture in the sanctuary studio", caption: "Restorative practice · Hai Duong studio" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Yog Jivan"
      masterIntro={
        <>
          <p>Yog Jivan was founded and is led by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years teaching classical Indian yoga — Hatha, Ashtanga, pranayama and meditation. Studio and private sessions are delivered by the Yog Jivan teaching team, with each student matched to a suitable teacher.</p>
          <p>Stress-support sessions are unhurried and layered — gentle movement first, breath second, meditation third — because many people find that order easier to settle into than sitting still straight away.</p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-back-pain", label: "Yoga for Back Discomfort" },
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/yoga-for-thyroid", label: "Yoga with a Thyroid Condition" },
        { to: "/period-safe-yoga", label: "Cycle-Aware Yoga" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/yoga-for-beginners", label: "New to Yoga? Start Here" },
      ]}
      relatedPosts={[
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "A simple breathing practice for beginners", cat: "Wellness", read: "4 min" },
        { slug: "beginners-guide-to-20-minutes-of-stillness", title: "Meditation for beginners: 5, 10 or 20 minutes", cat: "Meditation", read: "6 min" },
        { slug: "desk-worker-yoga-back-neck-shoulders", title: "A practical yoga and mobility routine for desk workers", cat: "Mobility", read: "8 min" },
        { slug: "therapeutic-yoga-benefits", title: "Personalised supportive yoga: what it is and what it is not", cat: "Health", read: "8 min" },
      ]}
      ctaTitle="Breathe. Rest. Come back to yourself."
      ctaSub="Book a free consultation with the Yog Jivan team to plan a calm, sustainable practice."
    />
  );
}
