"use client";

import { useEffect, useState } from "react";

const stages = [
  { label: "SOURCE", note: "University course and intake details live across pages with different structures." },
  { label: "EXTRACT", note: "TypeScript and Playwright scripts follow each university site's own page patterns." },
  { label: "NORMALIZE", note: "Shared field rules organize intake dates, course level, campus, duration, and attendance type." },
  { label: "QUALITY CHECK", note: "Generated files are reviewed before any records reach the CRM." },
  { label: "CRM IMPORT", note: "The checked data is ready to support the internal CRM update." },
];

const fields = [
  ["course_name", "Program title", "Course title extracted"],
  ["intake_dates", "Intake schedule", "Date range normalized"],
  ["attendance_type", "Attendance", "Study mode mapped"],
  ["duration", "Course length", "Duration standardized"],
  ["campus", "Campus details", "Campus name prepared"],
];

export default function UniversityDataFlow() {
  const [activeStage, setActiveStage] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      return undefined;
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setActiveStage((stage) => (stage + 1) % stages.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [playing]);

  function selectStage(index) {
    setActiveStage(index);
    setPlaying(false);
  }

  return (
    <section className="section section--compact">
      <div className="container">
        <div className="udata-flow">
          <div className="udata-flow-heading">
            <div>
              <p className="eyebrow">UNIVERSITY DATA · EXTRACTION PIPELINE</p>
              <h2 className="section-title">From university pages to CRM-ready files.</h2>
              <p className="lead">Follow a representative course record through extraction, normalization, review, and import.</p>
            </div>
            <div className="udata-impact" aria-label="Pipeline tools and checkpoint">
              <span>EXTRACT <strong>TypeScript · Playwright</strong></span>
              <span>QUALITY GATE <strong>QC before CRM import</strong></span>
            </div>
          </div>

          <div className="udata-controls" role="group" aria-label="Pipeline stages">
            {stages.map((stage, index) => (
              <button type="button" key={stage.label} className={activeStage === index ? "udata-stage udata-stage--active" : "udata-stage"} aria-pressed={activeStage === index} onClick={() => selectStage(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>{stage.label}
              </button>
            ))}
            <button type="button" className="udata-play" onClick={() => setPlaying((value) => !value)}>{playing ? "Pause flow" : "Play flow"}</button>
          </div>

          <div className="udata-track" aria-hidden="true"><span style={{ transform: `translateX(${activeStage * 100}%)` }} /><i /></div>

          <div className={`udata-workbench udata-workbench--stage-${activeStage}`}>
            <article className={`udata-source-card${activeStage <= 1 ? " is-active" : " is-complete"}`}>
              <div className="udata-card-top"><span className="udata-card-icon">↗</span><span className="mono-label">SOURCE PAGE</span></div>
              <div className="udata-browser-dots"><i /><i /><i /><span>university course page</span></div>
              <div className="udata-source-content">
                <span className="udata-page-label">COURSE INFORMATION</span>
                {fields.map(([key, sourceLabel], index) => <div className={activeStage === 1 && index === 0 ? "udata-source-row is-scanning" : "udata-source-row"} key={key}><span>{sourceLabel}</span><i /></div>)}
              </div>
              <p className="udata-source-caption">Different layouts, one structured collection goal</p>
            </article>

            <div className="udata-transfer" aria-hidden="true"><span className="udata-transfer-label">extract · shape · review</span><div className="udata-transfer-line"><i className="udata-data-packet" /></div><span className="udata-transfer-arrow">→</span></div>

            <article className={`udata-record-card${activeStage >= 2 ? " is-active" : ""}`}>
              <div className="udata-card-top"><span className="mono-label">STRUCTURED REVIEW FILE</span><span className={`udata-file-status udata-file-status--${activeStage >= 3 ? "ready" : "working"}`}>{activeStage >= 4 ? "READY FOR CRM" : activeStage >= 3 ? "QC COMPLETE" : "PROCESSING"}</span></div>
              <div className="udata-record-head"><span>FIELD</span><span>COLLECTED VALUE</span><span>CHECK</span></div>
              {fields.map(([key, , outputValue], index) => <div className={`udata-record-row${activeStage >= 2 && index <= activeStage ? " udata-record-row--ready" : ""}`} key={key}><code>{key}</code><span>{outputValue}</span><b>{activeStage >= 3 ? "✓" : activeStage >= 2 && index <= activeStage ? "•" : "—"}</b></div>)}
              <div className={`udata-qc-banner${activeStage >= 3 ? " udata-qc-banner--ready" : ""}`}><span>{activeStage >= 3 ? "✓" : "○"}</span><div><strong>{activeStage >= 3 ? "Quality check complete" : "Quality review checkpoint"}</strong><small>{activeStage >= 4 ? "Prepared for the CRM import" : "Generated file reviewed before import"}</small></div></div>
            </article>
          </div>

          <div className="udata-flow-footer"><p aria-live="polite"><span className="udata-live-dot" /> STEP {String(activeStage + 1).padStart(2, "0")} · {stages[activeStage].label}<span className="udata-stage-note">{stages[activeStage].note}</span></p><span>Illustrative pipeline · no live CRM records</span></div>
        </div>
      </div>
    </section>
  );
}
