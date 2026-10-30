# Mohammed Khaleelullah

### Data Engineer · Data workflows · ETL · Automation

I work across data extraction, transformation, quality, and automation. I enjoy understanding a problem deeply before choosing an approach, then shaping workflows that are easier to reuse and maintain.

<img src="public/images/khaleel-portrait-cutout.png" width="220" align="right" alt="Portrait of Mohammed Khaleelullah">

**Portfolio repository:** [CodeByKhaleel/khaleel-portfolio](https://github.com/CodeByKhaleel/khaleel-portfolio) · [LinkedIn](https://www.linkedin.com/in/mohammedkhaleelulah/) · [GitHub](https://github.com/CodeByKhaleel)

## Selected work

### Turning Repetitive Submissions into Repeatable Workflows

A configurable workflow for handling differences across external portals. I designed the JSON configuration model and workflow editor, and built the data preparation, conditional form logic, human handoffs, retries, and failure classification. A teammate owned the Chrome extension and RabbitMQ components, and initially built the browser automation; I contributed later updates to that automation.

**3,000+ submissions · 70+ portals · 94% success rate · 1,200+ hours saved**

### University Course and Intake Data Collection

TypeScript and Playwright scrapers collect course and intake information from university websites. I created 37 university scripts and contributed updates across 72; generated files go through quality checks before they are imported into the CRM.

### Education Partner Priority Dashboard

A solo, AI-assisted hackathon prototype built with mock data to help staff search partner records and explore business patterns. I defined the architecture and business logic, used AI to generate much of the application code, and reviewed and refined the result. The project won the internal challenge and was recognized by the CTO; the prototype later informed dashboard work in the CRM.

### University Entry Requirement Monitoring

Contributions include maintaining code quality and documentation, creating scheduled bots, and updating data from generated files. The workflow checks ticket-related updates against existing records, with AI used to interpret ticket content.

## About this portfolio

The site presents my professional story, experience, education, certifications, and project case studies in a responsive, accessible layout. It also includes a small selection of personal experiments.

Explore the site source: [About](app/about/page.js) · [Experience](app/experience/page.js) · [Projects](app/projects/page.js) · [Contact](app/contact/page.js)

## Built with

- React 19 and Next.js 16 App Router
- Static export: each route is pre-rendered to HTML, with page-specific metadata
- Semantic HTML and responsive CSS
- Small client-side React component for accessible mobile navigation
- Google Fonts: Manrope, Inter, and IBM Plex Mono

## Run locally

Install the locked dependencies and start the development server:

```powershell
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a static export for a root-domain host:

```powershell
npm run build
```

For the GitHub Pages project path, build with the repository prefix:

```powershell
npm run build:pages
```

Both builds export the site to `out/`. The Pages build uses `/khaleel-portfolio` as its base path. A custom domain build uses the root path. The custom domain and canonical URLs can be added once the domain is confirmed.

## Privacy

This repository contains the website and approved public-facing portfolio content. Private source documents, certificates, résumé files, and profile notes stay outside the repository.
