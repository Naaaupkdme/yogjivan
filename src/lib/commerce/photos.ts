import rudrakshaSmall from "@/assets/commerce/rudraksha-5-mukhi-front-640.webp.asset.json";
import rudrakshaLarge from "@/assets/commerce/rudraksha-5-mukhi-front-1600.webp.asset.json";
import malaSmall from "@/assets/commerce/rudraksha-mala-front-640.webp.asset.json";
import malaLarge from "@/assets/commerce/rudraksha-mala-front-1600.webp.asset.json";
import omSmall from "@/assets/commerce/rudraksha-om-front-640.webp.asset.json";
import omLarge from "@/assets/commerce/rudraksha-om-front-1600.webp.asset.json";
import chakraSmall from "@/assets/commerce/seven-chakra-front-640.webp.asset.json";
import chakraLarge from "@/assets/commerce/seven-chakra-front-1600.webp.asset.json";
import giftSmall from "@/assets/commerce/mangaldeep-gift-open-640.webp.asset.json";
import giftLarge from "@/assets/commerce/mangaldeep-gift-open-1600.webp.asset.json";
import packageSmall from "@/assets/commerce/mangaldeep-package-detail-640.webp.asset.json";
import packageLarge from "@/assets/commerce/mangaldeep-package-detail-1600.webp.asset.json";
import floraSmall from "@/assets/commerce/sawariya-flora-front-640.webp.asset.json";
import floraLarge from "@/assets/commerce/sawariya-flora-front-1600.webp.asset.json";

export type SamplePhoto = {
  sourceFile: string;
  small: string;
  large: string;
  width: number;
  height: number;
  alt: string;
};
type Asset = { url: string };
function photo(sourceFile: string, small: Asset, large: Asset, width: number, height: number, alt: string): SamplePhoto {
  return { sourceFile, small: small.url, large: large.url, width, height, alt };
}

// Only visually matched, owner-supplied photographs. No signed source URLs.
const SAMPLE_PHOTOS: Record<string, SamplePhoto> = {
  "vong-tay-rudraksha-5-mukhi": photo("IMG_8164.jpg", rudrakshaSmall, rudrakshaLarge, 1536, 2048, "Ảnh thật vòng tay Rudraksha màu nâu trong bao bì vàng, kèm phần thẻ nhà cung cấp ghi 5-mukhi và one pcs tested."),
  "chuoi-mala-rudraksha-5-mat": photo("IMG_8166.jpg", malaSmall, malaLarge, 1536, 2048, "Ảnh thật chuỗi mala nâu trong bao bì Rudraksha Mala, có thẻ Jaipur Gemological Lab mã JA-65556; chưa xác minh thẻ."),
  "vong-tay-rudraksha-om-phoi-hat-den": photo("IMG_8169.jpg", omSmall, omLarge, 1536, 2048, "Ảnh thật vòng phối hạt Rudraksha nâu, hạt đen, chi tiết màu kim loại và biểu tượng Om trong bao bì vàng."),
  "vong-tay-hat-den-bay-chakra": photo("IMG_8161.jpg", chakraSmall, chakraLarge, 1600, 1200, "Ảnh thật vòng hạt đen phối hạt màu trên thẻ xanh ghi 7 Chakra Bracelet."),
  "mangaldeep-scent-luxe-gift-set": photo("IMG_8174.jpg", giftSmall, giftLarge, 1600, 1200, "Ảnh thật bộ quà Mangaldeep Scent Luxe mở nắp vàng, gồm bốn hộp Cool Splash, Radiant Burst, Velvet Rush và Black Oud."),
  "sawariya-flora-agarbatti": photo("IMG_8215.jpg", floraSmall, floraLarge, 1536, 2048, "Ảnh thật ống nhang Sawariya Flora Agarbatti nhãn vàng xanh trên nền vải đỏ."),
};

export function samplePhotoFor(slug: string): SamplePhoto | undefined {
  return Object.hasOwn(SAMPLE_PHOTOS, slug) ? SAMPLE_PHOTOS[slug] : undefined;
}

export const MANGALDEEP_PACKAGE_PHOTO = photo("IMG_8171.jpg", packageSmall, packageLarge, 1600, 1200, "Ảnh thật mặt bao bì Mangaldeep Scent Luxe, giữ nguyên nhãn, bốn tên mùi và quy cách 4 × 25 que; thông tin nhà sản xuất chưa được xác minh độc lập.");

// IMG_8165.jpg is deliberately not uploaded or referenced: immunity/healing claims.