import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString() + suffix);
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2.2, ease: [0.2, 0.8, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, to, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const STATS = [
  { v: 12, suf: "+", label: "Years Experience" },
  { v: 2, suf: "", label: "Premium Studios" },
  { v: 1000, suf: "+", label: "Lives Transformed" },
  { v: 20, suf: "+", label: "Countries Served" },
];

export function AnimatedStats() {
  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4 border border-white/8 bg-white/[0.02] rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[color:var(--onyx)] p-6 md:p-10 text-center"
            >
              <div className="font-display text-[clamp(2.25rem,5vw,3.5rem)] text-gold-gradient leading-none">
                <Counter to={s.v} suffix={s.suf} />
              </div>
              <div className="mt-3 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
