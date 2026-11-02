import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShopFrame, SampleImage, ShopContact, VideoPlaceholder, SampleTruthNote, MissingShopSample } from "@/components/commerce/ShopParts";
import { findShopSample } from "@/lib/commerce/catalogue";
import { shopHead } from "@/lib/commerce/head";

export const Route = createFileRoute("/vi/cua-hang/$slug")({
  beforeLoad: ({ params }) => { if (!findShopSample(params.slug)) throw notFound(); },
  head: ({ params }) => {
    const sample = findShopSample(params.slug);
    return shopHead(sample ? `${sample.name} — Thông tin mẫu | Yog Jivan` : "Không tìm thấy mẫu | Yog Jivan", sample?.description ?? "Mẫu này không có trong danh mục xem trước của Yog Jivan.", `/vi/cua-hang/${encodeURIComponent(params.slug)}`);
  },
  component: ShopProduct,
  notFoundComponent: () => <MissingShopSample />,
});

function ShopProduct() {
  const { slug } = Route.useParams();
  const sample = findShopSample(slug);
  if (!sample) return <MissingShopSample />;
  return <ShopFrame>
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <div><SampleImage name={sample.name} large /><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Chưa có ảnh thực tế để đối chiếu mẫu. Không sử dụng hình mô phỏng.</p></div>
      <section>
        <p className="mb-3 text-sm text-shop-accent">{sample.category === "beads" ? "Vòng tay & mala" : "Nhang"} · {sample.id}</p>
        <h1 className="text-4xl leading-tight md:text-5xl">{sample.name}</h1>
        <p lang="en" className="mt-3 text-sm text-muted-foreground">{sample.englishName}</p>
        <p className="mt-6 leading-relaxed text-muted-foreground">{sample.description}</p>
        <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-y border-border py-5 text-sm"><dt className="text-muted-foreground">Giá</dt><dd className="font-medium">Đang cập nhật</dd><dt className="text-muted-foreground">Mẫu</dt><dd>Liên hệ để kiểm tra mẫu</dd></dl>
        <ShopContact subject={sample.name} />
      </section>
    </div>
    <div className="mt-14 grid gap-10 lg:grid-cols-2">
      <section><h2 className="text-3xl">Nội dung mẫu đã biết</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground">{sample.contents.map((line) => <li key={line}>{line}</li>)}</ul>
        <h2 className="mt-9 text-3xl">Thẻ & hồ sơ sản phẩm</h2><p className="mt-4 leading-relaxed text-muted-foreground">{sample.certificate.text}</p>
      </section>
      <section><h2 className="text-3xl">{sample.category === "incense" ? "Sử dụng & an toàn" : "Bảo quản & lưu ý"}</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground">{sample.care.map((line) => <li key={line}>{line}</li>)}</ul></section>
    </div>
    <section className="mt-12"><h2 className="mb-5 text-3xl">Video thực tế</h2><VideoPlaceholder label={sample.category === "beads" ? "Cách đeo & kiểm tra độ vừa" : "Cách dùng đế & đốt nhang an toàn"} /><VideoPlaceholder label="Bảo quản mẫu" /><VideoPlaceholder label={sample.category === "beads" ? "Cách sử dụng trong thực hành truyền thống" : "Dập tắt & xử lý tro"} /></section>
    <SampleTruthNote />
  </ShopFrame>;
}