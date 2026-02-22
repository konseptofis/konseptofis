-- Fiyatlar sayfası kartları için tablo (Supabase SQL Editor'de çalıştırın)
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  period TEXT NOT NULL DEFAULT 'aylık',
  kdv TEXT NOT NULL DEFAULT '+ KDV',
  features JSONB NOT NULL DEFAULT '[]',
  order_index INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS pricing_plans_order_idx ON public.pricing_plans (order_index);

ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can do all on pricing_plans" ON public.pricing_plans;
CREATE POLICY "Authenticated users can do all on pricing_plans"
  ON public.pricing_plans FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read pricing_plans" ON public.pricing_plans;
CREATE POLICY "Public can read pricing_plans"
  ON public.pricing_plans FOR SELECT TO anon, public USING (true);

-- Varsayılan 3 kart (sadece tablo boşsa ekler)
INSERT INTO public.pricing_plans (title, price, period, kdv, features, order_index)
SELECT t.title, t.price, t.period, t.kdv, t.features, t.order_index
FROM (VALUES
  ('Sanal Ofis'::text, '800'::text, 'aylık'::text, '+ KDV'::text, '["Yasal Adres","Posta, Kargo ve Tebligat Takibi","Profesyonel Telefon Hattı*","Prestijli Lokasyon","Stopaj Ödemesiz","Aidat Ödemesiz","Fatura Ödemesiz"]'::jsonb, 0),
  ('Makam Odası'::text, '300'::text, 'saatlik'::text, '+ KDV'::text, '["Birinci Sınıf Mobilyalar","Yüksek Hızlı Fiber İnternet","Mutfak Kullanımı","Yazıcı Kullanımı","Misafir Karşılama","Güvenlikli Giriş"]'::jsonb, 1),
  ('Toplantı Odası'::text, '300'::text, 'saatlik'::text, '+ KDV'::text, '["Birinci Sınıf Mobilyalar","Yüksek Hızlı Fiber İnternet","Mutfak Kullanımı","Yazıcı Kullanımı","Projeksiyon Kullanımı","Misafir Karşılama","Güvenlikli Giriş"]'::jsonb, 2)
) AS t(title, price, period, kdv, features, order_index)
WHERE (SELECT COUNT(*) FROM public.pricing_plans) = 0;
