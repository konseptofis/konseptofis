import type { Metadata } from "next";
import { headers } from "next/headers";
import { SITE } from "@/app/lib/data";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChatbotLazy from "./components/FloatingChatbotLazy";
import { getPostBySlug, getPublishedPostsByCategory } from "./actions/blog";
import { getCategoryBySlug } from "./actions/categories";
import { getExpertBySlug } from "./actions/experts";
import { getPricingPlans } from "./actions/pricing";
import BlogArticleJsonLd from "./components/seo/BlogArticleJsonLd";
import CategoryArchiveJsonLd from "./components/seo/CategoryArchiveJsonLd";
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
import { isReservedBlogRootSegment } from "./lib/blog-root-path";
import { manrope } from "@/lib/fonts";
import BreadcrumbListJsonLd from "./components/seo/BreadcrumbListJsonLd";
import type { BreadcrumbJsonLdItem } from "./lib/breadcrumb-jsonld";

const defaultSiteTitle = "Konsept Ofis";
const defaultDescription =
  "Ankara Çankaya Mahall'da sanal ofis, makam odası ve toplantı odası çözümleri. Yasal iş adresi ve kurumsal ofis paketleri.";

const LEGAL_BREADCRUMBS: Record<string, BreadcrumbJsonLdItem[]> = {
  "/kullanim-kosullari": [
    { label: "Anasayfa", href: "/" },
    { label: "Kullanım Koşulları" },
  ],
  "/acik-riza-onayi": [{ label: "Anasayfa", href: "/" }, { label: "Açık Rıza Onayı" }],
  "/kvkk-kapsaminda-aydinlatma-metni": [
    { label: "Anasayfa", href: "/" },
    { label: "KVKK Aydınlatma Metni" },
  ],
  "/kvkk-basvuru-formu": [
    { label: "Anasayfa", href: "/" },
    { label: "KVKK Başvuru Formu" },
  ],
};

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";
  const isHakkimizda = pathname === "/hakkimizda";
  const isHizmetlerimiz = pathname === "/hizmetlerimiz";
  const isFiyatlar = pathname === "/fiyatlar";
  const isBlog = pathname === "/blog";
  const isIletisim = pathname === "/iletisim";
  const isSikSorulanSorular = pathname === "/sik-sorulan-sorular";
  const legalBreadcrumbs = LEGAL_BREADCRUMBS[pathname];
  const rootArticleMatch = pathname.match(/^\/([^/]+)$/);
  const rootArticleSeg = rootArticleMatch?.[1];
  const blogArticleSlug =
    rootArticleSeg &&
    rootArticleSeg.length > 0 &&
    !isReservedBlogRootSegment(rootArticleSeg)
      ? rootArticleSeg
      : null;
  const blogPost =
    blogArticleSlug != null ? await getPostBySlug(blogArticleSlug) : null;

  const uzmanMatch = pathname.match(/^\/uzmanlar\/([^/]+)$/);
  const uzmanSlug = uzmanMatch?.[1];
  const expert =
    uzmanSlug != null && uzmanSlug.length > 0 ? await getExpertBySlug(uzmanSlug) : null;

  const kategoriMatch = pathname.match(/^\/kategori\/([^/]+)$/);
  const kategoriSlug = kategoriMatch?.[1];
  const category =
    kategoriSlug != null && kategoriSlug.length > 0
      ? await getCategoryBySlug(kategoriSlug)
      : null;
  const categoryPosts =
    category != null ? await getPublishedPostsByCategory(kategoriSlug!) : [];

  const hizmetSlug = pathname.match(/^\/hizmetlerimiz\/([^/]+)$/)?.[1];

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
    <html lang="tr" className={`${manrope.variable} font-sans`}>
      <head>
        {isHome ? <HomePageJsonLd /> : null}
        {isHakkimizda ? <HakkimizdaJsonLd /> : null}
        {isHizmetlerimiz ? <HizmetlerimizItemListJsonLd /> : null}
        {isFiyatlar ? <FiyatlarJsonLd /> : null}
        {isBlog ? <BlogJsonLd /> : null}
        {blogPost ? <BlogArticleJsonLd post={blogPost} /> : null}
        {category ? <CategoryArchiveJsonLd category={category} posts={categoryPosts} /> : null}
        {expert && !expert.seo_noindex ? <ExpertPersonJsonLd expert={expert} /> : null}
        {hizmetDetayLd}
        {isIletisim ? <IletisimJsonLd /> : null}
        {isSikSorulanSorular ? <SikSorulanSorularJsonLd /> : null}
        {legalBreadcrumbs ? (
          <BreadcrumbListJsonLd
            items={legalBreadcrumbs}
            pagePath={pathname}
            id={`ld-json-breadcrumb-${pathname.slice(1).replace(/\//g, "-")}`}
          />
        ) : null}
      </head>
      <body
        className={`${manrope.className} antialiased text-foreground bg-background overflow-x-hidden`}
      >
        <Header />
        {children}
        {!isAdmin ? <Footer /> : null}
        {!isAdmin ? <FloatingChatbotLazy /> : null}
      </body>
    </html>
  );
}
