import type { Post } from "@/app/actions/blog";
import type { Category } from "@/app/actions/categories";
import {
  buildBreadcrumbListJsonLd,
  breadcrumbPageUrl,
} from "@/app/lib/breadcrumb-jsonld";
import { SITE } from "@/app/lib/data";

const ORIGIN = SITE.domain.replace(/\/$/, "");

type Props = {
  category: Category;
  posts: Post[];
};

function categoryDescription(category: Category): string {
  if (category.meta_description?.trim()) return category.meta_description.trim();
  return `${category.name} hakkında güncel yazılar ve rehberler.`;
}

/** Kategori arşivi: CollectionPage + ItemList + BreadcrumbList. */
export default function CategoryArchiveJsonLd({ category, posts }: Props) {
  const pagePath = `/kategori/${category.slug}`;
  const pageUrl = breadcrumbPageUrl(pagePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: category.name,
        description: categoryDescription(category),
        inLanguage: "tr-TR",
        isPartOf: {
          "@type": "Blog",
          "@id": `${ORIGIN}/blog/#blog`,
          url: `${ORIGIN}/blog`,
          name: "Blog | Konsept Ofis",
        },
        mainEntity: {
          "@type": "ItemList",
          "@id": `${pageUrl}#itemlist`,
          numberOfItems: posts.length,
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${ORIGIN}/${post.slug}`,
            name: post.title,
          })),
        },
      },
      buildBreadcrumbListJsonLd(
        [
          { label: "Anasayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.name },
        ],
        pageUrl,
      ),
    ],
  };

  return (
    <script
      id={`ld-json-category-${category.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
