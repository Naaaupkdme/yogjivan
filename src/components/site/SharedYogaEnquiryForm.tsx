import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Loader2, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { defaultCountries, parseCountry } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import { SearchablePhoneInput } from "@/components/site/SearchablePhoneInput";
import { LeadGuardFields } from "@/components/site/LeadGuardFields";
import { waHref } from "@/lib/wa";
import { captureAttribution, detectMarket, type Attribution } from "@/lib/attribution";
import { useLeadSubmission, getTimezone } from "@/lib/leads/form-submission";
import {
  SHARED_LANGUAGES,
  SHARED_TIME_PREFERENCES,
} from "@/lib/facts/shared-offers";

const schema = z
  .object({
    name: z.string().trim().min(2, "Please share the adult booking contact name").max(120),
    whatsapp: z.string().trim().min(6, "Please share a valid WhatsApp number").max(40),
    format: z.enum(["couples", "family", "parent_child"]),
    participants: z.coerce.number().int().min(2).max(4),
    time: z.string().max(80).optional().or(z.literal("")),
    language: z.string().max(80).optional().or(z.literal("")),
    notes: z.string().max(300).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.format === "couples") return data.participants === 2;
      if (data.format === "parent_child") return data.participants === 2;
      if (data.format === "family") return data.participants === 3 || data.participants === 4;
      return true;
    },
    {
      message: "Family sessions are for 3 or 4 participants. For 2 participants, please choose Couples or Parent & Child.",
      path: ["participants"],
    }
  );

type FormState = {
  name: string;
  whatsapp: string;
  format: "couples" | "family" | "parent_child";
  participants: number;
  time: string;
  language: string;
  notes: string;
};

const SUPPORTED_ISO2 = new Set(defaultCountries.map((c) => parseCountry(c).iso2 as string));

export type SharedYogaEnquiryFormProps = {
  initialFormat?: "couples" | "family" | "parent_child";
  format?: "couples" | "family" | "parent_child";
  onFormatChange?: (format: "couples" | "family" | "parent_child") => void;
  initialParticipants?: number;
  participants?: number;
  onParticipantsChange?: (participants: number) => void;
  heading?: string;
  subheading?: string;
};

export function SharedYogaEnquiryForm({
  initialFormat = "couples",
  format: controlledFormat,
  onFormatChange,
  initialParticipants,
  participants: controlledParticipants,
  onParticipantsChange,
  heading = "Enquire About Shared Sessions",
  subheading = "Tell us who is joining and your preferred times. Scheduling and rates are arranged individually by enquiry.",
}: SharedYogaEnquiryFormProps) {
  const activeFormat = controlledFormat ?? initialFormat;
  const initialPax =
    controlledParticipants ??
    initialParticipants ??
    (activeFormat === "family" ? 3 : 2);

  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    format: activeFormat,
    participants: initialPax,
    time: "Flexible",
    language: "English",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [attribution, setAttribution] = useState<Attribution>({});
  const [country, setCountry] = useState<CountryIso2>("vn");
  const submission = useLeadSubmission();

  useEffect(() => {
    const a = captureAttribution();
    setAttribution(a);
    const market = detectMarket(a);
    if (market && SUPPORTED_ISO2.has(market)) setCountry(market as CountryIso2);
  }, []);

  useEffect(() => {
    if (controlledFormat && controlledFormat !== form.format) {
      setForm((s) => ({
        ...s,
        format: controlledFormat,
        participants:
          controlledParticipants ??
          (controlledFormat === "family" ? (s.participants >= 3 ? s.participants : 3) : 2),
      }));
    }
  }, [controlledFormat]);

  useEffect(() => {
    if (controlledParticipants && controlledParticipants !== form.participants) {
      setForm((s) => ({ ...s, participants: controlledParticipants }));
    }
  }, [controlledParticipants]);

  useEffect(() => {
    if (!controlledFormat && initialFormat !== form.format) {
      setForm((s) => ({
        ...s,
        format: initialFormat,
        participants: initialParticipants ?? (initialFormat === "family" ? 3 : 2),
      }));
    }
  }, [initialFormat, controlledFormat]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => {
      const next = { ...s, [key]: value };
      if (key === "format") {
        if (value === "couples" || value === "parent_child") {
          next.participants = 2;
        } else if (value === "family" && next.participants < 3) {
          next.participants = 3;
        }
      }
      return next;
    });
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function handleFormatChange(nextFormat: FormState["format"]) {
    update("format", nextFormat);
    onFormatChange?.(nextFormat);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

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

    const formatLabels: Record<string, string> = {
      couples: "Private couples online yoga (2 participants)",
      family: `Private family online yoga (${parsed.data.participants} participants)`,
      parent_child: "Private parent & child online yoga (caregiver + child)",
    };

    const preferredExp = formatLabels[parsed.data.format] || "Private shared online yoga";
    const funnelName =
      parsed.data.format === "couples"
        ? "couples_yoga_enquiry"
        : parsed.data.format === "parent_child"
          ? "parent_child_yoga_enquiry"
          : "family_yoga_enquiry";

    const landingPage =
      parsed.data.format === "couples" ? "/online-couples-yoga" : "/online-family-yoga";

    try {
      await submission.submit({
        data: parsed.data,
        formId: `shared_yoga_${parsed.data.format}`,
        category: "private_online",
        setBusy,
        buildPayload: (data, leadEventId) => ({
          name: data.name,
          whatsapp: data.whatsapp,
          preferred_experience: preferredExp,
          preferred_time: data.time || undefined,
          status: "submitted",
          source: "website",
          goals: data.notes ? [data.notes] : [],
          meta: {
            funnel: funnelName,
            landing_page: landingPage,
            lead_event_id: leadEventId,
            market: country,
            timezone: getTimezone(),
            shared_format: data.format,
            participant_count: data.participants,
            preferred_language: data.language || null,
            utm_source: attribution.utm_source ?? null,
            utm_medium: attribution.utm_medium ?? null,
            utm_campaign: attribution.utm_campaign ?? null,
          },
        }),
        onSuccess: () => {
          setDone(true);
          toast.success("Enquiry received. We will reply on WhatsApp with session details.");
        },
        onError: () => {
          toast.error("Could not send enquiry right now. Please message us directly on WhatsApp.");
        },
      });
    } catch {
      // handled by submission coordinator
    }
  }

  const waIntent = form.format === "couples" ? "couples" : "family";

  if (done) {
    return (
      <div className="glass-luxe rounded-2xl p-8 text-center md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-foreground md:text-2xl">
          Thank you, {form.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          We have received your enquiry for{" "}
          <strong className="text-foreground">
            {form.format === "couples"
              ? "couples yoga"
              : form.format === "parent_child"
                ? "parent & child yoga"
                : `family yoga (${form.participants} people)`}
          </strong>
          .
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          We review teacher availability for your time zone and send recommended session options and quote details directly via WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waHref(waIntent)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" /> Message Us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id="shared-enquiry-form" className="glass-luxe rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <p className="eyebrow flex items-center gap-2 text-xs">
          <Users className="h-3.5 w-3.5 text-[color:var(--gold)]" />
          Live Private Session
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">{heading}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <LeadGuardFields />

        <div>
          <label htmlFor="shared-format-select" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Session Format
          </label>
          <select
            id="shared-format-select"
            value={form.format}
            onChange={(e) => handleFormatChange(e.target.value as FormState["format"])}
            className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          >
            <option value="couples">Couples Yoga (2 adults)</option>
            <option value="family">Family Yoga (Up to 4 participants)</option>
            <option value="parent_child">Parent & Child Yoga (Caregiver + Child)</option>
          </select>
        </div>

        {form.format === "couples" && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            Fixed: exactly 2 adult participants.
          </p>
        )}

        {form.format === "parent_child" && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            Fixed: 2 participants (1 participating adult caregiver + 1 child).
          </p>
        )}

        {form.format === "family" && (
          <div>
            <label htmlFor="shared-pax-select" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Total Participants in Household (Up to 4)
            </label>
            <select
              id="shared-pax-select"
              value={form.participants}
              onChange={(e) => {
                const val = Number(e.target.value);
                update("participants", val);
                onParticipantsChange?.(val);
              }}
              className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
            >
              <option value={3}>3 Family Members (US$55 / session)</option>
              <option value={4}>4 Family Members (US$65 / session)</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="shared-adult-name" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Adult Booking Contact Name *
          </label>
          <input
            id="shared-adult-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Maya Sharma"
            className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="shared-whatsapp-input" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            WhatsApp Number (with Country Code) *
          </label>
          <SearchablePhoneInput
            value={form.whatsapp}
            onChange={(val) => update("whatsapp", val)}
            defaultCountry={country}
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="shared-language-select" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Preferred Language
            </label>
            <select
              id="shared-language-select"
              value={form.language}
              onChange={(e) => update("language", e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
            >
              {SHARED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="shared-time-select" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Preferred Time
            </label>
            <select
              id="shared-time-select"
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
            >
              {SHARED_TIME_PREFERENCES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="shared-notes" className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Time Zone & Logistics Notes (Optional)
          </label>
          <p className="mb-1.5 text-[0.7rem] text-muted-foreground">
            Please do not include minor names, dates of birth, photos, or medical history.
          </p>
          <textarea
            id="shared-notes"
            rows={2}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="e.g. UTC+7 (Vietnam), two adults and one child, prefer weekend mornings"
            className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[color:var(--gold)] focus:outline-none"
          />
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground">
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            Privacy & Minor Safety Standard
          </p>
          <p className="mt-1">
            An adult caregiver books and attends every shared session. We do not ask for or store minor contact details, birth dates, or health history on enquiry forms.
          </p>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold tracking-wide"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending enquiry...
            </>
          ) : (
            `Enquire About ${form.format === "couples" ? "Couples Yoga" : form.format === "parent_child" ? "Parent & Child Yoga" : "Family Yoga"}`
          )}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Or message us directly:{" "}
          <a
            href={waHref(waIntent)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--gold)] hover:underline inline-flex items-center gap-1"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Business
          </a>
        </p>
      </form>
    </div>
  );
}
