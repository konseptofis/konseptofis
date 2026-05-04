import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import BlogCard from "@/app/components/BlogCard";
import { getPublishedPosts } from "@/app/actions/blog";
import { SITE } from "@/app/lib/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const BLOG_TITLE = "Blog | Konsept Ofis";
const BLOG_DESCRIPTION =
  "Şirket kuruluş maliyetleri, sanal ofis avantajları, e-ticaret vergi rehberi ve girişimcilik ekosistemi hakkında uzman onaylı en güncel makaleler.";

export const metadata: Metadata = {
  title: { absolute: BLOG_TITLE },
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${SITE.domain.replace(/\/$/, "")}/blog`,
    siteName: SITE.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: BLOG_TITLE, description: BLOG_DESCRIPTION },
};

export const revalidate = 0;

const BLOG_POSTS_PER_PAGE = 6;

type Props = { searchParams: Promise<{ page?: string }> };

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

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const allPosts = await getPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / BLOG_POSTS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + BLOG_POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PageHeader
        title="Blog"
        breadcrumbs={[{ label: "Anasayfa", href: "/" }, { label: "Blog" }]}
      />
      <section
        className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="blog-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="blog-heading" className="sr-only">
            Blog yazıları
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={stripHtml(post.content ?? post.meta_description ?? "", 160)}
                date={formatDate(post.created_at)}
                category={post.category ?? ""}
                featuredImage={post.featured_image}
                featuredImageAlt={post.featured_image_alt ?? post.title}
              />
            ))}
          </div>

          {posts.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              Henüz yayınlanmış yazı bulunmuyor.
            </p>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
              aria-label="Blog sayfa navigasyonu"
            >
              <Link
                href={currentPage <= 1 ? "/blog" : `/blog?page=${currentPage - 1}`}
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
                    href={p === 1 ? "/blog" : `/blog?page=${p}`}
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
                href={currentPage >= totalPages ? `/blog?page=${totalPages}` : `/blog?page=${currentPage + 1}`}
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
  );
}
