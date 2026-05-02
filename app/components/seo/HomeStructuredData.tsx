import { FAQ_ITEMS } from "@/app/lib/data";
import { organizationNode, localBusinessNode, webSiteNode } from "@/app/lib/schema-nodes";

/** Yalnızca anasayfa: Organization + LocalBusiness + WebSite + FAQPage (genel SSS) */
export default function HomeStructuredData() {
  const faqEntity = {
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

  const graph = [organizationNode(), localBusinessNode(), webSiteNode(), faqEntity];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
