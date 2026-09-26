// Pure delivery-outcome rules (unit tested).

export type Outcome =
  | { kind: "sent" }
  | { kind: "retry"; afterSeconds: number; error: string }
  | { kind: "failed"; error: string }
  | { kind: "uncertain"; error: string };

export const MAX_ATTEMPTS = 5;

export function backoffSeconds(attempt: number): number {
  return Math.min(3600, 30 * 2 ** Math.max(0, attempt - 1));
}

/**
 * Telegram sendMessage is NOT idempotent. Only definite, pre-delivery failures
 * are retried. Anything where the message may have been sent → uncertain.
 */
export function telegramOutcome(
  res: { status: number; body: { ok?: boolean; parameters?: { retry_after?: number }; description?: string } | null } | null,
  networkError: string | null,
  attempt: number,
): Outcome {
  if (networkError || !res) return { kind: "uncertain", error: `ambiguous: ${networkError ?? "no response"}`.slice(0, 300) };
  if (res.status === 200 && res.body?.ok) return { kind: "sent" };
  const desc = `${res.status} ${res.body?.description ?? ""}`.slice(0, 300);
  if (res.status === 429) {
    const ra = res.body?.parameters?.retry_after ?? 30;
    return attempt >= MAX_ATTEMPTS ? { kind: "failed", error: desc } : { kind: "retry", afterSeconds: Math.max(1, ra), error: desc };
  }
  if (res.status >= 500) return { kind: "uncertain", error: `ambiguous server error: ${desc}` };
  // 400/401/403/404: request rejected before delivery — definite failure.
  return { kind: "failed", error: desc };
}

/** Sheets writes are idempotent (row located by UUID), so transient errors retry. */
export function sheetOutcome(status: number | null, error: string, attempt: number): Outcome {
  const e = `${status ?? "network"} ${error}`.slice(0, 300);
  if (status !== null && status >= 400 && status < 500 && status !== 429 && status !== 408) {
    return { kind: "failed", error: e };
  }
  if (attempt >= MAX_ATTEMPTS) return { kind: "failed", error: e };
  return { kind: "retry", afterSeconds: backoffSeconds(attempt), error: e };
}
