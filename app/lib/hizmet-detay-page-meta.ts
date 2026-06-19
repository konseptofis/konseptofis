import type { Metadata } from "next";
import { serviceJsonLdDescription } from "@/app/lib/hizmet-detay-jsonld";
import { getServiceDetail, getServicePagePath } from "@/app/lib/hizmet-detay-data";
import { HIZMET_PAGE_SEO_BY_SLUG } from "@/app/lib/hizmet-page-seo";
import { SITE } from "@/app/lib/data";

export function buildHizmetMetadata(slug: string): Metadata {
  const data = getServiceDetail(slug);
  if (!data) return { title: "Hizmet bulunamadı" };

  const custom = HIZMET_PAGE_SEO_BY_SLUG[slug];
  const titleAbs = custom?.title ?? `${data.title} | ${SITE.name}`;
  const description = custom?.description ?? serviceJsonLdDescription(data);
  const path = getServicePagePath(data);
  const url = `${SITE.domain.replace(/\/$/, "")}${path}`;

  return {
    title: { absolute: titleAbs },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: titleAbs,
      description,
      url,
      siteName: SITE.name,
      locale: "tr_TR",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: titleAbs, description },
    robots: { index: true, follow: true },
  };
}
