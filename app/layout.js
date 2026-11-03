import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "./components/Navigation";
import SiteFooter from "./components/SiteFooter";
import CountUpMetrics from "./components/CountUpMetrics";
import { siteUrl } from "./seo";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Khaleelullah",
  jobTitle: "Data Engineer",
  url: `${siteUrl}/`,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/khaleel-portrait-cutout.png`,
    contentUrl: `${siteUrl}/images/khaleel-portrait-cutout.png`,
    caption: "Mohammed Khaleelullah, Data Engineer",
  },
  sameAs: [
    "https://www.linkedin.com/in/mohammedkhaleelulah/",
    "https://github.com/CodeByKhaleel",
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Mohammed Khaleelullah — Data Engineer",
    template: "%s | Mohammed Khaleelullah",
  },
  description:
    "Mohammed Khaleelullah is a Data Engineer in Chennai with experience in Python, web scraping, ETL workflows, automation, and backend development.",
  applicationName: "Mohammed Khaleelullah Portfolio",
  authors: [{ name: "Mohammed Khaleelullah" }],
  creator: "Mohammed Khaleelullah",
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_IN",
    siteName: "Mohammed Khaleelullah — Data Engineer",
    title: "Mohammed Khaleelullah — Data Engineer",
    description:
      "Mohammed Khaleelullah is a Data Engineer in Chennai with experience in Python, web scraping, ETL workflows, automation, and backend development.",
    images: [
      {
        url: "/images/portfolio-social-preview.png",
        alt: "Mohammed Khaleelullah, Data Engineer, with Python, web scraping, ETL, automation, and backend development.",
        width: 1734,
        height: 907,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Khaleelullah — Data Engineer",
    description:
      "Mohammed Khaleelullah is a Data Engineer in Chennai with experience in Python, web scraping, ETL workflows, automation, and backend development.",
    images: ["/images/portfolio-social-preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var theme='light';try{var saved=localStorage.getItem('portfolio-theme');if(saved==='dark'||saved==='light')theme=saved;}catch(e){}document.documentElement.dataset.theme=theme;})();` }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <Navigation />
        <CountUpMetrics />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
