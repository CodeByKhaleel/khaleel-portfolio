import CopyEmail from "../components/CopyEmail";
import { createRouteMetadata } from "../seo";

export const metadata = createRouteMetadata({
  title: "Contact",
  description: "Contact Mohammed Khaleelullah to discuss Data Engineer opportunities and work involving Python, web scraping, ETL workflows, automation, and backend development.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Let’s start with a conversation.</h1>
          <p className="lead">If you’d like to talk about a project, data workflows, or engineering, you can find me here.</p>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container contact-panel">
          <div>
            <p className="eyebrow contact-eyebrow">Find me online</p>
            <h2>Connect with Khaleel.</h2>
            <p>Reach me by email, or connect with me on LinkedIn and GitHub. I typically respond within 1–2 business days.</p>
            <div className="social-list">
              <CopyEmail />
              <a href="https://www.linkedin.com/in/mohammedkhaleelulah/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="https://github.com/CodeByKhaleel" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="contact-portrait-wrap">
            <img className="contact-portrait" src="/images/khaleel-portrait-cutout.png" alt="Khaleel, Data Engineer" />
          </div>
          <a className="button button--sand" href="/projects/">Explore my work</a>
        </div>
      </section>
    </main>
  );
}
