import AccordionFAQ from "@/app/components/AccordionFAQ";
import { faqItemsWithPrices } from "@/app/lib/data";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";

export default async function SssFaq() {
  const prices = await getSiteDisplayPrices();
  return <AccordionFAQ items={faqItemsWithPrices(prices)} idPrefix="sss-page" />;
}
