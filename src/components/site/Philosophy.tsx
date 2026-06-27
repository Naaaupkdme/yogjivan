import { motion } from "framer-motion";
import founderImg from "@/assets/img_20260620_125938.jpg.asset.json";

export function Philosophy() {
  return (
    <section className="section-tight relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_55%)]" />
      <div className="container-luxe relative">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-[1fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="eyebrow">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              Our Philosophy
            </p>
            <h2
              className="mt-5 font-display leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)" }}
            >
              Yoga is not exercise.
              <br />
              <span className="italic text-gold-gradient">It is a return to balance.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-foreground/85">
              At Yog Jivan, every session is designed to restore harmony between body, breath, mind
              and soul.
            </p>
            <p className="mt-4 max-w-xl text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
              We blend authentic Indian yogic wisdom with therapeutic expertise to create deeply
              transformative experiences for modern life.
            </p>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.32em] text-[color:var(--gold)]/80">
              Master Anil Choudhary · Founder
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/30 shadow-[0_40px_100px_-40px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
              <img
                src={founderImg.url}
                alt="Master Anil Choudhary in meditation"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_oklab,var(--onyx)_70%,transparent))]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
