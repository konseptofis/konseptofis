import SectionHeading from "./SectionHeading";
import ServiceOfferCardsGrid from "./ServiceOfferCardsGrid";
import { SERVICE_OFFER_CARDS } from "@/app/lib/service-offer-cards";

type Props = { sectionClassName?: string };

export default function ServiceCards({ sectionClassName = "bg-white" }: Props) {
  return (
    <section
      id="hizmetler"
      aria-labelledby="service-cards-heading"
      className={`${sectionClassName} px-4 py-[60px] sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-green)]">
            Hizmetlerimiz
          </p>
          <SectionHeading id="service-cards-heading" className="mt-2">
            Size en uygun çözümü seçin
          </SectionHeading>
        </header>
        <ServiceOfferCardsGrid cards={SERVICE_OFFER_CARDS} />
      </div>
    </section>
  );
}
