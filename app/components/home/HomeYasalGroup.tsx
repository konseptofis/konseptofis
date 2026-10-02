import { CheckIcon } from "@heroicons/react/24/outline";
import SectionHeading from "@/app/components/SectionHeading";
import {
  HOME_BG_MUTED,
  HOME_CONTAINER,
  HOME_SECTION_Y,
} from "@/app/lib/home-ui";

const NOT_SUITABLE = [
  "İmalat ve üretim",
  "Gıda hazırlama",
  "Depolama",
  "Perakende mağaza",
  "Ruhsat gerektiren fiziksel hizmetler",
  "Sağlık kuruluşları",
];

const SUITABLE = [
  "Danışmanlık",
  "Yazılım",
  "E-ticaret",
  "Aracılık",
  "Eğitim",
  "Serbest meslek",
];

const NEW_COMPANY = [
  "Yetkili kimlik fotokopisi",
  "Yetkili ikametgâh adresi",
  "Yetkili iletişim bilgileri",
  "Şirket unvanı",
];

const MOVE_COMPANY = [
  "Yetkili kimlik fotokopisi",
  "Yetkili ikametgâh adresi",
  "Yetkili iletişim bilgileri",
  "Yetkili imza sirküleri",
  "Şirket unvanı",
];

const SOLE_PROPRIETOR = [
  "Yetkili kimlik fotokopisi",
  "Yetkili ikametgâh adresi",
  "Yetkili iletişim bilgileri",
];

const SOURCE_LINK =
  "font-medium text-[var(--color-green)] underline-offset-2 hover:underline";

const YOKLAMA_STEPS = [
  "İşe başlama bildirimi yapılır",
  "Yoklama memuru adresi kontrol eder",
  "Vergi levhası Mahall Ankara adresiyle düzenlenir",
] as const;

export default function HomeYasalGroup() {
  return (
    <>
      <section
        id="sanal-ofis-yasal-mi"
        aria-labelledby="sanal-ofis-yasal-heading"
        className={`bg-white ${HOME_SECTION_Y} font-sans`}
      >
        <div className={HOME_CONTAINER}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SectionHeading id="sanal-ofis-yasal-heading" className="mb-4">
                Sanal Ofis Yasal mı?
              </SectionHeading>
              <div>
                <p className="mb-5 mt-0 text-[16px] font-normal leading-[1.7] text-[#3D4743]">
                  Evet, sanal ofis kullanmak yasaldır. Şirket kuruluşunda ve vergi mükellefiyetinde
                  aranan şey, tebligat alınabilen ve vergi dairesinin yoklama yapabildiği gerçek bir
                  iş adresidir. Bu adres sahibi olduğunuz bir taşınmaz, kiraladığınız bir işyeri ya
                  da sanal ofis hizmeti sunan bir işletmenin adresi olabilir.
                </p>
                <p className="mb-5 mt-0 text-[16px] font-normal leading-[1.7] text-[#3D4743]">
                  Sanal ofis sözleşmeniz, adresi kullanma hakkınızı belgeleyen hizmet sözleşmesidir.
                  Bu sözleşmeyle Ankara sanal ofis adresinizi vergi levhanızda, ticaret sicil
                  kaydınızda ve resmi yazışmalarınızda yasal adres olarak kullanırsınız.
                </p>
                <p className="m-0 text-[16px] font-normal leading-[1.7] text-[#3D4743]">
                  Önemli olan, adresin yalnızca kâğıt üzerinde kalmaması ve fiilen ulaşılabilir
                  olmasıdır. Vergi dairesi ve ticaret sicil yazışmaları ile tebligatlar bu adrese
                  gelir. Mahall Ankara&apos;daki resepsiyonumuz evrak ve tebligatlarınızı mesai
                  saatlerinde teslim alır, size aynı gün bildirir.
                </p>
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="mb-6 text-[18px] font-semibold leading-snug text-[#1F2A24]">
                Hangi faaliyetler sanal ofise uygun değildir?
              </h3>

              <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 sm:gap-6">
                <div className="flex h-full flex-col rounded-[12px] bg-[#FBEAE7] p-5">
                  <p className="mb-0 border-b border-[#F0D0CA] pb-2 text-[14px] font-semibold text-[#B4533F]">
                    Uygun değil
                  </p>
                  <ul className="m-0 list-none p-0">
                    {NOT_SUITABLE.map((item, i) => (
                      <li
                        key={item}
                        className={`py-2.5 text-[15px] text-[#3D4743] ${i > 0 ? "border-t border-[#F0D0CA]" : ""}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex h-full flex-col rounded-[12px] bg-[var(--color-surface-green-tint)] p-5">
                  <p className="mb-0 border-b border-[#C5E6D6] pb-2 text-[14px] font-semibold text-[var(--color-green)]">
                    Uygun
                  </p>
                  <ul className="m-0 list-none p-0">
                    {SUITABLE.map((item, i) => (
                      <li
                        key={item}
                        className={`py-2.5 text-[15px] text-[#3D4743] ${i > 0 ? "border-t border-[#C5E6D6]" : ""}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mb-0 mt-6 text-[14px] leading-[1.55] text-[#6B7570]">
                NACE kodunuzun uygunluğunu başvuru sırasında birlikte kontrol ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="sanal-ofis-gerekli-belgeler"
        aria-labelledby="sanal-ofis-belgeler-heading"
        className={`${HOME_BG_MUTED} ${HOME_SECTION_Y} font-sans`}
      >
        <div className={HOME_CONTAINER}>
          <SectionHeading id="sanal-ofis-belgeler-heading" className="mb-8">
            Sanal Ofis Kiralamak İçin Gerekli Belgeler
          </SectionHeading>
          <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-5">
            {(
              [
                { title: "Yeni şirket kuracaksanız", items: NEW_COMPANY },
                { title: "Mevcut şirketinizi taşıyacaksanız", items: MOVE_COMPANY },
                { title: "Şahıs şirketi açacaksanız", items: SOLE_PROPRIETOR },
              ] as const
            ).map((block) => (
              <article
                key={block.title}
                className="flex h-full flex-col rounded-[12px] bg-white p-7 shadow-none"
              >
                <h3 className="m-0 text-[17px] font-semibold leading-snug text-[var(--color-text-primary)]">
                  {block.title}
                </h3>
                <ul className="mb-0 mt-4 list-none space-y-2.5 p-0">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px] text-[#3D4743]">
                      <CheckIcon
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-green)]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vergi-dairesi-yoklamasi"
        aria-labelledby="vergi-yoklama-heading"
        className={`bg-white ${HOME_SECTION_Y} font-sans`}
      >
        <div className={HOME_CONTAINER}>
          <SectionHeading id="vergi-yoklama-heading" className="mb-4">
            Vergi Dairesi Yoklaması Nasıl İşler?
          </SectionHeading>
          <div>
            <p className="mb-5 mt-0 text-[16px] font-normal leading-[1.7] text-[#3D4743]">
              İşe başlama bildiriminden sonra vergi dairesi, beyan ettiğiniz adreste işyerinin
              bulunduğunu tespit etmek için yoklama yapar. Yoklama memuru adrese gelir, işletmenin
              bu adreste faaliyet gösterdiğini belgeleyen sözleşmeyi ve tabelayı/yönlendirmeyi
              kontrol eder ve yoklama fişini düzenler.
            </p>
            <p className="m-0 text-[16px] font-normal leading-[1.7] text-[#3D4743]">
              Sanal ofiste bu süreç, sözleşmeniz ve resepsiyonumuz üzerinden yürür; yoklama
              sırasında şirket yetkilisine telefonla ulaşılabilmesi, gerekirse yetkilinin hazır
              bulunması istenebilir. Yoklama tamamlandığında vergi levhanız Mahall Ankara adresiyle
              düzenlenir.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
            <ol className="m-0 list-none space-y-3.5 p-0">
              {YOKLAMA_STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-green)] text-[14px] font-semibold text-[var(--color-green)]">
                    {index + 1}
                  </span>
                  <span className="text-[15px] text-[#3D4743]">{step}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-[12px] bg-[#F5F7F6] p-6 shadow-none">
              <h3 className="mb-3 text-[17px] font-semibold leading-snug text-[var(--color-text-primary)]">
                Mevcut şirketimin adresini taşıyabilir miyim?
              </h3>
              <p className="m-0 text-[15px] leading-[1.65] text-[#3D4743]">
                Evet. Adres değişikliğini ticaret sicil müdürlüğüne tescil ettirir ve vergi
                dairesine bildirirsiniz; vergi dairesi yeni adreste yoklama yapar.
              </p>
            </div>
          </div>
          <p className="mt-8 text-[13px] leading-[1.65] text-[#3D4743]">
            Son güncelleme: Ekim 2026. Resmi süreçler için:{" "}
            <a
              href="https://dijital.gib.gov.tr"
              target="_blank"
              rel="noopener noreferrer"
              className={SOURCE_LINK}
            >
              Gelir İdaresi Başkanlığı – İnteraktif Vergi Dairesi
            </a>{" "}
            ·{" "}
            <a
              href="https://mersis.ticaret.gov.tr"
              target="_blank"
              rel="noopener noreferrer"
              className={SOURCE_LINK}
            >
              MERSİS
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
