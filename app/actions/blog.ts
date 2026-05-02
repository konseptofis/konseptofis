"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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
  faqs?: FAQItem[] | null;
};

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
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
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Post;
}

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
    category: input.category?.trim() || null,
    status: input.status ?? "draft",
    faqs: input.faqs ?? null,
  });
  if (error) throw error;
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

type UpdateInput = CreateInput & { id: string };

export async function updatePost(input: UpdateInput) {
  const supabase = await createClient();
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
    })
    .eq("id", input.id);
  if (error) throw error;
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
}
