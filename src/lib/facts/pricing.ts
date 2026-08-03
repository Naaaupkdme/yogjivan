// SOURCE OF TRUTH — Online membership pricing.
// USD. Confirmed 2026-08-04. There is NO "$49/month" plan — never reintroduce it.
// Studio (VND) rates are deliberately NOT published.

export type Plan = {
  id: string;
  label: string;
  months: number;
  priceUSD: number;
  badge?: string;
};

export const ONLINE_PLANS: Plan[] = [
  { id: "m1", label: "1 Month", months: 1, priceUSD: 19.99 },
  { id: "m3", label: "3 Months", months: 3, priceUSD: 54.99, badge: "Most Popular" },
  { id: "m6", label: "6 Months", months: 6, priceUSD: 99.99 },
  { id: "m12", label: "12 Months", months: 12, priceUSD: 179.99, badge: "Best Value" },
];

export const ENTRY_PRICE_USD = 19.99;
export const CURRENCY = "USD";

export function formatUSD(n: number) {
  return `$${n.toFixed(2)}`;
}

export function perMonth(plan: Plan) {
  return plan.priceUSD / plan.months;
}

/** Single sentence usable anywhere a pricing summary is needed. */
export const PRICING_SUMMARY =
  "Live online memberships start at $19.99 for 1 month, $54.99 for 3 months, $99.99 for 6 months and $179.99 for 12 months.";

/** Studio pricing is not published publicly. */
export const STUDIO_PRICING_NOTE =
  "Studio membership rates are shared directly — message us on WhatsApp or Zalo for current pricing.";
