import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages } from "@/lib/images";

const CANONICAL = "https://www.yogjivan.com/period-safe-yoga";

const ANSWER_CAPSULE =
  "Master Anil teaches period-safe yoga as a gentle, cycle-aware practice — softer sequencing during menstruation, restorative postures that ease common discomfort, and clear guidance on which practices to modify or skip on heavier days. Sessions are small-batch or private so nothing is generic; your teacher knows where you are in your cycle and adapts the class accordingly. In-studio in Hai Duong, Vietnam and live online worldwide. This is yoga that honours the body, not overrides it.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Trained in classical Hatha and therapeutic sequencing for women" },
  { icon: Stethoscope, label: "12+ years teaching cycle-aware practice — from teens to menopause" },
  { icon: Users, label: "Small-batch and private — every practice adapted to your cycle" },
  { icon: Globe2, label: "Studio in Hai Duong · Live online for global students" },
  { icon: Award, label: "Trauma-aware, dignity-first — no forced ranges, no shame" },
  { icon: ShieldCheck, label: "Clear guidance on what to modify or skip on heavier days" },
];

const QUESTIONS: QA[] = [
  {
    q: "Is It Safe to Practice Yoga During Your Period?",
    answer:
      "Yes, for most women — and for many it actively helps. A gentle, well-sequenced practice can ease cramps, lower back tension, mood swings and heavy fatigue. The important word is 'gentle'. During menstruation, the body's natural downward energy (apana) should be supported, not disrupted, so we set aside the strong inversions and intense abdominal work and focus instead on soft, grounding postures. If bleeding is very heavy, painful beyond your normal, or a doctor has advised rest, please honour that guidance first — yoga can always resume in a few days.",
    bullets: [
      "Yes for most women — a gentle practice often eases cramps and low-back tension.",
      "Support the body's natural downward flow (apana) rather than disrupting it.",
      "Skip strong inversions and intense abdominal work on bleeding days.",
      "Rest fully if bleeding is unusually heavy, painful, or a doctor advises so.",
      "Return to your normal practice gently over 2–3 days as bleeding settles.",
    ],
  },
  {
    q: "What Poses Should Be Avoided or Modified?",
    answer:
      "During menstruation, the traditional guidance is to avoid or modify anything that strongly reverses the body's natural downward energy. That means skipping full inversions like Sarvangasana (shoulder stand), Sirsasana (headstand) and Halasana (plough), setting aside strong abdominal work like Navasana and intense core sequences, and skipping deep twists or long-held strong backbends. Fast, heating flows are usually not helpful on heavier days. If you're unsure about a pose, the honest rule is: if it feels effortful today, choose a softer version — nothing is worth being pushed through.",
    bullets: [
      "Skip: full inversions — Sarvangasana, Sirsasana, Halasana.",
      "Skip: strong core work — Navasana and intense abdominal sequences.",
      "Modify: deep twists and long-held strong backbends — go gentler or skip.",
      "Modify: fast heating flows — swap for slower, breath-led sequencing.",
      "General rule: if it feels effortful today, choose a softer version.",
    ],
  },
  {
    q: "What Poses Can Help With Period Discomfort?",
    answer:
      "Several gentle postures reliably help with the most common period symptoms. Supported forward folds (Balasana — child's pose, Upavistha Konasana — wide-leg forward fold) ease lower-back tension and cramps. Reclining postures with a bolster (supported Supta Baddha Konasana) settle the nervous system and calm the pelvic area. Gentle cat-cow and hip circles keep the low back moving without strain. Bhramari and long exhale pranayama noticeably reduce mood irritability. And a longer closing rest — even ten quiet minutes on your back with a folded blanket over the belly — is often the single most helpful thing you can do.",
    bullets: [
      "Supported Child's Pose (Balasana) — releases lower-back tension.",
      "Supported Supta Baddha Konasana — calms the pelvic area and nervous system.",
      "Gentle Cat-Cow and hip circles — keep the low back mobile without strain.",
      "Upavistha Konasana (wide-leg seated fold) — soft, unforced hip release.",
      "Bhramari and long-exhale breath — measurably eases mood irritability.",
      "A longer closing rest — often the most helpful thing of all.",
    ],
  },
  {
    q: "How Does Yog Jivan Adapt Classes for This?",
    answer:
      "Every student at Yog Jivan is invited (never pressured) to share where they are in their cycle before class — a quick, private note. Master Anil then offers modifications in real time — a gentler variation, a supported alternative, or a soft rest — so no one is ever left choosing between practising strongly on a heavier day or skipping class entirely. Because our batches are small (max 8) and every online student is on camera, adaptations are personal, not generic. This is the whole point of small-batch teaching.",
    bullets: [
      "Invited (never required) to share where you are in your cycle at the start of class.",
      "Real-time modifications offered — softer variations, supported alternatives, or rest.",
      "Small batches (max 8) means adaptation is personal, not generic.",
      "Applies equally to in-studio and live online students.",
      "You never have to choose between practising strongly or skipping entirely.",
    ],
  },
];

export const Route = createFileRoute("/period-safe-yoga")({
  head: () => ({
    meta: [
      { title: "Period-Safe Yoga — Cycle-Aware Practice | Yog Jivan" },
      { name: "description", content: "Cycle-aware, period-safe yoga with Master Anil Choudhary — which poses to modify, which to skip, and which to lean into. Studio in Hai Duong & live online. Free consultation." },
      { name: "keywords", content: "period-safe yoga, yoga during period, menstruation yoga, cycle-aware yoga, yoga for cramps, safe yoga on period, women's yoga Hai Duong" },
      { property: "og:title", content: "Period-Safe Yoga — Practice Safely Through Your Cycle | Yog Jivan" },
      { property: "og:description", content: "Gentle, cycle-aware yoga — small-batch, personalized, in-studio and online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: masterImages.rabbitPose },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Period-Safe Yoga | Yog Jivan" },
      { name: "twitter:description", content: "Cycle-aware, period-safe yoga with Master Anil. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Period-Safe Yoga", item: CANONICAL },
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
      heroTitle="Period-Safe Yoga — Practice Safely Through Your Cycle"
      heroSub="A gentle, cycle-aware practice with Master Anil Choudhary — small-batch modifications, no shame, no pressure. Studio in Hai Duong and live online worldwide."
      answerCapsule={ANSWER_CAPSULE}
      h1="Period-Safe Yoga"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      quote={{
        text: "It's the first time a yoga class has ever treated my cycle like it's real. I don't dread heavier days on my mat anymore.",
        source: "Online Student · Vietnam",
      }}
      breatherImages={[
        { src: masterImages.rabbitPose, alt: "Gentle restorative posture supporting the pelvic area", caption: "Restorative practice · pelvic ease" },
        { src: masterImages.savasanaClass, alt: "Students resting deeply at the close of a gentle class", caption: "Closing rest · unhurried, always" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Certified Indian Yoga Master and therapeutic yoga teacher"
      masterIntro={
        <>
          <p>Master Anil has taught cycle-aware yoga for 12+ years — to teenagers, working women, mothers and students moving through perimenopause. His approach is grounded in respect: the body already knows what it needs, and a teacher's job is to notice that and adapt the class kindly, not to override it.</p>
          <p>His teaching principle for period work: <span className="italic text-gold-gradient">"A period is not a problem to solve. It is a rhythm to honour."</span></p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Relief" },
        { to: "/personal-training", label: "1-on-1 Sessions" },
      ]}
      ctaTitle="Honour the rhythm."
      ctaSub="Book a free consultation with Master Anil to begin a cycle-aware practice that meets you where you are."
    />
  );
}
