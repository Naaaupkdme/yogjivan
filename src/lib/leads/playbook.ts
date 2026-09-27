// Yog Jivan first-reply sales playbook — versioned, auditable, rule-based (no AI).
// Change copy here and bump PLAYBOOK_VERSION; the version is stored on every outbox payload.
//
// Rules:
// - 2–4 short lines, warm and premium, at most ONE question.
// - Never ask timing + experience + injury together. Pain/injury is a later step.
// - Never quote prices first; no cure/treatment claims; never include health-note text.
// - Group availability is unknown: never promise a slot.

export const PLAYBOOK_VERSION = "yj-first-reply-v2 (2026-09-27)";

export const PLAYBOOK = {
  greeting: (first: string) => `Hi ${first} 😊`,
  signoff: "🙏",
  intro: {
    private: "Thank you for your interest in private 1-on-1 online yoga with Yog Jivan.",
    group: "Thank you for your interest in Yog Jivan's live online group classes.",
    studio: "Thank you for your interest in classes at our Hai Duong studios.",
    other: "Thank you for reaching out to Yog Jivan.",
  },
  privateBeginnerOffer: "As you're starting out, we'd love to offer you a complimentary assessment with Master Anil.",
  privateOffer: "We'd love to begin with a short complimentary assessment to match you with the right teacher.",
  goalLine: (goal: string) => `It's lovely that you'd like to focus on ${goal}.`,
  healthLine: "Thank you for sharing your health information — our team will review it with care.",
  timeNoted: (time: string, tz: string | null) => `We've noted ${time}${tz ? ` (${tz} time)` : ""} as your preferred time.`,
  question: {
    timing: (tz: string | null) => `Which days and times usually suit you best${tz ? ` (${tz} time)` : ""}?`,
    studio: "Which studio and time would suit you best?",
    experience: "Have you practised yoga before?",
    general: "What would you most like help with?",
  },
} as const;
