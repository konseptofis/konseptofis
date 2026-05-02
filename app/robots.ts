import type { MetadataRoute } from "next";
import { SITE } from "@/app/lib/data";

const baseUrl = SITE.domain.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https:\/\//, ""),
  };
}
