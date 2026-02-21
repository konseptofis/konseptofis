import type { Metadata } from "next";
import { SITE, FAQ_ITEMS } from "@/app/lib/data";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

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

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.name,
    url: SITE.domain,
    telephone: SITE.phone,
    email: SITE.email,
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
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ProductOfferSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Ankara Sanal Ofis Hizmeti",
    description: "Yasal iş adresi, posta kabulü ve kurumsal adres hizmetleri.",
    brand: { "@type": "Brand", name: SITE.name },
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
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        <LocalBusinessSchema />
        <ProductOfferSchema />
        <FAQPageSchema />
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
