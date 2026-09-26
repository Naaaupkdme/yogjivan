import { waHref } from "@/lib/wa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Sparkles, Clock, Heart, MessageCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SearchablePhoneInput } from "@/components/site/SearchablePhoneInput";
import { submitLead } from "@/lib/leads";
import { SOCIAL } from "@/lib/social";
import { trackFormStart, trackGenerateLead } from "@/lib/analytics";
import { PUBLIC_TRUST } from "@/lib/facts/trust";

const SERVICES = [
  "Private Session",
  "Studio Classes",
  "Online Classes",
  "Personalized Wellness Yoga",
  "Corporate Wellness",
  "Not sure yet",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(120),
  whatsapp: z.string().trim().min(6, "Please share a valid WhatsApp number").max(40),
  email: z.string().trim().email("Please share a valid email").max(200).optional().or(z.literal("")),
  service: z.string().min(1, "Please choose one option"),
  message: z.string().max(1000).optional(),
});

const TRUST = [
  { Icon: Sparkles, t: "12+ Years" },
  { Icon: Heart, t: `${PUBLIC_TRUST.studentsTaught} Students Guided` },
  { Icon: ShieldCheck, t: "Small batches, max 8" },
  { Icon: Clock, t: "WhatsApp follow-up" },
];

type FormState = {
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  message: string;
};

const empty: FormState = { name: "", whatsapp: "", email: "", service: "", message: "" };

export function SmartConsultation() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => { next[i.path[0] as keyof FormState] = i.message; });
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await submitLead({
        name: parsed.data.name,
        whatsapp: parsed.data.whatsapp,
        email: parsed.data.email || undefined,
        preferred_experience: parsed.data.service,
        health_notes: parsed.data.message || undefined,
        status: "submitted",
      });
      // Only after the insert resolved successfully and the success state shows.
      trackGenerateLead(parsed.data.service, "smart_consultation");
      setDone(true);
      setForm(empty);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="glass-luxe relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_40px_color-mix(in_oklab,oklch(0.8_0.2_150)_60%,transparent)]"
            >
              <Check className="h-8 w-8 text-emerald-300" />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl sm:text-3xl leading-tight">Thanks — we've received your request.</h3>
            <p className="mt-3 mx-auto max-w-md text-sm text-muted-foreground leading-relaxed">
              We’ll follow up on WhatsApp.
            </p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <a href={waHref("general")} target="_blank" rel="noopener noreferrer" className="btn-gold justify-center">
                <MessageCircle className="h-4 w-4" /> Open WhatsApp Now
              </a>
              <button type="button" onClick={() => setDone(false)} className="btn-ghost-gold justify-center">
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            onFocusCapture={() => trackFormStart("smart_consultation")}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-3xl sm:text-4xl leading-tight">Book your free consultation.</h3>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Share a few details — our team will follow up on WhatsApp.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field
                label="Full Name *"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(v) => update("name", v)}
                error={errors.name}
              />
              <div>
                <label className="block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground mb-2">
                  WhatsApp Number *
                </label>
                <SearchablePhoneInput
                  value={form.whatsapp}
                  onChange={(v) => update("whatsapp", v)}
                  defaultCountry="vn"
                  placeholder="912 345 678"
                  name="whatsapp"
                  ariaLabel="WhatsApp number (search country or dial code)"
                />
                {errors.whatsapp && (
                  <p className="mt-1.5 text-[0.65rem] text-red-400">{errors.whatsapp}</p>
                )}
              </div>
              <Field
                label="Email (optional)"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
              />
              <div>
                <label className="block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground mb-2">
                  What are you interested in? *
                </label>
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
                >
                  <option value="" className="bg-[color:var(--onyx)]">Select an option…</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-[color:var(--onyx)]">{s}</option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1.5 text-[0.65rem] text-red-400">{errors.service}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground mb-2">
                Your goal or any health notes (optional)
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="Tell us your goal or any health notes we should be mindful of…"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
              />
            </div>

            <button type="submit" disabled={busy} className="btn-gold mt-7 w-full justify-center disabled:opacity-60">
              {busy ? "Sending…" : "Book My Free Consultation"} <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              Your information is secure and private.
            </p>
          </motion.form>
        )}
      </AnimatePresence>

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

function Field({
  label, name, placeholder, error, value, onChange, type = "text",
}: {
  label: string; name: string; placeholder: string; error?: string;
  value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground mb-2">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
      />
      {error ? <p className="mt-1.5 text-[0.65rem] text-red-400">{error}</p> : null}
    </div>
  );
}
