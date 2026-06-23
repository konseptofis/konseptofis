import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  ShareIcon,
  EnvelopeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import BlogCard from "@/app/components/BlogCard";
import AccordionFAQ from "@/app/components/AccordionFAQ";
import BlogSidebar from "@/app/components/blog/BlogSidebar";
import TableOfContents from "@/app/components/blog/TableOfContents";
import { processHeadings } from "@/lib/headings";
import { enhanceContentHtml } from "@/lib/enhance-content-html";
import { getPostBySlug, getPublishedPosts } from "@/app/actions/blog";
import { getCategories } from "@/app/actions/categories";
import { buildCategorySlugLookup, resolveCategorySlug } from "@/lib/category-utils";
import { SITE } from "@/app/lib/data";
import { isReservedBlogRootSegment } from "@/app/lib/blog-root-path";
import BlogArticleJsonLd from "@/app/components/seo/BlogArticleJsonLd";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

const TITLE_SUFFIX = " | Konsept Ofis";
const ORIGIN = SITE.domain.replace(/\/$/, "");
const DEFAULT_OG_IMAGE = `${ORIGIN}/ankara-sanal-ofis-logo.webp`;

function stripHtml(html: string, maxLen = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length <= maxLen ? text : text.slice(0, maxLen) + "…";
}

function postDescription(post: {
  meta_description: string | null;
  content: string | null;
  title: string;
}): string {
  if (post.meta_description?.trim()) return post.meta_description.trim();
  if (post.content?.trim()) return stripHtml(post.content, 160);
  return post.title;
}

function postOgImageUrl(featuredImage: string | null | undefined): string {
  const raw = featuredImage?.trim();
  if (!raw) return DEFAULT_OG_IMAGE;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return raw.startsWith("/") ? `${ORIGIN}${raw}` : `${ORIGIN}/${raw}`;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (isReservedBlogRootSegment(slug)) notFound();
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  let title = post.meta_title ?? post.title;
  if (title.endsWith(TITLE_SUFFIX)) title = title.slice(0, -TITLE_SUFFIX.length);

  const description = postDescription(post);
  const canonicalPath = `/${slug}`;
  const url = `${ORIGIN}${canonicalPath}`;
  const imageUrl = postOgImageUrl(post.featured_image);
  const imageAlt = post.featured_image_alt?.trim() || post.title;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: SITE.name,
      locale: "tr_TR",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const RELATED_POSTS_GRID =
  "grid grid-cols-[repeat(auto-fill,minmax(min(100%,17.5rem),1fr))] gap-5 sm:gap-6";

export default async function BlogPostRootPage({ params }: Props) {
  const { slug } = await params;
  if (isReservedBlogRootSegment(slug)) notFound();
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPublished = await getPublishedPosts();
  const categories = await getCategories();
  const categorySlugLookup = buildCategorySlugLookup(categories);
  const related = allPublished.filter((p) => p.slug !== slug).slice(0, 3);

  const { html: contentWithIds, items: tocItems } = post.content
    ? processHeadings(post.content)
    : { html: "", items: [] };
  const renderedContent = enhanceContentHtml(contentWithIds);

  const showToc = tocItems.length > 0 || (post.faqs && post.faqs.length > 0);

  return (
    <>
      <BlogArticleJsonLd post={post} />
      <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:gap-12 lg:items-start">
          <div className="min-w-0 text-left">
            <header className="pb-6">
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center justify-start gap-1 text-sm text-gray-500"
              >
                <Link href="/" className="hover:text-[#0b7041]">
                  Anasayfa
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
                <Link href="/blog" className="hover:text-[#0b7041]">
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
                <span className="min-w-0 text-left" title={post.title}>
                  {post.title}
                </span>
              </nav>
              <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-[2.5rem] md:leading-tight">
                {post.title}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-left text-sm text-gray-600">
                {post.category?.trim() ? (
                  <>
                    <span>{post.category.trim()}</span>
                    <span className="text-gray-400" aria-hidden>
                      |
                    </span>
                  </>
                ) : null}
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                {post.reviewer?.name && !post.reviewed_at ? (
                  <>
                    <span className="text-gray-400" aria-hidden>
                      |
                    </span>
                    <Link
                      href={`/uzmanlar/${post.reviewer.slug}`}
                      className="font-medium text-[#0b7041] underline-offset-2 hover:underline"
                    >
                      {post.reviewer.name}
                      {post.reviewer.job_title ? `, ${post.reviewer.job_title}` : ""}
                    </Link>
                  </>
                ) : null}
              </p>
              {post.reviewed_at && post.reviewer?.name ? (
                <p className="mt-2 text-sm text-gray-600">
                  Bu içerik{" "}
                  <time dateTime={post.reviewed_at} className="font-medium text-gray-700">
                    {formatDate(post.reviewed_at)}
                  </time>{" "}
                  tarihinde{" "}
                  <Link
                    href={`/uzmanlar/${post.reviewer.slug}`}
                    className="font-medium text-[#0b7041] underline-offset-2 hover:underline"
                  >
                    {post.reviewer.name}
                  </Link>{" "}
                  tarafından incelenmiştir.
                </p>
              ) : null}
              {post.featured_image && (
                <div className="mt-8 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
            </header>

            {showToc ? (
              <div className="mb-8 mt-8">
                <TableOfContents items={tocItems} faqs={post.faqs ?? undefined} />
              </div>
            ) : null}

            {post.content ? (
              <article
                className="prose prose-gray max-w-none break-words text-justify leading-relaxed prose-headings:text-left prose-headings:font-semibold prose-p:text-justify prose-blockquote:text-justify prose-td:text-justify prose-li:text-left prose-a:text-[#0b7041] prose-img:rounded-lg [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_.tableWrapper]:my-6 [&_.tableWrapper]:w-full [&_.tableWrapper]:overflow-x-auto [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:align-top [&_th]:min-w-[6rem] [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2 [&_td]:align-top [&_td]:min-w-[6rem] [&_pre]:overflow-x-auto [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:list-item [&_li]:my-0.5 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:mt-5 [&_h4]:mb-2.5 [&>:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
                style={{ fontSize: "16px", textAlign: "justify" }}
              />
            ) : (
              <article className="space-y-6 text-left text-justify leading-relaxed text-gray-700">
                <p>Bu yazının içeriği henüz eklenmemiş.</p>
              </article>
            )}

            {post.faqs && post.faqs.length > 0 ? (
              <section className="mt-10 text-left" aria-labelledby="sikca-sorulan-sorular">
                <h2
                  id="sikca-sorulan-sorular"
                  className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
                >
                  Sıkça Sorulan Sorular
                </h2>
                <div className="mt-6">
                  <AccordionFAQ items={post.faqs} idPrefix="blog-faq" />
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-start gap-4 border-t border-[#e5e5e5] pt-8">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ShareIcon className="h-5 w-5 text-[#0b7041]" aria-hidden />
                Paylaş
              </span>
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0b7041]"
                aria-label="E-posta ile paylaş"
              >
                <EnvelopeIcon className="h-5 w-5" />
                E-posta
              </a>
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0b7041]"
                aria-label="Linki kopyala"
              >
                <LinkIcon className="h-5 w-5" />
                Linki kopyala
              </button>
            </div>

            <div className="mt-10 lg:hidden">
              <BlogSidebar />
            </div>
          </div>

          <aside
            className="sticky top-20 hidden min-w-0 shrink-0 self-start lg:mt-12 lg:block"
            aria-label="Sanal ofis tanıtımı"
          >
            <BlogSidebar />
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section
          className="bg-[#f9fafb] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
          aria-labelledby="related-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="related-heading"
              className="mb-5 flex items-start gap-3 text-left text-xl font-semibold leading-snug tracking-tight text-[var(--color-text-primary)] sm:mb-6 sm:text-2xl"
            >
              <span
                className="mt-1 h-6 w-[3px] shrink-0 rounded-full bg-[var(--color-green)] sm:mt-1.5 sm:h-7"
                aria-hidden
              />
              <span className="min-w-0 flex-1">İlginizi Çekebilecek Diğer Yazılar</span>
            </h2>
            <div className={RELATED_POSTS_GRID}>
              {related.map((p) => (
                <BlogCard
                  key={p.id}
                  compact
                  slug={p.slug}
                  title={p.title}
                  excerpt={stripHtml(p.content ?? p.meta_description ?? "", 160)}
                  date={formatDate(p.created_at)}
                  category={p.category ?? ""}
                  categorySlug={resolveCategorySlug(p.category, categorySlugLookup)}
                  featuredImage={p.featured_image}
                  featuredImageAlt={p.featured_image_alt ?? p.title}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
    </>
  );
}
