CREATE SEQUENCE IF NOT EXISTS public.lead_crm_seq AS bigint START 1 MINVALUE 1;
REVOKE ALL ON SEQUENCE public.lead_crm_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE public.lead_crm_seq FROM anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.lead_crm_seq TO service_role;

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS crm_lead_id text,
  ADD COLUMN IF NOT EXISTS phone_original text,
  ADD COLUMN IF NOT EXISTS country_code text,
  ADD COLUMN IF NOT EXISTS mobile_number text,
  ADD COLUMN IF NOT EXISTS whatsapp_full_number text,
  ADD COLUMN IF NOT EXISTS phone_validation text,
  ADD COLUMN IF NOT EXISTS phone_normalized_at timestamptz,
  ADD COLUMN IF NOT EXISTS health_present boolean
    GENERATED ALWAYS AS (
      coalesce(length(btrim(health_notes)), 0) > 0 OR coalesce(cardinality(health_tags), 0) > 0
    ) STORED;

CREATE OR REPLACE FUNCTION public.format_crm_lead_id(n bigint)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT 'YJ-WEB-' || CASE WHEN n < 10000 THEN lpad(n::text, 4, '0') ELSE n::text END
$$;

UPDATE public.leads l SET crm_lead_id = m.crm, phone_original = coalesce(l.phone_original, l.whatsapp)
FROM (VALUES
  ('601cee78-e338-4ed2-a4c4-36872ef4a045'::uuid, 'YJ-WEB-0001'),
  ('ae314faf-2b96-4c1b-8350-f2b4f0b1eb79'::uuid, 'YJ-WEB-0002'),
  ('9c6c5a8a-6ccf-41ff-978c-8744d02b0693'::uuid, 'YJ-WEB-0003'),
  ('6b72cdb1-23c4-4706-822e-386eaa627e79'::uuid, 'YJ-WEB-0004'),
  ('60a5ac2c-69be-4221-90e5-ded00f0a471f'::uuid, 'YJ-WEB-0005'),
  ('6b1a895c-9107-4995-878e-84c9c144d999'::uuid, 'YJ-WEB-0006')
) AS m(id, crm) WHERE l.id = m.id;

SELECT setval('public.lead_crm_seq', GREATEST(6, (SELECT count(*) FROM public.leads)), true);

CREATE UNIQUE INDEX IF NOT EXISTS leads_crm_lead_id_key ON public.leads (crm_lead_id);

CREATE OR REPLACE FUNCTION public.leads_before_insert_guard()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.crm_lead_id := public.format_crm_lead_id(nextval('public.lead_crm_seq'));
  NEW.phone_original := NEW.whatsapp;
  NEW.country_code := NULL;
  NEW.mobile_number := NULL;
  NEW.whatsapp_full_number := NULL;
  NEW.phone_validation := 'pending';
  NEW.phone_normalized_at := NULL;
  NEW.created_at := now();
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.leads_before_insert_guard() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS leads_before_insert_guard ON public.leads;
CREATE TRIGGER leads_before_insert_guard BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.leads_before_insert_guard();

DROP POLICY IF EXISTS "Anyone can insert a lead" ON public.leads;
CREATE POLICY "Anyone can insert a lead" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  (length(btrim(name)) >= 1) AND (length(btrim(name)) <= 120)
  AND (length(btrim(whatsapp)) >= 5) AND (length(btrim(whatsapp)) <= 40)
  AND ((email IS NULL) OR (length(email) <= 200))
  AND ((health_notes IS NULL) OR (length(health_notes) <= 1000))
  AND (status = ANY (ARRAY['micro_commit','goals','preferences','health','review','submitted']))
  AND (source = ANY (ARRAY['website','website_paid_online_yoga','mcp']))
);

CREATE TABLE IF NOT EXISTS public.automation_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  telegram_enabled boolean NOT NULL DEFAULT false,
  telegram_chat_id text,
  sheet_enabled boolean NOT NULL DEFAULT false,
  spreadsheet_id text,
  sheet_tab text,
  sheet_gid bigint,
  dispatch_token text NOT NULL DEFAULT encode(extensions.gen_random_bytes(32), 'hex'),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.automation_settings TO service_role;
ALTER TABLE public.automation_settings ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.automation_locks (
  name text PRIMARY KEY,
  owner text NOT NULL,
  expires_at timestamptz NOT NULL
);
GRANT ALL ON public.automation_locks TO service_role;
ALTER TABLE public.automation_locks ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.lead_outbox (
  lead_id uuid PRIMARY KEY REFERENCES public.leads(id) ON DELETE CASCADE,
  crm_lead_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  prepared_at timestamptz,
  reply_text text,
  payload jsonb,
  sheet_status text NOT NULL DEFAULT 'pending'
    CHECK (sheet_status IN ('pending','processing','retry','sent','failed')),
  sheet_retry_count int NOT NULL DEFAULT 0,
  sheet_last_error text,
  sheet_next_attempt_at timestamptz NOT NULL DEFAULT now(),
  sheet_lease_owner text,
  sheet_lease_until timestamptz,
  sheet_row int,
  sheet_synced_at timestamptz,
  telegram_status text NOT NULL DEFAULT 'pending'
    CHECK (telegram_status IN ('pending','processing','retry','sent','failed','uncertain')),
  telegram_retry_count int NOT NULL DEFAULT 0,
  telegram_last_error text,
  telegram_next_attempt_at timestamptz NOT NULL DEFAULT now(),
  telegram_lease_owner text,
  telegram_lease_until timestamptz,
  telegram_message_id bigint,
  telegram_sent_at timestamptz
);
GRANT ALL ON public.lead_outbox TO service_role;
ALTER TABLE public.lead_outbox ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS lead_outbox_sheet_due ON public.lead_outbox (sheet_status, sheet_next_attempt_at);
CREATE INDEX IF NOT EXISTS lead_outbox_tg_due ON public.lead_outbox (telegram_status, telegram_next_attempt_at);

CREATE OR REPLACE FUNCTION public.try_automation_lock(p_name text, p_owner text, p_seconds int)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE got text;
BEGIN
  INSERT INTO public.automation_locks(name, owner, expires_at)
  VALUES (p_name, p_owner, now() + make_interval(secs => p_seconds))
  ON CONFLICT (name) DO UPDATE SET owner = EXCLUDED.owner, expires_at = EXCLUDED.expires_at
    WHERE public.automation_locks.expires_at < now() OR public.automation_locks.owner = EXCLUDED.owner
  RETURNING owner INTO got;
  RETURN got IS NOT NULL AND got = p_owner;
END;
$$;

CREATE OR REPLACE FUNCTION public.release_automation_lock(p_name text, p_owner text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  DELETE FROM public.automation_locks WHERE name = p_name AND owner = p_owner;
$$;

CREATE OR REPLACE FUNCTION public.recover_lead_outbox_leases()
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.lead_outbox SET sheet_status = 'retry', sheet_lease_owner = NULL, sheet_lease_until = NULL,
    sheet_last_error = 'lease expired', updated_at = now()
  WHERE sheet_status = 'processing' AND sheet_lease_until < now();
  UPDATE public.lead_outbox SET telegram_status = 'uncertain', telegram_lease_owner = NULL, telegram_lease_until = NULL,
    telegram_last_error = 'lease expired mid-send: manual reconcile', updated_at = now()
  WHERE telegram_status = 'processing' AND telegram_lease_until < now();
$$;

CREATE OR REPLACE FUNCTION public.claim_lead_outbox(p_channel text, p_owner text, p_limit int DEFAULT 10, p_lease_seconds int DEFAULT 120)
RETURNS SETOF public.lead_outbox LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF p_channel = 'sheet' THEN
    RETURN QUERY
    UPDATE public.lead_outbox o
       SET sheet_status = 'processing', sheet_lease_owner = p_owner,
           sheet_lease_until = now() + make_interval(secs => p_lease_seconds), updated_at = now()
     WHERE o.lead_id IN (
       SELECT x.lead_id FROM public.lead_outbox x
        WHERE x.prepared_at IS NOT NULL AND x.sheet_status IN ('pending','retry') AND x.sheet_next_attempt_at <= now()
        ORDER BY x.created_at LIMIT p_limit FOR UPDATE SKIP LOCKED)
    RETURNING o.*;
  ELSIF p_channel = 'telegram' THEN
    RETURN QUERY
    UPDATE public.lead_outbox o
       SET telegram_status = 'processing', telegram_lease_owner = p_owner,
           telegram_lease_until = now() + make_interval(secs => p_lease_seconds), updated_at = now()
     WHERE o.lead_id IN (
       SELECT x.lead_id FROM public.lead_outbox x
        WHERE x.prepared_at IS NOT NULL AND x.telegram_status IN ('pending','retry') AND x.telegram_next_attempt_at <= now()
        ORDER BY x.created_at LIMIT p_limit FOR UPDATE SKIP LOCKED)
    RETURNING o.*;
  ELSE
    RAISE EXCEPTION 'unknown channel %', p_channel;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.try_automation_lock(text,text,int) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_automation_lock(text,text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.recover_lead_outbox_leases() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.claim_lead_outbox(text,text,int,int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.try_automation_lock(text,text,int) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_automation_lock(text,text) TO service_role;
GRANT EXECUTE ON FUNCTION public.recover_lead_outbox_leases() TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_lead_outbox(text,text,int,int) TO service_role;

-- Wake the dispatcher. Auth token lives in the service-only automation_settings row.
CREATE OR REPLACE FUNCTION public.lead_outbox_wake()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE tok text;
BEGIN
  SELECT dispatch_token INTO tok FROM public.automation_settings WHERE id = 1;
  IF tok IS NULL THEN RETURN; END IF;
  PERFORM net.http_post(
    url := 'https://project--fb15e133-c4b9-4ec2-944e-9a89ea90823d.lovable.app/api/public/leads/dispatch',
    headers := jsonb_build_object('Content-Type', 'application/json', 'X-Dispatch-Token', tok),
    body := '{}'::jsonb,
    timeout_milliseconds := 10000
  );
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'lead_outbox_wake failed: %', SQLERRM;
END;
$$;
REVOKE ALL ON FUNCTION public.lead_outbox_wake() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.lead_outbox_wake() TO service_role;

CREATE OR REPLACE FUNCTION public.leads_enqueue_outbox()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'submitted' AND (TG_OP = 'INSERT' OR OLD.status IS DISTINCT FROM 'submitted') THEN
    INSERT INTO public.lead_outbox(lead_id, crm_lead_id) VALUES (NEW.id, NEW.crm_lead_id)
    ON CONFLICT (lead_id) DO NOTHING;
    PERFORM public.lead_outbox_wake();
  END IF;
  RETURN NULL;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'leads_enqueue_outbox failed (lead preserved): %', SQLERRM;
  RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.leads_enqueue_outbox() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS leads_enqueue_outbox_ins ON public.leads;
CREATE TRIGGER leads_enqueue_outbox_ins AFTER INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.leads_enqueue_outbox();
DROP TRIGGER IF EXISTS leads_enqueue_outbox_upd ON public.leads;
CREATE TRIGGER leads_enqueue_outbox_upd AFTER UPDATE OF status ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.leads_enqueue_outbox();

CREATE TABLE IF NOT EXISTS public.whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  intent text NOT NULL,
  cta_location text,
  page_path text,
  consent text,
  session_id uuid,
  landing_path text,
  referrer_host text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  gclid text, fbclid text,
  market text,
  timezone text,
  device_type text
);
GRANT ALL ON public.whatsapp_clicks TO service_role;
ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS whatsapp_clicks_session ON public.whatsapp_clicks (session_id);
