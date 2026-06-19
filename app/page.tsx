import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import SanalOfisNedirSection from "./components/SanalOfisNedirSection";
import ContentWithImage from "./components/ContentWithImage";
import AboutWhyUsSection from "./components/AboutWhyUsSection";
import OfficeServicesSection from "./components/OfficeServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQAccordion from "./components/FAQAccordion";
import MapAndContact from "./components/MapAndContact";
import { SITE } from "@/app/lib/data";

const HOME_TITLE = "Ankara Sanal Ofis Kiralama | Konsept Ofis";
const HOME_DESCRIPTION =
  "Ankara sanal ofis kiralama hizmetiyle stopajsız, aidatsız yasal iş adresi edinin. Mahall Ankara'da prestijli şirket kuruluşu için hemen teklif alın!";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE.domain.replace(/\/$/, "") + "/",
    siteName: SITE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

/** Anasayfa zebra: Hero sonrası beyazla başlar, yeşilimsi ton ile sırayla devam eder */
const HOME_BG_GREEN = "bg-[rgb(11_112_65_/_0.045)]";
const HOME_BG_WHITE = "bg-white";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutWhyUsSection sectionClassName={HOME_BG_WHITE} />
      <ServiceCards sectionClassName={HOME_BG_GREEN} />
      <SanalOfisNedirSection sectionClassName={HOME_BG_WHITE} />
      <ContentWithImage
        title="Ankara Çankaya'da Prestijli Sanal Ofis ve Yasal Adres Çözümleri"
        imageSrc="/cankaya-sanal-ofis.webp"
        imageAlt="Ankara Çankaya Mahall Ankara Konsept Ofis sanal ofis ve yasal iş adresi"
        sectionClassName={HOME_BG_GREEN}
      >
        <p>
          Ankara&apos;nın yeni iş ve finans merkezi Çankaya Mahall Ankara, sanal
          ofisiniz için stratejik bir konum sunar. Metro ve ana arterlere yürüme
          mesafesindeki lokasyonumuz, müşteri ve iş ortaklarınızın size kolayca
          ulaşmasını sağlar. A+ ofis standartlarındaki bina, modern mimarisi ve
          prestijli lobisiyle markanızın kurumsal imajını ilk izlenimde güçlendirir.
        </p>
        <p>
          Çankaya&apos;nın kamu kurumları, mali müşavirler ve hukuk bürolarının yoğun
          olduğu bu merkezde yer almak; resmi işlemlerinizi hızlandırır ve
          işletmenize güçlü bir konum avantajı kazandırır.
        </p>
      </ContentWithImage>
      <OfficeServicesSection sectionClassName={HOME_BG_WHITE} />
      <FAQAccordion sectionClassName={HOME_BG_GREEN} />
      <TestimonialsSection sectionClassName={HOME_BG_WHITE} />
      <MapAndContact sectionClassName={HOME_BG_GREEN} />
    </main>
  );
}
