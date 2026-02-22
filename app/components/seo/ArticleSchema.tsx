import { SITE } from "@/app/lib/data";

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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? undefined,
    image: post.image ?? undefined,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.authorName ?? SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
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
