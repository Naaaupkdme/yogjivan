// SOURCE OF TRUTH — Trust claims.
//
// PUBLISHABLE claims only in PUBLIC_TRUST. Anything unsupported lives in
// UNPUBLISHED_CLAIMS and must NOT be rendered until evidence is supplied.

import { LOCATIONS } from "./locations";

// studentsTaught raised from 1,000+ to 10,000+ — confirmed by the business
// owner on 2026-08-19. Publish as "students guided" / "students taught" only.
// Never as "students transformed" (outcome claim).
export const PUBLIC_TRUST = {
  yearsTeaching: "12+",
  studentsTaught: "10,000+",
  countries: "20+",
  maxGroupSize: 8,
} as const;

export const PUBLIC_TRUST_METRICS = [
  { value: "12+", label: "Years teaching" },
  { value: "10,000+", label: "Students guided" },
  { value: "20+", label: "Countries" },
  { value: "8", label: "Max students per live class" },
] as const;

/**
 * Google ratings are user-reported. Display ONLY alongside a direct Google Maps
 * link so the visitor can verify. Never emit these as AggregateRating schema on
 * our own Organization / LocalBusiness markup (self-serving review markup).
 */
export const GOOGLE_RATING = {
  displayable: true,
  value: "5.0",
  reviewsLabel: "50+ reviews",
  schemaAllowed: false,
  studio1Link: LOCATIONS.studio1.googleMaps,
  studio2Link: LOCATIONS.studio2.googleMaps,
} as const;

/**
 * NOT PUBLISHABLE. Kept here so nobody re-adds them from an old draft.
 * Publish only when documentary support / methodology is supplied.
 */
export const UNPUBLISHED_CLAIMS = {
  // studentsTenThousand was RECLASSIFIED as public fact on 2026-08-19 by the
  // business owner and now lives in PUBLIC_TRUST.studentsTaught. Do not re-add.
  stressReduction91: {
    claim: "91% reported stress reduction",
    reason: "No sample size, period or method provided.",
  },
  retention95: {
    claim: "95% student retention",
    reason: "No measurement definition or period provided.",
  },
} as const;
