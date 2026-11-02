import { buildBreadcrumbListJsonLd, breadcrumbPageUrl } from "@/app/lib/breadcrumb-jsonld";
import { SITE, sitePostalAddressJsonLd } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");
const pageUrl = breadcrumbPageUrl("/hakkimizda");

const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const LOGO_URL = `${ORIGIN}/ankara-sanal-ofis-logo.webp`;
const ATO_ID = "https://www.atonet.org.tr/#organization";
const TURKPATENT_ID = "https://www.turkpatent.gov.tr/#organization";
const ATO_CREDENTIAL_ID = `${ORIGIN}/hakkimizda/#ato-kayit-levhasi`;
const MARKA_CREDENTIAL_ID = `${ORIGIN}/hakkimizda/#marka-tescil-belgesi`;
const BRAND_ID = `${ORIGIN}/#brand`;

const ATO_SICIL_NO = "523795";
const MARKA_TESCIL_NO = "2026 037775";

const PAGE_DESCRIPTION =
  "Konsept Ofis; yerli ve yabancı girişimcilere Ankara Çankaya'da sanal ofis sunar; yıllık abonelerimiz makam odası ve toplantı odasını saatlik ücretle kullanabilir. Hikayemizi hemen keşfedin.";

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${ORIGIN}/hakkimizda/#webpage`,
      url: `${ORIGIN}/hakkimizda`,
      name: "Hakkımızda | Konsept Ofis",
      description: PAGE_DESCRIPTION,
      inLanguage: "tr-TR",
      about: { "@id": ORGANIZATION_ID },
      mainEntity: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${ORIGIN}/konsept-ofis-hakkimizda.webp`,
        caption: "Konsept Ofis - Ankara Çankaya'da girişimciler için yeni nesil çalışma alanları",
      },
      significantLink: [
        `${ORIGIN}/belgeler/ato-levha.pdf`,
        `${ORIGIN}/belgeler/konsept-ofis-marka-tescili.pdf`,
      ],
    },
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: ["Konsept Grup Ofis Hizmetleri Danışmanlık Ltd. Şti.", "konseptofis"],
      url: `${ORIGIN}/`,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
      image: `${ORIGIN}/konsept-ofis-hakkimizda.webp`,
      description:
        "Ankara sanal ofis arayışınızda doğru adres Konsept Ofis. Çankaya Mahall Ankara'nın prestijli iş merkezinde, fiziksel ofis maliyeti olmadan yasal iş adresinize kavuşun; vergi levhası, ticaret sicil adresi ve tebligat yönetimi tek pakette. Kurulduğumuz günden bu yana çok sayıda girişimciye stopajsız ofis kiralama ve şeffaf fiyatlandırmayla hizmet veriyoruz. Sadece bir adres değil, markanıza kurumsal kimlik kazandıran eksiksiz bir ofis ekosistemi sunuyoruz.",
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        name: "Ankara, Türkiye",
      },
      address: sitePostalAddressJsonLd(),
      areaServed: { "@type": "Country", name: "Türkiye" },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Ankara Ticaret Sicil No",
        value: ATO_SICIL_NO,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        email: SITE.email,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["Turkish"],
      },
      memberOf: { "@id": ATO_ID },
      brand: { "@id": BRAND_ID },
      hasCredential: [{ "@id": ATO_CREDENTIAL_ID }, { "@id": MARKA_CREDENTIAL_ID }],
      sameAs: SITE.sameAs,
    },
    {
      "@type": "Brand",
      "@id": BRAND_ID,
      name: "konseptofis",
      logo: LOGO_URL,
      url: `${ORIGIN}/`,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "TÜRKPATENT Marka Tescil No",
        value: MARKA_TESCIL_NO,
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      "@id": ATO_CREDENTIAL_ID,
      name: "Ankara Ticaret Odası Kayıt Levhası",
      description: `${SITE.legalName}, ${ATO_SICIL_NO} ticaret sicil numarası ile Ankara Ticaret Odası'na kayıtlıdır.`,
      credentialCategory: "Ticaret odası kayıt belgesi",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Ticaret Sicil No",
        value: ATO_SICIL_NO,
      },
      about: { "@id": ORGANIZATION_ID },
      recognizedBy: { "@id": ATO_ID },
      validIn: {
        "@type": "AdministrativeArea",
        name: "Ankara",
        containedInPlace: { "@type": "Country", name: "Türkiye" },
      },
      inLanguage: "tr-TR",
      url: `${ORIGIN}/belgeler/ato-levha.pdf`,
      encodingFormat: "application/pdf",
      image: `${ORIGIN}/belgeler/ato-levha.jpg`,
    },
    {
      "@type": "EducationalOccupationalCredential",
      "@id": MARKA_CREDENTIAL_ID,
      name: "konseptofis Marka Tescil Belgesi",
      description:
        "konseptofis markası, 6769 sayılı Sınai Mülkiyet Kanunu kapsamında 35. sınıfta 26.03.2026 tarihinden itibaren 10 yıl süreyle korunmak üzere 06.10.2026 tarihinde tescil edilmiştir.",
      credentialCategory: "Marka tescil belgesi",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Marka Tescil No",
        value: MARKA_TESCIL_NO,
      },
      about: { "@id": BRAND_ID },
      recognizedBy: { "@id": TURKPATENT_ID },
      dateCreated: "2026-10-06",
      temporalCoverage: "2026-03-26/2036-03-26",
      validFor: "P10Y",
      validIn: { "@type": "Country", name: "Türkiye" },
      inLanguage: "tr-TR",
      url: `${ORIGIN}/belgeler/konsept-ofis-marka-tescili.pdf`,
      encodingFormat: "application/pdf",
      image: `${ORIGIN}/belgeler/konsept-ofis-marka-tescili.jpg`,
    },
    {
      "@type": "Organization",
      "@id": ATO_ID,
      name: "Ankara Ticaret Odası",
      alternateName: "ATO",
      url: "https://www.atonet.org.tr/",
    },
    {
      "@type": "GovernmentOrganization",
      "@id": TURKPATENT_ID,
      name: "Türk Patent ve Marka Kurumu",
      alternateName: "TÜRKPATENT",
      url: "https://www.turkpatent.gov.tr/",
    },
    buildBreadcrumbListJsonLd(
      [{ label: "Anasayfa", href: "/" }, { label: "Hakkımızda" }],
      pageUrl,
    ),
  ],
};

/** Hakkımızda: AboutPage + Organization + resmi belgeler (ATO, TÜRKPATENT) @graph. Root layout yalnızca `/hakkimizda` rotasında document head içinde render eder. */
export default function HakkimizdaJsonLd() {
  return (
    <script
      id="ld-json-hakkimizda-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
    />
  );
}
