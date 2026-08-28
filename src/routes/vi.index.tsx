import { createFileRoute } from "@tanstack/react-router";
import { ViHero, ViSection, ViTrustStrip, ViStudioCards, ViEnquiryCTA, ViPageNav } from "@/components/site/vi/ViParts";
import { hreflangLinks, PAIR_HOME, SITE_ORIGIN } from "@/lib/locale-routes";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { AREA_PHRASE_VI } from "@/lib/facts/vi-copy";
import { CONTACT } from "@/lib/facts/contact";

const CANONICAL = `${SITE_ORIGIN}/vi`;
const TITLE = "Yoga Hải Dương & Lớp Yoga Online | Yog Jivan";
const DESC =
  "Yog Jivan có hai cơ sở yoga phục vụ khu vực Hải Dương, lớp yoga online trực tiếp theo nhóm nhỏ và yoga 1 kèm 1 online cùng giáo viên phù hợp với trình độ của bạn.";

export const Route = createFileRoute("/vi/")({
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
    links: [{ rel: "canonical", href: CANONICAL }, ...hreflangLinks(PAIR_HOME)],
  }),
  component: ViHome,
});

function ViHome() {
  return (
    <>
      <ViHero
        eyebrow="Yoga Ấn Độ chính thống"
        title="Yoga tại Hải Dương và trực tuyến cùng Yog Jivan"
        lead={`Yog Jivan là trung tâm yoga do Master Anil Choudhary — Founder & Lead Yoga Teacher — sáng lập và dẫn dắt. Chúng tôi có hai cơ sở tại ${AREA_PHRASE_VI}, các lớp yoga online trực tiếp theo nhóm nhỏ và chương trình yoga 1 kèm 1 online với giáo viên Yog Jivan được ghép phù hợp với trình độ, mục tiêu và ngôn ngữ của bạn.`}
        primary={{ href: "/vi/yoga-1-kem-1-online", label: "Tìm hiểu Yoga 1 Kèm 1" }}
        secondary={{ href: CONTACT.zalo, label: "Nhắn Zalo" }}
      />

      <ViSection heading="Ba hình thức tập cùng Yog Jivan">
        <div className="grid gap-4 lg:grid-cols-3">
          <a
            href="/vi/yoga-1-kem-1-online"
            className="glass-luxe flex flex-col rounded-[1.5rem] border border-[color:var(--gold)]/40 p-6 transition-transform hover:-translate-y-1"
          >
            <span className="w-fit rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--gold)]">
              Chương trình cao cấp
            </span>
            <h3 className="mt-4 font-display text-xl leading-tight">Yoga 1 kèm 1 online</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Buổi tập trực tiếp {ONLINE_CLASS.durationMinutes} phút, riêng cho bạn, cùng một giáo viên Yog Jivan được
              ghép phù hợp. Học phí và lịch học được tư vấn riêng.
            </p>
          </a>
          <a
            href="/vi/lop-yoga-online"
            className="glass-soft flex flex-col rounded-[1.5rem] border border-white/10 p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="font-display text-xl leading-tight">Lớp yoga online trực tiếp</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Lớp nhóm nhỏ tối đa {ONLINE_CLASS.maxGroupSize} học viên, {ONLINE_CLASS.durationMinutes} phút, hiện do
              Master Anil trực tiếp hướng dẫn bằng tiếng Anh, tiếng Việt và tiếng Hindi.
            </p>
          </a>
          <a
            href="/vi/yoga-hai-duong"
            className="glass-soft flex flex-col rounded-[1.5rem] border border-white/10 p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="font-display text-xl leading-tight">Lớp yoga tại studio Hải Dương</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Hai cơ sở phục vụ {AREA_PHRASE_VI}, do đội ngũ giáo viên Yog Jivan hướng dẫn trực tiếp trên sàn tập.
            </p>
          </a>
        </div>
      </ViSection>

      <ViTrustStrip />

      <ViSection heading="Người sáng lập và đội ngũ giáo viên">
        <p>
          Master Anil Choudhary có hơn 12 năm giảng dạy yoga theo truyền thống Ấn Độ cổ điển — Hatha, Ashtanga và
          pranayama — cho học viên từ trình độ mới bắt đầu đến nâng cao. Thầy giảng dạy và trao đổi bằng tiếng Anh,
          tiếng Hindi và tiếng Việt.
        </p>
        <p>
          Hiện Master Anil trực tiếp hướng dẫn các lớp online nhóm nhỏ. Các buổi tập tại studio và các buổi 1 kèm 1 do
          đội ngũ giáo viên Yog Jivan đảm nhiệm, với giáo viên được ghép phù hợp với bạn. Yoga là hình thức hỗ trợ sức
          khoẻ và tinh thần, không thay thế cho tư vấn hay điều trị y tế.
        </p>
      </ViSection>

      <ViSection heading="Cơ sở tại khu vực Hải Dương">
        <ViStudioCards />
      </ViSection>

      <ViEnquiryCTA
        heading="Bắt đầu bằng một cuộc trò chuyện"
        body="Hãy cho đội ngũ Yog Jivan biết bạn đang ở đâu trong hành trình tập luyện và bạn muốn tập tại studio hay online. Chúng tôi sẽ tư vấn hình thức phù hợp, lịch học và bước tiếp theo."
      />

      <ViPageNav current="/vi" />
    </>
  );
}
