-- Fix RLS policy for cars table: grant SELECT to anon role explicitly
-- The previous policy used TO public which doesn't include anon in Supabase

DROP POLICY IF EXISTS "public_read_cars" ON public.cars;

CREATE POLICY "anon_read_cars"
ON public.cars
FOR SELECT
TO anon, authenticated
USING (true);
