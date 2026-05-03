import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Linkedin, Twitter, Instagram } from "lucide-react";
import BlogCard from "@/app/components/BlogCard";
import {
  getExpertBySlug,
  getPublishedPostsByReviewer,
  getPublicExpertSlugs,
  type Expert,
  type ExpertSocialLinks,
} from "@/app/actions/experts";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

const TITLE_SUFFIX = " | Konsept Ofis";

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
    <ul className="mt-5 flex flex-wrap gap-3">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-[#0b7041]/40 hover:text-[#0b7041]"
            aria-label={label}
          >
            <Icon className="h-5 w-5" aria-hidden />
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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) return { title: "Uzman bulunamadı" };
  let title = `${expert.name}${expert.job_title ? ` — ${expert.job_title}` : ""}`;
  if (title.endsWith(TITLE_SUFFIX)) title = title.slice(0, -TITLE_SUFFIX.length);
  return {
    title,
    description: expert.bio ? stripHtml(expert.bio, 160) : undefined,
  };
}

export default async function ExpertDetailPage({ params }: Props) {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);
  if (!expert) notFound();

  const posts = await getPublishedPostsByReviewer(expert.id);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1 text-sm text-gray-500"
        >
          <Link href="/" className="hover:text-[#0b7041]">
            Anasayfa
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden />
          <span className="text-gray-800">{expert.name}</span>
        </nav>

        <article className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-md sm:p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            <div className="mx-auto shrink-0 md:mx-0">
              {expert.avatar_url ? (
                <img
                  src={expert.avatar_url}
                  alt={expert.name}
                  className="h-36 w-36 rounded-2xl object-cover shadow-md sm:h-44 sm:w-44"
                  width={176}
                  height={176}
                />
              ) : (
                <div
                  className="flex h-36 w-36 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 sm:h-44 sm:w-44"
                  aria-hidden
                >
                  —
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{expert.name}</h1>
              {expert.job_title ? (
                <p className="mt-2 text-lg text-[#0b7041] font-medium">{expert.job_title}</p>
              ) : null}
              {expert.bio ? (
                <div
                  className="prose prose-gray prose-p:mb-3 prose-p:last:mb-0 mt-4 max-w-none text-left leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: expert.bio }}
                />
              ) : (
                <p className="mt-4 text-gray-500">Biyografi henüz eklenmemiş.</p>
              )}
              <ExpertSocialBar expert={expert} />
            </div>
          </div>
        </article>

        <section className="mt-14" aria-labelledby="expert-posts-heading">
          <h2
            id="expert-posts-heading"
            className="text-2xl font-semibold tracking-tight text-black sm:text-3xl"
          >
            Bu uzmanın incelediği / yazdığı makaleler
          </h2>
          {posts.length === 0 ? (
            <p className="mt-6 text-gray-600">Bu uzmana bağlı yayında makale yok.</p>
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
                  featuredImage={p.featured_image}
                  featuredImageAlt={p.featured_image_alt ?? p.title}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
