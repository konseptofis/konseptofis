import SectionHeading from "./SectionHeading";

/** Heroicons 24 outline paths — inline SVG 15×15, stroke 1.6 */
const ICON_PATHS = {
  shield:
    "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  trophy:
    "M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0",
  creditCard:
    "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
  users:
    "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
} as const;

const LIST_ITEMS: { icon: keyof typeof ICON_PATHS; label: string }[] = [
  { icon: "shield", label: "Yasal ve Güvenilir Altyapı" },
  { icon: "trophy", label: "Kesintisiz Hizmet" },
  { icon: "creditCard", label: "Stopajsız Esnek Paketler" },
  { icon: "users", label: "Mutlu Girişimciler" },
];

function RowIcon({ path }: { path: string }) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-[var(--color-green)]"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d={path}
      />
    </svg>
  );
}

type WhyKonseptOfisSectionProps = {
  /** Örn. anasayfa / hizmetler zebra ile `bg-white` veya yeşilimsi ton */
  sectionClassName?: string;
};

export default function WhyKonseptOfisSection({
  sectionClassName = "bg-[var(--color-white)]",
}: WhyKonseptOfisSectionProps) {
  return (
    <section
      aria-labelledby="why-heading"
      className={`${sectionClassName} px-4 py-20 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-[72px]">
          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] text-[var(--color-green)]">
              NEDEN KONSEPT OFİS?
            </p>
            <SectionHeading id="why-heading" className="mt-2 !leading-[1.3]">
              Ankara&apos;da Prestijli Hazır Ofis ve{" "}
              <span className="text-[var(--color-green)]">Yasal İş Adresi</span>
            </SectionHeading>
            <p className="mt-4 text-[16px] leading-[1.8] text-[var(--color-text-secondary)]">
              İster yeni bir şirket kuruluşu yapın, ister işinizi Ankara Çankaya&apos;nın merkezine
              taşıyın; stopajsız ve aidatsız kiralık çalışma alanlarımızla yanınızdayız. Girişimciler ve
              profesyoneller için sunduğumuz esnek sanal ofis paketleri, kargo yönetimi ve modern toplantı
              odası altyapımızla sermayenizi fiziki ofis giderlerine değil, doğrudan işinizi büyütmeye
              ayırın.
            </p>
          </div>

          <div className="flex min-w-0 flex-col">
            {LIST_ITEMS.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center gap-[14px] border-[var(--color-border-tertiary)] py-4 ${
                  index < LIST_ITEMS.length - 1 ? "border-b-[0.5px]" : ""
                }`}
              >
                <div
                  className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-green-tint)]"
                  aria-hidden
                >
                  <RowIcon path={ICON_PATHS[item.icon]} />
                </div>
                <p className="min-w-0 text-[17px] font-medium leading-snug text-[var(--color-text-primary)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
