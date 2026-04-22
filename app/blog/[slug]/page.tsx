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
import TableOfContents from "@/app/components/blog/TableOfContents";
import ArticleSchema from "@/app/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/app/components/seo/BreadcrumbSchema";
import FAQSchema from "@/app/components/seo/FAQSchema";
import { processHeadings } from "@/lib/headings";
import { getPostBySlug, getPublishedPosts } from "@/app/actions/blog";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

const TITLE_SUFFIX = " | Konsept Ofis";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  let title = post.meta_title ?? post.title;
  if (title.endsWith(TITLE_SUFFIX)) title = title.slice(0, -TITLE_SUFFIX.length);
  return {
    title,
    description: post.meta_description ?? undefined,
  };
}

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

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPublished = await getPublishedPosts();
  const related = allPublished
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const { html: contentWithIds, items: tocItems } =
    post.content ? processHeadings(post.content) : { html: "", items: [] };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ArticleSchema
        post={{
          title: post.title,
          description: post.meta_description ?? undefined,
          image: post.featured_image ?? undefined,
          publishedAt: post.created_at,
          modifiedAt: post.updated_at,
          slug: post.slug,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Anasayfa", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <FAQSchema faqs={post.faqs ?? undefined} />
      <header className="px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center justify-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0b7041]">
              Anasayfa
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
            <Link href="/blog" className="hover:text-[#0b7041]">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
            <span className="max-w-[200px] truncate sm:max-w-xs" title={post.title}>
              {post.title}
            </span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            {post.category?.trim() ? `${post.category.trim()} | ${formatDate(post.created_at)}` : formatDate(post.created_at)}
          </p>
          {post.featured_image && (
            <div className="mt-8 overflow-hidden rounded-lg shadow-md">
              <img
                src={post.featured_image}
                alt={post.featured_image_alt || post.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {(tocItems.length > 0 || (post.faqs && post.faqs.length > 0)) && (
            <div className="mb-8">
              <TableOfContents items={tocItems} faqs={post.faqs ?? undefined} />
            </div>
          )}

          {post.content ? (
            <article
              className="prose prose-gray max-w-none text-justify leading-relaxed prose-headings:font-semibold prose-a:text-[#0b7041] prose-img:rounded-lg [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:list-item [&_li]:my-0.5 [&_h2]:mt-6 [&_h2]:mb-1.5 [&_h3]:mt-4 [&_h3]:mb-1.5 [&>:first-child]:mt-2"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
              style={{ fontSize: "16px" }}
            />
          ) : (
            <article className="space-y-6 leading-relaxed text-gray-700">
              <p>Bu yazının içeriği henüz eklenmemiş.</p>
            </article>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <section
              className="mt-10"
              aria-labelledby="sikca-sorulan-sorular"
            >
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
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#e5e5e5] pt-8">
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
        </div>
      </div>

      {related.length > 0 && (
        <section
          className="bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
          aria-labelledby="related-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="related-heading"
              className="text-2xl font-semibold tracking-tight text-black sm:text-3xl"
            >
              İlginizi Çekebilecek Diğer Yazılar
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard
                  key={p.id}
                  slug={p.slug}
                  title={p.title}
                  excerpt={stripHtml(p.content ?? p.meta_description ?? "", 160)}
                  date={formatDate(p.created_at)}
                  category={p.category ?? ""}
                  featuredImage={p.featured_image}
                  featuredImageAlt={p.featured_image_alt ?? p.title}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
