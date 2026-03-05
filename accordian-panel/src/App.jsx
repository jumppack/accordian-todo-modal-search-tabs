import React, { useId, useMemo, useState } from "react";
import "./styles.css";

/**
 * Example 3: Accordion (2 files)
 * Covers: single-open accordion (common requirement), accessible aria attributes,
 * clean state, reusable AccordionItem, and keyboard-friendly buttons.
 */

export default function App() {
  const items = useMemo(
    () => [
      {
        id: "a1",
        title: "What do interviewers look for in a React component?",
        content:
          "Clear state management, controlled inputs when needed, component separation, and edge-case handling."
      },
      {
        id: "a2",
        title: "Should the accordion allow multiple open panels?",
        content:
          "Depends on requirements. A common default is single-open (only one panel at a time), which we implement here."
      },
      {
        id: "a3",
        title: "What makes this implementation “senior”?",
        content:
          "Accessibility (aria-expanded/controls), clean separation, stable keys, and predictable state updates."
      }
    ],
    []
  );

  // Single-open behavior: store openId (or null)
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="page">
      <header className="header">
        <h1 className="h1">Accordion</h1>
        <p className="sub">
          Single-open • Accessible buttons • Clean reusable item
        </p>
      </header>

      <section className="card">
        <div className="stack">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              title={item.title}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            >
              {item.content}
            </AccordionItem>
          ))}
        </div>
      </section>
    </div>
  );
}

function AccordionItem({ title, isOpen, onToggle, children }) {
  const uid = useId();
  const buttonId = `acc-btn-${uid}`;
  const panelId = `acc-panel-${uid}`;

  return (
    <div className="accItem">
      <button
        id={buttonId}
        className="accButton"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="accTitle">{title}</span>
        <span className="chevron" aria-hidden="true">
          {isOpen ? "▾" : "▸"}
        </span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="accPanel"
          role="region"
          aria-labelledby={buttonId}
        >
          {children}
        </div>
      )}
    </div>
  );
}
