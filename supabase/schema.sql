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

-- Authenticated kullanıcılar (admin) tüm CRUD yapabilsin
CREATE POLICY "Authenticated users can do all on posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anonim/Public: Sadece published yazıları okuyabilsin (blog sayfası için)
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

-- blog-images: Authenticated kullanıcılar yükleyebilsin
CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- blog-images: Authenticated kullanıcılar silebilsin
CREATE POLICY "Authenticated users can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');

-- blog-images: Herkes (public) okuyabilsin (yayında görseller için)
CREATE POLICY "Public can read blog images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'blog-images');

-- blog-images: Authenticated kullanıcılar güncelleyebilsin
CREATE POLICY "Authenticated users can update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images');
