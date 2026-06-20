import { buildBreadcrumbListJsonLd, breadcrumbPageUrl } from "@/app/lib/breadcrumb-jsonld";
import { SITE, siteGeoJsonLd } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");
const pageUrl = breadcrumbPageUrl("/iletisim");

const iletisimJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${ORIGIN}/iletisim/#webpage`,
      url: `${ORIGIN}/iletisim`,
      name: "İletişim ve Adres Bilgileri | Konsept Ofis",
      description:
        "Mahall Ankara Çankaya'daki merkezimize ulaşın. Sanal ofis, hazır ofis ve toplantı odası kiralama hizmetlerimiz için bizimle hemen iletişime geçin.",
      inLanguage: "tr-TR",
      mainEntity: {
        "@id": `${ORIGIN}/#localbusiness`,
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${ORIGIN}/#localbusiness`,
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      image: `${ORIGIN}/ankara-sanal-ofis.webp`,
      hasMap: SITE.directionsUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
        addressLocality: SITE.address.city,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      geo: siteGeoJsonLd(),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["Turkish", "tr"],
      },
    },
    buildBreadcrumbListJsonLd(
      [{ label: "Anasayfa", href: "/" }, { label: "İletişim" }],
      pageUrl,
    ),
  ],
};

/** İletişim (`/iletisim`): ContactPage + LocalBusiness @graph. */
export default function IletisimJsonLd() {
  return (
    <script
      id="ld-json-iletisim-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(iletisimJsonLd) }}
    />
  );
}
