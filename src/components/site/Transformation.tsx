import { motion } from "framer-motion";
import transformImage from "@/assets/transformation-before-after.png.asset.json";

const metrics = [
  {
    label: "Postural Alignment",
    detail: "Greater stability, body awareness and ease in everyday movement.",
  },
  {
    label: "Breath & Nervous System",
    detail: "Deeper breathing, emotional regulation and inner calm.",
  },
  {
    label: "Lifestyle Discipline",
    detail: "From occasional practice to a sustainable wellness ritual.",
  },
];

export function Transformation() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(60px, 8vw, 90px)", paddingBottom: "clamp(60px, 8vw, 90px)" }}
    >
      {/* Golden ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent" />

      <div className="container-luxe relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />
            Transformation Story
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2
            className="mt-4 font-display leading-[1.08]"
            style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.7rem)" }}
          >
            Transformation that <span className="italic text-gold-gradient">cannot be faked.</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground"
            style={{ fontSize: "clamp(0.85rem, 1vw, 0.98rem)" }}
          >
            At Yog Jivan, we do not showcase artificial before-and-after marketing. We reveal
            something deeper — improved posture, emotional balance, discipline, breath awareness
            and embodied confidence developed through consistent practice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto mt-8 max-w-5xl"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/30 shadow-[0_40px_100px_-40px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
            <img
              src={transformImage.url}
              alt="Before and after transformation of a Yog Jivan student"
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-3">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              className="glass-soft rounded-[1.1rem] px-4 py-3"
            >
              <h3
                className="font-display text-gold-gradient"
                style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.1rem)" }}
              >
                {m.label}
              </h3>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-border/60 bg-card/35 px-4 py-3">
            <div className="text-[0.6rem] uppercase tracking-[0.24em] text-primary">Before</div>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
              Beginning the journey. Limited mobility, stress accumulation and inconsistent
              self-care habits.
            </p>
          </div>
          <div className="rounded-[1rem] border border-[color:var(--gold)]/35 bg-[color:var(--gold)]/5 px-4 py-3">
            <div className="text-[0.6rem] uppercase tracking-[0.24em] text-primary">After</div>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
              Embodied transformation. Greater vitality, confidence, emotional balance and physical
              freedom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
