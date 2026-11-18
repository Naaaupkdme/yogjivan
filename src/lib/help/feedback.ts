import { z } from "zod";

// Private site feedback — deliberately separate from sales leads:
// no contact fields, never fires Meta Lead, never reaches CRM/Telegram.
export const FEEDBACK_KINDS = ["suggestion", "problem", "compliment"] as const;
export const FEEDBACK_MAX_PER_HOUR = 3;

export const feedbackSchema = z.object({
  kind: z.enum(FEEDBACK_KINDS),
  message: z.string().trim().min(5).max(1000),
  page_path: z.string().max(200).regex(/^\//).optional(),
  lang: z.enum(["EN", "VI"]).optional(),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});
export type FeedbackInput = z.infer<typeof feedbackSchema>;

/** Strip obvious contact details so private feedback never stores PII. */
export function redactContact(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[email removed]")
    .replace(/\+?\d[\d\s().-]{7,}\d/g, "[number removed]");
}
