import LegacyPage from "../../components/LegacyPage";
import EntryMonitoringFlow from "../../components/EntryMonitoringFlow";
import { createRouteMetadata } from "../../seo";

export const metadata = createRouteMetadata({
  title: "University Entry Requirement Monitoring",
  description: "A ticket-driven workflow checks university entry requirement updates against existing records, with AI-assisted ticket interpretation.",
  path: "/projects/entry-requirement-monitoring/",
});

export default function EntryRequirementMonitoringPage() {
  return <LegacyPage pageKey="entryRequirementMonitoring" entryMonitoringFlow={<EntryMonitoringFlow />} />;
}
