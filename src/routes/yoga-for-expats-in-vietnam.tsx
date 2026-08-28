import { createFileRoute } from "@tanstack/react-router";
import { TherapeuticLanding, SHARED_CREDENTIAL_ICONS, type QA } from "@/components/site/TherapeuticLanding";
import { masterImages, socialImageMeta } from "@/lib/images";

const CANONICAL = "https://yogjivan.com/yoga-for-expats-in-vietnam";

const ANSWER_CAPSULE =
  "Yog Jivan offers English-speaking yoga classes in the Hai Duong urban area. Authentic Indian yoga led by Master Anil Choudhary and the Yog Jivan teaching team, taught in clear English, with in-studio and live-online options. Two studios in Hai Duong, easy WhatsApp and Zalo booking, and a live-online option that follows you when you travel. You can enquire and practise in English.";

const { GraduationCap, Stethoscope, Users, Globe2, Award, ShieldCheck } = SHARED_CREDENTIAL_ICONS;

const CREDENTIALS = [
  { icon: GraduationCap, label: "Founder & Lead Yoga Teacher — teaches personally in clear English" },
  { icon: Users, label: "Community of students from 20+ countries already practising with us" },
  { icon: Globe2, label: "Studios in Hai Duong · Live online continues wherever you travel" },
  { icon: Stethoscope, label: "Small groups — verbal guidance and modifications for your level" },
  { icon: Award, label: "Classical Indian yoga — Hatha, Ashtanga and pranayama" },
  { icon: ShieldCheck, label: "WhatsApp and Zalo booking · trial session before you commit" },
];

const QUESTIONS: QA[] = [
  {
    q: "Is There an English-Speaking Yoga Studio in Hai Duong?",
    answer:
      "Yes — Yog Jivan offers English-speaking yoga classes in the Hai Duong urban area. Classes are taught in clear, warm English by Master Anil Choudhary and the Yog Jivan teaching team. You can enquire and practise in English. Yog Jivan has guided students from 20+ countries, and classes are open to residents and international students alike.",
    bullets: [
      "Classes available in clear English with the Yog Jivan teaching team.",
      "You can enquire and practise in English.",
      "A welcoming international mix of students.",
      "Two studios in Hai Duong city, easy to reach.",
      "Small groups with verbal guidance and modifications for your level.",
    ],
  },
  {
    q: "What's It Like Practicing Yoga as an Expat Here?",
    answer:
      "Warm, unhurried and quietly international. The studios in Hai Duong were built as a sanctuary — soft light, natural materials, silence between the classes — and the community that fills them is people who have chosen to live thoughtfully. There is no gym-culture pressure, no comparison, no rushed check-in. The Yog Jivan team learns about each new student — your history, what you're working with, what you're hoping for — before any class begins, so you are met where you are. Many expats tell us it becomes a calm, steady hour in their week.",
    bullets: [
      "Small, welcoming international community — you'll recognise faces quickly.",
      "Sanctuary-style studios — soft light, natural materials, quiet arrivals.",
      "No gym-culture pressure or performance mindset.",
      "The Yog Jivan team learns about each student before you step on the mat.",
      "Often becomes a calm, steady hour for people navigating expat life.",
    ],
  },
  {
    q: "Can I Continue Classes Online If I Travel or Move?",
    answer:
      "Yes — and this is one of the quiet advantages of practising with Yog Jivan. Students move between the studios and live online seamlessly. Travelling for work or a holiday? Continue live on Zoom from your hotel or Airbnb. Moving out of Vietnam? Your practice and your community continue from your next city. If teacher continuity matters while you travel, private online sessions are generally kept with the same matched teacher.",
    bullets: [
      "If teacher continuity matters while you travel, private online sessions are generally kept with the same matched teacher.",
      "Travel-friendly: continue live from hotels, Airbnbs, extended trips.",
      "Relocation-friendly: your practice moves with you to the next country.",
      
      "Members receive a 48-hour catch-up recording if a live class is missed.",
    ],
  },
  {
    q: "How Do I Get Started?",
    answer:
      "The easiest way is to send a short message on WhatsApp or Zalo. We'll set up a free consultation with the Yog Jivan team (a real conversation, not a sales call), understand what you're looking for and any practice-safety context that matters, and invite you to a complimentary trial: 3 days of group class access plus one private session, no card required. You can begin in-studio, online, or both. There is no long onboarding — you can start as soon as a suitable time is arranged.",
    bullets: [
      "Message us on WhatsApp or Zalo — the channels our community already uses.",
      "Free consultation with the Yog Jivan team — a real conversation, not a sales call.",
      "Complimentary trial: 3 days of group classes + one private session.",
      "Begin in-studio, online, or both — completely your choice.",
      "You can start as soon as a suitable time is arranged.",
    ],
  },
];

export const Route = createFileRoute("/yoga-for-expats-in-vietnam")({
  head: () => ({
    meta: [
      { title: "Yoga for Expats in Hai Duong Vietnam | Yog Jivan" },
      { name: "description", content: "English-speaking yoga classes in Hai Duong for the expat community. Authentic Indian yoga with Master Anil — in-studio and live online." },
      { name: "keywords", content: "yoga for expats vietnam, english yoga hai duong, expat yoga vietnam, english-speaking yoga studio, foreigners yoga hai duong, international yoga vietnam" },
      { property: "og:title", content: "Yoga for Expats in Hai Duong, Vietnam | Yog Jivan" },
      { property: "og:description", content: "English-speaking yoga classes in Hai Duong — authentic Indian practice with Master Anil. Studio & online. Free consultation." },
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
      heroSub="English-speaking yoga classes in the Hai Duong urban area with Master Anil Choudhary — authentic Indian practice, small international community, in-studio and live online. Come as you are."
      answerCapsule={ANSWER_CAPSULE}
      h1="Yoga for Expats in Vietnam"
      credentials={CREDENTIALS}
      questions={QUESTIONS}
      breatherImages={[
        { src: masterImages.groupNamaste, alt: "International Yog Jivan community seated in namaste at the studio", caption: "A quietly international community" },
        { src: masterImages.groupCelebration, alt: "Yog Jivan community celebrating International Yoga Day with raised hands", caption: "Community · Hai Duong studios" },
      ]}
      portrait={masterImages.meditationPortrait}
      portraitAlt="Master Anil Choudhary — Founder & Lead Yoga Teacher, teaching in English in Hai Duong"
      masterIntro={
        <>
          <p>Yog Jivan has guided students from 20+ countries. Master Anil brings 12+ years of yoga teaching and leads the teaching approach, and classes are taught in clear, warm English by Master Anil and the Yog Jivan teaching team — with the same care in the studio and online.</p>
          <p>The idea behind the online option is simple: wherever life takes you, the practice can travel with you.</p>
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
      ctaSub="Message us on WhatsApp or Zalo to book your free consultation and complimentary trial with the Yog Jivan team."
    />
  );
}
