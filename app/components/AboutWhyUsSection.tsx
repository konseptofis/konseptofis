import SectionHeading from "./SectionHeading";

type Props = { sectionClassName?: string };

const items: { num: string; title: string; description: string }[] = [
  {
    num: "01",
    title: "Birçok Firmaya Hizmet",
    description:
      "Kurulduğumuz günden bu yana yerli ve yabancı birçok işletmenin yasal adresi olduk.",
  },
  {
    num: "02",
    title: "Çankaya'nın Kalbinde",
    description:
      "Mahall Ankara'da, metro ve toplu taşımaya yürüme mesafesinde prestijli lokasyon.",
  },
  {
    num: "03",
    title: "Şeffaf, Sabit Fiyat",
    description:
      "Stopaj, aidat ve sürpriz fatura yok; sadece kullandığınız hizmete net ödeme.",
  },
  {
    num: "04",
    title: "Aynı Gün Yasal Adres",
    description:
      "Evraklarınız tamamlandığında vergi levhası adresiniz aynı gün hazır.",
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
          <p className="text-[16px] leading-relaxed text-[var(--color-text-muted)]">
            Ankara{" "}
            <span className="text-[var(--color-green)]">sanal ofis</span> arayışınızda
            doğru adres Konsept Ofis. Çankaya Mahall Ankara&apos;nın prestijli iş
            merkezinde, fiziksel ofis maliyeti olmadan yasal iş adresinize kavuşun;
            vergi levhası, ticaret sicil adresi ve tebligat yönetimi tek pakette.
            Kurulduğumuz günden bu yana çok sayıda girişimciye stopajsız ofis kiralama ve
            şeffaf fiyatlandırmayla hizmet veriyoruz. Sadece bir adres değil,
            markanıza kurumsal kimlik kazandıran eksiksiz bir ofis ekosistemi
            sunuyoruz.
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
                <p className="mb-1 text-[17px] font-medium leading-snug text-[var(--foreground)]">
                  {item.title}
                </p>
                <p className="text-[14px] leading-[1.6] text-[var(--color-text-muted)]">
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
