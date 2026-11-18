ALTER TABLE public.help_feedback
  ADD COLUMN ticket_id text NOT NULL DEFAULT ('YJ-H-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,6))),
  ADD COLUMN has_contact boolean NOT NULL DEFAULT false,
  ADD COLUMN notify_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN notify_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN notify_error text,
  ADD COLUMN notified_at timestamptz;
CREATE UNIQUE INDEX help_feedback_ticket_uq ON public.help_feedback (ticket_id);
CREATE INDEX help_feedback_notify_pending ON public.help_feedback (notify_status, created_at) WHERE notify_status <> 'sent';

CREATE TABLE public.help_feedback_contacts (
  feedback_id uuid PRIMARY KEY REFERENCES public.help_feedback(id) ON DELETE CASCADE,
  contact text NOT NULL,
  consent_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.help_feedback_contacts TO service_role;
ALTER TABLE public.help_feedback_contacts ENABLE ROW LEVEL SECURITY;