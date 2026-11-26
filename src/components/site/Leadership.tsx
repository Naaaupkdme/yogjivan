import { SONU_BIO, SONU_PORTRAIT } from "@/lib/leadership";
import { masterImages } from "@/lib/images";
import { PUBLIC_TRUST } from "@/lib/facts/trust";
import { CONTACT } from "@/lib/facts/contact";
import { Button } from "@/components/ui/button";
import collaborationPortrait from "@/assets/leadership/sonu-ghanghas-collaboration.webp.asset.json";

export function Leadership({ locale = "en", detailed = false }: { locale?: "en" | "vi"; detailed?: boolean }) {
  const vi = locale === "vi";
  const about = vi ? "/vi/gioi-thieu" : "/about";
  return (
    <section className="section-tight" aria-label={vi ? "Ban lãnh đạo Yog Jivan" : "Yog Jivan leadership"}>
      <div className="container-luxe">
        <p className="eyebrow">{vi ? "Con người Yog Jivan" : "The people behind Yog Jivan"}</p>
        <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{vi ? "Giảng dạy và phát triển." : "Teaching and growth."}</h2>
        <div className="mt-8 grid items-stretch gap-8 md:grid-cols-2">
          <article id={detailed ? "master-anil" : undefined} className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={masterImages.meditationPortrait} alt={vi ? "Master Anil Choudhary, người sáng lập Yog Jivan, ngồi thiền" : "Master Anil Choudhary, founder of Yog Jivan, seated in meditation"} width={1080} height={1920} className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl">Master Anil</h3>
              <p className="mt-2 text-sm text-primary">{vi ? "Người sáng lập" : "Founder"}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{vi ? `Master Anil Choudhary là người sáng lập và giáo viên yoga chính của Yog Jivan. Thầy có ${PUBLIC_TRUST.yearsTeaching} năm giảng dạy Hatha, Ashtanga, pranayama và thiền theo truyền thống Ấn Độ, bằng tiếng Anh, tiếng Hindi và tiếng Việt.` : `Master Anil Choudhary is Yog Jivan’s Founder & Lead Yoga Teacher, with ${PUBLIC_TRUST.yearsTeaching} years teaching classical Indian Hatha, Ashtanga, pranayama and meditation in English, Hindi and Vietnamese.`}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{vi ? "Thầy định hướng tiêu chuẩn giảng dạy của đội ngũ: an toàn, tiến bộ từng bước và hướng dẫn phù hợp với từng học viên." : "He sets the team’s teaching standard: safety first, steady progression and guidance adapted to each student."}</p>
              {!detailed && <a href={`${about}#master-anil`} className="mt-5 inline-block text-primary underline underline-offset-4">{vi ? "Tìm hiểu về Master Anil" : "Meet Master Anil"}</a>}
            </div>
          </article>
          <article id={detailed ? "sonu-ghanghas" : undefined} className="scroll-mt-28 overflow-hidden rounded-lg border border-border bg-card">
            <img src={SONU_PORTRAIT.large} srcSet={`${SONU_PORTRAIT.small} 480w, ${SONU_PORTRAIT.large} 800w`} sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, calc(100vw - 48px)" width={SONU_PORTRAIT.width} height={SONU_PORTRAIT.height} alt={vi ? "Chân dung Sonu Ghanghas, đồng sáng lập và phụ trách phát triển Yog Jivan, mặc áo blazer xanh navy" : "Sonu Ghanghas, Yog Jivan co-founder and growth partner, wearing a navy blazer"} className="aspect-[4/5] w-full object-contain" loading="lazy" decoding="async" />
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl">Sonu Ghanghas</h3>
              <p className="mt-2 text-sm text-primary">{vi ? "Đồng sáng lập & phụ trách phát triển" : "Co-founder & Growth Partner"}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{detailed ? SONU_BIO[locale] : vi ? "Website, SEO, quy trình tiếp nhận yêu cầu và tự động hóa hỗ trợ trải nghiệm trực tuyến của Yog Jivan." : "Website, SEO, enquiry workflows and automation supporting Yog Jivan’s online experience."}</p>
              {detailed ? <>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{vi ? "Thực hành yoga là trải nghiệm cá nhân của Sonu, không phải chứng chỉ hay vai trò giảng dạy." : "Sonu’s yoga practice is personal experience, not a teaching qualification or teaching role."}</p>
                <h4 className="mt-6 font-display text-xl">{vi ? "Công việc tiêu biểu" : "Selected work"}</h4>
                <ul className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                  <li>{vi ? "Website và tìm kiếm Yog Jivan: phát triển website và thiết kế cách tìm thông tin về các dịch vụ." : "Yog Jivan website and search: website development and workflow design for discovering services."} <a href={vi ? "/vi" : "/"} className="text-primary underline underline-offset-4">{vi ? "Khám phá Yog Jivan" : "Explore Yog Jivan"}</a></li>
                  <li>{vi ? "Tự động hóa tiếp nhận yêu cầu: thiết kế quy trình sắp xếp yêu cầu và hỗ trợ đội ngũ quản lý việc liên hệ lại." : "Enquiry automation: workflow design to organise incoming requests and support the team’s follow-up process."}</li>
                </ul>
              </> : <a href={`${about}#sonu-ghanghas`} className="mt-5 inline-block text-primary underline underline-offset-4">{vi ? "Tìm hiểu về Sonu Ghanghas" : "Meet Sonu Ghanghas"}</a>}
            </div>
          </article>
        </div>
        {detailed && <div className="mt-10 grid items-center gap-8 border-t border-border pt-8 md:grid-cols-[minmax(0,1fr)_280px]">
          <div>
          <h2 className="font-display text-2xl">{vi ? "Hợp tác kinh doanh" : "Business collaboration"}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{vi ? "Trao đổi với đội ngũ Yog Jivan về hợp tác website, tìm kiếm hoặc thiết kế quy trình làm việc. Đội ngũ sẽ chuyển yêu cầu của bạn đến người phù hợp." : "Speak with the Yog Jivan team about website, search or workflow-design collaboration. The team will direct your enquiry to the right person."}</p>
          <Button asChild className="mt-6"><a href={`mailto:${CONTACT.email}`}>{vi ? "Liên hệ về hợp tác" : "Discuss a collaboration"}</a></Button>
          </div>
          <img src={collaborationPortrait.url} width={640} height={800} sizes="(min-width: 768px) 280px, calc(100vw - 48px)" alt={vi ? "Chân dung Sonu Ghanghas mặc áo sơ mi xanh ô liu bên cửa sổ" : "Sonu Ghanghas wearing an olive shirt beside a window"} className="aspect-[4/5] w-full rounded-lg object-contain" loading="lazy" decoding="async" />
        </div>}
      </div>
    </section>
  );
}