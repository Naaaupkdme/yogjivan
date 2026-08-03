import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-thyroid";

const ANSWER_CAPSULE =
  "Master Anil's therapeutic approach to thyroid health uses gentle, consistent practice to support metabolism, calm the nervous system and stimulate healthy circulation around the throat and endocrine centres — as a complement to your medical treatment, never a replacement. Sessions focus on shoulder-stand-family postures (adapted for your body), specific pranayama that supports the throat area, and closing meditation to lower the chronic stress that so often exacerbates thyroid symptoms. Small-batch or private, available in-studio in Hai Duong, Vietnam and live online worldwide.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Certified in classical Hatha, pranayama and therapeutic sequencing" },
  { icon: Stethoscope, label: "12+ years supporting students with hypo- and hyperthyroid conditions" },
  { icon: Users, label: "Small-batch or 1-on-1 attention — practice adapted to your energy today" },
  { icon: Globe2, label: "Studio in Hai Duong · Live online for global students" },
  { icon: Award, label: "Integrates asana, pranayama, meditation and lifestyle rhythm" },
  { icon: ShieldCheck, label: "Alignment-first — inversions modified, never forced" },
];

const QUESTIONS: QA[] = [
  {
    q: "Can Yoga Help With Thyroid Conditions?",
    answer:
      "Yes, as a genuinely helpful supporting practice — not a cure. Both hypothyroidism and hyperthyroidism sit inside a wider system of stress, sleep, metabolism and inflammation, and yoga meaningfully influences that whole context. Consistent practice supports metabolism through movement, calms the chronic stress load that worsens most thyroid symptoms, encourages healthy circulation around the throat and endocrine centres, and supports the deep sleep that thyroid conditions so often disrupt. Combined with your medical treatment, it can noticeably improve day-to-day energy, mood and symptom stability.",
    bullets: [
      "Supports metabolism through consistent, breath-led movement.",
      "Lowers chronic stress — a major driver of thyroid symptom flare-ups.",
      "Encourages healthy circulation around the throat and endocrine centres.",
      "Improves the deep sleep that thyroid conditions frequently disrupt.",
      "Works alongside medical care to stabilise day-to-day energy and mood.",
    ],
  },
  {
    q: "What Practices Are Recommended for Thyroid Health?",
    answer:
      "Master Anil weaves several thoughtful elements into a thyroid-supportive practice. Shoulder-stand-family postures (Sarvangasana, supported Setu Bandha, chin-lock variations) traditionally support the throat area, but are always modified for your neck and blood pressure — never forced. Ujjayi and bhramari pranayama work directly with the throat. Gentle backbends open the front of the neck without strain. And an unhurried closing meditation grounds the nervous system, which is essential for hyperthyroid students in particular.",
    bullets: [
      "Shoulder-stand-family postures — always adapted to your neck and blood pressure.",
      "Supported bridge (Setu Bandha) — a gentler alternative for many students.",
      "Ujjayi and bhramari pranayama — direct, gentle work with the throat area.",
      "Gentle backbends — open the front of the neck without strain.",
      "Longer closing meditation — essential for hyperthyroid nervous-system calm.",
      "Never forced. Never rushed. Always adapted to your energy today.",
    ],
  },
  {
    q: "What to Expect in a Therapeutic Thyroid-Focused Session?",
    answer:
      "Your first session begins with a private intake — condition (hypo or hyper), current medication and dose, recent labs if you can share them, sleep, stress load and energy patterns. Master Anil then guides a sequence adapted to your current state — softer and more grounding on low-energy days, a little stronger when you're feeling stable. Every plan is longitudinal: we watch how you feel across weeks, not one class, and adjust as your body and labs evolve.",
    bullets: [
      "Private intake — condition, medication, recent labs, sleep, energy.",
      "Sequencing adapted to your current energy — never a generic plan.",
      "Gentle joint mobility → shoulder / throat work → closing pranayama and meditation.",
      "Inversions modified for neck safety and blood pressure.",
      "A short home practice map you can do on lower-energy days.",
      "Progress tracked across weeks and cycles, not single sessions.",
    ],
  },
  {
    q: "Is This a Replacement for Medical Treatment?",
    answer:
      "No — and it's important we're clear about that. Thyroid conditions require ongoing medical management with a doctor, including prescribed medication and regular lab monitoring. Please do not stop or reduce medication based on how yoga makes you feel; hormone levels change slowly and quietly. Yoga is a genuinely valuable supporting practice — the piece that addresses stress, sleep, circulation and quality of life — but it complements medical care, never replaces it. Master Anil works comfortably alongside your endocrinologist's plan.",
    bullets: [
      "Continue medical care with your endocrinologist or GP.",
      "Never stop or reduce thyroid medication based on how yoga feels.",
      "Bring recent labs and current dose so the practice can be built around them.",
      "Yoga complements — it never replaces — prescribed treatment.",
      "Best outcomes come from combining medical care and consistent practice.",
    ],
  },
];

const CAUTION =
  "Thyroid conditions require ongoing medical management and lab monitoring. Please continue seeing your doctor, keep taking prescribed medication, and treat yoga as a powerful supporting practice — never a replacement. If you have uncontrolled blood pressure, glaucoma, recent neck injury or are pregnant, share this at your intake — shoulder-stand-family postures will be replaced with gentler alternatives.";

export const Route = createFileRoute("/yoga-for-thyroid")({
  head: () => ({
    meta: [
      { title: "Yoga for Thyroid Health — A Therapeutic Approach | Yog Jivan" },
      { name: "description", content: "Therapeutic yoga for thyroid health with Master Anil — gentle practice supporting hypo- and hyperthyroid conditions. Hai Duong studio & live online." },
      { name: "keywords", content: "yoga for thyroid, thyroid yoga, yoga for hypothyroidism, yoga for hyperthyroidism, thyroid health yoga, therapeutic yoga thyroid, thyroid yoga Hai Duong" },
      { property: "og:title", content: "Yoga for Thyroid Health — A Therapeutic Approach | Yog Jivan" },
      { property: "og:description", content: "Gentle, consistent yoga supporting thyroid health alongside your medical care. Studio & online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.wallSeated),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Thyroid Health | Yog Jivan" },
      { name: "twitter:description", content: "Therapeutic yoga supporting thyroid health. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Thyroid Health", item: CANONICAL },
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
      eyebrow="Therapeutic · Endocrine Support"
      heroTitle="Yoga for Thyroid Health — A Therapeutic Approach"
      heroSub="Gentle, consistent yoga with Master Anil Choudhary — supporting thyroid function as a complement to your medical care. Studio in Hai Duong and live online worldwide."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Thyroid Health"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      cautionNote={CAUTION}
      quote={{
        text: "I still take my medication and see my doctor every six months. But my energy is steadier, I sleep deeply, and the fog that used to define my mornings is mostly gone.",
        source: "Long-term Student · Online Community",
      }}
      breatherImages={[
        { src: masterImages.wallSeated, alt: "Student in a supported seated stretch by the studio window", caption: "Supported practice · gentle throat opening" },
        { src: masterImages.savasanaClass, alt: "Students resting in Savasana at the close of a therapeutic class", caption: "Closing Savasana · nervous-system rest" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, therapeutic yoga teacher"
      masterIntro={
        <>
          <p>Master Anil has supported many students living with hypo- and hyperthyroid conditions over 12+ years of teaching. His approach is patient and practical — coordinated with your medical team, adapted to your energy each day, and built for the long, quiet work that thyroid conditions actually require.</p>
          <p>His teaching principle for endocrine work: <span className="italic text-gold-gradient">"The glands do not respond to effort. They respond to steadiness — of breath, sleep and rhythm — kept up patiently over months."</span></p>
        </>
      }
      relatedLinks={[
        { to: "/yoga-for-pcod", label: "Yoga for PCOD & PCOS" },
        { to: "/yoga-for-stress", label: "Yoga for Stress Relief" },
        { to: "/personal-training", label: "1-on-1 Therapeutic Sessions" },
        { to: "/online-yoga-classes", label: "Live Online Classes" },
      ]}
      relatedPosts={[
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
        { slug: "yoga-for-sustainable-fat-loss", title: "Yoga for sustainable fat loss (without burnout)", cat: "Weight Loss", read: "8 min" },
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
      ]}
      ctaTitle="Steadiness, not urgency."
      ctaSub="Book a free consultation with Master Anil to design a thyroid-supportive practice around your medical plan."
    />
  );
}
