import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, ShieldCheck, Clock, Heart } from "lucide-react";

const STEPS = ["Your Details", "Goals", "Experience", "Health", "Preferences", "Almost Done"];

const GOALS = ["Stress relief", "Flexibility", "Therapeutic healing", "Weight & vitality", "Spiritual growth", "Posture & alignment"];
const EXPERIENCE = ["Complete beginner", "Some practice", "Intermediate", "Advanced"];
const HEALTH = ["None", "Back pain", "Stress / anxiety", "Sleep issues", "Joint mobility", "Recovery"];
const PREFS = ["In-studio (Hai Duong)", "Private 1-on-1", "Online program", "Retreat"];

const WA = "https://wa.me/84782046066";

type State = {
  name: string;
  whatsapp: string;
  email: string;
  country: string;
  city: string;
  goals: string[];
  experience: string;
  health: string[];
  prefs: string[];
};

const empty: State = { name: "", whatsapp: "", email: "", country: "", city: "", goals: [], experience: "", health: [], prefs: [] };

export function SmartWellnessJourney() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<State>(empty);
  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  const toggle = (key: "goals" | "health" | "prefs", v: string) => {
    setData((d) => ({ ...d, [key]: d[key].includes(v) ? d[key].filter((x) => x !== v) : [...d[key], v] }));
  };

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const msg = encodeURIComponent(
      `Smart Wellness Journey — ${data.name}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.email}\nLocation: ${data.city}, ${data.country}\nGoals: ${data.goals.join(", ")}\nExperience: ${data.experience}\nHealth: ${data.health.join(", ")}\nPreferences: ${data.prefs.join(", ")}`,
    );
    window.open(`${WA}?text=${msg}`, "_blank");
    setStep(total - 1);
  };

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-[0.04]" />
      <div className="pointer-events-none absolute left-[-10%] top-1/3 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)" }} />

      <div className="container-luxe relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />Smart Wellness Journey<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title">Find your personalised path.</h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
            A guided 2-minute experience to recommend the perfect practice for your body, goals, and lifestyle.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { Icon: Clock, t: "< 2 minutes" },
              { Icon: ShieldCheck, t: "100% confidential" },
              { Icon: Heart, t: "Personalised" },
              { Icon: Sparkles, t: "No payment required" },
            ].map(({ Icon, t }) => (
              <span key={t} className="glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-foreground/85">
                <Icon className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 mx-auto max-w-3xl glass-luxe rounded-[2rem] p-6 md:p-10">
          {/* Progress rail */}
          <div className="flex items-center justify-between gap-2 text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="text-primary">Step {step + 1} of {total}</span>
            <span>{STEPS[step]}</span>
          </div>
          <div className="mt-3 h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[color:var(--gold-soft)] to-[color:var(--gold)]"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
          </div>

          <div className="mt-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {step === 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name"><input className={inp} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Your name" /></Field>
                    <Field label="WhatsApp"><input className={inp} value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="+84 ..." /></Field>
                    <Field label="Email"><input className={inp} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="you@email.com" /></Field>
                    <Field label="Country"><input className={inp} value={data.country} onChange={(e) => setData({ ...data, country: e.target.value })} placeholder="Vietnam" /></Field>
                    <Field label="City"><input className={inp} value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} placeholder="Hai Duong" /></Field>
                  </div>
                )}

                {step === 1 && <Chips title="What outcomes matter to you?" options={GOALS} selected={data.goals} onToggle={(v) => toggle("goals", v)} />}

                {step === 2 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Where are you in your practice?</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {EXPERIENCE.map((e) => (
                        <button key={e} onClick={() => setData({ ...data, experience: e })}
                          className={`rounded-2xl px-5 py-4 text-left text-sm transition-all border ${data.experience === e ? "border-[color:var(--gold)] bg-[color-mix(in_oklab,var(--gold)_12%,transparent)]" : "border-white/10 hover:border-[color:var(--gold)]/40"}`}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && <Chips title="Anything we should be mindful of?" options={HEALTH} selected={data.health} onToggle={(v) => toggle("health", v)} />}

                {step === 4 && <Chips title="How would you prefer to practice?" options={PREFS} selected={data.prefs} onToggle={(v) => toggle("prefs", v)} />}

                {step === 5 && (
                  <div className="text-center py-6">
                    <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-[color-mix(in_oklab,var(--gold)_18%,transparent)] ring-1 ring-[color:var(--gold)]/40">
                      <Check className="h-6 w-6 text-[color:var(--gold)]" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl md:text-3xl">Thank you, {data.name || "friend"}.</h3>
                    <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                      We've received your details. Our wellness expert will personally guide you on WhatsApp shortly.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button onClick={back} disabled={step === 0}
              className="btn-ghost-gold disabled:opacity-30 disabled:pointer-events-none">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < total - 2 && (
              <button onClick={next} className="btn-gold">Continue <ArrowRight className="h-4 w-4" /></button>
            )}
            {step === total - 2 && (
              <button onClick={submit} className="btn-gold">Get my guidance <ArrowRight className="h-4 w-4" /></button>
            )}
            {step === total - 1 && (
              <a href={WA} target="_blank" rel="noreferrer" className="btn-gold">Open WhatsApp <ArrowRight className="h-4 w-4" /></a>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
          Your data is safe and never shared · Trusted by students in 20+ countries
        </p>
      </div>
    </section>
  );
}

const inp = "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[color:var(--gold)]/60 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

function Chips({ title, options, selected, onToggle }: { title: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button key={o} onClick={() => onToggle(o)}
              className={`rounded-full px-4 py-2 text-xs transition-all border ${active ? "border-[color:var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-foreground" : "border-white/12 text-foreground/85 hover:border-[color:var(--gold)]/45"}`}>
              {active && <Check className="inline h-3 w-3 mr-1.5 text-[color:var(--gold)]" />}{o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
