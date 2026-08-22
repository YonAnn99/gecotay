import type { MetadataRoute } from "next";
import { EMPRESA } from "./data/empresa";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${EMPRESA.url}/sitemap.xml`,
  };
}
