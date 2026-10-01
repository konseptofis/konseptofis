import SectionHeading from "@/app/components/SectionHeading";
import { HOME_BG_MUTED, HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

const STEPS: { num: string; title: string; description: string }[] = [
  {
    num: "1",
    title: "Teklif alın",
    description:
      "WhatsApp veya formdan faaliyet alanınızı iletin; NACE uygunluğunu kontrol edelim.",
  },
  {
    num: "2",
    title: "Belgeleri gönderin",
    description: "Yukarıdaki listedeki evrakları e-posta ile iletin.",
  },
  {
    num: "3",
    title: "Sözleşmeyi imzalayın",
    description: "Hizmet sözleşmesi ve faturanız düzenlenir.",
  },
  {
    num: "4",
    title: "Adresinizi kullanın",
    description:
      "Evraklarınız tamam olduğunda adres aynı gün kullanıma hazırdır; şirket kuruluşu veya adres değişikliğini başlatırsınız.",
  },
  {
    num: "5",
    title: "Yoklama ve vergi levhası",
    description:
      "Vergi dairesi yoklamasının ardından levhanız Mahall Ankara adresiyle düzenlenir.",
  },
];

export default function HomeHowToRentSection() {
  return (
    <section
      id="sanal-ofis-nasil-kiralanir"
      aria-labelledby="sanal-ofis-nasil-heading"
      className={`${HOME_SECTION_Y} ${HOME_BG_MUTED} font-sans`}
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="sanal-ofis-nasil-heading" className="mb-10">
          Sanal Ofis Nasıl Kiralanır?
        </SectionHeading>

        <div className="relative hidden md:block">
          <div
            className="absolute top-5 right-[10%] left-[10%] h-px bg-[#E3E8E5]"
            aria-hidden
          />
          <ol className="grid grid-cols-5 gap-6">
            {STEPS.map((item) => (
              <li key={item.num} className="relative flex flex-col items-center text-center">
                <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-green)] bg-white text-[15px] font-semibold text-[var(--color-green)]">
                  {item.num}
                </span>
                <p className="mt-4 mb-1 text-[17px] font-semibold leading-snug text-[var(--color-text-primary)]">
                  {item.title}
                </p>
                <p className="text-[15px] leading-[1.65] text-[#3D4743]">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative md:hidden">
          <div
            className="absolute top-5 bottom-5 left-5 w-px bg-[#E3E8E5]"
            aria-hidden
          />
          <ol className="space-y-8 pl-2">
            {STEPS.map((item) => (
              <li key={item.num} className="relative flex items-start gap-4">
                <span className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-green)] bg-white text-[15px] font-semibold text-[var(--color-green)]">
                  {item.num}
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="mb-1 text-[17px] font-semibold leading-snug text-[var(--color-text-primary)]">
                    {item.title}
                  </p>
                  <p className="text-[15px] leading-[1.65] text-[#3D4743]">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
