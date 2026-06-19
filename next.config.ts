import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  async redirects() {
    return WP_SERVICE_REDIRECTS.flatMap(({ source, destination }) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;
