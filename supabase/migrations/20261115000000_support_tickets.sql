-- Support and private feedback tickets (File 24)
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_ref TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('booking_lesson', 'website_problem', 'class_feedback', 'other')),
  service_or_studio TEXT,
  feedback_type TEXT,
  message TEXT NOT NULL CHECK (length(btrim(message)) >= 10 AND length(btrim(message)) <= 1000),
  reply_preference TEXT NOT NULL CHECK (reply_preference IN ('none', 'whatsapp_zalo', 'email')),
  contact TEXT CHECK (contact IS NULL OR length(btrim(contact)) <= 120),
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'vi')),
  route TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  ip_fp TEXT,
  idempotency_key TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Support outbox for n8n/Telegram dispatch notifications
CREATE TABLE IF NOT EXISTS public.support_outbox (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  ticket_ref TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'telegram',
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  attempts INT NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS: default private access only, no anonymous SELECT/list
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_outbox ENABLE ROW LEVEL SECURITY;

-- Anonymous and authenticated can ONLY insert validated tickets. No public read access.
CREATE POLICY "Public can insert support ticket"
  ON public.support_tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(message)) >= 10 AND length(btrim(message)) <= 1000
    AND category IN ('booking_lesson', 'website_problem', 'class_feedback', 'other')
    AND reply_preference IN ('none', 'whatsapp_zalo', 'email')
  );

GRANT ALL ON public.support_tickets TO service_role;
GRANT ALL ON public.support_outbox TO service_role;

CREATE TRIGGER support_tickets_set_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER support_outbox_set_updated_at
  BEFORE UPDATE ON public.support_outbox
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
