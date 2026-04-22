import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import ContentWithImage from "./components/ContentWithImage";
import AboutWhyUsSection from "./components/AboutWhyUsSection";
import OfficeServicesSection from "./components/OfficeServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQAccordion from "./components/FAQAccordion";
import MapAndContact from "./components/MapAndContact";

/** Anasayfa zebra: Hero sonrası beyazla başlar, yeşilimsi ton ile sırayla devam eder */
const HOME_BG_GREEN = "bg-[rgb(11_112_65_/_0.045)]";
const HOME_BG_WHITE = "bg-white";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutWhyUsSection sectionClassName={HOME_BG_WHITE} />
      <ServiceCards sectionClassName={HOME_BG_GREEN} />
      <ContentWithImage
        title="Ankara'da Kurumsal Adres ve Ofis Çözümleri"
        imageSrc={null}
        sectionClassName={HOME_BG_WHITE}
      >
        <p>
          Konsept Ofis olarak Ankara Çankaya, Mahall Ankara adresinde sanal ofis, hazır
          ofis ve toplantı odası hizmetleri sunuyoruz. Yasal iş adresi, vergi levhası
          adresi ve prestijli bir çalışma ortamı ihtiyacınız için yanınızdayız.
        </p>
        <p>
          Şeffaf fiyatlandırma, gizli maliyet olmadan esnek kiralama seçenekleri ile
          işletmenizi bir adım öteye taşıyın.
        </p>
      </ContentWithImage>
      <OfficeServicesSection sectionClassName={HOME_BG_GREEN} />
      <FAQAccordion sectionClassName={HOME_BG_WHITE} />
      <TestimonialsSection sectionClassName={HOME_BG_GREEN} />
      <MapAndContact sectionClassName={HOME_BG_WHITE} />
    </main>
  );
}
