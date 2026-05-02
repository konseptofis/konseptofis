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
        title="Ankara Çankaya'da Prestijli Sanal Ofis ve Yasal Adres Çözümleri"
        imageSrc="/cankaya-sanal-ofis.webp"
        imageAlt="Ankara Çankaya Mahall Ankara Konsept Ofis sanal ofis ve yasal iş adresi"
        sectionClassName={HOME_BG_WHITE}
      >
        <p>
          Konsept Ofis olarak, Ankara&apos;nın en prestijli iş merkezlerinden Mahall
          Ankara&apos;da şirket kuruluşuna ve adres değişikliğine uygun yasal iş adresi ve
          sanal ofis kiralama hizmetleri sunuyoruz. Fiziksel ofis maliyetlerine katlanmadan,
          stopaj ödemeden ve profesyonel sekreterya desteğiyle işletmenize prestijli bir
          kurumsal kimlik kazandırıyoruz.
        </p>
        <p>
          Sürpriz faturaların ve gizli maliyetlerin olmadığı şeffaf paketlerimiz; kargo ve
          tebligat yönetimi, misafir karşılama ve tam donanımlı toplantı odası kullanımını
          kapsar. İster yeni bir girişimci olun ister şirketinizi prestijli bir lokasyona
          taşımak isteyin, esnek çözümlerimizle siz sadece işinizi büyütmeye odaklanın.
        </p>
      </ContentWithImage>
      <OfficeServicesSection sectionClassName={HOME_BG_GREEN} />
      <FAQAccordion sectionClassName={HOME_BG_WHITE} />
      <TestimonialsSection sectionClassName={HOME_BG_GREEN} />
      <MapAndContact sectionClassName={HOME_BG_WHITE} />
    </main>
  );
}
