// Server-only: scores a lead via Lovable AI Gateway. Fails soft (returns null) so delivery never blocks.
import { AI_SCHEMA, IDEAL_CUSTOMER, buildAiInput, parseAiResult, type AiScore } from "./ai-score";
import type { LeadPayload } from "./payload";

const MODEL = "openai/gpt-6-astra";

export async function scoreLead(p: LeadPayload, apiKey: string | undefined): Promise<AiScore | null> {
  if (!apiKey) return null;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}`, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions: `You triage yoga enquiries for the Yog Jivan team.\n${IDEAL_CUSTOMER}\nScore the lead 0-100 and return JSON only. Never mention medical conditions or make health claims.`,
        input: JSON.stringify(buildAiInput(p)),
        text: { format: { type: "json_schema", name: "lead_score", strict: true, schema: AI_SCHEMA } },
      }),
    });
    if (!res.ok || !res.body) {
      console.error("lead ai score failed:", res.status);
      return null;
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (!line.startsWith("data:")) continue;
        const d = line.slice(5).trim();
        if (!d || d === "[DONE]") continue;
        try {
          const ev = JSON.parse(d);
          if (ev.type === "response.output_text.delta") text += ev.delta ?? "";
        } catch { /* partial */ }
      }
    }
    return parseAiResult(JSON.parse(text), MODEL, p.phone.phone_validation === "valid");
  } catch (e) {
    console.error("lead ai score error:", (e as Error).name);
    return null;
  }
}
