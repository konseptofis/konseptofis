import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categorySlug?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  /** İlgili yazılar gibi dar alanlarda daha kompakt kart */
  compact?: boolean;
};

function CategoryBadge({
  category,
  categorySlug,
}: {
  category: string;
  categorySlug?: string | null;
}) {
  const className =
    "absolute left-3 top-3 z-10 rounded bg-[#0b7041] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#095530]";

  if (categorySlug) {
    return (
      <Link href={`/kategori/${categorySlug}`} className={className}>
        {category}
      </Link>
    );
  }

  return <span className={className}>{category}</span>;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  category,
  categorySlug,
  featuredImage,
  featuredImageAlt,
  compact = false,
}: BlogCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-lg border border-[#e5e5e5] bg-white ${compact ? "shadow-sm" : "shadow-md"}`}
    >
      <div
        className={`relative w-full bg-[#f2f2f2] ${compact ? "aspect-[5/3]" : "aspect-video"}`}
      >
        <Link href={`/${slug}`} className="relative block h-full w-full">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={featuredImageAlt || title}
              fill
              sizes={
                compact
                  ? "(max-width: 640px) 100vw, 280px"
                  : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              }
              className="object-cover"
              loading="lazy"
            />
          ) : null}
        </Link>
        {category ? (
          <CategoryBadge category={category} categorySlug={categorySlug} />
        ) : null}
      </div>
      <div className={compact ? "p-4" : "p-5"}>
        <p className="text-xs text-gray-500">{date}</p>
        <h2
          className={`line-clamp-2 font-bold text-black ${compact ? "mt-1.5 text-base" : "mt-2 text-lg"}`}
        >
          <Link href={`/${slug}`} className="hover:text-[#0b7041]">
            {title}
          </Link>
        </h2>
        <p
          className={`text-sm leading-relaxed text-gray-600 ${compact ? "mt-1.5 line-clamp-2" : "mt-2 line-clamp-3"}`}
        >
          {excerpt}
        </p>
        <Link
          href={`/${slug}`}
          className={`inline-flex items-center gap-1 text-sm font-medium text-[#0b7041] hover:underline ${compact ? "mt-3" : "mt-4"}`}
        >
          Devamını Oku
          <ChevronRightIcon className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
