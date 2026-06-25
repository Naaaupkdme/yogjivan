import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import bgImg from "@/assets/file_00000000cca471fbb8967be0b0dfeda8.png.asset.json";

export function QuoteParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={bgImg.url} alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--onyx)] via-[color:var(--onyx)]/85 to-[color:var(--onyx)]" />
      <div className="relative z-10 container-luxe py-24 md:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl"
        >
          <div className="text-gold-gradient font-display text-5xl md:text-6xl leading-none">"</div>
          <blockquote className="mt-2 font-display italic text-[clamp(1.4rem,3.5vw,2.4rem)] leading-snug">
            Yoga is the journey of the self, through the self, to the self.
          </blockquote>
          <div className="mt-6 text-[0.7rem] uppercase tracking-[0.32em] text-[color:var(--gold)]">— The Bhagavad Gita</div>
        </motion.div>
      </div>
    </section>
  );
}
