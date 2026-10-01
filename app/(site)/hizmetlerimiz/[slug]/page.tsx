import HizmetDetayPageContent from "@/app/components/HizmetDetayPageContent";
import HizmetDetayJsonLd from "@/app/components/seo/HizmetDetayJsonLd";
import { buildHizmetMetadata } from "@/app/lib/hizmet-detay-page-meta";
import { getServiceDetail } from "@/app/lib/hizmet-detay-data";
import { matchPricingPlanForService } from "@/app/lib/hizmet-detay-jsonld";
import { getPricingPlans } from "@/app/lib/pricing-plans";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export default async function HizmetDetayPage({ params }: Props) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
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
      <HizmetDetayPageContent slug={slug} />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildHizmetMetadata(slug);
}

export function generateStaticParams() {
  return [
    { slug: "hazir-ofis-kiralama" },
    { slug: "makam-odasi-kiralama" },
    { slug: "toplanti-odasi-kiralama" },
  ];
}
