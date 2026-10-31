import LegacyPage from "../components/LegacyPage";

export const metadata = {
  title: "Projects",
  description: "Selected data engineering and automation projects, including configuration-driven workflows, university data collection, and AI-assisted prototypes.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return <LegacyPage pageKey="projects" />;
}
