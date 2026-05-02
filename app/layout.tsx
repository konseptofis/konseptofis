import type { Metadata } from "next";
import { SITE } from "@/app/lib/data";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body
        className="font-sans antialiased text-foreground bg-background overflow-x-hidden"
      >
        <Header />
        {children}
        <Footer />
        <FloatingChatbot />
      </body>
    </html>
  );
}
