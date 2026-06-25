import { motion } from "framer-motion";
import masterMeditation from "@/assets/img_20260620_125938.jpg.asset.json";
import earlyStudio from "@/assets/fb_img_1690971312359.jpg.asset.json";
import outdoorMastery from "@/assets/fb_img_1691544924455.jpg.asset.json";
import { useLang } from "@/lib/language";

const MILESTONES = [
  { year: "2013", title: "Started Yoga", body: "Daily devotion. Deep classical practice." },
  { year: "2017", title: "Arrived in Vietnam", body: "Indian philosophy meets a new community." },
  { year: "2019", title: "Built Yog Jivan", body: "A sanctuary of healing and elegance was shaped." },
  { year: "2022", title: "Premium Studios", body: "A refined physical space for calm and trust." },
  { year: "Today", title: "Global Mission", body: "Students across countries practice as one." },
];

export function FounderJourney() {
  const { t } = useLang();
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)" }} />
      <div className="container-luxe relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <div>
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />{t.story.eyebrow}</p>
            <h2 className="mt-5 fluid-title max-w-[12ch]">{t.story.title}</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.story.intro}</p>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[masterMeditation, earlyStudio, outdoorMastery].map((image, idx) => (
                <motion.img
                  key={image.url}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  src={image.url} alt="" loading="lazy"
                  className="h-[140px] sm:h-[200px] md:h-[260px] w-full rounded-[1.25rem] border border-border/70 object-cover shadow-[var(--shadow-luxe)]"
                />
              ))}
            </div>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block overflow-x-auto no-scrollbar pb-2">
            <div className="min-w-[54rem]">
              <div className="gold-hairline mt-10" />
              <div className="mt-8 grid grid-cols-5 gap-4">
                {MILESTONES.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className="relative"
                  >
                    <div className="absolute -top-[2.15rem] left-0 h-3.5 w-3.5 rounded-full border border-primary/60 bg-background" />
                    <div className="glass-luxe h-full rounded-[1.25rem] p-4">
                      <div className="text-[0.6rem] uppercase tracking-[0.26em] text-primary">{item.year}</div>
                      <h3 className="mt-2 text-lg leading-tight">{item.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile snap carousel */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar pb-4 pt-2">
              {MILESTONES.map((item) => (
                <div key={item.year} className="snap-center shrink-0 basis-[80vw]">
                  <div className="glass-luxe h-full rounded-[1.25rem] p-5">
                    <div className="text-[0.62rem] uppercase tracking-[0.26em] text-primary">{item.year}</div>
                    <h3 className="mt-3 text-xl leading-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
