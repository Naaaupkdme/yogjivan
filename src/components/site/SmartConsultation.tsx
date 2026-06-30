import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, ShieldCheck, Sparkles, Clock, Heart, MessageCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { emptyLeadState, type LeadState, loadState, saveState, clearState, submitLead } from "@/lib/leads";
import { SOCIAL } from "@/lib/social";

const WHATSAPP = SOCIAL.whatsappE164;

const GOALS = [
  "Weight Loss", "Weight Gain", "Flexibility", "Stress Relief", "Back Pain", "Neck Pain",
  "PCOD / Hormonal Balance", "Therapeutic Recovery", "Meditation", "Better Sleep",
  "Anxiety Relief", "General Fitness", "Healthy Aging", "Other",
];
const EXPERIENCES = ["Online", "Studio", "Private Session", "Corporate Program"];
const TIMES = ["Morning", "Afternoon", "Evening", "Flexible"];
const HEALTH = ["Back Pain", "Knee Pain", "PCOD", "Diabetes", "Hypertension", "Anxiety", "Pregnancy", "Injury Recovery"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const microSchema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(120),
  whatsapp: z.string().trim().min(6, "Please share a valid WhatsApp number").max(40),
});

type Phase = "micro" | "success" | 1 | 2 | 3 | 4 | "complete";

const TRUST = [
  { Icon: Sparkles, t: "12+ Years" },
  { Icon: Heart, t: "1000+ Transformed" },
  { Icon: ShieldCheck, t: "4.9 Google" },
  { Icon: Clock, t: "Reply < 5 min" },
];

export function SmartConsultation() {
  const [state, setState] = useState<LeadState>(emptyLeadState);
  const [phase, setPhase] = useState<Phase>("micro");
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});
  const [busy, setBusy] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string>("");

  // Restore previous session
  useEffect(() => {
    const restored = loadState();
    setState(restored);
    if (restored.name && restored.whatsapp) {
      // resume from where they left off
      const map: Record<number, Phase> = { 0: "success", 1: 1, 2: 2, 3: 3, 4: 4, 5: "complete" };
      setPhase(map[restored.step] ?? "success");
    }
  }, []);

  useEffect(() => { saveState(state); }, [state]);

  const totalSteps = 5;
  const stepNumber = useMemo(() => {
    if (phase === "micro") return 1;
    if (phase === "success") return 1;
    if (phase === "complete") return 5;
    return (phase as number) + 1;
  }, [phase]);
  const progress = (stepNumber / totalSteps) * 100;

  async function submitMicro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = microSchema.safeParse(data);
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => { next[i.path[0] as "name" | "whatsapp"] = i.message; });
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await submitLead({ name: parsed.data.name, whatsapp: parsed.data.whatsapp, status: "micro_commit" });
      const next = { ...state, name: parsed.data.name, whatsapp: parsed.data.whatsapp, step: 0 };
      setState(next);
      setPhase("success");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function update<K extends keyof LeadState>(key: K, value: LeadState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function toggle(key: "goals" | "health_tags", value: string) {
    setState((s) => {
      const list = s[key];
      return { ...s, [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] };
    });
  }

  function goToStep(n: 1 | 2 | 3 | 4) {
    setState((s) => ({ ...s, step: n }));
    setPhase(n);
  }

  async function finalSubmit() {
    setBusy(true);
    try {
      await submitLead({ ...state, status: "personalised_complete" });
      setState((s) => ({ ...s, step: 5 }));
      setPhase("complete");
      // Open WhatsApp with personalised summary
      const summary = `Namaste, this is ${state.name}.%0A%0AI'd love a personalised recommendation.%0AGoals: ${state.goals.join(", ") || "—"}%0APreferred: ${state.preferred_experience || "—"} · ${state.preferred_time || "—"}%0AHealth notes: ${(state.health_notes || state.health_tags.join(", ")) || "—"}%0AExperience: ${state.experience_level || "—"}`;
      window.open(`https://wa.me/${WHATSAPP}?text=${summary}`, "_blank", "noreferrer");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function startOver() {
    clearState();
    setState({ ...emptyLeadState });
    setPhase("micro");
    setErrors({});
  }

  return (
    <div className="glass-luxe relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] p-6 sm:p-10">
      {/* progress rail */}
      {phase !== "complete" && (
        <>
          <div className="flex items-center justify-between gap-2 text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="text-primary">Step {stepNumber} of {totalSteps}</span>
            <span className="hidden sm:inline">Your wellness consultation</span>
          </div>
          <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[color:var(--gold-soft)] to-[color:var(--gold)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </>
      )}

      <div className="mt-8 min-h-[340px]">
        <AnimatePresence mode="wait">
          {/* STEP 0 — MICRO */}
          {phase === "micro" && (
            <motion.form
              key="micro" onSubmit={submitMicro}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-display text-3xl sm:text-4xl leading-tight">Let's begin your wellness journey.</h3>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
                Share a few details and receive personalized guidance from Master Anil and our team.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="Your full name" error={errors.name} defaultValue={state.name} />
                <Field label="WhatsApp Number" name="whatsapp" placeholder="+84 ..." error={errors.whatsapp} defaultValue={state.whatsapp} />
              </div>
              <button type="submit" disabled={busy} className="btn-gold mt-7 w-full justify-center disabled:opacity-60">
                {busy ? "Sending..." : "Continue"} <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                Your information is secure and private.
              </p>
            </motion.form>
          )}

          {/* SUCCESS */}
          {phase === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_40px_color-mix(in_oklab,oklch(0.8_0.2_150)_60%,transparent)]"
              >
                <Check className="h-8 w-8 text-emerald-300" />
              </motion.div>
              <h3 className="mt-6 font-display text-2xl sm:text-3xl leading-tight">Your consultation request has been received.</h3>
              <p className="mt-3 mx-auto max-w-lg text-sm text-muted-foreground leading-relaxed">
                Thank you for reaching out. If you share a few more details, we can recommend the most suitable practice, class format and wellness plan specifically for you.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/80">This takes less than 90 seconds and helps us guide you better.</p>
              <div className="mt-7 flex flex-col-reverse items-stretch justify-center gap-3 sm:flex-row">
                <button onClick={startOver} className="btn-ghost-gold justify-center">Skip For Now</button>
                <button onClick={() => goToStep(1)} className="btn-gold justify-center">
                  Personalize My Recommendation <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1 — GOALS */}
          {phase === 1 && (
            <StepShell
              key="s1"
              title="What would you like to improve?"
              hint="Select all that apply."
              onBack={() => setPhase("success")}
              onNext={() => goToStep(2)}
              nextDisabled={state.goals.length === 0}
            >
              <ChipGrid options={GOALS} selected={state.goals} onToggle={(v) => toggle("goals", v)} />
            </StepShell>
          )}

          {/* STEP 2 — PREFERENCES */}
          {phase === 2 && (
            <StepShell
              key="s2"
              title="How would you like to practice?"
              onBack={() => goToStep(1)}
              onNext={() => goToStep(3)}
              nextDisabled={!state.preferred_experience || !state.preferred_time}
            >
              <p className="text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">Format</p>
              <SingleRow options={EXPERIENCES} value={state.preferred_experience} onChange={(v) => update("preferred_experience", v)} />
              <p className="mt-6 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">Preferred Time</p>
              <SingleRow options={TIMES} value={state.preferred_time} onChange={(v) => update("preferred_time", v)} />
            </StepShell>
          )}

          {/* STEP 3 — HEALTH */}
          {phase === 3 && (
            <StepShell
              key="s3"
              title="Anything we should be mindful of?"
              hint="Optional — helps us tailor your practice."
              onBack={() => goToStep(2)}
              onNext={() => goToStep(4)}
            >
              <ChipGrid options={HEALTH} selected={state.health_tags} onToggle={(v) => toggle("health_tags", v)} />
              <p className="mt-6 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">Additional Notes</p>
              <textarea
                value={state.health_notes}
                onChange={(e) => update("health_notes", e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="Tell us anything else relevant (recent surgery, ongoing pain, current medication)..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
              />
              <p className="mt-6 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">Current Yoga Experience</p>
              <SingleRow options={LEVELS} value={state.experience_level} onChange={(v) => update("experience_level", v)} />
            </StepShell>
          )}

          {/* STEP 4 — REVIEW */}
          {phase === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-display text-2xl sm:text-3xl leading-tight">Review your details</h3>
              <p className="mt-2 text-sm text-muted-foreground">We'll personalise your recommendation based on this.</p>
              <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
                <Row label="Name" value={state.name} />
                <Row label="WhatsApp" value={state.whatsapp} />
                <Row label="Goals" value={state.goals.join(", ") || "—"} />
                <Row label="Practice" value={[state.preferred_experience, state.preferred_time].filter(Boolean).join(" · ") || "—"} />
                <Row label="Health" value={[state.health_tags.join(", "), state.health_notes].filter(Boolean).join(" — ") || "—"} />
                <Row label="Experience" value={state.experience_level || "—"} />
              </div>
              <div className="mt-7 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row">
                <button onClick={() => goToStep(3)} className="btn-ghost-gold justify-center">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={finalSubmit} disabled={busy} className="btn-gold justify-center disabled:opacity-60">
                  {busy ? "Sending..." : "Get My Personalized Recommendation on WhatsApp"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* COMPLETE */}
          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-[color:var(--gold)]/60 bg-[color:var(--gold)]/10 shadow-[0_0_60px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
              >
                <Sparkles className="h-9 w-9 text-[color:var(--gold)]" />
              </motion.div>
              <h3 className="mt-6 font-display text-3xl sm:text-4xl leading-tight">Your Personalized Consultation Is Ready.</h3>
              <p className="mt-3 mx-auto max-w-md text-sm text-muted-foreground leading-relaxed">
                Our team will contact you shortly on WhatsApp.
              </p>
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-primary">Usually within 5 minutes</p>
              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="btn-gold justify-center">
                  <MessageCircle className="h-4 w-4" /> Open WhatsApp Now
                </a>
                <button onClick={startOver} className="btn-ghost-gold justify-center">Return to Website</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* trust strip */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-white/[0.06] pt-5">
        {TRUST.map(({ Icon, t }) => (
          <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.24em] text-foreground/80">
            <Icon className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Field({ label, name, placeholder, error, defaultValue }: { label: string; name: string; placeholder: string; error?: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
      />
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function StepShell({
  title, hint, children, onBack, onNext, nextDisabled,
}: {
  title: string; hint?: string; children: React.ReactNode;
  onBack: () => void; onNext: () => void; nextDisabled?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="font-display text-2xl sm:text-3xl leading-tight">{title}</h3>
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
      <div className="mt-6">{children}</div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <button onClick={onBack} className="btn-ghost-gold"><ArrowLeft className="h-4 w-4" /> Back</button>
        <button onClick={onNext} disabled={nextDisabled} className="btn-gold disabled:opacity-40 disabled:pointer-events-none">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ChipGrid({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`rounded-full border px-4 py-2 text-xs transition-all ${active ? "border-[color:var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-foreground" : "border-white/12 text-foreground/85 hover:border-[color:var(--gold)]/45"}`}
          >
            {active && <Check className="mr-1.5 inline h-3 w-3 text-[color:var(--gold)]" />}{o}
          </button>
        );
      })}
    </div>
  );
}

function SingleRow({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-xs transition-all ${active ? "border-[color:var(--gold)] bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] text-foreground" : "border-white/12 text-foreground/85 hover:border-[color:var(--gold)]/45"}`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="w-32 shrink-0 text-[0.55rem] uppercase tracking-[0.26em] text-muted-foreground">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}
