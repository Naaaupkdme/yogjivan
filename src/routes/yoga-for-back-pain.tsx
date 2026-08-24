import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-back-pain";

const ANSWER_CAPSULE =
  "Master Anil's therapeutic approach to back pain begins with a careful intake — where the pain is, what triggers it, and how long you've lived with it — followed by posture correction, gentle spinal decompression, targeted core and glute strengthening, and breath work to release protective muscle guarding. Sessions are small-batch or private so every posture is scaled to your body. Available in-studio in Hai Duong, Vietnam and live online worldwide. Most students feel meaningful relief within 3–6 weeks of consistent practice.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Founder & Lead Yoga Teacher — therapeutic, safety-first sequencing" },
  { icon: Stethoscope, label: "12+ years working with back pain, sciatica, disc issues and postural collapse" },
  { icon: Users, label: "Hundreds of back-pain students guided out of daily discomfort" },
  { icon: Globe2, label: "Studio students in Hai Duong · Online students in 20+ countries" },
  { icon: Award, label: "Trauma-aware, alignment-first — no forced ranges, no injury shortcuts" },
  { icon: ShieldCheck, label: "Written practice map + weekly progress check-ins" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can Yoga Really Help With Back Pain?",
    answer:
      "Yes — when the yoga is therapeutic, individually adjusted, and paced correctly. Most non-acute back pain is driven by three things a targeted practice can directly address: weak deep-core and glute muscles, chronic tightness in hips and hamstrings pulling the pelvis out of alignment, and shallow chest-only breathing that keeps the nervous system in guarded, tense mode. Master Anil's sessions work on all three, in that order, at a pace your body can absorb.",
    bullets: [
      "Rebuilds deep-core and glute support that takes load off the lumbar spine.",
      "Restores hip and hamstring mobility so the pelvis stops pulling the low back forward.",
      "Uses breath work to release protective muscle guarding around the injury.",
      "Teaches you the daily 10-minute reset you can do at home between sessions.",
      "Progress is reviewed together — how you are moving, sitting tolerance, and how you feel.",
    ],
  },
  {
    q: "What Causes Back Pain That Yoga Can Help With?",
    answer:
      "The back pain that responds most reliably to therapeutic yoga is postural and mechanical — the kind that comes from long hours at a desk, weak core, weak glutes, tight hip flexors, and shallow breathing. Yoga can also meaningfully help with mild-to-moderate disc bulges, sacroiliac (SI) joint pain, sciatica of muscular origin, post-pregnancy back pain, and stiffness from old sedentary habits. It is not a substitute for medical care in acute injury or serious pathology.",
    bullets: [
      "Desk-posture pain — rounded shoulders, forward head, collapsed lower back.",
      "Sciatica caused by tight piriformis or glute-medius weakness (not nerve compression from disc rupture).",
      "SI joint dysfunction from asymmetric hip mobility or single-side loading.",
      "Post-pregnancy back pain from weakened deep core and pelvic-floor coordination.",
      "General stiffness and morning back-ache from years of a sedentary routine.",
    ],
  },
  {
    q: "What to Expect in a Therapeutic Back Pain Session?",
    answer:
      "Your first session begins with a detailed intake — history of the pain, medical notes if any, current medications, sleep, sitting hours. Master Anil then guides gentle joint mobility, a specific spinal-decompression sequence (usually on the mat or against a wall), targeted core activation, and a closing pranayama to settle the nervous system. Nothing is choreographed. Every posture is offered in 3–5 stages and you work at the stage that feels safe today.",
    bullets: [
      "10-minute intake — pain map, triggers, medical context, goals.",
      "Sukshma Vyayama — soft joint mobility to prepare the spine.",
      "Spinal decompression sequence — supported, unhurried, gravity-friendly.",
      "Deep-core and glute activation (bird-dog, bridge variations, wall-supported holds).",
      "Closing diaphragmatic breath work and short savasana with a bolster.",
      "You leave with a written 5-minute daily home reset for between sessions.",
    ],
  },
  {
    q: "Is This Safe for Chronic or Severe Back Pain?",
    answer:
      "For chronic postural back pain that a doctor has already assessed, yes — therapeutic yoga is one of the most effective long-term tools available. For acute, severe or radiating pain, or any pain following a fall, accident or surgery, please see a qualified doctor or physiotherapist first. Master Anil regularly works alongside a student's medical team, not instead of them, and will happily wait until you have medical clearance to begin.",
    bullets: [
      "Chronic postural pain — usually safe and highly responsive after medical assessment.",
      "Post-diagnosis disc bulges — yes, once your doctor clears movement therapy.",
      "Post-surgery recovery — only with your surgeon's written clearance and pacing.",
      "Every plan is built around your medical history, never on top of it.",
    ],
  },
];

const CAUTION =
  "If your back pain is severe, sudden, radiates down the leg with numbness or weakness, follows a fall or accident, or is accompanied by bladder or bowel changes, please see a doctor or physiotherapist before starting yoga. Therapeutic yoga is powerful, but it works best alongside — not instead of — proper medical assessment for acute or serious cases.";

export const Route = createFileRoute("/yoga-for-back-pain")({
  head: () => ({
    meta: [
      { title: "Yoga for Back Pain Relief — Therapeutic Approach | Yog Jivan" },
      { name: "description", content: "Therapeutic yoga for back pain with Master Anil in Hai Duong, Vietnam and live online. Posture correction and gentle strengthening. Free consultation." },
      { name: "keywords", content: "yoga for back pain, therapeutic yoga back pain, back pain relief yoga, yoga for lower back pain, sciatica yoga, back pain yoga Hai Duong, online back pain yoga" },
      { property: "og:title", content: "Yoga for Back Pain Relief — A Therapeutic Approach | Yog Jivan" },
      { property: "og:description", content: "Personalized therapeutic yoga for back pain. Studio in Hai Duong & live online. Small-batch. Alignment-first. Book a free consultation with the Yog Jivan team." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.wallSeated),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Back Pain Relief | Yog Jivan" },
      { name: "twitter:description", content: "Therapeutic yoga for back pain — studio Hai Duong & online. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Back Pain", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: BackPainPage,
});

function BackPainPage() {
  return (
    <TherapeuticLanding
      eyebrow="Therapeutic Yoga · Studio & Online"
      heroTitle="Yoga for Back Pain Relief — A Therapeutic Approach"
      heroSub="Personalized therapeutic yoga with Master Anil Choudhary — in-studio in Hai Duong, Vietnam and live online worldwide. Posture correction, gentle strengthening, small-batch attention."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Back Pain"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote={CAUTION}
      breatherImages={[
        { src: masterImages.studioAdjustment, alt: "Master Anil giving a therapeutic hands-on adjustment for lower-back alignment", caption: "Hands-on alignment · therapeutic session" },
        { src: masterImages.wallSeated, alt: "Student in a supported seated stretch by the studio window for gentle spinal decompression", caption: "Supported spinal decompression" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, yoga therapist"
      masterIntro={
        <>
          <p>Master Anil has spent 12+ years working therapeutically with back-pain students — desk workers, post-pregnancy mothers, athletes recovering from disc injuries, and older students managing chronic stiffness. His methodology is unhurried, alignment-first, and grounded in the reality that no two backs are the same.</p>
          <p>His guiding rule for back-pain work: <span className="italic text-gold-gradient">"The spine does not respond to force. It responds to patience, breath and precise alignment — repeated."</span> Every plan is built around your body's current tolerance, not a generic sequence.</p>
        </>
      }
      relatedLinks={[
        { to: "/private-online-yoga", label: "Private 1-on-1 Yoga" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Relief" },
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/period-safe-yoga", label: "Period-Safe Yoga" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/yoga-for-beginners", label: "New to Yoga? Start Here" },
      ]}
      relatedPosts={[
        { slug: "desk-worker-yoga-back-neck-shoulders", title: "A practical yoga and mobility routine for desk workers", cat: "Mobility", read: "8 min" },
        { slug: "yoga-for-spine-longevity-12-minutes", title: "A daily 12-minute spine mobility routine", cat: "Health", read: "6 min" },
        { slug: "why-traditional-hatha-still-matters", title: "Why traditional Hatha still matters", cat: "Yoga", read: "6 min" },
        { slug: "therapeutic-yoga-benefits", title: "Personalised supportive yoga: what it is and what it is not", cat: "Health", read: "8 min" },
      ]}
      ctaTitle="Move without the ache."
      ctaSub="Book a free consultation with the Yog Jivan team to map a therapeutic path for your back."
    />
  );
}
