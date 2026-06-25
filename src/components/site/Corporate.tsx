import { motion } from "framer-motion";
import { Briefcase, Brain, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import img from "@/assets/mg_1753.cr2.jpg.asset.json";

const BENEFITS = [
  { Icon: Brain, t: "Reduced Stress", d: "Measurable drops in cortisol and reactive anxiety." },
  { Icon: TrendingUp, t: "Improved Productivity", d: "Sharper focus, fewer sick days, better decisions." },
  { Icon: Heart, t: "Employee Wellness", d: "A tangible benefit your team will thank you for." },
  { Icon: Briefcase, t: "Focus & Energy", d: "Sustained attention through long, demanding days." },
];

export function Corporate() {
  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[var(--shadow-luxe)]"
          >
            <img src={img.url} alt="Group yoga class at sunrise" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--onyx)]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[color:var(--gold)]">For organizations</p>
              <p className="mt-2 font-display text-2xl text-foreground">A wellness program your team will actually keep.</p>
            </div>
          </motion.div>

          <div>
            <p className="eyebrow">Corporate Wellness</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Bring stillness into the <span className="italic text-gold-gradient">workplace</span>.
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              On-site and virtual programs designed for high-performing teams — calibrated for executives, knowledge workers and creative leaders.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {BENEFITS.map(({ Icon, t, d }, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/8 bg-[color:var(--charcoal)]/50 p-5"
                >
                  <Icon className="h-5 w-5 text-[color:var(--gold)]" />
                  <div className="mt-3 font-display">{t}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
                </motion.div>
              ))}
            </div>

            <Link to="/contact" className="btn-gold mt-10 inline-flex">
              Request Proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
