import { faqItemsWithPrices, SITE, siteGeoJsonLd, siteOpeningHoursJsonLd, sitePostalAddressJsonLd } from "@/app/lib/data";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";

const ORIGIN = SITE.domain.replace(/\/$/, "");
const LOCAL_BUSINESS_ID = `${ORIGIN}/#localbusiness`;

/** Ana sayfa: tek JSON-LD @graph (LocalBusiness, Service, FAQPage). */
export default async function HomePageJsonLd() {
  const prices = await getSiteDisplayPrices();
  const faqItems = faqItemsWithPrices(prices);
  const offerPrice = prices.sanalMonthly || undefined;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": LOCAL_BUSINESS_ID,
        name: SITE.name,
        url: `${ORIGIN}/`,
        telephone: "+903129119557",
        email: SITE.email,
        image: [
          `${ORIGIN}/ankara-sanal-ofis.webp`,
          `${ORIGIN}/assets/images/mahall-slider/cankaya-sanal-ofis-1.webp`,
        ],
        priceRange: "₺₺",
        hasMap: SITE.directionsUrl,
        address: sitePostalAddressJsonLd(),
        geo: siteGeoJsonLd(),
        openingHoursSpecification: siteOpeningHoursJsonLd(),
        sameAs: SITE.sameAs,
      },
      {
        "@type": "Service",
        "@id": `${ORIGIN}/#sanal-ofis-service`,
        name: "Sanal Ofis",
        areaServed: "Türkiye",
        provider: { "@id": LOCAL_BUSINESS_ID },
        ...(offerPrice
          ? {
              offers: {
                "@type": "Offer",
                price: offerPrice,
                priceCurrency: "TRY",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: offerPrice,
                  priceCurrency: "TRY",
                  unitText: "MONTH",
                  valueAddedTaxIncluded: false,
                },
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${ORIGIN}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      id="ld-json-home-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
