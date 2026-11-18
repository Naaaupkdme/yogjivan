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
    sixPackUSD: 198,
    twelvePackUSD: 384,
    twentyFourPackUSD: 744,
    note: "Option B approved single rate ($36 total / $18 each). Multi-session packages for owner review.",
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
    pricing: "US$198 total",
    effective: "US$33 per session (US$16.50 per person)",
    comparison: "Compared with US$216 at single-session rate (save US$18)",
    note: "Covers both adult participants on a shared screen. Schedule agreed directly.",
    cta: "Request package price",
  },
  {
    id: "couples-plan-12",
    planValue: "12-Session Plan",
    badge: "12-Session Plan",
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
    pricing: "US$384 total",
    effective: "US$32 per session (US$16.00 per person)",
    comparison: "Compared with US$432 at single-session rate (save US$48)",
    note: "Covers both adult participants on a shared screen. Schedule agreed directly.",
    cta: "Request package price",
  },
  {
    id: "couples-plan-24",
    planValue: "24-Session Plan",
    badge: "24-Session Plan · Highest Value",
    featured: true,
    sessions: 24,
    sessionLabel: "24 Live Sessions",
    duration: "60 min each",
    title: "Deep Practice Partnership",
    subtitle: "Comprehensive long-term practice with our deepest multi-session discount",
    points: [
      "24 live 60-minute private video sessions for two adults",
      "Dedicated teacher continuity across your entire yoga journey",
      "Full spectrum practice: posture depth, breathwork & joint longevity",
      "Priority scheduling and flexible rescheduling with advance notice",
    ],
    pricing: "US$744 total",
    effective: "US$31 per session (US$15.50 per person)",
    comparison: "Base comparison: 24 × US$36 = US$864. Save US$120 with 24-session discount.",
    discountNote: "US$120 package discount applied vs 24 standalone sessions",
    note: "Covers both adult participants on a shared screen. Schedule agreed directly.",
    cta: "Request package price",
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
    threePaxSixPackUSD: 240,
    threePaxTwelvePackUSD: 468,
    threePaxTwentyFourPackUSD: 912,
    fourPaxSingleUSD: 52,
    fourPaxSixPackUSD: 288,
    fourPaxTwelvePackUSD: 564,
    fourPaxTwentyFourPackUSD: 1104,
    note: "Option B approved single rates ($44 for 3 pax, $52 for 4 pax). Multi-session packages for owner review.",
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
    pricing: "US$240 total",
    effective: "US$40 per session (covers 3 participants)",
    comparison: "Compared with US$264 at single-session rate (save US$24)",
    note: "Covers 3 participants from one household on a shared screen.",
    cta: "Request package price",
  },
  {
    id: "family-3-plan-12",
    planValue: "12-Session Plan",
    badge: "12-Session Plan",
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
    pricing: "US$468 total",
    effective: "US$39 per session (covers 3 participants)",
    comparison: "Compared with US$528 at single-session rate (save US$60)",
    note: "Covers 3 participants from one household on a shared screen.",
    cta: "Request package price",
  },
  {
    id: "family-3-plan-24",
    planValue: "24-Session Plan",
    badge: "24-Session Plan · Highest Value",
    featured: true,
    sessions: 24,
    sessionLabel: "24 Live Sessions",
    duration: "60 min each",
    title: "Long-Term Family Wellness",
    subtitle: "Complete half-year or seasonal journey with our deepest 24-session discount",
    points: [
      "24 live 60-minute private video sessions for 3 participants",
      "Dedicated teacher continuity across your family's yoga journey",
      "Progressive development in posture, balance, breath and focus",
      "Priority booking and flexible rescheduling with advance notice",
    ],
    pricing: "US$912 total",
    effective: "US$38 per session (covers 3 participants)",
    comparison: "Base comparison: 24 × US$44 = US$1,056. Save US$144 with 24-session discount.",
    discountNote: "US$144 package discount applied vs 24 standalone sessions",
    note: "Covers 3 participants from one household on a shared screen.",
    cta: "Request package price",
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
    pricing: "US$288 total",
    effective: "US$48 per session (covers 4 participants)",
    comparison: "Compared with US$312 at single-session rate (save US$24)",
    note: "Covers up to 4 participants from one household on a shared screen.",
    cta: "Request package price",
  },
  {
    id: "family-4-plan-12",
    planValue: "12-Session Plan",
    badge: "12-Session Plan",
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
    pricing: "US$564 total",
    effective: "US$47 per session (covers 4 participants)",
    comparison: "Compared with US$624 at single-session rate (save US$60)",
    note: "Covers up to 4 participants from one household on a shared screen.",
    cta: "Request package price",
  },
  {
    id: "family-4-plan-24",
    planValue: "24-Session Plan",
    badge: "24-Session Plan · Highest Value",
    featured: true,
    sessions: 24,
    sessionLabel: "24 Live Sessions",
    duration: "60 min each",
    title: "Long-Term Family Wellness",
    subtitle: "Complete half-year or seasonal journey with our deepest 24-session discount",
    points: [
      "24 live 60-minute private video sessions for up to 4 participants",
      "Dedicated teacher continuity across your family's yoga journey",
      "Progressive development in posture, balance, breath and focus",
      "Priority booking and flexible rescheduling with advance notice",
    ],
    pricing: "US$1,104 total",
    effective: "US$46 per session (covers 4 participants)",
    comparison: "Base comparison: 24 × US$52 = US$1,248. Save US$144 with 24-session discount.",
    discountNote: "US$144 package discount applied vs 24 standalone sessions",
    note: "Covers up to 4 participants from one household on a shared screen.",
    cta: "Request package price",
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
