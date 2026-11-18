import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ViSection, ViEnquiryCTA, ViPageNav } from "@/components/site/vi/ViParts";
import { hreflangLinks, PAIR_PRIVATE, SITE_ORIGIN } from "@/lib/locale-routes";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { SAFETY_NOTE_VI } from "@/lib/facts/vi-copy";
import { CONTACT } from "@/lib/facts/contact";

const CANONICAL = `${SITE_ORIGIN}/vi/yoga-1-kem-1-online`;
const TITLE = "Yoga 1 Kèm 1 Online | Yog Jivan";
const DESC =
  "Tập yoga trực tuyến 1 kèm 1 với giáo viên Yog Jivan có chứng chỉ. Buổi lẻ 60 phút giá 25 USD. Xem các gói và gửi yêu cầu đặt lịch.";

export const Route = createFileRoute("/vi/yoga-1-kem-1-online")({
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
    links: [
      { rel: "canonical", href: CANONICAL },
      ...hreflangLinks(PAIR_PRIVATE),
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/private-indian-instructor-mobile.webp",
        type: "image/webp",
        media: "(max-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/preview/private-indian-instructor-desktop.webp",
        type: "image/webp",
        media: "(min-width: 769px)",
      },
    ],
  }),
  component: ViPrivate,
});

const STEPS = [
  {
    t: "Trao đổi trước khi tập",
    d: "Bạn chia sẻ kinh nghiệm tập luyện, mục tiêu, lịch sinh hoạt và những giới hạn vận động cần lưu ý. Không cần cung cấp hồ sơ bệnh án; chỉ cần nêu những điều ảnh hưởng đến vận động hoặc chỉ dẫn từ bác sĩ của bạn.",
  },
  {
    t: "Ghép giáo viên phù hợp",
    d: "Yog Jivan chọn một giáo viên phù hợp với trình độ, mục tiêu và ngôn ngữ của bạn. Các buổi tập sau đó thường được giữ cùng giáo viên đã ghép.",
  },
  {
    t: "Buổi tập riêng trực tiếp",
    d: `Mỗi buổi kéo dài khoảng ${ONLINE_CLASS.durationMinutes} phút qua video, chỉ có bạn và giáo viên, với hướng dẫn bằng lời theo thời gian thực.`,
  },
  {
    t: "Lộ trình luyện tập cá nhân",
    d: "Trình tự bài tập, nhịp thở và mức độ được điều chỉnh theo cơ thể bạn, cùng gợi ý duy trì thói quen tập giữa các buổi.",
  },
  {
    t: "Theo dõi và điều chỉnh",
    d: "Giáo viên xem lại tiến bộ của bạn theo thời gian và điều chỉnh bài tập khi bạn tiến bộ hoặc khi lịch sinh hoạt thay đổi.",
  },
];

function ViPrivate() {
  return (
    <>
      <PageHero
        eyebrow="Yoga 1 Kèm 1 Online · Lớp Học Riêng"
        title="Yoga 1 kèm 1 online"
        sub="Yog Jivan tổ chức các buổi yoga trực tuyến 1 kèm 1 kéo dài 60 phút. Một buổi lẻ có giá 25 USD. Bạn có thể chọn buổi lẻ, gói tập hoặc lịch tập theo nhu cầu. Tập trực tiếp với một giáo viên theo dõi động tác và hướng dẫn trong suốt buổi."
        image768="/assets/preview/private-indian-instructor-mobile.webp"
        image1400="/assets/preview/private-indian-instructor-desktop.webp"
        imageWidth={1440}
        imageHeight={960}
        imageAspectRatio="3/2"
        imageAlt="Giáo viên yoga minh họa động tác giãn người đứng bên cạnh máy tính xách tay"
      >
        <div className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-2 text-xs font-medium text-[color:var(--gold)] max-w-fit">
          Buổi yoga riêng 60 phút · 25 USD mỗi buổi · Các gói từ 249 USD
        </div>
        <p className="mt-3 text-xs font-semibold text-foreground/90">
          Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a href="#tu-van" className="btn-gold">
            Gửi yêu cầu tập riêng
          </a>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-gold"
          >
            Nhắn Zalo tư vấn
          </a>
        </div>
      </PageHero>

      <ViSection id="meet-your-teacher" heading="Đội ngũ giáo viên Yog Jivan">
        <div className="glass-soft rounded-2xl p-6 md:p-8 border border-white/10 max-w-3xl">
          <h3 className="font-display text-xl text-foreground">Master Anil Choudhary</h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-[color:var(--gold)] font-semibold">
            Sáng lập &amp; Giáo viên Trưởng
          </p>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
            Hơn 12 năm kinh nghiệm giảng dạy yoga truyền thống Ấn Độ, hướng dẫn học viên từ cơ bản đến nâng cao.
          </p>
          <ul className="mt-3 text-sm text-foreground/75 space-y-1">
            <li>— Hatha Yoga truyền thống, Ashtanga và Pranayama</li>
            <li>— Phương pháp điều chỉnh an toàn, chú trọng trị liệu</li>
          </ul>
          <p className="mt-3 text-xs text-foreground/65">
            Ngôn ngữ giảng dạy: Tiếng Anh, Tiếng Việt, Tiếng Hindi
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="#tu-van" className="btn-ghost-gold text-xs py-2 px-3 inline-flex items-center">
              Hỏi về lịch dạy của giáo viên
            </a>
          </div>
        </div>
      </ViSection>

      <ViSection heading="Hướng dẫn điều chỉnh tư thế trực tiếp">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm text-foreground/85 leading-relaxed">
              Khác với video ghi hình sẵn, giáo viên trực tiếp quan sát tư thế của bạn qua video và đưa ra điều chỉnh bằng lời theo thời gian thực để bạn tập an toàn và chuẩn xác.
            </p>
            <div className="mt-4 space-y-3">
              <div className="glass-soft rounded-xl p-4 border border-white/10">
                <span className="text-xs uppercase tracking-wider text-[color:var(--gold)] font-semibold">1. Kiểm tra góc máy</span>
                <p className="mt-1 text-xs text-muted-foreground">Giáo viên hướng dẫn góc camera sao cho thấy rõ toàn bộ cơ thể trong cả tư thế đứng và nằm.</p>
              </div>
              <div className="glass-soft rounded-xl p-4 border border-white/10">
                <span className="text-xs uppercase tracking-wider text-[color:var(--gold)] font-semibold">2. Nhắc nhở điều chỉnh</span>
                <p className="mt-1 text-xs text-muted-foreground">Nếu động tác quá sức hoặc sai trục khớp, giáo viên gợi ý biến thể đơn giản, phù hợp với cơ thể bạn.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-card/60 shadow-lg p-2">
            <picture>
              <source
                media="(min-width: 769px)"
                srcSet="/assets/preview/private-live-guided-practice-desktop.webp"
                type="image/webp"
              />
              <source
                srcSet="/assets/preview/private-live-guided-practice-mobile.webp"
                type="image/webp"
              />
              <img
                src="/assets/preview/private-live-guided-practice-desktop.webp"
                alt="Học viên nhận hướng dẫn điều chỉnh tư thế trực tiếp trong buổi tập yoga trực tuyến 1 kèm 1"
                width={1440}
                height={960}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[3/2] rounded-xl"
              />
            </picture>
          </div>
        </div>
      </ViSection>

      <ViSection heading="Phù hợp với ai">
        <p>
          Hình thức này phù hợp nếu bạn mới bắt đầu và muốn được hướng dẫn kỹ từng tư thế, nếu bạn có lịch làm việc
          không cố định, nếu bạn muốn tập trung vào một mục tiêu cụ thể như độ linh hoạt, sức mạnh hay tư thế cột sống,
          hoặc nếu bạn có giới hạn vận động cần được điều chỉnh bài tập.
        </p>
        <p>{SAFETY_NOTE_VI}</p>
      </ViSection>

      <ViSection heading="Học phí và các gói buổi tập">
        <div className="rounded-2xl border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_8%,var(--onyx))] p-5 md:p-6 mb-6">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-[color:var(--gold)]">
            Buổi tập riêng lẻ
          </div>
          <h3 className="mt-2 font-display text-xl text-foreground">
            Buổi yoga riêng 60 phút · 25 USD mỗi buổi
          </h3>
          <p className="mt-1 text-sm text-foreground/80">
            Mức giá mỗi buổi áp dụng cho cả buổi đầu và các buổi đặt lẻ tiếp theo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-soft rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[color:var(--gold)] font-semibold">Gói 12 buổi</div>
              <h4 className="mt-2 font-display text-lg text-foreground">Nền tảng luyện tập</h4>
              <p className="mt-1 text-xs text-muted-foreground">Phù hợp để làm quen tư thế và xây dựng thói quen.</p>
              <div className="mt-4 text-xl font-display text-foreground">249 USD <span className="text-xs text-muted-foreground font-normal">(20,75 USD/buổi)</span></div>
              <p className="mt-1 text-xs text-[color:var(--gold)]">Tiết kiệm 51 USD so với đặt lẻ từng buổi</p>
            </div>
            <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-foreground hover:bg-white/20">
              Tư vấn gói 12 buổi
            </a>
          </div>

          <div className="glass-luxe rounded-2xl border-2 border-[color:var(--gold)]/60 bg-[color-mix(in_oklab,var(--gold)_8%,var(--onyx))] p-5 flex flex-col justify-between shadow-[var(--shadow-gold)]">
            <div>
              <div className="text-xs uppercase tracking-wider text-[color:var(--gold)] font-semibold">Gói 20 buổi · Phổ biến</div>
              <h4 className="mt-2 font-display text-lg text-foreground">Tiến bộ chuyên sâu</h4>
              <p className="mt-1 text-xs text-muted-foreground">Rèn độ dẻo dai, thể lực và nhịp thở vững vàng.</p>
              <div className="mt-4 text-xl font-display text-foreground">399 USD <span className="text-xs text-muted-foreground font-normal">(19,95 USD/buổi)</span></div>
              <p className="mt-1 text-xs text-[color:var(--gold)]">Tiết kiệm 101 USD so với đặt lẻ từng buổi</p>
            </div>
            <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-3 py-2 text-xs font-semibold text-black">
              Tư vấn gói 20 buổi
            </a>
          </div>

          <div className="glass-soft rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[color:var(--gold)] font-semibold">Gói 24 buổi</div>
              <h4 className="mt-2 font-display text-lg text-foreground">Đồng hành toàn diện</h4>
              <p className="mt-1 text-xs text-muted-foreground">Lộ trình cá nhân hóa dài hạn theo mục tiêu riêng.</p>
              <div className="mt-4 text-xl font-display text-foreground">459 USD <span className="text-xs text-muted-foreground font-normal">(19,13 USD/buổi)</span></div>
              <p className="mt-1 text-xs text-[color:var(--gold)]">Tiết kiệm 141 USD so với đặt lẻ từng buổi</p>
            </div>
            <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-foreground hover:bg-white/20">
              Tư vấn gói 24 buổi
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center text-xs text-muted-foreground">
          Tập cùng bạn bè hoặc người thân? Xem <a href="/online-couples-yoga" className="text-[color:var(--gold)] underline underline-offset-4">Yoga 2 người (36 USD/buổi cho 2 người)</a> hoặc <a href="/online-family-yoga" className="text-[color:var(--gold)] underline underline-offset-4">Yoga gia đình 3–4 thành viên (từ 44 USD/buổi)</a>.
        </div>
      </ViSection>

      <ViSection heading="Cách chương trình vận hành">
        <ol className="grid gap-3">
          {STEPS.map((s, i) => (
            <li key={s.t} className="glass-soft rounded-2xl border border-white/10 p-5">
              <div className="text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--gold)]">
                Bước {i + 1}
              </div>
              <h3 className="mt-2 font-display text-lg leading-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.d}</p>
            </li>
          ))}
        </ol>
      </ViSection>

      <ViSection heading="Về giáo viên">
        <p className="font-semibold text-[color:var(--gold)]">
          Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn.
        </p>
        <p>
          Yog Jivan được sáng lập và dẫn dắt bởi Master Anil Choudhary, Founder & Lead Yoga Teacher, với hơn 12 năm
          giảng dạy yoga Ấn Độ cổ điển. Các buổi 1 kèm 1 do đội ngũ giáo viên Yog Jivan đảm nhiệm với giáo viên được
          ghép phù hợp với bạn; Master Anil có thể trực tiếp dạy một số buổi nhưng chúng tôi không mặc định mọi buổi
          đều do thầy hướng dẫn.
        </p>
        <p>
          Nếu bạn muốn tập theo nhóm nhỏ với chi phí cố định, hãy xem{" "}
          <a href="/vi/lop-yoga-online" className="text-[color:var(--gold)] underline underline-offset-4">
            lớp yoga online trực tiếp
          </a>
          .
        </p>
      </ViSection>

      <div id="tu-van" className="scroll-mt-28" tabIndex={-1}>
        <div id="tu-van-form" className="scroll-mt-28" />
        <ViEnquiryCTA
          heading="Nhận tư vấn buổi tập riêng"
          body="Buổi lẻ trực tuyến 60 phút giá 25 USD. Nhắn Zalo cho đội ngũ Yog Jivan để hỏi về lịch tập, gói tập hoặc phương án theo nhu cầu. Chúng tôi sẽ ghép giáo viên phù hợp và hỗ trợ bạn trực tiếp."
        />
      </div>

      <ViPageNav current="/vi/yoga-1-kem-1-online" />
    </>
  );
}
