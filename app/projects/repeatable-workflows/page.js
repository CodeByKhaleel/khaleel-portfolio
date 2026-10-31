import LegacyPage from "../../components/LegacyPage";
import WorkflowBoard from "../../components/WorkflowBoard";
import WorkflowHero from "../../components/WorkflowHero";
import { createRouteMetadata } from "../../seo";

export const metadata = createRouteMetadata({
  title: "Turning Repetitive Submissions into Repeatable Workflows",
  description: "A configurable browser automation workflow with Python data preparation, portal-specific form logic, retries, and human checkpoints.",
  path: "/projects/repeatable-workflows/",
});

export default function RepeatableWorkflowsPage() {
  return <LegacyPage pageKey="repeatableWorkflows" interactiveHero={<WorkflowHero />} interactiveSlot={<WorkflowBoard />} />;
}
