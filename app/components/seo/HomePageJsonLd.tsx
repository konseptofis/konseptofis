import { FAQ_ITEMS, SITE, siteGeoJsonLd } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${ORIGIN}/#organization`,
  name: SITE.name,
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/ankara-sanal-ofis-logo.webp`,
  image: [`${ORIGIN}/ankara-sanal-ofis.webp`, `${ORIGIN}/konsept-ofis-hakkimizda.webp`],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phone,
    email: SITE.email,
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["Turkish", "tr"],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61574808733053",
    "https://x.com/KonseptOfis",
    "https://www.youtube.com/@KonseptOfis",
    "https://www.instagram.com/konseptofis/",
    "https://www.linkedin.com/company/konseptofis/",
  ],
};

const localBusinessJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${ORIGIN}/#localbusiness`,
  name: SITE.name,
  url: `${ORIGIN}/`,
  telephone: SITE.phone,
  email: SITE.email,
  image: [`${ORIGIN}/ankara-sanal-ofis.webp`, `${ORIGIN}/konsept-ofis-hakkimizda.webp`],
  priceRange: "₺₺",
  hasMap: SITE.directionsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: siteGeoJsonLd(),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

const webSiteDescription =
  "Ankara sanal ofis kiralama hizmetiyle stopajsız, aidatsız yasal iş adresi edinin. Mahall Ankara'da prestijli şirket kuruluşu için hemen teklif alın!";

const websiteJson = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${ORIGIN}/#website`,
  url: `${ORIGIN}/`,
  name: SITE.name,
  description: webSiteDescription,
  inLanguage: "tr-TR",
};

const faqJson = {
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

/** Ana sayfa: dört ayrı JSON-LD (Organization, LocalBusiness, WebSite, FAQPage). Root layout bunu yalnızca `/` rotasında document head içinde render eder. */
export default function HomePageJsonLd() {
  return (
    <>
      <script
        id="ld-json-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJson) }}
      />
      <script
        id="ld-json-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
      />
      <script
        id="ld-json-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
      />
      <script
        id="ld-json-faqpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </>
  );
}
