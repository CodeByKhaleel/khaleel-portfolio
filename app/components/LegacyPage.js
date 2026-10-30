import pageContent from "../content.json";

function withBasePath(markup) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanMarkup = markup.replace(/\sdata-route="[^"]*"/g, "");
  if (!basePath) return cleanMarkup;

  return cleanMarkup.replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
}

export default function LegacyPage({ pageKey }) {
  const markup = pageContent[pageKey];
  if (!markup) return null;

  return <main id="main" dangerouslySetInnerHTML={{ __html: withBasePath(markup) }} />;
}
