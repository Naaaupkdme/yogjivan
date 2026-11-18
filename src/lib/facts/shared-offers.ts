// Shared offer definitions and facts for Couples and Family Online Yoga.
// Sourced from File 14 / Part 3 brief and File 29 pricing updates.

export const SHARED_PLAN_OPTIONS = [
  "Single Session",
  "6-Session Plan",
  "12-Session Plan",
  "24-Session Plan",
  "Custom Plan",
] as const;

export type SharedPlanOption = (typeof SHARED_PLAN_OPTIONS)[number];

export type SharedPlanCard = {
  id: string;
  planValue: SharedPlanOption;
  badge: string;
  sessions: number;
  sessionLabel: string;
  duration: string;
  title: string;
  subtitle: string;
  points: string[];
  pricing: string;
  effective: string;
  comparison?: string;
  discountNote?: string;
  note: string;
  cta: string;
  featured?: boolean;
};

export const SHARED_PRICING_TABLE = {
  couples: {
    pax: 2,
    singleUSD: 36,
    plans: {
      6: { totalUSD: 192, perSessionUSD: "32.00", saveUSD: 24 },
      12: { totalUSD: 349, perSessionUSD: "29.08", saveUSD: 83 },
      24: { totalUSD: 669, perSessionUSD: "27.88", saveUSD: 195 },
    },
  },
  family3: {
    pax: 3,
    singleUSD: 44,
    plans: {
      6: { totalUSD: 228, perSessionUSD: "38.00", saveUSD: 36 },
      12: { totalUSD: 429, perSessionUSD: "35.75", saveUSD: 99 },
      24: { totalUSD: 819, perSessionUSD: "34.13", saveUSD: 237 },
    },
  },
  family4: {
    pax: 4,
    singleUSD: 52,
    plans: {
      6: { totalUSD: 276, perSessionUSD: "46.00", saveUSD: 36 },
      12: { totalUSD: 519, perSessionUSD: "43.25", saveUSD: 105 },
      24: { totalUSD: 999, perSessionUSD: "41.63", saveUSD: 249 },
    },
  },
} as const;

export function getSharedPlanSummary(
  format: "couples" | "family" | "parent_child",
  participants: number,
  plan?: string
): { headline: string; details: string } | null {
  if (!plan) return null;

  if (format === "couples") {
    if (plan === "Single Session") {
      return {
        headline: "Single Session · US$36 total for 2 adults",
        details: "Live 60-minute session covering both participants (US$18 each).",
      };
    }
    if (plan === "6-Session Plan") {
      return {
        headline: "6-Session Plan · US$192 total for 2 adults",
        details: "6 sessions · US$32.00 per session for both · Save US$24 vs 6 single sessions.",
      };
    }
    if (plan === "12-Session Plan") {
      return {
        headline: "12-Session Plan · US$349 total for 2 adults (Recommended)",
        details: "12 sessions · US$29.08 per session for both · Save US$83 vs 12 single sessions.",
      };
    }
    if (plan === "24-Session Plan") {
      return {
        headline: "24-Session Plan · US$669 total for 2 adults (Lowest rate)",
        details: "24 sessions · US$27.88 per session for both · Save US$195 vs 24 single sessions.",
      };
    }
    if (plan === "Custom Plan") {
      return {
        headline: "Custom Couples Plan · Quote by enquiry",
        details: "Flexible schedule and tailored session count arranged on WhatsApp.",
      };
    }
  }

  if (format === "family") {
    const is4 = participants === 4;
    const paxLabel = is4 ? "4 participants" : "3 participants";
    if (plan === "Single Session") {
      return {
        headline: `Single Session · US$${is4 ? 52 : 44} total for ${paxLabel}`,
        details: `Live 60-minute session covering all ${paxLabel} from one household.`,
      };
    }
    if (plan === "6-Session Plan") {
      return {
        headline: `6-Session Plan · US$${is4 ? 276 : 228} total for ${paxLabel}`,
        details: `6 sessions · US$${is4 ? "46.00" : "38.00"} per session for group · Save US$36 vs 6 single sessions.`,
      };
    }
    if (plan === "12-Session Plan") {
      return {
        headline: `12-Session Plan · US$${is4 ? 519 : 429} total for ${paxLabel} (Recommended)`,
        details: `12 sessions · US$${is4 ? "43.25" : "35.75"} per session for group · Save US$${is4 ? 105 : 99} vs 12 single sessions.`,
      };
    }
    if (plan === "24-Session Plan") {
      return {
        headline: `24-Session Plan · US$${is4 ? 999 : 819} total for ${paxLabel} (Lowest rate)`,
        details: `24 sessions · US$${is4 ? "41.63" : "34.13"} per session for group · Save US$${is4 ? 249 : 237} vs 24 single sessions.`,
      };
    }
    if (plan === "Custom Plan") {
      return {
        headline: `Custom Family Plan · Quote by enquiry`,
        details: `Flexible schedule and tailored cadence arranged on WhatsApp.`,
      };
    }
  }

  if (format === "parent_child") {
    if (plan === "Single Session") {
      return {
        headline: "Single Session · US$36 total for 1 Adult + 1 Child",
        details: "Live 60-minute shared practice with participating adult caregiver.",
      };
    }
    if (plan === "Custom Plan") {
      return {
        headline: "Custom Parent & Child Plan · Quote by enquiry",
        details: "Flexible schedule and age-appropriate structure arranged on WhatsApp.",
      };
    }
  }

  return null;
}

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
    singleUSD: 36,
    perPersonSingleUSD: 18,
    sixPackUSD: 192,
    twelvePackUSD: 349,
    twentyFourPackUSD: 669,
    note: "File 29 adopted pricing: Single $36 ($18/pax), 6/$192 ($32), 12/$349 ($29.08), 24/$669 ($27.88).",
  },
} as const;

export const COUPLES_PLANS: SharedPlanCard[] = [
  {
    id: "couples-plan-6",
    planValue: "6-Session Plan",
    badge: "6-Session Plan",
    sessions: 6,
    sessionLabel: "6 Live Sessions",
    duration: "60 min each",
    title: "Starter Shared Routine",
    subtitle: "Build a consistent shared practice rhythm together at home",
    points: [
      "6 live 60-minute private video sessions for two adults",
      "One dedicated Yog Jivan teacher guiding both participants on camera",
      "Individual posture variations adapted to each partner's flexibility",
      "Flexible schedule and session times arranged around your time zone",
    ],
    pricing: "US$192 total for 2 adults",
    effective: "6 sessions · US$32.00 per session for both",
    comparison: "Save US$24 vs 6 single sessions",
    note: "Covers both adult participants on a shared screen. Schedule agreed directly.",
    cta: "Enquire about 6 sessions",
  },
  {
    id: "couples-plan-12",
    planValue: "12-Session Plan",
    badge: "Recommended plan",
    featured: true,
    sessions: 12,
    sessionLabel: "12 Live Sessions",
    duration: "60 min each",
    title: "Shared Practice Habit",
    subtitle: "Establish mobility, alignment continuity and shared balance",
    points: [
      "12 live 60-minute private video sessions for two adults",
      "One dedicated Yog Jivan teacher for consistent cues and progression",
      "Gradual progression from essential alignment to deeper mobility",
      "Shared practice space with clear camera angle guidance",
    ],
    pricing: "US$349 total for 2 adults",
    effective: "12 sessions · US$29.08 per session for both",
    comparison: "Save US$83 vs 12 single sessions",
    note: "Covers both adult participants on a shared screen. Schedule agreed directly.",
    cta: "Enquire about 12 sessions",
  },
  {
    id: "couples-plan-24",
    planValue: "24-Session Plan",
    badge: "Lowest price per session",
    sessions: 24,
    sessionLabel: "24 Live Sessions",
    duration: "60 min each",
    title: "Deep Practice Partnership",
    subtitle: "Comprehensive long-term practice with our lowest price per session",
    points: [
      "24 live 60-minute private video sessions for two adults",
      "Dedicated teacher continuity across your entire yoga journey",
      "Full spectrum practice: posture depth, breathwork & joint longevity",
      "Priority scheduling and flexible rescheduling with advance notice",
    ],
    pricing: "US$669 total for 2 adults",
    effective: "24 sessions · US$27.88 per session for both",
    comparison: "Save US$195 vs 24 single sessions",
    discountNote: "Lowest price per session for couples",
    note: "Covers both adult participants on a shared screen. Schedule agreed directly.",
    cta: "Enquire about 24 sessions",
  },
  {
    id: "couples-plan-custom",
    planValue: "Custom Plan",
    badge: "Custom Plan",
    sessions: 0,
    sessionLabel: "Flexible Schedule",
    duration: "Tailored duration",
    title: "Custom Couples Plan",
    subtitle: "A session count and schedule tailored to your shared routine and travel plans.",
    points: [
      "Flexible session count and cadence tailored to your availability",
      "Tailored focus: stress relief, desk-worker mobility, or athletic recovery",
      "Dedicated teacher matched to your preferred times and experience levels",
      "Tell us your preferred rhythm; we will confirm teacher and quote on WhatsApp",
    ],
    pricing: "Quote by enquiry",
    effective: "Tailored to your schedule",
    note: "Arranged directly with the Yog Jivan team on WhatsApp.",
    cta: "Request a custom plan",
  },
];

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
    threePaxSingleUSD: 44,
    threePaxSixPackUSD: 228,
    threePaxTwelvePackUSD: 429,
    threePaxTwentyFourPackUSD: 819,
    fourPaxSingleUSD: 52,
    fourPaxSixPackUSD: 276,
    fourPaxTwelvePackUSD: 519,
    fourPaxTwentyFourPackUSD: 999,
    note: "File 29 adopted pricing: 3 pax ($44, 6/$228, 12/$429, 24/$819); 4 pax ($52, 6/$276, 12/$519, 24/$999).",
  },
} as const;

export const FAMILY_3_PLANS: SharedPlanCard[] = [
  {
    id: "family-3-plan-6",
    planValue: "6-Session Plan",
    badge: "6-Session Plan",
    sessions: 6,
    sessionLabel: "6 Live Sessions",
    duration: "60 min each",
    title: "Family Starter Routine",
    subtitle: "Build healthy movement habits for 3 household members",
    points: [
      "6 live 60-minute private video sessions for 3 participants",
      "One dedicated Yog Jivan teacher guiding all participants live",
      "Accessible poses tailored across all ages with participating adult",
      "Convenient scheduling adapted to your household routine",
    ],
    pricing: "US$228 total for 3 participants",
    effective: "6 sessions · US$38.00 per session for 3",
    comparison: "Save US$36 vs 6 single sessions",
    note: "Covers 3 participants from one household on a shared screen.",
    cta: "Enquire about 6 sessions",
  },
  {
    id: "family-3-plan-12",
    planValue: "12-Session Plan",
    badge: "Recommended plan",
    featured: true,
    sessions: 12,
    sessionLabel: "12 Live Sessions",
    duration: "60 min each",
    title: "Household Practice Habit",
    subtitle: "Consistent physical activity, posture and breathwork for your family",
    points: [
      "12 live 60-minute private video sessions for 3 participants",
      "Consistent teacher guidance for habit formation and coordination",
      "Balanced sequence of movement, mindful breathing and relaxation",
      "Paced around school, work and household commitments",
    ],
    pricing: "US$429 total for 3 participants",
    effective: "12 sessions · US$35.75 per session for 3",
    comparison: "Save US$99 vs 12 single sessions",
    note: "Covers 3 participants from one household on a shared screen.",
    cta: "Enquire about 12 sessions",
  },
  {
    id: "family-3-plan-24",
    planValue: "24-Session Plan",
    badge: "Lowest price per session",
    sessions: 24,
    sessionLabel: "24 Live Sessions",
    duration: "60 min each",
    title: "Long-Term Family Wellness",
    subtitle: "Complete half-year or seasonal journey with our lowest price per session",
    points: [
      "24 live 60-minute private video sessions for 3 participants",
      "Dedicated teacher continuity across your family's yoga journey",
      "Progressive development in posture, balance, breath and focus",
      "Priority booking and flexible rescheduling with advance notice",
    ],
    pricing: "US$819 total for 3 participants",
    effective: "24 sessions · US$34.13 per session for 3",
    comparison: "Save US$237 vs 24 single sessions",
    discountNote: "Lowest price per session for 3 participants",
    note: "Covers 3 participants from one household on a shared screen.",
    cta: "Enquire about 24 sessions",
  },
  {
    id: "family-3-plan-custom",
    planValue: "Custom Plan",
    badge: "Custom Plan",
    sessions: 0,
    sessionLabel: "Flexible Schedule",
    duration: "Tailored duration",
    title: "Custom Family Plan",
    subtitle: "Custom session frequency or focus adapted to your household's schedule.",
    points: [
      "Custom session count and schedule tailored to school breaks or family goals",
      "Specialised focus: relaxation, gentle mobility, or active physical fun",
      "Dedicated teacher matched to your time zone and family dynamics",
      "Share your family goals; we confirm schedule and quote on WhatsApp",
    ],
    pricing: "Quote by enquiry",
    effective: "Tailored to your schedule",
    note: "Arranged directly with the Yog Jivan team on WhatsApp.",
    cta: "Request a custom plan",
  },
];

export const FAMILY_4_PLANS: SharedPlanCard[] = [
  {
    id: "family-4-plan-6",
    planValue: "6-Session Plan",
    badge: "6-Session Plan",
    sessions: 6,
    sessionLabel: "6 Live Sessions",
    duration: "60 min each",
    title: "Family Starter Routine",
    subtitle: "Build healthy movement habits for 4 household members",
    points: [
      "6 live 60-minute private video sessions for up to 4 participants",
      "One dedicated Yog Jivan teacher guiding all participants live",
      "Accessible poses tailored across all ages with participating adult",
      "Convenient scheduling adapted to your household routine",
    ],
    pricing: "US$276 total for 4 participants",
    effective: "6 sessions · US$46.00 per session for 4",
    comparison: "Save US$36 vs 6 single sessions",
    note: "Covers up to 4 participants from one household on a shared screen.",
    cta: "Enquire about 6 sessions",
  },
  {
    id: "family-4-plan-12",
    planValue: "12-Session Plan",
    badge: "Recommended plan",
    featured: true,
    sessions: 12,
    sessionLabel: "12 Live Sessions",
    duration: "60 min each",
    title: "Household Practice Habit",
    subtitle: "Consistent physical activity, posture and breathwork for your family",
    points: [
      "12 live 60-minute private video sessions for up to 4 participants",
      "Consistent teacher guidance for habit formation and coordination",
      "Balanced sequence of movement, mindful breathing and relaxation",
      "Paced around school, work and household commitments",
    ],
    pricing: "US$519 total for 4 participants",
    effective: "12 sessions · US$43.25 per session for 4",
    comparison: "Save US$105 vs 12 single sessions",
    note: "Covers up to 4 participants from one household on a shared screen.",
    cta: "Enquire about 12 sessions",
  },
  {
    id: "family-4-plan-24",
    planValue: "24-Session Plan",
    badge: "Lowest price per session",
    sessions: 24,
    sessionLabel: "24 Live Sessions",
    duration: "60 min each",
    title: "Long-Term Family Wellness",
    subtitle: "Complete half-year or seasonal journey with our lowest price per session",
    points: [
      "24 live 60-minute private video sessions for up to 4 participants",
      "Dedicated teacher continuity across your family's yoga journey",
      "Progressive development in posture, balance, breath and focus",
      "Priority booking and flexible rescheduling with advance notice",
    ],
    pricing: "US$999 total for 4 participants",
    effective: "24 sessions · US$41.63 per session for 4",
    comparison: "Save US$249 vs 24 single sessions",
    discountNote: "Lowest price per session for 4 participants",
    note: "Covers up to 4 participants from one household on a shared screen.",
    cta: "Enquire about 24 sessions",
  },
  {
    id: "family-4-plan-custom",
    planValue: "Custom Plan",
    badge: "Custom Plan",
    sessions: 0,
    sessionLabel: "Flexible Schedule",
    duration: "Tailored duration",
    title: "Custom Family Plan",
    subtitle: "Custom session frequency or focus adapted to your household's schedule.",
    points: [
      "Custom session count and schedule tailored to school breaks or family goals",
      "Specialised focus: relaxation, gentle mobility, or active physical fun",
      "Dedicated teacher matched to your time zone and family dynamics",
      "Share your family goals; we confirm schedule and quote on WhatsApp",
    ],
    pricing: "Quote by enquiry",
    effective: "Tailored to your schedule",
    note: "Arranged directly with the Yog Jivan team on WhatsApp.",
    cta: "Request a custom plan",
  },
];

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
