import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/file_00000000c9fc71fb801dd14554d92fa7.png.asset.json";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={heroImg.url}
          alt="Yog Jivan studio — luxurious candlelit yoga sanctuary in Hai Duong, Vietnam"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--onyx)]/70 via-[color:var(--onyx)]/40 to-[color:var(--onyx)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,oklch(0.10_0.005_60/0.6)_75%)]" />

      {/* Floating ambient orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.18),transparent_70%)] blur-3xl" style={{ animation: "breathe 12s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.12),transparent_70%)] blur-3xl" style={{ animation: "breathe 16s ease-in-out infinite reverse" }} />

      {/* Particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-[color:var(--gold)]/40"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 47) % 100}%`,
            animation: `float-y ${8 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 flex h-full items-center">
        <div className="container-luxe">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="eyebrow"
          >
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            Yoga · Wellness · Transformation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-5xl text-[clamp(2.4rem,6.5vw,4.8rem)] leading-[1.02]"
          >
            Transform your body.
            <br />
            <span className="italic text-gold-gradient">Elevate</span> your mind.
            <br />
            Experience true wellness.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Premium yoga, therapeutic healing and holistic wellness with Master Anil Choudhary —
            twelve years of authentic practice, distilled into a sanctuary in Hai Duong, Vietnam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/contact" className="btn-gold">Book Free Trial</Link>
            <Link to="/programs" className="btn-ghost-gold">Explore Programs</Link>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.4 }}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-6"
          >
            {[
              ["12+", "Years Experience"],
              ["2", "Premium Studios"],
              ["1000+", "Lives Transformed"],
            ].map(([k, v]) => (
              <div key={v} className="text-left">
                <div className="font-display text-3xl text-gold-gradient md:text-4xl">{k}</div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.6rem] uppercase tracking-[0.32em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[color:var(--gold)]" />
        </div>
      </motion.div>
    </section>
  );
}
