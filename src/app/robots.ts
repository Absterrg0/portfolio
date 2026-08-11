import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://abstergo.fyi/sitemap.xml",
    host: "https://abstergo.fyi",
  };
}
