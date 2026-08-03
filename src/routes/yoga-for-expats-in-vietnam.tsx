import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-expats-in-vietnam";

const ANSWER_CAPSULE =
  "Yog Jivan is the English-speaking home for the expat community in and around Hai Duong, Vietnam. Authentic Indian yoga taught personally by Certified Master Anil Choudhary — the same teacher, every class, in English — with a welcoming community of practitioners from 20+ countries already on the mats. Two premium studios in Hai Duong, easy WhatsApp and Zalo booking, and a live-online option that follows you anywhere travel takes you. Come as you are — no Vietnamese required, no gym-culture pressure, no rotating substitute teachers.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Founder & Lead Yoga Teacher — teaches personally in clear English" },
  { icon: Users, label: "Community of students from 20+ countries already practising with us" },
  { icon: Globe2, label: "Studios in Hai Duong · Live online continues wherever you travel" },
  { icon: Stethoscope, label: "Small-batch classes — every student known personally by the teacher" },
  { icon: Award, label: "Authentic Indian lineage — Hatha, Ashtanga and yoga therapy" },
  { icon: ShieldCheck, label: "WhatsApp and Zalo booking · trial session before you commit" },
];

const QUESTIONS: QA[] = [
  {
    q: "Is There an English-Speaking Yoga Studio in Hai Duong?",
    answer:
      "Yes — Yog Jivan Sanctuary is the established English-speaking yoga home in Hai Duong. Every class, in-studio or online, is taught personally by Master Anil Choudhary in clear, warm English. No Vietnamese is required. You'll find yourself practising alongside professionals, teachers, families and long-term expats from India, the USA, Canada, Australia, France, the UK, Germany, Singapore and beyond — many of whom have been with us for years. It is a genuinely international, genuinely welcoming space.",
    bullets: [
      "Every class taught personally by Master Anil, in clear English.",
      "No Vietnamese required at any point — from first message to the mat.",
      "A settled international community — India, USA, UK, France, Australia, Singapore and more.",
      "Two premium studios in Hai Duong city, easy to reach.",
      "Small batches (max 8) so you are known by name from day one.",
    ],
  },
  {
    q: "What's It Like Practicing Yoga as an Expat Here?",
    answer:
      "Warm, unhurried and quietly international. The studios in Hai Duong were built as a sanctuary — soft light, natural materials, silence between the classes — and the community that fills them is people who have chosen to live thoughtfully. There is no gym-culture pressure, no comparison, no rushed check-in. Master Anil learns each new student personally — your history, what you're working with, what you're hoping for — before any class begins, so you are met exactly where you are. Expats often tell us it becomes the calmest hour of their week.",
    bullets: [
      "Small, welcoming international community — you'll recognise faces quickly.",
      "Sanctuary-style studios — soft light, natural materials, quiet arrivals.",
      "No gym-culture pressure or performance mindset.",
      "Master Anil learns each student personally before you step on the mat.",
      "Often becomes 'the calmest hour of the week' for people navigating expat life.",
    ],
  },
  {
    q: "Can I Continue Classes Online If I Travel or Move?",
    answer:
      "Yes — and this is one of the quiet advantages of practising with Yog Jivan. Because every class is led personally by Master Anil, in-studio and online, students move between the two seamlessly. Travelling for work or a holiday? Continue live on Zoom from your hotel or Airbnb. Moving out of Vietnam? Your practice — the same teacher, the same cues, the same community — continues from your next city. Many of our current online students started in-studio in Hai Duong years ago and never wanted to leave the teacher behind.",
    bullets: [
      "Same teacher, same cues, same community — whether in-studio or online.",
      "Travel-friendly: continue live from hotels, Airbnbs, extended trips.",
      "Relocation-friendly: your practice moves with you to the next country.",
      "Many long-term online students began in-studio in Hai Duong.",
      "Members receive a 48-hour catch-up recording if a live class is missed.",
    ],
  },
  {
    q: "How Do I Get Started?",
    answer:
      "The easiest way is to send a short message on WhatsApp or Zalo — the same channels the rest of our expat community uses. We'll set up a free consultation with Master Anil (a real conversation, not a sales call), understand what you're looking for and any health context that matters, and invite you to a complimentary trial: 3 days of group class access plus one private session, no card required. You can begin in-studio, online, or both. There is no long onboarding — most new expats are on the mat within the same week they first message us.",
    bullets: [
      "Message us on WhatsApp or Zalo — the channels our community already uses.",
      "Free consultation with Master Anil — a real conversation, not a sales call.",
      "Complimentary trial: 3 days of group classes + one private session.",
      "Begin in-studio, online, or both — completely your choice.",
      "Most new expats are on the mat within the same week they first reach out.",
    ],
  },
];

export const Route = createFileRoute("/yoga-for-expats-in-vietnam")({
  head: () => ({
    meta: [
      { title: "Yoga for Expats in Hai Duong Vietnam | Yog Jivan" },
      { name: "description", content: "The English-speaking yoga sanctuary for the expat community in Hai Duong. Authentic Indian yoga with Master Anil — in-studio and live online." },
      { name: "keywords", content: "yoga for expats vietnam, english yoga hai duong, expat yoga vietnam, english-speaking yoga studio, foreigners yoga hai duong, international yoga vietnam" },
      { property: "og:title", content: "Yoga for Expats in Hai Duong, Vietnam | Yog Jivan" },
      { property: "og:description", content: "English-speaking yoga sanctuary in Hai Duong — authentic Indian practice with Master Anil. Studio & online. Free consultation." },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      ...socialImageMeta(masterImages.groupNamaste),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yoga for Expats in Vietnam | Yog Jivan" },
      { name: "twitter:description", content: "English-speaking yoga sanctuary in Hai Duong. Free consultation." },
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
            { "@type": "ListItem", position: 2, name: "Yoga for Expats in Vietnam", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: ExpatsPage,
});

function ExpatsPage() {
  return (
    <TherapeuticLanding
      eyebrow="Expat Community · English-Speaking"
      heroTitle="Yoga for Expats in Hai Duong, Vietnam"
      heroSub="An English-speaking yoga sanctuary with Master Anil Choudhary — authentic Indian practice, small international community, in-studio and live online. Come as you are."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Expats in Vietnam"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      quote={{
        text: "It's the place in Hai Duong that actually feels like a sanctuary. When I travel back home I just switch to the online class — same teacher, same practice.",
        source: "Long-term Expat Student · Hai Duong",
      }}
      breatherImages={[
        { src: masterImages.groupNamaste, alt: "International Yog Jivan community seated in namaste at the studio", caption: "A quietly international community" },
        { src: masterImages.groupCelebration, alt: "Yog Jivan community celebrating International Yoga Day with raised hands", caption: "Community · Hai Duong studios" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, teaching in English in Hai Duong"
      masterIntro={
        <>
          <p>Master Anil has taught expat students from more than 20 countries over 12+ years — many of them long-term, several of them still practising with him online years after leaving Vietnam. He teaches in clear, warm English, learns each new student personally, and treats every class — in-studio and online — with the same care.</p>
          <p>His teaching principle for the expat community: <span className="italic text-gold-gradient">"Wherever life takes you, the mat can travel with you. And so can I."</span></p>
        </>
      }
      relatedLinks={[
        { to: "/online-yoga-classes", label: "Live Online Classes" },
        { to: "/about", label: "About Master Anil" },
        { to: "/yoga-for-beginners", label: "New to Yoga? Start Here" },
        { to: "/gallery", label: "Sanctuary Gallery" },
      ]}
      relatedPosts={[
        { slug: "building-a-home-practice-you-will-keep", title: "Building a home practice you'll keep for life", cat: "Lifestyle", read: "5 min" },
        { slug: "why-traditional-hatha-still-matters", title: "Why traditional Hatha still matters in 2026", cat: "Yoga", read: "6 min" },
        { slug: "the-breath-you-didnt-know-you-were-holding", title: "The breath you didn't know you were holding", cat: "Wellness", read: "4 min" },
      ]}
      ctaTitle="Welcome to the sanctuary."
      ctaSub="Message us on WhatsApp or Zalo to book your free consultation and complimentary trial with Master Anil."
    />
  );
}
