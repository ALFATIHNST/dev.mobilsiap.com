-- MobilSiap: Direct car sale requests
-- Public submits a request to sell a car.
-- Admin/staff can review and update the request.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. TABLE
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.car_sale_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  owner_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,

  brand TEXT NOT NULL,
  car_type TEXT NOT NULL,
  year INTEGER NOT NULL,
  kilometer INTEGER NOT NULL,

  desired_price TEXT NOT NULL,
  description TEXT,

  photo_front TEXT,
  photo_back TEXT,
  photo_left TEXT,
  photo_right TEXT,
  photo_interior TEXT,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (
      status IN (
        'pending',
        'contacted',
        'inspection',
        'offer',
        'accepted',
        'rejected'
      )
    ),

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. INDEXES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_car_sale_requests_status
  ON public.car_sale_requests(status);

CREATE INDEX IF NOT EXISTS idx_car_sale_requests_created_at
  ON public.car_sale_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_car_sale_requests_whatsapp
  ON public.car_sale_requests(whatsapp);

CREATE INDEX IF NOT EXISTS idx_car_sale_requests_brand
  ON public.car_sale_requests(brand);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. UPDATED_AT
-- ─────────────────────────────────────────────────────────────────────────────

DROP TRIGGER IF EXISTS car_sale_requests_updated_at
  ON public.car_sale_requests;

CREATE TRIGGER car_sale_requests_updated_at
  BEFORE UPDATE ON public.car_sale_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. RLS
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.car_sale_requests ENABLE ROW LEVEL SECURITY;

-- Public can submit a request.
DROP POLICY IF EXISTS "public_insert_car_sale_requests"
  ON public.car_sale_requests;

CREATE POLICY "public_insert_car_sale_requests"
ON public.car_sale_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Admin/staff can read requests.
DROP POLICY IF EXISTS "admin_read_car_sale_requests"
  ON public.car_sale_requests;

CREATE POLICY "admin_read_car_sale_requests"
ON public.car_sale_requests
FOR SELECT
TO authenticated
USING (public.is_admin_or_staff());

-- Admin/staff can update request status/data.
DROP POLICY IF EXISTS "admin_update_car_sale_requests"
  ON public.car_sale_requests;

CREATE POLICY "admin_update_car_sale_requests"
ON public.car_sale_requests
FOR UPDATE
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. GRANTS
-- ─────────────────────────────────────────────────────────────────────────────

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT INSERT ON public.car_sale_requests TO anon;
GRANT SELECT, UPDATE ON public.car_sale_requests TO authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. STORAGE BUCKET
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('car-sale-photos', 'car-sale-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Public can upload car sale photos.
DROP POLICY IF EXISTS "public_upload_car_sale_photos"
  ON storage.objects;

CREATE POLICY "public_upload_car_sale_photos"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'car-sale-photos'
);

-- Public can read uploaded photos.
DROP POLICY IF EXISTS "public_read_car_sale_photos"
  ON storage.objects;

CREATE POLICY "public_read_car_sale_photos"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'car-sale-photos'
);

-- Admin/staff can delete photos.
DROP POLICY IF EXISTS "admin_delete_car_sale_photos"
  ON storage.objects;

CREATE POLICY "admin_delete_car_sale_photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'car-sale-photos'
  AND public.is_admin_or_staff()
);

