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
        "Konsept Ofis; yerli ve yabancı girişimcilere Ankara Çankaya'da sanal ofis, hazır ofis ve toplantı odası çözümleri sunar. Hikayemizi hemen keşfedin.",
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
        "Ankara sanal ofis arayışınızda doğru adres Konsept Ofis. Çankaya Mahall Ankara'nın prestijli iş merkezinde, fiziksel ofis maliyeti olmadan yasal iş adresinize kavuşun; vergi levhası, ticaret sicil adresi ve tebligat yönetimi tek pakette. 2022'den bu yana yüzlerce girişimciye stopajsız ofis kiralama ve şeffaf fiyatlandırmayla hizmet veriyoruz. Sadece bir adres değil, markanıza kurumsal kimlik kazandıran eksiksiz bir ofis ekosistemi sunuyoruz.",
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
