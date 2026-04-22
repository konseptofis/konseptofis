-- posts tablosuna category sütunu (opsiyonel, boş bırakılabilir)
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS category TEXT;
