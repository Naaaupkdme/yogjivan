// Shared safe constants for private yoga plans and preferences.
// Synchronizes client form options, intake validation, and mirror allowlists.

export const CANONICAL_PRIVATE_PLANS = [
  "12-Session Plan",
  "20-Session Plan",
  "24-Session Plan",
  "Custom Sessions",
  "Not sure — help me choose",
] as const;

export const LEGACY_PRIVATE_PLANS = ["Custom / Undecided"] as const;

/**
 * Form options exposed to student-facing enquiry dropdowns.
 * Exposes canonical choices only so students never see internal legacy options.
 */
export const PRIVATE_PLAN_OPTIONS = CANONICAL_PRIVATE_PLANS;

/** All accepted plan values, including legacy choices for stored readers and validation. */
export const ALL_ACCEPTED_PRIVATE_PLANS = [
  ...CANONICAL_PRIVATE_PLANS,
  ...LEGACY_PRIVATE_PLANS,
] as const;

export const VALID_PLAN_SESSIONS = new Set<string>([
  ...CANONICAL_PRIVATE_PLANS,
  ...LEGACY_PRIVATE_PLANS,
]);

export const PRIVATE_LANGUAGE_OPTIONS = [
  "English",
  "Vietnamese",
  "Hindi",
  "Flexible / Any",
] as const;

export const VALID_PREFERRED_LANGUAGES = new Set<string>(PRIVATE_LANGUAGE_OPTIONS);

export const VALID_SHARED_FORMATS = new Set(["couples", "family", "parent_child"] as const);
export type SharedYogaFormat = "couples" | "family" | "parent_child";

export const VALID_PARTICIPANT_COUNTS = new Set([2, 3, 4] as const);
