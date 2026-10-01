import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  period: string;
  kdv: string;
  features: string[];
  order_index: number;
};

async function fetchPricingPlans(): Promise<PricingPlan[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  const rows = (data ?? []) as (Omit<PricingPlan, "features"> & { features: unknown })[];
  return rows.map((r) => ({
    ...r,
    features: Array.isArray(r.features) ? r.features : [],
  }));
}

/** Cookie okumaz; 300sn ISR. Panel `revalidateTag("pricing-plans")` ile düşer. */
export const getPricingPlans = unstable_cache(fetchPricingPlans, ["pricing-plans"], {
  revalidate: 300,
  tags: ["pricing-plans"],
});
