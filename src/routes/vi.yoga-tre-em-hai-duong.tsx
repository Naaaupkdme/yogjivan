import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SchoolYogaEnquiryForm } from "@/components/site/SchoolYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_KIDS } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { CheckCircle2, Clock, GraduationCap, Heart, ShieldCheck, Sparkles } from "lucide-react";

const TITLE = "Yoga trẻ em cho trường học tại Hải Dương | Yog Jivan";
const DESCRIPTION =
  "Lớp yoga 35–40 phút qua trò chơi và kể chuyện cho trẻ em tại các trường khu vực Hải Dương.";
const CANONICAL = "https://www.yogjivan.com/vi/yoga-tre-em-hai-duong";

const FAQS = [
  {
    q: "Một buổi học kéo dài bao lâu?",
    a: "Thông thường từ 35–40 phút, phù hợp với sự tập trung tự nhiên và nhịp vận động của trẻ nhỏ.",
  },
  {
    q: "Thầy cô giáo có thể ở lại quan sát không?",
    a: "Thầy cô và nhân viên nhà trường luôn có mặt trong suốt buổi tập để quan sát, hỗ trợ và động viên các em.",
  },
  {
    q: "Mỗi lớp có tối đa bao nhiêu trẻ tham gia?",
    a: "Số lượng được thống nhất cùng nhà trường dựa trên độ tuổi, diện tích phòng và người hỗ trợ giám sát.",
  },
  {
    q: "Có lớp yoga cho gia đình tại nhà không?",
    a: "Có. Quý phụ huynh có thể tham khảo thêm chương trình Yoga Gia đình Trực tuyến để tập cùng con tại nhà.",
  },
];

const CLASS_STRUCTURE = [
  { time: "4 phút", step: "Chào hỏi & Ổn định", desc: "Sắp xếp chỗ ngồi, bài tập thở vui nhộn và làm quen cùng giáo viên." },
  { time: "7 phút", step: "Khởi động qua trò chơi", desc: "Làm nóng khớp và mô phỏng các động tác loài vật thân thiện." },
  { time: "15 phút", step: "Vận động theo câu chuyện", desc: "Tư thế yoga được lồng ghép tự nhiên qua các câu chuyện phiêu lưu." },
  { time: "7 phút", step: "Thăng bằng & Hợp tác", desc: "Trò chơi rèn luyện giữ thăng bằng và học cách phối hợp luân phiên cùng bạn bè." },
  { time: "5 phút", step: "Thư giãn tĩnh lặng", desc: "Nằm thư giãn, hít thở nhẹ nhàng và chuẩn bị tinh thần trở lại giờ học." },
];

export const Route = createFileRoute("/vi/yoga-tre-em-hai-duong")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "vi_VN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      ...hreflangLinks(PAIR_KIDS),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Yoga Trẻ Em", "/vi/yoga-tre-em-hai-duong")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Yoga trẻ em cho trường học tại Hải Dương",
            serviceType: "School Yoga Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/vi/yoga-tre-em-hai-duong",
          })
        ),
      },
    ],
  }),
  component: ViKidsYogaPage,
});

function ViKidsYogaPage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="Yoga Học Đường · Hải Dương"
        title="Yoga trẻ em cho trường học tại Hải Dương —"
        accent="học qua trò chơi và vận động."
        sub="Trong 35–40 phút, trẻ làm quen với vận động, thăng bằng và nhịp thở qua trò chơi và kể chuyện. Giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan phối hợp với nhà trường để chọn hoạt động phù hợp lứa tuổi và trực tiếp hướng dẫn lớp."
        contrastVeil
      >
        <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
          Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("school-yoga-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Trao đổi về buổi trải nghiệm tại trường
          </button>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[color:var(--gold)] hover:underline"
          >
            Nhắn Zalo trao đổi
          </a>
        </div>
      </PageHero>

      {/* 2 — 38-MINUTE STRUCTURE */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Lộ Trình Buổi Học</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            Một buổi học 38 phút diễn ra như thế nào?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Lớp học được tổ chức an toàn, có sự giám sát của giáo viên nhà trường. Các em có thể ngồi nghỉ bất cứ lúc nào và bài tập luôn được giáo viên chọn lọc kỹ lưỡng.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CLASS_STRUCTURE.map((step, idx) => (
              <div key={step.step} className="glass-luxe rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-[color:var(--gold)]/15 px-2.5 py-0.5 text-[0.65rem] font-bold text-[color:var(--gold)]">
                    Phần {idx + 1} · {step.time}
                  </span>
                  <h3 className="mt-3 font-display text-lg text-foreground">{step.step}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — SCHOOL COLLABORATION */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Đồng Hành Cùng Trường</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Quy trình hợp tác cùng nhà trường
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Chúng tôi phối hợp chặt chẽ với ban giám hiệu và giáo viên phụ trách để thống nhất lứa tuổi, sĩ số, không gian phòng tập và an toàn lối đi. Bắt đầu với một buổi trải nghiệm và trao đổi về chuỗi 4 buổi sau khi nhận phản hồi từ trường.
                </p>
                <p>
                  Các hoạt động giúp trẻ rèn luyện khả năng thăng bằng, phối hợp vận động và thói quen chờ đến lượt. Chúng tôi tiếp cận vận động thể chất lành mạnh, không đưa ra các cam kết điều trị y khoa hay thành tích học tập vượt trội.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Cam Kết An Toàn & Giám Sát</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Giám sát trực tiếp:</strong> Thầy cô nhà trường luôn có mặt cùng lớp trong suốt thời gian tập.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Không ép buộc:</strong> Trẻ có thể ngồi quan sát hoặc dừng lại nghỉ khi cảm thấy mệt.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Phân nhóm phù hợp:</strong> Bài tập được điều chỉnh theo khối lớp (Mầm non, Tiểu học, THCS).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span><strong>Bảo mật thông tin:</strong> Chúng tôi chỉ tiếp nhận thông tin người đại diện trường, không thu thập dữ liệu cá nhân của trẻ.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — ENQUIRY FORM */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <SchoolYogaEnquiryForm
              lang="VI"
              heading="Đăng ký trải nghiệm yoga học đường tại Hải Dương"
              subheading="Dành cho ban giám hiệu và thầy cô điều phối. Người liên hệ là người lớn đại diện trường — không thu thập thông tin cá nhân của trẻ em."
            />
          </div>
        </div>
      </section>

      {/* 5 — FAQS */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Giải đáp thắc mắc về lớp trải nghiệm yoga cho trẻ em tại các trường khu vực Hải Dương.
            </p>
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-10 text-center text-xs text-muted-foreground">
              <span>Tìm hiểu chương trình gia đình? Xem thêm </span>
              <Link to="/online-family-yoga" className="text-[color:var(--gold)] hover:underline">
                Family Yoga Trực Tuyến
              </Link>
              <span> hoặc thông tin phòng tập tại </span>
              <Link to="/vi/yoga-hai-duong" className="text-[color:var(--gold)] hover:underline">
                Yoga Hải Dương
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
