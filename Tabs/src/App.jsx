import React, { useMemo, useState } from "react";
import "./styles.css";

/**
 * Example 5: Tabs (2 files)
 * Covers: tablist/tabpanel semantics, active tab state,
 * clean data-driven rendering, and small UX polish.
 */

export default function App() {
  const tabs = useMemo(
    () => [
      {
        id: "t1",
        label: "Overview",
        content:
          "Tabs are a common UI pattern. Keep state minimal and render panels based on active tab."
      },
      {
        id: "t2",
        label: "Details",
        content:
          "Senior touch: use proper roles (tablist/tab/tabpanel) and keep the code data-driven."
      },
      {
        id: "t3",
        label: "Notes",
        content:
          "If asked, you can add keyboard navigation (ArrowLeft/ArrowRight) and focus management."
      }
    ],
    []
  );

  const [activeId, setActiveId] = useState(tabs[0]?.id ?? null);
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className="page">
      <header className="header">
        <h1 className="h1">Tabs</h1>
        <p className="sub">
          Active state • Data-driven UI • Proper roles (tablist/tab/tabpanel)
        </p>
      </header>

      <section className="card">
        <div className="tabList" role="tablist" aria-label="Demo tabs">
          {tabs.map((t) => {
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`tabBtn ${isActive ? "active" : ""}`}
                onClick={() => setActiveId(t.id)}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="tabPanel" role="tabpanel">
          {activeTab?.content}
        </div>
      </section>
    </div>
  );
}
