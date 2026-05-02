import { SITE, SCHEMA_ORGANIZATION_ID } from "@/app/lib/data";

export type ArticleSchemaPost = {
  title: string;
  description?: string | null;
  image?: string | null;
  publishedAt: string;
  modifiedAt?: string | null;
  authorName?: string;
  slug: string;
};

type Props = { post: ArticleSchemaPost };

export default function ArticleSchema({ post }: Props) {
  const url = `${SITE.domain}/blog/${post.slug}`;
  const base = SITE.domain.replace(/\/$/, "");
  const absoluteImage =
    post.image != null && post.image !== ""
      ? post.image.startsWith("http")
        ? post.image
        : `${base}${post.image.startsWith("/") ? "" : "/"}${post.image}`
      : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? undefined,
    image: absoluteImage ?? undefined,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName ?? SITE.name,
    },
    publisher: { "@id": SCHEMA_ORGANIZATION_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
