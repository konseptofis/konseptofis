"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const INTERVAL_MS = 4000;

export type IntroImageSliderItem = {
  src: string;
  alt: string;
};

type Props = {
  images: readonly IntroImageSliderItem[];
  /** Ek sınıflar (ör. Mahall kolonunda tam yükseklik). */
  className?: string;
};

export default function IntroImageSlider({ images, className = "" }: Props) {
  const len = images.length;
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (len === 0) return;
      setActive(((index % len) + len) % len);
      setTick((t) => t + 1);
    },
    [len],
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % len);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [len, tick]);

  if (len === 0) return null;

  return (
    <div
      className={`flex h-full min-h-[260px] w-full flex-col sm:min-h-[280px] lg:min-h-[min(100%,26rem)] ${className}`.trim()}
    >
      <div
        className="relative flex-1 overflow-hidden rounded-xl bg-[#ececec]"
        aria-roledescription="carousel"
        aria-label="Konsept Ofis görselleri"
      >
        <div className="relative aspect-[4/3] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {len > 1 ? (
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Slayt seçimi"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Görsel ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-[transform,background-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] ${
                i === active
                  ? "scale-110 bg-[var(--color-green)]"
                  : "bg-[var(--color-green)]/35 hover:bg-[var(--color-green)]/55"
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
