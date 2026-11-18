CREATE TABLE public.help_ai_usage (
  day date NOT NULL,
  ip_hash text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (day, ip_hash)
);
GRANT ALL ON public.help_ai_usage TO service_role;
ALTER TABLE public.help_ai_usage ENABLE ROW LEVEL SECURITY;

-- Aggregate outcome counts only (no question text).
CREATE TABLE public.help_ai_outcomes (
  day date NOT NULL,
  outcome text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (day, outcome)
);
GRANT ALL ON public.help_ai_outcomes TO service_role;
ALTER TABLE public.help_ai_outcomes ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.help_ai_take(p_ip_hash text, p_user_cap int, p_global_cap int)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE d date := (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date; total int; mine int;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('help_ai_take'));
  SELECT coalesce(sum(count),0) INTO total FROM help_ai_usage WHERE day = d;
  IF total >= p_global_cap THEN RETURN 'global_cap'; END IF;
  SELECT count INTO mine FROM help_ai_usage WHERE day = d AND ip_hash = p_ip_hash;
  IF coalesce(mine,0) >= p_user_cap THEN RETURN 'user_cap'; END IF;
  INSERT INTO help_ai_usage(day, ip_hash, count) VALUES (d, p_ip_hash, 1)
    ON CONFLICT (day, ip_hash) DO UPDATE SET count = help_ai_usage.count + 1;
  RETURN 'ok';
END $$;

CREATE OR REPLACE FUNCTION public.help_ai_outcome(p_outcome text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO help_ai_outcomes(day, outcome, count) VALUES ((now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date, p_outcome, 1)
  ON CONFLICT (day, outcome) DO UPDATE SET count = help_ai_outcomes.count + 1;
$$;
REVOKE ALL ON FUNCTION public.help_ai_take(text,int,int) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.help_ai_outcome(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.help_ai_take(text,int,int) TO service_role;
GRANT EXECUTE ON FUNCTION public.help_ai_outcome(text) TO service_role;