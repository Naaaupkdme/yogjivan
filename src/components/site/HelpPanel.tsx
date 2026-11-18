import { useState } from "react";
import { X, Search, MessageCircle, Star } from "lucide-react";
import { openSiteSearch } from "@/components/site/SiteSearch";
import { chatChannelFor } from "@/lib/local-contact";
import { CONTACT } from "@/lib/facts/contact";
import { LOCATIONS } from "@/lib/facts/locations";
import { FEEDBACK_KINDS } from "@/lib/help/feedback";

// Loaded only when the visitor opens Help. Never fires analytics Lead events.
export default function HelpPanel({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const chat = chatChannelFor(pathname);
  const vi = chat.isVi;
  const [kind, setKind] = useState<(typeof FEEDBACK_KINDS)[number]>("suggestion");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "rate">("idle");
  const [ticket, setTicket] = useState<{ id: string; notified: boolean } | null>(null);

  const kindLabel = vi
    ? { suggestion: "Góp ý", problem: "Báo lỗi", compliment: "Lời khen" }
    : { suggestion: "Suggestion", problem: "Problem", compliment: "Compliment" };

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/public/help/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind, message, page_path: pathname.slice(0, 200), lang: vi ? "VI" : "EN", website: hp,
          ...(contact.trim() ? { reply_contact: contact.trim(), contact_consent: consent } : {}),
        }),
      });
      if (r.ok) {
        const j = await r.json();
        setTicket({ id: j.ticket_id, notified: Boolean(j.notified) });
        setMessage(""); setContact(""); setConsent(false);
        setState("done");
      } else setState(r.status === 429 ? "rate" : "error");
    } catch {
      setState("error");
    }
  }

  const section = "rounded-xl border border-border/60 p-4 space-y-2";
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        role="dialog" aria-modal="true" aria-labelledby="yj-help-title"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-border bg-card p-5 text-card-foreground shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="yj-help-title" className="font-display text-xl">{vi ? "Trợ giúp" : "Help"}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label={vi ? "Đóng" : "Close"} className="rounded-full p-2 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3 text-sm">
          <div className={section}>
            <p className="font-medium">{vi ? "Tìm câu trả lời" : "Find an answer"}</p>
            <button type="button" onClick={() => { onClose(); openSiteSearch(); }} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:bg-muted">
              <Search className="h-4 w-4" /> {vi ? "Tìm kiếm trên website" : "Search the site & FAQs"}
            </button>
          </div>
          <div className={section}>
            <p className="font-medium">{vi ? "Hỏi đội ngũ Yog Jivan" : "Ask the Yog Jivan team"}</p>
            <div className="flex flex-wrap gap-2">
              <a href={chat.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
                <MessageCircle className="h-4 w-4" /> {chat.channel === "zalo" ? "Zalo" : "WhatsApp"}
              </a>
              {chat.channel === "whatsapp" && (
                <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-4 py-2 hover:bg-muted">Zalo</a>
              )}
            </div>
          </div>
          <div className={section}>
            <p className="font-medium">{vi ? "Bạn đã tập ở studio nào? Để lại đánh giá Google" : "Which studio did you visit? Leave a Google review"}</p>
            <p className="text-xs text-muted-foreground">{vi ? "Đánh giá công khai, trung thực — tốt hay chưa tốt đều được trân trọng." : "Public and honest — every experience, good or not, is welcome."}</p>
            <div className="flex flex-col gap-2">
              {[LOCATIONS.studio1, LOCATIONS.studio2].map((s) => (
                <a key={s.id} href={s.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-muted">
                  <Star className="h-4 w-4" /> {s.name} — {s.street}
                </a>
              ))}
            </div>
          </div>
          <form className={section} onSubmit={send}>
            <p className="font-medium">{vi ? "Góp ý riêng cho chúng tôi" : "Private feedback to the team"}</p>
            <p className="text-xs text-muted-foreground">{vi ? "Không công khai, tách biệt với đánh giá Google. Vui lòng không ghi thông tin sức khỏe hay thông tin về trẻ em." : "Not public and separate from Google reviews. Please don't include health details or information about children."}</p>
            <div className="flex gap-2" role="radiogroup" aria-label={vi ? "Loại góp ý" : "Feedback type"}>
              {FEEDBACK_KINDS.map((k) => (
                <button key={k} type="button" role="radio" aria-checked={kind === k} onClick={() => setKind(k)}
                  className={`rounded-full border px-3 py-1 text-xs ${kind === k ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{kindLabel[k]}</button>
              ))}
            </div>
            <label htmlFor="yj-help-msg" className="sr-only">{vi ? "Nội dung" : "Message"}</label>
            <textarea id="yj-help-msg" required minLength={5} maxLength={1000} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg border border-border bg-background p-2" />
            <label htmlFor="yj-help-contact" className="block text-xs">{vi ? "Email hoặc số điện thoại để chúng tôi trả lời (không bắt buộc)" : "Email or phone for a reply (optional)"}</label>
            <input id="yj-help-contact" type="text" autoComplete="email" maxLength={120} value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-lg border border-border bg-background p-2" />
            {contact.trim() && (
              <label className="flex items-start gap-2 text-xs">
                <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
                <span>{vi ? "Tôi đồng ý để đội ngũ Yog Jivan dùng thông tin này chỉ để trả lời góp ý này." : "I agree the Yog Jivan team may use this only to reply to this feedback."}</span>
              </label>
            )}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" />
            <button type="submit" disabled={state === "sending"} className="rounded-full bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60">{vi ? "Gửi" : "Send"}</button>
            <p aria-live="polite" className="text-xs">
              {state === "done" && ticket && (vi
                ? `Cảm ơn bạn! Mã góp ý: ${ticket.id}. ${ticket.notified ? "Đội ngũ đã nhận được thông báo." : "Góp ý đã được lưu và sẽ được xem xét."}`
                : `Thank you! Ticket ${ticket.id}. ${ticket.notified ? "The team has been notified." : "Your feedback is saved and will be reviewed."}`)}
              {state === "error" && (vi ? "Chưa gửi được. Nội dung vẫn còn — bấm Gửi để thử lại." : "Couldn't send. Your text is kept — press Send to try again.")}
              {state === "rate" && (vi ? "Bạn đã gửi nhiều lần, vui lòng thử lại sau." : "Too many messages — please try later.")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
