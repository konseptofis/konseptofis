import { BuildingOffice2Icon, BriefcaseIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const services = [
  {
    icon: BuildingOffice2Icon,
    title: "Sanal Ofis",
    subtitle: "Yasal iş adresi ve posta kabulü",
    description:
      "Ankara’da vergi levhası ve ticaret sicil adresi olarak kullanılabilen sanal ofis hizmeti. NACE kodu uyumlu, stopajsız ofis kiralama seçenekleri.",
  },
  {
    icon: BriefcaseIcon,
    title: "Hazır Ofis",
    subtitle: "Günlük veya aylık kullanım",
    description:
      "Tam donanımlı hazır ofis birimleri. Ankara Çankaya bölgesinde, profesyonel çalışma alanı ihtiyacınız için esnek kiralama.",
  },
  {
    icon: UserGroupIcon,
    title: "Toplantı Odası",
    subtitle: "Saatlik toplantı odası kiralama",
    description:
      "Müşteri ve ekip toplantılarınız için rezervasyonlu toplantı odaları. Gizli maliyet yok, net saatlik fiyat.",
  },
];

export default function ServiceFeatures() {
  return (
    <section
      id="hizmetler"
      aria-labelledby="services-heading"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="services-heading" className="mb-2 flex items-center gap-3 text-left tracking-tight text-black">
          <span className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12" aria-hidden />
          Hizmetlerimiz
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Ankara sanal ofis, hazır ofis ve toplantı odası kiralama hizmetleri; yasal
          uyumluluk ve şeffaf fiyatlandırma ile.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="rounded-xl border border-[#f2f2f2] bg-[#f2f2f2] p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <s.icon className="h-8 w-8 text-[#0b7041]" aria-hidden />
                <div>
                  <h3 className="text-[#0b7041]">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
