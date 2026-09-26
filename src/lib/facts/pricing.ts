// SOURCE OF TRUTH — Online membership pricing.
// USD. Premium small-group pricing confirmed by the owner 2026-09-26:
// $36 / $99 / $180 / $300. The older 19.99 / 54.99 / 99.99 / 179.99 ladder is
// retired — never reintroduce it, and there is no "$49/month" plan.
// Studio (VND) rates are deliberately NOT published.

export type Plan = {
  id: string;
  label: string;
  months: number;
  priceUSD: number;
  badge?: string;
};

export const ONLINE_PLANS: Plan[] = [
  { id: "m1", label: "1 Month", months: 1, priceUSD: 36 },
  { id: "m3", label: "3 Months", months: 3, priceUSD: 99, badge: "Most Popular" },
  { id: "m6", label: "6 Months", months: 6, priceUSD: 180 },
  { id: "m12", label: "12 Months", months: 12, priceUSD: 300, badge: "Best Value" },
];

export const ENTRY_PRICE_USD = 36;
export const CURRENCY = "USD";

/** Clean round figures display without trailing ".00". */
export function formatUSD(n: number) {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
}

export function perMonth(plan: Plan) {
  return plan.priceUSD / plan.months;
}

/** Single sentence usable anywhere a pricing summary is needed. */
export const PRICING_SUMMARY =
  "Live online memberships are $36 for 1 month, $99 for 3 months, $180 for 6 months and $300 for 12 months.";

/** Studio pricing is not published publicly. */
export const STUDIO_PRICING_NOTE =
  "Studio membership rates are shared directly — message us on WhatsApp or Zalo for current pricing.";
