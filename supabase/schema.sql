-- Bu dosya mevcut veritabanında tekrar çalıştırılabilir (policy'ler DROP IF EXISTS ile yenilenir).

-- ============================================
-- AŞAMA 1: Supabase Blog Admin - Veritabanı Şeması
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın.
-- ============================================

-- Posts tablosu
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Slug üzerinde indeks (liste ve tekil sorgular için)
CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_idx ON public.posts (slug);
CREATE INDEX IF NOT EXISTS posts_status_created_idx ON public.posts (status, created_at DESC);

-- updated_at otomatik güncelleme
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS (Row Level Security) - Admin paneli Supabase Auth ile korunacak; API üzerinden erişim için policy
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can do all on posts" ON public.posts;
CREATE POLICY "Authenticated users can do all on posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  TO anon, public
  USING (status = 'published');

-- ============================================
-- Storage: blog-images bucket (Dashboard'dan oluşturulabilir veya aşağıdaki SQL)
-- Not: Bucket oluşturma genelde Dashboard > Storage > New bucket ile yapılır.
-- Aşağıdaki policy'ler bucket adı 'blog-images' kabul eder.
-- ============================================

-- Bucket'ı SQL ile oluşturmak için (Supabase destekliyorsa):
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
CREATE POLICY "Authenticated users can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Public can read blog images" ON storage.objects;
CREATE POLICY "Public can read blog images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
CREATE POLICY "Authenticated users can update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images');

-- ============================================
-- Uzmanlar (E-E-A-T) — posts.reviewer_id
-- ============================================

CREATE TABLE IF NOT EXISTS public.experts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  job_title TEXT,
  bio TEXT,
  avatar_url TEXT,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  seo_noindex BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS experts_slug_idx ON public.experts (slug);

DROP TRIGGER IF EXISTS experts_updated_at ON public.experts;
CREATE TRIGGER experts_updated_at
  BEFORE UPDATE ON public.experts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can do all on experts" ON public.experts;
CREATE POLICY "Authenticated users can do all on experts"
  ON public.experts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read experts" ON public.experts;
CREATE POLICY "Public can read experts"
  ON public.experts FOR SELECT
  TO anon, public
  USING (true);

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS reviewer_id UUID REFERENCES public.experts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS posts_reviewer_id_idx ON public.posts (reviewer_id);
