-- Fix: Grant anon role explicit access to read cars table
-- The previous fix used TO anon, authenticated but anon may lack USAGE on schema

-- 1. Grant schema usage to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant SELECT on cars table explicitly
GRANT SELECT ON public.cars TO anon, authenticated;

-- 3. Drop all existing read policies on cars to avoid conflicts
DROP POLICY IF EXISTS "public_read_cars" ON public.cars;
DROP POLICY IF EXISTS "anon_read_cars" ON public.cars;

-- 4. Create a clean, explicit SELECT policy for anon and authenticated
CREATE POLICY "cars_select_public"
ON public.cars
FOR SELECT
TO anon, authenticated
USING (true);
