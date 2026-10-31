import LegacyPage from "../../components/LegacyPage";
import WorkflowBoard from "../../components/WorkflowBoard";
import WorkflowHero from "../../components/WorkflowHero";

export const metadata = {
  title: "Turning Repetitive Submissions into Repeatable Workflows",
  description: "How a configurable workflow combines data preparation, conditional form logic, human checkpoints, retries, and actionable failure classification.",
};

export default function RepeatableWorkflowsPage() {
  return <LegacyPage pageKey="repeatableWorkflows" interactiveHero={<WorkflowHero />} interactiveSlot={<WorkflowBoard />} />;
}
