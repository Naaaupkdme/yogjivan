import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShopFrame, SampleImage, SampleTruthNote } from "@/components/commerce/ShopParts";
import { filterShopSamples, type SampleCategory } from "@/lib/commerce/catalogue";
import { shopHead } from "@/lib/commerce/head";

export const Route = createFileRoute("/vi/cua-hang/")({
  head: () => shopHead("Danh mục mẫu Rudraksha & nhang | Yog Jivan", "Tìm hiểu sáu mẫu vòng tay, chuỗi mala và nhang tại Yog Jivan. Thông tin đang được xác minh; chưa mở bán, chưa công bố giá.", "/vi/cua-hang"),
  component: ShopCatalogue,
});

const categories: readonly { value: "all" | SampleCategory; label: string }[] = [
  { value: "all", label: "Tất cả mẫu" }, { value: "beads", label: "Vòng tay & mala" }, { value: "incense", label: "Nhang" },
];

function ShopCatalogue() {
  return <ShopFrame>
    <header className="mb-10 max-w-3xl">
      <h1 className="text-4xl leading-tight md:text-6xl">Yog Jivan — Danh mục mẫu</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">Vòng tay, chuỗi mala và nhang: một tuyển chọn nhỏ để tìm hiểu. Ảnh thật và hồ sơ đang được bổ sung; giá và số lượng chưa được xác nhận.</p>
    </header>
    <Tabs defaultValue="all">
      <TabsList aria-label="Lọc loại mẫu" className="mb-7 h-auto max-w-full flex-wrap justify-start gap-1 rounded-none bg-transparent p-0">
        {categories.map((category) => <TabsTrigger key={category.value} value={category.value} className="min-h-11 rounded-none border-b-2 border-transparent px-3 py-3 text-sm data-[state=active]:border-shop-accent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none">{category.label}</TabsTrigger>)}
      </TabsList>
      {categories.map((category) => <TabsContent key={category.value} value={category.value}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {filterShopSamples(category.value).map((sample) => <article key={sample.id} className="min-w-0 overflow-hidden rounded-md border border-border bg-card">
            <Link to="/vi/cua-hang/$slug" params={{ slug: sample.slug }} aria-label={`Xem thông tin ${sample.name}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"><SampleImage name={sample.name} /></Link>
            <div className="p-5">
              <p className="text-xs text-shop-accent">{sample.category === "beads" ? "Vòng tay & mala" : "Nhang"}</p>
              <h2 className="mt-2 text-2xl leading-tight">{sample.name}</h2>
              <p lang="en" className="mt-2 min-h-10 text-xs leading-relaxed text-muted-foreground">{sample.englishName}</p>
              <div className="my-5 border-t border-border pt-4"><p className="font-medium">Đang cập nhật</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Liên hệ để kiểm tra mẫu</p></div>
              <Button asChild variant="link" className="h-auto whitespace-normal p-0 text-foreground"><Link to="/vi/cua-hang/$slug" params={{ slug: sample.slug }}>Tìm hiểu mẫu<ArrowUpRight aria-hidden="true" /></Link></Button>
            </div>
          </article>)}
        </div>
      </TabsContent>)}
    </Tabs>
    <SampleTruthNote />
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="text-3xl">Dành cho đối tác</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">Trao đổi về nhu cầu sản phẩm cho studio, không gian thực hành hoặc quà tặng. Quy cách, hồ sơ và điều kiện cung ứng cần được xác nhận riêng.</p>
      <Button asChild variant="link" className="mt-4 h-auto p-0 text-shop-accent"><Link to="/vi/doi-tac-san-pham">Thông tin hợp tác<ArrowUpRight aria-hidden="true" /></Link></Button>
    </section>
  </ShopFrame>;
}