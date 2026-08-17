import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
loadEnvConfig(projectRoot);

function supabaseImageRemotePatterns(): NonNullable<
  NextConfig["images"]
>["remotePatterns"] {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return [];
  try {
    const hostname = new URL(url).hostname;
    return [
      {
        protocol: "https",
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

/** WordPress /service/… → hizmet detay (tek hop, trailing slash dahil). */
const WP_SERVICE_REDIRECTS: readonly { source: string; destination: string }[] = [
  {
    source: "/service/sanal-ofis-hizmeti",
    destination: "/hizmetlerimiz/cankaya-sanal-ofis",
  },
  {
    source: "/service/hazir-ofis-hizmeti",
    destination: "/hizmetlerimiz/hazir-ofis-kiralama",
  },
  {
    source: "/service/hazir-odasi-hizmeti",
    destination: "/hizmetlerimiz/hazir-ofis-kiralama",
  },
  {
    source: "/service/toplanti-odasi-hizmeti",
    destination: "/hizmetlerimiz/toplanti-odasi-kiralama",
  },
];

/** WordPress /category/… → yeni rotalar (iç içe path en üstte, spesifik önce). */
const WP_CATEGORY_REDIRECTS: readonly { source: string; destination: string }[] = [
  {
    source: "/category/is-fikirleri/online-is-fikirleri",
    destination: "/kategori/online-is-fikirleri",
  },
  {
    source: "/category/sanal-ofis",
    destination: "/hizmetlerimiz/cankaya-sanal-ofis",
  },
  {
    source: "/category/ticaret",
    destination: "/kategori/ticaret",
  },
  {
    source: "/category/is-fikirleri",
    destination: "/kategori/is-fikirleri",
  },
];

/** Eski /hizmetler rotaları → /hizmetlerimiz (tek hop). */
const LEGACY_HIZMETLER_REDIRECTS: readonly { source: string; destination: string }[] = [
  { source: "/hizmetler", destination: "/hizmetlerimiz" },
  { source: "/hizmetler/:slug", destination: "/hizmetlerimiz/:slug" },
];

/** Diğer eski/typo URL'ler → nihai canonical (tek hop). */
const MISC_LEGACY_REDIRECTS: readonly { source: string; destination: string }[] = [
  { source: "/sanal-ofis", destination: "/hizmetlerimiz/cankaya-sanal-ofis" },
  { source: "/sanal-ofis-hizmeti", destination: "/" },
  { source: "/ankara-sanal-ofis", destination: "/" },
  // Eski WordPress'te 's' düşmüş typo slug → doğru şahıs şirketi yazısı.
  {
    source: "/ahis-sirketi-kurmak-sahis-sirketi-nasil-kurulur-2026",
    destination: "/sahis-sirketi-kurmak-sahis-sirketi-nasil-kurulur-2026",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseImageRemotePatterns(),
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    // C:\Users\ismail\package-lock.json yüzünden yanlış root seçilmesini önler (Server Action ID uyumsuzluğu).
    root: projectRoot,
  },
  async redirects() {
    // Eski URL'ler → nihai canonical, kalıcı (permanent: true = 308; SEO'da 301 ile eşdeğer).
    // Trailing-slash normalizasyonu Next'in otomatik davranışına bırakılır.
    const permanent = (
      rules: readonly { source: string; destination: string }[]
    ) => rules.map(({ source, destination }) => ({ source, destination, permanent: true }));

    return [
      { source: "/favicon.ico", destination: "/konsept-ofis-icon.png", permanent: false },
      ...permanent(WP_CATEGORY_REDIRECTS),
      ...permanent(WP_SERVICE_REDIRECTS),
      ...permanent(LEGACY_HIZMETLER_REDIRECTS),
      ...permanent(MISC_LEGACY_REDIRECTS),
    ];
  },
};

export default nextConfig;
