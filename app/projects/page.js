import LegacyPage from "../components/LegacyPage";
import { createRouteMetadata } from "../seo";

export const metadata = createRouteMetadata({
  title: "Data Engineering Projects",
  description: "Explore Mohammed Khaleelullah's projects in Python, web scraping, ETL workflows, automation, and backend development.",
  path: "/projects/",
});

export default function ProjectsPage() {
  return <LegacyPage pageKey="projects" />;
}
