import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SchoolYogaEnquiryForm } from "@/components/site/SchoolYogaEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_SCHOOL } from "@/lib/locale-routes";
import { CONTACT } from "@/lib/facts/contact";
import { CheckCircle2, Clock, GraduationCap, Heart, Play, ShieldCheck, Sparkles, Users } from "lucide-react";

const TITLE = "Yoga học đường tại Việt Nam | Yog Jivan";
const DESCRIPTION =
  "Lớp yoga 35–40 phút qua trò chơi và kể chuyện cho trẻ em tại các trường khu vực Hải Dương, Việt Nam. Đăng ký buổi trải nghiệm miễn phí.";
const CANONICAL = "https://www.yogjivan.com/vi/yoga-hoc-duong";

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
          Yog Jivan hoạt động tại khu vực Hải Dương. Hãy gửi địa điểm để chúng tôi xác nhận khả năng tổ chức tại doanh nghiệp hoặc trường của bạn.
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

      {/* 2 — HOẠT ĐỘNG & LỢI ÍCH */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Vận động bổ ích</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Khám phá vận động, rèn luyện thói quen qua trò chơi
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
                  <h3 className="text-base font-semibold text-foreground">Thư giãn cuối buổi</h3>
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

      {/* 3 — GIỚI THIỆU CHƯƠNG TRÌNH & TIẾT HỌC MẪU */}
      <section id="programme-overview" className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Giới thiệu chương trình<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Yoga học đường diễn ra như thế nào?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Video 55 giây tóm tắt chương trình dành cho ban giám hiệu và giáo viên phụ trách thể chất.
            </p>
          </div>

          {/* Video Overview Card */}
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-black/40">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <picture>
                <source srcSet="/assets/preview/school-demo-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/school-demo-768.webp"
                  alt="Poster giới thiệu yoga học đường"
                  width={768}
                  height={432}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[0.7rem] font-medium text-[color:var(--gold)] border border-[color:var(--gold)]/30">
                    Thuyết minh tiếng Anh · Tóm tắt nội dung · 55s
                  </span>
                </div>
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--gold)] text-black px-3.5 py-1.5 text-xs font-semibold shadow-lg">
                    <Sparkles className="h-4 w-4 text-black" />
                    Tóm tắt nội dung chương trình
                  </div>
                  <p className="mt-2 text-xs text-white/90 max-w-md">
                    Tổng quan 55 giây: vận động qua trò chơi, câu chuyện hấp dẫn, giám sát an toàn và buổi trải nghiệm miễn phí. Video phát trực tiếp sẽ hoạt động sau khi cập nhật CDN.
                  </p>
                </div>
              </div>
            </div>

            {/* Localized HTML Summary */}
            <div className="border-t border-white/10 bg-card/40 p-5 text-xs text-muted-foreground space-y-2">
              <div className="font-semibold text-foreground text-sm">Tóm tắt nội dung video:</div>
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold">00–07s:</span>
                  <span><strong>Yoga học đường:</strong> Khám phá chuyển động qua hoạt động vui nhộn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold">07–16s:</span>
                  <span><strong>Vận động qua trò chơi:</strong> Rèn thăng bằng, mô phỏng động vật và nhịp thở.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold">16–28s:</span>
                  <span><strong>Buổi mẫu 38 phút:</strong> Khởi động, kể chuyện chuyển động và thư giãn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold">28–38s:</span>
                  <span><strong>Phù hợp lứa tuổi:</strong> Giáo viên điều chỉnh theo độ tuổi và không gian trường.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold">38–46s:</span>
                  <span><strong>Kinh nghiệm học đường:</strong> Đã triển khai tại hơn 20 trường học.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--gold)] font-bold">46–55s:</span>
                  <span><strong>Trải nghiệm miễn phí:</strong> Đăng ký buổi thử nghiệm 35–40 phút cho trường.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 38-Minute Sample Breakdown */}
          <div className="mt-12">
            <h3 className="font-display text-xl font-bold text-foreground text-center">
              Lịch trình một buổi mẫu 38 phút
            </h3>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Buổi học trải nghiệm đầu tiên kéo dài 35–40 phút, được cơ cấu để cân bằng năng lượng và sự tập trung của trẻ.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {CLASS_STRUCTURE.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-[color:var(--gold)]">{item.time}</span>
                    <span className="text-[0.68rem] text-muted-foreground uppercase tracking-wider">Bước {idx + 1}</span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-foreground">{item.step}</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — PHỐI HỢP CÙNG NHÀ TRƯỜNG & TIÊU CHUẨN */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Hợp tác học đường</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Quy trình phối hợp an toàn và chặt chẽ
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Mọi buổi tập đều được phối hợp trực tiếp cùng ban giám hiệu và giáo viên chủ nhiệm. Thầy cô luôn có mặt trong suốt buổi tập để giám sát an toàn và hỗ trợ các em học sinh.
                </p>
                <p>
                  Yog Jivan triển khai chương trình yoga học đường tại Việt Nam. Buổi thử nghiệm đầu tiên kéo dài 35–40 phút hoàn toàn miễn phí để nhà trường đánh giá trực tiếp hiệu quả trước khi triển khai các khóa ngoại khóa định kỳ.
                </p>
                <p className="text-xs font-medium text-foreground/90">
                  <strong>Cam kết bảo mật tuyệt đối:</strong> Chúng tôi chỉ tiếp nhận thông tin liên lạc của người điều phối nhà trường. Tuyệt đối không thu thập tên, hình ảnh hay hồ sơ sức khỏe của học sinh trên biểu mẫu.
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

      {/* 5 — BIỂU MẪU ĐĂNG KÝ */}
      <section className="section-pad bg-muted/10 border-t border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <SchoolYogaEnquiryForm
              lang="VI"
              heading="Đăng ký buổi trải nghiệm miễn phí cho trường"
              subheading="Dành cho ban giám hiệu và giáo viên phụ trách. Hãy gửi thông tin trường, độ tuổi, số lượng học sinh dự kiến và hai khung giờ phù hợp."
            />
          </div>
        </div>
      </section>

      {/* 6 — CÂU HỎI THƯỜNG GẶP */}
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
              <Link to="/online-family-yoga" className="text-[color:var(--gold)] hover:underline">
                Chương trình Yoga Gia Đình Trực Tuyến
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
