// SOURCE OF TRUTH — Trust claims.
//
// PUBLISHABLE claims only in PUBLIC_TRUST. Anything unsupported lives in
// UNPUBLISHED_CLAIMS and must NOT be rendered until evidence is supplied.

import { LOCATIONS } from "./locations";

export const PUBLIC_TRUST = {
  yearsTeaching: "12+",
  studentsTaught: "1,000+",
  countries: "20+",
  maxGroupSize: 8,
} as const;

export const PUBLIC_TRUST_METRICS = [
  { value: "12+", label: "Years teaching" },
  { value: "1,000+", label: "Students taught" },
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
  studentsTenThousand: {
    claim: "10,000+ students",
    reason: "No documentary support or stated methodology.",
  },
  stressReduction91: {
    claim: "91% reported stress reduction",
    reason: "No sample size, period or method provided.",
  },
  retention95: {
    claim: "95% student retention",
    reason: "No measurement definition or period provided.",
  },
} as const;
