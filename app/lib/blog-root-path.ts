/**
 * Blog yazıları `/yazi-slug` kökünde. Bu segmentler mevcut statik rotalarla çakışmasın diye ayrılmıştır.
 */
export const BLOG_POST_PATH_RESERVED_SEGMENTS = new Set([
  "admin",
  "api",
  "blog",
  "fiyatlar",
  "hakkimizda",
  "hizmetler",
  "hizmetlerimiz",
  "iletisim",
  "sik-sorulan-sorular",
  "uzmanlar",
  "kullanim-kosullari",
  "acik-riza-onayi",
  "kvkk-basvuru-formu",
  "kvkk-kapsaminda-aydinlatma-metni",
  "sanal-ofis-hizmeti",
  "mahall-sanal-ofis",
  "mahall-sanal-ofis-hizmeti",
  "makam-odasi-hizmeti",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
]);

export function isReservedBlogRootSegment(segment: string): boolean {
  return BLOG_POST_PATH_RESERVED_SEGMENTS.has(segment);
}
