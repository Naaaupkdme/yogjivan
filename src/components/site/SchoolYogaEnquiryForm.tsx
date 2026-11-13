import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { GraduationCap, Check, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { defaultCountries, parseCountry } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import { SearchablePhoneInput } from "@/components/site/SearchablePhoneInput";
import { LeadGuardFields } from "@/components/site/LeadGuardFields";
import { waHref } from "@/lib/wa";
import { CONTACT } from "@/lib/facts/contact";
import { captureAttribution, detectMarket, type Attribution } from "@/lib/attribution";
import { useLeadSubmission, getTimezone } from "@/lib/leads/form-submission";

const schema = z.object({
  schoolName: z.string().trim().min(2, "Please share the school or institution name").max(120),
  coordinatorName: z.string().trim().min(2, "Please share the coordinator name and role").max(120),
  contact: z.string().trim().min(6, "Please share a valid official contact number").max(40),
  email: z.string().trim().email("Please share a valid school email").max(200).optional().or(z.literal("")),
  ageBand: z.string().min(1, "Please choose the children's age band"),
  classSize: z.string().min(1, "Please choose an estimated group size"),
  site: z.string().trim().min(2, "Please share the school location or district in Hai Duong").max(160),
  timing: z.string().max(80).optional().or(z.literal("")),
  notes: z.string().max(400).optional().or(z.literal("")),
});

type FormState = {
  schoolName: string;
  coordinatorName: string;
  contact: string;
  email: string;
  ageBand: string;
  classSize: string;
  site: string;
  timing: string;
  notes: string;
};

const SUPPORTED_ISO2 = new Set(defaultCountries.map((c) => parseCountry(c).iso2 as string));

export type SchoolYogaEnquiryFormProps = {
  lang?: "EN" | "VI";
  heading?: string;
  subheading?: string;
};

export function SchoolYogaEnquiryForm({
  lang = "EN",
  heading,
  subheading,
}: SchoolYogaEnquiryFormProps) {
  const isVi = lang === "VI";
  const [form, setForm] = useState<FormState>({
    schoolName: "",
    coordinatorName: "",
    contact: "",
    email: "",
    ageBand: "7–10 years (Primary / Tiểu học)",
    classSize: "15–25 students (with school staff present)",
    site: "",
    timing: "Extracurricular / Physical education slot",
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
      `School/Institution: ${parsed.data.schoolName}`,
      `Coordinator/Staff: ${parsed.data.coordinatorName}`,
      `School Site: ${parsed.data.site}`,
      `Age Band: ${parsed.data.ageBand}`,
      `Class Size: ${parsed.data.classSize}`,
      `Timing: ${parsed.data.timing || "Flexible"}`,
      parsed.data.notes ? `Notes: ${parsed.data.notes}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    await submission.submit({
      data: parsed.data,
      formId: "school-yoga-pilot-enquiry",
      category: "school_kids_yoga",
      setBusy,
      buildPayload: (data, leadEventId) => ({
        name: data.coordinatorName,
        whatsapp: data.contact,
        email: data.email || undefined,
        preferred_experience: `School Yoga Pilot (${data.ageBand}, ${data.classSize})`,
        status: "submitted",
        source: "website",
        notes: payloadNotes,
        meta: {
          funnel: "school_yoga_pilot_enquiry",
          landing_page: isVi ? "/vi/yoga-hoc-duong" : "/school-yoga",
          lead_event_id: leadEventId,
          market: country,
          timezone: getTimezone(),
          school_name: data.schoolName,
          site: data.site,
          age_band: data.ageBand,
          class_size: data.classSize,
          timing: data.timing || null,
          utm_source: attribution.utm_source ?? null,
          utm_medium: attribution.utm_medium ?? null,
        },
      }),
      onSuccess: () => {
        setDone(true);
        toast.success(
          isVi
            ? "Yêu cầu đã được gửi! Đội ngũ Yog Jivan sẽ liên hệ với ban giám hiệu / thầy cô."
            : "Enquiry received! The Yog Jivan team will connect with your school staff."
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
          {isVi ? "Đã ghi nhận yêu cầu trải nghiệm học đường" : "School Pilot Enquiry Received"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          {isVi
            ? "Cảm ơn thầy cô và nhà trường. Đội ngũ giáo viên Yog Jivan sẽ liên hệ để thống nhất nhóm tuổi, sĩ số và lịch buổi học thử."
            : "Thank you. Our teaching team will connect with your coordinator to discuss age suitability, venue safety, and trial class schedule."}
        </p>
        <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
          {isVi
            ? "Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn."
            : "Every session is led by an experienced, certified Yog Jivan yoga teacher."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={isVi ? CONTACT.zalo : waHref("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs inline-flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            {isVi ? "Trao đổi qua Zalo" : "Connect on WhatsApp"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="school-yoga-enquiry-form"
      onSubmit={handleSubmit}
      className="glass-luxe rounded-2xl p-6 sm:p-8 border border-border/70 space-y-5"
    >
      <LeadGuardFields />
      <div>
        <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />{isVi ? "Dành cho trường học" : "For Schools & Educators"}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
          {heading || (isVi ? "Đăng ký buổi trải nghiệm tại trường" : "Ask About a School Yoga Pilot")}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {subheading ||
            (isVi
              ? "Dành cho ban giám hiệu và giáo viên điều phối. Chúng tôi không thu thập thông tin cá nhân của trẻ em trên biểu mẫu này."
              : "For school staff and program coordinators. Adult coordinator contact only — no child personal data is requested.")}
        </p>
        <div className="mt-3 rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-3.5 py-2 text-xs text-foreground/90">
          <strong>{isVi ? "Khu vực phục vụ: " : "Availability: "}</strong>
          {isVi
            ? "Yog Jivan hoạt động tại khu vực Hải Dương. Hãy gửi địa điểm để chúng tôi xác nhận khả năng tổ chức tại doanh nghiệp hoặc trường của bạn."
            : "Based in the Hải Dương area. Share your location and we’ll confirm whether we can visit your workplace or school."}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Tên trường / Cơ sở giáo dục *" : "School or Institution Name *"}
          </label>
          <input
            type="text"
            required
            placeholder={isVi ? "VD: Trường Tiểu học..." : "e.g. Hai Duong International Primary"}
            value={form.schoolName}
            onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.schoolName && <p className="mt-1 text-xs text-destructive">{errors.schoolName}</p>}
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Người đại diện trường & Chức vụ *" : "Coordinator Name & Role *"}
          </label>
          <input
            type="text"
            required
            placeholder={isVi ? "VD: Cô Mai (Giáo viên Thể chất)" : "e.g. Ms. Linh (PE Coordinator)"}
            value={form.coordinatorName}
            onChange={(e) => setForm({ ...form, coordinatorName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.coordinatorName && <p className="mt-1 text-xs text-destructive">{errors.coordinatorName}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Số điện thoại / Zalo liên hệ chính thức *" : "Official Phone / Zalo / WhatsApp *"}
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
            {isVi ? "Email trường học (tùy chọn)" : "School Email (optional)"}
          </label>
          <input
            type="email"
            placeholder={isVi ? "school@edu.vn" : "contact@school.edu.vn"}
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
            {isVi ? "Nhóm tuổi của trẻ *" : "Children's Age Band *"}
          </label>
          <select
            value={form.ageBand}
            onChange={(e) => setForm({ ...form, ageBand: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          >
            <option value="4–6 years (Mầm non / Kindergarten)">4–6 years (Kindergarten)</option>
            <option value="7–10 years (Tiểu học / Primary)">7–10 years (Primary)</option>
            <option value="11–14 years (THCS / Middle School)">11–14 years (Middle School)</option>
            <option value="Mixed age groups">Mixed age groups</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Sĩ số lớp dự kiến *" : "Estimated Class Size *"}
          </label>
          <select
            value={form.classSize}
            onChange={(e) => setForm({ ...form, classSize: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          >
            <option value="10–15 students">10–15 students</option>
            <option value="15–25 students">15–25 students (Staff present)</option>
            <option value="25–35 students">25–35 students (Multiple staff)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/80">
            {isVi ? "Địa điểm trường tại Hải Dương *" : "School Site in Hai Duong *"}
          </label>
          <input
            type="text"
            required
            placeholder={isVi ? "VD: Phường Lê Thanh Nghị, TP Hải Dương" : "e.g. Hai Duong City campus"}
            value={form.site}
            onChange={(e) => setForm({ ...form, site: e.target.value })}
            className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
          {errors.site && <p className="mt-1 text-xs text-destructive">{errors.site}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-foreground/80">
          {isVi ? "Hai khung giờ hoặc tiết học phù hợp" : "Two Preferred Times (Class or extracurricular slots)"}
        </label>
        <input
          type="text"
          placeholder={
            isVi
              ? "VD: Tiết thể dục thứ 3 (9:00) hoặc Buổi chiều thứ 5 (14:30)"
              : "e.g. Tuesday morning (9:00am) or Thursday afternoon (2:30pm)"
          }
          value={form.timing}
          onChange={(e) => setForm({ ...form, timing: e.target.value })}
          className="mt-1 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="school-notes" className="text-xs font-medium text-foreground/80">
          {isVi ? "Ghi chú điều phối người lớn (tùy chọn)" : "Adult Booking Logistics Notes (optional)"}
        </label>
        <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
          {isVi
            ? "Vui lòng không điền tên, ngày sinh, hình ảnh hoặc thông tin y tế của học sinh."
            : "Please do not include child names, dates of birth, photos, or medical history."}
        </p>
        <textarea
          id="school-notes"
          rows={2}
          placeholder={
            isVi
              ? "VD: Phòng sinh hoạt chung, sàn gỗ sạch, giáo viên chủ nhiệm có mặt cùng lớp..."
              : "e.g. Multipurpose hall with clean floor, school staff present throughout..."
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
            "Gửi yêu cầu học thử"
          ) : (
            "Ask About School Pilot"
          )}
        </button>
      </div>
    </form>
  );
}
