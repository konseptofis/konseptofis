import SectionHeading from "@/app/components/SectionHeading";

const BODY_P = "max-w-[72ch] text-[16px] leading-relaxed text-[var(--color-text-muted)]";
const CARD = "flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6";
const H3 = "mb-3 text-[22px] font-medium leading-snug text-[var(--color-text-primary)]";
const UL = "list-disc space-y-1.5 pl-5 text-[16px] leading-relaxed text-[var(--color-text-muted)]";

type Props = { sectionClassName?: string };

export default function HomeBelgelerSection({ sectionClassName = "bg-white" }: Props) {
  return (
    <section
      id="sanal-ofis-gerekli-belgeler"
      aria-labelledby="sanal-ofis-belgeler-heading"
      className={`${sectionClassName} px-4 py-[60px] font-sans sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="sanal-ofis-belgeler-heading" className="mb-8">
          Sanal Ofis Kiralamak İçin Gerekli Belgeler
        </SectionHeading>
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-6">
          <article className={CARD}>
            <h3 className={H3}>Yeni şirket kuracaksanız</h3>
            <ul className={UL}>
              <li>Kimlik fotokopisi (önlü arkalı)</li>
              <li>İkametgâh belgesi (e-Devlet)</li>
              <li>İletişim e-postası ve telefonu</li>
              <li>Şirket türüne göre: ana sözleşme taslağı / unvan bilgisi</li>
            </ul>
          </article>
          <article className={CARD}>
            <h3 className={H3}>Mevcut şirketinizi taşıyacaksanız</h3>
            <ul className={UL}>
              <li>Vergi levhası</li>
              <li>İmza sirküleri</li>
              <li>Ticaret sicil gazetesi / faaliyet belgesi</li>
              <li>Yetkili kimlik fotokopisi</li>
            </ul>
          </article>
          <article className={CARD}>
            <h3 className={H3}>Şahıs şirketi açacaksanız</h3>
            <p className={BODY_P}>
              Şahıs şirketi işe başlama bildirimini e-Devlet&apos;teki İnteraktif Vergi Dairesi üzerinden
              ya da mali müşavirinizle yapabilirsiniz. Adres olarak sanal ofis sözleşmenizi sunarsınız;
              yoklama bu adreste yapılır.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
