import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ImageOff, MessageCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/facts/contact";
import { waHref } from "@/lib/wa";
import type { ReactNode } from "react";

export function ShopFrame({ children }: { children: ReactNode }) {
  return <div lang="vi" className="shop-review container-luxe pb-24 pt-32 md:pt-40">
    <nav aria-label="Điều hướng danh mục mẫu" className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-5 text-sm">
      <Button asChild variant="link" className="h-auto p-0 text-foreground"><Link to="/vi"><ArrowLeft aria-hidden="true" />Về Yog Jivan</Link></Button>
      <Button asChild variant="link" className="h-auto p-0 text-foreground"><Link to="/vi/cua-hang">Danh mục mẫu</Link></Button>
      <Button asChild variant="link" className="h-auto p-0 text-foreground"><Link to="/vi/doi-tac-san-pham">Trao đổi hợp tác</Link></Button>
    </nav>
    <p className="mb-4 text-sm font-medium text-shop-accent">Bản xem trước · Chưa mở bán</p>
    {children}
  </div>;
}

export function SampleImage({ name, large = false }: { name: string; large?: boolean }) {
  return <div role="img" aria-label={`Chưa có ảnh thật của ${name}; ô giữ chỗ, không mô phỏng sản phẩm`} className={`flex w-full flex-col items-center justify-center gap-3 bg-secondary px-5 text-center text-muted-foreground ${large ? "aspect-square" : "aspect-[4/3]"}`}>
    <ImageOff aria-hidden="true" className="size-8 text-shop-accent" strokeWidth={1} />
    <span className="text-sm">Ảnh sản phẩm thực tế<br /><span className="text-xs">Chờ bổ sung</span></span>
  </div>;
}

export function ShopContact({ subject }: { subject: string }) {
  return <section className="mt-8 border-t border-border pt-6" aria-label="Hỏi thông tin sản phẩm">
    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">Hỏi đội ngũ Yog Jivan về {subject}. Đây là trao đổi thông tin, không phải đặt hàng hay giữ mẫu.</p>
    <div className="flex flex-wrap gap-3">
      <Button asChild className="h-auto min-h-11 whitespace-normal bg-shop-accent px-5 py-3 text-shop-accent-foreground hover:bg-shop-accent/90"><a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" aria-label={`Hỏi đội ngũ Yog Jivan về ${subject} qua Zalo (mở cửa sổ mới)`}><MessageCircle aria-hidden="true" />Hỏi thông tin qua Zalo<ArrowUpRight aria-hidden="true" /></a></Button>
      <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal px-5 py-3"><a href={waHref()} aria-label={`Hỏi đội ngũ Yog Jivan về ${subject} qua WhatsApp`}>WhatsApp<ArrowUpRight aria-hidden="true" /></a></Button>
    </div>
    <p className="mt-3 text-sm text-muted-foreground">Đội ngũ Yog Jivan · {CONTACT.phoneDisplay}</p>
  </section>;
}

export function VideoPlaceholder({ label }: { label: string }) {
  return <div className="flex items-center gap-4 border-t border-border py-5">
    <div role="img" aria-label={`Chưa có video: ${label}`} className="flex size-12 shrink-0 items-center justify-center bg-secondary text-shop-accent"><Play aria-hidden="true" className="size-5" /></div>
    <div><h3 className="font-sans text-base font-medium">{label}</h3><p className="mt-1 text-sm text-muted-foreground">Video thực tế · Chờ bổ sung</p></div>
  </div>;
}

export function SampleTruthNote() {
  return <section className="mt-14 border-t border-border pt-8">
    <h2 className="text-3xl">Thông tin rõ ràng, trước khi lựa chọn</h2>
    <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Các mẫu được mua tại Ấn Độ; nơi mua không xác nhận nơi trồng hạt hay nơi sản xuất. Kích thước, vật liệu, số lượng hiện có và hồ sơ sản phẩm còn cần xác minh. Thẻ nhà cung cấp không đồng nghĩa với kiểm định độc lập của Yog Jivan.</p>
    <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Rudraksha, Om và chakra có ý nghĩa biểu tượng trong một số truyền thống thực hành. Ý nghĩa này thuộc về truyền thống, không phải bằng chứng khoa học về tác dụng chữa bệnh hay kết quả sức khoẻ.</p>
  </section>;
}