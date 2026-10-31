import LegacyPage from "../components/LegacyPage";
import { createRouteMetadata } from "../seo";

export const metadata = createRouteMetadata({
  title: "Data Engineering Experience",
  description: "Mohammed Khaleelullah's Data Engineer experience includes Python, web scraping, ETL workflows, automation, and backend development.",
  path: "/experience/",
});

export default function ExperiencePage() {
  return <LegacyPage pageKey="experience" />;
}
