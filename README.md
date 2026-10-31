# Mohammed Khaleelullah Portfolio

Source for [mohammed-khaleelullah.in](https://www.mohammed-khaleelullah.in), a personal portfolio focused on data engineering, Python, web scraping, ETL workflows, automation, and backend development.

The site presents the portfolio owner’s background, experience, education, certifications, and project case studies. The project content describes individual contributions and team ownership where relevant.

## Public routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about/` | About and education |
| `/experience/` | Experience |
| `/projects/` | Project index |
| `/contact/` | Contact |
| `/projects/repeatable-workflows/` | Turning Repetitive Submissions into Repeatable Workflows |
| `/projects/university-data-collection/` | University Course and Intake Data Collection |
| `/projects/entry-requirement-monitoring/` | University Entry Requirement Monitoring |
| `/projects/partner-priority-dashboard/` | Education Partner Priority Dashboard |

The site also exports technical endpoints for `robots.txt`, `sitemap.xml`, and the site icon.

## Project case studies

- **Repeatable workflows:** A configurable portal-submission workflow with Python data preparation, form logic, human checkpoints, retries, and workflow status handling.
- **University data collection:** TypeScript and Playwright scrapers gather course and intake data for quality checks before CRM import.
- **Entry requirement monitoring:** A ticket-driven workflow checks university entry requirement updates against existing records, with AI-assisted ticket interpretation.
- **Partner priority dashboard:** A solo, AI-assisted hackathon prototype for exploring education partner records with filters and charts using mock data. Its linked Retail Operations Dashboard is a separate live demo.

## Technology

- Next.js 16 App Router and React 19
- Static export, with each public page prerendered to HTML
- Responsive CSS in `app/globals.css`; the static-site assets are in `assets/`
- Interactive workflow and data-flow components in `app/components/`
- Vercel Web Analytics through `@vercel/analytics`

## Repository layout

```text
app/                    Next.js routes, metadata, shared components, and styles
app/content.json        Portfolio content rendered by the shared page component
public/images/          Portrait, logos, project preview, and social preview assets
assets/                 Static-site CSS, JavaScript, and supporting images
scripts/build-pages.mjs Optional GitHub Pages build wrapper
.github/workflows/ci.yml GitHub Actions build check
```

## Run locally

Requirements: Node.js 20.9 or newer and npm. The CI workflow uses Node.js 22.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

Create the production static export:

```bash
npm run build
```

Next.js writes the exported site to `out/`. The export includes the HTML routes, assets, `robots.txt`, and `sitemap.xml`.

An optional GitHub Pages build adds the repository subpath `/khaleel-portfolio`:

```bash
npm run build:pages
```

Use the normal `npm run build` for Vercel and the custom domain. Do not set `GITHUB_PAGES=true` in the Vercel production environment; that setting is only for the GitHub Pages subpath build.

## GitHub Actions and Vercel deployment

The workflow in `.github/workflows/ci.yml` runs `npm ci` and `npm run build` for pushes and pull requests targeting `main`. It checks that the static site builds; it does not run a separate test suite.

Production deployment is handled by Vercel’s Git integration. The Vercel project should be connected to `CodeByKhaleel/khaleel-portfolio` with `main` as its production branch. Pushes to `main` deploy to production; other branches and pull requests receive Vercel preview deployments.

Recommended Vercel project settings:

- Framework preset: Next.js
- Root directory: repository root (`.`)
- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: leave at the Next.js default
- Node.js: 22.x

The production domain is [https://www.mohammed-khaleelullah.in](https://www.mohammed-khaleelullah.in). The apex domain redirects to `www`.

## SEO and analytics

- Route metadata is centralized in `app/seo.js`; the home page metadata is in `app/layout.js`.
- Canonical URLs use `https://www.mohammed-khaleelullah.in`.
- Open Graph and Twitter metadata use `public/images/portfolio-social-preview.png`.
- `app/sitemap.js` lists the public content routes; `app/robots.js` references the sitemap.
- Vercel Web Analytics is rendered by the root layout. Enable Web Analytics in the Vercel project dashboard to collect page views and view them under the project’s Analytics section.

## Privacy

This repository contains the website and approved public-facing portfolio content. Private source material, certificates, résumé files, and profile notes are excluded from the repository.
