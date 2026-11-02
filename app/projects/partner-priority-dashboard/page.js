import LegacyPage from "../../components/LegacyPage";
import { createRouteMetadata } from "../../seo";
import Link from "next/link";

export const metadata = createRouteMetadata({
  title: "Education Partner Priority Dashboard",
  description: "An AI-assisted hackathon prototype for searching and exploring education partner records with filters, charts, and mock data.",
  path: "/projects/partner-priority-dashboard/",
});

export default function PartnerPriorityDashboardPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return <LegacyPage pageKey="partnerPriorityDashboard" partnerDemo={<section className="section section--compact"><div className="container project-showcase-card"><Link className="project-showcase-media" href="/projects/retail-operations-dashboard/"><img src={`${basePath}/images/partner-priority-dashboard-preview.png`} alt="Retail Operations Dashboard mockup using sample data" loading="lazy" /><span>View the mockup →</span></Link><div className="project-showcase-copy"><p className="eyebrow">Interactive mockup · Sample data</p><h2 className="section-title">Explore the dashboard in a retail setting</h2><p>The Retail Operations Dashboard is a public mockup of this partner dashboard concept, adapted with sample retail data instead of workplace records.</p><div className="button-row"><Link className="button" href="/projects/retail-operations-dashboard/">View the mockup →</Link></div></div></div></section>} />;
}
