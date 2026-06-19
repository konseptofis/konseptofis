"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export type CategoryActionResult = { ok: true } | { ok: false; error: string };

type DbError = { message: string; code?: string };

function formatDbError(error: DbError): string {
  if (error.code === "42501") {
    return "Bu işlem için yetkiniz yok. Lütfen admin paneline tekrar giriş yapın.";
  }
  if (error.code === "23505") {
    return "Bu isimde bir kategori zaten var.";
  }
  if (error.code === "42P01") {
    return "Kategoriler tablosu bulunamadı. Supabase migration dosyasını çalıştırın.";
  }
  return error.message || "Veritabanı hatası oluştu.";
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/posts/new");
  revalidatePath("/blog");
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, created_at")
    .order("name", { ascending: true });
  if (error) {
    throw new Error(formatDbError(error));
  }
  return (data ?? []) as Category[];
}

export async function createCategory(name: string): Promise<CategoryActionResult> {
  const trimmed = name.trim();
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

  const { error } = await supabase.from("categories").insert({ name: trimmed });
  if (error) {
    return { ok: false, error: formatDbError(error) };
  }

  revalidateCategoryPaths();
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
