// SOURCE OF TRUTH — Yog Jivan teaching team (multi-teacher model).
// Confirmed 2026-08-19.
//
// RULES
// - Private 1-on-1 sessions are taught by a MATCHED teacher from the Yog Jivan
//   teaching team — NOT exclusively by Master Anil.
// - Once matched, the SAME dedicated teacher continues with the member.
// - NEVER render a teacher record that is not fully verified. No placeholder
//   names, invented years, invented specialties, stock photos or fake bios.
//
// TO ADD A NEW TEACHER LATER, the owner must supply ALL of the following:
//   name              — full public name, spelled as it should appear
//   role              — public title (e.g. "Senior Yoga Teacher")
//   yearsExperience   — verified number of years teaching (e.g. "8+")
//   languages         — languages they can actually teach a full session in
//   specialties       — verified focus areas only (no medical/therapy claims)
//   suitableLevels    — any of: "Beginner" | "Intermediate" | "Advanced"
//   photo             — real photo of that teacher, 4:5, 1200x1500, WebP
//   photoAlt          — descriptive alt text
//   shortBio          — 1-2 factual sentences, no certifications unless documented
//   profilePath       — optional internal route once a profile page exists
// Until every field is supplied and verified, do NOT add the record here.

export type TeacherLevel = "Beginner" | "Intermediate" | "Advanced";

export type TeacherProfile = {
  id: string;
  name: string;
  role: string;
  yearsExperience: string;
  languages: readonly string[];
  specialties: readonly string[];
  suitableLevels: readonly TeacherLevel[];
  photo: string;
  photoAlt: string;
  shortBio: string;
  profilePath?: string;
};

/**
 * Publicly rendered teachers. Currently only the founder, because his facts are
 * the only ones verified. Add further verified TeacherProfile records here and
 * the team section renders them with no redesign required.
 */
export const TEACHING_TEAM_IDS = ["master-anil"] as const;

export const TEAM_MODEL = {
  headline: "Matched with a Yog Jivan teacher — then the same teacher, every session.",
  body:
    "We match you with a teacher from the Yog Jivan teaching team based on your current level and what you want to work on. Once matched, your private sessions continue with the same dedicated teacher for consistency. We do not confirm a specific teacher until the match is agreed with you.",
  continuityShort: "Same dedicated teacher, session after session.",
  providerWording: "the Yog Jivan teaching team",
} as const;
