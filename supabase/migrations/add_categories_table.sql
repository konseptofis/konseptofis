-- Blog yazıları için kategori listesi (admin'de eklenip çıkarılır)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can do all on categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public sadece okuyabilsin (blog sayfasında dropdown için)
CREATE POLICY "Public can read categories"
  ON public.categories FOR SELECT
  TO anon, public
  USING (true);
