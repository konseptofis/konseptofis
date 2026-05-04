import Image from "next/image";
import SectionHeading from "./SectionHeading";

type Props = {
  title?: string;
  children: React.ReactNode;
  imageSrc?: string | null;
  imageAlt?: string;
  sectionClassName?: string;
};

export default function ContentWithImage({
  title = "Ankara Çankaya'da Prestijli Sanal Ofis ve Yasal Adres Çözümleri",
  children,
  imageSrc = null,
  imageAlt = "Konsept Ofis - Ankara sanal ofis ve hazır ofis",
  sectionClassName = "bg-white",
}: Props) {
  return (
    <section
      aria-labelledby="content-with-image-heading"
      className={`${sectionClassName} px-4 py-[60px] sm:px-6 lg:px-8`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start content-start gap-10 md:grid-cols-2 md:items-start md:gap-12">
        <div className="order-2 mt-0 self-start pt-0 md:order-1">
          <SectionHeading id="content-with-image-heading">{title}</SectionHeading>
          <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-gray-600 [&_p]:text-[16px]">
            {children}
          </div>
        </div>
        <div className="order-1 relative mt-0 h-[240px] w-full max-w-[500px] shrink-0 self-start overflow-hidden rounded-xl bg-[#f2f2f2] pt-0 sm:h-[300px] md:order-2">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-[#0b7041]/50"
              aria-hidden
            >
              <span className="text-sm">Görsel alanı</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
