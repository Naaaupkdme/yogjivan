import portrait480 from "@/assets/leadership/sonu-ghanghas-co-founder-480.webp.asset.json";
import portrait800 from "@/assets/leadership/sonu-ghanghas-co-founder-800.webp.asset.json";

export const SONU_PORTRAIT = { small: portrait480.url, large: portrait800.url, width: 800, height: 1000 };
export const SONU_BIO = {
  en: "Sonu works on the systems behind Yog Jivan’s online experience. His work covers website development and improvement, SEO, and how enquiries move from the site to the people who can help. He also designs AI-agent workflows and automations for tasks such as organising incoming requests and making follow-ups easier to manage. He has worked with more than ten companies and has practised yoga for five years.",
  vi: "Sonu phụ trách các hệ thống hỗ trợ trải nghiệm trực tuyến của Yog Jivan. Công việc của anh bao gồm phát triển và cải thiện website, SEO, cùng quy trình chuyển yêu cầu từ website đến đội ngũ có thể hỗ trợ. Anh cũng thiết kế quy trình làm việc với tác tử AI và các hệ thống tự động hóa, chẳng hạn như sắp xếp yêu cầu mới và giúp quản lý việc liên hệ lại thuận tiện hơn. Anh đã làm việc với hơn mười công ty và có năm năm thực hành yoga.",
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