import {
  ShieldCheckIcon,
  TrophyIcon,
  WalletIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const ACCENT = "#0b7041";

const stats = [
  {
    icon: ShieldCheckIcon,
    line1: "Güven Veren",
    line2: "Kaliteli Hizmet",
  },
  {
    icon: TrophyIcon,
    line1: "Sektörel",
    line2: "Deneyim",
  },
  {
    icon: WalletIcon,
    line1: "Her Bütçeye",
    line2: "Uygun Fiyatlar",
  },
  {
    icon: BuildingOffice2Icon,
    line1: "Onlarca",
    line2: "Mutlu Firma",
  },
];

type Props = { sectionClassName?: string };

export default function AboutWhyUsSection({
  sectionClassName = "bg-white",
}: Props) {
  return (
    <section
      id="hakkimizda"
      aria-labelledby="about-why-heading"
      className={`${sectionClassName} px-4 pt-[75px] pb-[60px] sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id="about-why-heading"
            className="mb-4 flex items-center justify-center gap-3 tracking-tight text-black sm:mb-5"
          >
            <span
              className="h-7 w-[3px] shrink-0 rounded-full bg-[#0b7041] sm:h-8"
              aria-hidden
            />
            <span className="max-w-[42rem] text-center text-xl font-semibold sm:text-2xl lg:text-3xl">
              Sanal Ofis için Neden Konsept Ofis?
            </span>
          </h2>
          <p className="text-[17px] leading-relaxed text-gray-600">
            2 sene önce yabancı ve yerli girişimcilerin,{" "}
            <span style={{ color: ACCENT }}>hazır ofis</span> ve{" "}
            <span style={{ color: ACCENT }}>sanal ofis</span> imkânlarından
            yararlanmaları için kurulduk. Esnek hizmet çözümlerimiz ile binlerce
            üyemizin sermayelerini ofislerine değil, işlerine yatırmasına ve
            hedeflerine hızlı ulaşmalarına destek olduk.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.line1}>
                <article className="flex h-full flex-col items-center rounded-xl border border-[#e8e8e8] bg-white px-3 py-5 text-center shadow-sm sm:px-4 sm:py-6">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center sm:mb-4 sm:h-12 sm:w-12" aria-hidden>
                    <Icon
                      className="h-9 w-9 sm:h-11 sm:w-11"
                      style={{ color: ACCENT }}
                    />
                  </div>
                  <p className="text-sm font-bold leading-tight text-black sm:text-base">
                    {item.line1}
                  </p>
                  <p className="mt-0.5 text-sm font-bold leading-tight text-black sm:text-base">
                    {item.line2}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
