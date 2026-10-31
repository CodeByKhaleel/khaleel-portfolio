"use client";

import { useEffect, useMemo, useState } from "react";

const stages = [
  { label: "SELECT", note: "Choose a CRM record" },
  { label: "PREPARE", note: "Clean and validate values" },
  { label: "FOLLOW", note: "Read portal configuration" },
  { label: "HAND OFF", note: "Pause, resume, classify" },
];

const rawFields = [
  ["full_name", "MOHAMMED KHALEELULLAH"],
  ["dob", "2000-01-15"],
  ["country", "IN"],
  ["email", "mkhaleelullah01@gmail.com"],
];

const cleanFields = [
  ["full_name", "Mohammed Khaleelullah"],
  ["date", "15/01/2000"],
  ["country", "India · IND"],
  ["email", "mkhaleelullah01@gmail.com"],
];

const configLines = [
  "{",
  '  "portal": "Portal A",',
  '  "fields": {',
  '    "given_name": "name.first",',
  '    "dob": "date.DD/MM/YYYY",',
  '    "country": "lookup.country_code"',
  "  }",
  "}",
];

function SequentialFields({ fields, checks = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedValues, setTypedValues] = useState(() => fields.map(() => ""));
  const [completed, setCompleted] = useState(() => fields.map(() => false));

  useEffect(() => {
    if (activeIndex >= fields.length) return undefined;
    const [, timerValue] = fields[activeIndex];
    let character = 0;
    let advanceTimer;
    const typingTimer = window.setInterval(() => {
      character += 1;
      setTypedValues((current) => current.map((value, index) => index === activeIndex ? timerValue.slice(0, character) : value));
      if (character >= timerValue.length) {
        window.clearInterval(typingTimer);
        setCompleted((current) => current.map((done, index) => index === activeIndex ? true : done));
        advanceTimer = window.setTimeout(() => setActiveIndex((index) => index + 1), 420);
      }
    }, 38);
    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(advanceTimer);
    };
  }, [activeIndex, fields]);

  return fields.map(([label, value], index) => (
    <div className={`workflow-field${checks && completed[index] ? " workflow-field--success" : ""}`} key={label}>
      <label>{label}</label>
      <div>
        {typedValues[index]}
        {index === activeIndex && activeIndex < fields.length && typedValues[index].length < value.length && <span className="typing-caret" aria-hidden="true" />}
        {checks && completed[index] && <span className="workflow-check" aria-label="Complete">✓</span>}
      </div>
    </div>
  ));
}

function SequentialConfig() {
  const [activeLine, setActiveLine] = useState(0);
  const [typedLines, setTypedLines] = useState(() => configLines.map(() => ""));

  useEffect(() => {
    if (activeLine >= configLines.length) return undefined;
    const line = configLines[activeLine];
    let character = 0;
    let nextLineTimer;
    const typingTimer = window.setInterval(() => {
      character += 1;
      setTypedLines((current) => current.map((value, index) => index === activeLine ? line.slice(0, character) : value));
      if (character >= line.length) {
        window.clearInterval(typingTimer);
        nextLineTimer = window.setTimeout(() => setActiveLine((index) => index + 1), 180);
      }
    }, 24);
    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(nextLineTimer);
    };
  }, [activeLine]);

  return (
    <pre className="workflow-config-code" aria-label="Portal configuration being typed">
      {typedLines.map((line, index) => (
        <span key={index}>
          {renderConfigLine(line)}
          {index === activeLine && activeLine < configLines.length && <span className="typing-caret" aria-hidden="true" />}
        </span>
      ))}
    </pre>
  );
}

function renderConfigLine(line) {
  const keyMatch = line.match(/^(\s*)("[^\"]*"?)(:\s*)(.*)$/);
  if (keyMatch) {
    return <>{keyMatch[1]}<span className="workflow-config-key">{keyMatch[2]}</span>{keyMatch[3]}{keyMatch[4]}</>;
  }

  const partialKeyMatch = line.match(/^(\s*)"[^\"]*$/);
  if (partialKeyMatch) {
    return <>{partialKeyMatch[1]}<span className="workflow-config-key">{line.slice(partialKeyMatch[1].length)}</span></>;
  }

  return line;
}

export default function WorkflowBoard() {
  const [activeStage, setActiveStage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return undefined;
    const timer = window.setInterval(() => {
      setActiveStage((stage) => (stage + 1) % stages.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const activeLabel = useMemo(() => stages[activeStage].label, [activeStage]);

  return (
    <section className="section section--compact">
      <div className="container">
        <div className="workflow-board interactive-workflow">
          <div className="workflow-board-header">
            <div>
              <p className="eyebrow">One record → any portal</p>
              <h2 className="section-title">Make variation manageable.</h2>
              <p>Watch one record move from raw CRM data to a portal-ready run, with rules and human checkpoints visible along the way.</p>
            </div>
            <div className="workflow-board-meta"><span>SAMPLE RUN</span><span>JSON CONFIG</span><span>70+ PORTALS</span></div>
          </div>

          <div className="workflow-tabs" role="tablist" aria-label="Workflow stages">
            {stages.map((stage, index) => (
              <button
                key={stage.label}
                className={`workflow-tab${activeStage === index ? " workflow-tab--active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                onClick={() => { setActiveStage(index); setAutoPlay(false); }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{stage.label}
              </button>
            ))}
            <button className="workflow-replay" type="button" onClick={() => setAutoPlay((value) => !value)}>
              {autoPlay ? "pause" : "play"} animation
            </button>
          </div>

          <div className="workflow-live-label"><span className="workflow-live-dot" /> Stage {String(activeStage + 1).padStart(2, "0")} · {activeLabel}</div>

          <div className="workflow-canvas" aria-live="polite">
            {activeStage === 0 && (
              <div className="workflow-stage-layout">
                <article className="workflow-panel workflow-panel--source workflow-live-panel">
                  <div className="workflow-panel-label">CRM RECORD · SELECTED</div>
                  <div className="workflow-form">
                    <SequentialFields fields={rawFields} checks />
                  </div>
                </article>
                <div className="workflow-stage-arrow">→</div>
                <aside className="workflow-side-note"><span className="workflow-note-index">01</span><strong>Choose once</strong><p>The operator selects the CRM record and target portal. The same record can then travel through each configured path.</p></aside>
              </div>
            )}

            {activeStage === 1 && (
              <div className="workflow-stage-layout">
                <article className="workflow-panel workflow-panel--clean workflow-live-panel">
                  <div className="workflow-panel-label">PREPARE · CLEAN DATA</div>
                  <div className="workflow-form">
                    <SequentialFields fields={cleanFields} checks />
                  </div>
                </article>
                <div className="workflow-stage-arrow">→</div>
                <aside className="workflow-side-note"><span className="workflow-note-index">02</span><strong>Shape before launch</strong><p>Names, dates, country codes, and contact values are normalized before the browser touches a portal.</p></aside>
              </div>
            )}

            {activeStage === 2 && (
              <div className="workflow-stage-layout">
                <article className="workflow-panel workflow-panel--config workflow-live-panel">
                  <div className="workflow-panel-label">PORTAL CONFIG · RULES</div>
                  <SequentialConfig />
                </article>
                <div className="workflow-stage-arrow">→</div>
                <aside className="workflow-side-note"><span className="workflow-note-index">03</span><strong>Config, not a new bot</strong><p>The shared workflow reads the portal description, follows relevant branches, and skips fields that do not apply.</p></aside>
              </div>
            )}

            {activeStage === 3 && (
              <div className="workflow-stage-layout">
                <article className="workflow-panel workflow-panel--handoff workflow-live-panel">
                  <div className="workflow-panel-label">RUN STATUS · RESILIENT</div>
                  <div className="workflow-log"><p><span>10:02:11</span><b className="log-success">✓</b> Given name filled</p><p><span>10:02:12</span><b className="log-warning">!</b> OTP required — pause</p><p><span>10:02:13</span><b className="log-retry">↻</b> Slow page — retry 1</p><p><span>10:02:14</span><b className="log-success">✓</b> Run resumed</p></div>
                </article>
                <div className="workflow-stage-arrow">→</div>
                <aside className="workflow-side-note"><span className="workflow-note-index">04</span><strong>Keep the run alive</strong><p>Small failures retry. OTPs and CAPTCHAs pause for a person, then resume the same workflow instead of breaking it.</p></aside>
              </div>
            )}
          </div>

          <div className="workflow-board-footer"><span>Same data. Different portal rules. One maintainable system.</span><span>click a stage to inspect it</span></div>
        </div>
      </div>
    </section>
  );
}
