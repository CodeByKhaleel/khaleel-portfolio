import LegacyPage from "../../components/LegacyPage";
import UniversityDataFlow from "../../components/UniversityDataFlow";

export const metadata = {
  title: "University Course and Intake Data Collection",
  description: "TypeScript and Playwright scrapers collect university course and intake information for quality checks and CRM import.",
  alternates: { canonical: "/projects/university-data-collection/" },
};

export default function UniversityDataCollectionPage() {
  return <LegacyPage pageKey="universityDataCollection" dataCollectionFlow={<UniversityDataFlow />} />;
}
