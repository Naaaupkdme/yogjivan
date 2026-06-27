import { motion } from "framer-motion";
import { Award, Globe2, ShieldCheck, Star, Users2, Video } from "lucide-react";
import bgGoogle from "@/assets/img_20260621_105308.jpg.asset.json";
import bgStudents from "@/assets/fb_img_1685723528749.jpg.asset.json";
import bgCountries from "@/assets/dji_0014.jpg.asset.json";
import bgTherapy from "@/assets/img_5570.jpg.asset.json";
import bgLineage from "@/assets/img_20260620_125938.jpg.asset.json";
import bgVideo from "@/assets/img_20260624_wa0037.jpg.asset.json";
import { useLang } from "@/lib/language";

const proofs = [
  { Icon: Star, title: "4.9 Google Rating", body: "Premium service quality and warm guidance reflected in real student reviews.", bg: bgGoogle.url },
  { Icon: Users2, title: "1000+ Students Served", body: "From first-time practitioners to advanced seekers and therapeutic clients.", bg: bgStudents.url },
  { Icon: Globe2, title: "20+ Countries Reached", body: "In-studio and online experiences designed for a global, bilingual audience.", bg: bgCountries.url },
  { Icon: ShieldCheck, title: "Therapeutic Trust", body: "Carefully guided work for mobility, stress, breath, posture, and recovery.", bg: bgTherapy.url },
  { Icon: Award, title: "Lineage & Discipline", body: "Traditional Indian yoga values expressed with modern hospitality.", bg: bgLineage.url },
  { Icon: Video, title: "Video Testimonial Ready", body: "Student stories, spoken praise, and visible outcomes — on record.", bg: bgVideo.url },
];

export function TrustSection() {
  const { t } = useLang();

  return (
    <section className="section-tight relative overflow-hidden">
      <div className="container-luxe">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{t.trust.eyebrow}<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title">{t.trust.title}</h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">{t.trust.sub}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proofs.map(({ Icon, title, body, bg }, idx) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-[1.3rem] ring-1 ring-[color-mix(in_oklab,var(--gold)_18%,transparent)] shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--gold)_30%,transparent)] cursor-default"
              style={{ aspectRatio: "4 / 3.4" }}
            >
              {/* Number badge */}
              <div className="absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-md border border-[color:var(--gold)]/40 bg-black/60 backdrop-blur text-[0.68rem] tracking-[0.1em] text-[color:var(--gold)]">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <img
                src={bg} alt="" loading="lazy" aria-hidden
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_45%,transparent),color-mix(in_oklab,var(--onyx)_88%,transparent)_55%,color-mix(in_oklab,var(--onyx)_96%,transparent))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-2.5 rounded-[1.05rem] border border-[color:var(--gold)]/0 group-hover:border-[color:var(--gold)]/30 transition-colors duration-700" />

              <div className="relative z-10 flex h-full flex-col items-center justify-end p-5 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-black/30 backdrop-blur-md text-[color:var(--gold)] shadow-[0_0_22px_-4px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-[1.7rem] leading-tight text-foreground">{title}</h3>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
                <p className="mt-2 max-w-[28ch] text-[0.78rem] leading-relaxed text-foreground/80">{body}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
