import { motion } from "framer-motion";
import { Briefcase, Building2, HeartPulse, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import corporateA from "@/assets/img_20260621_105308.jpg.asset.json";
import corporateB from "@/assets/img_20260622_114016.jpg.asset.json";

const stats = [
  { Icon: Briefcase, value: "20+", label: "Countries served" },
  { Icon: TrendingUp, value: "91%", label: "Reported stress reduction" },
  { Icon: HeartPulse, value: "4.9", label: "Average student rating" },
  { Icon: Building2, value: "2", label: "Premium studios" },
];

export function Corporate() {
  return (
    <section className="section-tight relative overflow-hidden">
      <div className="container-luxe">
        <div className="glass-luxe overflow-hidden rounded-[2rem] p-5 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              <img src={corporateA.url} alt="Yog Jivan group wellness event" className="aspect-[4/5] w-full rounded-[1.4rem] object-cover" loading="lazy" />
              <img src={corporateB.url} alt="Yog Jivan large community group celebration" className="aspect-[4/5] w-full rounded-[1.4rem] object-cover" loading="lazy" />
            </div>
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-primary" />Corporate wellness</p>
              <h2 className="mt-5 fluid-title max-w-[12ch]">Wellness programs that feel premium enough to keep.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Yog Jivan can serve leadership teams, institutions, and private communities with a wellness experience that feels polished, calm, and genuinely effective.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stats.map(({ Icon, value, label }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.65, delay: idx * 0.06 }}
                    className="rounded-[1.25rem] border border-border/70 bg-card/35 p-5"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="mt-3 font-display text-3xl">{value}</div>
                    <div className="mt-1 text-[0.64rem] uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/corporate" className="btn-gold">View corporate offering</Link>
                <Link to="/contact" className="btn-ghost-gold">Request proposal</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
