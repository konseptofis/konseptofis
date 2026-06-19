import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

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

/** WordPress /service/… → yeni hizmet sayfaları (tek hop, trailing slash dahil). */
const WP_SERVICE_REDIRECTS: readonly { source: string; destination: string }[] = [
  {
    source: "/service/sanal-ofis-hizmeti",
    destination: "/hizmetler/cankaya-sanal-ofis",
  },
  {
    source: "/service/hazir-ofis-hizmeti",
    destination: "/hizmetler/hazir-ofis-kiralama",
  },
  {
    source: "/service/toplanti-odasi-hizmeti",
    destination: "/hizmetler/toplanti-odasi-kiralama",
  },
];

/** WordPress /category/… → yeni /kategori/… (iç içe path en üstte, spesifik önce). */
const WP_CATEGORY_REDIRECTS: readonly { source: string; destination: string }[] = [
  {
    source: "/category/is-fikirleri/online-is-fikirleri",
    destination: "/kategori/online-is-fikirleri",
  },
  {
    source: "/category/sanal-ofis",
    destination: "/hizmetler/cankaya-sanal-ofis",
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

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseImageRemotePatterns(),
  },
  turbopack: {
    // C:\Users\ismail\package-lock.json yüzünden yanlış root seçilmesini önler (Server Action ID uyumsuzluğu).
    root: projectRoot,
  },
  async redirects() {
    const withSlashVariants = (
      rules: readonly { source: string; destination: string }[]
    ) =>
      rules.flatMap(({ source, destination }) => [
        { source, destination, permanent: true },
        { source: `${source}/`, destination, permanent: true },
      ]);

    return [
      ...withSlashVariants(WP_CATEGORY_REDIRECTS),
      ...withSlashVariants(WP_SERVICE_REDIRECTS),
    ];
  },
};

export default nextConfig;
