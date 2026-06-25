import { motion } from "framer-motion";
import masterMeditation from "@/assets/img_20260620_125938.jpg.asset.json";
import earlyStudio from "@/assets/fb_img_1690971312359.jpg.asset.json";
import outdoorMastery from "@/assets/fb_img_1691544924455.jpg.asset.json";
import { useLang } from "@/lib/language";

const MILESTONES = [
  { year: "2013", title: "Started Yoga", body: "The disciplined path began with deep classical practice and daily devotion." },
  { year: "2017", title: "Arrived in Vietnam", body: "A new chapter opened — bringing Indian yoga philosophy into a growing international community." },
  { year: "2019", title: "Built Yog Jivan", body: "Yog Jivan was shaped as a sanctuary of healing, elegance, and human transformation." },
  { year: "2022", title: "Opened Premium Studios", body: "The studio experience evolved into a refined physical space designed for calm, care, and trust." },
  { year: "Today", title: "Global Online Mission", body: "Students across countries now practice inside the same circle of unity, wherever they are." },
];

export function FounderJourney() {
  const { t } = useLang();

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-15" />
      <div className="container-luxe relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <div>
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />{t.story.eyebrow}</p>
            <h2 className="mt-5 fluid-title max-w-[12ch]">{t.story.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.story.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[masterMeditation, earlyStudio, outdoorMastery].map((image, idx) => (
                <motion.img
                  key={image.url}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, delay: idx * 0.08 }}
                  src={image.url}
                  alt={[
                    "Master Anil meditating outdoors",
                    "Early Yog Jivan studio practice",
                    "Master Anil in advanced outdoor backbend",
                  ][idx]}
                  className="aspect-[4/5] w-full rounded-[1.5rem] border border-border/70 object-cover shadow-[var(--shadow-luxe)]"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="min-w-[54rem]">
              <div className="gold-hairline mt-10" />
              <div className="mt-8 grid grid-cols-5 gap-5">
                {MILESTONES.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.75, delay: index * 0.08 }}
                    className="relative"
                  >
                    <div className="absolute -top-[2.15rem] left-0 h-4 w-4 rounded-full border border-primary/60 bg-background" />
                    <div className="glass-luxe h-full rounded-[1.5rem] p-5">
                      <div className="text-[0.66rem] uppercase tracking-[0.26em] text-primary">{item.year}</div>
                      <h3 className="mt-3 text-2xl leading-tight">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
