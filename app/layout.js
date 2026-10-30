import "./globals.css";
import Navigation from "./components/Navigation";
import SiteFooter from "./components/SiteFooter";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Khaleelullah",
  jobTitle: "Data Engineer",
  sameAs: [
    "https://www.linkedin.com/in/mohammedkhaleelulah/",
    "https://github.com/CodeByKhaleel",
  ],
};

export const metadata = {
  title: {
    default: "Mohammed Khaleelullah — Data Engineer",
    template: "%s | Mohammed Khaleelullah",
  },
  description:
    "Mohammed Khaleelullah is a Data Engineer working across data extraction, ETL, quality, and automation, with a growing focus on larger-scale data engineering.",
  applicationName: "Mohammed Khaleelullah Portfolio",
  authors: [{ name: "Mohammed Khaleelullah" }],
  creator: "Mohammed Khaleelullah",
  keywords: [
    "Data Engineer",
    "Data Engineering",
    "ETL",
    "Data Quality",
    "Data Extraction",
    "Workflow Automation",
    "Python",
    "SQL",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Mohammed Khaleelullah — Data Engineer",
    title: "Mohammed Khaleelullah — Data Engineer",
    description:
      "Data engineering, ETL, data quality, and automation work by Mohammed Khaleelullah.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Khaleelullah — Data Engineer",
    description:
      "Data engineering, ETL, data quality, and automation work by Mohammed Khaleelullah.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <Navigation />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
