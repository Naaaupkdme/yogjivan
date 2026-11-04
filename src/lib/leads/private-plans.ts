// Shared safe constants for private yoga plans and preferences.
// Synchronizes client form options, intake validation, and mirror allowlists.

export const CANONICAL_PRIVATE_PLANS = [
  "12-Session Plan",
  "20-Session Plan",
  "24-Session Plan",
  "Custom Sessions",
  "Not sure — help me choose",
] as const;

export const LEGACY_PRIVATE_PLANS = [
  "Custom / Undecided",
] as const;

export const PRIVATE_PLAN_OPTIONS = [
  "12-Session Plan",
  "20-Session Plan",
  "24-Session Plan",
  "Custom Sessions",
  "Custom / Undecided",
  "Not sure — help me choose",
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
