import { motion } from "framer-motion";
import {
  Flame,
  HeartPulse,
  Globe2,
  Sparkles,
  Leaf,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    Icon: Flame,
    title: "Authentic Indian Yoga Tradition",
    body: "Lineage-rooted asana, pranayama and meditation drawn from classical Indian schools.",
  },
  {
    Icon: HeartPulse,
    title: "Therapeutic Expertise",
    body: "Programs for back pain, PCOD, anxiety, recovery and post-injury healing.",
  },
  {
    Icon: Sparkles,
    title: "Personalized Guidance",
    body: "Every program is tuned to your body, history and goals — never one-size-fits-all.",
  },
  {
    Icon: Globe2,
    title: "International Community",
    body: "Students from 20+ countries practicing in-studio in Vietnam and live online.",
  },
  {
    Icon: Leaf,
    title: "Holistic Lifestyle Support",
    body: "Nutrition, breathwork, sleep and stress practices for a complete wellness shift.",
  },
  {
    Icon: Users,
    title: "Small Group Attention",
    body: "Intimate class sizes ensure correction, safety and personal evolution.",
  },
];

export function WhyChoose() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-luxe relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" /> Why Yog Jivan
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-5 fluid-title">A practice held with care.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Six reasons students stay — and bring their families.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, body }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              className="glass-luxe group relative overflow-hidden p-6 sm:p-7"
              style={{ borderRadius: 28 }}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-full border"
                style={{
                  borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)",
                  background:
                    "linear-gradient(180deg, color-mix(in oklab, var(--gold) 12%, transparent), transparent)",
                  color: "var(--gold)",
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl leading-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)",
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
