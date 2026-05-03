-- Uzmanlar (E-E-A-T) + yazılarda reviewer ilişkisi
CREATE TABLE IF NOT EXISTS public.experts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  job_title TEXT,
  bio TEXT,
  avatar_url TEXT,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
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
