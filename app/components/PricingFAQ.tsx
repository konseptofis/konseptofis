import AccordionFAQ from "@/app/components/AccordionFAQ";
import { PRICING_FAQ_ITEMS } from "@/app/lib/data";

export default function PricingFAQ() {
  return <AccordionFAQ items={PRICING_FAQ_ITEMS} idPrefix="pricing-faq" />;
}
