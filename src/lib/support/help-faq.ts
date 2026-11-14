// Curated knowledge base and search engine for Yog Jivan Help (File 24).
// All answers are verified against business facts (Solo $25 flat, Couples $45, Family $55/$65, Studio hours Mon-Sat).

export type HelpFAQ = {
  id: string;
  category: "pricing" | "booking" | "private" | "corporate" | "school" | "setup" | "studio" | "privacy";
  qEn: string;
  qVi: string;
  aEn: string;
  aVi: string;
  link?: {
    to: string;
    hash?: string;
    labelEn: string;
    labelVi: string;
  };
  tags: string[];
};

export const HELP_FAQS: HelpFAQ[] = [
  // 1. Private Solo Pricing (Journey 1)
  {
    id: "faq-private-session-price",
    category: "private",
    qEn: "How much is one private session?",
    qVi: "Giá một buổi tập yoga riêng 1 kèm 1 là bao nhiêu?",
    aEn: "A standalone 60-minute private online session is US$25. The same rate applies to first and repeat standalone sessions. 12-session packages are available for US$249 (save US$51), 20 sessions for US$399 (save US$101), and 24 sessions for US$459 (save US$141).",
    aVi: "Một buổi tập yoga riêng trực tuyến 60 phút có mức học phí là 25 USD. Mức giá này áp dụng thống nhất cho cả buổi đầu và các buổi học lẻ tiếp theo. Gói 12 buổi là 249 USD (tiết kiệm 51 USD), gói 20 buổi là 399 USD (tiết kiệm 101 USD) và gói 24 buổi là 459 USD (tiết kiệm 141 USD).",
    link: {
      to: "/private-online-yoga",
      labelEn: "View Private Yoga details",
      labelVi: "Xem chi tiết Yoga 1 kèm 1",
    },
    tags: ["private", "solo", "price", "cost", "1 kèm 1", "giá", "học phí", "25", "package"],
  },

  // 2. Corporate Demo (Journey 2)
  {
    id: "faq-corporate-demo",
    category: "corporate",
    qEn: "How do I arrange a corporate demo?",
    qVi: "Làm thế nào để đăng ký buổi trải nghiệm yoga doanh nghiệp?",
    aEn: "Share your workplace location (city and venue), estimated headcount and two suitable times. The complimentary chair-yoga demo takes 30 minutes. You can also download our bilingual corporate proposal PDF.",
    aVi: "Hãy gửi thông tin về địa điểm doanh nghiệp (thành phố và nơi tập), số lượng nhân sự dự kiến và hai khung giờ phù hợp. Buổi trải nghiệm yoga trên ghế miễn phí kéo dài 30 phút. Quý doanh nghiệp cũng có thể tải bản đề xuất song ngữ dạng PDF.",
    link: {
      to: "/corporate",
      hash: "corporate-enquiry-form",
      labelEn: "Request corporate demo",
      labelVi: "Đăng ký demo doanh nghiệp",
    },
    tags: ["corporate", "demo", "office", "chair yoga", "văn phòng", "doanh nghiệp", "trên ghế", "proposal"],
  },

  // 3. School Yoga Preparation (Journey 3)
  {
    id: "faq-school-preparation",
    category: "school",
    qEn: "What does the school prepare for a yoga session?",
    qVi: "Nhà trường cần chuẩn bị những gì cho buổi yoga học đường?",
    aEn: "Provide a clear, clean room or hall and supervising staff. An adult coordinator shares the general age band, group size and preferred times. We strictly collect only adult contact information — no child names, photos or health history are ever requested.",
    aVi: "Nhà trường cần chuẩn bị phòng tập sạch thoáng và người giám sát của trường. Người điều phối chia sẻ độ tuổi chung, sĩ số dự kiến và khung giờ phù hợp. Yog Jivan cam kết chỉ tiếp nhận thông tin người lớn, tuyệt đối không thu thập dữ liệu cá nhân hay hình ảnh của học sinh.",
    link: {
      to: "/school-yoga",
      hash: "school-yoga-enquiry-form",
      labelEn: "View School Yoga details",
      labelVi: "Xem chi tiết Yoga học đường",
    },
    tags: ["school", "kids", "trường học", "học đường", "trẻ em", "chuẩn bị", "pii", "privacy"],
  },

  // 4. Couples & Friends Yoga
  {
    id: "faq-couples-yoga-pricing",
    category: "pricing",
    qEn: "How much is couples yoga for two adults?",
    qVi: "Học phí lớp yoga cho hai người là bao nhiêu?",
    aEn: "A live 60-minute session costs US$45 total for two adults (US$22.50 each if split). A 4-session pack is US$170. A partner can be a friend, spouse or another adult. One teacher guides both adults and offers adapted variations.",
    aVi: "Một buổi tập trực tuyến 60 phút có học phí 45 USD cho hai người (tương đương 22.50 USD mỗi người). Gói 4 buổi là 170 USD. Bạn tập cùng có thể là bạn bè, vợ chồng hoặc người thân. Giáo viên sẽ hướng dẫn đồng thời và điều chỉnh theo từng thể trạng.",
    link: {
      to: "/online-couples-yoga",
      labelEn: "Explore Couples & Friends Yoga",
      labelVi: "Xem Yoga cho hai người",
    },
    tags: ["couples", "friends", "two adults", "hai người", "cặp đôi", "bạn bè", "45", "170"],
  },

  // 5. Family Yoga for 3 or 4
  {
    id: "faq-family-yoga-pricing",
    category: "pricing",
    qEn: "What are the rates for family online yoga?",
    qVi: "Mức phí cho lớp yoga gia đình tại nhà là bao nhiêu?",
    aEn: "Three participants from one household are US$55 total (4-session package is US$220 plus 1 complimentary session). Four participants are US$65 total (4-session package is US$240). Parent–child practice is also supported.",
    aVi: "Nhóm 3 thành viên cùng gia đình có mức phí 55 USD mỗi buổi (gói 4 buổi 220 USD tặng thêm 1 buổi). Nhóm 4 thành viên là 65 USD (gói 4 buổi 240 USD). Chương trình cũng hỗ trợ hình thức cha mẹ tập cùng con.",
    link: {
      to: "/online-family-yoga",
      labelEn: "View Family Yoga details",
      labelVi: "Xem chi tiết Yoga gia đình",
    },
    tags: ["family", "parent child", "household", "gia đình", "cha mẹ và con", "55", "65", "trẻ em"],
  },

  // 6. Camera & Room Setup
  {
    id: "faq-camera-setup",
    category: "setup",
    qEn: "How should I set up my camera and room for online yoga?",
    qVi: "Cách đặt máy quay và chuẩn bị phòng tập yoga trực tuyến như thế nào?",
    aEn: "Place your device (laptop or phone in landscape) 2 to 3 metres back at roughly hip height, side-on or front-diagonal, so your teacher can see both standing and floor postures. Keep lighting in front of you so you are not in silhouette.",
    aVi: "Đặt máy tính hoặc điện thoại nằm ngang cách thảm từ 2 đến 3 mét ở độ cao ngang hông, góc nhìn nghiêng hoặc chéo để giáo viên thấy rõ tư thế đứng và nằm. Giữ ánh sáng chiếu từ phía trước để tránh bị ngược sáng.",
    link: {
      to: "/blog/online-yoga-camera-setup",
      labelEn: "Read camera setup guide",
      labelVi: "Xem hướng dẫn đặt máy quay",
    },
    tags: ["camera", "setup", "room", "máy quay", "thiết bị", "góc quay", "ánh sáng", "thảm"],
  },

  // 7. Rescheduling & Cancelling
  {
    id: "faq-rescheduling",
    category: "booking",
    qEn: "Can I reschedule or cancel a session?",
    qVi: "Tôi có thể đổi lịch hoặc dời buổi tập không?",
    aEn: "Yes. For private, couples or family sessions, notify your teacher on WhatsApp at least 12 hours before your scheduled start time to reschedule without fee. Late cancellations or no-shows count as completed sessions.",
    aVi: "Có. Đối với các buổi tập riêng, hai người hoặc gia đình, vui lòng nhắn tin thông báo trước ít nhất 12 giờ qua WhatsApp/Zalo để được dời lịch miễn phí. Hủy sát giờ hoặc vắng mặt sẽ được tính là buổi học đã hoàn thành.",
    tags: ["reschedule", "cancel", "change time", "đổi lịch", "dời lịch", "hủy lịch", "hoàn tiền", "quy định"],
  },

  // 8. Studio Locations & Hours
  {
    id: "faq-studio-locations",
    category: "studio",
    qEn: "Where are the physical studios located and what are the hours?",
    qVi: "Phòng tập ở đâu và thời gian mở cửa như thế nào?",
    aEn: "Studio 1 (Yog Jivan Sanctuary) is at Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân, Phường Lê Thanh Nghị, Hai Phong (aerial yoga available). Studio 2 (Yog Jivan Yoga Studio) is at Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, Phường Thành Đông. Studios are open Monday–Saturday from 5:00 AM to 9:00 PM (Closed on Sundays).",
    aVi: "Cơ sở 1 (Yog Jivan Sanctuary) tại Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân, Phường Lê Thanh Nghị, Hải Phòng (có yoga võng/bay). Cơ sở 2 (Yog Jivan Yoga Studio) tại Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, Phường Thành Đông. Phòng tập mở cửa từ Thứ 2 đến Thứ 7: 5:00 – 21:00 (Chủ nhật nghỉ).",
    link: {
      to: "/contact",
      labelEn: "View Studio Details & Map",
      labelVi: "Xem bản đồ và địa chỉ phòng tập",
    },
    tags: ["studio", "location", "address", "hours", "aerial", "địa chỉ", "cơ sở", "hải dương", "hải phòng", "giờ mở cửa"],
  },

  // 9. Adult & Child Privacy
  {
    id: "faq-privacy-data",
    category: "privacy",
    qEn: "What information do you collect and how is it kept private?",
    qVi: "Yog Jivan thu thập thông tin gì và bảo mật như thế nào?",
    aEn: "We collect only the contact information you provide (name, phone/WhatsApp, email) strictly to schedule and communicate about your classes. We never request child names, child photos, medical records or bank details. Private feedback is never published without explicit written permission.",
    aVi: "Chúng tôi chỉ thu thập thông tin liên hệ do bạn cung cấp (tên, số điện thoại/Zalo, email) để sắp xếp lịch và hỗ trợ buổi tập. Tuyệt đối không yêu cầu thông tin trẻ em, hình ảnh học sinh hay hồ sơ bệnh lý. Mọi góp ý riêng tư đều được bảo mật tuyệt đối.",
    link: {
      to: "/privacy",
      labelEn: "Read Privacy Policy",
      labelVi: "Xem Chính sách bảo mật",
    },
    tags: ["privacy", "bảo mật", "pii", "thông tin", "child privacy", "trẻ em", "an toàn"],
  },
];

/** Remove Vietnamese diacritics and symbols for accent-insensitive search */
export function foldAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/** Synonyms mapping for natural intent matching */
const SYNONYMS: Record<string, string[]> = {
  price: ["cost", "rate", "fee", "how much", "dollar", "usd", "gia", "hoc phi", "bao nhieu", "tien"],
  reschedule: ["change", "delay", "cancel", "move", "doi lich", "doi gio", "hoan", "huy"],
  demo: ["trial", "complimentary", "free", "hoc thu", "trai nghiem", "mien phi"],
  camera: ["video", "laptop", "phone", "angle", "lighting", "may quay", "thiet bi", "goc quay"],
  chair: ["desk", "office", "workplace", "ghe", "van phong", "doanh nghiep"],
  school: ["kids", "children", "student", "truong", "hoc duong", "tre em", "hoc sinh"],
  address: ["where", "map", "studio", "dia chi", "o dau", "hai duong", "hai phong"],
};

/** Search FAQ database by query and optional route context */
export function searchHelpFAQs(
  query: string,
  locale: "en" | "vi",
  currentRoute?: string
): HelpFAQ[] {
  const cleanQ = foldAccents(query);

  if (!cleanQ) {
    // When no search query, prioritize by current route
    return prioritizeByRoute(HELP_FAQS, currentRoute);
  }

  // Expand query with synonyms
  const queryTokens = cleanQ.split(/\s+/).filter(Boolean);
  const expandedTokens = new Set<string>(queryTokens);

  for (const token of queryTokens) {
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (key.includes(token) || syns.some((s) => s.includes(token))) {
        expandedTokens.add(key);
        syns.forEach((s) => expandedTokens.add(s));
      }
    }
  }

  // Score each FAQ
  const scored = HELP_FAQS.map((faq) => {
    let score = 0;
    const targetQ = foldAccents(locale === "vi" ? faq.qVi : faq.qEn);
    const targetA = foldAccents(locale === "vi" ? faq.aVi : faq.aEn);
    const targetTags = faq.tags.map(foldAccents);

    for (const token of expandedTokens) {
      if (targetQ.includes(token)) score += 10;
      if (targetTags.some((t) => t.includes(token))) score += 5;
      if (targetA.includes(token)) score += 2;
    }

    // Boost if route matches category
    if (currentRoute) {
      if (currentRoute.includes("private") && faq.category === "private") score += 3;
      if (currentRoute.includes("corporate") && faq.category === "corporate") score += 3;
      if (currentRoute.includes("school") && faq.category === "school") score += 3;
    }

    return { faq, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.faq);
}

function prioritizeByRoute(faqs: HelpFAQ[], route?: string): HelpFAQ[] {
  if (!route) return faqs;

  const normalized = route.toLowerCase();

  return [...faqs].sort((a, b) => {
    const aMatch =
      ((normalized.includes("private") || normalized.includes("1-kem-1")) && a.category === "private") ||
      ((normalized.includes("corporate") || normalized.includes("doanh-nghiep")) && a.category === "corporate") ||
      ((normalized.includes("school") || normalized.includes("hoc-duong")) && a.category === "school") ||
      (normalized.includes("couples") && a.id === "faq-couples-yoga-pricing") ||
      (normalized.includes("family") && a.id === "faq-family-yoga-pricing") ||
      ((normalized.includes("contact") || normalized.includes("lien-he")) && a.category === "booking");

    const bMatch =
      ((normalized.includes("private") || normalized.includes("1-kem-1")) && b.category === "private") ||
      ((normalized.includes("corporate") || normalized.includes("doanh-nghiep")) && b.category === "corporate") ||
      ((normalized.includes("school") || normalized.includes("hoc-duong")) && b.category === "school") ||
      (normalized.includes("couples") && b.id === "faq-couples-yoga-pricing") ||
      (normalized.includes("family") && b.id === "faq-family-yoga-pricing") ||
      ((normalized.includes("contact") || normalized.includes("lien-he")) && b.category === "booking");

    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });
}
