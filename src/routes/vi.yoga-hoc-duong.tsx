import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SchoolYogaEnquiryForm } from "@/components/site/SchoolYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_SCHOOL } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { CheckCircle2, Clock, FileDown, GraduationCap, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

const TITLE = "Yoga học đường tại Việt Nam | Yog Jivan";
const DESCRIPTION =
  "Lớp yoga 35–40 phút qua trò chơi và kể chuyện cho trẻ em tại các trường khu vực Hải Dương, Việt Nam. Đăng ký buổi trải nghiệm miễn phí.";
const CANONICAL = "https://www.yogjivan.com/vi/yoga-hoc-duong";
const PROPOSAL_PDF_URL = "/assets/proposals/yog-jivan-school-yoga-proposal.pdf";

const FAQS = [
  {
    q: "Nhà trường cần chuẩn bị những gì?",
    a: "Một không gian phòng học hoặc hội trường sạch sẽ, thoáng mát, sàn an toàn, cùng thầy cô giáo hoặc trợ giảng của trường có mặt hỗ trợ suốt buổi tập.",
  },
  {
    q: "Buổi yoga học đường kéo dài bao lâu?",
    a: "Buổi trải nghiệm miễn phí kéo dài từ 35 đến 40 phút, phù hợp với sự tập trung tự nhiên của học sinh.",
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

export const Route = createFileRoute("/vi/yoga-hoc-duong")({
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
      ...hreflangLinks(PAIR_SCHOOL),
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: "/assets/preview/school-hero-768.webp",
        imageSrcSet: "/assets/preview/school-hero-768.webp 768w, /assets/preview/school-hero-1280.webp 1280w",
        imageSizes: "(max-width: 768px) 100vw, 1280px",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Yoga Học Đường", "/vi/yoga-hoc-duong")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Yoga học đường tại Việt Nam",
            serviceType: "School Yoga Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/vi/yoga-hoc-duong",
          })
        ),
      },
    ],
  }),
  component: ViSchoolYogaPage,
});

function ViSchoolYogaPage() {
  return (
    <>
      {/* 1 — HERO */}
      <PageHero
        eyebrow="Yoga học đường · Hải Dương & Việt Nam"
        title="Yoga qua trò chơi cho trường học"
        sub="Các em khám phá vận động, thăng bằng và nhịp thở qua trò chơi và câu chuyện phù hợp với lứa tuổi."
        image768="/assets/preview/school-hero-768.webp"
        image1400="/assets/preview/school-hero-1280.webp"
        imageWidth={1280}
        imageHeight={720}
        imageAlt="Các em học sinh vui vẻ tập yoga qua trò chơi tại trường học"
        imageCaption="Hình ảnh minh họa tạo bởi AI · Không miêu tả học sinh hoặc giáo viên Yog Jivan"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Yog Jivan hoạt động tại khu vực Hải Dương. Hãy gửi địa điểm để chúng tôi xác nhận khả năng tổ chức tại trường của bạn.
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
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
            Đăng ký buổi trải nghiệm miễn phí cho trường
          </button>
          <a
            href={PROPOSAL_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="yog-jivan-school-yoga-proposal.pdf"
            className="btn-ghost-gold inline-flex items-center gap-2"
          >
            <FileDown className="h-4 w-4 text-[color:var(--gold)]" />
            Tải đề xuất yoga học đường (PDF)
          </a>
        </div>
      </PageHero>

      {/* 2 — HOẠT ĐỘNG & LỢI ÍCH */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Vận động bổ ích</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Các em sẽ tập gì?
              </h2>
              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Thăng bằng và phối hợp</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Các động tác mô phỏng loài vật và bài tập giữ thăng bằng giúp trẻ phát triển cơ bắp, sự dẻo dai và nhận thức cơ thể một cách tự nhiên.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Lắng nghe và chờ đến lượt</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Hoạt động theo nhóm và câu chuyện kể giúp trẻ hình thành thói quen chú ý lắng nghe, rèn luyện sự kiên nhẫn và tinh thần hợp tác cùng bạn.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Khoảnh khắc tĩnh lặng</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Bài tập hít thở nhẹ nhàng và những phút tĩnh lặng giúp các em giải tỏa căng thẳng và sẵn sàng tinh thần quay lại các tiết học trên lớp.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <picture>
                <source srcSet="/assets/preview/school-benefits-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/school-benefits-768.webp"
                  alt="Trẻ em rèn luyện khả năng thăng bằng và hợp tác"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </picture>
              <div className="p-3 bg-black/40 text-[0.7rem] text-muted-foreground text-center">
                Hình ảnh minh họa tạo bởi AI · Không miêu tả học sinh hoặc giáo viên Yog Jivan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — LỊCH TRÌNH TIẾT HỌC MẪU 38 PHÚT */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Lịch mẫu một tiết học<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Lịch mẫu một tiết 38 phút
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Buổi học trải nghiệm đầu tiên kéo dài 35–40 phút, được cơ cấu để cân bằng năng lượng và sự tập trung của trẻ.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CLASS_STRUCTURE.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-[color:var(--gold)]">{item.time}</span>
                  <span className="text-[0.68rem] text-muted-foreground uppercase tracking-wider">Bước {idx + 1}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{item.step}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Buổi trải nghiệm miễn phí đầu tiên được thiết kế từ <strong className="text-foreground">35–40 phút</strong> · Do giáo viên yoga có chứng chỉ và giàu kinh nghiệm hướng dẫn
          </div>
        </div>
      </section>

      {/* 4 — NHÀ TRƯỜNG CẦN CHUẨN BỊ GÌ? */}
      <section className="section-pad border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Hợp tác học đường</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Nhà trường cần chuẩn bị gì?
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Chuẩn bị một không gian sạch thoáng và người giám sát của trường. Người điều phối chia sẻ độ tuổi chung, sĩ số dự kiến, địa điểm và hai khung giờ phù hợp. Yog Jivan xác nhận giáo viên và điều chỉnh hoạt động cho lớp.
                </p>
                <p>
                  Yog Jivan tổ chức yoga cho các trường học tại Việt Nam. Buổi thử nghiệm đầu tiên kéo dài 35–40 phút hoàn toàn miễn phí để nhà trường và học sinh trải nghiệm phương pháp giảng dạy.
                </p>
                <p className="text-xs font-medium text-foreground/90">
                  <strong>Cam kết bảo mật tuyệt đối:</strong> Chỉ tiếp nhận thông tin liên lạc của người điều phối là người lớn. Không bao giờ yêu cầu tên, hình ảnh, hồ sơ sức khỏe hay ngày sinh của học sinh. Việc chụp ảnh (nếu có) phải có sự đồng ý của nhà trường.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Danh mục phối hợp</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Không gian lớp học:</strong> Phòng sinh hoạt chung, hội trường hoặc sàn sạch thoáng đãng.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Giám sát an toàn:</strong> Giáo viên hoặc trợ giảng của trường luôn có mặt hỗ trợ.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Người điều phối:</strong> Thống nhất sĩ số dự kiến và hai khung giờ phù hợp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Tham gia tự nguyện:</strong> Trẻ có thể nghỉ ngơi bất kỳ lúc nào nếu cảm thấy mệt.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Lứa tuổi phù hợp:</strong> Giáo trình được điều chỉnh riêng cho Mầm non, Tiểu học hoặc THCS.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — SAU BUỔI TRẢI NGHIỆM & BIỂU MẪU */}
      <section className="section-pad bg-muted/10 border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Bước tiếp theo<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Sau buổi trải nghiệm
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Chúng tôi cùng nhà trường đánh giá mức độ tương tác và hoạt động phù hợp. Nếu nhà trường muốn tiếp tục, chúng tôi sẽ thống nhất lịch trình, nhân sự giám sát, dụng cụ và gửi báo giá chi tiết theo VNĐ.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Đã đồng hành cùng hơn 20 trường học tại Việt Nam · Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm hướng dẫn.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
              <a
                href={PROPOSAL_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="yog-jivan-school-yoga-proposal.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-2.5 text-xs font-semibold text-[color:var(--gold)] hover:bg-[color:var(--gold)]/20"
              >
                <FileDown className="h-4 w-4" />
                Tải đề xuất yoga học đường (PDF)
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <SchoolYogaEnquiryForm
              lang="VI"
              heading="Đăng ký buổi trải nghiệm miễn phí cho trường"
              subheading="Dành cho ban giám hiệu và giáo viên phụ trách. Hãy gửi thông tin trường, độ tuổi, số lượng học sinh dự kiến và hai khung giờ phù hợp."
            />
          </div>
        </div>
      </section>

      {/* CÂU HỎI THƯỜNG GẶP */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Giải đáp thắc mắc về buổi trải nghiệm yoga miễn phí tại trường học.
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
              <span>Quý phụ huynh muốn tìm lớp tập tại nhà cùng con? Tham khảo </span>
              <Link to="/online-family-yoga" hash="parent-child" className="text-[color:var(--gold)] hover:underline">
                Chương trình Yoga Gia Đình Trực Tuyến (Cha mẹ & Con)
              </Link>
              <span> hoặc liên hệ phòng tập qua </span>
              <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="text-[color:var(--gold)] hover:underline">
                Zalo tư vấn
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
