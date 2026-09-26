import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Loader2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { defaultCountries, parseCountry } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import { SearchablePhoneInput } from "@/components/site/SearchablePhoneInput";
import { submitLead } from "@/lib/leads";
import { trackFormStart, trackGenerateLead } from "@/lib/analytics";
import { captureAttribution, detectMarket, type Attribution } from "@/lib/attribution";
import { waHref } from "@/lib/wa";
import { ONLINE_CLASS, TRIAL } from "@/lib/facts";
import { PUBLIC_TRUST } from "@/lib/facts/trust";

/**
 * Two-field inline enquiry form for the live online group funnel.
 *
 * Exists so visitors on /online-yoga-classes never have to leave the page to
 * ask for a class — every extra navigation step loses leads. Uses the existing
 * lead pipeline (submitLead -> leads table) with source="website"; the funnel
 * is distinguished through non-PII meta only.
 */

const schema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(120),
  whatsapp: z.string().trim().min(6, "Please share a valid WhatsApp number").max(40),
});

const FORM_ID = "online_group_quick_enquiry";
const SUPPORTED_ISO2 = new Set(defaultCountries.map((c) => parseCountry(c).iso2 as string));

const TRUST_POINTS = [
  `Live 2-way video — groups capped at ${ONLINE_CLASS.maxGroupSize} students`,
  `${PUBLIC_TRUST.studentsTaught} students guided across ${PUBLIC_TRUST.countries} countries`,
  `Taught in ${ONLINE_CLASS.languages.join(", ")} — no experience needed`,
];

export function QuickEnquiryForm({ id = "quick-enquiry" }: { id?: string }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse({ name, whatsapp });
    if (!parsed.success) {
      const next: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        next[i.path[0] as "name" | "whatsapp"] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);

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
        preferred_experience: "Live online group classes",
        status: "submitted",
        source: "website",
        meta: {
          funnel: "online_group_inline",
          landing_page: "/online-yoga-classes",
          lead_event_id: leadEventId,
          market: country,
          timezone,
          utm_source: attribution.utm_source ?? null,
          utm_medium: attribution.utm_medium ?? null,
          utm_campaign: attribution.utm_campaign ?? null,
          utm_term: attribution.utm_term ?? null,
          utm_content: attribution.utm_content ?? null,
          utm_id: attribution.utm_id ?? null,
          gclid: attribution.gclid ?? null,
          fbclid: attribution.fbclid ?? null,
          referrer_host: attribution.referrer_host ?? null,
          landing_first_touch: attribution.landing_path ?? null,
          first_touch_at: attribution.captured_at ?? null,
        },
      });
      trackGenerateLead("Live online group classes", FORM_ID, leadEventId);
      setDone(true);
      setName("");
      setWhatsapp("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or message us on WhatsApp.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div id={id} className="glass-luxe rounded-[1.5rem] p-6 text-center sm:p-9">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-emerald-400/60 bg-emerald-400/10">
          <Check className="h-7 w-7 text-emerald-300" />
        </div>
        <h2 className="mt-5 font-display text-2xl leading-tight sm:text-3xl">Request received.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Our team will message you on WhatsApp with the next available class times. You can also
          start the conversation right now.
        </p>
        <a
          href={waHref("group")}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-location="online_group_quick_success"
          className="btn-gold mt-6 justify-center"
        >
          <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      onFocusCapture={() => trackFormStart(FORM_ID)}
      data-cta-location="online_group_quick_form"
      className="glass-luxe rounded-[1.5rem] p-6 sm:p-8"
      noValidate
    >
      <h2 className="font-display text-2xl leading-tight sm:text-3xl">
        Ask about your first live class
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Two details are enough. {TRIAL.summary} We reply on WhatsApp with the next available times.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="qe-name"
            className="mb-2 block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground"
          >
            Full name *
          </label>
          <input
            id="qe-name"
            name="qe-name"
            autoComplete="name"
            value={name}
            placeholder="Your full name"
            onChange={(e) => {
              setName(e.target.value);
              setErrors((s) => ({ ...s, name: undefined }));
            }}
            aria-invalid={Boolean(errors.name)}
            className="w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm outline-none transition-colors focus:border-[color:var(--gold)]/60"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="qe-whatsapp"
            className="mb-2 block text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground"
          >
            WhatsApp number *
          </label>
          <SearchablePhoneInput
            value={whatsapp}
            onChange={(v) => {
              setWhatsapp(v);
              setErrors((s) => ({ ...s, whatsapp: undefined }));
            }}
            defaultCountry={country}
            placeholder="912 345 678"
            name="qe-whatsapp"
            ariaLabel="WhatsApp number"
          />
          {errors.whatsapp && <p className="mt-1.5 text-xs text-red-300">{errors.whatsapp}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={busy} className="btn-gold flex-1 justify-center">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {busy ? "Sending…" : TRIAL.ctaLabel}
        </button>
        <a
          href={waHref("group")}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-location="online_group_quick_whatsapp"
          className="btn-ghost-gold flex-1 justify-center"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp instead
        </a>
      </div>

      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
        {TRUST_POINTS.map((t) => (
          <li key={t} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
            {t}
          </li>
        ))}
      </ul>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
        We only use your details to arrange your classes. No spam, and you can ask us to delete your
        details at any time.
      </p>
    </form>
  );
}
