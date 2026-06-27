
DROP POLICY IF EXISTS "Anyone can update a lead row (by knowing its id)" ON public.leads;
REVOKE UPDATE ON public.leads FROM anon;
REVOKE UPDATE ON public.leads FROM authenticated;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS session_id UUID;
CREATE INDEX IF NOT EXISTS leads_session_id_idx ON public.leads(session_id);
