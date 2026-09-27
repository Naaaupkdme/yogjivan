ALTER TABLE public.automation_settings
  ADD COLUMN IF NOT EXISTS fingerprint_key text NOT NULL DEFAULT encode(extensions.gen_random_bytes(32), 'hex');

CREATE TABLE IF NOT EXISTS public.lead_submission_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '30 days',
  outcome text NOT NULL,
  reason text,
  source text,
  ip_fp text,
  session_fp text,
  contact_fps text[] NOT NULL DEFAULT '{}',
  idem_key text,
  payload_hash text,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL
);
REVOKE ALL ON public.lead_submission_attempts FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.lead_submission_attempts TO service_role;
ALTER TABLE public.lead_submission_attempts ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS lsa_ip_accepted_idx ON public.lead_submission_attempts (ip_fp, created_at) WHERE outcome = 'accepted';
CREATE INDEX IF NOT EXISTS lsa_session_idx ON public.lead_submission_attempts (session_fp, created_at);
CREATE INDEX IF NOT EXISTS lsa_idem_idx ON public.lead_submission_attempts (idem_key);
CREATE INDEX IF NOT EXISTS lsa_contact_idx ON public.lead_submission_attempts USING gin (contact_fps);
CREATE INDEX IF NOT EXISTS lsa_expires_idx ON public.lead_submission_attempts (expires_at);

CREATE TABLE IF NOT EXISTS public.lead_submission_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ip_fp text NOT NULL,
  reason text NOT NULL,
  blocked_until timestamptz NOT NULL
);
REVOKE ALL ON public.lead_submission_blocks FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.lead_submission_blocks TO service_role;
ALTER TABLE public.lead_submission_blocks ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS lsb_ip_idx ON public.lead_submission_blocks (ip_fp, blocked_until);

DROP POLICY IF EXISTS "Anyone can insert a lead" ON public.leads;
CREATE POLICY "Anyone can insert a lead" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  (length(btrim(name)) >= 1) AND (length(btrim(name)) <= 120)
  AND (length(btrim(whatsapp)) >= 5) AND (length(btrim(whatsapp)) <= 40)
  AND ((email IS NULL) OR (length(email) <= 200))
  AND ((health_notes IS NULL) OR (length(health_notes) <= 1000))
  AND (status = ANY (ARRAY['micro_commit','goals','preferences','health','review']))
  AND (source = ANY (ARRAY['website','website_paid_online_yoga','mcp']))
);

CREATE OR REPLACE FUNCTION public.submit_lead_guarded(
  p_lead jsonb, p_ip_fp text, p_session_fp text, p_contact_fps text[],
  p_idem_key text, p_payload_hash text, p_now timestamptz DEFAULT now()
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_prev uuid; v_n int; v_id uuid;
  v_src text := p_lead->>'source';
  v_contacts text[] := coalesce(p_contact_fps, '{}');
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('yj_lead_submit'));

  IF length(btrim(coalesce(p_lead->>'name',''))) NOT BETWEEN 1 AND 120
     OR length(btrim(coalesce(p_lead->>'whatsapp',''))) NOT BETWEEN 5 AND 40
     OR length(coalesce(p_lead->>'email','')) > 200
     OR length(coalesce(p_lead->>'health_notes','')) > 1000
     OR v_src IS NULL OR v_src <> ALL (ARRAY['website','website_paid_online_yoga','mcp']) THEN
    INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, created_at, expires_at)
    VALUES ('invalid', 'db_validation', left(v_src, 40), p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, p_now, p_now + interval '30 days');
    RETURN jsonb_build_object('outcome', 'invalid');
  END IF;

  SELECT lead_id INTO v_prev FROM lead_submission_attempts
   WHERE outcome = 'accepted' AND created_at > p_now - interval '24 hours'
     AND ((p_idem_key IS NOT NULL AND idem_key = p_idem_key)
       OR (p_session_fp IS NOT NULL AND session_fp = p_session_fp AND payload_hash = p_payload_hash))
   ORDER BY created_at DESC LIMIT 1;
  IF FOUND THEN
    INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, lead_id, created_at, expires_at)
    VALUES ('duplicate_retry', 'idempotent', v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, v_prev, p_now, p_now + interval '30 days');
    RETURN jsonb_build_object('outcome', 'duplicate', 'lead_id', v_prev);
  END IF;

  IF p_ip_fp IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM lead_submission_blocks WHERE ip_fp = p_ip_fp AND blocked_until > p_now) THEN
      INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, created_at, expires_at)
      VALUES ('rate_limited', 'active_block', v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, p_now, p_now + interval '30 days');
      RETURN jsonb_build_object('outcome', 'rate_limited');
    END IF;
    SELECT count(*) INTO v_n FROM lead_submission_attempts
     WHERE ip_fp = p_ip_fp AND outcome = 'accepted' AND created_at > p_now - interval '15 minutes';
    IF v_n >= 5 THEN
      INSERT INTO lead_submission_blocks(ip_fp, reason, blocked_until, created_at) VALUES (p_ip_fp, 'ip_15m', p_now + interval '60 minutes', p_now);
      INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, created_at, expires_at)
      VALUES ('rate_limited', 'ip_15m', v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, p_now, p_now + interval '30 days');
      RETURN jsonb_build_object('outcome', 'rate_limited');
    END IF;
    SELECT count(*) INTO v_n FROM lead_submission_attempts
     WHERE ip_fp = p_ip_fp AND outcome = 'accepted' AND created_at > p_now - interval '24 hours';
    IF v_n >= 20 THEN
      INSERT INTO lead_submission_blocks(ip_fp, reason, blocked_until, created_at) VALUES (p_ip_fp, 'ip_24h', p_now + interval '24 hours', p_now);
      INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, created_at, expires_at)
      VALUES ('rate_limited', 'ip_24h', v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, p_now, p_now + interval '30 days');
      RETURN jsonb_build_object('outcome', 'rate_limited');
    END IF;
  END IF;

  IF p_session_fp IS NOT NULL THEN
    SELECT count(*) INTO v_n FROM lead_submission_attempts
     WHERE session_fp = p_session_fp AND outcome = 'accepted' AND created_at > p_now - interval '15 minutes';
    IF v_n >= 3 THEN
      INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, created_at, expires_at)
      VALUES ('rate_limited', 'session_15m', v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, p_now, p_now + interval '30 days');
      RETURN jsonb_build_object('outcome', 'rate_limited');
    END IF;
  END IF;

  IF cardinality(v_contacts) > 0 AND EXISTS (
    SELECT 1 FROM lead_submission_attempts
     WHERE outcome = 'accepted' AND created_at > p_now - interval '24 hours' AND contact_fps && v_contacts
  ) THEN
    INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, created_at, expires_at)
    VALUES ('already_received', 'contact_24h', v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, p_now, p_now + interval '30 days');
    RETURN jsonb_build_object('outcome', 'duplicate');
  END IF;

  INSERT INTO leads (name, whatsapp, email, goals, preferred_experience, preferred_time,
                     health_notes, health_tags, experience_level, status, source, session_id, meta)
  VALUES (
    btrim(p_lead->>'name'), btrim(p_lead->>'whatsapp'), nullif(p_lead->>'email', ''),
    coalesce(ARRAY(SELECT jsonb_array_elements_text(coalesce(p_lead->'goals', '[]'::jsonb))), '{}'),
    nullif(p_lead->>'preferred_experience', ''), nullif(p_lead->>'preferred_time', ''),
    nullif(p_lead->>'health_notes', ''),
    coalesce(ARRAY(SELECT jsonb_array_elements_text(coalesce(p_lead->'health_tags', '[]'::jsonb))), '{}'),
    nullif(p_lead->>'experience_level', ''), 'submitted', v_src,
    nullif(p_lead->>'session_id', '')::uuid, coalesce(p_lead->'meta', '{}'::jsonb)
  ) RETURNING id INTO v_id;

  INSERT INTO lead_submission_attempts(outcome, reason, source, ip_fp, session_fp, contact_fps, idem_key, payload_hash, lead_id, created_at, expires_at)
  VALUES ('accepted', NULL, v_src, p_ip_fp, p_session_fp, v_contacts, p_idem_key, p_payload_hash, v_id, p_now, p_now + interval '30 days');
  RETURN jsonb_build_object('outcome', 'accepted', 'lead_id', v_id);
END;
$$;
REVOKE ALL ON FUNCTION public.submit_lead_guarded(jsonb, text, text, text[], text, text, timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_lead_guarded(jsonb, text, text, text[], text, text, timestamptz) TO service_role;

SELECT cron.schedule(
  'lead-submission-attempts-cleanup', '17 3 * * *',
  $c$DELETE FROM public.lead_submission_attempts WHERE expires_at < now();
     DELETE FROM public.lead_submission_blocks WHERE blocked_until < now() - interval '1 day';$c$
);