import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, MessageCircle, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { defaultCountries, parseCountry } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import { SearchablePhoneInput } from "@/components/site/SearchablePhoneInput";
import { submitLead } from "@/lib/leads";
import { CONTACT } from "@/lib/facts/contact";
import { trackFormStart, trackGenerateLead } from "@/lib/analytics";
import { captureAttribution, detectMarket, type Attribution } from "@/lib/attribution";

/**
 * Compact private 1-on-1 enquiry form for /personal-training.
 *
 * Uses the EXISTING lead pipeline (submitLead -> leads table -> CRM webhook)
 * with source="website" so no RLS/migration change is required. The funnel is
 * distinguished purely through non-PII meta fields.
 *
 * Cold-page rule: never ask for diagnosis, medication, surgery, menstrual data
 * or long injury history here. Relevant limitations are discussed after contact.
 */

const LEVELS = [
  "Complete Beginner",
  "Some Yoga Experience",
  "Regular or Advanced Practitioner",
];

const TIMES = ["Morning", "Afternoon", "Evening", "Flexible"];

const FOCUS = [
  "Foundations & Alignment",
  "Flexibility & Mobility",
  "Strength & Balance",
  "Advanced Practice",
  "Breathwork & Relaxation",
  "Not Sure — Please Advise",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(120),
  whatsapp: z.string().trim().min(6, "Please share a valid WhatsApp number").max(40),
  level: z.string().min(1, "Please choose your current level"),
  email: z.string().trim().email("Please share a valid email").max(200).optional().or(z.literal("")),
  time: z.string().max(80).optional(),
  focus: z.string().max(80).optional(),
});

type FormState = { name: string; whatsapp: string; level: string; email: string; time: string; focus: string };
const empty: FormState = { name: "", whatsapp: "", level: "", email: "", time: "", focus: "" };

const FORM_ID = "private_yoga_enquiry";
const SUPPORTED_ISO2 = new Set(defaultCountries.map((c) => parseCountry(c).iso2 as string));

const NEXT_STEPS = [
  {
    title: "We read your request",
    body: "We look at your current level, what you want to work on and the times that suit you.",
  },
  {
    title: "We match you with a teacher",
    body: "You are matched with a Yog Jivan teacher suited to your level and goals, and we agree the match with you.",
  },
  {
    title: "Your first live 1-on-1 session",
    body: "Your dedicated teacher guides a live 60-minute session, and the same teacher continues with you afterwards.",
  },
];

export function PrivateYogaEnquiryForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [attribution, setAttribution] = useState<Attribution>({});
  const [country, setCountry] = useState<CountryIso2>("vn");

  useEffect(() => {
    const a = captureAttribution();
    setAttribution(a);
    const market = detectMarket(a);
    if (market && SUPPORTED_ISO2.has(market)) setCountry(market as CountryIso2);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        next[i.path[0] as keyof FormState] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);

    // Shared dedupe key for the browser Pixel event and any future Meta CAPI call.
    const leadEventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    let timezone: string | null = null;
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
    } catch {
      /* timezone is optional context */
    }

    try {
      await submitLead({
        name: parsed.data.name,
        whatsapp: parsed.data.whatsapp,
        email: parsed.data.email || undefined,
        experience_level: parsed.data.level,
        preferred_experience: "Private 1-on-1 online yoga",
        preferred_time: parsed.data.time || undefined,
        goals: parsed.data.focus ? [parsed.data.focus] : [],
        status: "submitted",
        source: "website",
        meta: {
          funnel: "private_yoga_organic",
          landing_page: "/personal-training",
          lead_event_id: leadEventId,
          market: country,
          timezone,
          utm_source: attribution.utm_source ?? null,
          utm_medium: attribution.utm_medium ?? null,
          utm_campaign: attribution.utm_campaign ?? null,
          utm_term: attribution.utm_term ?? null,
          utm_content: attribution.utm_content ?? null,
          utm_id: attribution.utm_id ?? null,
          campaign_id: attribution.campaign_id ?? null,
          adset_id: attribution.adset_id ?? null,
          ad_id: attribution.ad_id ?? null,
          placement: attribution.placement ?? null,
          keyword: attribution.keyword ?? null,
          matchtype: attribution.matchtype ?? null,
          device: attribution.device ?? null,
          gclid: attribution.gclid ?? null,
          gbraid: attribution.gbraid ?? null,
          wbraid: attribution.wbraid ?? null,
          fbclid: attribution.fbclid ?? null,
          ttclid: attribution.ttclid ?? null,
          msclkid: attribution.msclkid ?? null,
          li_fat_id: attribution.li_fat_id ?? null,
          referrer_host: attribution.referrer_host ?? null,
          landing_first_touch: attribution.landing_path ?? null,
          first_touch_at: attribution.captured_at ?? null,
        },
      });
      // Conversion events fire ONLY after a confirmed insert. No PII is sent.
      trackGenerateLead("Private 1-on-1 online yoga", FORM_ID, leadEventId);
      setDone(true);
      setForm(empty);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or message us on WhatsApp.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="glass-luxe rounded-[1.5rem] p-6 sm:p-9">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-emerald-400/60 bg-emerald-400/10">
            <Check className="h-7 w-7 text-emerald-300" />
          </div>
          <h2 className="mt-5 font-display text-2xl leading-tight sm:text-3xl">
            Request received.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Here is how a private 1-on-1 enquiry usually moves forward.
          </p>
        </div>

        <ol className="mt-6 space-y-4 text-left">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-[0.7rem] font-semibold text-[color:var(--gold)]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex flex-col gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="private_yoga_success"
            className="btn-gold justify-center"
          >
            <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
          </a>
          <Link
            to="/online-yoga-classes"
            data-cta-location="private_yoga_success"
            className="btn-ghost-gold justify-center"
          >
            Compare live group classes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={() => trackFormStart(FORM_ID)}
      data-cta-location="private_yoga_form"
      className="glass-luxe rounded-[1.5rem] p-6 sm:p-8"
      noValidate
    >
      <h2 className="font-display text-2xl leading-tight sm:text-3xl">
        Enquire about private 1-on-1 yoga
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Tell us your level and when you like to practise. Pricing and scheduling are arranged by
        enquiry — no payment is requested here.
      </p>

      <div className="mt-6 space-y-4">
        <Field
          label="Full name *"
          value={form.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          placeholder="Your full name"
          name="pv-name"
          autoComplete="name"
        />

        <div>
          <label
            htmlFor="pv-whatsapp"
            className="mb-2 block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground"
          >
            WhatsApp number *
          </label>
          <SearchablePhoneInput
            value={form.whatsapp}
            onChange={(v) => update("whatsapp", v)}
            defaultCountry={country}
            placeholder="912 345 678"
            name="pv-whatsapp"
            ariaLabel="WhatsApp number"
          />
          {errors.whatsapp && <p className="mt-1.5 text-xs text-red-300">{errors.whatsapp}</p>}
        </div>

        <Select
          label="Your current level *"
          value={form.level}
          onChange={(v) => update("level", v)}
          error={errors.level}
          options={LEVELS}
          name="pv-level"
          placeholder="Choose one"
        />

        <Field
          label="Email (optional)"
          value={form.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          placeholder="you@example.com"
          name="pv-email"
          type="email"
          autoComplete="email"
        />

        <Select
          label="Preferred session time (optional)"
          value={form.time}
          onChange={(v) => update("time", v)}
          options={TIMES}
          name="pv-time"
          placeholder="Any time works"
        />

        <Select
          label="Main focus (optional)"
          value={form.focus}
          onChange={(v) => update("focus", v)}
          options={FOCUS}
          name="pv-focus"
          placeholder="Choose one"
        />
      </div>

      <button type="submit" disabled={busy} className="btn-gold mt-6 w-full justify-center">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {busy ? "Sending…" : "Enquire About Private 1-on-1 Yoga"}
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
        We only use your details to arrange your sessions. No spam, and you can ask us to delete your
        details at any time.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className="w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
      />
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  error,
  options,
  name,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: readonly string[];
  name: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className="w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[color:var(--onyx)]">
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}
