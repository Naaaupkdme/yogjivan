import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import serviceA from "@/assets/yog_jivan_acro_arch.png.asset.json";
import serviceB from "@/assets/yog_jivan_acro_stack.png.asset.json";
import serviceC from "@/assets/yog_jivan_acro_twins.png.asset.json";
import serviceD from "@/assets/yog_jivan_acro_flying.png.asset.json";
import serviceE from "@/assets/fb_img_1691544924455.jpg.asset.json";
import serviceF from "@/assets/fb_img_1690971312359.jpg.asset.json";
import { useLang } from "@/lib/language";

const services = [
  {
    title: "Private Transformation",
    benefit: "A fully personalized practice for posture, pain relief, confidence, and inner stillness.",
    outcome: "Expected outcome: deeper mobility, body intelligence, measurable calm.",
    image: serviceA,
    to: "/personal-training",
  },
  {
    title: "Luxury Studio Classes",
    benefit: "Curated group classes inside a premium sanctuary atmosphere with refined guidance.",
    outcome: "Expected outcome: consistency, ritual, and visible weekly progress.",
    image: serviceB,
    to: "/programs",
  },
  {
    title: "Acro & Advanced Mastery",
    benefit: "Aspirational strength, control, balance, and trust-building through advanced practice.",
    outcome: "Expected outcome: breakthrough confidence and elevated technical range.",
    image: serviceC,
    to: "/programs",
  },
  {
    title: "Therapeutic Recovery",
    benefit: "Gentle, intelligent sequences for back pain, joints, stress, tension, and fatigue.",
    outcome: "Expected outcome: restored comfort, breath capacity, and sustainable daily movement.",
    image: serviceD,
    to: "/programs",
  },
  {
    title: "Online Global Practice",
    benefit: "Live and remote coaching for students outside Hai Duong who still want personal depth.",
    outcome: "Expected outcome: structure, accountability, and continuity wherever you live.",
    image: serviceE,
    to: "/online",
  },
  {
    title: "Meditation & Breathwork",
    benefit: "Nervous-system calming, emotional reset, and spiritual grounding through guided stillness.",
    outcome: "Expected outcome: clarity, sleep quality, presence, and emotional resilience.",
    image: serviceF,
    to: "/programs",
  },
];

export function Services() {
  const { t } = useLang();

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--gold)_12%,transparent),transparent_40%)]" />
      <div className="container-luxe relative">
        <div className="max-w-3xl">
          <p className="eyebrow"><span className="h-px w-10 bg-primary" />{t.services.eyebrow}</p>
          <h2 className="mt-5 fluid-title max-w-[14ch]">{t.services.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.services.sub}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.06 }}
            >
              <Link to={service.to} className="glass-luxe hover-lift group block overflow-hidden rounded-[1.6rem]">
                <div className="relative overflow-hidden">
                  <img src={service.image.url} alt={service.title} className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--onyx)_58%,transparent))]" />
                  <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-card/35 text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[0.64rem] uppercase tracking-[0.24em] text-primary">Signature service</div>
                  <h3 className="mt-3 text-[1.75rem] leading-tight">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.benefit}</p>
                  <div className="gold-hairline my-5" />
                  <p className="text-sm leading-relaxed text-foreground/85">{service.outcome}</p>
                  <div className="mt-5 text-[0.68rem] uppercase tracking-[0.24em] text-primary">Discover pathway</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
