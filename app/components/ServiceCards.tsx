import SectionHeading from "./SectionHeading";
import ServiceOfferCardsGrid from "./ServiceOfferCardsGrid";
import { SERVICE_OFFER_CARDS } from "@/app/lib/service-offer-cards";
import { HOME_BG_MUTED, HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

export default function ServiceCards() {
  return (
    <section
      id="hizmetler"
      aria-labelledby="service-cards-heading"
      className={`${HOME_SECTION_Y} ${HOME_BG_MUTED}`}
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="service-cards-heading" className="mb-4">
          Size en uygun çözümü seçin
        </SectionHeading>
        <p className="m-0 text-[16px] leading-[1.7] text-[#3D4743]">
          Konsept Ofis&apos;te sanal ofisin yanı sıra ihtiyacınıza göre hazır ofis, toplantı odası
          ve makam odası kiralama seçenekleri de sunuyoruz. Tüm hizmetlerimiz Çankaya&apos;daki
          Mahall Ankara&apos;da; saatlik, günlük veya aylık kullanabilir, yasal adresinizi ve
          çalışma alanınızı aynı yerden yönetebilirsiniz.
        </p>
        <div className="mt-10">
          <ServiceOfferCardsGrid
            cards={SERVICE_OFFER_CARDS}
            gridClassName="grid grid-cols-1 auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
            imageHeightClass="h-[160px]"
            descriptionClassName="line-clamp-2 text-[15px] leading-[1.65] text-[#3D4743]"
          />
        </div>
      </div>
    </section>
  );
}
