import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const pages = {
  home: "index.html",
  about: "about/index.html",
  experience: "experience/index.html",
  contact: "contact/index.html",
  projects: "projects/index.html",
  repeatableWorkflows: "projects/repeatable-workflows/index.html",
  universityDataCollection: "projects/university-data-collection/index.html",
  partnerPriorityDashboard: "projects/partner-priority-dashboard/index.html",
  entryRequirementMonitoring: "projects/entry-requirement-monitoring/index.html",
};

const content = Object.fromEntries(
  Object.entries(pages).map(([key, relativePath]) => {
    const source = readFileSync(resolve(relativePath), "utf8");
    const main = source.match(/<main id="main">([\s\S]*?)<\/main>/i)?.[1];
    if (!main) throw new Error(`Could not find <main> in ${relativePath}`);

    const markup = main
      .replace(/(?:\.\.\/)*assets\/images\/khaleel-portrait\.jpeg/g, "/images/khaleel-portrait-cutout.png")
      .trim();
    return [key, markup];
  }),
);

writeFileSync("app/content.json", `${JSON.stringify(content, null, 2)}\n`, "utf8");
console.log(`Extracted ${Object.keys(content).length} pre-rendered route bodies to app/content.json`);
