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
        "Yerli ve yabancı girişimcilere Ankara'nın iş ve finans merkezi Çankaya'da prestijli bir yasal iş adresi sunmak amacıyla yola çıktık. Konsept Ofis olarak; esnek sanal ofis ve hazır ofis çözümlerimizle binlerce işletmeyi yüksek kira, stopaj ve aidat yükünden kurtarıyoruz. Mahall Ankara'daki kurumsal altyapımız sayesinde üyelerimiz sermayelerini dört duvara değil, doğrudan işlerine yatırıyor ve büyüme hedeflerine çok daha hızlı ulaşıyor.",
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
