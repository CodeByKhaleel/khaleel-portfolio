import LegacyPage from "../../components/LegacyPage";
import UniversityDataFlow from "../../components/UniversityDataFlow";
import { createRouteMetadata } from "../../seo";

export const metadata = createRouteMetadata({
  title: "University Course and Intake Data Collection",
  description: "TypeScript and Playwright scrapers gather university course and intake data, with quality checks before CRM import.",
  path: "/projects/university-data-collection/",
});

export default function UniversityDataCollectionPage() {
  return <LegacyPage pageKey="universityDataCollection" dataCollectionFlow={<UniversityDataFlow />} />;
}
