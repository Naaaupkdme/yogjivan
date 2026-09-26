import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-back-pain";

const ANSWER_CAPSULE =
  "Yog Jivan teaches gentle, supportive yoga for people living with back discomfort or stiffness — a movement practice, not medical treatment. Sessions focus on comfortable mobility, steady strength work, alignment awareness and calm breathing, with each posture scaled to what feels safe for you today. Available in-studio in Hai Duong, Vietnam with the Yog Jivan teaching team, and live online worldwide. Individual experience varies. If your pain is severe, recent or medically diagnosed, please follow your doctor's or physiotherapist's guidance first.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Founded and led by Master Anil Choudhary — Founder & Lead Yoga Teacher" },
  { icon: Stethoscope, label: "12+ years teaching yoga — beginner to advanced practice" },
  { icon: Users, label: "Private or small-group sessions — postures scaled to your comfort" },
  { icon: Globe2, label: "Studio students in Hai Duong · Online students in 20+ countries" },
  { icon: Award, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: ShieldCheck, label: "Alignment-first teaching — no forced ranges, no pushing through pain" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can Yoga Help If I Have Back Discomfort?",
    answer:
      "Many people find that gentle, well-paced movement is a comfortable part of looking after their back. A supportive yoga practice works on general mobility, steady strengthening and calm breathing, at a pace your body can absorb. It is not a treatment for any back condition and it does not replace medical or physiotherapy care. Individual experience varies, and if you have a diagnosis, your clinician's guidance comes first.",
    bullets: [
      "Gentle, gradual mobility work for the spine, hips and shoulders.",
      "Steady strengthening at a level that feels manageable for you.",
      "Alignment awareness so everyday sitting and standing feel more considered.",
      "Calm breathing and rest at the close of each session.",
      "A short home routine you can keep between sessions, if you want one.",
    ],
  },
  {
    q: "Who Is This Practice Suitable For?",
    answer:
      "It suits people who have general stiffness or discomfort — often from long desk hours or a sedentary routine — and who want a gentle, consistent movement habit. It also suits people with a diagnosed condition whose doctor or physiotherapist has already cleared them for general movement and yoga. We do not diagnose the cause of your discomfort and we do not claim to resolve any specific condition.",
    bullets: [
      "Desk-based routines and general stiffness from long sitting hours.",
      "People returning to movement after a long break.",
      "Anyone with a diagnosis who has clinician clearance for general movement.",
      "Not suitable as a substitute for medical assessment or physiotherapy.",
      "If a movement increases your pain, we change it — nothing is pushed through.",
    ],
  },
  {
    q: "What Happens in a Session?",
    answer:
      "Before your first session we have a short practice-safety conversation — what you find comfortable, what movements aggravate your discomfort, and any limitation or clinician instruction we should work around. The session then moves through soft joint mobility, supported postures, gentle strengthening and a calm closing breath practice. Nothing is choreographed; postures are offered in stages, and you practise at the stage that feels safe today.",
    bullets: [
      "A short practice-safety conversation — comfort, limitations, clinician instructions.",
      "Soft joint mobility to warm up gradually.",
      "Supported postures using wall, bolster or blocks where helpful.",
      "Gentle core and hip strengthening at your current level.",
      "Closing breath practice and an unhurried rest.",
      "An optional short home routine for the days between sessions.",
    ],
  },
  {
    q: "When Should I See a Doctor First?",
    answer:
      "Please see a qualified doctor or physiotherapist before starting if your pain is severe or sudden, radiates down the leg with numbness or weakness, follows a fall, accident or surgery, or comes with any other symptom that worries you. We are happy to wait until you have clearance, and we will work within whatever guidance your clinician gives you. Yoga at Yog Jivan sits alongside medical care — never in place of it.",
    bullets: [
      "Severe, sudden or worsening pain — medical assessment first.",
      "Radiating pain, numbness or weakness — see a clinician before practising.",
      "After a fall, accident or surgery — begin only with clinician clearance.",
      "With a diagnosis, follow your doctor's or physiotherapist's guidance.",
      "Tell your teacher about any limitation or instruction that affects how you practise.",
    ],
  },
];

const CAUTION =
  "If your back pain is severe, sudden, radiates down the leg with numbness or weakness, follows a fall or accident, or is accompanied by bladder or bowel changes, please see a doctor or physiotherapist before starting yoga. Yoga at Yog Jivan is a supportive movement practice, not medical treatment, and it works alongside — never instead of — proper medical assessment.";

export const Route = createFileRoute("/yoga-for-back-pain")({
  head: () => ({
    meta: [
      { title: "Yoga for Back Discomfort & Mobility Support | Yog Jivan" },
      { name: "description", content: "Gentle, supportive yoga for people living with back discomfort or stiffness — in Hai Duong, Vietnam and live online. Alignment-first, scaled to your comfort." },
      { name: "keywords", content: "yoga for back pain, yoga for back discomfort, back mobility yoga, yoga for lower back, gentle yoga back, back yoga Hai Duong, online back yoga" },
      { property: "og:title", content: "Yoga for Back Discomfort & Mobility Support | Yog Jivan" },
      { property: "og:description", content: "Gentle yoga for back discomfort and stiffness. Studio in Hai Duong & live online. Alignment-first, scaled to your comfort. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.wallSeated),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Back Discomfort & Mobility Support | Yog Jivan" },
      { name: "twitter:description", content: "Gentle yoga for back discomfort — studio Hai Duong & online. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Back Discomfort", item: CANONICAL },
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
      eyebrow="Supportive Yoga · Studio & Online"
      heroTitle="Yoga for Back Discomfort & Mobility Support"
      heroSub="Gentle, supportive yoga with the Yog Jivan teaching team — in-studio in Hai Duong, Vietnam and live online worldwide. Alignment-first, scaled to your comfort, never forced."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Back Discomfort"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote={CAUTION}
      breatherImages={[
        { src: masterImages.studioAdjustment, alt: "Yog Jivan teacher offering a gentle hands-on alignment cue during a studio session", caption: "Hands-on alignment · studio session" },
        { src: masterImages.wallSeated, alt: "Student in a supported seated stretch by the studio window", caption: "Supported, unhurried practice" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, Yog Jivan"
      masterIntro={
        <>
          <p>Yog Jivan was founded and is led by Master Anil Choudhary, Founder & Lead Yoga Teacher, with 12+ years teaching classical Indian yoga — Hatha, Ashtanga and pranayama. Studio and private sessions are delivered by the Yog Jivan teaching team, with each student matched to a suitable teacher.</p>
          <p>The teaching principle for back-focused work is simple: the spine responds to patience, breath and precise alignment — repeated — rather than to force. Every practice is built around your body's current comfort, not a generic sequence.</p>
        </>
      }
      relatedLinks={[
        { to: "/private-online-yoga", label: "Private 1-on-1 Yoga" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Support" },
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/period-safe-yoga", label: "Cycle-Aware Yoga" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/yoga-for-beginners", label: "New to Yoga? Start Here" },
      ]}
      relatedPosts={[
        { slug: "online-yoga-for-desk-stiffness-and-back-tension", title: "Online yoga for desk stiffness and back tension", cat: "Mobility", read: "7 min" },
        { slug: "desk-worker-yoga-back-neck-shoulders", title: "A practical yoga and mobility routine for desk workers", cat: "Mobility", read: "8 min" },
        { slug: "yoga-for-spine-longevity-12-minutes", title: "A daily 12-minute spine mobility routine", cat: "Health", read: "6 min" },
        { slug: "why-traditional-hatha-still-matters", title: "Why traditional Hatha still matters", cat: "Yoga", read: "6 min" },
        { slug: "therapeutic-yoga-benefits", title: "Personalised supportive yoga: what it is and what it is not", cat: "Health", read: "8 min" },
      ]}
      ctaTitle="Move with more ease."
      ctaSub="Book a free consultation with the Yog Jivan team to plan a gentle, supportive practice for your back."
    />
  );
}
