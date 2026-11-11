// Shared offer definitions and facts for Couples and Family Online Yoga.
// Sourced from File 14 / Part 3 brief.
// PUBLIC PRICING POLICY: Pricing is confirmed strictly by enquiry.
// Numerical proposals ($50/$45 couples, $65/$75 family) are recorded for internal
// review only and must NEVER be published in public UI or search metadata.

export const COUPLES_OFFER = {
  id: "couples",
  title: "Live Online Couples Yoga Classes",
  h1: "Private online yoga for two",
  eyebrow: "Private Online Yoga for Couples",
  tagline: "Practise together from home with a dedicated Yog Jivan teacher.",
  participants: 2,
  durationMinutes: 60,
  pricingLabel: "Pricing by enquiry",
  summary:
    "A private 60-minute live online yoga session for two adults. Two different experience levels are welcome, with individual modifications guided on camera.",
  keyPoints: [
    "Two adults practising together in real time with one teacher",
    "Individual posture modifications for different flexibility and experience levels",
    "Shared room and single device setup — clear guidance on camera angle and spacing",
    "Pacing and schedule arranged around your time zone",
  ],
  internalReviewQuote: {
    standardProposalUSD: 50,
    launchProposalUSD: 45,
    note: "Internal reference only. Public copy remains 'Pricing by enquiry'.",
  },
} as const;

export const FAMILY_OFFER = {
  id: "family",
  title: "Live Online Family Yoga for Up to Four",
  h1: "Private online yoga for your family",
  eyebrow: "Private Online Family Yoga",
  tagline: "Move, breathe and practise together from home in a shared private session.",
  maxParticipants: 4,
  durationMinutes: 60,
  pricingLabel: "Pricing by enquiry",
  summary:
    "A private live online yoga session for up to four family members from one household, guided by a Yog Jivan teacher with an adult participating.",
  keyPoints: [
    "Up to four family members practising together from home",
    "Accessible movement adaptable across household members",
    "Adult caregiver actively participates — clear camera framing for the practice space",
    "Flexible session scheduling across time zones",
  ],
  internalReviewQuote: {
    threePaxProposalUSD: 65,
    fourPaxProposalUSD: 75,
    note: "Internal reference only. Public copy remains 'Pricing by enquiry'.",
  },
} as const;

export const PARENT_CHILD_SECTION = {
  id: "parent-child",
  title: "Parent & Child Yoga (Caregiver + Child)",
  eyebrow: "Family Focus: Caregiver + Child",
  summary:
    "A shared private practice where one adult caregiver and one child practise side by side on separate mats with guidance from a Yog Jivan teacher.",
  keyPoints: [
    "Adult caregiver actively participates alongside the child",
    "Playful, accessible movement focused on balance, breath and body awareness",
    "Shorter session formats available upon enquiry after teacher consultation",
    "No infant or prenatal formats — designed for school-age children with adult supervision",
  ],
} as const;

export const SHARED_LANGUAGES = [
  "English",
  "Vietnamese",
  "Hindi",
  "Flexible / Any",
] as const;

export const SHARED_TIME_PREFERENCES = [
  "Morning",
  "Afternoon",
  "Evening",
  "Flexible",
] as const;
