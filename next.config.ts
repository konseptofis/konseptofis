import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sanal-ofis",
        destination: "/hizmetler/sanal-ofis-hizmeti",
        permanent: true,
      },
      {
        source: "/makam-odasi",
        destination: "/hizmetler/hazir-ofis-hizmeti",
        permanent: true,
      },
      {
        source: "/toplanti-odasi",
        destination: "/hizmetler/toplanti-odasi-hizmeti",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
