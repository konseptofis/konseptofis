import SectionHeading from "./SectionHeading";

type Props = { sectionClassName?: string };

const items: { num: string; title: string; description: string }[] = [
  {
    num: "01",
    title: "Güven Veren Kaliteli Hizmet",
    description: "Sektörün en güvenilir iş ortağı olarak her adımda yanınızdayız.",
  },
  {
    num: "02",
    title: "Sektörel Deneyim",
    description: "Yılların birikimi ile sektörü derinlemesine tanıyan bir ekip.",
  },
  {
    num: "03",
    title: "Her Bütçeye Uygun Fiyatlar",
    description: "Startup'tan kurumsal firmalara kadar herkes için uygun paket.",
  },
  {
    num: "04",
    title: "Onlarca Mutlu Firma",
    description: "Binlerce üyemiz hedeflerine hızla ulaşmanın keyfini yaşıyor.",
  },
];

export default function AboutWhyUsSection({
  sectionClassName = "bg-white",
}: Props) {
  return (
    <section
      id="hakkimizda"
      aria-labelledby="about-why-heading"
      className={`${sectionClassName} bg-[var(--color-white)] px-4 py-20 font-sans sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 w-full text-left">
          <SectionHeading id="about-why-heading" className="mb-4">
            Sanal Ofis için Neden Konsept Ofis?
          </SectionHeading>
          <p className="text-[17px] leading-relaxed text-[var(--color-text-muted)]">
            2 sene önce yabancı ve yerli girişimcilerin,{" "}
            <span className="text-[var(--color-green)]">hazır ofis</span> ve{" "}
            <span className="text-[var(--color-green)]">sanal ofis</span> imkânlarından
            yararlanmaları için kurulduk. Esnek hizmet çözümlerimiz ile binlerce
            üyemizin sermayelerini ofislerine değil, işlerine yatırmasına ve
            hedeflerine hızlı ulaşmalarına destek olduk.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-px bg-[var(--color-border-tertiary)] md:grid-cols-[minmax(0,47fr)_minmax(0,53fr)]">
          {items.map((item) => (
            <div
              key={item.num}
              className="flex min-w-0 items-center gap-4 bg-[var(--color-white)] px-5 py-6 sm:px-6"
            >
              <span
                className="w-11 shrink-0 text-right text-[32px] font-medium leading-none text-[var(--color-green)] opacity-90 sm:w-12 sm:text-4xl"
                aria-hidden
              >
                {item.num}
              </span>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-medium leading-snug text-[var(--foreground)]">
                  {item.title}
                </p>
                <p className="text-[13px] leading-[1.6] text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
