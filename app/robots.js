import { siteUrl } from "./seo";

export const dynamic = "force-static";

export default function robots() {
  return {
    sitemap: `${siteUrl}/sitemap.xml`,
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
