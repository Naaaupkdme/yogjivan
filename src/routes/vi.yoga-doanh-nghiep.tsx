import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CorporateEnquiryForm } from "@/components/site/CorporateEnquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_CORPORATE } from "@/lib/locale-routes";
import { Clock, CheckCircle2, Users, FileDown, Sparkles } from "lucide-react";

const TITLE = "Yoga doanh nghiệp tại Việt Nam | Yog Jivan";
const DESCRIPTION =
  "Yoga tại nơi làm việc cho doanh nghiệp tại Việt Nam. Khu vực Hải Dương, Hải Phòng. Đăng ký buổi trải nghiệm 30 phút miễn phí hoặc tải bản đề xuất song ngữ.";
const CANONICAL = "https://www.yogjivan.com/vi/yoga-doanh-nghiep";
const PROPOSAL_PDF_URL = "/assets/proposals/yog-jivan-corporate-yoga-proposal.pdf";

const FAQS = [
  {
    q: "Nhân viên có cần chuẩn bị thảm hay trang phục thể thao không?",
    a: "Không cần. Buổi trải nghiệm yoga trên ghế 30 phút sử dụng ghế văn phòng chắc chắn và không gian sàn trống. Nhân viên có thể tham gia thoải mái trong trang phục công sở hàng ngày.",
  },
  {
    q: "Buổi trải nghiệm 30 phút miễn phí diễn ra như thế nào?",
    a: "Chúng tôi dành tặng một buổi trải nghiệm 30 phút miễn phí để bộ phận nhân sự và nhân viên cảm nhận trực tiếp phương pháp tập luyện trước khi quyết định kế hoạch dài hạn.",
  },
  {
    q: "Yog Jivan có tổ chức ngoài khu vực Hải Dương không?",
    a: "Cơ sở giảng dạy của chúng tôi đặt tại Hải Dương (Hải Phòng). Chúng tôi nhận tổ chức tại các khu công nghiệp lân cận, Hà Nội và miền Bắc theo thỏa thuận. Hãy gửi địa điểm cụ thể để chúng tôi xác nhận khả năng đi lại.",
  },
  {
    q: "Doanh nghiệp cần chuẩn bị những gì?",
    a: "Nhà trường hoặc doanh nghiệp chỉ cần chuẩn bị phòng họp hoặc không gian trống có ghế chắc chắn (không bánh xe hoặc đã khóa chốt) và đủ khoảng cách để vươn tay.",
  },
  {
    q: "Sau buổi trải nghiệm, chương trình tiếp theo sẽ thế nào?",
    a: "Nếu đội ngũ muốn tiếp tục, chúng tôi cùng xem lại phản hồi và đề xuất chuỗi 4 buổi chuyên đề hoặc lịch tập định kỳ với báo giá minh bạch bằng VNĐ dựa trên địa điểm và quy mô.",
  },
];

const DEMO_TIMELINE = [
  { time: "4 phút", step: "Làm quen & Ổn định", desc: "Chào hỏi, kiểm tra bố trí phòng và hướng dẫn tư thế ngồi thoải mái." },
  { time: "6 phút", step: "Khởi động nhẹ", desc: "Làm nóng các khớp ngón tay, cổ tay, xoay cổ và mở khớp vai." },
  { time: "14 phút", step: "Vận động có hướng dẫn", desc: "Các động tác giãn cơ lưng, mở ngực và kéo giãn nhẹ nhàng trên ghế văn phòng." },
  { time: "4 phút", step: "Thở chậm & Thư giãn", desc: "Bài tập hít thở cơ hoành giúp làm dịu tâm trí và giải tỏa áp lực công việc." },
  { time: "2 phút", step: "Tổng kết & Phản hồi", desc: "Lắng nghe cảm nhận ngắn từ nhân viên về các động tác muốn duy trì tại bàn." },
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
            areaServed: "Hai Duong, Hai Phong, Vietnam",
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
        sub="Cho đội ngũ một khoảng nghỉ vận động có hướng dẫn, với động tác nhẹ trên ghế và bài thở có thể tập lại ngay tại bàn."
        image768="/assets/preview/corporate-hero-768.webp"
        image1400="/assets/preview/corporate-hero-1280.webp"
        imageWidth={1280}
        imageHeight={720}
        imageAlt="Nhân viên văn phòng tập yoga trên ghế cùng nhau"
        imageCaption="Hình ảnh minh họa tạo bởi AI · Không miêu tả học viên hoặc giáo viên Yog Jivan"
        contrastVeil
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Yog Jivan hoạt động tại khu vực Hải Dương, Hải Phòng. Hãy gửi địa điểm nơi làm việc để chúng tôi xác nhận khả năng tổ chức.
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
          <a
            href={PROPOSAL_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="yog-jivan-corporate-yoga-proposal.pdf"
            className="btn-ghost-gold inline-flex items-center gap-2"
          >
            <FileDown className="h-4 w-4 text-[color:var(--gold)]" />
            Tải đề xuất yoga doanh nghiệp (PDF)
          </a>
        </div>
      </PageHero>

      {/* 2 — NHÂN VIÊN NHẬN ĐƯỢC GÌ? */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Sức khỏe nhân viên</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Nhân viên nhận được gì?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Vận động nhẹ sau khi ngồi lâu. Tập thở chậm giữa giờ làm. Ghi nhớ vài động tác có thể tập lại ngay tại bàn.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Vận động nhẹ sau khi ngồi lâu</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Các động tác xoay khớp và giãn cơ nhẹ trên ghế giúp giải tỏa cảm giác cứng mỏi vùng cổ, vai và thắt lưng do ngồi máy tính nhiều giờ.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Tập thở chậm giữa giờ làm</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Khoảng dừng với bài thở có hướng dẫn giúp xoa dịu căng thẳng thần kinh, lấy lại sự tập trung và cân bằng năng lượng trong ngày làm việc.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-base font-semibold text-foreground">Ghi nhớ vài động tác có thể tập lại ngay tại bàn</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Các tư thế vi vận động đơn giản, an toàn để nhân viên có thể tự tập bất cứ lúc nào tại bàn làm việc mà không cần rời vị trí.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <picture>
                <source srcSet="/assets/preview/corporate-benefits-768.webp" type="image/webp" />
                <img
                  src="/assets/preview/corporate-benefits-768.webp"
                  alt="Nhân viên công sở tập giãn cơ nhẹ nhàng trên ghế"
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

      {/* 3 — CHỌN YOGA TRÊN GHẾ HOẶC TRÊN THẢM */}
      <section className="section-pad-sm border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Hình thức tập luyện<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Chọn yoga trên ghế hoặc trên thảm
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Buổi yoga trên ghế 30 phút phù hợp với giờ nghỉ hoặc lúc chuyển ca. Chuẩn bị ghế chắc chắn và chỗ vận động. Có thể chọn buổi yoga trên thảm 45 phút nếu phòng đủ rộng.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-[color:var(--gold)]/40 relative">
              <div className="absolute top-4 right-4 rounded-full bg-[color:var(--gold)]/15 border border-[color:var(--gold)]/30 px-3 py-1 text-[0.68rem] font-bold text-[color:var(--gold)] uppercase tracking-wider">
                Trải nghiệm miễn phí
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">30 phút yoga trên ghế</h3>
                  <p className="text-xs text-muted-foreground">Giờ nghỉ trưa hoặc giữa ca làm việc</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Thiết kế riêng cho nhân viên ngồi bàn giấy hoặc đứng máy. Động tác giãn cơ cổ vai, lưng và khớp cổ tay nhẹ nhàng. Không cần thay đồ thể thao hay chuẩn bị thảm tập.
              </p>
              <div className="mt-4 rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 p-3 text-xs text-foreground/90">
                <strong>Buổi thử nghiệm miễn phí:</strong> Chúng tôi tặng buổi demo 30 phút để ban lãnh đạo và nhân viên trực tiếp trải nghiệm sự phù hợp.
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Sử dụng ghế văn phòng thông thường và sàn trống</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Khớp với giờ nghỉ trưa hoặc khung giờ chuyển ca</span>
                </li>
              </ul>
            </div>

            <div className="glass-luxe rounded-2xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">45 phút yoga trên thảm</h3>
                  <p className="text-xs text-muted-foreground">Phòng sinh hoạt chung hoặc hội trường</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Dành cho doanh nghiệp có phòng tập riêng hoặc hội trường rộng rãi. Vận động toàn thân, điều hòa hơi thở sâu và thư giãn phục hồi chuyên sâu.
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-muted-foreground">
                <strong>Chương trình định kỳ:</strong> Trao đổi gói 4 buổi theo tháng hoặc các lớp học định kỳ hàng tuần với báo giá bằng VNĐ cụ thể.
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Cần thảm tập cá nhân và trang phục co giãn thoải mái</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />
                  <span>Chuỗi bài tập toàn diện và thư giãn sâu cuối buổi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — NỘI DUNG BUỔI TRẢI NGHIỆM TRÊN GHẾ */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Lịch trình mẫu<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Nội dung buổi trải nghiệm trên ghế
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Lịch trình 30 phút được thiết kế vừa vặn với nhịp độ làm việc tại văn phòng.
            </p>
          </div>

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

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Tổng thời lượng buổi học: <strong className="text-foreground">30 phút</strong> · Hướng dẫn bởi giáo viên yoga có chứng chỉ của Yog Jivan
          </div>
        </div>
      </section>

      {/* 5 — DOANH NGHIỆP VÀ YOG JIVAN CHUẨN BỊ GÌ? */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Phối hợp tổ chức</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                Doanh nghiệp và Yog Jivan chuẩn bị gì?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Người phụ trách gửi địa điểm, số người, thông tin phòng và hai khung giờ phù hợp. Yog Jivan xác nhận ngôn ngữ hướng dẫn và đưa ra các lựa chọn vận động. Nhân viên tham gia tự nguyện.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <span><strong>Địa điểm nơi làm việc:</strong> Hoạt động tại khu vực Hải Dương, Hải Phòng. Xác nhận việc đi lại sau khi trao đổi.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <span><strong>Bố trí phòng:</strong> Phòng họp thông thoáng với ghế chắc chắn và đủ khoảng trống.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                  <span><strong>Ngôn ngữ giảng dạy:</strong> Hướng dẫn bằng tiếng Việt hoặc tiếng Anh theo yêu cầu.</span>
                </div>
              </div>
              <p className="mt-6 text-xs font-semibold text-[color:var(--gold)]">
                Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">Checklist cho người tổ chức</h3>
              <ul className="mt-4 space-y-3 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Không gian tập:</strong> Phòng họp hoặc hội trường trống có ghế tựa chắc chắn.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Khung thời gian:</strong> 30 phút cố định vào giờ trưa hoặc giao ca.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Tham gia tự nguyện:</strong> Nhân sự đăng ký tự nguyện; bài tập nhẹ cho mọi thể trạng.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-semibold text-[color:var(--gold)]">•</span>
                  <span><strong>Ngôn ngữ hỗ trợ:</strong> Giảng dạy tiếng Việt hoặc tiếng Anh tùy theo đội ngũ.</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Cần chuẩn bị gì chi tiết:</span>
                <Link to="/blog/$slug" params={{ slug: "checklist-to-chuc-buoi-yoga-tai-van-phong" }} className="text-xs text-[color:var(--gold)] hover:underline">
                  Xem hướng dẫn chuẩn bị văn phòng &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — SAU BUỔI TRẢI NGHIỆM & ĐĂNG KÝ */}
      <section className="section-pad bg-muted/10 border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Bước tiếp theo<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl">
              Sau buổi trải nghiệm
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Review participation and room setup with us. A suggested four-session series covers chair basics, shoulders and back, hips and legs, then a short routine to repeat at work. We quote in VND based on location, headcount and equipment.
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--gold)]">
              Đã triển khai tại khoảng 15 nơi làm việc ở Việt Nam · Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
              <a
                href={PROPOSAL_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download="yog-jivan-corporate-yoga-proposal.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-4 py-2.5 text-xs font-semibold text-[color:var(--gold)] hover:bg-[color:var(--gold)]/20"
              >
                <FileDown className="h-4 w-4" />
                Tải đề xuất yoga doanh nghiệp (PDF)
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <CorporateEnquiryForm
              lang="VI"
              heading="Đăng ký buổi trải nghiệm 30 phút miễn phí"
              subheading="Gửi tên doanh nghiệp, địa điểm tổ chức (thành phố và nơi tập), số người dự kiến và hai khung giờ phù hợp để chúng tôi lên lịch."
            />
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="section-pad">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Giải đáp thắc mắc về các buổi yoga chăm sóc sức khỏe nhân viên tại văn phòng.
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
              <span>Bạn quan tâm đến các buổi tập riêng? Xem </span>
              <Link to="/vi/yoga-1-kem-1-online" className="text-[color:var(--gold)] hover:underline">
                Yoga 1 Kèm 1 Online
              </Link>
              <span> hoặc trao đổi với phòng tập qua </span>
              <Link to="/contact" className="text-[color:var(--gold)] hover:underline">
                Thông tin liên hệ & Phòng tập
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
