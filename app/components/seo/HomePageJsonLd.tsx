import { FAQ_ITEMS, SITE } from "@/app/lib/data";

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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.9208,
    longitude: 32.8547,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "4",
  },
  review: [
    {
      "@type": "Review",
      datePublished: "2025-10-08",
      author: {
        "@type": "Person",
        name: "Berkan Çevre",
        jobTitle: "Serbest Avukat",
      },
      reviewBody:
        "Avukat sanal ofis arayışımda en iyi lokasyon burasıydı. Baro kaydımı hemen Mahall Ankara'ya aldırdım. Tebligatlarım güvenle teslim alınıyor. Meslektaşlarıma öneririm.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Review",
      datePublished: "2025-10-22",
      author: {
        "@type": "Person",
        name: "Berat Bozkurt",
        jobTitle: "Uzman Diyetisyen",
      },
      reviewBody:
        "Online diyetisyen olarak fiziksel ofise ihtiyacım yoktu. Yasal adresimi buraya taşıdım. Yüz yüze görüşmelerim için toplantı odalarını kullanıyorum, çok prestijli bir yer.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Review",
      datePublished: "2025-11-14",
      author: {
        "@type": "Person",
        name: "Engin Eryılmaz",
        jobTitle: "Klinik Psikolog",
      },
      reviewBody:
        "Online terapi ağırlıklı çalışıyorum. Ev adresimi gizlemek için yasal adres hizmeti aldım. Nadir de olsa yüz yüze seanslar için sağladıkları toplantı odaları harika.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Review",
      datePublished: "2025-12-03",
      author: {
        "@type": "Person",
        name: "Furkan Altay",
        jobTitle: "E-Ticaret Kurucusu",
      },
      reviewBody:
        "Sürekli kargo ve resmi tebligat alıyorum. Evraklarım resepsiyonda güvenle teslim alınıp anında WhatsApp'tan bildiriliyor. E-ticaret operasyon yükümü tamamen sıfırladılar.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    },
  ],
};

const webSiteDescription =
  "Ankara sanal ofis, hazır ofis ve toplantı odası kiralama. Yasal iş adresi, vergi levhası adresi. Mahall Ankara, Çankaya.";

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
