// Sitewide FAQ content. All business facts come from src/lib/facts/*.
import { CONTACT, LOCATIONS, ONLINE_CLASS, PRICING_SUMMARY, TRIAL, REFUND_POLICY } from "@/lib/facts";

export const FAQS = [
  {
    q: "What styles of yoga do you teach?",
    a: "Master Anil teaches classical Hatha, Ashtanga, therapeutic yoga, pranayama (breathwork) and meditation rooted in authentic Indian tradition, adapted for modern lifestyles.",
  },
  {
    q: "I am a complete beginner — can I join?",
    a: "Yes. Every journey starts with a short 15-minute onboarding and practice-safety conversation, so we can design a safe entry point for absolute beginners and progress at your pace.",
  },
  {
    q: "Do you offer private one-on-one sessions?",
    a: "Yes. Private programs are our signature offering — personalized to your body, health history and goals, available in-studio or online.",
  },
  {
    q: "Can yoga help with back pain, PCOD or anxiety?",
    a: "Our supportive yoga programs are suitable for people with back and neck discomfort, PCOD, cycle-related preferences and stress support. Yoga complements — it never replaces — care from your doctor, and we don't promise specific medical outcomes.",
  },
  {
    q: "Where are the studios located?",
    a: `Both studios are in the ${LOCATIONS.studio1.localDescriptor} of Hai Phong, Vietnam — ${LOCATIONS.studio1.name} at ${LOCATIONS.studio1.full}, and ${LOCATIONS.studio2.name} at ${LOCATIONS.studio2.full}.`,
  },
  {
    q: "Do you offer online classes for students outside Vietnam?",
    a: `Yes. We teach students in 20+ countries through live online classes across multiple time zones. Every live class runs ${ONLINE_CLASS.durationMinutes} minutes with a maximum of ${ONLINE_CLASS.maxGroupSize} students.`,
  },
  {
    q: "Is camera on required in live online classes?",
    a: ONLINE_CLASS.cameraNote,
  },
  {
    q: "What if I miss a live class?",
    a: ONLINE_CLASS.recordings.note,
  },
  {
    q: "What languages are classes taught in?",
    a: "Classes are taught in English, Vietnamese and Hindi.",
  },
  {
    q: "Do you offer corporate wellness programs?",
    a: "Yes. We design custom corporate wellness packages — on-site, hybrid or fully online — for teams seeking stress reduction, posture support and resilience.",
  },
  {
    q: "Is there a kids yoga program?",
    a: "Yes. Our kids program builds focus, flexibility, breath awareness and emotional regulation through age-appropriate practice.",
  },
  {
    q: "How much do online memberships cost?",
    a: PRICING_SUMMARY,
  },
  {
    q: "How do I start the free trial?",
    a: `${TRIAL.summary} Tap ${TRIAL.ctaLabel} or message us on WhatsApp at ${CONTACT.phoneDisplay}.`,
  },
  {
    q: "What is your refund and cancellation policy?",
    a: `${REFUND_POLICY.summary} ${REFUND_POLICY.exceptions.join(" ")} ${REFUND_POLICY.howTo}`,
  },
];
