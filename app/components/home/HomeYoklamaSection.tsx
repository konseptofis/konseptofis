import SectionHeading from "@/app/components/SectionHeading";

const BODY_P = "max-w-[72ch] text-[16px] leading-relaxed text-[var(--color-text-muted)]";
const CARD = "flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6";
const H3 = "mb-3 text-[22px] font-medium leading-snug text-[var(--color-text-primary)]";
const SOURCE_LINK =
  "font-medium text-[var(--color-green)] underline-offset-2 hover:underline";

type Props = { sectionClassName?: string };

export default function HomeYoklamaSection({ sectionClassName = "bg-white" }: Props) {
  return (
    <section
      id="vergi-dairesi-yoklamasi"
      aria-labelledby="vergi-yoklama-heading"
      className={`${sectionClassName} px-4 py-[60px] font-sans sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="vergi-yoklama-heading" className="mb-4">
          Vergi Dairesi Yoklaması Nasıl İşler?
        </SectionHeading>
        <div className="mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">
          <p className={BODY_P}>
            İşe başlama bildiriminden sonra vergi dairesi, beyan ettiğiniz adreste işyerinin
            bulunduğunu tespit etmek için yoklama yapar. Yoklama memuru adrese gelir, işletmenin bu
            adreste faaliyet gösterdiğini belgeleyen sözleşmeyi ve tabelayı/yönlendirmeyi kontrol
            eder ve yoklama fişini düzenler. Sanal ofiste bu süreç, sözleşmeniz ve resepsiyonumuz
            üzerinden yürür; yoklama sırasında şirket yetkilisine telefonla ulaşılabilmesi,
            gerekirse yetkilinin hazır bulunması istenebilir. Yoklama tamamlandığında vergi
            levhanız Mahall Ankara adresiyle düzenlenir.
          </p>
          <article className={CARD}>
            <h3 className={H3}>Mevcut şirketimin adresini taşıyabilir miyim?</h3>
            <p className={BODY_P}>
              Evet. Adres değişikliğini ticaret sicil müdürlüğüne tescil ettirir ve vergi dairesine
              bildirirsiniz; vergi dairesi yeni adreste yoklama yapar. Bu süreçte tebligatlarınız yeni
              adresimizde teslim alınır.
            </p>
          </article>
        </div>
        <p className="mt-8 text-[14px] leading-relaxed text-gray-500">
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
  );
}
