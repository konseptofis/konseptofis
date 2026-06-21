import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";
import BlogCard from "@/app/components/BlogCard";
import { getPublishedPostsByCategory } from "@/app/actions/blog";
import { getCategoryBySlug, getCategories, getPublicCategorySlugs } from "@/app/actions/categories";
import { buildCategorySlugLookup, resolveCategorySlug } from "@/lib/category-utils";
import { SITE } from "@/app/lib/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import CategoryArchiveJsonLd from "@/app/components/seo/CategoryArchiveJsonLd";

export const revalidate = 300;

const POSTS_PER_PAGE = 6;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const siteOrigin = SITE.domain.replace(/\/$/, "");

function stripHtml(html: string, maxLen = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length <= maxLen ? text : text.slice(0, maxLen) + "…";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  try {
    const slugs = await getPublicCategorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Kategori bulunamadı" };

  const title = category.meta_title?.trim() || `${category.name} - Konsept Ofis Blog`;
  const description =
    category.meta_description?.trim() ||
    `${category.name} hakkında güncel yazılar ve rehberler.`;
  const canonicalPath = `/kategori/${category.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: `${siteOrigin}${canonicalPath}`,
      siteName: SITE.name,
      locale: "tr_TR",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function CategoryArchivePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const categoryPath = `/kategori/${category.slug}`;

  const [allPosts, allCategories] = await Promise.all([
    getPublishedPostsByCategory(slug),
    getCategories(),
  ]);
  const categorySlugLookup = buildCategorySlugLookup(allCategories);

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <CategoryArchiveJsonLd category={category} posts={allPosts} />
      <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title={category.name}
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.name },
        ]}
      />
      <section
        className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="category-posts-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="category-posts-heading" className="sr-only">
            {category.name} kategorisindeki yazılar
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={stripHtml(post.content ?? post.meta_description ?? "", 160)}
                  date={formatDate(post.created_at)}
                  category={post.category ?? ""}
                  categorySlug={resolveCategorySlug(post.category, categorySlugLookup)}
                  featuredImage={post.featured_image}
                  featuredImageAlt={post.featured_image_alt ?? post.title}
                />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-gray-500">
              Bu kategoride henüz yazı bulunmuyor.{" "}
              <Link href="/blog" className="font-medium text-[#0b7041] hover:underline">
                Tüm yazılara dön
              </Link>
            </p>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
              aria-label="Kategori sayfa navigasyonu"
            >
              <Link
                href={
                  currentPage <= 1
                    ? categoryPath
                    : currentPage === 2
                      ? categoryPath
                      : `${categoryPath}?page=${currentPage - 1}`
                }
                className={`inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage <= 1
                    ? "cursor-not-allowed border-[#e5e5e5] bg-[#f5f5f5] text-gray-400"
                    : "border-[#e5e5e5] bg-white text-gray-700 hover:border-[#0b7041] hover:bg-[#0b7041]/5 hover:text-[#0b7041]"
                }`}
                aria-disabled={currentPage <= 1}
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden />
                Önceki
              </Link>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={p === 1 ? categoryPath : `${categoryPath}?page=${p}`}
                    className={`min-w-[2.5rem] rounded-lg border px-3 py-2 text-center text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "border-[#0b7041] bg-[#0b7041] text-white"
                        : "border-[#e5e5e5] bg-white text-gray-700 hover:border-[#0b7041] hover:bg-[#0b7041]/5 hover:text-[#0b7041]"
                    }`}
                    aria-current={p === currentPage ? "page" : undefined}
                  >
                    {p}
                  </Link>
                ))}
              </div>
              <Link
                href={
                  currentPage >= totalPages
                    ? `${categoryPath}?page=${totalPages}`
                    : `${categoryPath}?page=${currentPage + 1}`
                }
                className={`inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage >= totalPages
                    ? "cursor-not-allowed border-[#e5e5e5] bg-[#f5f5f5] text-gray-400"
                    : "border-[#e5e5e5] bg-white text-gray-700 hover:border-[#0b7041] hover:bg-[#0b7041]/5 hover:text-[#0b7041]"
                }`}
                aria-disabled={currentPage >= totalPages}
              >
                Sonraki
                <ChevronRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </nav>
          )}
        </div>
      </section>
    </main>
    </>
  );
}
