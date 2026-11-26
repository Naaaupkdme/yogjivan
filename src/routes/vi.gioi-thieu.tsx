import { createFileRoute } from "@tanstack/react-router";
import { Leadership } from "@/components/site/Leadership";
import { sonuSchema } from "@/lib/leadership";
import { breadcrumbSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_ABOUT } from "@/lib/locale-routes";

export const Route = createFileRoute("/vi/gioi-thieu")({
  head: () => ({
    meta: [
      { title: "Master Anil & Sonu Ghanghas — Giới thiệu Yog Jivan" },
      { name: "description", content: "Gặp Master Anil, người sáng lập và giáo viên yoga chính, cùng Sonu Ghanghas, đồng sáng lập và phụ trách phát triển website, SEO và quy trình tiếp nhận yêu cầu Yog Jivan." },
      { property: "og:title", content: "Master Anil & Sonu Ghanghas — Giới thiệu Yog Jivan" },
      { property: "og:description", content: "Tìm hiểu con người đứng sau việc giảng dạy và trải nghiệm trực tuyến của Yog Jivan." },
      { property: "og:url", content: "https://www.yogjivan.com/vi/gioi-thieu" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "vi_VN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.yogjivan.com/vi/gioi-thieu" }, ...hreflangLinks(PAIR_ABOUT)],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema("Giới thiệu", "/vi/gioi-thieu")) },
      { type: "application/ld+json", children: JSON.stringify(sonuSchema("vi")) },
    ],
  }),
  component: ViAbout,
});

function ViAbout() {
  return <>
    <header className="container-luxe pt-32 pb-8 md:pt-40">
      <p className="eyebrow">Giới thiệu Yog Jivan</p>
      <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Master Anil & Sonu Ghanghas</h1>
      <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">Yoga Ấn Độ chính thống, được hỗ trợ bởi trải nghiệm trực tuyến chu đáo. Tìm hiểu người sáng lập, tiêu chuẩn giảng dạy và công việc phát triển Yog Jivan.</p>
    </header>
    <Leadership locale="vi" detailed />
    <section className="section-tight"><div className="container-luxe">
      <h2 className="font-display text-2xl">Đội ngũ giảng dạy</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Master Anil hiện trực tiếp hướng dẫn các lớp online nhóm nhỏ. Các buổi tại studio và buổi yoga riêng do đội ngũ giáo viên Yog Jivan đảm nhiệm. Học viên được ghép với giáo viên phù hợp và thường tiếp tục tập cùng giáo viên đó.</p>
      <a href="/vi/yoga-1-kem-1-online" className="mt-5 inline-block text-primary underline underline-offset-4">Tìm hiểu yoga 1 kèm 1 online</a>
    </div></section>
  </>;
}