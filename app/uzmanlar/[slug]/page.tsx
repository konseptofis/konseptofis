import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Linkedin, Twitter, Instagram } from "lucide-react";
import BlogCard from "@/app/components/BlogCard";
import SectionHeading from "@/app/components/SectionHeading";
import {
  getExpertBySlug,
  getPublishedPostsByReviewer,
  getPublicExpertSlugs,
  type Expert,
  type ExpertSocialLinks,
} from "@/app/actions/experts";
import { getCategories } from "@/app/actions/categories";
import { buildCategorySlugLookup, resolveCategorySlug } from "@/lib/category-utils";
import { SITE } from "@/app/lib/data";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

const siteOrigin = SITE.domain.replace(/\/$/, "");

/** Site yeşili — globals ile uyumlu */
const accent = "text-[var(--color-green)]";
const hairline = "border border-[#e5e5e5]";

function stripHtml(html: string, maxLen = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length <= maxLen ? text : text.slice(0, maxLen) + "…";
}

function ogImageUrl(avatar: string | null | undefined): string | undefined {
  if (!avatar?.trim()) return undefined;
  const u = avatar.trim();
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return u.startsWith("/") ? `${siteOrigin}${u}` : `${siteOrigin}/${u}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ExpertSocialBar({ expert }: { expert: Expert }) {
  const s = (expert.social_links ?? {}) as ExpertSocialLinks;
  const items: { href: string; label: string; Icon: typeof Linkedin }[] = [];
  const li = typeof s.linkedin_url === "string" ? s.linkedin_url.trim() : "";
  const tw = typeof s.twitter_url === "string" ? s.twitter_url.trim() : "";
  const ig = typeof s.instagram_url === "string" ? s.instagram_url.trim() : "";
  if (li) items.push({ href: li, label: "LinkedIn", Icon: Linkedin });
  if (tw) items.push({ href: tw, label: "X (Twitter)", Icon: Twitter });
  if (ig) items.push({ href: ig, label: "Instagram", Icon: Instagram });
  if (items.length === 0) return null;

  return (
    <ul className="mt-8 flex flex-wrap gap-2 border-t border-[#e5e5e5] pt-8">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[var(--color-text-muted)] transition-colors hover:border-[#0b7041]/30 hover:text-[#0b7041] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b7041]/25"
            aria-label={label}
          >
            <Icon className="h-[18px] w-[18px] stroke-[1.5]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

export async function generateStaticParams() {
  try {
    const slugs = await getPublicExpertSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) return { title: "Uzman bulunamadı" };

  const fallbackTitle = `${expert.name}${expert.job_title ? ` — ${expert.job_title}` : ""}`;
  const title = expert.meta_title?.trim() || fallbackTitle;

  const description =
    expert.meta_description?.trim() ||
    (expert.bio ? stripHtml(expert.bio, 160) : undefined) ||
    `${fallbackTitle} — ${SITE.name} uzman içerikleri.`;

  const canonicalPath = `/uzmanlar/${expert.slug}`;
  const canonical = `${siteOrigin}${canonicalPath}`;
  const imageUrl = ogImageUrl(expert.avatar_url);
  const noindex = expert.seo_noindex === true;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "tr_TR",
      type: "profile",
      ...(imageUrl ? { images: [{ url: imageUrl, alt: expert.name }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function ExpertDetailPage({ params }: Props) {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) notFound();

  const posts = await getPublishedPostsByReviewer(expert.id);
  const categories = await getCategories();
  const categorySlugLookup = buildCategorySlugLookup(categories);

  return (
    <main className="min-h-screen bg-[var(--background)] font-sans">
      {/* Üst şerit: zebra band 1 */}
      <div className="bg-[var(--color-background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1 text-left text-sm font-normal text-[var(--color-text-muted)]"
        >
          <Link href="/" className="transition-colors hover:text-[#0b7041]">
            Anasayfa
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-border-tertiary)]" aria-hidden />
          <Link href="/blog" className="transition-colors hover:text-[#0b7041]">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-border-tertiary)]" aria-hidden />
          <span className="min-w-0 text-[var(--foreground)]" title={expert.name}>
            {expert.name}
          </span>
        </nav>

        <article
          className={`${hairline} overflow-hidden rounded-lg bg-white`}
          aria-labelledby="expert-heading"
        >
          <div className="flex flex-col gap-8 p-6 sm:p-8 md:flex-row md:items-stretch md:gap-10 md:p-10 lg:gap-12">
            <div className="mx-auto flex shrink-0 justify-center md:mx-0 md:justify-start">
              {expert.avatar_url ? (
                <div className={`${hairline} overflow-hidden rounded-lg bg-[var(--color-silver)]`}>
                  <img
                    src={expert.avatar_url}
                    alt={expert.name}
                    className="h-32 w-32 object-cover sm:h-36 sm:w-36 md:h-40 md:w-40"
                    width={160}
                    height={160}
                  />
                </div>
              ) : (
                <div
                  className={`flex h-32 w-32 items-center justify-center rounded-lg sm:h-36 sm:w-36 md:h-40 md:w-40 ${hairline} bg-[var(--color-background-secondary)] text-sm text-[var(--color-text-secondary)]`}
                  aria-hidden
                >
                  —
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center md:text-left">
              <header>
                <h2
                  id="expert-heading"
                  className="m-0 text-[30px] font-medium leading-snug tracking-tight text-[var(--color-text-primary)]"
                >
                  {expert.name}
                </h2>
                {expert.job_title ? (
                  <p
                    className={`mt-3 text-sm font-medium tracking-wide sm:text-[15px] ${accent}`}
                  >
                    {expert.job_title}
                  </p>
                ) : null}
              </header>

              {expert.bio ? (
                <div
                  className="prose prose-gray mt-6 max-w-2xl break-words text-left prose-headings:mt-6 prose-headings:mb-2 prose-headings:text-base prose-headings:font-semibold prose-headings:text-black first:prose-headings:mt-0 prose-p:mb-3 prose-p:last:mb-0 prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-gray-600 sm:prose-p:text-base sm:prose-p:leading-[1.65] prose-a:text-[#0b7041] prose-a:no-underline hover:prose-a:underline prose-strong:text-black [&_img]:max-w-full [&_img]:h-auto [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_pre]:overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: expert.bio }}
                />
              ) : (
                <p className="mt-6 text-left text-[15px] leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                  Biyografi henüz eklenmemiş.
                </p>
              )}

              <ExpertSocialBar expert={expert} />
            </div>
          </div>
        </article>
      </div>
      </div>

      <section
        className="border-t border-[#e5e5e5] bg-[#f9fafb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="expert-posts-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="expert-posts-heading">Makaleler</SectionHeading>
          {posts.length === 0 ? (
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              Bu uzmana bağlı yayında makale yok.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogCard
                  key={p.id}
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
          )}
        </div>
      </section>
    </main>
  );
}
