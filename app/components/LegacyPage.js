import pageContent from "../content.json";

function withBasePath(markup) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanMarkup = markup.replace(/\sdata-route="[^"]*"/g, "");
  if (!basePath) return cleanMarkup;

  return cleanMarkup.replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
}

export default function LegacyPage({ pageKey, interactiveSlot, interactiveHero, dataCollectionFlow, entryMonitoringFlow, homeDemo, homeApproach, homeProjects, homeRecommendations, partnerDemo }) {
  let markup = pageContent[pageKey];
  if (!markup) return null;

  if (pageKey === "partnerPriorityDashboard") markup = markup.replace('</div></section>', '</div></section><!--PARTNER_DEMO-->');

  if (pageKey === "home") {
    markup = markup.replace('<section class="section section--compact section-anchor"', '<!--HOME_DEMO--><section class="section section--compact section-anchor"');
    markup = markup.replace(/<section class="section section--compact">\s*<div class="container">\s*<div class="section-title-row section-heading">[\s\S]*?<\/section>/, '<!--HOME_PROJECTS-->');
    markup = markup.replace(/<section class="section section--compact" id="approach">[\s\S]*?<\/section>/, '<!--HOME_APPROACH-->');
    markup = markup.replace(/<section class="section section--compact" id="recommendations">[\s\S]*?<\/section>/, '<!--HOME_RECOMMENDATIONS-->');
  }

  const updatedMarkup = markup.replace(
    "My work spans data extraction, ETL, quality, and automation. I’m now building toward larger-scale data engineering.",
    "I build data extraction pipelines, ETL workflows, and automation systems that turn complex data into reliable, usable information. Currently expanding into modern data platforms and large-scale data engineering.",
  );

  const slots = {
    WORKFLOW_BOARD: interactiveSlot,
    WORKFLOW_HERO: interactiveHero,
    DATA_COLLECTION_FLOW: dataCollectionFlow,
    ENTRY_MONITORING_FLOW: entryMonitoringFlow,
    HOME_DEMO: homeDemo,
    HOME_APPROACH: homeApproach,
    HOME_PROJECTS: homeProjects,
    HOME_RECOMMENDATIONS: homeRecommendations,
    PARTNER_DEMO: partnerDemo,
  };
  const parts = updatedMarkup.split(/<!--(WORKFLOW_BOARD|WORKFLOW_HERO|DATA_COLLECTION_FLOW|ENTRY_MONITORING_FLOW|HOME_DEMO|HOME_APPROACH|HOME_PROJECTS|HOME_RECOMMENDATIONS|PARTNER_DEMO)-->/);
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
