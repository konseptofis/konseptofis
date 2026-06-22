import Image from "next/image";
import type { IntroSliderImage } from "@/app/lib/hizmet-detay-data";

type Props = {
  image: IntroSliderImage;
};

/** Mahall spotlight — tek statik görsel (1280×900 oran). */
export default function IntroSpotlightImage({ image }: Props) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[min(100%,420px)] overflow-hidden rounded-xl bg-[#ececec] aspect-[1280/900] lg:max-w-[480px] ${image.containerClassName ?? ""}`.trim()}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
