import { motion } from "framer-motion";
import { useState } from "react";
import beforeImage from "@/assets/fb_img_1690971312359.jpg.asset.json";
import afterImage from "@/assets/img_20260620_125938.jpg.asset.json";

const stories = [
  { label: "Alignment", value: "+72%", detail: "More stable posture and body control across seated, standing, and advanced work." },
  { label: "Breath Capacity", value: "+58%", detail: "Deeper calm, slower nervous-system reactivity, and better emotional regulation." },
  { label: "Consistency", value: "5x/week", detail: "From occasional practice to a disciplined ritual with visible lifestyle carryover." },
];

export function Transformation() {
  const [position, setPosition] = useState(52);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div>
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />Transformation story</p>
            <h2 className="mt-5 fluid-title max-w-[12ch]">Authentic evolution, shown through real practice.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Instead of artificial before-and-after marketing, Yog Jivan shows a more truthful transformation: early discipline becoming mature stillness, control, and embodied confidence.
            </p>

            <div className="mt-8 space-y-4">
              {stories.map((story, idx) => (
                <motion.div
                  key={story.label}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.65, delay: idx * 0.08 }}
                  className="glass-soft rounded-[1.35rem] p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg">{story.label}</h3>
                    <div className="text-[0.72rem] uppercase tracking-[0.22em] text-primary">{story.value}</div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{story.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-luxe rounded-[2rem] p-4 sm:p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70">
              <img src={afterImage.url} alt="Present-day Yog Jivan founder meditation portrait" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
                <img src={beforeImage.url} alt="Early founder yoga practice photo" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-y-0" style={{ left: `calc(${position}% - 1px)` }}>
                <div className="relative h-full w-0.5 bg-primary">
                  <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-card/65 text-[0.62rem] uppercase tracking-[0.18em] text-primary">Slide</div>
                </div>
              </div>
              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-card/40 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-foreground/88">Early discipline</div>
              <div className="absolute right-4 top-4 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-primary">Present mastery</div>
            </div>
            <input
              type="range"
              min={15}
              max={85}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="mt-5 w-full accent-[color:var(--gold)]"
              aria-label="Transformation comparison slider"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-border/70 bg-card/35 p-4">
                <div className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">Before</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">An earlier chapter of discipline and flexibility — authentic, raw, and foundational.</p>
              </div>
              <div className="rounded-[1.2rem] border border-border/70 bg-card/35 p-4">
                <div className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">After</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A more grounded, premium expression of wellness: presence, breath, poise, and refined confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
