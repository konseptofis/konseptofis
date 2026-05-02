import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import SectionHeading from "@/app/components/SectionHeading";
import BreadcrumbSchema from "@/app/components/seo/BreadcrumbSchema";
import { SCHEMA_LOCAL_BUSINESS_ID } from "@/app/lib/data";
import {
  CursorArrowRaysIcon,
  DocumentTextIcon,
  KeyIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  WalletIcon,
  WifiIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Hakkımızda - Konsept Ofis",
  description:
    "Ankara'da prestijli çalışma alanları sunan Konsept Ofis'i yakından tanıyın. Sanal ofis ve makam odası çözümlerimizle işinize değer katıyoruz.",
};

/** Anasayfa / fiyatlar / hizmetler ile aynı zebra arka planları */
const ZEBRA_GREEN = "bg-[rgb(11_112_65_/_0.045)]";
const ZEBRA_WHITE = "bg-white";

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    icon: CursorArrowRaysIcon,
    title: "İhtiyacınızı Belirleyin",
    description:
      "Sanal ofis, hazır ofis veya toplantı odası paketlerimizden bütçenize ve şirket yapınıza en uygun olanı seçin.",
  },
  {
    step: "02",
    icon: DocumentTextIcon,
    title: "Sözleşmenizi Onaylayın",
    description:
      "Uzun bürokratik işlemler olmadan, şeffaf ve stopajsız sözleşmenizi hızlıca hazırlayıp dijital veya fiziki olarak onaylayalım.",
  },
  {
    step: "03",
    icon: KeyIcon,
    title: "İşinize Odaklanın",
    description:
      "Vergi levhanız için yasal adresiniz anında aktifleşsin. Gelen kargolarınızı biz yönetelim, siz sadece büyümenize odaklanın.",
  },
];

const WHY_PREFERRED_ITEMS = [
  {
    icon: BuildingOffice2Icon,
    title: "Prestijli Lokasyon",
    description:
      "İşinizi daha güvenilir ve profesyonel bir imajla sunmak için prestijli bir ofis adresine sahip olun. Müşterilerinize güçlü bir izlenim bırakın.",
  },
  {
    icon: MapPinIcon,
    title: "Ulaşımda Kolaylık",
    description:
      "Ofisimiz, Danıştay Metro Durağı çıkışında ve otobüs duraklarının hemen yakınında yer alarak kolay ve hızlı ulaşım imkânı sunar.",
  },
  {
    icon: WalletIcon,
    title: "Ulaşılabilir Fiyatlandırma",
    description:
      "Bütçenize uygun esnek sanal ofis fiyatları ile işinizi prestijli bir adreste büyütün. Kaliteli hizmeti ekonomik çözümlerle sunuyoruz.",
  },
  {
    icon: WifiIcon,
    title: "Teknolojik Altyapı",
    description:
      "Ofisimiz, yüksek hızlı fiber internet, projeksiyon ve lazer yazıcı gibi modern teknolojik altyapıyla donatılmıştır. İşinizi kesintisiz yönetin.",
  },
  {
    icon: UserGroupIcon,
    title: "Toplantı Odası Hizmeti",
    description:
      "Modern ve konforlu toplantı odalarımız, iş görüşmeleriniz ve sunumlarınız için ideal bir ortam sunar. Profesyonel bir izlenim bırakın.",
  },
  {
    icon: BriefcaseIcon,
    title: "Makam Odası Hizmeti",
    description:
      "Prestijli ve konforlu makam odamız, önemli görüşmeleriniz ve toplantılarınız için özel bir alan sunar. İşinize değer katan bir çalışma ortamı.",
  },
];

export default function HakkimizdaPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Konsept Ofis Hakkında",
    description:
      "Ankara Çankaya'da girişimciler için yeni nesil çalışma alanları, sanal ofis ve hazır ofis çözümleri.",
    mainEntity: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <PageHeader
        title="Hakkımızda"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Hakkımızda" }]}
      />

      {/* Biz Kimiz? — zebra: beyaz */}
      <section
        className={`${ZEBRA_WHITE} px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12`}
        aria-labelledby="biz-kimiz-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-green)]">
                Konsept Ofis Hakkında
              </p>
              <SectionHeading id="biz-kimiz-heading" className="mt-2 mb-6">
                Ankara Çankaya&apos;da Girişimciler İçin Yeni Nesil Çalışma Alanları
              </SectionHeading>
              <p className="mb-4 leading-relaxed text-gray-600">
                Konsept Ofis olarak, serbest çalışanlardan kurumsal şirketlere kadar her ölçekten işletmeye prestijli ve maliyet etkin çalışma çözümleri sunmak için yola çıktık. Amacımız; sizi yüksek kira, aidat ve stopaj gibi geleneksel ofis yüklerinden kurtararak enerjinizi ve sermayenizi doğrudan işinizi büyütmeye ayırmanızı sağlamaktır.
              </p>
              <p className="leading-relaxed text-gray-600">
                Ankara&apos;nın en prestijli iş merkezlerinden Mahall Ankara&apos;da; yasal iş adresi gereksinimlerinizi karşılayan sanal ofis paketleri, şirket kuruluşuna %100 uygun tam donanımlı hazır ofisler ve profesyonel toplantı odalarıyla hizmet veriyoruz. Modern altyapımız, deneyimli karşılama ekibimiz ve şeffaf fiyatlandırma politikamızla işinizi geleceğe taşırken her adımda yanınızdayız.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-md">
              <Image
                src="/konsept-ofis-hakkimizda.webp"
                alt="Konsept Ofis - Ankara Çankaya'da girişimciler için yeni nesil çalışma alanları"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neden Tercih Ediliyoruz? — zebra: yeşilimsi */}
      <section
        className={`${ZEBRA_GREEN} px-4 pt-10 pb-12 sm:px-6 sm:pt-12 sm:pb-16 lg:px-8 lg:pt-14 lg:pb-20`}
        aria-labelledby="neden-tercih-ediliyoruz-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="neden-tercih-ediliyoruz-heading" className="mb-8">
            Neden Tercih Ediliyoruz?
          </SectionHeading>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PREFERRED_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[12px] border border-[#dfe7e3] bg-gradient-to-br from-[#eaf7f0] via-white to-white p-6 shadow-[0_10px_30px_-20px_rgba(11,112,65,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(11,112,65,0.65)]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#0b7041]/20 bg-[#0b7041]/10 transition-colors duration-300 group-hover:bg-[#0b7041]/15">
                    <Icon className="h-6 w-6 text-[#0b7041]" aria-hidden />
                  </div>
                  <h3 className="mb-2 pr-8 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-[16px] leading-relaxed text-gray-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır? — zebra: beyaz */}
      <section
        className={`${ZEBRA_WHITE} px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24`}
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="how-it-works-heading" className="mb-4">
            Sadece 3 Adımda Yeni Ofisinize Taşının
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-left text-base leading-relaxed text-gray-600">
            Karmaşık prosedürler ve uzun bekleyişler yok. İş modelinize en uygun çalışma alanını seçin, yasal adresinizi aynı gün kullanmaya başlayın.
          </p>
          <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.step}
                  className="flex flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0b7041]/10 text-lg font-bold text-[#0b7041]">
                      {item.step}
                    </span>
                    <Icon className="h-8 w-8 text-[#0b7041]" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-left leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
