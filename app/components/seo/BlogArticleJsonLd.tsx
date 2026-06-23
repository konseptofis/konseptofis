import type { Post } from "@/app/actions/blog";
import { buildBreadcrumbListJsonLd, breadcrumbPageUrl } from "@/app/lib/breadcrumb-jsonld";
import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");
const DEFAULT_ARTICLE_IMAGE = `${ORIGIN}/ankara-sanal-ofis-logo.webp`;
const LOGO_URL = `${ORIGIN}/ankara-sanal-ofis-logo.webp`;

function articleDescription(post: Post): string {
  if (post.meta_description?.trim()) return post.meta_description.trim();
  if (post.content?.trim()) {
    const text = post.content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length <= 160 ? text : `${text.slice(0, 160)}…`;
  }
  return post.title;
}

function articleImageUrl(post: Post): string {
  const raw = post.featured_image?.trim();
  if (!raw) return DEFAULT_ARTICLE_IMAGE;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return raw.startsWith("/") ? `${ORIGIN}${raw}` : `${ORIGIN}/${raw}`;
}

function absoluteAssetUrl(raw: string | null | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return value.startsWith("/") ? `${ORIGIN}${value}` : `${ORIGIN}/${value}`;
}

function toIso8601(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

function reviewerPersonNode(post: Post, pageUrl: string) {
  if (!post.reviewer) return null;
  const avatar = absoluteAssetUrl(post.reviewer.avatar_url);
  return {
    "@type": "Person" as const,
    "@id": `${pageUrl}#reviewer`,
    name: post.reviewer.name,
    ...(post.reviewer.job_title ? { jobTitle: post.reviewer.job_title } : {}),
    url: `${ORIGIN}/uzmanlar/${post.reviewer.slug}`,
    ...(avatar ? { image: avatar } : {}),
  };
}

type Props = { post: Post };

/**
 * Article + BreadcrumbList JSON-LD.
 * Denetim tarihi: dateModified içerik düzenlemesidir; uzman inceleme tarihi ayrı Review node'unda
 * (reviewedBy Person + Review.datePublished = reviewed_at) — Google E-E-A-T için önerilen ayrım.
 */
export default function BlogArticleJsonLd({ post }: Props) {
  const pageUrl = breadcrumbPageUrl(`/${post.slug}`);
  const articleId = `${pageUrl}#article`;
  const reviewerNode = reviewerPersonNode(post, pageUrl);
  const reviewedByRef = reviewerNode ? { "@id": reviewerNode["@id"] } : undefined;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": articleId,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      headline: post.title,
      description: articleDescription(post),
      image: articleImageUrl(post),
      datePublished: toIso8601(post.created_at),
      dateModified: toIso8601(post.updated_at || post.created_at),
      author: {
        "@type": "Organization",
        name: SITE.name,
        url: `${ORIGIN}/`,
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
        },
      },
      ...(reviewedByRef ? { reviewedBy: reviewedByRef } : {}),
    },
    buildBreadcrumbListJsonLd(
      [
        { label: "Anasayfa", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ],
      pageUrl,
    ),
  ];

  if (reviewerNode) {
    graph.push(reviewerNode);
  }

  if (post.reviewed_at && reviewerNode) {
    graph.push({
      "@type": "Review",
      "@id": `${pageUrl}#review`,
      author: { "@id": reviewerNode["@id"] },
      datePublished: toIso8601(post.reviewed_at),
      itemReviewed: { "@id": articleId },
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      id={`ld-json-blog-article-${post.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
