// SOURCE OF TRUTH — Live online class facts.

export const ONLINE_CLASS = {
  durationMinutes: 60,
  maxGroupSize: 8,
  cameraRequired: true,
  cameraNote:
    "Camera on is required so Master Anil can see your alignment and correct you in real time. Your session is private, never recorded for public use, and never shared.",
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
    label: "Onboarding & health-assessment conversation",
    note:
      "Before your first live class we have a short 15-minute conversation about your health history, injuries and goals so your practice is safe from day one.",
  },
  liveCorrection: true,
  sameTeacher: true,
} as const;
