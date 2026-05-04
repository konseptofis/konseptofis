-- Uzman detay SEO: başlık, açıklama, opsiyonel arama indeksinden çıkarma

ALTER TABLE public.experts
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_noindex BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.experts.meta_title IS 'Sayfa başlığı (ör. Google sonuç); boşsa isim + unvan kullanılır.';
COMMENT ON COLUMN public.experts.meta_description IS 'Meta açıklama; boşsa biyografiden türetilir.';
COMMENT ON COLUMN public.experts.seo_noindex IS 'true ise robots noindex; sitemap dışı bırakılır.';
