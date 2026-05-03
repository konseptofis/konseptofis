import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${ORIGIN}/hakkimizda/#webpage`,
      url: `${ORIGIN}/hakkimizda`,
      name: "Hakkımızda | Konsept Ofis",
      description:
        "Konsept Ofis, yerli ve yabancı girişimcilere Ankara'da sanal ofis, hazır ofis ve yasal adres çözümleri sunan profesyonel bir iş ortağıdır.",
      inLanguage: "tr-TR",
    },
    {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: SITE.name,
      url: `${ORIGIN}/`,
      logo: `${ORIGIN}/ankara-sanal-ofis-logo.webp`,
      image: `${ORIGIN}/konsept-ofis-hakkimizda.webp`,
      description:
        "2 sene önce yabancı ve yerli girişimcilerin, hazır ofis ve sanal ofis imkânlarından yararlanmaları için kurulduk. Esnek hizmet çözümlerimiz ile binlerce üyemizin sermayelerini ofislerine değil, işlerine yatırmasına destek olduk.",
      foundingDate: "2024",
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
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61574808733053",
        "https://x.com/KonseptOfis",
        "https://www.youtube.com/@KonseptOfis",
        "https://www.instagram.com/konseptofis/",
        "https://www.linkedin.com/company/konseptofis/",
      ],
    },
  ],
};

/** Hakkımızda: AboutPage + Organization @graph. Root layout yalnızca `/hakkimizda` rotasında document head içinde render eder. */
export default function HakkimizdaJsonLd() {
  return (
    <script
      id="ld-json-hakkimizda-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
    />
  );
}
