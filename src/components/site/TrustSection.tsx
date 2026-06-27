import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Award, Globe2, Heart, Star, Trophy, Users2 } from "lucide-react";
import { useLang } from "@/lib/language";

type Metric = {
  Icon: typeof Star;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

const METRICS: Metric[] = [
  { Icon: Star, value: 4.9, decimals: 1, suffix: "★", label: "Average Rating" },
  { Icon: Users2, value: 1000, suffix: "+", label: "Students Served" },
  { Icon: Globe2, value: 20, suffix: "+", label: "Countries Reached" },
  { Icon: Heart, value: 12, suffix: "+", label: "Years Experience" },
  { Icon: Trophy, value: 100, suffix: "%", label: "Certified Indian Yoga Master" },
  { Icon: Award, value: 95, suffix: "%", label: "Student Retention" },
];

function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.8, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function TrustSection() {
  const { t } = useLang();

  return (
    <section className="section-tight relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_50%)]" />
      <div className="container-luxe relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />
            {t.trust.eyebrow}
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-4 fluid-title">{t.trust.title}</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m, idx) => (
            <motion.article
              key={m.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-[color:var(--gold)]/20 bg-[linear-gradient(180deg,oklch(0.16_0.008_60/0.85),oklch(0.10_0.005_60/0.95))] p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]/55 hover:shadow-[0_28px_70px_-30px_color-mix(in_oklab,var(--gold)_65%,transparent)]"
              style={{ maxHeight: 216, minHeight: 180 }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/45 bg-black/35 text-[color:var(--gold)] shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--gold)_60%,transparent)] transition-transform duration-500 group-hover:scale-110">
                <m.Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="mt-3 font-display text-4xl md:text-5xl leading-none text-gold-gradient">
                <CountUp value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="mt-2 h-px w-10 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
              <p className="mt-2 text-[0.78rem] uppercase tracking-[0.18em] text-foreground/80">
                {m.label}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
