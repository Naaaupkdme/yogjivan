import portrait480 from "@/assets/leadership/sonu-ghanghas-co-founder-480.webp.asset.json";
import portrait800 from "@/assets/leadership/sonu-ghanghas-co-founder-800.webp.asset.json";

export const SONU_PORTRAIT = { small: portrait480.url, large: portrait800.url, width: 800, height: 1000 };
export const SONU_BIO = {
  en: "Sonu Ghanghas is a co-founder of Yog Jivan. He focuses on how the studio grows and how people experience it, from finding a class that fits to getting a clear answer when they reach out. He has worked with more than ten companies, and five years of personal yoga practice give him a student’s perspective on the business. He welcomes conversations with studio owners, agencies and teams working on better ways to reach and support their customers.",
  vi: "Sonu Ghanghas là đồng sáng lập của Yog Jivan. Anh tập trung vào việc phát triển studio và trải nghiệm của mọi người với Yog Jivan, từ lúc tìm được lớp học phù hợp đến khi nhận được câu trả lời rõ ràng mỗi khi liên hệ. Anh đã làm việc với hơn mười công ty, và năm năm tự tập yoga mang lại cho anh góc nhìn của một học viên về công việc kinh doanh. Anh sẵn sàng trao đổi với chủ studio, agency và các đội ngũ đang tìm cách tốt hơn để tiếp cận và hỗ trợ khách hàng.",
};
export const SONU_SUMMARY = {
  en: "Sonu focuses on growing Yog Jivan and making it easier for students and partners to connect with the studio.",
  vi: "Sonu tập trung phát triển Yog Jivan và giúp học viên, đối tác kết nối với studio dễ dàng hơn.",
};
export function sonuSchema(locale: "en" | "vi") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.yogjivan.com/#sonu-ghanghas",
    name: "Sonu Ghanghas",
    jobTitle: locale === "vi" ? "Đồng sáng lập & phụ trách phát triển" : "Co-founder & Growth Partner",
    description: SONU_BIO[locale],
    url: `https://www.yogjivan.com${locale === "vi" ? "/vi/gioi-thieu" : "/about"}#sonu-ghanghas`,
    image: `https://www.yogjivan.com${SONU_PORTRAIT.large}`,
    worksFor: { "@id": "https://www.yogjivan.com/#organization" },
  };
}
/** Sonu's owner-confirmed project WhatsApp; used only in his collaboration block (never metadata/JSON-LD). */
const SONU_WA = "917988599389";
export const SONU_PROJECT_WHATSAPP = {
  en: `https://wa.me/${SONU_WA}?text=${encodeURIComponent("Hello Sonu, I'd like to discuss a website or automation project.")}`,
  vi: `https://wa.me/${SONU_WA}?text=${encodeURIComponent("Xin chào Sonu, tôi muốn trao đổi về một dự án website hoặc tự động hóa.")}`,
};
