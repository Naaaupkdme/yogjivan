ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS crm_status text,
  ADD COLUMN IF NOT EXISTS crm_status_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS crm_updated_by text;

CREATE TABLE public.lead_crm_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id text NOT NULL UNIQUE,
  lead_id uuid NOT NULL REFERENCES public.leads(id),
  crm_lead_id text NOT NULL,
  action text NOT NULL,
  note text,
  telegram_user_id text NOT NULL,
  telegram_chat_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.lead_crm_events TO service_role;
ALTER TABLE public.lead_crm_events ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.crm_apply_action(p_request_id text, p_crm_lead_id text, p_action text, p_note text, p_tg_user text, p_tg_chat text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_lead record; v_prev record; v_n int;
BEGIN
  SELECT e.*, l.crm_status, l.updated_at AS l_upd INTO v_prev
    FROM lead_crm_events e JOIN leads l ON l.id = e.lead_id WHERE e.request_id = p_request_id;
  IF FOUND THEN
    RETURN jsonb_build_object('outcome','duplicate','crm_lead_id',v_prev.crm_lead_id,'source_uuid',v_prev.lead_id,'status',v_prev.crm_status,'updated_at',v_prev.l_upd);
  END IF;
  SELECT count(*) INTO v_n FROM leads WHERE crm_lead_id = p_crm_lead_id;
  IF v_n <> 1 THEN RETURN jsonb_build_object('outcome','not_found'); END IF;
  IF p_action = 'Add Note' THEN
    UPDATE leads SET crm_updated_by = p_tg_user WHERE crm_lead_id = p_crm_lead_id RETURNING * INTO v_lead;
  ELSE
    UPDATE leads SET crm_status = p_action, crm_status_updated_at = now(), crm_updated_by = p_tg_user
      WHERE crm_lead_id = p_crm_lead_id RETURNING * INTO v_lead;
  END IF;
  INSERT INTO lead_crm_events(request_id, lead_id, crm_lead_id, action, note, telegram_user_id, telegram_chat_id)
  VALUES (p_request_id, v_lead.id, v_lead.crm_lead_id, p_action, p_note, p_tg_user, p_tg_chat);
  RETURN jsonb_build_object('outcome','updated','crm_lead_id',v_lead.crm_lead_id,'source_uuid',v_lead.id,'status',v_lead.crm_status,'updated_at',v_lead.updated_at);
END; $$;
REVOKE ALL ON FUNCTION public.crm_apply_action(text,text,text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.crm_apply_action(text,text,text,text,text,text) TO service_role;