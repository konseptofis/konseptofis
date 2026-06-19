import HizmetDetayPageContent from "@/app/components/HizmetDetayPageContent";
import { buildHizmetMetadata } from "@/app/lib/hizmet-detay-page-meta";

type Props = { params: Promise<{ slug: string }> };

export default async function HizmetDetayPage({ params }: Props) {
  const { slug } = await params;
  return <HizmetDetayPageContent slug={slug} />;
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
