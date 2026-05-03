-- Politikalar zaten varsa tekrar CREATE hatası vermesin.
-- Sadece "42710 policy already exists" aldıysanız bu dosyayı çalıştırıp ardından migration'ın kalanını çalıştırabilirsiniz.

DROP POLICY IF EXISTS "Authenticated users can do all on experts" ON public.experts;
DROP POLICY IF EXISTS "Public can read experts" ON public.experts;

CREATE POLICY "Authenticated users can do all on experts"
  ON public.experts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read experts"
  ON public.experts FOR SELECT
  TO anon, public
  USING (true);
