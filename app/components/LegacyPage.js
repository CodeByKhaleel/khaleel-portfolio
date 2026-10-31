import pageContent from "../content.json";

function withBasePath(markup) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanMarkup = markup.replace(/\sdata-route="[^"]*"/g, "");
  if (!basePath) return cleanMarkup;

  return cleanMarkup.replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
}

export default function LegacyPage({ pageKey, interactiveSlot, interactiveHero, dataCollectionFlow, entryMonitoringFlow }) {
  const markup = pageContent[pageKey];
  if (!markup) return null;

  const updatedMarkup = markup.replace(
    "My work spans data extraction, ETL, quality, and automation. I’m now building toward larger-scale data engineering.",
    "I build data extraction pipelines, ETL workflows, and automation systems that turn complex data into reliable, usable information. Currently expanding into modern data platforms and large-scale data engineering.",
  );

  const slots = {
    WORKFLOW_BOARD: interactiveSlot,
    WORKFLOW_HERO: interactiveHero,
    DATA_COLLECTION_FLOW: dataCollectionFlow,
    ENTRY_MONITORING_FLOW: entryMonitoringFlow,
  };
  const parts = updatedMarkup.split(/<!--(WORKFLOW_BOARD|WORKFLOW_HERO|DATA_COLLECTION_FLOW|ENTRY_MONITORING_FLOW)-->/);
  if (parts.length > 1) {
    return (
      <main id="main">
        {parts.map((part, index) => {
          if (index % 2 === 1) return slots[part] ? <div key={`slot-${index}`}>{slots[part]}</div> : null;
          return part ? <div key={`markup-${index}`} dangerouslySetInnerHTML={{ __html: withBasePath(part) }} /> : null;
        })}
      </main>
    );
  }

  return <main id="main" dangerouslySetInnerHTML={{ __html: withBasePath(updatedMarkup) }} />;
}
