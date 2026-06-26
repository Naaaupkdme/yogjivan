import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import imgPrivate from "@/assets/img_5569.jpg.asset.json";
import imgStudio from "@/assets/fb_img_1685724561436.jpg.asset.json";
import imgAcro from "@/assets/yog_jivan_acro_arch.png.asset.json";
import imgTherapeutic from "@/assets/img_20260624_wa0037.jpg.asset.json";
import imgOnline from "@/assets/online-practice.png.asset.json";
import imgMeditation from "@/assets/img_20260620_125938.jpg.asset.json";
import imgCorporate from "@/assets/corporate-event.jpg.asset.json";
import { useLang } from "@/lib/language";

const services = [
  {
    title: "Private Transformation",
    benefit: "Personal assessment, customized sequence, hands-on posture correction, lifestyle guidance, and accountability.",
    outcome: "Expected outcome: deeper mobility, body intelligence, measurable calm.",
    image: imgPrivate,
    to: "/personal-training",
  },
  {
    title: "Luxury Studio Classes",
    benefit: "Curated group practice for up to 50 students inside our premium Hai Duong sanctuary environment.",
    outcome: "Expected outcome: consistency, ritual, and visible weekly progress.",
    image: imgStudio,
    to: "/programs",
  },
  {
    title: "Acro & Advanced Mastery",
    benefit: "Balance, strength, flexibility, and partner trust through aspirational advanced practice.",
    outcome: "Expected outcome: breakthrough confidence and elevated technical range.",
    image: imgAcro,
    to: "/programs",
  },
  {
    title: "Therapeutic Recovery",
    benefit: "Back pain, neck pain, sciatica, stress, posture correction, mobility restoration, anxiety support.",
    outcome: "Expected outcome: restored comfort, breath capacity, and sustainable daily movement.",
    image: imgTherapeutic,
    to: "/programs",
  },
  {
    title: "Online Global Practice",
    benefit: "Live interactive sessions, global access, and community accountability for students worldwide.",
    outcome: "Expected outcome: structure, continuity, and depth wherever you live.",
    image: imgOnline,
    to: "/online",
  },
  {
    title: "Meditation & Breathwork",
    benefit: "Stress reduction, emotional balance, mental clarity, and deep relaxation through guided stillness.",
    outcome: "Expected outcome: clarity, sleep quality, presence, and emotional resilience.",
    image: imgMeditation,
    to: "/programs",
  },
  {
    title: "Corporate Wellness",
    benefit: "Bespoke programs for executive teams — boardroom mobility, breathwork, and stress recovery on-site.",
    outcome: "Expected outcome: sharper focus, fewer absences, and measurable team wellbeing.",
    image: imgCorporate,
    to: "/corporate",
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
                  <img src={service.image.url} alt={service.title} className="h-[240px] sm:h-[280px] md:h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
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
