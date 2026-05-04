"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ExpertSocialLinks = {
  linkedin_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
};

export type Expert = {
  id: string;
  name: string;
  slug: string;
  job_title: string | null;
  bio: string | null;
  avatar_url: string | null;
  social_links: ExpertSocialLinks | Record<string, unknown> | null;
  meta_title: string | null;
  meta_description: string | null;
  /** true ise robots noindex, sitemap dışı, Person JSON-LD yok. */
  seo_noindex: boolean;
  created_at: string;
  updated_at: string;
};

function normalizeExpert(row: Record<string, unknown>): Expert {
  const e = row as Expert;
  return {
    ...e,
    meta_title: typeof e.meta_title === "string" ? e.meta_title : null,
    meta_description: typeof e.meta_description === "string" ? e.meta_description : null,
    seo_noindex: e.seo_noindex === true,
  };
}

export type ExpertReviewedPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPublicExpertSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("experts").select("slug");
  if (error) throw error;
  return (data ?? []).map((r) => r.slug as string);
}

export async function getExperts(): Promise<Expert[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experts")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => normalizeExpert(row as Record<string, unknown>));
}

export const getExpertBySlug = cache(async (slug: string): Promise<Expert | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("experts").select("*").eq("slug", slug).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return normalizeExpert(data as Record<string, unknown>);
});

export async function getExpertById(id: string): Promise<Expert | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("experts").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return normalizeExpert(data as Record<string, unknown>);
}

export async function getPublishedPostsByReviewer(expertId: string): Promise<ExpertReviewedPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, content, meta_description, featured_image, featured_image_alt, category, created_at, updated_at"
    )
    .eq("reviewer_id", expertId)
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ExpertReviewedPost[];
}

type ExpertInput = {
  name: string;
  slug: string;
  job_title?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  social_links?: ExpertSocialLinks | null;
  meta_title?: string | null;
  meta_description?: string | null;
  seo_noindex?: boolean;
};

export async function createExpert(input: ExpertInput) {
  const supabase = await createClient();
  const social = input.social_links ?? {};
  const { error } = await supabase.from("experts").insert({
    name: input.name.trim(),
    slug: input.slug.trim(),
    job_title: input.job_title?.trim() || null,
    bio: input.bio ?? null,
    avatar_url: input.avatar_url?.trim() || null,
    social_links: social,
    meta_title: input.meta_title?.trim() || null,
    meta_description: input.meta_description?.trim() || null,
    seo_noindex: input.seo_noindex ?? false,
  });
  if (error) throw error;
  revalidatePath("/admin/experts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/", "layout");
  revalidatePath("/uzmanlar", "layout");
}

export async function updateExpert(input: ExpertInput & { id: string }) {
  const supabase = await createClient();
  const social = input.social_links ?? {};
  const { error } = await supabase
    .from("experts")
    .update({
      name: input.name.trim(),
      slug: input.slug.trim(),
      job_title: input.job_title?.trim() || null,
      bio: input.bio ?? null,
      avatar_url: input.avatar_url?.trim() || null,
      social_links: social,
      meta_title: input.meta_title?.trim() || null,
      meta_description: input.meta_description?.trim() || null,
      seo_noindex: input.seo_noindex ?? false,
    })
    .eq("id", input.id);
  if (error) throw error;
  revalidatePath("/admin/experts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/", "layout");
  revalidatePath("/uzmanlar", "layout");
  revalidatePath(`/uzmanlar/${input.slug}`);
}

export async function deleteExpert(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/experts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/", "layout");
  revalidatePath("/uzmanlar", "layout");
}
