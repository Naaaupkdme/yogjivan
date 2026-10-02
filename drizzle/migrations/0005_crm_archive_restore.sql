ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS archived boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz;

CREATE OR REPLACE FUNCTION public.crm_apply_action(p_request_id text, p_crm_lead_id text, p_action text, p_note text, p_tg_user text, p_tg_chat text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_lead record; v_prev record; v_n int; v_note text := p_note;
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
  ELSIF p_action = 'Archive Lead' THEN
    UPDATE leads SET archived = true, archived_at = now(), crm_updated_by = p_tg_user
      WHERE crm_lead_id = p_crm_lead_id RETURNING * INTO v_lead;
    v_note := 'Archived: ' || coalesce(p_note, '');
  ELSIF p_action = 'Restore Lead' THEN
    UPDATE leads SET archived = false, archived_at = NULL, crm_updated_by = p_tg_user
      WHERE crm_lead_id = p_crm_lead_id RETURNING * INTO v_lead;
    v_note := 'Lead Restored';
  ELSE
    UPDATE leads SET crm_status = p_action, crm_status_updated_at = now(), crm_updated_by = p_tg_user
      WHERE crm_lead_id = p_crm_lead_id RETURNING * INTO v_lead;
  END IF;
  INSERT INTO lead_crm_events(request_id, lead_id, crm_lead_id, action, note, telegram_user_id, telegram_chat_id)
  VALUES (p_request_id, v_lead.id, v_lead.crm_lead_id, p_action, v_note, p_tg_user, p_tg_chat);
  RETURN jsonb_build_object('outcome','updated','crm_lead_id',v_lead.crm_lead_id,'source_uuid',v_lead.id,'status',v_lead.crm_status,'updated_at',v_lead.updated_at);
END; $$;
REVOKE ALL ON FUNCTION public.crm_apply_action(text,text,text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.crm_apply_action(text,text,text,text,text,text) TO service_role;