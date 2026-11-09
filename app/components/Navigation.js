"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
  ["Home", "/"],
  ["Projects", "/projects/"],
  ["Contact", "/#contact"],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [pull, setPull] = useState(0);
  const draggingRef = useRef(false);
  const pullRef = useRef(0);
  const startYRef = useRef(0);
  const pulledRef = useRef(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    sync();
    const onStorage = (event) => {
      if (event.key === "portfolio-theme" || event.key === null) {
        document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
        sync();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
    try { localStorage.setItem("portfolio-theme", next ? "dark" : "light"); } catch {}
  }

  function handleLanternPointerDown(event) {
    if (event.button !== 0) return;
    draggingRef.current = true;
    pullRef.current = 0;
    startYRef.current = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handleLanternPointerMove(event) {
    if (!draggingRef.current) return;
    const distance = Math.max(0, Math.min(44, event.clientY - startYRef.current));
    pullRef.current = distance;
    setPull(distance);
  }

  function handleLanternPointerUp() {
    if (!draggingRef.current) return;
    const wasPulled = pullRef.current >= 12;
    draggingRef.current = false;
    pullRef.current = 0;
    setPull(0);
    if (wasPulled) {
      pulledRef.current = true;
      toggleTheme();
    }
  }

  function handleLanternClick() {
    if (pulledRef.current) {
      pulledRef.current = false;
      return;
    }
    toggleTheme();
  }

  const pathname = usePathname() || "/";

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label="Khaleel home" onClick={() => setOpen(false)}>
          <span className="brand-mark">Khaleel</span>
        </Link>
        <div className="nav-actions">
          <button className={`lantern-pull${dark ? " is-dark" : ""}`} type="button"
            onClick={handleLanternClick}
            onPointerDown={handleLanternPointerDown}
            onPointerMove={handleLanternPointerMove}
            onPointerUp={handleLanternPointerUp}
            onPointerCancel={handleLanternPointerUp}
            aria-label="Pull the lantern to switch theme" aria-pressed={dark} title="Pull the lantern to switch theme"
            style={{ "--lantern-pull": `${pull}px` }}>
            <span className="lantern-rope" aria-hidden="true"><span className="lantern-rope-line" /><span className="lantern-rope-knot" /></span>
            <span className="lantern-group" aria-hidden="true">
              <svg className="lantern-art" width="34" height="40" viewBox="0 0 34 40" fill="none">
                <path d="M12 4h10l2 4H10l2-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M10 8h14l3 6v15l-4 5H11l-4-5V14l3-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M11 15h12v12H11V15Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="1.4" />
                <path d="M13.6 24.5c.7-3.6 1.8-5.7 3.4-7.2 1.6 1.5 2.7 3.6 3.4 7.2-.9 1.1-2 1.7-3.4 1.7s-2.5-.6-3.4-1.7Z" fill="#b9ff77" />
                <path d="M12 34v2M22 34v2M8 38h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </button>
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
        </div>
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
