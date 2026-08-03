// SOURCE OF TRUTH — Policies (refund, cancellation, health disclaimer).
// Never publish an absolute "no refunds under any circumstance".

export const REFUND_POLICY = {
  title: "Refunds & Cancellation",
  summary:
    "Memberships are voluntary purchases and are generally non-refundable once your membership is activated or your first class is used. The exceptions below always apply.",
  exceptions: [
    "Duplicate or accidental double payment — refunded in full.",
    "A class or membership cancelled by Yog Jivan, or not delivered as described — refunded or credited.",
    "A material service failure on our side — we will make it right with a refund, credit or replacement sessions.",
    "Any right you hold under applicable consumer law in your country — those rights are not affected by this policy.",
  ],
  howTo:
    "Write to hello@yogjivan.com or message us on WhatsApp with your payment reference. We respond to every refund request.",
  /** Pause / transfer / rescheduling is NOT offered unless separately approved. Do not invent it. */
  pauseTransferOffered: false,
} as const;

export const HEALTH_DISCLAIMER = {
  short:
    "Yoga supports wellbeing but is not medical treatment. It complements — never replaces — care from your doctor.",
  long:
    "Yog Jivan offers yoga and wellness instruction, not medical advice, diagnosis or treatment. Nothing on this site is a promise of a specific medical outcome. If you are pregnant, recovering from injury or surgery, or managing a diagnosed condition, please consult your doctor before starting and share the details at your onboarding conversation so your practice can be adapted safely.",
} as const;

export const PRIVACY_NOTE = {
  cameraNote:
    "Live classes are camera-on so your alignment can be corrected. Sessions are not published, and health information you share at onboarding is used only to make your practice safe.",
} as const;
