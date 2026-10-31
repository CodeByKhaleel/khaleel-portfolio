const siteUrl = "https://www.mohammed-khaleelullah.in";

const publicPaths = [
  "/",
  "/about/",
  "/experience/",
  "/projects/",
  "/contact/",
  "/projects/repeatable-workflows/",
  "/projects/university-data-collection/",
  "/projects/entry-requirement-monitoring/",
  "/projects/partner-priority-dashboard/",
];

export const dynamic = "force-static";

export default function sitemap() {
  return publicPaths.map((path) => ({
    url: new URL(path, `${siteUrl}/`).toString(),
  }));
}
