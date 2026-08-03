import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { Award, Globe2, Heart, Star, Trophy, Users2 } from "lucide-react";
import { useLang } from "@/lib/language";
// Background imagery temporarily replaced with luxury onyx + gold gradients.
// New optimized imagery will be wired back through `metric.image` later.

type Metric = {
  Icon: typeof Star;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  /** Per-card luxury gradient (onyx base + gold accent). */
  gradient: string;
};

const ONYX_GOLD = (angle: number, accent: string) =>
  `radial-gradient(circle at ${accent}, rgba(212,175,55,0.22), transparent 50%), linear-gradient(${angle}deg, #0a0807 0%, #15110d 55%, #07060a 100%)`;

// Only confirmed, supportable metrics. Unsupported figures (95% retention,
// self-reported average rating) removed — see src/lib/facts/trust.ts.
const METRICS: Metric[] = [
  { Icon: Heart, value: 12, suffix: "+", label: "Years Teaching", gradient: ONYX_GOLD(150, "28% 22%") },
  { Icon: Users2, value: 1000, suffix: "+", label: "Students Taught", gradient: ONYX_GOLD(160, "72% 28%") },
  { Icon: Globe2, value: 20, suffix: "+", label: "Countries Reached", gradient: ONYX_GOLD(140, "50% 18%") },
  { Icon: Star, value: 8, label: "Max Students Per Live Class", gradient: ONYX_GOLD(170, "20% 70%") },
  { Icon: Trophy, value: 2, label: "Studios In Vietnam", gradient: ONYX_GOLD(155, "50% 50%") },
  { Icon: Award, value: 60, label: "Minutes Per Live Session", gradient: ONYX_GOLD(165, "78% 76%") },
];

const PARTICLES = [
  { left: "12%", top: "18%", size: 3, duration: 22, delay: 0 },
  { left: "78%", top: "22%", size: 2, duration: 26, delay: 3 },
  { left: "24%", top: "66%", size: 2.5, duration: 24, delay: 5 },
  { left: "86%", top: "70%", size: 3, duration: 28, delay: 2 },
  { left: "58%", top: "14%", size: 2, duration: 20, delay: 6 },
  { left: "46%", top: "82%", size: 2.5, duration: 30, delay: 4 },
];

function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const formatted = decimals ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
    });
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
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />
            {t.trust.eyebrow}
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="trust-section-title mt-4 fluid-title">{t.trust.title}</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {METRICS.map((m, idx) => (
            <motion.article
              key={m.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="trust-card group relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden rounded-2xl p-5 text-center"
              style={{
                maxHeight: 216,
                minHeight: 180,
                ["--trust-bg" as string]: m.gradient,
              } as CSSProperties}
            >
              <div className="trust-card__bg absolute inset-0" />
              <div className="trust-card__overlay absolute inset-0" />
              <div className="trust-card__vignette absolute inset-0" />
              <div className="trust-card__particles absolute inset-0">
                {PARTICLES.map((particle, particleIdx) => (
                  <span
                    key={`${m.label}-${particleIdx}`}
                    className="trust-card__particle"
                    style={{
                      left: particle.left,
                      top: particle.top,
                      width: particle.size,
                      height: particle.size,
                      animationDelay: `${particle.delay + idx * 0.6}s`,
                      animationDuration: `${particle.duration}s`,
                    }}
                  />
                ))}
              </div>
              <div className="trust-card__shimmer absolute inset-y-0 -left-1/2 w-1/2" style={{ animationDelay: `${idx * 1.25}s` }} />

              <div className="relative z-10 flex flex-col items-center">
                <span className="trust-card__icon grid h-11 w-11 place-items-center rounded-full">
                  <m.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="mt-3 font-display text-4xl leading-none text-gold-gradient md:text-5xl">
                  <CountUp value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
                <p className="trust-card__label mt-2 text-[0.78rem] uppercase tracking-[0.18em]">{m.label}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
