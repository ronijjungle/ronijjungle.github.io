// ─────────────────────────────────────────────────────────
// Contact Form — React island with API integration
// Supports dark and light variants.
// ─────────────────────────────────────────────────────────

import { useState, type FormEvent } from "react";

const API_URL = "https://contact-api.fromjungle.co/api/v1/contact/ronij";

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  variant?: "dark" | "light";
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm({ variant = "dark" }: Props) {
  const isLight = variant === "light";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const inputBase =
    "w-full bg-transparent border-b py-4 text-body focus:outline-none transition-colors";
  const inputVariant = isLight
    ? "border-brand-black/20 text-brand-black placeholder:text-brand-dark-grey focus:border-brand-black"
    : "border-brand-dark-grey/40 text-brand-light-grey placeholder:text-brand-dark-grey focus:border-brand-off-white";
  const inputClasses = `${inputBase} ${inputVariant}`;

  const inputErrorClasses = isLight
    ? "border-red-600"
    : "border-red-400";

  function getInputClassName(field: keyof FieldErrors) {
    return fieldErrors[field]
      ? `${inputClasses} ${inputErrorClasses}`
      : inputClasses;
  }

  function validate(form: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const subject = form.get("subject") as string;
    const message = form.get("message") as string;

    if (!name.trim()) errors.name = "Name is required.";
    else if (name.length > 255) errors.name = "Name must be under 255 characters.";

    if (!email.trim()) errors.email = "Email is required.";

    if (!subject.trim()) errors.subject = "Subject is required.";
    else if (subject.length > 255) errors.subject = "Subject must be under 255 characters.";

    if (!message.trim()) errors.message = "Message is required.";

    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const errors = validate(form);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");

    const body = {
      name: (form.get("name") as string).trim(),
      email: (form.get("email") as string).trim(),
      subject: (form.get("subject") as string).trim(),
      message: (form.get("message") as string).trim(),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 201) {
        setStatus("success");
        return;
      }

      if (res.status === 429) {
        setErrorMessage("Too many requests. Please wait a moment and try again.");
        setStatus("error");
        return;
      }

      if (res.status === 422) {
        const data = await res.json();
        const serverFieldErrors: FieldErrors = {};
        for (const err of data.detail ?? []) {
          const field = err.loc?.[err.loc.length - 1] as keyof FieldErrors | undefined;
          if (field && field in body) {
            serverFieldErrors[field] = err.msg;
          }
        }
        if (Object.keys(serverFieldErrors).length > 0) {
          setFieldErrors(serverFieldErrors);
        } else {
          setErrorMessage("Please check your input and try again.");
        }
        setStatus("error");
        return;
      }

      setErrorMessage("Something went wrong. Please try again later.");
      setStatus("error");
    } catch {
      setErrorMessage("Unable to connect. Please check your internet and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center" role="status">
        <p
          className={`text-heading-lg mb-4 font-display font-bold uppercase tracking-tight ${
            isLight ? "text-brand-black" : "text-brand-off-white"
          }`}
        >
          Message sent.
        </p>
        <p
          className={`text-body ${
            isLight ? "text-brand-dark-grey" : "text-brand-mid-grey"
          }`}
        >
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            autoComplete="name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={getInputClassName("name")}
          />
          {fieldErrors.name && (
            <p id="name-error" role="alert" className="mt-2 text-caption text-red-500">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={getInputClassName("email")}
          />
          {fieldErrors.email && (
            <p id="email-error" role="alert" className="mt-2 text-caption text-red-500">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="sr-only">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          required
          aria-invalid={!!fieldErrors.subject}
          aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
          className={getInputClassName("subject")}
        />
        {fieldErrors.subject && (
          <p id="subject-error" role="alert" className="mt-2 text-caption text-red-500">
            {fieldErrors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          required
          rows={6}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={`${getInputClassName("message")} resize-none`}
        />
        {fieldErrors.message && (
          <p id="message-error" role="alert" className="mt-2 text-caption text-red-500">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-caption text-red-500">
          {errorMessage}
        </p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`inline-flex items-center gap-2 px-8 py-3 text-caption uppercase font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            isLight
              ? "bg-brand-black text-brand-off-white hover:bg-brand-off-black"
              : "bg-brand-off-white text-brand-black hover:bg-brand-light-grey"
          }`}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
          {status !== "submitting" && <span aria-hidden="true">&rarr;</span>}
        </button>
      </div>
    </form>
  );
}
