import { createFileRoute } from "@tanstack/react-router";
import { ViHero, ViSection, ViEnquiryCTA, ViPageNav } from "@/components/site/vi/ViParts";
import { hreflangLinks, PAIR_PRIVATE, SITE_ORIGIN } from "@/lib/locale-routes";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { SAFETY_NOTE_VI } from "@/lib/facts/vi-copy";
import { CONTACT } from "@/lib/facts/contact";

const CANONICAL = `${SITE_ORIGIN}/vi/yoga-1-kem-1-online`;
const TITLE = "Yoga 1 Kèm 1 Online | Giáo Viên Riêng | Yog Jivan";
const DESC =
  "Yoga 1 kèm 1 online cùng giáo viên Yog Jivan được ghép phù hợp với trình độ và mục tiêu của bạn: buổi tập trực tiếp, lộ trình riêng, lịch học được sắp xếp qua trao đổi.";

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
    links: [{ rel: "canonical", href: CANONICAL }, ...hreflangLinks(PAIR_PRIVATE)],
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
      <ViHero
        eyebrow="Chương trình cao cấp"
        title="Yoga 1 Kèm 1 Online"
        lead={`Buổi tập yoga trực tiếp ${ONLINE_CLASS.durationMinutes} phút dành riêng cho bạn, cùng một giáo viên Yog Jivan được ghép phù hợp với trình độ, mục tiêu và ngôn ngữ của bạn. Mỗi buổi học đều do giáo viên yoga có chứng chỉ và giàu kinh nghiệm thuộc đội ngũ Yog Jivan hướng dẫn. Buổi yoga riêng 60 phút · 25 USD mỗi buổi.`}
        primary={{ href: "#tu-van", label: "Đăng ký tư vấn" }}
        secondary={{ href: CONTACT.zalo, label: "Nhắn Zalo" }}
      />

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
          Tập cùng bạn bè hoặc người thân? Xem <a href="/online-couples-yoga" className="text-[color:var(--gold)] underline underline-offset-4">Yoga 2 người (45 USD/buổi cho 2 người)</a> hoặc <a href="/online-family-yoga" className="text-[color:var(--gold)] underline underline-offset-4">Yoga gia đình 3–4 thành viên</a>.
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

      <div id="tu-van">
        <ViEnquiryCTA
          heading="Nhận tư vấn buổi tập riêng"
          body="Nhắn Zalo cho đội ngũ Yog Jivan. Chúng tôi sẽ hỏi về kinh nghiệm tập, mục tiêu và lịch của bạn, sau đó tư vấn giáo viên phù hợp cùng học phí cho chương trình 1 kèm 1."
        />
      </div>

      <ViPageNav current="/vi/yoga-1-kem-1-online" />
    </>
  );
}
