"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { type PricingPlan } from "@/app/lib/pricing-plans";

export async function getPricingPlanById(id: string): Promise<PricingPlan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pricing_plans")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  const r = data as Omit<PricingPlan, "features"> & { features: unknown };
  return {
    ...r,
    features: Array.isArray(r.features) ? r.features : [],
  };
}

type UpdateInput = {
  id: string;
  title: string;
  price: string;
  period: string;
  kdv: string;
  features: string[];
};

export async function updatePricingPlan(input: UpdateInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("pricing_plans")
    .update({
      title: input.title.trim(),
      price: input.price.trim(),
      period: input.period.trim(),
      kdv: input.kdv.trim(),
      features: input.features,
    })
    .eq("id", input.id);
  if (error) throw error;
  revalidateTag("pricing-plans", "max");
  revalidatePath("/");
  revalidatePath("/fiyatlar");
  revalidatePath("/sik-sorulan-sorular");
  revalidatePath("/hizmetlerimiz", "layout");
  revalidatePath("/admin/pricing");
}
