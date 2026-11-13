import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CorporateEnquiryForm } from "@/components/site/CorporateEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_CORPORATE } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { Briefcase, Building2, Clock, CheckCircle2, ShieldCheck, Users, Play, Sparkles } from "lucide-react";

const TITLE = "Yoga doanh nghiệp tại Việt Nam | Yog Jivan";
const DESCRIPTION =
  "Yoga tại văn phòng cho doanh nghiệp tại Việt Nam. Khu vực Hải Dương. Liên hệ Yog Jivan để lên lịch buổi trải nghiệm hoặc lớp định kỳ.";
const CANONICAL = "https://www.yogjivan.com/vi/yoga-doanh-nghiep";

const FAQS = [
  {
    q: "Nhân viên có cần thảm tập không?",
    a: "Các buổi yoga trên ghế sử dụng ghế văn phòng chắc chắn và không gian thoáng. Yêu cầu về thảm được thống nhất trước nếu doanh nghiệp chọn hình thức tập trên thảm 45 phút.",
  },
  {
    q: "Doanh nghiệp có thể đặt một buổi trải nghiệm không?",
    a: "Có. Hãy cho chúng tôi biết địa điểm, số lượng người dự kiến và hai khung giờ phù hợp để sắp xếp buổi trải nghiệm 30 phút miễn phí cho đội ngũ.",
  },
  {
    q: "Chi phí được tính như thế nào?",
    a: "Chúng tôi báo giá bằng VNĐ minh bạch dựa trên địa điểm, thời lượng buổi tập, số lượng người tham gia và quy mô chương trình (buổi trải nghiệm hoặc chuỗi 4 buổi định kỳ).",
  },
  {
    q: "Cần chuẩn bị gì cho buổi yoga trên ghế?",
    a: "Chuẩn bị ghế chắc chắn, không gian trống, số người dự kiến và khung giờ phù hợp. Buổi trải nghiệm kéo dài 30 phút.",
  },
  {
    q: "Yog Jivan có thể tổ chức tại văn phòng ngoài Hải Dương không?",
    a: "Hãy gửi địa điểm cụ thể và số lượng người tham gia để đội ngũ của chúng tôi xác nhận khả năng tổ chức trực tiếp.",
  },
];

const DEMO_TIMELINE = [
  { time: "4 phút", step: "Làm quen & Ổn định", desc: "Chào hỏi, kiểm tra bố trí phòng và hướng dẫn tư thế ngồi thoải mái." },
  { time: "6 phút", step: "Khởi động nhẹ", desc: "Làm nóng các khớp ngón tay, cổ tay, xoay cổ và mở khớp vai." },
  { time: "14 phút", step: "Vận động có hướng dẫn", desc: "Các động tác giãn cơ lưng, mở ngực và kéo giãn nhẹ nhàng trên ghế văn phòng." },
  { time: "4 phút", step: "Thở chậm & Thư giãn", desc: "Bài tập hít thở cơ hoành giúp làm dịu tâm trí và giải tỏa áp lực công việc." },
  { time: "2 phút", step: "Phản hồi & Kết thúc", desc: "Lắng nghe cảm nhận ngắn từ nhân viên về các động tác muốn duy trì tại bàn." },
];

export const Route = createFileRoute("/vi/yoga-doanh-nghiep")({
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
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: "/assets/preview/corporate-hero-768.webp",
        imageSrcSet: "/assets/preview/corporate-hero-768.webp 768w, /assets/preview/corporate-hero-1280.webp 1280w",
        imageSizes: "(max-width: 768px) 100vw, 1280px",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Yoga Doanh Nghiệp", "/vi/yoga-doanh-nghiep")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Yoga doanh nghiệp tại Việt Nam",
            serviceType: "Corporate Wellness Program",
            description: DESCRIPTION,
            areaServed: "Hai Duong, Vietnam",
            url: "/vi/yoga-doanh-nghiep",
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
        eyebrow="Sức khỏe doanh nghiệp · Hải Dương & Việt Nam"
        title="Yoga tại nơi làm việc"
        sub="Cho đội ngũ một khoảng nghỉ vận động có hướng dẫn, với các động tác nhẹ trên ghế và bài thở có thể tập lại ngay tại bàn."
        image768="/assets/preview/corporate-hero-768.webp"
        image1400="/assets/preview/corporate-hero-1280.webp"
        imageWidth={1280}
        imageHeight={720}
        imageAlt="Nhân viên văn phòng tập yoga trên ghế cùng nhau"
        imageCaption="Hình ảnh minh họa tạo bởi AI · Không miêu tả học viên hoặc giáo viên Yog Jivan"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Yog Jivan hoạt động tại khu vực Hải Dương. Hãy gửi địa điểm để chúng tôi xác nhận khả năng tổ chức tại doanh nghiệp hoặc trường của bạn.
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
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
            Đăng ký buổi trải nghiệm 30 phút miễn phí
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("programme-overview");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost-gold"
          >
            Xem giới thiệu chương trình
          </button>
        </div>
      </PageHero>

      {/* 2 — LỢI ÍCH */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Lợi ích cho nhân viên</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Vận động nhẹ nhàng và hít thở thư giãn giữa giờ làm việc
              </h2>
              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Vận động nhẹ sau khi ngồi lâu</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Các động tác nhẹ nhàng cho vùng cổ, vai và lưng giúp giải tỏa mỏi mệt sau nhiều giờ làm việc liên tục bên bàn giấy.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Thở chậm và thư giãn giữa giờ làm</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Bài tập hít thở chậm có hướng dẫn giúp xoa dịu căng thẳng, tái tạo năng lượng và lấy lại sự tập trung cho công việc.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Tự tập lại vài động tác ngay tại bàn</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Những động tác đơn giản, dễ nhớ mà nhân viên có thể tự thực hành ngay tại bàn làm việc mỗi ngày mà không cần chuẩn bị phức tạp.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <picture>
                <source srcSet="/assets/preview/corporate-benefits-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/corporate-benefits-768.webp"
                  alt="Nhân viên văn phòng tập các bài giãn cơ trên ghế"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </picture>
              <div className="p-3 bg-black/40 text-[0.7rem] text-muted-foreground text-center">
                Hình ảnh minh họa tạo bởi AI · Không miêu tả học viên hoặc giáo viên Yog Jivan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — TỔNG QUAN CHƯƠNG TRÌNH & HÌNH THỨC */}
      <section id="programme-overview" className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Tổng quan chương trình<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Quy trình tổ chức yoga tại nơi làm việc
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tóm tắt chương trình dành cho bộ phận nhân sự và ban lãnh đạo.
            </p>
          </div>

          {/* Overview Card */}
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-black/40">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <picture>
                <source srcSet="/assets/preview/corporate-demo-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/corporate-demo-768.webp"
                  alt="Poster giới thiệu yoga doanh nghiệp"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[0.7rem] font-medium text-[color:var(--gold)] border border-[color:var(--gold)]/30">
                    Tổng quan chương trình
                  </span>
                </div>
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--gold)]/20 border border-[color:var(--gold)]/40 text-[color:var(--gold)] px-4 py-2 text-xs font-semibold">
                    <Sparkles className="h-4 w-4" />
                    Tổng quan chương trình
                  </div>
                  <p className="mt-2 text-xs text-white/80 max-w-md">
                    Tóm tắt chương trình dành cho bộ phận nhân sự và ban lãnh đạo: vận động nhẹ, định dạng trên ghế, khớp với lịch làm việc và buổi thử nghiệm miễn phí.
                  </p>
                </div>
              </div>
            </div>

            {/* Localized HTML Summary */}
            <div className="border-t border-white/10 bg-card/40 p-5 text-xs text-muted-foreground space-y-2">
              <div className="font-semibold text-foreground text-sm">Tổng quan chương trình:</div>
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Yoga tại văn phòng:</strong> Giảm mỏi cổ và vai cho nhân viên ngồi lâu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Động tác nhẹ & thở chậm:</strong> Dễ dàng tập lại ngay tại bàn làm việc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>30 phút trên ghế:</strong> Khởi động, tập các tư thế an toàn và thư giãn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Khớp lịch làm việc:</strong> Nhân sự chọn giờ và phòng; tham gia tự nguyện.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Giáo viên có chứng chỉ:</strong> Đã triển khai tại khoảng 15 nơi làm việc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold select-none">•</span>
                  <span><strong>Trải nghiệm miễn phí:</strong> Đăng ký buổi 30 phút thử nghiệm tại công ty.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formats */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-[color:var(--gold)]/40 relative">
              <div className="absolute top-4 right-4 rounded-full bg-[color:var(--gold)]/15 border border-[color:var(--gold)]/30 px-3 py-1 text-[0.68rem] font-bold text-[color:var(--gold)] uppercase tracking-wider">
                Ưu đãi trải nghiệm miễn phí
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">30 Phút Yoga Trên Ghế</h3>
                  <p className="text-xs text-muted-foreground">Giờ nghỉ trưa hoặc giữa ca</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Thiết kế riêng cho nhân viên làm việc bên máy tính. Các động tác nhẹ nhàng cho cổ, vai, cột sống và cổ tay. Không cần thay trang phục thể thao hay chuẩn bị thảm tập.
              </p>
              <div className="mt-4 rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 p-3 text-xs text-foreground/90">
                <strong>Buổi trải nghiệm miễn phí:</strong> Chúng tôi tặng buổi học thử 30 phút đầu tiên để ban nhân sự và nhân viên trải nghiệm thực tế hiệu quả.
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Sử dụng ghế văn phòng chắc chắn và không gian mở</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Không ảnh hưởng đến thời gian làm việc hay xoay ca</span>
                </li>
              </ul>
            </div>

            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">45 Phút Tập Trên Thảm</h3>
                  <p className="text-xs text-muted-foreground">Phòng đa năng hoặc hội trường</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Dành cho doanh nghiệp có phòng họp rộng hoặc phòng tập riêng. Chuỗi tư thế vận động toàn thân, mở khớp hông, kéo giãn lưng và thư giãn phục hồi chuyên sâu.
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-muted-foreground">
                <strong>Chương trình định kỳ:</strong> Trao đổi về gói 4 buổi/tháng hoặc lớp tập cố định hàng tuần với báo giá VNĐ chi tiết.
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Yêu cầu thảm tập cá nhân và trang phục thoải mái</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Giáo trình tiến triển bài bản và thư giãn sâu cuối buổi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — LỊCH TRÌNH BUỔI HỌC MẪU */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Lịch trình mẫu</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
            Diễn biến buổi trải nghiệm 30 phút trên ghế
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DEMO_TIMELINE.map((item, idx) => (
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
        </div>
      </section>

      {/* 5 — CÔNG TÁC PHỐI HỢP & KINH NGHIỆM */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Hỗ trợ tổ chức</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Quy trình phối hợp đơn giản cho ban nhân sự
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Doanh nghiệp chỉ cần chuẩn bị phòng tập, ước lượng số lượng tham gia và chọn khung giờ thích hợp. Nhân viên tham gia hoàn toàn tự nguyện và mọi động tác đều có lựa chọn điều chỉnh.
                </p>
                <p>
                  Yog Jivan điều phối các buổi yoga văn phòng cho các tổ chức tại khu vực Hải Dương và trên toàn Việt Nam. Sau buổi thử nghiệm, chúng tôi sẽ gửi báo giá VNĐ minh bạch nếu doanh nghiệp muốn tiếp tục chuỗi 4 buổi.
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold text-[color:var(--gold)]">
                Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Danh mục chuẩn bị</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Không gian phòng:</strong> Phòng họp mở hoặc hội trường có ghế tựa chắc chắn.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Khung giờ:</strong> 30 phút được bảo vệ vào giờ trưa hoặc giao ca.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Tham gia tự nguyện:</strong> Động tác nhẹ nhàng, phù hợp mọi thể trạng.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Ngôn ngữ hướng dẫn:</strong> Tiếng Việt hoặc tiếng Anh theo mong muốn của doanh nghiệp.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — BIỂU MẪU ĐĂNG KÝ */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <CorporateEnquiryForm
              lang="VI"
              heading="Đăng ký buổi trải nghiệm 30 phút miễn phí"
              subheading="Hãy chia sẻ tên công ty, địa điểm, số lượng người dự kiến và hai khung giờ phù hợp. Chúng tôi sẽ liên hệ để xác nhận không gian và lên lịch."
            />
          </div>
        </div>
      </section>

      {/* 7 — CÂU HỎI THƯỜNG GẶP */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Giải đáp thắc mắc về chương trình yoga cho doanh nghiệp tại văn phòng.
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
              <span>Bạn quan tâm đến các lớp học cá nhân? Xem thêm </span>
              <Link to="/vi/yoga-1-kem-1-online" className="text-[color:var(--gold)] hover:underline">
                Yoga 1 kèm 1 trực tuyến
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
