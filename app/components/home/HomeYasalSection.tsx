import SectionHeading from "@/app/components/SectionHeading";

const BODY_P = "max-w-[72ch] text-[16px] leading-relaxed text-[var(--color-text-muted)]";
const CARD = "flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6";
const H3 = "mb-3 text-[22px] font-medium leading-snug text-[var(--color-text-primary)]";
const UL = "list-disc space-y-1.5 pl-5 text-[16px] leading-relaxed text-[var(--color-text-muted)]";

type Props = { sectionClassName?: string };

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

export default function HomeYasalSection({ sectionClassName = "bg-white" }: Props) {
  return (
    <section
      id="sanal-ofis-yasal-mi"
      aria-labelledby="sanal-ofis-yasal-heading"
      className={`${sectionClassName} px-4 py-[60px] font-sans sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="sanal-ofis-yasal-heading" className="mb-4">
          Sanal Ofis Yasal mı?
        </SectionHeading>
        <div className="mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">
          <div className={`space-y-4 ${BODY_P}`}>
            <p>
              Evet. Şirket kuruluşunda ve vergi mükellefiyetinde aranan şey, işletmenin tebligat
              alabileceği ve vergi dairesinin yoklama yapabileceği gerçek bir iş adresidir. Bu adres
              sahibi olduğunuz bir taşınmaz, kiraladığınız bir işyeri ya da sanal ofis hizmeti sunan
              bir işletmenin adresi olabilir. Sanal ofis sözleşmeniz, adres kullanım hakkınızı
              belgeleyen kira/hizmet sözleşmesi niteliğindedir ve ticaret sicil ile vergi dairesi
              işlemlerinde sunulur.
            </p>
            <p>
              Önemli olan, adresin yalnızca kâğıt üzerinde değil, fiilen ulaşılabilir olmasıdır:
              vergi dairesi ya da ticaret sicil yazışmaları ile tebligatlar bu adrese gelir ve teslim
              alınabilmelidir. Mahall Ankara&apos;daki resepsiyonumuz mesai saatleri içinde evrak ve
              tebligatlarınızı teslim alır, size aynı gün bildirir.
            </p>
          </div>
          <article className={CARD}>
            <h3 className={H3}>Hangi faaliyetler sanal ofise uygun değildir?</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[15px] font-semibold text-[var(--color-text-primary)]">
                  Uygun değil
                </p>
                <ul className={UL}>
                  {NOT_SUITABLE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-[15px] font-semibold text-[var(--color-text-primary)]">
                  Uygun
                </p>
                <ul className={UL}>
                  {SUITABLE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              NACE kodunuzun uygunluğunu başvuru sırasında birlikte kontrol ediyoruz.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
