// SOURCE OF TRUTH — Founder / lead teacher.
// Canonical public title is fixed. Never invent certification bodies or years.
//
// IMPORTANT (confirmed 2026-08-19): Yog Jivan is a MULTI-TEACHER business.
// Do NOT state or imply that every Yog Jivan class — or every private session —
// is taught personally by Master Anil. Private 1-on-1 sessions are taught by a
// matched teacher from the Yog Jivan teaching team (see ./team.ts).

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
  /** Live small-group online classes are led by Master Anil. Scope is group classes only. */
  groupClassNote:
    "Live small-group online classes are led by Master Anil Choudhary, so your cues and progression stay consistent from class to class.",
} as const;
