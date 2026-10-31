const personName = "Mohammed Khaleelullah";
const siteName = `${personName} — Data Engineer`;
const socialImage = "/images/portfolio-social-preview.png";
const socialImageAlt = "Mohammed Khaleelullah, Data Engineer, with Python, web scraping, ETL, automation, and backend development.";

export function createRouteMetadata({ title, description, path }) {
  const shareTitle = `${title} | ${personName}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      locale: "en_IN",
      siteName,
      title: shareTitle,
      description,
      images: [{ url: socialImage, alt: socialImageAlt, width: 1734, height: 907 }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [socialImage],
    },
  };
}
