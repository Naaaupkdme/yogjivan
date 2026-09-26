-- lovable-cron-fallback-reviewed: wake-on-enqueue is primary; this 1-minute retry job is armed only while retryable rows exist for enabled channels and unschedules itself after drain.
CREATE OR REPLACE FUNCTION public.lead_outbox_retry_tick()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE s record; has_work boolean;
BEGIN
  SELECT telegram_enabled, sheet_enabled INTO s FROM public.automation_settings WHERE id = 1;
  SELECT EXISTS (
    SELECT 1 FROM public.lead_outbox o
     WHERE o.prepared_at IS NULL
        OR (coalesce(s.sheet_enabled, false) AND o.sheet_status IN ('pending','retry','processing'))
        OR (coalesce(s.telegram_enabled, false) AND o.telegram_status IN ('pending','retry','processing'))
  ) INTO has_work;
  IF NOT has_work THEN
    PERFORM pg_catalog.pg_advisory_xact_lock(7700000000000042);
    BEGIN
      PERFORM cron.unschedule('lead-outbox-retry');
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    RETURN;
  END IF;
  PERFORM public.lead_outbox_wake();
END;
$$;

CREATE OR REPLACE FUNCTION public.lead_outbox_arm_retry()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  PERFORM pg_catalog.pg_advisory_xact_lock(7700000000000042);
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'lead-outbox-retry') THEN
    PERFORM cron.schedule('lead-outbox-retry', '1 minute', $c$ SELECT public.lead_outbox_retry_tick(); $c$);
  END IF;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'lead_outbox_arm_retry failed: %', SQLERRM;
END;
$$;

REVOKE ALL ON FUNCTION public.lead_outbox_retry_tick() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.lead_outbox_arm_retry() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.lead_outbox_retry_tick() TO service_role;
GRANT EXECUTE ON FUNCTION public.lead_outbox_arm_retry() TO service_role;
