DROP POLICY IF EXISTS "Anyone can insert a lead" ON public.leads;
CREATE POLICY "Anyone can insert a lead" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 120
  AND length(btrim(whatsapp)) BETWEEN 5 AND 40
  AND (email IS NULL OR length(email) <= 200)
  AND (health_notes IS NULL OR length(health_notes) <= 1000)
  AND status IN ('micro_commit','goals','preferences','health','review','submitted')
  AND source = 'website'
);