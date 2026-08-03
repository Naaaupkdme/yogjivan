// Barrel for the Yog Jivan content source of truth.
// Import facts from "@/lib/facts" — never hardcode business facts in components.

export { BRAND } from "./brand";
export { TEACHER } from "./teacher";
export { CONTACT } from "./contact";
export { LOCATIONS, STUDIO_LIST, STUDIO_HOURS, AREA_PHRASE } from "./locations";
export { ONLINE_CLASS } from "./online-class";
export {
  ONLINE_PLANS,
  ENTRY_PRICE_USD,
  CURRENCY,
  formatUSD,
  perMonth,
  PRICING_SUMMARY,
  STUDIO_PRICING_NOTE,
  type Plan,
} from "./pricing";
export { TRIAL } from "./trial";
export { REFUND_POLICY, HEALTH_DISCLAIMER, PRIVACY_NOTE } from "./policies";
export {
  PUBLIC_TRUST,
  PUBLIC_TRUST_METRICS,
  GOOGLE_RATING,
  UNPUBLISHED_CLAIMS,
} from "./trust";
