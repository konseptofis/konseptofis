import HizmetDetayPageContent from "@/app/components/HizmetDetayPageContent";
import HizmetDetayJsonLd from "@/app/components/seo/HizmetDetayJsonLd";
import { buildHizmetMetadata } from "@/app/lib/hizmet-detay-page-meta";
import { getServiceDetail } from "@/app/lib/hizmet-detay-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function HizmetDetayPage({ params }: Props) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <HizmetDetayJsonLd detail={detail} pricingPlan={null} />
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
