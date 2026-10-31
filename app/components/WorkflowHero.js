"use client";

import { useEffect, useState } from "react";

const variants = {
  A: {
    name: "Portal A",
    fields: [
      { label: "Given name", value: "Anika", key: "first_name" },
      { label: "Family name", value: "Sharma", key: "last_name" },
      { label: "Date of birth", value: "23/04/1998", key: "dob" },
      { label: "Country", value: "India", key: "country" },
    ],
  },
  B: {
    name: "Portal B",
    fields: [
      { label: "First name", value: "Anika", key: "first_name" },
      { label: "Last name", value: "Sharma", key: "last_name" },
      { label: "Birth date", value: "1998-04-23", key: "dob_iso" },
      { label: "Email address", value: "anika.sharma@example.com", key: "email" },
    ],
  },
};

export default function WorkflowHero() {
  const [portal, setPortal] = useState("A");
  const [activeField, setActiveField] = useState(0);
  const [values, setValues] = useState(() => variants.A.fields.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const fields = variants[portal].fields;

  useEffect(() => {
    if (activeField >= fields.length || submitted) return undefined;
    const field = fields[activeField];
    let character = 0;
    let nextTimer;
    const typeTimer = window.setInterval(() => {
      character += 1;
      setValues((current) => current.map((value, index) => index === activeField ? field.value.slice(0, character) : value));
      if (character >= field.value.length) {
        window.clearInterval(typeTimer);
        nextTimer = window.setTimeout(() => setActiveField((index) => index + 1), 260);
      }
    }, 34);
    return () => {
      window.clearInterval(typeTimer);
      window.clearTimeout(nextTimer);
    };
  }, [activeField, fields, submitted]);

  useEffect(() => {
    if (activeField !== fields.length || submitted) return undefined;
    const timer = window.setTimeout(() => setSubmitted(true), 550);
    return () => window.clearTimeout(timer);
  }, [activeField, fields.length, submitted]);

  useEffect(() => {
    if (!submitted) return undefined;
    const replayTimer = window.setTimeout(() => {
      setValues(fields.map(() => ""));
      setActiveField(0);
      setSubmitted(false);
    }, 2200);
    return () => window.clearTimeout(replayTimer);
  }, [fields, submitted]);

  function choosePortal(nextPortal) {
    setPortal(nextPortal);
    setActiveField(0);
    setSubmitted(false);
    setValues(variants[nextPortal].fields.map(() => ""));
  }

  return (
    <section className="page-hero workflow-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb"><a data-route="/projects/" href="/projects/">Projects</a><span aria-hidden="true">/</span><span>Professional work</span></nav>
        <div className="workflow-hero-grid">
          <div className="workflow-hero-copy">
            <p className="eyebrow">Workflow design · Data preparation · Automation</p>
            <h1>Turning Repetitive Submissions into Repeatable Workflows</h1>
            <p className="lead">A configurable approach to repeated portal submissions: prepare data once, map each portal’s fields, and automate the form fill.</p>
            <div className="meta-strip"><span className="meta-chip"><strong>My role</strong> Config model and workflow logic</span><span className="meta-chip"><strong>Scale</strong> 70+ portals</span><span className="meta-chip"><strong>Team</strong> Cross-functional</span></div>
          </div>

          <div className="portal-demo" aria-label="Interactive sample of configuration filling a portal form">
            <div className="portal-demo-head"><div><span className="portal-demo-kicker">CONFIG-DRIVEN RPA · SAMPLE</span><strong>{variants[portal].name} submission</strong></div><span className={`portal-demo-status${submitted ? " portal-demo-status--done" : ""}`}>{submitted ? "COMPLETE" : activeField >= fields.length ? "SUBMITTING" : "FILLING"}</span></div>
            <div className="portal-switch" role="group" aria-label="Choose sample portal">
              {Object.keys(variants).map((key) => <button type="button" key={key} className={portal === key ? "is-selected" : ""} onClick={() => choosePortal(key)}>{variants[key].name}</button>)}
            </div>
            <div className="portal-demo-body">
              <div className="portal-config-card">
                <div className="portal-card-label">FIELD MAPPING</div>
                {fields.map((field, index) => <div className={`portal-map-row${index <= activeField ? " portal-map-row--active" : ""}`} key={field.key}><span>{field.key}</span><b>{field.label}</b></div>)}
                <div className="portal-config-foot"><i /> shared workflow · portal config</div>
              </div>
              <div className="portal-form-card">
                <div className="portal-card-label">APPLICATION FORM <span>{String(Math.min(activeField + 1, fields.length)).padStart(2, "0")} / {fields.length}</span></div>
                {fields.map((field, index) => <label className={`portal-input-row${index < activeField ? " portal-input-row--done" : ""}`} key={field.key}>{field.label}<span>{values[index] || ""}{index === activeField && !submitted && <i className="typing-caret" aria-hidden="true" />}{index < activeField && <b aria-label="Filled">✓</b>}</span></label>)}
                <button type="button" className={`portal-submit${submitted ? " portal-submit--done" : activeField >= fields.length ? " portal-submit--pending" : ""}`} disabled={!submitted} onClick={() => {}}>{submitted ? "✓ Submitted" : activeField >= fields.length ? "Submitting…" : "Submit application"}</button>
              </div>
            </div>
            <p className="portal-demo-caption">Switch portals to see the same workflow adapt to different field names and formats.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
