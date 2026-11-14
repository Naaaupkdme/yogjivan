import { z } from "zod";

export const SUPPORT_CATEGORIES = [
  "booking_lesson",
  "website_problem",
  "class_feedback",
  "other",
] as const;

export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number];

export const REPLY_PREFERENCES = [
  "none",
  "whatsapp_zalo",
  "email",
] as const;

export type ReplyPreference = (typeof REPLY_PREFERENCES)[number];

export const CATEGORY_LABELS = {
  en: {
    booking_lesson: "Booking or lesson question",
    website_problem: "Website problem",
    class_feedback: "Class feedback",
    other: "Other enquiry",
  },
  vi: {
    booking_lesson: "Câu hỏi về lịch học hoặc buổi tập",
    website_problem: "Lỗi hoặc sự cố trên website",
    class_feedback: "Góp ý về buổi học",
    other: "Chủ đề khác",
  },
} as const;

export const REPLY_LABELS = {
  en: {
    none: "No reply needed (Anonymous)",
    whatsapp_zalo: "WhatsApp or Zalo",
    email: "Email",
  },
  vi: {
    none: "Không cần phản hồi (Ẩn danh)",
    whatsapp_zalo: "Qua WhatsApp hoặc Zalo",
    email: "Qua Email",
  },
} as const;

export const FEEDBACK_TYPES = [
  "Class experience",
  "Teacher guidance",
  "Scheduling & timing",
  "Video & sound quality",
  "Facilities & room",
  "General feedback",
] as const;

export const SERVICE_OPTIONS = [
  "Private 1-on-1 Online Yoga",
  "Online Couples Yoga",
  "Private Online Family Yoga",
  "Live Online Group Classes",
  "Corporate Wellness",
  "School Yoga",
  "Studio 1 (Sanctuary, Bùi Thị Xuân)",
  "Studio 2 (Yoga Studio, Ngô Quyền)",
  "General / Not sure",
] as const;

/** Generate human-readable ticket reference e.g. YJ-SUP-0F42 */
export function generateTicketRef(): string {
  let hex = "";
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(2);
    crypto.getRandomValues(bytes);
    hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  } else {
    hex = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase();
  }
  return `YJ-SUP-${hex}`;
}

/** Sanitize input text: trim, remove potential script/html tags, clamp whitespace */
export function sanitizePlainText(text: string): string {
  return text
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control characters
    .trim();
}

export const supportTicketSchema = z.object({
  category: z.enum(SUPPORT_CATEGORIES, {
    errorMap: () => ({ message: "Please select a valid topic category" }),
  }),
  service_or_studio: z.string().max(120).optional().nullable(),
  feedback_type: z.string().max(80).optional().nullable(),
  message: z
    .string()
    .transform(sanitizePlainText)
    .pipe(
      z
        .string()
        .min(10, "Please describe your question or feedback in at least 10 characters")
        .max(1000, "Message cannot exceed 1000 characters")
    ),
  reply_preference: z.enum(REPLY_PREFERENCES).default("none"),
  contact: z.string().transform(sanitizePlainText).optional().nullable(),
  locale: z.enum(["en", "vi"]).default("en"),
  route: z.string().max(200).optional().nullable(),
  hp: z.string().max(50).optional().nullable(), // Honeypot field
  idempotency_key: z.string().min(8).max(120).optional().nullable(),
}).refine(
  (data) => {
    // If reply is requested, contact info is required
    if (data.reply_preference !== "none") {
      return Boolean(data.contact && data.contact.length >= 3);
    }
    return true;
  },
  {
    message: "Please provide your WhatsApp, Zalo, or Email contact so we can reply",
    path: ["contact"],
  }
);

export type SupportTicketInput = z.infer<typeof supportTicketSchema>;

export type SupportSubmitResult = {
  ok: boolean;
  ticket_ref?: string;
  category?: SupportCategory;
  locale?: "en" | "vi";
  is_anonymous?: boolean;
  error?: string;
};
