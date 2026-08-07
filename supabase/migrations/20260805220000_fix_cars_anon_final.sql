-- Final fix: Ensure anon role can read cars table
-- Root cause: Supabase requires explicit GRANT on schema + table for anon role
-- even when RLS policy exists. Previous migrations may not have persisted grants.

-- Step 1: Ensure anon and authenticated have schema usage
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Step 2: Explicitly grant SELECT on cars to anon role
GRANT SELECT ON public.cars TO anon;
GRANT SELECT ON public.cars TO authenticated;

-- Step 3: Drop ALL existing SELECT/read policies on cars to start clean
DROP POLICY IF EXISTS "public_read_cars" ON public.cars;
DROP POLICY IF EXISTS "anon_read_cars" ON public.cars;
DROP POLICY IF EXISTS "cars_select_public" ON public.cars;

-- Step 4: Ensure RLS is enabled
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Step 5: Create a single, clean SELECT policy using anon + authenticated
DROP POLICY IF EXISTS "cars_anon_select" ON public.cars;
CREATE POLICY "cars_anon_select"
ON public.cars
FOR SELECT
TO anon, authenticated
USING (true);

-- Step 6: Keep admin write policy intact (drop and recreate to be safe)
DROP POLICY IF EXISTS "admin_manage_cars" ON public.cars;
CREATE POLICY "admin_manage_cars"
ON public.cars
FOR ALL
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());
