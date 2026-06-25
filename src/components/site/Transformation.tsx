import { motion } from "framer-motion";
import beforeImg from "@/assets/img_20260624_wa0037.jpg.asset.json";
import afterImg from "@/assets/img_0264.jpg.asset.json";

const STORIES = [
  { name: "Mai · 38", journey: "Chronic back pain → pain-free deep backbends", months: 8 },
  { name: "Hieu · 45", journey: "Sedentary executive → daily morning practice", months: 6 },
  { name: "Anh · 29", journey: "Anxiety & insomnia → calm, restorative sleep", months: 4 },
];

export function Transformation() {
  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Transformations</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            The body remembers. The mind <span className="italic text-gold-gradient">follows</span>.
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <img src={beforeImg.url} alt="Practice — early days" className="h-[28rem] w-full object-cover" loading="lazy" />
              <div className="absolute left-3 top-3 rounded-full bg-[color:var(--onyx)]/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">Before</div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 shadow-[var(--shadow-gold)]">
              <img src={afterImg.url} alt="Practice — after months of training" className="h-[28rem] w-full object-cover" loading="lazy" />
              <div className="absolute left-3 top-3 rounded-full bg-[color:var(--gold)]/20 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--gold)] backdrop-blur">After</div>
            </div>
          </motion.div>

          <div className="space-y-5">
            {STORIES.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-luxe rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-xl">{s.name}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">{s.months} months</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.journey}</p>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[color:var(--gold)]/60 to-[color:var(--gold)]" style={{ width: `${60 + i * 12}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
