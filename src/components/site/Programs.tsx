import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const STUDIO = {
  name: "Studio Membership",
  tag: "Group Classes",
  blurb: "Daily group practice in our Hai Duong sanctuaries.",
  tiers: [
    { label: "1 Month", price: "700,000", unit: "VND" },
    { label: "3 Months", price: "1,900,000", unit: "VND", best: true },
  ],
  perks: ["Unlimited weekly classes", "Heated & candlelit studios", "Therapeutic alignment focus", "Community circles"],
};

const PRIVATE_PERKS = [
  "Live 60-minute sessions with Master Anil",
  "Practice adapted to your experience and goals",
  "Real-time posture guidance",
  "Available in Hai Duong or live online",
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
            Yog Jivan offers studio group classes in Hai Duong, private 60-minute yoga in studio or online by enquiry,
            and live small-group online classes for up to 8 students. Studio membership prices are shown below;
            private-session pricing is confirmed before booking.
          </p>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-2">
          {/* Studio Membership */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.6),oklch(0.13_0.005_60/0.7))] p-10"
          >
            <p className="eyebrow">{STUDIO.tag}</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl">{STUDIO.name}</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">{STUDIO.blurb}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {STUDIO.tiers.map((tier) => (
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
              {STUDIO.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact" hash="consultation" className="mt-10 inline-flex w-full btn-ghost-gold">
              Reserve Your Place
            </Link>
          </motion.div>

          {/* Private 1-on-1 Yoga */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-[color:var(--gold)]/40 bg-[linear-gradient(180deg,oklch(0.20_0.01_70/0.6),oklch(0.12_0.005_60))] p-10 shadow-[var(--shadow-gold)]"
          >
            <p className="eyebrow">Private 1-on-1 Yoga</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl">Personal Training</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">Bespoke sessions designed entirely around you.</p>

            <div className="mt-8 rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--onyx)]/60 p-6">
              <div className="font-display text-2xl leading-none text-foreground">Pricing by enquiry</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Private sessions are arranged around your goals, preferred format and scheduling needs. Current pricing
                and available times are confirmed before you decide. No payment is requested on this page.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {PRIVATE_PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact" hash="consultation" className="mt-10 inline-flex w-full btn-gold">
              Enquire About Private Yoga
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link to="/private-online-yoga" className="text-[color:var(--gold)] hover:underline">
                See how private yoga works
              </Link>
            </p>
          </motion.div>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Corporate & online programs · <Link to="/contact" className="text-[color:var(--gold)] hover:underline">Request bespoke proposal</Link>
        </p>
      </div>
    </section>
  );
}
