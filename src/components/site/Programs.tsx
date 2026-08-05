import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const PLANS = [
  {
    name: "Studio Membership",
    tag: "Group Classes",
    blurb: "Daily group practice in our Hai Duong sanctuaries.",
    tiers: [
      { label: "1 Month", price: "700,000", unit: "VND" },
      { label: "3 Months", price: "1,900,000", unit: "VND", best: true },
    ],
    perks: ["Unlimited weekly classes", "Heated & candlelit studios", "Therapeutic alignment focus", "Community circles"],
  },
  {
    name: "Personal Training",
    tag: "1-on-1 Mentorship",
    blurb: "Bespoke sessions designed entirely around you.",
    featured: true,
    tiers: [
      { label: "1 Month", price: "9,000,000", unit: "VND" },
      { label: "3 Months", price: "25,000,000", unit: "VND", best: true },
    ],
    perks: ["Private sessions with Master Anil", "Personalized practice plan", "Therapeutic & lifestyle guidance", "Nutrition & breathwork protocols"],
  },
];

export function Programs() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.755_0.105_80/0.06),transparent_60%)]" />
      <div className="container-luxe relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Programs & Investment</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            Begin your <span className="italic text-gold-gradient">journey</span> — your way.
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Transparent, premium pricing. Every program is an invitation into a longer relationship with your practice.
          </p>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-2">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-[2rem] border p-10 ${
                plan.featured
                  ? "border-[color:var(--gold)]/40 bg-[linear-gradient(180deg,oklch(0.20_0.01_70/0.6),oklch(0.12_0.005_60))] shadow-[var(--shadow-gold)]"
                  : "border-white/8 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.6),oklch(0.13_0.005_60/0.7))]"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--onyx)]/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">
                  <Sparkles className="h-3 w-3" /> Most Transformative
                </span>
              )}
              <p className="eyebrow">{plan.tag}</p>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">{plan.name}</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">{plan.blurb}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {plan.tiers.map((tier) => (
                  <div
                    key={tier.label}
                    className={`rounded-2xl border p-5 transition-all ${
                      tier.best
                        ? "border-[color:var(--gold)]/50 bg-[color:var(--onyx)]/60"
                        : "border-white/8 bg-[color:var(--onyx)]/30"
                    }`}
                  >
                    <div className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{tier.label}</div>
                    <div className="mt-2 font-display text-3xl leading-none text-foreground">
                      {tier.price} <span className="ml-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{tier.unit}</span>
                    </div>
                    {tier.best && <div className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">Best Value</div>}
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {plan.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" hash="consultation" className={`mt-10 inline-flex w-full ${plan.featured ? "btn-gold" : "btn-ghost-gold"}`}>
                Reserve Your Place
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Corporate, retreat & online programs · <Link to="/contact" className="text-[color:var(--gold)] hover:underline">Request bespoke proposal</Link>
        </p>
      </div>
    </section>
  );
}
