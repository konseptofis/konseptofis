import { faqItemsWithPrices } from "@/app/lib/data";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";
import { buildBreadcrumbListJsonLd, breadcrumbPageUrl } from "@/app/lib/breadcrumb-jsonld";

const pageUrl = breadcrumbPageUrl("/sik-sorulan-sorular");

/** `/sik-sorulan-sorular`: sayfadaki SSS ile aynı FAQPage. */
export default async function SikSorulanSorularJsonLd() {
  const prices = await getSiteDisplayPrices();
  const items = faqItemsWithPrices(prices);

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      buildBreadcrumbListJsonLd(
        [{ label: "Anasayfa", href: "/" }, { label: "Sık Sorulan Sorular" }],
        pageUrl,
      ),
    ],
  };

  return (
    <script
      id="ld-json-sik-sorulan-sorular-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
    />
  );
}
