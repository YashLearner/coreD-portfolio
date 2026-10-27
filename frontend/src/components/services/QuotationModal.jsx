import { useEffect, useId, useRef, useState } from "react";
import { Building2, Mail, MessageSquare, Send, Wrench, X } from "lucide-react";

const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

const INITIAL_FORM = {
  fullName: "",
  businessEmail: "",
  companyName: "",
  requirements: "",
  systems: "",
};

// Form ka data Google Apps Script (Google Sheet) par bhejta hai.
async function sendToGoogleSheet(data) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    throw new Error("Backend URL missing. Please check your .env file.");
  }

  const body = new URLSearchParams({
    formType: "quotation",
    fullName: data.fullName,
    businessEmail: data.businessEmail,
    companyName: data.companyName,
    requirements: data.requirements,
    systems: data.existingSystems,
    selectedService: `${data.service} · ${data.package}`,
  });

  console.log("Sending quotation to:", GOOGLE_APPS_SCRIPT_URL);
  console.log("Quotation payload:", body.toString());

  // no-cors: response read nahi hota, lekin data Apps Script tak pahunch jata hai.
  await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body,
  });
}

const inputClassName = [
  "w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 pl-10",
  "text-sm text-[#1C1C1C] placeholder:text-black/35 outline-none transition",
  "hover:border-black/20 focus:border-[#14161A] focus:ring-2 focus:ring-[#FF9100]/20",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

function FormField({ id, label, icon: Icon, children, note }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-[#1C1C1C] sm:text-sm"
      >
        {label} <span className="text-[#FF9100]">*</span>
      </label>
      <div className="relative">
        {Icon ? (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]"
            aria-hidden="true"
          />
        ) : null}
        {children}
      </div>
      {note ? (
        <p className="mt-1.5 text-right text-[10px] text-[#777]">{note}</p>
      ) : null}
    </div>
  );
}

export default function QuotationModal({ service, pkg, onClose }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const formId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const clean = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()]),
    );

    if (!clean.fullName || !clean.businessEmail || !clean.companyName) {
      setFeedback({
        type: "error",
        text: "Please complete your name, business email and company name.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.businessEmail)) {
      setFeedback({
        type: "error",
        text: "Please enter a valid business email address.",
      });
      return;
    }

    const payload = {
      serviceId: service.id,
      service: service.label,
      packageId: pkg.id,
      package: pkg.packageName,
      fullName: clean.fullName,
      businessEmail: clean.businessEmail,
      companyName: clean.companyName,
      requirements: clean.requirements,
      existingSystems: clean.systems,
    };

    setSubmitting(true);
    try {
      // Hamesha seedha Google Sheet par bhejo (parent ke onSubmitRequest par depend nahi).
      await sendToGoogleSheet(payload);

      setFeedback({
        type: "success",
        text: "Your quotation request was sent. The team will follow up after reviewing the scope.",
      });
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Quotation submit failed:", error);
      setFeedback({
        type: "error",
        text:
          error instanceof Error && error.message
            ? error.message
            : "We couldn't send your request. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const requirementsId = `${formId}-requirements`;
  const systemsId = `${formId}-systems`;
  const feedbackClass =
    feedback?.type === "success"
      ? "border-emerald-700/20 bg-emerald-50 text-emerald-800"
      : feedback?.type === "error"
        ? "border-red-700/20 bg-red-50 text-red-800"
        : "border-amber-700/20 bg-amber-50 text-amber-900";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        className="relative my-auto max-h-[95dvh] w-full max-w-xl overflow-y-auto rounded-t-[24px] border border-black/10 bg-white p-5 text-[#1C1C1C] shadow-2xl sm:max-h-[90dvh] sm:rounded-[28px] sm:p-8"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-transparent"
        />

        <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#FF9100] sm:text-[11px]">
              Request quotation
            </span>
            <h2
              id={`${formId}-title`}
              className="mt-1 font-[Roboto_Flex,Roboto,sans-serif] text-2xl font-bold tracking-tight text-[#14161A] sm:text-3xl"
            >
              {service.form.title}
            </h2>
            <p className="mt-2 max-w-md text-xs leading-5 text-[#6B6B6B] sm:text-sm sm:leading-6">
              {service.form.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-black/[0.03] text-[#555] transition hover:bg-black/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/[0.08] bg-[#FAF7F1] p-3.5 sm:mb-6 sm:p-4">
          <div className="min-w-0">
            <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.1em] text-[#777]">
              Selected service & tier
            </span>
            <strong className="block break-words text-xs leading-5 text-[#14161A] sm:text-sm">
              {service.label} · {pkg.packageName}
            </strong>
          </div>
          <span className="shrink-0 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[9px] font-semibold text-[#444]">
            Tailored proposal
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id={`${formId}-fullName`}
            label="Full Name"
            icon={Building2}
          >
            <input
              ref={firstInputRef}
              id={`${formId}-fullName`}
              name="fullName"
              type="text"
              autoComplete="name"
              maxLength={120}
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className={inputClassName}
            />
          </FormField>

          <FormField
            id={`${formId}-businessEmail`}
            label="Business Email"
            icon={Mail}
          >
            <input
              id={`${formId}-businessEmail`}
              name="businessEmail"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="alex@company.com"
              className={inputClassName}
            />
          </FormField>

          <FormField
            id={`${formId}-companyName`}
            label="Company Name"
            icon={Building2}
          >
            <input
              id={`${formId}-companyName`}
              name="companyName"
              type="text"
              autoComplete="organization"
              maxLength={120}
              required
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              className={inputClassName}
            />
          </FormField>

          <div>
            <label
              htmlFor={requirementsId}
              className="mb-1.5 block text-xs font-semibold text-[#1C1C1C] sm:text-sm"
            >
              {service.form.requirementsLabel}
            </label>
            <div className="relative">
              <MessageSquare
                className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#777]"
                aria-hidden="true"
              />
              <textarea
                id={requirementsId}
                name="requirements"
                rows={3}
                maxLength={2000}
                value={formData.requirements}
                onChange={handleChange}
                placeholder={service.form.requirementsPlaceholder}
                className={`${inputClassName} min-h-24 resize-y pl-10`}
              />
            </div>
            <p className="mt-1.5 text-right text-[10px] text-[#777]">
              {formData.requirements.length}/2000 characters
            </p>
          </div>

          <div>
            <label
              htmlFor={systemsId}
              className="mb-1.5 block text-xs font-semibold text-[#1C1C1C] sm:text-sm"
            >
              {service.form.systemsLabel}
            </label>
            <div className="relative">
              <Wrench
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]"
                aria-hidden="true"
              />
              <input
                id={systemsId}
                name="systems"
                type="text"
                maxLength={500}
                value={formData.systems}
                onChange={handleChange}
                placeholder={service.form.systemsPlaceholder}
                className={inputClassName}
              />
            </div>
          </div>

          {feedback ? (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-xl border px-3.5 py-3 text-xs leading-5 ${feedbackClass}`}
            >
              {feedback.text}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#14161A] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Sending request…" : "Submit quotation request"}
            <Send
              className="h-4 w-4 text-[#FF9100] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
          <p className="text-center text-[10px] leading-5 text-[#777] sm:text-[11px]">
            Scope and feasibility are confirmed after review. Submitting a form
            does not guarantee a quotation.
          </p>
        </form>
      </section>
    </div>
  );
}
