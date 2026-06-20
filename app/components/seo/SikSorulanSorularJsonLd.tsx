import { FAQ_ITEMS } from "@/app/lib/data";
import { buildBreadcrumbListJsonLd, breadcrumbPageUrl } from "@/app/lib/breadcrumb-jsonld";

const pageUrl = breadcrumbPageUrl("/sik-sorulan-sorular");

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
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

/** `/sik-sorulan-sorular`: sayfadaki `FAQ_ITEMS` ile aynı SSS → FAQPage. */
export default function SikSorulanSorularJsonLd() {
  return (
    <script
      id="ld-json-sik-sorulan-sorular-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
    />
  );
}
