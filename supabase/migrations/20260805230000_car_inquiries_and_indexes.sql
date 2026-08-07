-- MobilSiap: Car inquiries table + additional indexes for performance
-- Migration: 20260805230000_car_inquiries_and_indexes

-- ─── 1. ADDITIONAL INDEXES ON CARS ───────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_cars_transmission ON public.cars(transmission);
CREATE INDEX IF NOT EXISTS idx_cars_year ON public.cars(year DESC);
CREATE INDEX IF NOT EXISTS idx_cars_kilometer ON public.cars(kilometer);
CREATE INDEX IF NOT EXISTS idx_cars_available_brand ON public.cars(is_available, brand);
CREATE INDEX IF NOT EXISTS idx_cars_available_price ON public.cars(is_available, price);
CREATE INDEX IF NOT EXISTS idx_cars_available_transmission ON public.cars(is_available, transmission);
CREATE INDEX IF NOT EXISTS idx_cars_created_at ON public.cars(created_at DESC);

-- ─── 2. CAR INQUIRIES TABLE ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.car_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  car_name TEXT NOT NULL,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('test_drive', 'purchase')),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ─── 3. INDEXES ON INQUIRIES ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_car_inquiries_car_id ON public.car_inquiries(car_id);
CREATE INDEX IF NOT EXISTS idx_car_inquiries_status ON public.car_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_car_inquiries_created_at ON public.car_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_car_inquiries_type ON public.car_inquiries(inquiry_type);

-- ─── 4. UPDATED_AT TRIGGER ───────────────────────────────────────────────────
DROP TRIGGER IF EXISTS car_inquiries_updated_at ON public.car_inquiries;
CREATE TRIGGER car_inquiries_updated_at
  BEFORE UPDATE ON public.car_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── 5. ENABLE RLS ───────────────────────────────────────────────────────────
ALTER TABLE public.car_inquiries ENABLE ROW LEVEL SECURITY;

-- ─── 6. RLS POLICIES ─────────────────────────────────────────────────────────

-- Public can insert inquiries (form submissions)
DROP POLICY IF EXISTS "public_insert_car_inquiries" ON public.car_inquiries;
CREATE POLICY "public_insert_car_inquiries"
ON public.car_inquiries
FOR INSERT
TO public
WITH CHECK (true);

-- Admin/staff can read all inquiries
DROP POLICY IF EXISTS "admin_read_car_inquiries" ON public.car_inquiries;
CREATE POLICY "admin_read_car_inquiries"
ON public.car_inquiries
FOR SELECT
TO authenticated
USING (public.is_admin_or_staff());

-- Admin/staff can update inquiry status
DROP POLICY IF EXISTS "admin_update_car_inquiries" ON public.car_inquiries;
CREATE POLICY "admin_update_car_inquiries"
ON public.car_inquiries
FOR UPDATE
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());
