// SOURCE OF TRUTH — Live online class facts.

export const ONLINE_CLASS = {
  durationMinutes: 60,
  maxGroupSize: 8,
  cameraRequired: true,
  cameraNote:
    "Camera on is required so your teacher can see your alignment and correct you in real time. Members who miss a class can use the 48-hour catch-up recording.",
  languages: ["English", "Vietnamese", "Hindi"] as const,
  platform: "Zoom / Google Meet",
  recordings: {
    available: true,
    windowHours: 48,
    note:
      "Members can catch up on a missed class with a recording available for 48 hours. Live attendance is encouraged — a recording cannot correct your posture.",
  },
  onboarding: {
    minutes: 15,
    label: "Onboarding & practice-safety conversation",
    note:
      "Before your first live class we have a short 15-minute conversation about any injuries or limitations and what you want from your practice, so we can keep it safe from day one. It is not a medical assessment and does not replace professional care.",
  },
  liveCorrection: true,
  sameTeacher: true,
} as const;
