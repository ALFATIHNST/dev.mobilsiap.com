-- MobilSiap: Cars inventory, consignment submissions, admin auth
-- Migration: 20260805202238_mobilsiap_init

-- ─── 1. ENUM TYPES ───────────────────────────────────────────────────────────
DROP TYPE IF EXISTS public.car_transmission CASCADE;
CREATE TYPE public.car_transmission AS ENUM ('Manual', 'Otomatis');

DROP TYPE IF EXISTS public.car_type CASCADE;
CREATE TYPE public.car_type AS ENUM ('MPV', 'SUV', 'Sedan', 'Hatchback', 'Pickup');

DROP TYPE IF EXISTS public.car_tax CASCADE;
CREATE TYPE public.car_tax AS ENUM ('Hidup', 'Mati');

DROP TYPE IF EXISTS public.consignment_status CASCADE;
CREATE TYPE public.consignment_status AS ENUM ('pending', 'reviewing', 'approved', 'rejected');

DROP TYPE IF EXISTS public.admin_role CASCADE;
CREATE TYPE public.admin_role AS ENUM ('admin', 'staff');

-- ─── 2. CORE TABLES ──────────────────────────────────────────────────────────

-- Admin profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  role public.admin_role DEFAULT 'staff'::public.admin_role,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Car inventory
CREATE TABLE IF NOT EXISTS public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  car_type TEXT NOT NULL,
  year INTEGER NOT NULL,
  transmission public.car_transmission NOT NULL DEFAULT 'Manual'::public.car_transmission,
  kilometer INTEGER NOT NULL DEFAULT 0,
  tax public.car_tax NOT NULL DEFAULT 'Hidup'::public.car_tax,
  price BIGINT NOT NULL DEFAULT 0,
  body_type public.car_type NOT NULL DEFAULT 'MPV'::public.car_type,
  color TEXT NOT NULL DEFAULT '',
  engine TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT 'Bandung',
  description TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  photos JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Consignment form submissions
CREATE TABLE IF NOT EXISTS public.consignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  brand TEXT NOT NULL,
  car_type TEXT NOT NULL,
  year INTEGER NOT NULL,
  kilometer INTEGER NOT NULL DEFAULT 0,
  desired_price TEXT NOT NULL,
  description TEXT,
  status public.consignment_status NOT NULL DEFAULT 'pending'::public.consignment_status,
  photo_front TEXT,
  photo_back TEXT,
  photo_left TEXT,
  photo_right TEXT,
  photo_interior TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ─── 3. INDEXES ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_cars_brand ON public.cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_body_type ON public.cars(body_type);
CREATE INDEX IF NOT EXISTS idx_cars_is_available ON public.cars(is_available);
CREATE INDEX IF NOT EXISTS idx_cars_price ON public.cars(price);
CREATE INDEX IF NOT EXISTS idx_consignments_status ON public.consignments(status);
CREATE INDEX IF NOT EXISTS idx_consignments_created_at ON public.consignments(created_at DESC);

-- ─── 4. FUNCTIONS ────────────────────────────────────────────────────────────

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- Create admin profile on auth user creation
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'staff')::public.admin_role
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
  SELECT 1 FROM public.admin_profiles ap
  WHERE ap.id = auth.uid()
  AND ap.role = 'admin'::public.admin_role
)
$$;

-- Check if current user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
  SELECT 1 FROM public.admin_profiles ap
  WHERE ap.id = auth.uid()
)
$$;

-- ─── 5. ENABLE RLS ───────────────────────────────────────────────────────────
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consignments ENABLE ROW LEVEL SECURITY;

-- ─── 6. RLS POLICIES ─────────────────────────────────────────────────────────

-- admin_profiles: own profile management
DROP POLICY IF EXISTS "admin_manage_own_profile" ON public.admin_profiles;
CREATE POLICY "admin_manage_own_profile"
ON public.admin_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- cars: public read, admin write
DROP POLICY IF EXISTS "public_read_cars" ON public.cars;
CREATE POLICY "public_read_cars"
ON public.cars
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "admin_manage_cars" ON public.cars;
CREATE POLICY "admin_manage_cars"
ON public.cars
FOR ALL
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());

-- consignments: public insert (form submissions), admin read/update
DROP POLICY IF EXISTS "public_insert_consignments" ON public.consignments;
CREATE POLICY "public_insert_consignments"
ON public.consignments
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_consignments" ON public.consignments;
CREATE POLICY "admin_read_consignments"
ON public.consignments
FOR SELECT
TO authenticated
USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "admin_update_consignments" ON public.consignments;
CREATE POLICY "admin_update_consignments"
ON public.consignments
FOR UPDATE
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());

-- ─── 7. TRIGGERS ─────────────────────────────────────────────────────────────
DROP TRIGGER IF EXISTS on_admin_user_created ON auth.users;
CREATE TRIGGER on_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

DROP TRIGGER IF EXISTS cars_updated_at ON public.cars;
CREATE TRIGGER cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS consignments_updated_at ON public.consignments;
CREATE TRIGGER consignments_updated_at
  BEFORE UPDATE ON public.consignments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── 8. STORAGE BUCKETS ──────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-photos',
  'car-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'consignment-photos',
  'consignment-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
DROP POLICY IF EXISTS "public_read_car_photos" ON storage.objects;
CREATE POLICY "public_read_car_photos"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'car-photos');

DROP POLICY IF EXISTS "admin_upload_car_photos" ON storage.objects;
CREATE POLICY "admin_upload_car_photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'car-photos' AND public.is_admin_or_staff());

DROP POLICY IF EXISTS "admin_delete_car_photos" ON storage.objects;
CREATE POLICY "admin_delete_car_photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'car-photos' AND public.is_admin_or_staff());

DROP POLICY IF EXISTS "public_read_consignment_photos" ON storage.objects;
CREATE POLICY "public_read_consignment_photos"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'consignment-photos');

DROP POLICY IF EXISTS "public_upload_consignment_photos" ON storage.objects;
CREATE POLICY "public_upload_consignment_photos"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'consignment-photos');

-- ─── 9. MOCK DATA ────────────────────────────────────────────────────────────
DO $$
DECLARE
  admin_uuid UUID := gen_random_uuid();
BEGIN
  -- Create admin user in auth.users
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
    is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
    recovery_token, recovery_sent_at, email_change_token_new, email_change,
    email_change_sent_at, email_change_token_current, email_change_confirm_status,
    reauthentication_token, reauthentication_sent_at, phone, phone_change,
    phone_change_token, phone_change_sent_at
  ) VALUES (
    admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'admin@mobilsiap.com', crypt('MobilSiap2024!', gen_salt('bf', 10)), now(), now(), now(),
    jsonb_build_object('full_name', 'Admin MobilSiap', 'role', 'admin'),
    jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
    false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert sample car inventory
  INSERT INTO public.cars (name, brand, car_type, year, transmission, kilometer, tax, price, body_type, color, engine, location, description, is_available, photos)
  VALUES
    ('Toyota Avanza', 'Toyota', 'Avanza G 1.5', 2022, 'Manual'::public.car_transmission, 35000, 'Hidup'::public.car_tax, 215000000, 'MPV'::public.car_type, 'Silver', '1.5L', 'Bandung', 'Toyota Avanza 2022 kondisi prima, terawat, pajak hidup panjang. Cocok untuk keluarga.', true,
     '[{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1397177f7-1769667422132.png","label":"Tampak Depan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1acb0ec21-1768368473469.png","label":"Tampak Belakang"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_140fd4689-1766504030229.png","label":"Samping Kiri"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_14e4b658b-1784295345667.png","label":"Samping Kanan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1d2e44c93-1766473626980.png","label":"Interior"}]'::jsonb),
    ('Honda CR-V', 'Honda', 'CR-V Turbo', 2021, 'Otomatis'::public.car_transmission, 42000, 'Hidup'::public.car_tax, 385000000, 'SUV'::public.car_type, 'Hitam', '1.5T', 'Bandung', 'Honda CR-V 2021 turbo, fitur lengkap, interior mewah, kondisi sangat baik.', true,
     '[{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png","label":"Tampak Depan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1547315c2-1772198942784.png","label":"Tampak Belakang"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_149d0cc56-1778237436945.png","label":"Samping Kiri"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1397177f7-1769667422132.png","label":"Samping Kanan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1acb0ec21-1768368473469.png","label":"Interior"}]'::jsonb),
    ('Mitsubishi Xpander', 'Mitsubishi', 'Xpander Ultimate', 2023, 'Otomatis'::public.car_transmission, 18000, 'Hidup'::public.car_tax, 285000000, 'MPV'::public.car_type, 'Putih', '1.5L', 'Bandung', 'Mitsubishi Xpander 2023 kilometer rendah, seperti baru, lengkap dokumen.', true,
     '[{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_14e4b658b-1784295345667.png","label":"Tampak Depan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1397177f7-1769667422132.png","label":"Tampak Belakang"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png","label":"Samping Kiri"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_140fd4689-1766504030229.png","label":"Samping Kanan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1d2e44c93-1766473626980.png","label":"Interior"}]'::jsonb),
    ('Toyota Fortuner', 'Toyota', 'Fortuner VRZ', 2020, 'Otomatis'::public.car_transmission, 65000, 'Hidup'::public.car_tax, 490000000, 'SUV'::public.car_type, 'Hitam', '2.4L', 'Bandung', 'Toyota Fortuner 2020 diesel, gagah, terawat, cocok untuk keluarga aktif.', true,
     '[{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1547315c2-1772198942784.png","label":"Tampak Depan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png","label":"Tampak Belakang"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_149d0cc56-1778237436945.png","label":"Samping Kiri"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1acb0ec21-1768368473469.png","label":"Samping Kanan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_140fd4689-1766504030229.png","label":"Interior"}]'::jsonb),
    ('Honda Brio', 'Honda', 'Brio RS CVT', 2023, 'Otomatis'::public.car_transmission, 12000, 'Hidup'::public.car_tax, 165000000, 'Hatchback'::public.car_type, 'Merah', '1.2L', 'Bandung', 'Honda Brio 2023 merah, lincah di kota, irit BBM, kilometer sangat rendah.', true,
     '[{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1d2e44c93-1766473626980.png","label":"Tampak Depan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_140fd4689-1766504030229.png","label":"Tampak Belakang"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_14e4b658b-1784295345667.png","label":"Samping Kiri"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1397177f7-1769667422132.png","label":"Samping Kanan"},{"src":"https://img.rocket.new/generatedImages/rocket_gen_img_1368ac357-1768369012782.png","label":"Interior"}]'::jsonb)
  ON CONFLICT (id) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;
