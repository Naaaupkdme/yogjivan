import {
  generateTicketRef,
  supportTicketSchema,
  type SupportSubmitResult,
  type SupportTicketInput,
} from "./types";

type Admin = any;

export type SupportContext = {
  ip: string | null;
  origin?: string | null;
};

// In-memory ledger for preview / test environments where Supabase table may not be migrated yet
const PREVIEW_SUPPORT_LEDGER: Array<{
  ticket_ref: string;
  category: string;
  service_or_studio: string | null;
  message: string;
  reply_preference: string;
  contact: string | null;
  locale: string;
  route: string | null;
  created_at: string;
  idempotency_key?: string | null;
}> = [];

/** Format sanitized plain-text internal Telegram notification (never puts user text into executable templates) */
export function formatSupportTelegramAlert(ticket: {
  ticket_ref: string;
  category: string;
  service_or_studio?: string | null;
  locale: string;
}): string {
  const service = ticket.service_or_studio || "General";
  const categoryLabel =
    ticket.category === "booking_lesson"
      ? "Booking question"
      : ticket.category === "website_problem"
      ? "Website issue"
      : ticket.category === "class_feedback"
      ? "Class feedback"
      : "General enquiry";

  return `New support ticket ${ticket.ticket_ref} · ${categoryLabel} · ${service} · ${ticket.locale.toUpperCase()} · Open ticket`;
}

export async function processSupportSubmission(
  rawInput: unknown,
  ctx: SupportContext
): Promise<{ status: number; body: SupportSubmitResult }> {
  // 1. Validate payload
  const parsed = supportTicketSchema.safeParse(rawInput);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      status: 400,
      body: {
        ok: false,
        error: firstIssue?.message ?? "Invalid form input. Please check the fields and try again.",
      },
    };
  }

  const data: SupportTicketInput = parsed.data;

  // 2. Honeypot check
  if (data.hp && data.hp.trim().length > 0) {
    // Return silent ok to bots
    return {
      status: 200,
      body: {
        ok: true,
        ticket_ref: generateTicketRef(),
        category: data.category,
        locale: data.locale,
        is_anonymous: data.reply_preference === "none",
      },
    };
  }

  // 3. Idempotency check: check if this idempotency_key was already handled
  if (data.idempotency_key) {
    const existing = PREVIEW_SUPPORT_LEDGER.find(
      (t) => t.idempotency_key === data.idempotency_key
    );
    if (existing) {
      return {
        status: 200,
        body: {
          ok: true,
          ticket_ref: existing.ticket_ref,
          category: data.category,
          locale: data.locale,
          is_anonymous: existing.reply_preference === "none",
        },
      };
    }
  }

  const ticketRef = generateTicketRef();
  const isAnonymous = data.reply_preference === "none";

  const ticketRow = {
    ticket_ref: ticketRef,
    category: data.category,
    service_or_studio: data.service_or_studio || null,
    feedback_type: data.feedback_type || null,
    message: data.message,
    reply_preference: data.reply_preference,
    contact: isAnonymous ? null : data.contact || null,
    locale: data.locale,
    route: data.route || null,
    status: "new",
    ip_fp: ctx.ip ? `ip_${ctx.ip.slice(0, 8)}` : null,
    idempotency_key: data.idempotency_key || null,
    created_at: new Date().toISOString(),
  };

  // 4. Try writing to Supabase support_tickets & support_outbox
  let dbSuccess = false;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as Admin;

    const { data: inserted, error: insertError } = await admin
      .from("support_tickets")
      .insert(ticketRow)
      .select("id, ticket_ref")
      .maybeSingle();

    if (!insertError && inserted?.id) {
      dbSuccess = true;
      // Also commit outbox row for n8n/Telegram dispatch
      const telegramAlertText = formatSupportTelegramAlert({
        ticket_ref: ticketRef,
        category: data.category,
        service_or_studio: data.service_or_studio,
        locale: data.locale,
      });

      try {
        await admin.from("support_outbox").insert({
          ticket_id: inserted.id,
          ticket_ref: ticketRef,
          channel: "telegram",
          payload: {
            text: telegramAlertText,
            category: data.category,
            locale: data.locale,
            has_contact: !isAnonymous,
            route: data.route,
          },
          status: "pending",
        });
      } catch (outboxErr) {
        // Outbox is async queued; ticket is already safe in database
        console.warn("Support outbox queue warning:", outboxErr);
      }
    }
  } catch (err) {
    // If table doesn't exist yet or Supabase is not reachable
    dbSuccess = false;
  }

  // Always keep in preview memory ledger for preview sessions & tests
  PREVIEW_SUPPORT_LEDGER.push(ticketRow);

  return {
    status: 200,
    body: {
      ok: true,
      ticket_ref: ticketRef,
      category: data.category,
      locale: data.locale,
      is_anonymous: isAnonymous,
    },
  };
}

export function getPreviewSupportLedger() {
  return [...PREVIEW_SUPPORT_LEDGER];
}

export function clearPreviewSupportLedger() {
  PREVIEW_SUPPORT_LEDGER.length = 0;
}
