import HizmetDetayPageContent from "@/app/components/HizmetDetayPageContent";
import { buildHizmetMetadata } from "@/app/lib/hizmet-detay-page-meta";

export default function CankayaSanalOfisPage() {
  return <HizmetDetayPageContent slug="cankaya-sanal-ofis" />;
}

export function generateMetadata() {
  return buildHizmetMetadata("cankaya-sanal-ofis");
}
