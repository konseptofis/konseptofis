-- Prod kontrol: posts.updated_at trigger ve set_updated_at fonksiyonu var mı?
-- Supabase Dashboard > SQL Editor'de çalıştırın (salt okunur).

-- 1) Fonksiyon
SELECT
  p.proname AS function_name,
  pg_get_functiondef(p.oid) AS definition
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname = 'set_updated_at';

-- 2) posts tablosundaki trigger
SELECT
  tgname AS trigger_name,
  tgtype,
  tgenabled,
  pg_get_triggerdef(t.oid) AS trigger_definition
FROM pg_trigger t
JOIN pg_class c ON c.oid = t.tgrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname = 'posts'
  AND NOT t.tgisinternal
ORDER BY tgname;

-- 3) posts.updated_at sütunu
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'posts'
  AND column_name = 'updated_at';

-- 4) reviewed_at sütunu (denetim migration'ı sonrası)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'posts'
  AND column_name = 'reviewed_at';
