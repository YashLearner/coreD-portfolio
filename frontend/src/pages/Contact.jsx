import { useRef, useState } from "react";

// const SCRIPT_URL = import.meta.env.VITE_QUOTATION_FORM_SCRIPT_URL;

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzH-089cT1B3_YT5xyEezsGXJ2B2-FTzHQCEMwdekRbU7UfPaG_fn6U-ehfzFBHg8luJw/exec";

// Spam protection settings
const MIN_FILL_MS = 3000; // form itni jaldi submit nahi ho sakta
const MAX_LINKS = 2;

const inputClassName = `
  w-full rounded-xl border border-black/10 bg-white
  px-4 py-3 text-sm text-[#17181C] outline-none
  transition-all duration-200
  placeholder:text-[#9CA3AF]
  hover:border-black/20
  focus:border-orange-400
  focus:ring-4 focus:ring-orange-400/10
`;

const labelClassName = "mb-2 block text-sm font-medium text-[#333333]";

const SUCCESS_TEXT =
  "Thank you! Your request was submitted. Our team will contact you soon.";

export default function Contact() {
  const formRef = useRef(null);
  const startedAt = useRef(Date.now());

  const [status, setStatus] = useState(null); // { type: "success" | "error", text: string }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const showError = (text) => setStatus({ type: "error", text });

  const showSuccess = () => {
    setStatus({ type: "success", text: SUCCESS_TEXT });
    formRef.current?.reset();
    setDescriptionLength(0);
    startedAt.current = Date.now();
  };

  const handleChange = () => {
    // User type karne lage to purana message hata do
    if (status) setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const get = (key) => String(formData.get(key) ?? "").trim();

    // 1) Honeypot: bot ne hidden field bhara hai -> fake success, data mat bhejo
    if (get("Website") !== "") {
      showSuccess();
      return;
    }

    // 2) Time check: bahut jaldi submit kiya gaya
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      showError("Please review your details and submit again.");
      return;
    }

    // 3) Validation
    const email = get("CompanyEmail");
    const phone = get("ContactNumber");
    const description = get("ProjectDescription");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (!/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
      showError("Please enter a valid contact number.");
      return;
    }

    const linkCount = (description.match(/https?:\/\/|www\./gi) || []).length;
    if (linkCount > MAX_LINKS) {
      showError("Please remove extra links from the description.");
      return;
    }

    // 4) Data bhejo
    const body = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (key === "Website") continue;
      body.append(key, String(value).trim());
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      showSuccess();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      showError("Unable to send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F1] px-4 pb-16 pt-28 text-[#17181C] sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Page heading */}
        <header className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700 sm:text-[11px]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-orange-500"
            />
            Contact CoreDhristi
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let's talk about your{" "}
            <span className="text-orange-500">project.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
            Tell us about your business and requirements. Our team can help you
            find the right solution.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* Contact information */}
          <aside className="rounded-3xl bg-[#17181C] p-6 text-white sm:p-8 lg:p-9">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-400">
              Let's get started
            </span>

            <h2 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl">
              Tell us what you want to build.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Share your requirements for an AI CRM, AI agent, or a custom CRM
              solution tailored to your business.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm font-semibold">What happens next?</p>

              <div className="mt-4 space-y-4 text-sm leading-6 text-white/65">
                <p>
                  <span className="mr-2 font-semibold text-orange-400">
                    01.
                  </span>
                  Share your project requirements.
                </p>
                <p>
                  <span className="mr-2 font-semibold text-orange-400">
                    02.
                  </span>
                  Our team reviews your selected service and plan.
                </p>
                <p>
                  <span className="mr-2 font-semibold text-orange-400">
                    03.
                  </span>
                  We follow up using your contact details.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-slate-300">
                For business related query:{' '}
                <a
                  href="mailto:info@coredhristi.com"
                  className="font-semibold  text-orange-400 hover:underline transition-colors"
                >
                  info@coredhristi.com
                </a>
              </p>

              <p className="text-xs text-slate-300">
                 Contact HR :{' '}
                <a
                  href="mailto:info@coredhristi.com"
                  className="font-semibold text-orange-400 hover:underline transition-colors"
                >
                   carrers@cored.com
                </a>
              </p>
            </div>

          </aside>

          {/* Contact form */}
          <section className="min-w-0 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_45px_rgba(23,23,23,0.06)] sm:p-8 lg:p-9">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onChange={handleChange}
              className="space-y-5"
            >
              {/* Honeypot: bots ke liye, user ko nahi dikhega */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="Website">Leave this field empty</label>
                <input
                  id="Website"
                  name="Website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Company name */}
              <div>
                <label htmlFor="CompanyName" className={labelClassName}>
                  Company Name <span className="text-orange-500">*</span>
                </label>
                <input
                  id="CompanyName"
                  name="CompanyName"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="organization"
                  placeholder="Enter your company name"
                  className={inputClassName}
                />
              </div>

              {/* Company email */}
              <div>
                <label htmlFor="CompanyEmail" className={labelClassName}>
                  Company Email <span className="text-orange-500">*</span>
                </label>
                <input
                  id="CompanyEmail"
                  name="CompanyEmail"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="name@company.com"
                  className={inputClassName}
                />
              </div>

              {/* Service selection */}
              <div>
                <label htmlFor="ServiceSelection" className={labelClassName}>
                  Service Selection <span className="text-orange-500">*</span>
                </label>
                <select
                  id="ServiceSelection"
                  name="ServiceSelection"
                  required
                  defaultValue=""
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="AI Based CRM">AI Based CRM</option>
                  <option value="AI Agent CRM">AI Agent CRM</option>
                  <option value="Custom CRM">Custom CRM</option>
                </select>
              </div>

              {/* Choose your plan */}
              <div>
                <label htmlFor="ChooseYourPlan" className={labelClassName}>
                  Choose Your Plan <span className="text-orange-500">*</span>
                </label>
                <select
                  id="ChooseYourPlan"
                  name="ChooseYourPlan"
                  required
                  defaultValue=""
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a plan
                  </option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Custom Agent">Custom Agent</option>
                </select>
              </div>

              {/* Budget range */}
              <div>
                <label htmlFor="BudgetRange" className={labelClassName}>
                  Budget Range <span className="text-orange-500">*</span>
                </label>
                <input
                  id="BudgetRange"
                  name="BudgetRange"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="Enter your budget range"
                  className={inputClassName}
                />
              </div>

              {/* Contact number */}
              <div>
                <label htmlFor="ContactNumber" className={labelClassName}>
                  Contact Number <span className="text-orange-500">*</span>
                </label>
                <input
                  id="ContactNumber"
                  name="ContactNumber"
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  className={inputClassName}
                />
              </div>

              {/* Project description */}
              <div>
                <label htmlFor="ProjectDescription" className={labelClassName}>
                  Project Description <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="ProjectDescription"
                  name="ProjectDescription"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  placeholder="Describe your project, goals, or requirements..."
                  onChange={(e) => setDescriptionLength(e.target.value.length)}
                  className={`${inputClassName} min-h-32 resize-y leading-6`}
                />
                <p className="mt-2 text-right text-xs text-[#6B7280]">
                  {descriptionLength}/2000 characters
                </p>
              </div>

              {/* Status message (success / error) */}
              {status && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl border px-4 py-3 text-sm leading-6 ${status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-700"
                    }`}
                >
                  {status.text}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-3.5 text-sm font-semibold text-[#17181C] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.20)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>

              <p className="text-center text-xs leading-5 text-[#6B7280]">
                Share your requirements with the CoreDhristi team.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
