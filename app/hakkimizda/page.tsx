import PageHeader from "@/app/components/PageHeader";
import {
  FlagIcon,
  EyeIcon,
  TrophyIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { icon: TrophyIcon, value: "+2", label: "Yıllık Deneyim" },
  { icon: BuildingOffice2Icon, value: "+4800", label: "Mutlu Firma" },
  { icon: MapPinIcon, value: "+25", label: "Lokasyon" },
  { icon: HeartIcon, value: "%99", label: "Müşteri Memnuniyeti" },
];

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="HAKKIMIZDA"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Hakkımızda" }]}
      />

      {/* Biz Kimiz? */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="biz-kimiz-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2
                id="biz-kimiz-heading"
                className="border-b-2 border-[#0b7041] pb-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl"
              >
                BİZ KİMİZ?
              </h2>
              <p className="mt-6 text-lg font-bold text-gray-800">
                Modern iş dünyasının ihtiyaçlarına uygun, esnek ve yenilikçi
                çalışma alanları sunuyoruz.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Yabancı ve yerli girişimcilerin{" "}
                <span className="font-medium text-[#0b7041]">hazır ofis</span>,{" "}
                <span className="font-medium text-[#0b7041]">sanal ofis</span> ve{" "}
                <span className="font-medium text-[#0b7041]">toplantı odaları</span>{" "}
                imkânlarından yararlanmaları için kurulduk. Esnek hizmet
                çözümlerimiz ile üyelerimizin sermayelerini ofislerine değil,
                işlerine yatırmasına destek oluyoruz.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Ankara Çankaya&apos;da Mahall Ankara adresinde, vergi levhası ve
                ticaret sicil adresi olarak kullanılabilen{" "}
                <span className="font-medium text-[#0b7041]">sanal ofis</span>, tam
                donanımlı{" "}
                <span className="font-medium text-[#0b7041]">hazır ofis</span>{" "}
                birimleri ve saatlik kiralanabilen{" "}
                <span className="font-medium text-[#0b7041]">toplantı odaları</span>{" "}
                sunuyoruz.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <div
                className="aspect-[4/3] w-full bg-[#f2f2f2]"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section
        className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="misyon-vizyon-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="misyon-vizyon-heading"
            className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            MİSYON & VİZYON
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
            <article className="flex flex-col items-center rounded-xl border border-[#e5e5e5] bg-white p-8 text-center shadow-sm">
              <FlagIcon className="h-14 w-14 text-[#0b7041]" aria-hidden />
              <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-black">
                Misyonumuz
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Girişimcilere ve KOBİ&apos;lere, düşük maliyetli ve esnek ofis
                çözümleri sunarak büyümelerine destek olmak. Yasal iş adresi,
                hazır ofis ve toplantı odası hizmetlerimizle profesyonel
                çalışma imkânı sağlamak.
              </p>
            </article>
            <article className="flex flex-col items-center rounded-xl border border-[#e5e5e5] bg-white p-8 text-center shadow-sm">
              <EyeIcon className="h-14 w-14 text-[#0b7041]" aria-hidden />
              <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-black">
                Vizyonumuz
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Türkiye&apos;nin tercih edilen esnek ofis ve sanal ofis
                markası olmak. Yenilikçi hizmetlerle iş dünyasının ihtiyaçlarına
                öncü çözümler sunmak.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Rakamlarla Biz */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="rakamlar-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="rakamlar-heading"
            className="text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            RAKAMLARLA BİZ
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-[#0b7041]" aria-hidden />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-xl border border-[#e5e5e5] bg-white p-6 text-center shadow-sm"
                >
                  <Icon className="h-12 w-12 text-[#0b7041]" aria-hidden />
                  <span className="mt-4 text-3xl font-bold text-black sm:text-4xl">
                    {item.value}
                  </span>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
