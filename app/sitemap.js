import { siteUrl } from "./seo";

const publicPaths = [
  "/",
  "/projects/",
  "/projects/repeatable-workflows/",
  "/projects/university-data-collection/",
  "/projects/entry-requirement-monitoring/",
  "/projects/partner-priority-dashboard/",
  "/projects/retail-operations-dashboard/",
];

export const dynamic = "force-static";

export default function sitemap() {
  return publicPaths.map((path) => ({
    url: new URL(path, `${siteUrl}/`).toString(),
  }));
}
