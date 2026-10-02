import SectionHeading from "@/app/components/SectionHeading";
import { SITE } from "@/app/lib/data";
import { HOME_BG_MUTED, HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

const STEPS: { num: string; title: string; description: string; href?: string }[] = [
  {
    num: "1",
    title: "Bizi arayın",
    description: "Faaliyet alanınızı birlikte değerlendirelim.",
    href: SITE.phoneHref,
  },
  {
    num: "2",
    title: "Sanal ofis sözleşmenizi imzalayın",
    description: "Sözleşmenizi imzalayıp muhasebecinize gönderin.",
  },
  {
    num: "3",
    title: "Yoklama ve vergi levhası",
    description:
      "Vergi dairesi yoklamasının ardından levhanız Konsept Ofis'in adresiyle düzenlenir.",
  },
  {
    num: "4",
    title: "Adresinizi kullanmaya başlayın",
    description: "Prestijli konumda adresiniz kullanıma hazır.",
  },
];

const TITLE_CLASS =
  "text-[17px] font-semibold leading-snug text-[var(--color-text-primary)]";

function StepTitle({ item }: { item: (typeof STEPS)[number] }) {
  if (!item.href) return <>{item.title}</>;
  return (
    <a href={item.href} className="text-inherit no-underline hover:text-[var(--color-green)]">
      {item.title}
    </a>
  );
}

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
            className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-[#E3E8E5] lg:block"
            aria-hidden
          />
          <ol className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
            {STEPS.map((item) => (
              <li key={item.num} className="relative flex flex-col items-center text-center">
                <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-green)] bg-white text-[15px] font-semibold text-[var(--color-green)]">
                  {item.num}
                </span>
                <p className={`mt-4 mb-1 ${TITLE_CLASS}`}>
                  <StepTitle item={item} />
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
                  <p className={`mb-1 ${TITLE_CLASS}`}>
                    <StepTitle item={item} />
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
