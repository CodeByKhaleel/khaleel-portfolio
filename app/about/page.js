import LegacyPage from "../components/LegacyPage";
import { createRouteMetadata } from "../seo";

export const metadata = createRouteMetadata({
  title: "Data Engineering Background",
  description: "Meet Mohammed Khaleelullah, a Data Engineer whose background spans university data collection, Python, web scraping, ETL, automation, and backend development.",
  path: "/about/",
});

export default function AboutPage() {
  return <LegacyPage pageKey="about" />;
}
