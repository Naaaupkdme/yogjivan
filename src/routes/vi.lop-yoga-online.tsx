import { createFileRoute } from "@tanstack/react-router";
import { ViHero, ViSection, ViEnquiryCTA, ViPageNav } from "@/components/site/vi/ViParts";
import { hreflangLinks, PAIR_ONLINE_GROUP, SITE_ORIGIN } from "@/lib/locale-routes";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { ONLINE_PLANS, formatUSD } from "@/lib/facts/pricing";
import { SAFETY_NOTE_VI } from "@/lib/facts/vi-copy";
import { CONTACT } from "@/lib/facts/contact";

const CANONICAL = `${SITE_ORIGIN}/vi/lop-yoga-online`;
const TITLE = "Lớp Yoga Online Trực Tiếp | Yog Jivan";
const DESC =
  "Lớp yoga online trực tiếp nhóm nhỏ cùng Master Anil: buổi tập trực tuyến có giáo viên quan sát và hướng dẫn bằng tiếng Anh, tiếng Việt và tiếng Hindi.";

export const Route = createFileRoute("/vi/lop-yoga-online")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "vi_VN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }, ...hreflangLinks(PAIR_ONLINE_GROUP)],
  }),
  component: ViOnlineGroup,
});

function ViOnlineGroup() {
  return (
    <>
      <ViHero
        eyebrow="Lớp online trực tiếp"
        title="Lớp Yoga Online Trực Tiếp Nhóm Nhỏ"
        lead={`Buổi tập trực tuyến ${ONLINE_CLASS.durationMinutes} phút, tối đa ${ONLINE_CLASS.maxGroupSize} học viên, hiện do Master Anil trực tiếp hướng dẫn. Đây là lớp trực tiếp qua video — giáo viên nhìn thấy bạn tập và hướng dẫn bằng lời trong buổi học, không phải video quay sẵn.`}
        primary={{ href: "#hoc-phi", label: "Xem học phí" }}
        secondary={{ href: CONTACT.whatsapp, label: "Nhắn WhatsApp" }}
      />

      <ViSection heading="Lớp học diễn ra như thế nào">
        <p>
          Bạn tham gia bằng liên kết video vào giờ lớp học. Master Anil hướng dẫn trình tự bài tập, quan sát và nhắc
          chỉnh tư thế bằng lời, đồng thời đưa ra phương án thay thế cho những tư thế bạn chưa phù hợp. Lớp được dạy
          bằng tiếng Anh, tiếng Việt và tiếng Hindi.
        </p>
        <p>
          Bạn chỉ cần một tấm thảm, khoảng trống bằng chiều dài cơ thể và thiết bị có camera đặt sao cho giáo viên nhìn
          được toàn thân. Bật camera giúp giáo viên chỉnh tư thế cho bạn; nếu bạn không thể bật, hãy trao đổi trước với
          đội ngũ Yog Jivan.
        </p>
        <p>{SAFETY_NOTE_VI}</p>
      </ViSection>

      <ViSection id="hoc-phi" heading="Học phí gói online">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ONLINE_PLANS.map((plan) => (
            <div key={plan.id} className="glass-soft rounded-2xl border border-white/10 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                {plan.months} tháng
              </div>
              <div className="mt-2 font-display text-2xl text-gold-gradient">{formatUSD(plan.priceUSD)}</div>
              {plan.badge && (
                <div className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--gold)]">
                  {plan.badge === "Most Popular" ? "Được chọn nhiều nhất" : "Tiết kiệm nhất"}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-foreground/65">
          Học phí niêm yết bằng USD và áp dụng cho các lớp online nhóm nhỏ. Buổi tập 1 kèm 1 online có mức riêng và
          được tư vấn trực tiếp.
        </p>
      </ViSection>

      <ViSection heading="Bạn muốn được hướng dẫn riêng?">
        <p>
          Nếu bạn cần lịch tập linh hoạt hơn, muốn được điều chỉnh kỹ từng tư thế hoặc có giới hạn vận động cần lưu ý,
          hãy tham khảo{" "}
          <a href="/vi/yoga-1-kem-1-online" className="text-[color:var(--gold)] underline underline-offset-4">
            chương trình yoga 1 kèm 1 online
          </a>
          . Bạn cũng có thể tập trực tiếp tại{" "}
          <a href="/vi/yoga-hai-duong" className="text-[color:var(--gold)] underline underline-offset-4">
            hai cơ sở của Yog Jivan tại khu vực Hải Dương
          </a>
          .
        </p>
      </ViSection>

      <ViEnquiryCTA
        heading="Đăng ký lớp online trực tiếp"
        body="Nhắn cho đội ngũ Yog Jivan để biết khung giờ lớp hiện tại, cách tham gia và gói phù hợp với bạn."
      />

      <ViPageNav current="/vi/lop-yoga-online" />
    </>
  );
}
