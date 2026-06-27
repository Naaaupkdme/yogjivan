import { motion } from "framer-motion";
import founderImg from "@/assets/img_20260620_125938.jpg.asset.json";

export function Philosophy() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_55%)]" />
      <div className="container-luxe relative">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1fr_auto_0.6fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-[620px]"
          >
            <p className="eyebrow">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              Our Philosophy
            </p>
            <h2
              className="mt-4 font-display leading-[1.08]"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)" }}
            >
              Yoga is the art of
              <br />
              <span className="italic text-gold-gradient">returning home to yourself.</span>
            </h2>
            <p className="mt-5 text-[0.95rem] md:text-base leading-relaxed text-foreground/85">
              At Yog Jivan, yoga is not taught as exercise. It is offered as a path back to balance
              — restoring harmony between body, breath, mind and soul.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Rooted in authentic Indian yogic traditions and refined through therapeutic expertise,
              every session is designed for lasting transformation in modern life.
            </p>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
            <p
              className="mt-4 font-display italic text-gold-gradient"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}
            >
              — Master Anil Choudhary
            </p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--gold)]/75">
              Founder, Yog Jivan
            </p>
          </motion.div>

          {/* Golden divider */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            aria-hidden
            className="hidden lg:block h-56 w-px origin-center bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mx-auto w-full"
            style={{ maxWidth: "270px" }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.25rem] border border-[color:var(--gold)]/30 shadow-[0_40px_100px_-40px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
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
