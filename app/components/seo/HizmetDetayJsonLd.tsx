import type { PricingPlan } from "@/app/actions/pricing";
import type { ServiceDetailData } from "@/app/lib/hizmet-detay-data";
import {
  buildHizmetFaqPageJsonLd,
  buildHizmetProductJsonLd,
} from "@/app/lib/hizmet-detay-jsonld";

type Props = {
  detail: ServiceDetailData;
  pricingPlan: PricingPlan | null;
};

export default function HizmetDetayJsonLd({ detail, pricingPlan }: Props) {
  const productLd = buildHizmetProductJsonLd(detail, pricingPlan);
  const faqLd = buildHizmetFaqPageJsonLd(detail);

  return (
    <>
      <script
        id={`ld-json-hizmet-product-${detail.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        id={`ld-json-hizmet-faq-${detail.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
