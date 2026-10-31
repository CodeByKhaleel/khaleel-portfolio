"use client";

import { useEffect, useState } from "react";

const stages = ["SCHEDULE", "INTERPRET", "COMPARE", "ROUTE"];

const notes = [
  "A configurable schedule starts the next requirement checkpoint.",
  "AI reads the Jira ticket pattern and identifies the linked university update.",
  "Workflow rules compare the university email with the existing requirement record.",
  "The result determines whether an update file is prepared or the ticket is completed.",
];

export default function EntryMonitoringFlow() {
  const [activeStage, setActiveStage] = useState(0);
  const [hasUpdate, setHasUpdate] = useState(true);
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
    }, 3900);
    return () => window.clearInterval(timer);
  }, [playing]);

  function selectStage(index) {
    setActiveStage(index);
    setPlaying(false);
  }

  return (
    <section className="section section--compact">
      <div className="container">
        <div className="entry-flow">
          <div className="entry-flow-heading">
            <div>
              <p className="eyebrow">ENTRY REQUIREMENTS · MONITORING WORKFLOW</p>
              <h2 className="section-title">A scheduled check, routed to the right next step.</h2>
              <p className="lead">See how ticket interpretation, record comparison, and clear workflow rules work together.</p>
            </div>
            <div className="entry-flow-badges"><span>JIRA TICKET</span><span>AI INTERPRETATION</span><span>RULE-BASED CHECK</span></div>
          </div>

          <div className="entry-flow-controls" role="group" aria-label="Monitoring workflow stages">
            {stages.map((stage, index) => <button type="button" key={stage} className={activeStage === index ? "entry-stage entry-stage--active" : "entry-stage"} aria-pressed={activeStage === index} onClick={() => selectStage(index)}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</button>)}
            <button type="button" className="entry-play" onClick={() => setPlaying((value) => !value)}>{playing ? "Pause flow" : "Play flow"}</button>
          </div>

          <div className="entry-flow-track" aria-hidden="true"><span style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }} /><i style={{ left: `${(activeStage / (stages.length - 1)) * 100}%` }} /></div>

          <div className="entry-workbench">
            <article className={`entry-ticket${activeStage <= 1 ? " is-active" : " is-complete"}`}>
              <div className="entry-card-kicker"><span className="entry-icon">J</span><span>JIRA · REQUIREMENT UPDATE</span></div>
              <strong>University entry requirement</strong>
              <p>Ticket details guide the workflow to the relevant university update.</p>
              <div className="entry-ticket-meta"><span>CHECKPOINT</span><b>{activeStage === 0 ? "SCHEDULED" : "IN REVIEW"}</b></div>
              <div className="entry-ai-row"><span className="entry-ai-icon">AI</span><span><b>Ticket interpreted</b><small>Update context identified</small></span><i>{activeStage >= 1 ? "✓" : "…"}</i></div>
            </article>

            <div className="entry-connector" aria-hidden="true"><span className="entry-connector-caption">follow ticket<br />compare record</span><div><i /></div><b>→</b></div>

            <article className={`entry-compare${activeStage >= 2 ? " is-active" : ""}`}>
              <div className="entry-compare-head"><span className="mono-label">REQUIREMENT CHECK</span><span className="entry-compare-pulse">{activeStage >= 2 ? "COMPARING" : "READY"}</span></div>
              <div className={`entry-record entry-record--email${activeStage >= 2 ? " entry-record--scanned" : ""}`}><span className="entry-record-icon">✉</span><span><small>UNIVERSITY EMAIL</small><b>Requirement details received</b></span><i>{activeStage >= 2 ? "✓" : "·"}</i></div>
              <div className="entry-compare-symbol">↕</div>
              <div className={`entry-record entry-record--current${activeStage >= 2 ? " entry-record--scanned" : ""}`}><span className="entry-record-icon">▤</span><span><small>EXISTING RECORD</small><b>Current requirement on file</b></span><i>{activeStage >= 2 ? "✓" : "·"}</i></div>
              <div className={`entry-branch-result${activeStage >= 3 ? " entry-branch-result--ready" : ""}`}><span>{activeStage >= 3 ? (hasUpdate ? "↗" : "✓") : "○"}</span><b>{activeStage >= 3 ? (hasUpdate ? "Update file prepared" : "Ticket completed") : "Comparison routes the next step"}</b></div>
            </article>
          </div>

          <div className="entry-outcome-control">
            <div><span className="mono-label">EXPLORE THE ROUTING</span><p>Choose the comparison result to see its next step.</p></div>
            <div className="entry-outcome-buttons" role="group" aria-label="Choose comparison result">
              <button type="button" className={hasUpdate ? "entry-outcome-button is-selected" : "entry-outcome-button"} aria-pressed={hasUpdate} onClick={() => setHasUpdate(true)}><span>01</span> Update detected</button>
              <button type="button" className={!hasUpdate ? "entry-outcome-button is-selected" : "entry-outcome-button"} aria-pressed={!hasUpdate} onClick={() => setHasUpdate(false)}><span>02</span> Record matches</button>
            </div>
          </div>

          <div className="entry-flow-footer"><p aria-live="polite"><span className="entry-live-dot" /> STEP {String(activeStage + 1).padStart(2, "0")} · {stages[activeStage]}<span>{notes[activeStage]}</span></p><span>Illustrative workflow · no real ticket or email content</span></div>
        </div>
      </div>
    </section>
  );
}
