import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CorporateEnquiryForm } from "@/components/site/CorporateEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_CORPORATE } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { Briefcase, Building2, Clock, CheckCircle2, ShieldCheck, Users } from "lucide-react";

const TITLE = "Yoga cho doanh nghiệp tại Hải Dương | Yog Jivan";
const DESCRIPTION =
  "Yoga tại văn phòng cho doanh nghiệp khu vực Hải Dương. Liên hệ Yog Jivan để lên lịch buổi trải nghiệm hoặc lớp định kỳ.";
const CANONICAL = "https://www.yogjivan.com/vi/yoga-doanh-nghiep-hai-duong";

const FAQS = [
  {
    q: "Nhân viên có cần thảm tập không?",
    a: "Các buổi yoga trên ghế sử dụng ghế văn phòng chắc chắn và không gian thoáng. Yêu cầu về thảm được thống nhất trước nếu doanh nghiệp chọn hình thức tập trên thảm 45 phút.",
  },
  {
    q: "Doanh nghiệp có thể đặt một buổi trải nghiệm không?",
    a: "Có. Hãy cho chúng tôi biết địa điểm, số lượng người dự kiến và thời gian phù hợp để sắp xếp buổi học thử cho đội ngũ.",
  },
  {
    q: "Chi phí được tính như thế nào?",
    a: "Chúng tôi báo giá cụ thể dựa trên địa điểm, thời lượng buổi tập, số lượng người tham gia và quy mô chương trình (buổi trải nghiệm đơn lẻ hoặc chuỗi 4 buổi).",
  },
];

export const Route = createFileRoute("/vi/yoga-doanh-nghiep-hai-duong")({
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
      ...hreflangLinks(PAIR_CORPORATE),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Yoga Doanh Nghiệp", "/vi/yoga-doanh-nghiep-hai-duong")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Yoga cho doanh nghiệp tại Hải Dương",
            serviceType: "Corporate Wellness Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/vi/yoga-doanh-nghiep-hai-duong",
          })
        ),
      },
    ],
  }),
  component: ViCorporatePage,
});

function ViCorporatePage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="Sức Khỏe Doanh Nghiệp · Hải Dương"
        title="Yoga cho doanh nghiệp tại Hải Dương —"
        accent="vận động thư giãn tại nơi làm việc."
        sub="Giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn các buổi tập trên ghế hoặc trên thảm tại nơi làm việc, phù hợp với không gian và lịch của doanh nghiệp."
        contrastVeil
      >
        <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
          Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("corporate-enquiry-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Trao đổi về buổi trải nghiệm tại công ty
          </button>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[color:var(--gold)] hover:underline"
          >
            Nhắn Zalo tư vấn
          </a>
        </div>
      </PageHero>

      {/* 2 — FORMATS */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Hình Thức Tập</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            Lựa chọn phù hợp với nhịp làm việc của doanh nghiệp
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">30 Phút Yoga Trên Ghế</h3>
                  <p className="text-xs text-muted-foreground">Vào giờ nghỉ trưa hoặc giữa ca làm việc</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Phù hợp cho nhân viên ngồi văn phòng nhiều. Các động tác giãn cơ cổ, vai, gáy, lưng và cổ tay nhẹ nhàng, không cần thay trang phục hay chuẩn bị thảm tập.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Sử dụng ghế văn phòng chắc chắn và khoảng trống sẵn có</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Bảo toàn thời gian nghỉ ngơi của nhân sự</span>
                </li>
              </ul>
            </div>

            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">45 Phút Tập Trên Thảm</h3>
                  <p className="text-xs text-muted-foreground">Nếu có không gian phòng họp hoặc hội trường</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Dành cho các đội ngũ có phòng sinh hoạt chung hoặc phòng tập riêng. Buổi tập tập trung vào chỉnh sửa tư thế toàn thân, kích hoạt cơ bắp và điều hòa hơi thở.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Bắt đầu với một buổi trải nghiệm hoặc chương trình 4 buổi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Điều chỉnh theo thể trạng và mức độ vận động của nhân sự</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — LOGISTICS */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Tổ Chức Chuyên Nghiệp</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Quy trình rõ ràng cho người phụ trách nhân sự
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Buổi tập tạo cơ hội để nhân viên cùng vận động, hít thở và tái tạo năng lượng. Chúng tôi thống nhất trước số lượng người tham gia, sơ đồ phòng, ngôn ngữ hướng dẫn (tiếng Việt, tiếng Anh hoặc tiếng Hindi) và thiết bị cùng người điều phối.
                </p>
                <p>
                  Yog Jivan tập trung vào trải nghiệm an toàn, tự nguyện và minh bạch chi phí. Chúng tôi không đưa ra các cam kết điều trị y khoa hay lời hứa tăng năng suất thiếu cơ sở.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Tiêu Chí Chuẩn Bị</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Không gian:</strong> Phòng thoáng đãng, sàn sạch hoặc có ghế tựa chắc chắn.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Khung giờ:</strong> Khoảng 30 hoặc 45 phút không ảnh hưởng đến ca làm việc quan trọng.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Tự nguyện:</strong> Nhân sự tham gia trên tinh thần tự nguyện; luôn có bài tập nhẹ nhàng thay thế.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Giáo viên chứng chỉ:</strong> Đội ngũ giáo viên có chứng chỉ chuyên môn và kinh nghiệm giảng dạy.</span>
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
            <CorporateEnquiryForm
              lang="VI"
              heading="Đăng ký trải nghiệm yoga doanh nghiệp tại Hải Dương"
              subheading="Điền thông tin công ty, địa điểm và số lượng nhân sự dự kiến. Chúng tôi sẽ phản hồi lịch hẹn khảo sát và đề xuất lớp."
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
              Giải đáp thắc mắc về lớp yoga tại nơi làm việc cho doanh nghiệp tại Hải Dương.
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
              <span>Tìm hiểu chương trình cá nhân? Xem thêm </span>
              <Link to="/vi/yoga-1-kem-1-online" className="text-[color:var(--gold)] hover:underline">
                Yoga 1 Kèm 1 Online
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
