import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
};

export default function BlogCard({ slug, title, excerpt, date, category, featuredImage, featuredImageAlt }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white shadow-md">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-video w-full bg-[#f2f2f2]">
          {featuredImage ? (
            <img src={featuredImage} alt={featuredImageAlt || title} className="h-full w-full object-cover" />
          ) : null}
          <div className="absolute left-3 top-3 rounded bg-[#0b7041] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {category}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs text-gray-500">{date}</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-bold text-black">
          <Link href={`/blog/${slug}`} className="hover:text-[#0b7041]">
            {title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0b7041] hover:underline"
        >
          Devamını Oku
          <ChevronRightIcon className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
