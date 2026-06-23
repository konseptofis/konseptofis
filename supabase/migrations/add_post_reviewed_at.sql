-- Yazı denetim tarihi (uzman incelemesi tamamlandığında set edilir).
-- reviewer_id zaten posts tablosunda (add_experts_and_reviewer.sql).

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

COMMENT ON COLUMN public.posts.reviewed_at IS
  'İçeriğin atanan uzman tarafından denetlendiği tarih; admin Denetle ile set edilir.';
