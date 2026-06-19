"use server";



import { cache } from "react";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { toSlug } from "@/lib/slug";

import type { SupabaseClient } from "@supabase/supabase-js";



export type Category = {

  id: string;

  name: string;

  slug: string;

  meta_title?: string | null;

  meta_description?: string | null;

  created_at: string;

};



export type CategoryInput = {

  name: string;

  meta_title?: string | null;

  meta_description?: string | null;

};



export type UpdateCategoryInput = {

  id: string;

  meta_title?: string | null;

  meta_description?: string | null;

};



export type CategoryActionResult = { ok: true } | { ok: false; error: string };



type DbError = { message: string; code?: string };



const CATEGORY_SELECT =

  "id, name, slug, meta_title, meta_description, created_at";



function formatDbError(error: DbError): string {

  if (error.code === "42501") {

    return "Bu işlem için yetkiniz yok. Lütfen admin paneline tekrar giriş yapın.";

  }

  if (error.code === "23505") {

    return "Bu isimde veya slug'da bir kategori zaten var.";

  }

  if (error.code === "42P01") {

    return "Kategoriler tablosu bulunamadı. Supabase migration dosyasını çalıştırın.";

  }

  return error.message || "Veritabanı hatası oluştu.";

}



function revalidateCategoryPaths(slug?: string) {

  revalidatePath("/admin/categories");

  revalidatePath("/admin/posts");

  revalidatePath("/admin/posts/new");

  revalidatePath("/blog");

  revalidatePath("/kategori", "layout");

  if (slug) {

    revalidatePath(`/kategori/${slug}`);

  }

}



async function uniqueCategorySlug(

  supabase: SupabaseClient,

  name: string

): Promise<string> {

  const base = toSlug(name) || "kategori";

  let slug = base;

  let suffix = 2;



  while (true) {

    const { data } = await supabase

      .from("categories")

      .select("id")

      .eq("slug", slug)

      .maybeSingle();

    if (!data) return slug;

    slug = `${base}-${suffix}`;

    suffix += 1;

  }

}



export const getCategories = cache(async (): Promise<Category[]> => {

  const supabase = await createClient();

  const { data, error } = await supabase

    .from("categories")

    .select(CATEGORY_SELECT)

    .order("name", { ascending: true });

  if (error) {

    throw new Error(formatDbError(error));

  }

  return (data ?? []) as Category[];

});



export const getCategoryBySlug = cache(async (slug: string): Promise<Category | null> => {

  const trimmed = slug.trim();

  if (!trimmed) return null;

  const supabase = await createClient();

  const { data, error } = await supabase

    .from("categories")

    .select(CATEGORY_SELECT)

    .eq("slug", trimmed)

    .maybeSingle();

  if (error) {

    throw new Error(formatDbError(error));

  }

  return (data ?? null) as Category | null;

});



export async function getPublicCategorySlugs(): Promise<string[]> {

  const categories = await getCategories();

  return categories.map((c) => c.slug);

}



export async function createCategory(input: CategoryInput): Promise<CategoryActionResult> {

  const trimmed = input.name.trim();

  if (!trimmed) {

    return { ok: false, error: "Kategori adı boş olamaz." };

  }



  const supabase = await createClient();

  const {

    data: { user },

  } = await supabase.auth.getUser();

  if (!user) {

    return { ok: false, error: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." };

  }



  const slug = await uniqueCategorySlug(supabase, trimmed);

  const metaTitle = input.meta_title?.trim() || null;

  const metaDescription = input.meta_description?.trim() || null;



  const { error } = await supabase.from("categories").insert({

    name: trimmed,

    slug,

    meta_title: metaTitle,

    meta_description: metaDescription,

  });

  if (error) {

    return { ok: false, error: formatDbError(error) };

  }



  revalidateCategoryPaths(slug);

  return { ok: true };

}



export async function updateCategory(input: UpdateCategoryInput): Promise<CategoryActionResult> {

  if (!input.id) {

    return { ok: false, error: "Geçersiz kategori." };

  }



  const supabase = await createClient();

  const {

    data: { user },

  } = await supabase.auth.getUser();

  if (!user) {

    return { ok: false, error: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." };

  }



  const { data: existing, error: fetchError } = await supabase

    .from("categories")

    .select("slug")

    .eq("id", input.id)

    .maybeSingle();

  if (fetchError) {

    return { ok: false, error: formatDbError(fetchError) };

  }

  if (!existing) {

    return { ok: false, error: "Kategori bulunamadı." };

  }



  const metaTitle = input.meta_title?.trim() || null;

  const metaDescription = input.meta_description?.trim() || null;



  const { error } = await supabase

    .from("categories")

    .update({

      meta_title: metaTitle,

      meta_description: metaDescription,

    })

    .eq("id", input.id);

  if (error) {

    return { ok: false, error: formatDbError(error) };

  }



  revalidateCategoryPaths(existing.slug);

  return { ok: true };

}



export async function deleteCategory(id: string): Promise<CategoryActionResult> {

  if (!id) {

    return { ok: false, error: "Geçersiz kategori." };

  }



  const supabase = await createClient();

  const {

    data: { user },

  } = await supabase.auth.getUser();

  if (!user) {

    return { ok: false, error: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." };

  }



  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {

    return { ok: false, error: formatDbError(error) };

  }



  revalidateCategoryPaths();

  return { ok: true };

}

