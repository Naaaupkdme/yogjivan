import { defineTool } from "@lovable.dev/mcp-js";
import { FAQS } from "@/lib/faqs";

export default defineTool({
  name: "list_faqs",
  title: "List FAQs",
  description:
    "Return the full list of frequently asked questions and answers about Yog Jivan Sanctuary's yoga programs, studios, and offerings.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const faqs = FAQS.map((f) => ({ question: f.q, answer: f.a }));
    return {
      content: [{ type: "text", text: JSON.stringify(faqs, null, 2) }],
      structuredContent: { faqs },
    };
  },
});
