import { useRef } from "react";
import { submitLead, type SubmitPayload, type SubmitResult } from "@/lib/leads";
import { trackGenerateLead } from "@/lib/analytics";

/**
 * Shared production lead submission coordinator.
 *
 * Guarantees:
 * 1. Synchronous mutex against rapid repeated clicks while a submission is in flight.
 * 2. Stable per-submission leadEventId generated via crypto.randomUUID (or timestamped fallback).
 * 3. Fingerprint-based retry idempotency: unchanged data after failure reuses the ID;
 *    changed form content receives a new ID.
 * 4. Outcome-gated conversion: trackGenerateLead is called ONLY on result.outcome === 'accepted'.
 * 5. Full reset on completion (accepted, duplicate, received) so subsequent enquiries get fresh IDs.
 */

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    return null;
  }
}

export function createLeadSubmissionCoordinator() {
  let submitting = false;
  let submissionRef: { id: string; fingerprint: string } | null = null;

  function getOrCreateEventId(fingerprint: string): string {
    if (!submissionRef || submissionRef.fingerprint !== fingerprint) {
      submissionRef = {
        id: generateEventId(),
        fingerprint,
      };
    }
    return submissionRef.id;
  }

  function clearRef() {
    submissionRef = null;
  }

  async function submit<T>({
    data,
    formId,
    category,
    buildPayload,
    onSuccess,
    onError,
    setBusy,
  }: {
    data: T;
    formId: string;
    category: string;
    buildPayload: (data: T, leadEventId: string) => SubmitPayload;
    onSuccess: (result: SubmitResult) => void;
    onError?: (err: unknown) => void;
    setBusy?: (busy: boolean) => void;
  }): Promise<boolean> {
    // 1. Synchronous mutex guard: reject concurrent dispatches while active
    if (submitting) return false;
    submitting = true;
    setBusy?.(true);

    const fingerprint = JSON.stringify(data);
    const leadEventId = getOrCreateEventId(fingerprint);

    try {
      const payload = buildPayload(data, leadEventId);
      const result = await submitLead(payload);

      // 2. Outcome-gated conversion: fire analytics ONLY on accepted result
      if (result.outcome === "accepted") {
        trackGenerateLead(category, formId, leadEventId);
      }

      // 3. Complete handled result (accepted, duplicate, received)
      onSuccess(result);
      clearRef();
      return true;
    } catch (err) {
      onError?.(err);
      // Keep submissionRef intact so an unchanged retry can reuse leadEventId
      throw err;
    } finally {
      submitting = false;
      setBusy?.(false);
    }
  }

  return {
    submit,
    isSubmitting: () => submitting,
    getCurrentId: () => submissionRef?.id ?? null,
    clearRef,
  };
}

export function useLeadSubmission() {
  const coordinatorRef = useRef<ReturnType<typeof createLeadSubmissionCoordinator> | null>(null);
  if (!coordinatorRef.current) {
    coordinatorRef.current = createLeadSubmissionCoordinator();
  }
  return coordinatorRef.current;
}
