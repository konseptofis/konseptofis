"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, created_at")
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function createCategory(name: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .insert({ name: name.trim() });
  if (error) throw error;
  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/posts/new");
  revalidatePath("/blog");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
