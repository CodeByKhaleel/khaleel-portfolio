const personName = "Mohammed Khaleelullah";
const siteName = `${personName} — Data Engineer`;
const socialImage = "/images/khaleel-portrait-cutout.png";

export function createRouteMetadata({ title, description, path }) {
  const shareTitle = `${title} | ${personName}`;
  const imageAlt = `Portrait of ${personName}, Data Engineer`;

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
      images: [{ url: socialImage, alt: imageAlt }],
    },
    twitter: {
      card: "summary",
      title: shareTitle,
      description,
      images: [socialImage],
    },
  };
}
