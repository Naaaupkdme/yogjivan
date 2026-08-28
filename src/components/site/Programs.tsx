import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { STUDIO_PRICING_NOTE } from "@/lib/facts/pricing";

// Studio (VND) rates are deliberately NOT published — see src/lib/facts/pricing.ts.
// Never reintroduce hard-coded VND price cards here.
const STUDIO = {
  name: "Studio Membership",
  tag: "Group Classes",
  blurb: "Group practice Monday to Saturday at our two studios serving the Hai Duong urban area.",
  perks: [
    "In-person group classes with the Yog Jivan teaching team",
    "Guidance and modifications during live practice",
    "Two studios serving the Hai Duong urban area",
  ],
};

const PRIVATE_PERKS = [
  "Live 60-minute private sessions with a matched Yog Jivan teacher",
  "You normally continue with the same dedicated teacher session after session",
  "Practice adapted to your experience and goals",
  "Real-time posture guidance",
  "Available in the Hai Duong studios or live online",
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
            Yog Jivan offers studio group classes in the Hai Duong urban area, private 60-minute yoga in studio or
            online by enquiry, and live small-group online classes for up to 8 students. Studio and private-session
            rates are shared directly and confirmed before you decide.
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

            <div className="mt-8 rounded-2xl border border-white/10 bg-[color:var(--onyx)]/40 p-6">
              <div className="font-display text-2xl leading-none text-foreground">Rates shared directly</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{STUDIO_PRICING_NOTE}</p>
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
            <p className="mt-3 max-w-md text-sm text-muted-foreground">Bespoke sessions designed entirely around you, with a Yog Jivan teacher matched to your goals.</p>

            <div className="mt-8 rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--onyx)]/60 p-6">
              <div className="font-display text-2xl leading-none text-foreground">Pricing by enquiry</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Private sessions are arranged around your goals, preferred format and scheduling needs, and are taught
                by a matched Yog Jivan teacher you normally continue with. Current pricing
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
