import type { Metadata } from "next";
import HeroSection from "@/app/components/HeroSection";
import ServiceCards from "@/app/components/ServiceCards";
import SanalOfisNedirSection from "@/app/components/SanalOfisNedirSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import FAQAccordion from "@/app/components/FAQAccordion";
import MapAndContact from "@/app/components/MapAndContact";
import HomePageJsonLd from "@/app/components/seo/HomePageJsonLd";
import AboutWhyUsSection from "@/app/components/AboutWhyUsSection";
import HomePricingSection from "@/app/components/home/HomePricingSection";
import HomeYasalGroup from "@/app/components/home/HomeYasalGroup";
import HomeHowToRentSection from "@/app/components/home/HomeHowToRentSection";
import HomeAudienceSection from "@/app/components/home/HomeAudienceSection";
import HomeMahallSection from "@/app/components/home/HomeMahallSection";
import HomeCtaBand from "@/app/components/home/HomeCtaBand";
import { SITE } from "@/app/lib/data";
import { getSiteDisplayPrices } from "@/app/lib/site-pricing";

/** Panel güncellemesi `revalidatePath("/")` + `revalidateTag("pricing-plans")` ile yenilenir. */
export const revalidate = 300;

const HOME_OG_IMAGE = {
  path: "/og/ankara-sanal-ofis-og.jpg",
  width: 1200,
  height: 630,
  alt: "Mahall Ankara – Konsept Ofis sanal ofis adresi",
} as const;

function homeMetaDescription(sanalMonthly: string): string {
  const price = sanalMonthly.trim();
  if (!price) {
    return "Ankara sanal ofis. Mahall Ankara'da vergi levhası ve ticaret sicil adresi, kargo ve tebligat takibi. Stopaj ve aidat yok.";
  }
  return `Ankara sanal ofis aylık ${price} TL + KDV. Mahall Ankara'da vergi levhası ve ticaret sicil adresi, kargo ve tebligat takibi. Stopaj ve aidat yok.`;
}

export async function generateMetadata(): Promise<Metadata> {
  const prices = await getSiteDisplayPrices();
  const monthly = prices.sanalMonthlyLabel;
  const title = monthly
    ? `Ankara Sanal Ofis – Aylık ${monthly} | Konsept Ofis`
    : "Ankara Sanal Ofis | Konsept Ofis";
  const description = homeMetaDescription(prices.sanalMonthly);
  const origin = SITE.domain.replace(/\/$/, "");
  const ogImageUrl = `${origin}${HOME_OG_IMAGE.path}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: `${origin}/`,
      siteName: SITE.name,
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: HOME_OG_IMAGE.width,
          height: HOME_OG_IMAGE.height,
          alt: HOME_OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default function Home() {
  return (
    <>
      <HomePageJsonLd />
      <main id="main-content">
        <HeroSection />
        <AboutWhyUsSection />
        <SanalOfisNedirSection />
        <HomePricingSection />
        <HomeHowToRentSection />
        <HomeYasalGroup />
        <HomeCtaBand />
        <HomeAudienceSection />
        <HomeMahallSection />
        <ServiceCards />
        <FAQAccordion />
        <TestimonialsSection />
        <MapAndContact heading="Bize Şimdi Ulaşın" />
      </main>
    </>
  );
}
