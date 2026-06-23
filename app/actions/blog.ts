"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Expert } from "@/app/actions/experts";
import { getCategoryBySlug } from "@/app/actions/categories";
import { normalizeCategoryKey } from "@/lib/category-utils";

export type FAQItem = { question: string; answer: string };

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
  featured_image_alt?: string | null;
  category?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  reviewed_at?: string | null;
  faqs?: FAQItem[] | null;
  reviewer_id?: string | null;
  reviewer?: Expert | null;
};

const POST_SELECT =
  "*, reviewer:experts(id, name, slug, job_title, bio, avatar_url, social_links, meta_title, meta_description, seo_noindex, created_at, updated_at)";

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select(POST_SELECT).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Post;
}

/** Sadece yayındaki yazıları döner (frontend liste için). */
export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

/** Kategori slug'ına göre yayınlanmış yazılar (posts.category ↔ categories.name, case-insensitive). */
export async function getPublishedPostsByCategory(categorySlug: string): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  const targetKey = normalizeCategoryKey(category.name);
  const posts = await getPublishedPosts();
  return posts.filter((post) => normalizeCategoryKey(post.category ?? "") === targetKey);
}

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Post;
});

type CreateInput = {
  title: string;
  slug: string;
  content?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  category?: string | null;
  status?: string;
  faqs?: FAQItem[] | null;
  reviewer_id?: string | null;
};

export async function createPost(input: CreateInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({
    title: input.title,
    slug: input.slug,
    content: input.content ?? null,
    meta_title: input.meta_title ?? null,
    meta_description: input.meta_description ?? null,
    featured_image: input.featured_image ?? null,
    featured_image_alt: input.featured_image_alt ?? null,
    category: input.category?.trim() || null,
    status: input.status ?? "draft",
    faqs: input.faqs ?? null,
    reviewer_id: input.reviewer_id && input.reviewer_id.length > 0 ? input.reviewer_id : null,
  });
  if (error) throw error;
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/${input.slug}`);
  revalidatePath("/[slug]", "page");
  revalidatePath(`/blog/${input.slug}`);
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/uzmanlar", "layout");
}

type UpdateInput = CreateInput & { id: string };

function revalidatePostPaths(slug: string, prevSlug?: string) {
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/${slug}`);
  revalidatePath("/[slug]", "page");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog/[slug]", "page");
  if (prevSlug && prevSlug !== slug) {
    revalidatePath(`/${prevSlug}`);
    revalidatePath(`/blog/${prevSlug}`);
  }
  revalidatePath("/sitemap.xml");
  revalidatePath("/uzmanlar", "layout");
}

export async function markPostReviewed(input: { id: string; reviewer_id: string }) {
  const supabase = await createClient();
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", input.id)
    .maybeSingle();
  if (fetchError) throw fetchError;
  if (!post?.slug) throw new Error("Yazı bulunamadı.");

  const { error } = await supabase
    .from("posts")
    .update({
      reviewer_id: input.reviewer_id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", input.id);
  if (error) throw error;

  revalidatePostPaths(post.slug as string);
}

export async function clearPostReview(id: string) {
  const supabase = await createClient();
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw fetchError;
  if (!post?.slug) throw new Error("Yazı bulunamadı.");

  const { error } = await supabase.from("posts").update({ reviewed_at: null }).eq("id", id);
  if (error) throw error;

  revalidatePostPaths(post.slug as string);
}

export async function updatePost(input: UpdateInput) {
  const supabase = await createClient();
  const { data: prev } = await supabase.from("posts").select("slug").eq("id", input.id).maybeSingle();
  const prevSlug = prev?.slug as string | undefined;

  const { error } = await supabase
    .from("posts")
    .update({
      title: input.title,
      slug: input.slug,
      content: input.content ?? null,
      meta_title: input.meta_title ?? null,
      meta_description: input.meta_description ?? null,
      featured_image: input.featured_image ?? null,
      featured_image_alt: input.featured_image_alt ?? null,
      category: input.category?.trim() || null,
      status: input.status ?? "draft",
      faqs: input.faqs ?? null,
      reviewer_id: input.reviewer_id && input.reviewer_id.length > 0 ? input.reviewer_id : null,
    })
    .eq("id", input.id);
  if (error) throw error;
  revalidatePostPaths(input.slug, prevSlug);
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { data: row } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
  const slug = row?.slug as string | undefined;
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  if (slug) {
    revalidatePath(`/${slug}`);
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/uzmanlar", "layout");
}
