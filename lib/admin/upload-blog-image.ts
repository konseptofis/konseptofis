import { createClient } from "@/lib/supabase/client";

export const BLOG_IMAGES_BUCKET = "blog-images";

/** Öne çıkan görsel ve editör içi görseller — aynı Supabase bucket. */
export async function uploadBlogImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from(BLOG_IMAGES_BUCKET).upload(name, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(data.path);
  return urlData.publicUrl;
}
