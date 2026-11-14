import { useState, useId } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  CATEGORY_LABELS,
  FEEDBACK_TYPES,
  REPLY_LABELS,
  SERVICE_OPTIONS,
  SUPPORT_CATEGORIES,
  type ReplyPreference,
  type SupportCategory,
  type SupportSubmitResult,
} from "@/lib/support/types";
import { submitSupportTicket } from "@/lib/support/support-client";
import { isViPath } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { waHref } from "@/lib/wa";
import { CheckCircle2, MessageCircle, AlertCircle, RefreshCw } from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";

interface SupportIntakeFormProps {
  initialCategory?: SupportCategory;
  initialMessage?: string;
  mode?: "ask" | "feedback";
  lang?: "EN" | "VI";
  onSuccess?: (res: SupportSubmitResult) => void;
  onCancel?: () => void;
}

export function SupportIntakeForm({
  initialCategory = "booking_lesson",
  initialMessage = "",
  mode = "ask",
  lang,
  onSuccess,
  onCancel,
}: SupportIntakeFormProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isVi = lang ? lang === "VI" : isViPath(currentPath);
  const locale: "en" | "vi" = isVi ? "vi" : "en";

  const defaultCategory: SupportCategory =
    mode === "feedback" ? "class_feedback" : initialCategory;

  const [category, setCategory] = useState<SupportCategory>(defaultCategory);
  const [service, setService] = useState<string>("General / Not sure");
  const [feedbackType, setFeedbackType] = useState<string>("General feedback");
  const [message, setMessage] = useState<string>(initialMessage);
  const [replyPref, setReplyPref] = useState<ReplyPreference>("none");
  const [contact, setContact] = useState<string>("");
  const [hp, setHp] = useState<string>(""); // Honeypot
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<SupportSubmitResult | null>(null);

  const formId = useId();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanMsg = message.trim();
    if (cleanMsg.length < 10) {
      setErrorMsg(
        isVi
          ? "Vui lòng nhập nội dung chi tiết tối thiểu 10 ký tự."
          : "Please enter at least 10 characters describing your question or feedback."
      );
      return;
    }

    if (cleanMsg.length > 1000) {
      setErrorMsg(
        isVi
          ? "Nội dung không được vượt quá 1000 ký tự."
          : "Message cannot exceed 1000 characters."
      );
      return;
    }

    if (replyPref !== "none" && (!contact || contact.trim().length < 3)) {
      setErrorMsg(
        isVi
          ? "Vui lòng nhập thông tin liên hệ (WhatsApp, Zalo hoặc Email) để nhận phản hồi."
          : "Please provide your contact (WhatsApp, Zalo, or Email) so we can reply."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const idempotencyKey = `sup_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const res = await submitSupportTicket({
        category,
        service_or_studio: service,
        feedback_type: category === "class_feedback" ? feedbackType : undefined,
        message: cleanMsg,
        reply_preference: replyPref,
        contact: replyPref === "none" ? undefined : contact.trim(),
        locale,
        route: currentPath,
        hp,
        idempotency_key: idempotencyKey,
      });

      if (res.ok && res.ticket_ref) {
        setSuccessResult(res);
        onSuccess?.(res);
      } else {
        setErrorMsg(
          res.error ||
            (isVi
              ? "Không thể gửi tin nhắn. Vui lòng thử lại hoặc nhắn tin trực tiếp."
              : "Unable to submit. Please try again or reach out directly via chat.")
        );
      }
    } catch (err) {
      setErrorMsg(
        isVi
          ? "Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền."
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE
  if (successResult) {
    return (
      <div className="rounded-2xl border border-[color:var(--gold)]/30 bg-card/60 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-foreground">
          {isVi ? "Cảm ơn bạn đã liên hệ" : "Thank you for reaching out"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {isVi
            ? `Yog Jivan đã nhận được tin nhắn của bạn. Mã tham chiếu:`
            : `We received your message. Your reference is:`}
        </p>
        <div className="mt-3 inline-block rounded-lg border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-2 font-mono text-base font-bold text-[color:var(--gold)]">
          {successResult.ticket_ref}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {successResult.is_anonymous
            ? isVi
              ? "Góp ý của bạn được lưu ẩn danh và bảo mật riêng tư."
              : "Your feedback is recorded privately and anonymously."
            : isVi
            ? "Đội ngũ Yog Jivan sẽ xem xét và phản hồi sớm qua kênh bạn đã chọn."
            : "The Yog Jivan team will review your message and reply via your preferred channel."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccessResult(null);
              setMessage("");
              setContact("");
              onCancel?.();
            }}
            className="btn-gold text-xs py-2 px-5"
          >
            {isVi ? "Đóng" : "Done"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
      {/* Category selector */}
      <div>
        <label
          htmlFor={`${formId}-category`}
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {isVi ? "Chủ đề yêu cầu *" : "Topic category *"}
        </label>
        <select
          id={`${formId}-category`}
          value={category}
          onChange={(e) => setCategory(e.target.value as SupportCategory)}
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-foreground focus:border-[color:var(--gold)] focus:outline-none"
        >
          {SUPPORT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-neutral-900 text-foreground">
              {CATEGORY_LABELS[locale][cat]}
            </option>
          ))}
        </select>
      </div>

      {/* Service / Studio selector */}
      <div>
        <label
          htmlFor={`${formId}-service`}
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {isVi ? "Dịch vụ hoặc cơ sở liên quan" : "Service or studio (optional)"}
        </label>
        <select
          id={`${formId}-service`}
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-foreground focus:border-[color:var(--gold)] focus:outline-none"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-neutral-900 text-foreground">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Feedback type (conditional if category is feedback) */}
      {category === "class_feedback" && (
        <div>
          <label
            htmlFor={`${formId}-feedback-type`}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {isVi ? "Khía cạnh góp ý" : "Aspect of feedback"}
          </label>
          <select
            id={`${formId}-feedback-type`}
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          >
            {FEEDBACK_TYPES.map((type) => (
              <option key={type} value={type} className="bg-neutral-900 text-foreground">
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message textarea */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor={`${formId}-message`}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {isVi ? "Nội dung câu hỏi hoặc góp ý *" : "Your question or feedback *"}
          </label>
          <span className="text-[0.65rem] text-muted-foreground">
            {message.length}/1000
          </span>
        </div>
        <textarea
          id={`${formId}-message`}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
          rows={4}
          placeholder={
            isVi
              ? "Hãy cho chúng tôi biết bạn cần hỗ trợ gì hoặc điều gì cần cải thiện..."
              : "Tell us how we can help or how your class experience went..."
          }
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-foreground focus:border-[color:var(--gold)] focus:outline-none"
        />
      </div>

      {/* Reply Preference */}
      <div>
        <label
          htmlFor={`${formId}-reply-pref`}
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {isVi ? "Kênh phản hồi mong muốn" : "Reply preference"}
        </label>
        <select
          id={`${formId}-reply-pref`}
          value={replyPref}
          onChange={(e) => setReplyPref(e.target.value as ReplyPreference)}
          className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-foreground focus:border-[color:var(--gold)] focus:outline-none"
        >
          <option value="none" className="bg-neutral-900 text-foreground">
            {REPLY_LABELS[locale].none}
          </option>
          <option value="whatsapp_zalo" className="bg-neutral-900 text-foreground">
            {REPLY_LABELS[locale].whatsapp_zalo}
          </option>
          <option value="email" className="bg-neutral-900 text-foreground">
            {REPLY_LABELS[locale].email}
          </option>
        </select>
      </div>

      {/* Contact info (if reply requested) */}
      {replyPref !== "none" && (
        <div>
          <label
            htmlFor={`${formId}-contact`}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {replyPref === "email"
              ? isVi
                ? "Địa chỉ Email của bạn *"
                : "Your Email Address *"
              : isVi
              ? "Số điện thoại Zalo hoặc WhatsApp của bạn *"
              : "Your WhatsApp or Zalo Phone Number *"}
          </label>
          <input
            id={`${formId}-contact`}
            type={replyPref === "email" ? "email" : "text"}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={
              replyPref === "email"
                ? "name@example.com"
                : "+84 ... hoặc +1 ..."
            }
            className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-foreground focus:border-[color:var(--gold)] focus:outline-none"
          />
        </div>
      )}

      {/* Privacy & Safety Warning */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[0.68rem] leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground/80">
          {isVi ? "Lưu ý bảo mật thông tin:" : "Privacy & safety standard:"}
        </p>
        <p className="mt-0.5">
          {isVi
            ? "Vui lòng không gửi thông tin bệnh lý chi tiết, số thẻ ngân hàng, hoặc dữ liệu nhận diện cá nhân của trẻ em (tên trẻ, ngày sinh, ảnh chụp học sinh). Mọi góp ý đều được giữ bảo mật riêng tư."
            : "Please do not include health conditions, medical history, bank/credit card numbers, or child identifying information (such as child names or photos). Private feedback is never published without explicit consent."}
        </p>
      </div>

      {/* Honeypot field (hidden from real users) */}
      <input
        type="text"
        name="hp"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Error display */}
      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold flex items-center justify-center gap-2 text-xs py-2.5 px-6 min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>{isVi ? "Đang gửi..." : "Sending..."}</span>
            </>
          ) : (
            <span>{isVi ? "Gửi thông tin" : "Submit"}</span>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-ghost-gold text-xs py-2.5 px-4"
          >
            {isVi ? "Hủy" : "Cancel"}
          </button>
        )}
      </div>

      {/* Direct chat fallback */}
      <div className="pt-3 border-t border-white/10 text-center">
        <p className="text-[0.68rem] text-muted-foreground">
          {isVi ? "Hoặc nhắn tin trực tiếp cho đội ngũ:" : "Or chat directly with our team:"}
        </p>
        <div className="mt-2 flex justify-center gap-3">
          <a
            href={waHref("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-foreground hover:border-[color:var(--gold)]/50"
          >
            <MessageCircle className="h-3.5 w-3.5 text-green-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-foreground hover:border-[color:var(--gold)]/50"
          >
            <ZaloIcon className="h-3.5 w-3.5 text-blue-400" />
            <span>Zalo</span>
          </a>
        </div>
      </div>
    </form>
  );
}
