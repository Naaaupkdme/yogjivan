import { useState, useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { searchHelpFAQs, type HelpFAQ } from "@/lib/support/help-faq";
import { SupportIntakeForm } from "./SupportIntakeForm";
import { GoogleReviewCards } from "./GoogleReviewCards";
import { isViPath } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { waHref } from "@/lib/wa";
import {
  Search,
  MessageCircle,
  HelpCircle,
  Send,
  MessageSquareHeart,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";

export type HelpTab = "faq" | "ask" | "feedback" | "reviews";

interface HelpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: HelpTab;
}

export function HelpSheet({
  open,
  onOpenChange,
  initialTab = "faq",
}: HelpSheetProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isVi = isViPath(currentPath);
  const locale = isVi ? "vi" : "en";

  const [activeTab, setActiveTab] = useState<HelpTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Detect mobile viewport for side vs bottom sheet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for custom open event
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: HelpTab; query?: string }>;
      onOpenChange(true);
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
      if (customEvent.detail?.query) {
        setSearchQuery(customEvent.detail.query);
      }
    };

    window.addEventListener("yj:open-help", handleOpen);
    return () => window.removeEventListener("yj:open-help", handleOpen);
  }, [onOpenChange]);

  // Focus search input on open if on FAQ tab
  useEffect(() => {
    if (open && activeTab === "faq") {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, activeTab]);

  const faqs = searchHelpFAQs(searchQuery, locale, currentPath);

  const questionChips = isVi
    ? [
        { label: "Giá 1 kèm 1", query: "giá 1 kèm 1" },
        { label: "Demo doanh nghiệp", query: "demo doanh nghiệp" },
        { label: "Yoga học đường", query: "yoga học đường" },
        { label: "Yoga hai người", query: "hai người" },
        { label: "Yoga gia đình", query: "gia đình" },
        { label: "Đặt máy quay", query: "máy quay" },
        { label: "Đổi lịch", query: "đổi lịch" },
        { label: "Địa chỉ phòng tập", query: "địa chỉ phòng tập" },
      ]
    : [
        { label: "Solo $25 Rate", query: "private session price" },
        { label: "Corporate Demo", query: "corporate demo" },
        { label: "School Yoga", query: "school yoga" },
        { label: "Couples & Friends", query: "couples yoga" },
        { label: "Family Rates", query: "family yoga" },
        { label: "Camera Setup", query: "camera setup" },
        { label: "Rescheduling", query: "reschedule" },
        { label: "Studio Hours", query: "studio hours" },
      ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`z-50 flex flex-col p-0 bg-background border-border/80 shadow-2xl ${
          isMobile
            ? "max-h-[92vh] rounded-t-3xl border-t"
            : "w-full sm:max-w-md border-l h-full"
        }`}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Header with Title & Direct Human Handoff */}
        <div className="border-b border-border/60 p-5 bg-card/40">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-xl font-bold text-foreground">
              {isVi ? "Bạn cần hỗ trợ gì?" : "How can we help?"}
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              {isVi
                ? "Tìm câu trả lời nhanh, gửi câu hỏi hoặc góp ý riêng tư cho đội ngũ Yog Jivan."
                : "Find quick answers, ask a question, or send private feedback to the Yog Jivan team."}
            </SheetDescription>
          </SheetHeader>

          {/* Direct Instant Chat Links (Human Handoff) */}
          <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-xs text-muted-foreground">
            <span>{isVi ? "Nhắn tin trực tiếp:" : "Direct team chat:"}</span>
            <div className="flex items-center gap-2">
              <a
                href={waHref("general")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-green-500/10 px-2.5 py-1 text-[0.7rem] font-semibold text-green-400 hover:bg-green-500/20"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-3 w-3" />
                <span>WhatsApp</span>
              </a>
              <a
                href={CONTACT.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-2.5 py-1 text-[0.7rem] font-semibold text-blue-400 hover:bg-blue-500/20"
                aria-label="Chat on Zalo"
              >
                <ZaloIcon className="h-3 w-3" />
                <span>Zalo</span>
              </a>
            </div>
          </div>

          {/* Navigation Action Tabs */}
          <div className="mt-4 grid grid-cols-4 gap-1 rounded-xl bg-black/40 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("faq")}
              className={`flex flex-col items-center justify-center rounded-lg py-2 text-[0.65rem] font-medium transition ${
                activeTab === "faq"
                  ? "bg-[color:var(--gold)] text-black font-semibold shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5 mb-0.5" />
              <span>{isVi ? "Câu hỏi" : "FAQ"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ask")}
              className={`flex flex-col items-center justify-center rounded-lg py-2 text-[0.65rem] font-medium transition ${
                activeTab === "ask"
                  ? "bg-[color:var(--gold)] text-black font-semibold shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Send className="h-3.5 w-3.5 mb-0.5" />
              <span>{isVi ? "Gửi câu hỏi" : "Ask Team"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("feedback")}
              className={`flex flex-col items-center justify-center rounded-lg py-2 text-[0.65rem] font-medium transition ${
                activeTab === "feedback"
                  ? "bg-[color:var(--gold)] text-black font-semibold shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquareHeart className="h-3.5 w-3.5 mb-0.5" />
              <span>{isVi ? "Góp ý riêng" : "Feedback"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`flex flex-col items-center justify-center rounded-lg py-2 text-[0.65rem] font-medium transition ${
                activeTab === "reviews"
                  ? "bg-[color:var(--gold)] text-black font-semibold shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Star className="h-3.5 w-3.5 mb-0.5" />
              <span>{isVi ? "Đánh giá" : "Reviews"}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* TAB 1: FAQ SEARCH */}
          {activeTab === "faq" && (
            <div className="space-y-4">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isVi
                      ? "Tìm câu hỏi thường gặp..."
                      : "Search common questions..."
                  }
                  className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-[color:var(--gold)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.65rem] text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Question Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {questionChips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => setSearchQuery(chip.query)}
                    className={`rounded-full border px-2.5 py-1 text-[0.68rem] transition ${
                      searchQuery.toLowerCase().includes(chip.query.toLowerCase())
                        ? "border-[color:var(--gold)] bg-[color:var(--gold)]/20 text-[color:var(--gold)] font-medium"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/25 hover:text-foreground"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* FAQ Results */}
              <div className="space-y-2 pt-2">
                {faqs.length > 0 ? (
                  faqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    const question = isVi ? faq.qVi : faq.qEn;
                    const answer = isVi ? faq.aVi : faq.aEn;

                    return (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedFaqId(isExpanded ? null : faq.id)
                          }
                          className="w-full flex items-center justify-between p-3.5 text-left text-xs font-medium text-foreground hover:text-[color:var(--gold)]"
                        >
                          <span className="pr-2">{question}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="border-t border-white/10 bg-black/20 p-3.5 text-xs text-muted-foreground leading-relaxed">
                            <p>{answer}</p>
                            {faq.link && (
                              <div className="mt-3">
                                <a
                                  href={
                                    faq.link.hash
                                      ? `${faq.link.to}#${faq.link.hash}`
                                      : faq.link.to
                                  }
                                  onClick={() => onOpenChange(false)}
                                  className="inline-flex items-center gap-1 font-semibold text-[color:var(--gold)] hover:underline"
                                >
                                  <span>
                                    {isVi
                                      ? faq.link.labelVi
                                      : faq.link.labelEn}
                                  </span>
                                  <ArrowRight className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  // ZERO MATCH STATE
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                    <p className="text-xs text-muted-foreground">
                      {isVi
                        ? "Chưa tìm thấy câu trả lời. Hãy gửi câu hỏi cho Yog Jivan."
                        : "We couldn’t find an answer. Send your question to the team."}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("ask");
                      }}
                      className="mt-3 btn-gold text-xs py-2 px-4 inline-flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>
                        {isVi ? "Gửi câu hỏi cho đội ngũ" : "Ask the team"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ASK THE TEAM */}
          {activeTab === "ask" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">
                  {isVi ? "Hỏi đáp cùng đội ngũ Yog Jivan" : "Ask the Yog Jivan Team"}
                </p>
                <p className="mt-1">
                  {isVi
                    ? "Chúng tôi sẽ giải đáp các thắc mắc về lịch tập, học phí, cách chọn lớp hoặc kỹ thuật tập luyện."
                    : "Ask about class recommendations, pricing, scheduling, or practice modifications. We reply directly."}
                </p>
              </div>

              <SupportIntakeForm
                mode="ask"
                initialCategory="booking_lesson"
                initialMessage={searchQuery}
                lang={langCode(locale)}
                onCancel={() => setActiveTab("faq")}
              />
            </div>
          )}

          {/* TAB 3: PRIVATE FEEDBACK */}
          {activeTab === "feedback" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">
                  {isVi ? "Góp ý riêng tư & bảo mật" : "Private & Confidential Feedback"}
                </p>
                <p className="mt-1">
                  {isVi
                    ? "Mọi phản hồi của bạn được gửi trực tiếp đến ban quản lý và giữ bí mật hoàn toàn. Bạn có thể chọn gửi ẩn danh."
                    : "Share your experience directly with management. Your notes remain completely private and can be sent anonymously."}
                </p>
              </div>

              <SupportIntakeForm
                mode="feedback"
                initialCategory="class_feedback"
                lang={langCode(locale)}
                onCancel={() => setActiveTab("faq")}
              />
            </div>
          )}

          {/* TAB 4: GOOGLE REVIEWS */}
          {activeTab === "reviews" && (
            <GoogleReviewCards
              currentRoute={currentPath}
              isVi={isVi}
              onOpenFeedback={() => setActiveTab("feedback")}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function langCode(loc: "en" | "vi"): "EN" | "VI" {
  return loc === "vi" ? "VI" : "EN";
}

/** Helper function to open the Help Sheet with specific tab */
export function openHelpSheet(tab: HelpTab = "faq", query?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("yj:open-help", {
        detail: { tab, query },
      })
    );
  }
}
