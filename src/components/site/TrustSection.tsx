import { motion } from "framer-motion";
import { Award, Globe2, ShieldCheck, Star, Users2, Video } from "lucide-react";
import trustImage from "@/assets/img_20260620_125938.jpg.asset.json";
import groupImage from "@/assets/img_20260621_105308.jpg.asset.json";
import { useLang } from "@/lib/language";

const proofs = [
  { Icon: Star, title: "4.9 Google rating", body: "Premium service quality, warm guidance, and repeat referrals from real students." },
  { Icon: Users2, title: "1000+ students served", body: "From first-time practitioners to advanced seekers and therapeutic clients." },
  { Icon: Globe2, title: "20+ countries reached", body: "In-studio and online experiences designed for a global, bilingual audience." },
  { Icon: ShieldCheck, title: "Therapeutic trust", body: "Carefully guided work for mobility, stress, breath, posture, and body confidence." },
  { Icon: Award, title: "Lineage & discipline", body: "Traditional Indian yoga values expressed with modern hospitality and professionalism." },
  { Icon: Video, title: "Video testimonial ready", body: "Student stories, spoken praise, and visible outcomes integrated across the experience." },
];

export function TrustSection() {
  const { t } = useLang();

  return (
    <section className="section-tight relative overflow-hidden">
      <div className="container-luxe">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />{t.trust.eyebrow}</p>
            <h2 className="mt-5 fluid-title max-w-[12ch]">{t.trust.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.trust.sub}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="glass-luxe overflow-hidden rounded-[1.5rem] p-4">
                <img src={trustImage.url} alt="Master Anil in calm meditative practice" className="aspect-[4/5] w-full rounded-[1.2rem] object-cover" loading="lazy" />
                <div className="mt-4 text-[0.64rem] uppercase tracking-[0.24em] text-primary">Founder credibility</div>
              </div>
              <div className="glass-luxe overflow-hidden rounded-[1.5rem] p-4">
                <img src={groupImage.url} alt="Yog Jivan community students gathered together" className="aspect-[4/5] w-full rounded-[1.2rem] object-cover" loading="lazy" />
                <div className="mt-4 text-[0.64rem] uppercase tracking-[0.24em] text-primary">Community trust</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {proofs.map(({ Icon, title, body }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: idx * 0.05 }}
                className="glass-soft hover-lift rounded-[1.4rem] p-5"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/25 bg-card/50 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
