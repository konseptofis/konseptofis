import Image from "next/image";
import SectionHeading from "@/app/components/SectionHeading";
import { HOME_CONTAINER, HOME_SECTION_Y } from "@/app/lib/home-ui";

const GALLERY = [
  {
    src: "/assets/images/mahall-slider/mahall-plaza.webp",
    alt: "Mahall Ankara C2 Blok – Konsept Ofis sanal ofis adresi",
    featured: true,
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-3.webp",
    alt: "Konsept Ofis resepsiyonu – kargo ve tebligat teslim noktası",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-2.webp",
    alt: "Konsept Ofis ortak çalışma alanı",
  },
  {
    src: "/assets/images/mahall-slider/cankaya-sanal-ofis-4.webp",
    alt: "Konsept Ofis toplantı odası",
  },
  {
    src: "/assets/images/mahall-slider/ofis-ic-mekan.webp",
    alt: "Konsept Ofis hazır ofis çalışma birimi",
  },
] as const;

export default function HomeMahallSection() {
  const featured = GALLERY[0];
  const tiles = GALLERY.slice(1);

  return (
    <section
      id="mahall-ankara-sanal-ofis"
      aria-labelledby="mahall-heading"
      className={`${HOME_SECTION_Y} bg-white`}
    >
      <div className={HOME_CONTAINER}>
        <SectionHeading id="mahall-heading">
          Mahall Ankara&apos;da Sanal Ofis Adresiniz
        </SectionHeading>
        <div className="mt-4 space-y-5">
          <p className="m-0 text-[16px] leading-[1.7] text-[#3D4743]">
            Ankara&apos;nın yeni iş ve finans merkezi Çankaya Mahall Ankara, sanal ofisiniz için
            stratejik bir konum sunar. Metro ve ana arterlere yürüme mesafesindeki lokasyonumuz,
            müşteri ve iş ortaklarınızın size kolayca ulaşmasını sağlar. A+ ofis standartlarındaki
            bina, modern mimarisi ve prestijli lobisiyle markanızın kurumsal imajını ilk izlenimde
            güçlendirir.
          </p>
          <p className="m-0 text-[16px] leading-[1.7] text-[#3D4743]">
            Çankaya&apos;nın kamu kurumları, mali müşavirler ve hukuk bürolarının yoğun olduğu bu
            merkezde yer almak; resmi işlemlerinizi hızlandırır ve işletmenize güçlü bir konum
            avantajı kazandırır.
          </p>
        </div>

        <ul className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:h-[520px] md:grid-cols-4 md:grid-rows-2 md:overflow-visible md:pb-0">
          <li className="relative h-56 w-[85%] shrink-0 snap-center overflow-hidden rounded-xl bg-[#F5F7F6] md:col-span-2 md:row-span-2 md:h-auto md:w-auto">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 85vw, 50vw"
            />
          </li>
          {tiles.map((img) => (
            <li
              key={img.src}
              className="relative h-56 w-[85%] shrink-0 snap-center overflow-hidden rounded-xl bg-[#F5F7F6] md:h-auto md:w-auto"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 85vw, 25vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
