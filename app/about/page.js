import LegacyPage from "../components/LegacyPage";

export const metadata = {
  title: "About",
  description: "Learn about Mohammed Khaleelullah's path from university data collection to data engineering, ETL, data quality, and workflow automation.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return <LegacyPage pageKey="about" />;
}
