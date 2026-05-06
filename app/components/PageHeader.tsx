import Image from "next/image";
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";

export type { BreadcrumbItem };

type PageHeaderProps = {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
  /** Hero’da H1 altı kısa tanıtım (p). */
  subtitle?: string | null;
  /** display: büyük görsel başlık; seo: cümle yapısında H1 (okunabilir takip). */
  heroTone?: "display" | "seo";
};

export default function PageHeader({
  title,
  breadcrumbs,
  backgroundImage = "/hero-banner.webp",
  subtitle,
  heroTone = "display",
}: PageHeaderProps) {
  const titleId = "page-header-title";
  const h1Classes =
    heroTone === "seo"
      ? "relative z-10 mx-auto max-w-[22rem] px-2 text-center text-[clamp(26px,4.5vw,36px)] font-bold leading-snug tracking-tight text-white drop-shadow sm:max-w-2xl sm:leading-tight"
      : "relative z-10 text-[36px] font-bold leading-tight tracking-tight text-white";

  return (
    <section
      className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden px-4 py-10 sm:min-h-[260px] sm:px-6 sm:py-12"
      aria-labelledby={titleId}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          unoptimized
        />
        {/* Nötr karartma: metin okunur kalsın; yeşil #051a12 tek başına fotoğrafı yeşilmiş gibi gösteriyordu */}
        <div className="absolute inset-0 z-[1] bg-black/55" aria-hidden />
      </div>
      <h1 id={titleId} className={h1Classes}>
        {title}
      </h1>
      {subtitle ? (
        <p className="relative z-10 mx-auto mt-3 max-w-xl px-2 text-center text-[15px] leading-relaxed text-white/92 sm:text-[16px] sm:leading-relaxed">
          {subtitle}
        </p>
      ) : null}
      <Breadcrumb
        items={breadcrumbs}
        className={`relative z-10 text-sm text-white/90 ${subtitle ? "mt-5" : "mt-4"}`}
      />
    </section>
  );
}
