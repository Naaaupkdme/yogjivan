import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopFrame, ShopContact } from "@/components/commerce/ShopParts";
import { shopHead } from "@/lib/commerce/head";

export const Route = createFileRoute("/vi/doi-tac-san-pham")({
  head: () => shopHead("Trao đổi hợp tác sản phẩm | Yog Jivan", "Thông tin dành cho đối tác quan tâm đến mẫu Rudraksha, mala và nhang. Chưa mở bán; điều kiện cung ứng, hồ sơ và báo giá cần được xác nhận.", "/vi/doi-tac-san-pham"),
  component: ShopPartners,
});

function ShopPartners() {
  return <ShopFrame>
    <header className="max-w-3xl"><h1 className="text-4xl leading-tight md:text-6xl">Yog Jivan — Trao đổi hợp tác sản phẩm</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Dành cho studio, không gian thực hành và đơn vị quan tâm đến quà tặng. Chúng tôi đang tìm hiểu nhu cầu, chưa xác nhận phân phối hay nhận đơn hàng.</p></header>
    <section className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
      <div><h2 className="text-3xl">Những mẫu có thể trao đổi</h2><p className="mt-4 leading-relaxed text-muted-foreground">Vòng tay Rudraksha, chuỗi mala, vòng phối hạt và hai mẫu nhang riêng biệt. Mỗi mẫu có mức thông tin và hồ sơ khác nhau, không áp dụng chứng nhận của mẫu này cho mẫu khác.</p><Button asChild variant="link" className="mt-5 h-auto p-0 text-shop-accent"><Link to="/vi/cua-hang">Xem danh mục mẫu<ArrowUpRight aria-hidden="true" /></Link></Button></div>
      <div><h2 className="text-3xl">Thông tin để bắt đầu</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground"><li>Tên đơn vị, người liên hệ và khu vực hoạt động.</li><li>Mẫu quan tâm, mục đích sử dụng và số lượng mong muốn.</li><li>Yêu cầu về bao bì, nhãn tiếng Việt và hồ sơ sản phẩm.</li><li>Thời gian mong muốn — để trao đổi, không phải cam kết giao hàng.</li></ul></div>
    </section>
    <section className="mt-10 border-t border-border pt-8"><h2 className="text-3xl">Điều kiện cần xác nhận</h2><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Hồ sơ pháp lý, phạm vi kinh doanh và nhập khẩu, nhãn hàng hoá, nguồn cung, số lượng, giá và chính sách cần được rà soát trước mọi hoạt động bán hàng. Danh mục mẫu không xác nhận quyền phân phối hoặc quan hệ đối tác với thương hiệu hay phòng thí nghiệm.</p><p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Chưa có bảng giá sỉ, số lượng đặt tối thiểu, thời hạn giao hàng hay điều kiện thanh toán được xác nhận. Mọi trao đổi hiện tại chỉ là yêu cầu thông tin, không tạo đơn hàng, giữ hàng hoặc yêu cầu đặt cọc.</p></section>
    <ShopContact subject="nhu cầu hợp tác sản phẩm" />
    <section className="mt-12 border-t border-border pt-8"><h2 className="text-3xl">Nhạc cụ cho không gian thực hành</h2><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Chủ đề dành cho trao đổi trong tương lai. Chưa có danh mục mẫu, giá, thời điểm cung ứng hay chương trình đặt cọc; không nhận đặt hàng.</p></section>
  </ShopFrame>;
}