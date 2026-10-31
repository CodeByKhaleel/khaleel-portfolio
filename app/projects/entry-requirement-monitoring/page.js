import LegacyPage from "../../components/LegacyPage";
import EntryMonitoringFlow from "../../components/EntryMonitoringFlow";

export const metadata = {
  title: "University Entry Requirement Monitoring",
  description: "A ticket-driven workflow for checking university entry requirement updates against existing records, with AI-assisted ticket interpretation.",
  alternates: { canonical: "/projects/entry-requirement-monitoring/" },
};

export default function EntryRequirementMonitoringPage() {
  return <LegacyPage pageKey="entryRequirementMonitoring" entryMonitoringFlow={<EntryMonitoringFlow />} />;
}
