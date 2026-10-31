"use client";

import { useState } from "react";

const EMAIL = "mkhaleelullah01@gmail.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <button className="copy-email-box" type="button" onClick={copyEmail} aria-label="Copy email address">
        <span>{copied ? "Copied" : EMAIL}</span>
        <svg className="copy-email-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
    </>
  );
}
