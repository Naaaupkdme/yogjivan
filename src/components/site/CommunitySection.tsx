import { motion } from "framer-motion";
import eventA from "@/assets/img_20260621_105308.jpg.asset.json";
import eventB from "@/assets/img_20260622_114016.jpg.asset.json";
import { useLang } from "@/lib/language";

const moments = [
  { title: "City wellness events", text: "Public sessions that make Yog Jivan visible, trusted, and culturally alive." },
  { title: "Festival celebrations", text: "Ritual, joy, and togetherness create emotional memory around the brand." },
  { title: "Student milestone moments", text: "Shared progress becomes social proof and belonging at the same time." },
  { title: "Instagram-ready storytelling", text: "Premium community imagery that feels human, not staged or stock-like." },
];

export function CommunitySection() {
  const { t } = useLang();

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {[eventA, eventB].map((image, idx) => (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="glass-luxe overflow-hidden rounded-[1.7rem] p-3"
              >
                <img src={image.url} alt={idx === 0 ? "Yog Jivan outdoor student community event" : "Yog Jivan celebration and festival moment"} className="aspect-[5/4] w-full rounded-[1.3rem] object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          <div>
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />{t.community.eyebrow}</p>
            <h2 className="mt-5 fluid-title max-w-[13ch]">{t.community.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.community.sub}</p>

            <div className="mt-8 grid gap-4">
              {moments.map((moment, idx) => (
                <motion.div
                  key={moment.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: idx * 0.06 }}
                  className="glass-soft rounded-[1.35rem] p-5"
                >
                  <h3 className="text-xl">{moment.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{moment.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
