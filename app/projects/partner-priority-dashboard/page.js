import LegacyPage from "../../components/LegacyPage";
import { createRouteMetadata } from "../../seo";

export const metadata = createRouteMetadata({
  title: "Education Partner Priority Dashboard",
  description: "An AI-assisted hackathon prototype for searching and exploring education partner records with filters, charts, and mock data.",
  path: "/projects/partner-priority-dashboard/",
});

export default function PartnerPriorityDashboardPage() {
  return <LegacyPage pageKey="partnerPriorityDashboard" />;
}
