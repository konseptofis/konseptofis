import { faqItemsWithPrices } from "@/app/lib/data";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";
import HomeFaqAccordion from "@/app/components/home/HomeFaqAccordion";

type Props = { sectionClassName?: string };

export default async function FAQAccordion({ sectionClassName = "bg-white" }: Props) {
  const prices = await getSiteDisplayPrices();
  const items = faqItemsWithPrices(prices);
  return <HomeFaqAccordion items={items} sectionClassName={sectionClassName} />;
}
