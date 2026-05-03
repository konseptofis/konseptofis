import type { Metadata } from "next";
import { headers } from "next/headers";
import { SITE } from "@/app/lib/data";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/FloatingChatbot";
import { getPostBySlug } from "./actions/blog";
import { getExpertBySlug } from "./actions/experts";
import { getPricingPlans } from "./actions/pricing";
import BlogArticleJsonLd from "./components/seo/BlogArticleJsonLd";
import ExpertPersonJsonLd from "./components/seo/ExpertPersonJsonLd";
import BlogJsonLd from "./components/seo/BlogJsonLd";
import FiyatlarJsonLd from "./components/seo/FiyatlarJsonLd";
import HakkimizdaJsonLd from "./components/seo/HakkimizdaJsonLd";
import HizmetDetayJsonLd from "./components/seo/HizmetDetayJsonLd";
import HizmetlerimizItemListJsonLd from "./components/seo/HizmetlerimizItemListJsonLd";
import HomePageJsonLd from "./components/seo/HomePageJsonLd";
import IletisimJsonLd from "./components/seo/IletisimJsonLd";
import SikSorulanSorularJsonLd from "./components/seo/SikSorulanSorularJsonLd";
import { matchPricingPlanForService } from "./lib/hizmet-detay-jsonld";
import { getServiceDetail } from "./lib/hizmet-detay-data";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isHome = pathname === "/";
  const isHakkimizda = pathname === "/hakkimizda";
  const isHizmetlerimiz = pathname === "/hizmetlerimiz";
  const isFiyatlar = pathname === "/fiyatlar";
  const isBlog = pathname === "/blog";
  const isIletisim = pathname === "/iletisim";
  const isSikSorulanSorular = pathname === "/sik-sorulan-sorular";
  const blogArticleMatch = pathname.match(/^\/blog\/([^/]+)$/);
  const blogArticleSlug = blogArticleMatch?.[1];
  const blogPost =
    blogArticleSlug != null && blogArticleSlug.length > 0
      ? await getPostBySlug(blogArticleSlug)
      : null;

  const uzmanMatch = pathname.match(/^\/uzmanlar\/([^/]+)$/);
  const uzmanSlug = uzmanMatch?.[1];
  const expert =
    uzmanSlug != null && uzmanSlug.length > 0 ? await getExpertBySlug(uzmanSlug) : null;

  const hizmetSlug =
    pathname.match(/^\/hizmetler\/([^/]+)$/)?.[1] ??
    pathname.match(/^\/hizmetlerimiz\/([^/]+)$/)?.[1];

  let hizmetDetayLd: React.ReactNode = null;
  if (hizmetSlug) {
    const hizmetDetail = getServiceDetail(hizmetSlug);
    if (hizmetDetail) {
      const plans = await getPricingPlans();
      const matchedPlan = matchPricingPlanForService(hizmetDetail, plans);
      hizmetDetayLd = (
        <HizmetDetayJsonLd detail={hizmetDetail} pricingPlan={matchedPlan} />
      );
    }
  }

  return (
    <html lang="tr">
      <head>
        {isHome ? <HomePageJsonLd /> : null}
        {isHakkimizda ? <HakkimizdaJsonLd /> : null}
        {isHizmetlerimiz ? <HizmetlerimizItemListJsonLd /> : null}
        {isFiyatlar ? <FiyatlarJsonLd /> : null}
        {isBlog ? <BlogJsonLd /> : null}
        {blogPost ? <BlogArticleJsonLd post={blogPost} /> : null}
        {expert ? <ExpertPersonJsonLd expert={expert} /> : null}
        {hizmetDetayLd}
        {isIletisim ? <IletisimJsonLd /> : null}
        {isSikSorulanSorular ? <SikSorulanSorularJsonLd /> : null}
      </head>
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
