import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import bgRating from "@/assets/img_20260620_125938.jpg.asset.json";
import bgCountries from "@/assets/dji_0014.jpg.asset.json";
import bgYears from "@/assets/img_20260622_114016.jpg.asset.json";
import bgStudents from "@/assets/img_5066.jpg.asset.json";
import bgStudios from "@/assets/4253.jpg.asset.json";

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => (decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString()) + suffix);
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2.2, ease: [0.2, 0.8, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, to, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const STATS = [
  { v: 4.9, suf: "", dec: 1, label: "Google Rating", img: bgRating.url },
  { v: 12, suf: "+", label: "Years Experience", img: bgYears.url },
  { v: 1000, suf: "+", label: "Lives Transformed", img: bgStudents.url },
  { v: 20, suf: "+", label: "Countries Reached", img: bgCountries.url },
  { v: 2, suf: "", label: "Premium Studios", img: bgStudios.url },
];

export function AnimatedStats() {
  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="grid grid-cols-2 gap-px md:grid-cols-5 border border-white/8 bg-white/[0.02] rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative isolate overflow-hidden p-6 md:p-8 text-center min-h-[160px] md:min-h-[200px]"
            >
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-[1400ms] group-hover:scale-110"
                style={{ backgroundImage: `url(${s.img})` }}
              />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_55%,transparent),color-mix(in_oklab,var(--onyx)_88%,transparent))]" />
              <div className="relative font-display text-[clamp(2rem,4.4vw,3.25rem)] text-gold-gradient leading-none">
                <Counter to={s.v} suffix={s.suf} decimals={s.dec ?? 0} />
              </div>
              <div className="relative mt-3 text-[0.58rem] md:text-[0.64rem] uppercase tracking-[0.24em] text-foreground/85">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
