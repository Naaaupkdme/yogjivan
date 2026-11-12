import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Building2, Check, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { defaultCountries, parseCountry } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import { SearchablePhoneInput } from "@/components/site/SearchablePhoneInput";
import { LeadGuardFields } from "@/components/site/LeadGuardFields";
import { waHref } from "@/lib/wa";
import { CONTACT } from "@/lib/facts/contact";
import { captureAttribution, detectMarket, type Attribution } from "@/lib/attribution";
import { useLeadSubmission, getTimezone } from "@/lib/leads/form-submission";

const schema = z.object({
  orgName: z.string().trim().min(2, "Please share your organization or company name").max(120),
  contactName: z.string().trim().min(2, "Please share the organizer name and role").max(120),
  contact: z.string().trim().min(6, "Please share a valid business contact number").max(40),
  email: z.string().trim().email("Please share a valid business email").max(200).optional().or(z.literal("")),
  site: z.string().trim().min(2, "Please share your workplace location or industrial zone").max(160),
  headcount: z.string().min(1, "Please choose an estimated headcount"),
  format: z.string().min(1, "Please choose a session format"),
  timing: z.string().max(80).optional().or(z.literal("")),
  notes: z.string().max(400).optional().or(z.literal("")),
});

type FormState = {
  orgName: string;
  contactName: string;
  contact: string;
  email: string;
  site: string;
  headcount: string;
  format: string;
  timing: string;
  notes: string;
};

const SUPPORTED_ISO2 = new Set(defaultCountries.map((c) => parseCountry(c).iso2 as string));

export type CorporateEnquiryFormProps = {
  lang?: "EN" | "VI";
  heading?: string;
  subheading?: string;
};

export function CorporateEnquiryForm({
  lang = "EN",
  heading,
  subheading,
}: CorporateEnquiryFormProps) {
  const isVi = lang === "VI";
  const [form, setForm] = useState<FormState>({
    orgName: "",
    contactName: "",
    contact: "",
    email: "",
    site: "",
    headcount: "15–30 employees",
    format: "30-minute chair yoga",
    timing: "Lunch break or shift transition",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [attribution, setAttribution] = useState<Attribution>({});
  const [country, setCountry] = useState<CountryIso2>("vn");
  const submission = useLeadSubmission();

  useEffect(() => {
    setAttribution(captureAttribution());
    const m = detectMarket();
    if (m === "IN") setCountry("in");
    else if (m === "VN") setCountry("vn");
    else {
      const userLang = (navigator.language || "").toLowerCase();
      if (userLang.includes("vi")) setCountry("vn");
    }
  }, []);

  function handleCountryChange(newIso: string) {
    const lower = newIso.toLowerCase();
    if (SUPPORTED_ISO2.has(lower)) {
      setCountry(lower as CountryIso2);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error(isVi ? "Vui lòng kiểm tra lại các mục bắt buộc" : "Please check the highlighted fields");
      return;
    }

    const payloadNotes = [
      `Company/Org: ${parsed.data.orgName}`,
      `Role/Contact: ${parsed.data.contactName}`,
      `Workplace Site: ${parsed.data.site}`,
      `Headcount: ${parsed.data.headcount}`,
      `Format: ${parsed.data.format}`,
      `Timing: ${parsed.data.timing || "Flexible"}`,
      parsed.data.notes ? `Notes: ${parsed.data.notes}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    await submission.submit({
      data: parsed.data,
      formId: "corporate-pilot-enquiry",
      category: "corporate_wellness",
      setBusy,
      buildPayload: (data, leadEventId) => ({
        name: data.contactName,
        whatsapp: data.contact,
        email: data.email || undefined,
        preferred_experience: `Corporate Yoga Pilot (${data.format}, ${data.headcount})`,
        status: "submitted",
        source: "website",
        notes: payloadNotes,
        meta: {
          funnel: "corporate_yoga_pilot_enquiry",
          landing_page: isVi ? "/vi/yoga-doanh-nghiep-hai-duong" : "/corporate",
          lead_event_id: leadEventId,
          market: country,
          timezone: getTimezone(),
          organization: data.orgName,
          site: data.site,
          headcount: data.headcount,
          format: data.format,
          timing: data.timing || null,
          utm_source: attribution.utm_source ?? null,
          utm_medium: attribution.utm_medium ?? null,
        },
      }),
      onSuccess: () => {
        setDone(true);
        toast.success(
          isVi
            ? "Yêu cầu đã được gửi! Đội ngũ Yog Jivan sẽ liên hệ với quý công ty."
            : "Enquiry received! The Yog Jivan team will connect with your organizer directly."
        );
      },
      onError: (msg) => {
        toast.error(typeof msg === "string" ? msg : (isVi ? "Có lỗi xảy ra khi gửi" : "Submission failed. Please try again."));
      },
    });
  }

  if (done) {
    return (
      <div className="glass-luxe rounded-2xl p-8 text-center border border-[color:var(--gold)]/40">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)]">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
          {isVi ? "Đã ghi nhận yêu cầu trải nghiệm" : "Office Pilot Enquiry Received"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          {isVi
            ? "Cảm ơn quý doanh nghiệp. Đội ngũ Yog Jivan sẽ liên hệ để xác nhận không gian, quy mô và lên lịch buổi trải nghiệm phù hợp."
            : "Thank you. Our team will review your room layout and headcount to propose a tailored workplace pilot."}
        </p>
        <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
          {isVi
            ? "Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn."
            : "Every session is led by an experienced, certified Yog Jivan yoga teacher."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={isVi ? CONTACT.zalo : waHref("corporate")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs inline-flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            {isVi ? "Trao đổi nhanh qua Zalo" : "Chat on WhatsApp"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="corporate-enquiry-form"
      onSubmit={handleSubmit}
      className="glass-luxe rounded-2xl p-6 sm:p-8 border border-border/70 space-y-5"
    >
      <LeadGuardFields />
      <div>
        <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />{isVi ? "Dành cho doanh nghiệp" : "For Organizations"}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
          {heading || (isVi ? "Đăng ký buổi trải nghiệm tại công ty" : "Request an Office Yoga Pilot")}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {subheading ||
            (isVi
              ? "Hãy cho chúng tôi biết về quy mô và mong muốn của doanh nghiệp. Đội ngũ sẽ tư vấn chi tiết."
              : "Tell us about your team and workplace. We will confirm room layout, schedule and quotation.")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Tên doanh nghiệp / Đơn vị *" : "Organization / Company Name *"}
          </label>
          <input
            type="text"
            required
            placeholder={isVi ? "VD: Công ty TNHH Sản xuất..." : "e.g. Acme Corp Vietnam"}
            value={form.orgName}
            onChange={(e) => setForm({ ...form, orgName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.orgName && <p className="mt-1 text-xs text-destructive">{errors.orgName}</p>}
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Người đại diện & Chức vụ *" : "Organizer Name & Role *"}
          </label>
          <input
            type="text"
            required
            placeholder={isVi ? "VD: Nguyễn Văn A (HR Manager)" : "e.g. Sarah Jenkins (HR Lead)"}
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.contactName && <p className="mt-1 text-xs text-destructive">{errors.contactName}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Số điện thoại / Zalo liên hệ *" : "Business Phone / WhatsApp *"}
          </label>
          <div className="mt-1">
            <SearchablePhoneInput
              value={form.contact}
              onChange={(val) => setForm({ ...form, contact: val })}
              defaultCountry={country}
              placeholder={isVi ? "981 123 456" : "981 123 456"}
            />
          </div>
          {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Email công việc (tùy chọn)" : "Business Email (optional)"}
          </label>
          <input
            type="email"
            placeholder={isVi ? "contact@company.com" : "wellness@company.com"}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Địa điểm / Khu công nghiệp *" : "Workplace Site in Hai Duong *"}
          </label>
          <input
            type="text"
            required
            placeholder={isVi ? "VD: KCN Đại An / TP Hải Dương" : "e.g. Dai An IZ or Central Office"}
            value={form.site}
            onChange={(e) => setForm({ ...form, site: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.site && <p className="mt-1 text-xs text-destructive">{errors.site}</p>}
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Quy mô số người dự kiến *" : "Estimated Headcount *"}
          </label>
          <select
            value={form.headcount}
            onChange={(e) => setForm({ ...form, headcount: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          >
            <option value="5–15 employees">5–15 employees</option>
            <option value="15–30 employees">15–30 employees</option>
            <option value="30–60 employees">30–60 employees</option>
            <option value="60+ employees">60+ employees / Full company</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Hình thức tập *" : "Session Format *"}
          </label>
          <select
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          >
            <option value="30-minute chair yoga">30-minute chair yoga (Break / Shift)</option>
            <option value="45-minute mat session">45-minute mat session (Dedicated space)</option>
            <option value="Combined / Pilot series">Combined pilot or 4-session series</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-foreground/80">
          {isVi ? "Ghi chú thêm về không gian hoặc thời gian" : "Notes on Room Layout or Shift Windows"}
        </label>
        <textarea
          rows={2}
          placeholder={
            isVi
              ? "VD: Phòng họp đa năng, có ghế tựa, khung giờ 12:00 - 12:30 trưa..."
              : "e.g. Multipurpose conference room, chairs available, prefer 12:00–12:30pm lunch break..."
          }
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
          {isVi
            ? "Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn."
            : "Every session is led by an experienced, certified Yog Jivan yoga teacher."}
        </p>

        <button
          type="submit"
          disabled={busy}
          className="btn-gold min-h-[44px] justify-center px-6 text-sm shrink-0"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isVi ? (
            "Gửi yêu cầu trải nghiệm"
          ) : (
            "Request Office Pilot"
          )}
        </button>
      </div>
    </form>
  );
}
