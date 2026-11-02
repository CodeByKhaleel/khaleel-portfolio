import Link from "next/link";
import { createRouteMetadata } from "../../seo";

export const metadata = createRouteMetadata({
  title: "Retail Operations Dashboard",
  description: "Explore a sample-data retail mockup of Mohammed Khaleelullah's Education Partner Priority Dashboard, featuring filters, charts and workflows.",
  path: "/projects/retail-operations-dashboard/",
});

export default function RetailOperationsDashboardPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return <main id="main">
    <section className="page-hero"><div className="container">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/projects/partner-priority-dashboard/">Partner Priority Dashboard</Link><span aria-hidden="true">/</span><span>Public mockup</span></nav>
      <p className="eyebrow">Partner dashboard mockup · Sample data</p>
      <h1>Retail Operations Dashboard</h1>
      <p className="lead">PulseOps is a public mockup of the Education Partner Priority Dashboard, adapted to a retail setting with sample data.</p>
    </div></section>
    <section className="section section--compact"><div className="container retail-detail">
      <img src={`${basePath}/images/partner-priority-dashboard-preview.png`} alt="Preview of the Retail Operations Dashboard using sample data" />
      <div><h2 className="section-title">Explore the live dashboard</h2><p>The mockup adapts the partner dashboard use case to a retail setting, using sample data instead of workplace records.</p><p>It explores dashboard design, API architecture, filtering, analytics, chart-driven insights, and fulfillment workflows.</p><div className="button-row"><a className="button" href="https://retail-ops-dashboard-9faf.vercel.app/" target="_blank" rel="noreferrer">Open live dashboard ↗</a><Link className="button button--secondary" href="/projects/partner-priority-dashboard/">Back to the case study</Link></div></div>
    </div></section>
  </main>;
}
