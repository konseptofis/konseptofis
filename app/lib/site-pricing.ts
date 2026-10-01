import { getPricingPlans, type PricingPlan } from "@/app/lib/pricing-plans";

export type SiteDisplayPrices = {
  /** Paneldeki sanal ofis fiyatı (şema için ham sayı dizesi). */
  sanalMonthly: string;
  /** Toplantı veya makam odası saatlik fiyatı. */
  hourly: string;
  /** "800 TL + KDV" */
  sanalMonthlyLabel: string;
  /** "300 TL + KDV" */
  hourlyLabel: string;
};

function findPlan(plans: PricingPlan[], ...needles: string[]): PricingPlan | undefined {
  return plans.find((p) => {
    const t = p.title.toLocaleLowerCase("tr-TR");
    return needles.some((n) => t.includes(n));
  });
}

function asTryKdv(price: string): string {
  const n = price.trim();
  return n ? `${n} TL + KDV` : "";
}

/** Fiyat kartları panelinden sanal ofis aylık ve toplantı/makam saatlik bedeller. */
export async function getSiteDisplayPrices(): Promise<SiteDisplayPrices> {
  let plans: PricingPlan[] = [];
  try {
    plans = await getPricingPlans();
  } catch {
    plans = [];
  }

  const sanal = findPlan(plans, "sanal");
  const hourlyPlan =
    findPlan(plans, "toplantı", "toplanti") ?? findPlan(plans, "makam");

  const sanalMonthly = sanal?.price.trim() ?? "";
  const hourly = hourlyPlan?.price.trim() ?? "";

  return {
    sanalMonthly,
    hourly,
    sanalMonthlyLabel: asTryKdv(sanalMonthly),
    hourlyLabel: asTryKdv(hourly),
  };
}
