import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { contact, profile } from "../content";

type Status = "idle" | "sending" | "success" | "mailto" | "error";

const DIRECT_MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent(contact.form.subject)}`;

/**
 * Small modal contact form. Posts to Formspree when `contact.form.formspreeId`
 * is set; otherwise falls back to opening the visitor's email app prefilled.
 * Rendered in a portal so the section's reveal transform cannot clip it.
 */
export default function ContactForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleClose = useCallback(() => {
    setStatus("idle");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.style.overflow = "hidden";
    cardRef.current?.querySelector<HTMLElement>("#cf-name")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([type="hidden"]), textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      previous?.focus?.();
    };
  }, [open, handleClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) {
      setStatus("success");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const id = contact.form.formspreeId.trim();

    if (!id) {
      const subject = encodeURIComponent(`${contact.form.subject} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: contact.form.subject,
        }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const done = status === "success" || status === "mailto";

  return createPortal(
    <div className="modal-overlay" onMouseDown={onBackdrop}>
      <div
        ref={cardRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
      >
        <button
          type="button"
          className="modal-close"
          aria-label={contact.form.close}
          onClick={handleClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <p className="eyebrow">{contact.form.eyebrow}</p>
        <h2 id="contact-form-title" className="modal-title">
          {contact.form.title}
        </h2>
        <p className="modal-lede">{contact.form.lede}</p>

        {done ? (
          <div className="form-success" role="status">
            <div className="form-success-icon" aria-hidden="true">
              ✓
            </div>
            <h3>
              {status === "success" ? contact.form.successTitle : contact.form.mailtoTitle}
            </h3>
            <p>
              {status === "success" ? contact.form.successBody : contact.form.mailtoBody}
            </p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              {contact.form.done}
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cf-name">{contact.form.name}</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={contact.form.namePlaceholder}
                maxLength={120}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-email">{contact.form.email}</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={contact.form.emailPlaceholder}
                maxLength={180}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-message">{contact.form.message}</label>
              <textarea
                id="cf-message"
                name="message"
                required
                rows={5}
                placeholder={contact.form.messagePlaceholder}
                maxLength={2000}
              />
            </div>

            <input
              className="form-hp"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="modal-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? contact.form.sending : contact.form.submit}
                {status !== "sending" && (
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </button>
              <a className="form-direct" href={DIRECT_MAILTO}>
                {contact.form.direct}
              </a>
            </div>

            {status === "error" && (
              <p className="form-msg is-error" role="alert">
                {contact.form.error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
