import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import studioVideo from "@/assets/studio-practice.mp4.asset.json";

export function CinematicSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section ref={ref} className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          src={studioVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--onyx)] via-transparent to-[color:var(--onyx)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.10_0.005_60/0.65)_85%)]" />
      <div className="relative z-10 flex h-full items-center">
        <div className="container-luxe">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="eyebrow"
          >
            <span className="h-px w-8 bg-[color:var(--gold)]" />
            The Sanctuary
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 max-w-3xl fluid-display font-display"
          >
            Where breath becomes <span className="italic text-gold-gradient">art</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-5 max-w-xl text-muted-foreground text-[clamp(0.95rem,1.4vw,1.05rem)]"
          >
            Step into our candlelit studios — designed as a contemporary retreat for the modern soul.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
