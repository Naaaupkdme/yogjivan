import type { SupportTicketInput, SupportSubmitResult } from "./types";

let isSubmittingSupport = false;

export async function submitSupportTicket(
  input: SupportTicketInput
): Promise<SupportSubmitResult> {
  if (isSubmittingSupport) {
    return { ok: false, error: "A submission is already in progress. Please wait." };
  }

  isSubmittingSupport = true;
  try {
    const res = await fetch("/api/public/support/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = (await res.json()) as SupportSubmitResult;
    return data;
  } catch (err) {
    return {
      ok: false,
      error: "Network connection error. Please try again or message our team directly.",
    };
  } finally {
    isSubmittingSupport = false;
  }
}
