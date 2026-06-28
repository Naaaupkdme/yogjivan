import { motion } from "framer-motion";
import { masterImages, masterAlts } from "@/lib/images";
const aboutImg = { url: masterImages.advancedHeadstand };
const aboutImg2 = { url: masterImages.armBalance };
import { Sparkles, HeartHandshake, Flower2, Globe2 } from "lucide-react";

const PILLARS = [
  { Icon: Sparkles, t: "12+ Years of Mastery", d: "A lifetime of authentic practice rooted in traditional Hatha and modern therapeutic yoga." },
  { Icon: Flower2, t: "Therapeutic Yoga", d: "Targeted protocols for spine health, mobility, hormonal balance and chronic pain." },
  { Icon: HeartHandshake, t: "Holistic Wellness", d: "Mind, body and breath — woven into a daily ritual you can sustain for life." },
  { Icon: Globe2, t: "Global Community", d: "Students across Vietnam, India, Europe and beyond — one circle of unity." },
];

export function About() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.10),transparent_70%)] blur-3xl" />

      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[var(--shadow-luxe)]">
            <img src={aboutImg.url} alt={masterAlts.advancedHeadstand} width="1280" height="1700" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--onyx)]/40 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -bottom-10 -right-6 hidden w-56 overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 shadow-[var(--shadow-gold)] md:block"
          >
            <img src={aboutImg2.url} alt={masterAlts.armBalance} width="900" height="600" className="h-72 w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border border-[color:var(--gold)]/30" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />The Master</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            A practice forged over <span className="italic text-gold-gradient">twelve years</span>, offered in stillness.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Master Anil Choudhary brings the depth of classical Indian yoga to Vietnam — guiding seekers through a path of physical mastery, therapeutic healing and inner transformation. Every breath, every pose, every silence is intentional.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PILLARS.map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass-luxe group rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/40"
              >
                <Icon className="h-5 w-5 text-[color:var(--gold)] transition-transform group-hover:scale-110" />
                <div className="mt-3 font-display text-lg">{t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
