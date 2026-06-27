import { motion } from "framer-motion";
import transformImage from "@/assets/transformation-before-after.png.asset.json";

const metrics = [
  { label: "Alignment", detail: "Greater stability and body awareness." },
  { label: "Breath Capacity", detail: "Deeper breathing and inner calm." },
  { label: "Consistency", detail: "Practice becomes a sustainable ritual." },
];

export function Transformation() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent" />

      <div className="container-luxe relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />
            Transformation Story
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2
            className="mt-3 font-display leading-[1.1]"
            style={{ fontSize: "clamp(1.3rem, 2.7vw, 2.1rem)" }}
          >
            Transformation that <span className="italic text-gold-gradient">cannot be faked.</span>
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground"
            style={{ fontSize: "clamp(0.78rem, 0.9vw, 0.88rem)" }}
          >
            Improved posture, emotional balance, discipline and embodied confidence — developed
            through consistent practice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto mt-6"
          style={{ maxWidth: "780px" }}
        >
          <div className="absolute -inset-5 rounded-[2.25rem] bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.25rem] border border-[color:var(--gold)]/30 shadow-[0_40px_100px_-40px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
            <img
              src={transformImage.url}
              alt="Before and after transformation of a Yog Jivan student"
              loading="lazy"
              className="w-full object-cover"
            />
            {/* Labels */}
            <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-border/60 bg-black/55 px-3 py-1 text-[0.55rem] uppercase tracking-[0.24em] text-foreground/85 backdrop-blur-sm">
              Before
            </div>
            <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-[color:var(--gold)]/45 bg-[color:var(--gold)]/15 px-3 py-1 text-[0.55rem] uppercase tracking-[0.24em] text-[color:var(--gold)] backdrop-blur-sm">
              After
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent" />
          </div>
        </motion.div>

        <div className="mx-auto mt-5 grid max-w-3xl gap-2.5 sm:grid-cols-3">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
              className="glass-soft rounded-[0.9rem] px-3 py-2.5"
            >
              <h3
                className="font-display text-gold-gradient leading-tight"
                style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)" }}
              >
                {m.label}
              </h3>
              <p className="mt-1 text-[0.72rem] leading-snug text-muted-foreground">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
