DROP POLICY "Anyone can insert a lead" ON public.leads;

CREATE POLICY "Anyone can insert a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (length(btrim(name)) >= 1 AND length(btrim(name)) <= 120)
  AND (length(btrim(whatsapp)) >= 5 AND length(btrim(whatsapp)) <= 40)
  AND (email IS NULL OR length(email) <= 200)
  AND (health_notes IS NULL OR length(health_notes) <= 1000)
  AND (status = ANY (ARRAY['micro_commit','goals','preferences','health','review','submitted']))
  AND (source = ANY (ARRAY['website','website_paid_online_yoga']))
);