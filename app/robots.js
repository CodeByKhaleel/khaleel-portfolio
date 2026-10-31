export const dynamic = "force-static";

export default function robots() {
  return {
    sitemap: "https://www.mohammed-khaleelullah.in/sitemap.xml",
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
