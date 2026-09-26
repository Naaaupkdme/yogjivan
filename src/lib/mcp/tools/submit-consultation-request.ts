import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "submit_consultation_request",
  title: "Submit consultation request",
  description:
    "Submit a free consultation request to Yog Jivan Sanctuary on behalf of a prospective student. Mirrors the public website contact form; the team replies on WhatsApp.",
  inputSchema: {
    name: z.string().trim().min(2).max(120).describe("Full name of the person requesting the consultation."),
    whatsapp: z
      .string()
      .trim()
      .min(6)
      .max(40)
      .describe("WhatsApp number in international format (e.g. +84782046066)."),
    email: z.string().trim().email().max(200).optional().describe("Optional email address."),
    preferred_experience: z
      .string()
      .max(80)
      .optional()
      .describe("One of: Private Session, Studio Classes, Online Classes, Therapeutic Recovery, Corporate Wellness."),
    message: z
      .string()
      .max(1000)
      .optional()
      .describe("Optional goal or health notes."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async ({ name, whatsapp, email, preferred_experience, message }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      return {
        content: [{ type: "text", text: "Backend is not configured." }],
        isError: true,
      };
    }
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("leads").insert({
      name: name.slice(0, 120),
      whatsapp: whatsapp.slice(0, 40),
      email: email?.slice(0, 200) || null,
      goals: [],
      preferred_experience: preferred_experience || null,
      preferred_time: null,
      health_notes: message?.slice(0, 1000) || null,
      health_tags: [],
      experience_level: null,
      status: "submitted",
      session_id: crypto.randomUUID(),
      source: "mcp",
    });
    if (error) {
      return {
        content: [{ type: "text", text: `Could not submit: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: "Thanks — the consultation request was received. The Yog Jivan team will follow up on WhatsApp.",
        },
      ],
      structuredContent: { ok: true },
    };
  },
});
