import {
  SITE,
  SCHEMA_BASE_URL,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_LOCAL_BUSINESS_ID,
  SCHEMA_WEBSITE_ID,
  SCHEMA_DEFAULT_IMAGES,
  SITE_SOCIAL_SAME_AS,
} from "@/app/lib/data";
import { HOMEPAGE_TESTIMONIALS } from "@/app/lib/testimonials";

const HOME_DESCRIPTION =
  "Ankara sanal ofis, hazır ofis ve toplantı odası kiralama. Yasal iş adresi, vergi levhası adresi. Mahall Ankara, Çankaya.";

/** Ana sayfa @graph — Organization (yalnızca burada tam tanım) */
export function organizationNode(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": SCHEMA_ORGANIZATION_ID,
    name: SITE.name,
    url: SCHEMA_BASE_URL,
    logo: `${SCHEMA_BASE_URL}/ankara-sanal-ofis-logo.webp`,
    image: [...SCHEMA_DEFAULT_IMAGES],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [...SITE_SOCIAL_SAME_AS],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["Turkish", "tr"],
      },
    ],
  };
}

/** Yerel işletme — ana sayfa tam grafik; iletişim sayfasında aynı @id ile tekrar (Google birleştirir) */
export function localBusinessNode(): Record<string, unknown> {
  return {
    "@type": "LocalBusiness",
    "@id": SCHEMA_LOCAL_BUSINESS_ID,
    name: SITE.name,
    url: SCHEMA_BASE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    image: [...SCHEMA_DEFAULT_IMAGES],
    priceRange: "₺₺",
    parentOrganization: { "@id": SCHEMA_ORGANIZATION_ID },
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
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
      reviewCount: HOMEPAGE_TESTIMONIALS.length,
      ratingCount: HOMEPAGE_TESTIMONIALS.length,
    },
    review: HOMEPAGE_TESTIMONIALS.map((r) => ({
      "@type": "Review",
      datePublished: r.datePublished,
      author: {
        "@type": "Person",
        name: r.name,
        jobTitle: r.role,
      },
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
      itemReviewed: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
    })),
  };
}

export function webSiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_WEBSITE_ID,
    url: SCHEMA_BASE_URL,
    name: SITE.name,
    description: HOME_DESCRIPTION,
    inLanguage: "tr-TR",
    publisher: { "@id": SCHEMA_ORGANIZATION_ID },
  };
}

export { HOME_DESCRIPTION };
