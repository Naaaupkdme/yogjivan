import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages } from "@/lib/images";

const CANONICAL = "https://www.yogjivan.com/yoga-for-stress";

const ANSWER_CAPSULE =
  "Yog Jivan's approach to stress combines pranayama (breath work), meditation, and gentle physical practice to shift your nervous system out of chronic fight-or-flight. Master Anil pairs specific breathing techniques — nadi shodhana, bhramari, extended-exhale breath — with a calming asana sequence and closing meditation. Sessions are small-batch or private, available in-studio in Hai Duong, Vietnam and live online worldwide. Most students notice measurably calmer sleep and mood in the first 1–2 weeks.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Certified in classical Pranayama and Meditation lineages" },
  { icon: Stethoscope, label: "12+ years guiding students through anxiety, burnout and insomnia" },
  { icon: Users, label: "Executives, mothers, students — real people, real overwhelm" },
  { icon: Globe2, label: "Live-online support across timezones for a global community" },
  { icon: Award, label: "Trauma-aware — practices are never forced, always titrated" },
  { icon: ShieldCheck, label: "Every session ends grounded, not activated" },
];

const QUESTIONS: QA[] = [
  {
    q: "How Does Yoga Reduce Stress?",
    answer:
      "Yoga reduces stress through three distinct mechanisms working together. First, physical practice discharges the tension held in the body — tight jaw, locked shoulders, gripped diaphragm — that keeps the stress response looping. Second, controlled breathing (pranayama) directly signals the vagus nerve to shift the nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest). Third, meditation retrains the attention so daily stressors stop hijacking your inner state so easily. Together they change your baseline, not just how you feel in the room.",
    bullets: [
      "Physical practice discharges muscular armour that keeps the stress response looping.",
      "Extended-exhale breathing activates the vagus nerve, shifting you into rest-and-digest.",
      "Nadi shodhana (alternate-nostril breath) measurably balances autonomic tone.",
      "Bhramari (humming breath) lowers heart rate and quiets rumination in minutes.",
      "Meditation retrains attention so future stressors have less grip on you.",
    ],
  },
  {
    q: "What's the Difference Between Yoga and Meditation for Stress?",
    answer:
      "Meditation alone is powerful, but it works best on a body that isn't already in high alarm. If you're chronically wound up, sitting still often makes the anxiety louder before it gets quieter — which is why so many stressed people quit meditation early. Yoga first discharges the physical tension, then the pranayama down-regulates the nervous system, and only then does meditation become deep and steady. That's why Master Anil's stress sessions always run in that specific order.",
    bullets: [
      "Meditation on a wound-up body often amplifies anxiety before it calms it.",
      "Physical practice first discharges the tension holding the alarm in place.",
      "Pranayama bridges the body and the mind — the nervous system settles.",
      "Then meditation lands deep, not brittle.",
      "This layered sequence is why yoga-based stress work outperforms 'just meditate more'.",
    ],
  },
  {
    q: "How Often Should I Practice for Stress Relief?",
    answer:
      "For genuine, lasting stress reduction, three sessions per week is the practical sweet spot. Two is enough to feel a difference and start protecting your sleep. Once a week keeps you familiar with the tools but rarely shifts your baseline. If life allows only ten minutes daily, a short pranayama-and-meditation home reset — which Master Anil will teach you — outperforms one long weekly class you keep missing.",
    bullets: [
      "3× per week — the sweet spot for real nervous-system change within 4–6 weeks.",
      "2× per week — noticeable sleep and mood improvement; slower baseline shift.",
      "1× per week — good for tool-familiarity; rarely enough to shift baseline alone.",
      "Daily 10-minute home reset outperforms one long class you keep missing.",
      "Every student receives a personalized home practice map after the first session.",
    ],
  },
  {
    q: "Can I Practice After a Long Work Day?",
    answer:
      "Yes — in fact, evening practice is when stress relief lands most powerfully, because you're using the tools on the exact tension the day has just built. Master Anil's evening-friendly sessions are gentler, more grounding and end with restorative postures rather than energizing ones. You leave calmer than you arrived, sleep deeper that night, and start the next day with more capacity. Online classes make this feasible even after a 7 PM finish.",
    bullets: [
      "Evening practice discharges the exact tension the day built up.",
      "Sessions are gentle and grounding — restorative, not energizing.",
      "Ends with supported postures and long exhales, primes you for deeper sleep.",
      "Live online means you can join from home, no commute, right after work.",
      "Most working students schedule 2 evening + 1 weekend session per week.",
    ],
  },
];

export const Route = createFileRoute("/yoga-for-stress")({
  head: () => ({
    meta: [
      { title: "Yoga for Stress Relief — Calm Your Mind, Restore Balance | Yog Jivan" },
      { name: "description", content: "Yoga for stress and anxiety with Master Anil Choudhary — pranayama, meditation and gentle asana. Studio in Hai Duong & live online worldwide. Book a free consultation." },
      { name: "keywords", content: "yoga for stress, stress relief yoga, yoga for anxiety, pranayama for stress, meditation for stress, yoga for burnout, calming yoga, evening yoga online" },
      { property: "og:title", content: "Yoga for Stress Relief — Calm Your Mind, Restore Balance | Yog Jivan" },
      { property: "og:description", content: "Pranayama, meditation and gentle asana for genuine stress relief. Studio in Hai Duong & live online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: masterImages.savasanaClass },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Stress Relief | Yog Jivan" },
      { name: "twitter:description", content: "Yoga, breath work and meditation to shift out of chronic stress. Free consultation." },
      { name: "twitter:image", content: masterImages.savasanaClass },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Stress", item: CANONICAL },
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
      eyebrow="Stress · Anxiety · Sleep"
      heroTitle="Yoga for Stress Relief — Calm Your Mind, Restore Balance"
      heroSub="Pranayama, meditation and gentle asana with Master Anil Choudhary — in-studio in Hai Duong, Vietnam and live online worldwide. Genuine nervous-system rest, not another wellness trend."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Stress"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      quote={{
        text: "After eight weeks, I sleep through the night for the first time in three years. My inbox hasn't changed — I have.",
        source: "Linh Pham · Online Student · Hanoi, Vietnam",
      }}
      breatherImages={[
        { src: masterImages.savasanaClass, alt: "Students resting deeply in Savasana at the close of a stress-relief class", caption: "Closing Savasana · nervous-system rest" },
        { src: masterImages.rabbitPose, alt: "Gentle restorative posture in the sanctuary studio", caption: "Restorative practice · Hai Duong studio" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Certified Indian Yoga Master and meditation teacher"
      masterIntro={
        <>
          <p>Master Anil has taught pranayama and meditation to students living through everything from exam pressure and postpartum anxiety to executive burnout and grief. His stress-work is unhurried and layered — physical release first, breath second, meditation third — because that specific order is what actually shifts a chronically activated nervous system.</p>
          <p>His teaching principle for stress: <span className="italic text-gold-gradient">"You cannot think your way out of a body in alarm. You breathe your way out."</span></p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-back-pain", label: "Yoga for Back Pain" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/personal-training", label: "1-on-1 Sessions" },
        { to: "/yoga-for-beginners", label: "New to Yoga? Start Here" },
      ]}
      ctaTitle="Breathe. Rest. Come back to yourself."
      ctaSub="Book a free consultation with Master Anil to map a calming path for your nervous system."
    />
  );
}
