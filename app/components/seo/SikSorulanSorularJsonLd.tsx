import { FAQ_ITEMS } from "@/app/lib/data";

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
