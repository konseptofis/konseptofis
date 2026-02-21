import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import ContentWithImage from "./components/ContentWithImage";
import AboutWhyUsSection from "./components/AboutWhyUsSection";
import OfficeServicesSection from "./components/OfficeServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQAccordion from "./components/FAQAccordion";
import MapAndContact from "./components/MapAndContact";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutWhyUsSection />
      <ServiceCards />
      <ContentWithImage
        title="Ankara'da Kurumsal Adres ve Ofis Çözümleri"
        imageSrc={null}
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
      <OfficeServicesSection />
      <TestimonialsSection />
      <FAQAccordion />
      <MapAndContact />
    </main>
  );
}
