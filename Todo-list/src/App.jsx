import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * Example 1: Todo List (single file)
 * Covers: controlled input, add/toggle/delete, clear completed, derived counts
 */

export default function App() {
  // State for the current text input value
  const [text, setText] = useState("");
  
  // State for the list of todos, initialized with some default tasks
  const [todos, setTodos] = useState(() => [
    { id: makeId(), title: "Prepare React patterns", done: false },
    { id: makeId(), title: "Practice controlled inputs", done: true },
  ]);

  // Derived state: calculate how many tasks are not yet completed
  // useMemo ensures this is only recalculated when the `todos` array changes
  const remaining = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );

  // Handler to add a new todo to the list
  function addTodo(e) {
    e.preventDefault(); // Prevents the form from refreshing the page
    const title = text.trim();
    if (!title) return; // Ignore empty submissions

    // Add the new todo at the beginning of the list
    setTodos((prev) => [{ id: makeId(), title, done: false }, ...prev]);
    setText(""); // Clear the input field
  }

  // Handler to toggle the completion status of a specific todo
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  // Handler to remove a specific todo from the list
  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // Handler to clear all completed todos from the list
  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  // Helpers to determine if the add button or clear button should be enabled
  const canAdd = text.trim().length > 0;
  const hasCompleted = todos.some((t) => t.done);

  return (
    <div className="page">
      {/* Header section */}
      <header className="header">
        <h1 className="h1">Todo List</h1>
        <p className="sub">
          Add • Toggle • Delete • Clear completed (single-file React component)
        </p>
      </header>

      {/* Form for adding new todos */}
      <form onSubmit={addTodo} className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          className="input"
        />
        <button type="submit" disabled={!canAdd} className="button">
          Add
        </button>
      </form>

      {/* Meta section: shows counts and the clear completed button */}
      <div className="meta">
        <span>
          Total: <b>{todos.length}</b> • Remaining: <b>{remaining}</b>
        </span>
        <button
          type="button"
          onClick={clearCompleted}
          disabled={!hasCompleted}
          className="button"
        >
          Clear completed
        </button>
      </div>

      {/* Todo list display */}
      {todos.length === 0 ? (
        <p className="empty">No todos yet. Add one above 👆</p>
      ) : (
        <ul className="list">
          {todos.map((t) => (
            <li key={t.id} className="item">
              <label className="label">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTodo(t.id)}
                />
                <span className={`todoText ${t.done ? "done" : ""}`}>
                  {t.title}
                </span>
              </label>

              <button
                type="button"
                onClick={() => removeTodo(t.id)}
                aria-label={`Remove ${t.title}`}
                title="Remove"
                className="iconButton"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ----------------------------- small helpers ----------------------------- */

/**
 * Generates a unique ID for new todo items.
 * Uses crypto.randomUUID if available, otherwise falls back to a timestamp + random string.
 */
function makeId() {
  try {
    return crypto.randomUUID();
  } catch {
    return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
  }
}
