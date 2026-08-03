// SOURCE OF TRUTH — Brand identity.
// Do not hardcode brand strings anywhere else. Import from here.

export const BRAND = {
  name: "Yog Jivan",
  legalName: "Yog Jivan Sanctuary",
  tagline: "The Circle of Unity",
  site: "https://yogjivan.com",
  positioning:
    "Authentic Indian yoga lineage taught live by a human teacher — small batches, real-time verbal posture correction, therapeutic and safety-first.",
  /** Primary commercial page. Every trial/pricing CTA should point here. */
  moneyPagePath: "/online-yoga-classes",
  languages: ["English", "Vietnamese", "Hindi"] as const,
} as const;
