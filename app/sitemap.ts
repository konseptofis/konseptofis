import type { MetadataRoute } from "next";
import { SITE } from "@/app/lib/data";
import { getPublishedPosts } from "@/app/actions/blog";
import { getExperts } from "@/app/actions/experts";
import { getCategories } from "@/app/actions/categories";
import { HIZMET_DETAY_MAP, getServicePagePath } from "@/app/lib/hizmet-detay-data";

/** Yayınlanan içerik değişince sitemap yenilensin (blog, fiyatlar vb.). */
export const revalidate = 3600;

const baseUrl = SITE.domain.replace(/\/$/, "");

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${p}`;
}

/** Kurumsal öncelik: ana sayfa ve dönüşüm sayfaları üstte; blog yazıları doğru lastModified ile. */
const CORE_PAGES: readonly {
  path: string;
  changeFrequency: Freq;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/hizmetlerimiz", changeFrequency: "weekly", priority: 0.95 },
  { path: "/fiyatlar", changeFrequency: "weekly", priority: 0.95 },
  { path: "/iletisim", changeFrequency: "monthly", priority: 0.92 },
  { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.88 },
  { path: "/sik-sorulan-sorular", changeFrequency: "monthly", priority: 0.85 },
  { path: "/blog", changeFrequency: "daily", priority: 0.86 },
  { path: "/kullanim-kosullari", changeFrequency: "yearly", priority: 0.5 },
  { path: "/acik-riza-onayi", changeFrequency: "yearly", priority: 0.5 },
  { path: "/kvkk-basvuru-formu", changeFrequency: "yearly", priority: 0.55 },
  { path: "/kvkk-kapsaminda-aydinlatma-metni", changeFrequency: "yearly", priority: 0.55 },
] as const;

const SERVICE_PRIORITY = 0.9;
const BLOG_POST_PRIORITY = 0.72;

const CATEGORY_PAGE_PRIORITY = 0.7;

const EXPERT_PAGE_PRIORITY = 0.68;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const core: MetadataRoute.Sitemap = CORE_PAGES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  }));

  const serviceSlugs = Object.keys(HIZMET_DETAY_MAP).sort();
  const services: MetadataRoute.Sitemap = serviceSlugs.map((slug) => {
    const detail = HIZMET_DETAY_MAP[slug];
    return {
      url: absoluteUrl(getServicePagePath(detail)),
      changeFrequency: "monthly" as const,
      priority: SERVICE_PRIORITY,
    };
  });

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    const sorted = [...posts].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    blogPosts = sorted.map((post) => ({
      url: absoluteUrl(`/${post.slug}`),
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: BLOG_POST_PRIORITY,
    }));
  } catch {
    // Örn. yerel ortamda Supabase yoksa: çekirdek + hizmet URL'leri yine üretilir.
  }

  let expertPages: MetadataRoute.Sitemap = [];
  try {
    const experts = await getExperts();
    const sorted = [...experts].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    const indexable = sorted.filter((expert) => !expert.seo_noindex);
    expertPages = indexable.map((expert) => ({
      url: absoluteUrl(`/uzmanlar/${expert.slug}`),
      lastModified: new Date(expert.updated_at),
      changeFrequency: "monthly" as const,
      priority: EXPERT_PAGE_PRIORITY,
    }));
  } catch {
    // experts tablosu yoksa vb.
  }

  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryPages = categories.map((cat) => ({
      url: absoluteUrl(`/kategori/${cat.slug}`),
      changeFrequency: "weekly" as const,
      priority: CATEGORY_PAGE_PRIORITY,
    }));
  } catch {
    // categories tablosu yoksa vb.
  }

  return [...core, ...services, ...blogPosts, ...categoryPages, ...expertPages];
}
