// Adjustable TRIAL defaults for Help AI answers. Change here only.
export const HELP_AI = {
  model: "openai/gpt-6-luna", // economical, zero-retention
  perVisitorPerDay: 3,
  globalPerDay: 50,
  maxQuestionChars: 300,
  maxOutputTokens: 600,
} as const;
