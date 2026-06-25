import { motion } from "framer-motion";
import { Users, User, Wifi, HeartPulse, Building2, Flame, Scale, Brain, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SERVICES = [
  { Icon: Users, t: "Studio Group Classes", d: "Small, curated classes in our candlelit Hai Duong studios.", to: "/programs" },
  { Icon: User, t: "Personal Yoga Training", d: "One-on-one mentorship calibrated to your body and goals.", to: "/personal-training" },
  { Icon: Wifi, t: "Online Yoga Programs", d: "Live and on-demand programs for students across the globe.", to: "/online" },
  { Icon: HeartPulse, t: "Therapeutic Yoga", d: "Healing protocols for spine, joints and chronic conditions.", to: "/programs" },
  { Icon: Building2, t: "Corporate Wellness", d: "On-site and virtual programs for high-performing teams.", to: "/corporate" },
  { Icon: Flame, t: "Flexibility Training", d: "Progressive mobility work — splits, backbends, deep openers.", to: "/programs" },
  { Icon: Scale, t: "Weight Loss Yoga", d: "Dynamic vinyasa sequences paired with mindful nutrition.", to: "/programs" },
  { Icon: Brain, t: "Stress Management", d: "Breathwork, meditation and restorative rituals for the mind.", to: "/programs" },
];

export function Services() {
  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">The Offerings</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            Eight pathways to a <span className="italic text-gold-gradient">transformed</span> life.
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Whether your intention is healing, strength, stillness or sustained transformation — there is a practice shaped for you.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ Icon, t, d, to }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
            >
              <Link
                to={to}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.6),oklch(0.13_0.005_60/0.8))] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[color:var(--gold)]/40 hover:shadow-[var(--shadow-luxe)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--onyx)]/60 text-[color:var(--gold)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--gold)]" />
                </div>
                <h3 className="mt-6 font-display text-xl leading-tight">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-[color:var(--gold)]/40 via-transparent to-transparent" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
