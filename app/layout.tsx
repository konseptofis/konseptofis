import type { Metadata } from "next";
import {
  SITE,
  FAQ_ITEMS,
  SCHEMA_BASE_URL,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_LOCAL_BUSINESS_ID,
  SCHEMA_DEFAULT_IMAGES,
} from "@/app/lib/data";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/FloatingChatbot";

const title = "Ankara Sanal Ofis | Hazır Ofis & Toplantı Odası - Konsept Ofis";
const description =
  "Ankara sanal ofis, hazır ofis ve toplantı odası kiralama. Yasal iş adresi, vergi levhası adresi. Mahall Ankara, Çankaya. Stopajsız ofis seçenekleri.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: title, template: "%s | Konsept Ofis" },
  description,
  keywords: [
    "Ankara sanal ofis",
    "hazır ofis Ankara",
    "yasal iş adresi",
    "toplantı odası kiralama",
    "Çankaya ofis",
    "Mahall Ankara ofis",
  ],
  openGraph: {
    title,
    description,
    url: SITE.domain,
    siteName: SITE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.domain },
};

/** Tek script içinde: 1× Organization, 1× LocalBusiness, 1× Product (image + marka referansı) */
function GlobalStructuredDataSchema() {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": SCHEMA_ORGANIZATION_ID,
      name: SITE.name,
      url: SCHEMA_BASE_URL,
      logo: `${SCHEMA_BASE_URL}/ankara-sanal-ofis-logo.webp`,
      email: SITE.email,
      telephone: SITE.phone,
    },
    {
      "@type": "LocalBusiness",
      "@id": SCHEMA_LOCAL_BUSINESS_ID,
      name: SITE.name,
      url: SCHEMA_BASE_URL,
      telephone: SITE.phone,
      email: SITE.email,
      image: [...SCHEMA_DEFAULT_IMAGES],
      priceRange: "₺₺",
      parentOrganization: { "@id": SCHEMA_ORGANIZATION_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
        addressLocality: SITE.address.city,
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
    },
    {
      "@type": "Product",
      "@id": `${SCHEMA_BASE_URL}/#product-ankara-ofis`,
      name: "Ankara Sanal Ofis Hizmeti",
      description:
        "Yasal iş adresi, posta kabulü ve kurumsal adres hizmetleri. Ankara Çankaya Mahall Ankara.",
      image: [...SCHEMA_DEFAULT_IMAGES],
      brand: { "@id": SCHEMA_ORGANIZATION_ID },
      offers: [
        {
          "@type": "Offer",
          name: "Sanal Ofis",
          price: "800",
          priceCurrency: "TRY",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Toplantı Odası Saatlik",
          price: "300",
          priceCurrency: "TRY",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  ];

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

function FAQPageSchema() {
  const schema = {
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body
        className="font-sans antialiased text-foreground bg-background overflow-x-hidden"
      >
        <GlobalStructuredDataSchema />
        <FAQPageSchema />
        <Header />
        {children}
        <Footer />
        <FloatingChatbot />
      </body>
    </html>
  );
}
