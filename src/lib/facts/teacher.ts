// SOURCE OF TRUTH — Founder / lead teacher.
// Canonical public title is fixed. Never invent certification bodies or years.

export const TEACHER = {
  name: "Master Anil Choudhary",
  /** Canonical public title — use verbatim everywhere. */
  title: "Founder & Lead Yoga Teacher",
  shortName: "Master Anil",
  /** Qualifications are described separately from the title. Keep generic — no invented bodies. */
  qualifications: [
    "Trained in the classical Indian yoga tradition — Hatha, Ashtanga and pranayama",
    "Teaches therapeutic, safety-first sequencing",
  ],
  yearsTeaching: "12+",
  teachesEvery: true,
  teachesEveryNote:
    "Every Yog Jivan class — studio or online — is taught personally by Master Anil. No substitute or rotating teachers.",
} as const;
