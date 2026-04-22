import Image from "next/image";
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";

export type { BreadcrumbItem };

type PageHeaderProps = {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
};

export default function PageHeader({
  title,
  breadcrumbs,
  backgroundImage = "/konsept-ofis-ankara-sanal-ofis.webp",
}: PageHeaderProps) {
  const titleId = "page-header-title";

  return (
    <section
      className="relative flex min-h-[220px] flex-col items-center justify-center px-4 py-10 sm:min-h-[260px] sm:px-6 sm:py-12"
      aria-labelledby={titleId}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#051a12]/80" aria-hidden />
      </div>
      <h1
        id={titleId}
        className="relative z-10 text-[36px] font-bold leading-tight tracking-tight text-white"
      >
        {title}
      </h1>
      <Breadcrumb items={breadcrumbs} className="relative z-10 mt-4 text-sm text-white/90" />
    </section>
  );
}
