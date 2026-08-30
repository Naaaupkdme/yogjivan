import { createFileRoute } from "@tanstack/react-router";
import { ViHero, ViSection, ViStudioCards, ViEnquiryCTA, ViPageNav } from "@/components/site/vi/ViParts";
import { ViScheduleSection } from "@/components/site/vi/ViSchedule";
import { SITE_ORIGIN } from "@/lib/locale-routes";
import { AREA_PHRASE_VI, ADMIN_NOTE_VI, SAFETY_NOTE_VI } from "@/lib/facts/vi-copy";
import { STUDIO_HOURS } from "@/lib/facts/locations";
import { CONTACT } from "@/lib/facts/contact";

const CANONICAL = `${SITE_ORIGIN}/vi/yoga-hai-duong`;
const TITLE = "Yoga Hải Dương | Lớp Yoga & 2 Cơ Sở Yog Jivan";
const DESC =
  "Yog Jivan có hai cơ sở yoga phục vụ khu vực Hải Dương, Hải Phòng. Lớp cho người mới bắt đầu đến nâng cao, do đội ngũ giáo viên Yog Jivan hướng dẫn trực tiếp.";

// NOTE: there is no equivalent English route for this local page, so it is
// self-canonical with NO hreflang alternate. Do not pair it to "/" or
// "/programs" — that would be a false alternate.
export const Route = createFileRoute("/vi/yoga-hai-duong")({
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
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Yog Jivan", item: `${SITE_ORIGIN}/vi/` },
            { "@type": "ListItem", position: 2, name: "Yoga Hải Dương", item: CANONICAL },
          ],
        }),
      },
    ],
  }),
  component: ViHaiDuong,
});

function ViHaiDuong() {
  return (
    <>
      <ViHero
        eyebrow="Studio tại khu vực Hải Dương"
        title="Lớp Yoga tại Hải Dương"
        lead={`Yog Jivan có hai cơ sở tập yoga phục vụ ${AREA_PHRASE_VI}. Các lớp được đội ngũ giáo viên Yog Jivan hướng dẫn trực tiếp trên sàn tập, phù hợp từ người mới bắt đầu đến học viên đã tập lâu năm, mở cửa Thứ Hai đến Thứ Bảy từ ${STUDIO_HOURS.opens} đến ${STUDIO_HOURS.closes}.`}
        primary={{ href: "#lich-lop", label: "Xem lịch lớp" }}
        secondary={{ href: CONTACT.zalo, label: "Nhắn Zalo" }}
      />

      <ViSection heading="Hai cơ sở Yog Jivan">
        <ViStudioCards />
        <p className="text-xs leading-relaxed text-foreground/65">{ADMIN_NOTE_VI}</p>
      </ViSection>

      <ViScheduleSection />

      <ViSection heading="Lớp học phù hợp với ai">
        <p>
          Nếu bạn chưa từng tập yoga, giáo viên sẽ hướng dẫn bạn từ những tư thế cơ bản, cách thở và cách vào — ra tư
          thế an toàn. Nếu bạn đã tập một thời gian, bạn có thể tiếp tục với các biến thể sâu hơn trong cùng một lớp.
          Giáo viên quan sát trực tiếp và điều chỉnh bằng lời trong buổi tập, đồng thời gợi ý phương án thay thế khi
          một tư thế chưa phù hợp với cơ thể bạn hôm đó.
        </p>
        <p>{SAFETY_NOTE_VI}</p>
      </ViSection>

      <ViSection heading="Nếu bạn không tập trực tiếp được">
        <p>
          Ngoài lớp tại studio, Yog Jivan còn có{" "}
          <a href="/vi/lop-yoga-online" className="text-[color:var(--gold)] underline underline-offset-4">
            lớp yoga online trực tiếp theo nhóm nhỏ
          </a>{" "}
          và{" "}
          <a href="/vi/yoga-1-kem-1-online" className="text-[color:var(--gold)] underline underline-offset-4">
            chương trình yoga 1 kèm 1 online
          </a>{" "}
          nếu bạn cần lịch tập linh hoạt hoặc muốn được hướng dẫn riêng.
        </p>
      </ViSection>

      <div id="lien-he">
        <ViEnquiryCTA
          heading="Hỏi về lịch lớp và lớp phù hợp với bạn"
          body="Nhắn Zalo cho đội ngũ Yog Jivan để biết lịch lớp hiện tại tại từng cơ sở, lớp nào phù hợp với trình độ của bạn và cách bắt đầu."
        />
      </div>

      <ViPageNav current="/vi/yoga-hai-duong" />
    </>
  );
}
