CREATE TABLE public.help_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL,
  message text NOT NULL,
  page_path text,
  lang text,
  ip_hash text,
  reviewed_at timestamptz
);
GRANT ALL ON public.help_feedback TO service_role;
ALTER TABLE public.help_feedback ENABLE ROW LEVEL SECURITY;
CREATE INDEX help_feedback_ip_recent ON public.help_feedback (ip_hash, created_at DESC);