import type { Metadata } from "next";
import { SITE } from "@/app/lib/data";
import "./globals.css";
import { manrope } from "@/lib/fonts";

const defaultSiteTitle = "Konsept Ofis";
const defaultDescription =
  "Ankara Çankaya Mahall'da sanal ofis, makam odası ve toplantı odası çözümleri. Yasal iş adresi ve kurumsal ofis paketleri.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: defaultSiteTitle, template: "%s | Konsept Ofis" },
  description: defaultDescription,
  keywords: [
    "Ankara sanal ofis",
    "Mahall sanal ofis",
    "hazır ofis Ankara",
    "toplantı odası Ankara",
    "yasal iş adresi",
    "Çankaya ofis",
  ],
  openGraph: {
    title: defaultSiteTitle,
    description: defaultDescription,
    url: SITE.domain,
    siteName: SITE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: defaultSiteTitle, description: defaultDescription },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.domain },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${manrope.variable} font-sans`}>
      <body
        className={`${manrope.className} antialiased text-foreground bg-background overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
