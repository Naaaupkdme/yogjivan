REVOKE ALL ON public.lead_outbox FROM anon, authenticated;
REVOKE ALL ON public.whatsapp_clicks FROM anon, authenticated;
REVOKE ALL ON public.automation_settings FROM anon, authenticated;
REVOKE ALL ON public.automation_locks FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.format_crm_lead_id(bigint) FROM anon, authenticated;
