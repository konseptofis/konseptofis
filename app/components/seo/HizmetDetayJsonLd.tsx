import type { PricingPlan } from "@/app/actions/pricing";
import type { ServiceDetailData } from "@/app/lib/hizmet-detay-data";
import { buildHizmetDetailGraphJsonLd } from "@/app/lib/hizmet-detay-jsonld";

type Props = {
  detail: ServiceDetailData;
  pricingPlan: PricingPlan | null;
};

export default function HizmetDetayJsonLd({ detail, pricingPlan }: Props) {
  const graphLd = buildHizmetDetailGraphJsonLd(detail, pricingPlan);

  return (
    <script
      id={`ld-json-hizmet-graph-${detail.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphLd) }}
    />
  );
}
