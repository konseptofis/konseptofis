import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import SectionHeading from "@/app/components/SectionHeading";
import ServiceOfferCardsGrid from "@/app/components/ServiceOfferCardsGrid";
import WhyKonseptOfisSection from "@/app/components/WhyKonseptOfisSection";
import { SERVICE_OFFER_CARDS } from "@/app/lib/service-offer-cards";

/** Anasayfa ve hizmet detay ile aynı zebra arka planları */
const ZEBRA_GREEN = "bg-[rgb(11_112_65_/_0.045)]";
const ZEBRA_WHITE = "bg-white";

export const metadata: Metadata = {
  title: { absolute: "Hizmetlerimiz | Konsept Ofis" },
  description:
    "Şirketiniz için en uygun çalışma alanını seçin. Stopajsız sanal ofis, tam donanımlı hazır ofis ve saatlik toplantı odası kiralama hizmetlerimiz.",
  alternates: { canonical: "/hizmetler" },
};

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="Hizmetler"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Hizmetler" }]}
      />

      {/* Hizmetlerimiz — zebra: beyaz */}
      <section
        className={`${ZEBRA_WHITE} px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12`}
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-green)]">
            Hizmetlerimiz
          </p>
          <SectionHeading id="services-heading" className="mt-2 mb-4">
            Neler Sunuyoruz?
          </SectionHeading>
          <p className="mb-10 max-w-3xl text-left text-[16px] leading-relaxed text-[var(--color-text-muted)]">
            Ankara&apos;nın en prestijli lokasyonunda, işinize değer katacak esnek ve modern
            çalışma alanı çözümlerimizi keşfedin.
          </p>
          <ServiceOfferCardsGrid cards={SERVICE_OFFER_CARDS} />
        </div>
      </section>

      <WhyKonseptOfisSection sectionClassName={ZEBRA_GREEN} />

      {/* Hemen Başlayın CTA */}
      <section
        className="bg-[#0b7041] px-4 py-[28px] sm:px-6 lg:px-8"
        aria-labelledby="hizmetler-cta-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
          <div className="text-center lg:text-left">
            <h3
              id="hizmetler-cta-heading"
              className="m-0 text-[30px] font-medium tracking-tight text-white"
            >
              Hangi paketin size uygun olduğuna karar veremediniz mi?
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-white/90">
              Hizmetlerimiz hakkında detaylı bilgi için iletişime geçin.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 rounded-lg bg-white px-8 py-4 text-center font-bold text-[#0b7041] transition-colors hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b7041]"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </main>
  );
}
