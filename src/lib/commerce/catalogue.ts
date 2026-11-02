export type SampleCategory = "beads" | "incense";
export type ShopSample = {
  id: string;
  slug: string;
  category: SampleCategory;
  name: string;
  englishName: string;
  description: string;
  contents: readonly string[];
  care: readonly string[];
  certificate: { status: "supplier-card-pending" | "not-visible"; text: string; specimen?: string; reportedWeightGrams?: number; testedPieces?: number };
  availability: "contact-to-check-sample";
  pricing: "pending";
  giftPack?: { boxes: number; sticksPerBox: number; fragrances: readonly string[]; stand: boolean };
};

const beadCare = [
  "Lau nhẹ bằng khăn mềm, khô; cất ở nơi khô ráo, tránh ánh nắng trực tiếp.",
  "Tránh ngâm nước, nước hoa, chất tẩy rửa và kéo mạnh dây. Ngừng đeo nếu có kích ứng da.",
  "Để xa trẻ nhỏ và thú cưng: hạt và phụ kiện nhỏ có nguy cơ gây hóc.",
] as const;

export const INCENSE_CARE = [
  "Chỉ sử dụng ở nơi thông thoáng; không đốt trong không gian kín. Tránh hít khói trực tiếp.",
  "Dùng đế chịu nhiệt ổn định trên bề mặt không cháy, xa rèm, giấy và các vật dễ bắt lửa. Không để nhang cháy khi không có người trông coi.",
  "Để xa trẻ em và thú cưng. Dập tắt hoàn toàn, để nguội rồi mới xử lý tro; tránh chạm vào đầu đang cháy và đế nóng.",
  "Nếu nhạy cảm với mùi hoặc khói, có bệnh hô hấp hoặc thấy khó chịu, tránh sử dụng và rời khỏi khu vực có khói. Tuân thủ hướng dẫn trên bao bì khi được xác nhận.",
  "Bảo quản khô ráo, tránh nguồn nhiệt. Đây là nhang có khói khi đốt, không phải sản phẩm làm sạch không khí hay chăm sóc sức khoẻ.",
] as const;

const pending = { availability: "contact-to-check-sample", pricing: "pending" } as const;

export const SHOP_SAMPLES: readonly ShopSample[] = [
  {
    ...pending, id: "YJ-SAMPLE-01", slug: "vong-tay-rudraksha-5-mukhi", category: "beads",
    name: "Vòng tay Rudraksha 5-mukhi", englishName: "5-mukhi Rudraksha Bracelet",
    description: "Mẫu vòng tay được mô tả là Rudraksha 5-mukhi (5 mặt). Thông tin hiện dựa trên mô tả mẫu và thẻ do nhà cung cấp đưa kèm, chưa phải kết quả xác minh độc lập của Yog Jivan.",
    contents: ["Mẫu vòng tay Rudraksha 5-mukhi; có thẻ chứng nhận nhà cung cấp được nhìn thấy."], care: beadCare,
    certificate: { status: "supplier-card-pending", testedPieces: 1, text: "Có thẻ chứng nhận nhà cung cấp; thẻ ghi ‘one pcs tested’ (một mẫu được thử). Việc xác minh còn chờ hoàn tất. Không có cơ sở để nói mọi hạt hoặc mọi vòng đều được thử." },
  },
  {
    ...pending, id: "YJ-SAMPLE-02", slug: "chuoi-mala-rudraksha-5-mat", category: "beads",
    name: "Chuỗi mala Rudraksha 5 mặt", englishName: "Brown 5-face Rudraksha Mala",
    description: "Mẫu chuỗi mala màu nâu, được mô tả là Rudraksha 5 mặt. Thẻ kèm mẫu ghi Jaipur Gemological Lab và mã JA-65556; chưa xác minh độc lập danh tính hạt hay tính xác thực của thẻ.",
    contents: ["Mẫu chuỗi mala màu nâu và thẻ nhà cung cấp được nhìn thấy."], care: beadCare,
    certificate: { status: "supplier-card-pending", specimen: "JA-65556", reportedWeightGrams: 36.53, testedPieces: 1, text: "Thẻ nhà cung cấp ghi Jaipur Gemological Lab, specimen JA-65556, 36,53 g và ‘one pcs tested’. Đây là thông tin trên thẻ của một mẫu, không phải khối lượng được bảo đảm cho từng chuỗi. Xác minh thẻ và phạm vi thử nghiệm còn chờ hoàn tất; không khẳng định công nhận GIA hay thử nghiệm từng hạt." },
  },
  {
    ...pending, id: "YJ-SAMPLE-03", slug: "vong-tay-rudraksha-om-phoi-hat-den", category: "beads",
    name: "Vòng tay Rudraksha phối hạt đen & Om", englishName: "Mixed Rudraksha & Black Bead Om Bracelet",
    description: "Mẫu vòng phối các hạt được mô tả là Rudraksha, hạt màu đen, chi tiết phân cách có vẻ ngoài kim loại và biểu tượng Om. Chưa xác minh vật liệu của hạt đen hoặc chi tiết phân cách.",
    contents: ["Mẫu vòng phối hạt với biểu tượng Om và chi tiết phân cách."], care: beadCare,
    certificate: { status: "not-visible", text: "Chưa thấy thẻ chứng nhận gắn với mẫu này trong thông tin được cung cấp. Chưa có xác minh độc lập." },
  },
  {
    ...pending, id: "YJ-SAMPLE-04", slug: "vong-tay-hat-den-bay-chakra", category: "beads",
    name: "Vòng tay hạt đen bảy chakra", englishName: "Black Bead Seven-chakra Bracelet",
    description: "Mẫu vòng hạt đen với các chi tiết màu được giới thiệu theo chủ đề bảy chakra. Danh tính vật liệu chưa được xác minh; không gọi các hạt là một loại đá cụ thể.",
    contents: ["Mẫu vòng hạt đen theo chủ đề bảy chakra."], care: beadCare,
    certificate: { status: "not-visible", text: "Không có chứng nhận được nhìn thấy cho mẫu này. Không khẳng định loại đá, tính xác thực hay kiểm định phòng thí nghiệm." },
  },
  {
    ...pending, id: "YJ-SAMPLE-05", slug: "mangaldeep-scent-luxe-gift-set", category: "incense",
    name: "Bộ quà nhang Mangaldeep Scent Luxe", englishName: "Mangaldeep Scent Luxe Collections Gift Set",
    description: "Bộ quà Scent Luxe Collections được mô tả gồm bốn hộp nhang không lõi tre, mỗi hộp 25 que, kèm đế. Tên các mùi được giữ theo bao bì; ‘không lõi tre’ không có nghĩa là không khói.",
    contents: ["4 hộp × 25 que nhang không lõi tre.", "Cool Splash · Radiant Burst · Velvet Rush · Black Ooud.", "Có đế kèm bộ quà theo thông tin mẫu."], care: INCENSE_CARE,
    giftPack: { boxes: 4, sticksPerBox: 25, fragrances: ["Cool Splash", "Radiant Burst", "Velvet Rush", "Black Ooud"], stand: true },
    certificate: { status: "not-visible", text: "Thông tin dựa trên mô tả bao bì. Chưa có tài liệu kiểm định sản phẩm được xác minh; không khẳng định lợi ích sức khoẻ hoặc chứng nhận chất lượng." },
  },
  {
    ...pending, id: "YJ-SAMPLE-06", slug: "sawariya-flora-agarbatti", category: "incense",
    name: "Nhang Sawariya Flora Agarbatti", englishName: "Sawariya Flora Agarbatti Tube Pack",
    description: "Mẫu nhang Sawariya Flora Agarbatti trong bao bì dạng ống. Quy cách và số que chưa được xác nhận nên chưa công bố.",
    contents: ["Bao bì dạng ống ghi Sawariya Flora Agarbatti."], care: INCENSE_CARE,
    certificate: { status: "not-visible", text: "Chưa có tài liệu kiểm định được xác minh cho mẫu này. Không khẳng định chứng nhận hay lợi ích sức khoẻ." },
  },
];

export function findShopSample(slug: string) {
  return SHOP_SAMPLES.find((sample) => sample.slug === slug);
}

export function filterShopSamples(category: "all" | SampleCategory) {
  return category === "all" ? SHOP_SAMPLES : SHOP_SAMPLES.filter((sample) => sample.category === category);
}