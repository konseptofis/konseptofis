import HizmetDetayPageContent from "@/app/components/HizmetDetayPageContent";
import HizmetDetayJsonLd from "@/app/components/seo/HizmetDetayJsonLd";
import { buildHizmetMetadata } from "@/app/lib/hizmet-detay-page-meta";
import { getServiceDetail } from "@/app/lib/hizmet-detay-data";
import { notFound } from "next/navigation";

const SLUG = "cankaya-sanal-ofis";

export default function CankayaSanalOfisPage() {
  const detail = getServiceDetail(SLUG);
  if (!detail) notFound();

  return (
    <>
      <HizmetDetayJsonLd detail={detail} pricingPlan={null} />
      <HizmetDetayPageContent slug={SLUG} />
    </>
  );
}

export function generateMetadata() {
  return buildHizmetMetadata(SLUG);
}
