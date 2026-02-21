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
    line1: "+2",
    line2: "Yıllık Deneyim",
  },
  {
    icon: WalletIcon,
    line1: "Her Bütçeye",
    line2: "Uygun Fiyatlar",
  },
  {
    icon: BuildingOffice2Icon,
    line1: "+4800 Mutlu",
    line2: "Firma",
  },
];

export default function AboutWhyUsSection() {
  return (
    <section
      id="hakkimizda"
      aria-labelledby="about-why-heading"
      className="bg-white px-4 pt-[75px] pb-[60px] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="max-w-lg">
            <h2
              id="about-why-heading"
              className="mb-4 flex items-center gap-3 text-left tracking-tight text-black"
            >
              <span
                className="h-10 w-0.5 shrink-0 rounded-full bg-[#0b7041] sm:h-12"
                aria-hidden
              />
              Sanal Ofis için Neden Konsept Ofis?
            </h2>
            <p className="leading-relaxed text-gray-600">
              2 sene önce yabancı ve yerli girişimcilerin,{" "}
              <span style={{ color: ACCENT }}>hazır ofis</span> ve{" "}
              <span style={{ color: ACCENT }}>sanal ofis</span> imkânlarından
              yararlanmaları için kurulduk. Esnek hizmet çözümlerimiz ile binlerce
              üyemizin sermayelerini ofislerine değil, işlerine yatırmasına ve
              hedeflerine hızlı ulaşmalarına destek olduk.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.line1}
                  className="flex flex-row items-center gap-3 sm:gap-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12"
                    aria-hidden
                  >
                    <Icon
                      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
                      style={{ color: ACCENT }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-black sm:text-base">
                      {item.line1}
                    </p>
                    <p className="text-sm font-bold leading-tight text-black sm:text-base">
                      {item.line2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
