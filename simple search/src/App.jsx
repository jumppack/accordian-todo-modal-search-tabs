import { useMemo, useState } from "react";
import "./styles.css";

/**
 * Example 2: Search Filter (2 files)
 * Covers: controlled input, filtering, derived state with useMemo,
 * toggle filter (in-stock only), empty state, small UX touches.
 */

const PRODUCTS = [
  { id: "p1", name: "MacBook Pro", inStock: true, category: "Laptops" },
  { id: "p2", name: "Mechanical Keyboard", inStock: true, category: "Accessories" },
  { id: "p3", name: "Noise Cancelling Headphones", inStock: false, category: "Audio" },
  { id: "p4", name: "USB-C Hub", inStock: true, category: "Accessories" },
  { id: "p5", name: "4K Monitor", inStock: false, category: "Monitors" },
  { id: "p6", name: "Ergonomic Mouse", inStock: true, category: "Accessories" }
];

export default function App() {
  const [query, setQuery] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      const matchesText = !q || p.name.toLowerCase().includes(q);
      const matchesStock = !onlyInStock || p.inStock;
      return matchesText && matchesStock;
    });
  }, [query, onlyInStock]);

  const canClear = query.trim().length > 0;

  return (
    <div className="page">
      <header className="header">
        <h1 className="h1">Search Filter</h1>
        <p className="sub">
          Controlled input • Filtering • useMemo • Empty state
        </p>
      </header>

      <section className="card">
        <div className="row">
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
          />
          <button
            className={`btn ${!canClear ? "btnDisabled" : ""}`}
            onClick={() => setQuery("")}
            disabled={!canClear}
            type="button"
          >
            Clear
          </button>
        </div>

        <label className="checkRow">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={() => setOnlyInStock((v) => !v)}
          />
          <span>Only show in-stock</span>
        </label>

        <div className="meta">
          <span>
            Results: <b>{filtered.length}</b>
          </span>
          <span className="hint">
            Tip: try “usb”, “monitor”, or “keyboard”
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            No matches. Try a different search or turn off “in-stock only”.
          </div>
        ) : (
          <ul className="list" aria-label="Filtered products list">
            {filtered.map((p) => (
              <li className="item" key={p.id}>
                <div className="left">
                  <div className="name">{p.name}</div>
                  <div className="category">{p.category}</div>
                </div>

                <span className={`badge ${p.inStock ? "in" : "out"}`}>
                  {p.inStock ? "In stock" : "Out of stock"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
