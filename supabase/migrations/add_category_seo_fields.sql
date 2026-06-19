-- Kategori arşiv sayfaları için SEO meta alanları

ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT;

COMMENT ON COLUMN public.categories.meta_title IS 'Kategori arşiv sayfası başlığı; boşsa "[Ad] - Konsept Ofis Blog" kullanılır.';
COMMENT ON COLUMN public.categories.meta_description IS 'Kategori arşiv meta açıklaması; boşsa varsayılan cümle kullanılır.';
