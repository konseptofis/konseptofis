import { Building2, Clock, MapPin, Receipt, type LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { HOME_CONTAINER } from "@/app/lib/home-ui";

const WHY_US_ITEMS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Birçok Firmaya Hizmet",
    description:
      "Kurulduğumuz günden bu yana yerli ve yabancı birçok işletmenin yasal adresi olduk.",
    icon: Building2,
  },
  {
    title: "Çankaya'nın Kalbinde",
    description:
      "Mahall Ankara'da, metro ve toplu taşımaya yürüme mesafesinde prestijli lokasyon.",
    icon: MapPin,
  },
  {
    title: "Şeffaf, Sabit Fiyat",
    description:
      "Stopaj, aidat ve sürpriz fatura yok; sadece kullandığınız hizmete net ödeme.",
    icon: Receipt,
  },
  {
    title: "Aynı Gün Yasal Adres",
    description:
      "Evraklarınız tamamlandığında vergi levhası adresiniz aynı gün hazır.",
    icon: Clock,
  },
];

export default function AboutWhyUsSection() {
  return (
    <section
      id="hakkimizda"
      aria-labelledby="about-why-heading"
      className="bg-white py-16 font-sans lg:py-24"
    >
      <div className={HOME_CONTAINER}>
        <div className="lg:grid lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <SectionHeading id="about-why-heading" className="mb-5 lg:mb-6">
              Sanal Ofis için Neden Konsept Ofis?
            </SectionHeading>
            <p className="m-0 text-[16px] leading-[1.65] text-[#3D4743]">
              Ankara{" "}
              <span className="text-[var(--color-green)]">sanal ofis</span> arayışınızda doğru adres
              Konsept Ofis. Çankaya Mahall Ankara&apos;nın prestijli iş merkezinde, fiziksel ofis
              maliyeti olmadan yasal iş adresinize kavuşun; vergi levhası, ticaret sicil adresi ve
              tebligat yönetimi tek pakette. Kurulduğumuz günden bu yana çok sayıda girişimciye
              stopajsız ofis kiralama ve şeffaf fiyatlandırmayla hizmet veriyoruz. Sadece bir adres
              değil, markanıza kurumsal kimlik kazandıran eksiksiz bir ofis ekosistemi sunuyoruz.
            </p>
          </div>

          <ul className="mt-10 grid list-none grid-cols-2 items-stretch gap-3 p-0 md:gap-5 lg:mt-0">
            {WHY_US_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex min-h-0 min-w-0">
                  <article className="flex h-full w-full min-w-0 flex-col rounded-[12px] border border-[#E3E8E5] bg-white p-4 shadow-none transition-colors duration-150 hover:border-[var(--color-green)] md:p-6">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#0b7041]/[0.08] md:h-11 md:w-11"
                      aria-hidden
                    >
                      <Icon
                        className="h-[18px] w-[18px] text-[#0b7041] md:h-5 md:w-5"
                        strokeWidth={1.75}
                      />
                    </div>
                    <p className="mb-1.5 mt-4 text-[15px] font-semibold leading-snug text-[var(--color-text-primary)] md:text-[17px]">
                      {item.title}
                    </p>
                    <p className="m-0 text-[14px] leading-[1.65] text-[#3D4743] md:text-[15px]">
                      {item.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
