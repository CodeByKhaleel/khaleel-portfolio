"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
  ["Home", "/"],
  ["About", "/about/"],
  ["Experience", "/experience/"],
  ["Projects", "/projects/"],
  ["Contact", "/contact/"],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label="Khaleel home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">KH</span>
          <span>Khaleel</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
        </button>
        <nav className={`nav-links${open ? " is-open" : ""}`} id="primary-navigation" aria-label="Primary navigation">
          {items.map(([label, href]) => {
            const active = href === "/"
              ? pathname === "/"
              : href === "/projects/"
                ? pathname.startsWith("/projects/")
                : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
