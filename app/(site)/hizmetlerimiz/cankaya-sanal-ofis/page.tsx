import type { Metadata } from "next";
import HizmetDetayPageContent from "@/app/components/HizmetDetayPageContent";
import HizmetDetayJsonLd from "@/app/components/seo/HizmetDetayJsonLd";
import { buildHizmetMetadata } from "@/app/lib/hizmet-detay-page-meta";
import { getServiceDetail } from "@/app/lib/hizmet-detay-data";
import { matchPricingPlanForService } from "@/app/lib/hizmet-detay-jsonld";
import { getPricingPlans } from "@/app/lib/pricing-plans";
import { SITE } from "@/app/lib/data";
import { notFound } from "next/navigation";

const SLUG = "cankaya-sanal-ofis";

const CANKAYA_OG_IMAGE = {
  path: "/og/cankaya-sanal-ofis-og.jpg",
  width: 1200,
  height: 630,
  alt: "Mahall Ankara C2 Blok – Konsept Ofis sanal ofis adresi",
} as const;

export const revalidate = 300;

export default async function CankayaSanalOfisPage() {
  const detail = getServiceDetail(SLUG);
  if (!detail) notFound();

  let pricingPlan = null;
  try {
    const plans = await getPricingPlans();
    pricingPlan = matchPricingPlanForService(detail, plans);
  } catch {
    pricingPlan = null;
  }

  return (
    <>
      <HizmetDetayJsonLd detail={detail} pricingPlan={pricingPlan} />
      <HizmetDetayPageContent slug={SLUG} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const base = buildHizmetMetadata(SLUG);
  const origin = SITE.domain.replace(/\/$/, "");
  const ogImageUrl = `${origin}${CANKAYA_OG_IMAGE.path}`;

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: ogImageUrl,
          width: CANKAYA_OG_IMAGE.width,
          height: CANKAYA_OG_IMAGE.height,
          alt: CANKAYA_OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      images: [ogImageUrl],
    },
  };
}
