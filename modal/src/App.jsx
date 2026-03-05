import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

/**
 * Example 4: Modal (2 files)
 * Covers: open/close, overlay click to close, ESC to close,
 * initial focus, restore focus on close, and scroll lock (nice senior touch).
 */

export default function App() {
  const [open, setOpen] = useState(false);
  const openBtnRef = useRef(null);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    // restore focus to the button that opened the modal
    requestAnimationFrame(() => openBtnRef.current?.focus());
  }

  return (
    <div className="page">
      <header className="header">
        <h1 className="h1">Modal</h1>
        <p className="sub">
          Overlay close • ESC close • Focus management • Scroll lock
        </p>
      </header>

      <section className="card">
        <button ref={openBtnRef} className="btn" onClick={openModal}>
          Open Modal
        </button>

        <Modal
          open={open}
          title="Confirm action"
          onClose={closeModal}
          footer={
            <div className="rowRight">
              <button className="btn" onClick={closeModal} type="button">
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  alert("Confirmed!");
                  closeModal();
                }}
                type="button"
              >
                Confirm
              </button>
            </div>
          }
        >
          <p className="p0">
            This modal supports closing via overlay click and Escape key. It also
            focuses the close button on open and restores focus back to the
            “Open Modal” button on close.
          </p>
        </Modal>
      </section>
    </div>
  );
}

function Modal({ open, title, children, footer, onClose }) {
  const closeBtnRef = useRef(null);

  // ESC close + initial focus + scroll lock
  useEffect(() => {
    if (!open) return;

    // Initial focus on close button
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    // Scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => {
        // close only when clicking overlay itself (not inside modal)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modalHeader">
          <div className="modalTitle">{title}</div>
          <button
            ref={closeBtnRef}
            className="iconBtn"
            onClick={onClose}
            aria-label="Close modal"
            title="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="modalBody">{children}</div>

        {footer ? <div className="modalFooter">{footer}</div> : null}
      </div>
    </div>
  );
}
