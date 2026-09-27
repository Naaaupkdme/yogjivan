import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

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
    // Same trusted intake as the website (rate limits, duplicate suppression, audit).
    // MCP calls carry no end-user IP, so all MCP submissions share one "mcp" bucket.
    const { acceptLead } = await import("@/lib/leads/intake.server");
    const r = await acceptLead(
      {
        name, whatsapp, email: email || null, goals: [],
        preferred_experience: preferred_experience || null,
        health_notes: message || null, source: "website",
        session_id: crypto.randomUUID(),
      },
      { ip: "mcp-gateway", source: "mcp" },
      { requireTurnstile: false },
    );
    const outcome = (r.body as { outcome?: string }).outcome;
    if (r.status !== 200) {
      return {
        content: [{ type: "text", text: (r.body as { error?: string }).error ?? "Could not submit the request." }],
        isError: true,
      };
    }
    if (outcome === "duplicate") {
      return {
        content: [{ type: "text", text: "This request was already received. The Yog Jivan team will follow up on WhatsApp." }],
        structuredContent: { ok: true, duplicate: true },
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
