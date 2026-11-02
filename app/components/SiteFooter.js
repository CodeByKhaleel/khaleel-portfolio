import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Khaleelullah</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/projects/">Projects</Link>
          <Link href="/#contact">Contact</Link>
          <a href="https://www.linkedin.com/in/mohammedkhaleelulah/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </nav>
      </div>
    </footer>
  );
}
