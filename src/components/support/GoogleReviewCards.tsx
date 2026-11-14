import { GOOGLE_STUDIO_REVIEWS, isOnlineOnlyRoute } from "@/lib/support/google-reviews";
import { Star, MapPin, ExternalLink, HeartHandshake } from "lucide-react";

interface GoogleReviewCardsProps {
  currentRoute?: string;
  isVi?: boolean;
  onOpenFeedback?: () => void;
}

export function GoogleReviewCards({
  currentRoute,
  isVi = false,
  onOpenFeedback,
}: GoogleReviewCardsProps) {
  const isOnline = isOnlineOnlyRoute(currentRoute);

  return (
    <div className="space-y-4 text-left">
      {/* Introduction */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground">
          {isVi ? "Đánh giá công khai trên Google Maps" : "Leave a Google Review"}
        </p>
        <p className="mt-1">
          {isVi
            ? "Mỗi cơ sở phòng tập của Yog Jivan đều có trang Google Business Profile độc lập. Mọi đánh giá đều công khai, minh bạch và không qua trung gian."
            : "Each Yog Jivan studio has a direct Google Business Profile. We link directly to Google so all reviews remain public, independent, and unedited."}
        </p>
      </div>

      {/* Online-only student guidance */}
      {isOnline && (
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 p-4 text-xs text-foreground/90">
          <div className="flex items-center gap-2 font-semibold text-[color:var(--gold)]">
            <HeartHandshake className="h-4 w-4 shrink-0" />
            <span>{isVi ? "Dành cho học viên tập trực tuyến" : "Practising Online From Home?"}</span>
          </div>
          <p className="mt-1.5 leading-relaxed text-xs text-muted-foreground">
            {isVi
              ? "Đánh giá Google Maps được thiết kế cho trải nghiệm tại phòng tập vật lý. Đối với các lớp online (1 kèm 1, hai người, gia đình), vui lòng gửi góp ý riêng để chúng tôi hỗ trợ và hoàn thiện chất lượng buổi học."
              : "Google Maps reviews belong to our local physical studios in Vietnam. For live online sessions, please share your private feedback with our team so we can support your home practice directly."}
          </p>
          {onOpenFeedback && (
            <button
              type="button"
              onClick={onOpenFeedback}
              className="mt-3 btn-ghost-gold text-xs py-1.5 px-3"
            >
              {isVi ? "Gửi góp ý riêng cho lớp online" : "Send private feedback instead"}
            </button>
          )}
        </div>
      )}

      {/* Studio Review Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {GOOGLE_STUDIO_REVIEWS.map((studio) => (
          <div
            key={studio.studioId}
            className="flex flex-col justify-between rounded-xl border border-white/15 bg-black/40 p-4 transition hover:border-[color:var(--gold)]/40"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[color:var(--gold)]">
                  {isVi ? studio.nameVi : studio.nameEn}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span className="text-[0.7rem] font-bold">5.0</span>
                </div>
              </div>

              <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                <span className="line-clamp-2">{isVi ? studio.addressVi : studio.addressEn}</span>
              </div>

              <p className="mt-2 text-[0.68rem] text-muted-foreground/80 italic">
                {isVi ? studio.featuresVi : studio.featuresEn}
              </p>
            </div>

            <a
              href={studio.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-3 py-2 text-xs font-semibold text-[color:var(--gold)] hover:bg-[color:var(--gold)]/20"
            >
              <span>{isVi ? "Đánh giá trên Google" : "Review on Google Maps"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
