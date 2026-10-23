import { useState } from "react";
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
// const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

const INITIAL_FORM = {
  companyName: "",
  companyEmail: "",
  ServiceSelection: "",
  ChooseYourPlan: "",
  BudgetRange: "",
  contactNumber: "",
  description: "",
};

const inputClassName = `
  w-full rounded-xl border border-black/10 bg-white
  px-4 py-3 text-sm text-[#17181C] outline-none
  transition-all duration-200
  placeholder:text-[#9CA3AF]
  hover:border-black/20
  focus:border-orange-400
  focus:ring-4 focus:ring-orange-400/10
`;

export default function Contact() {
  const [contactForm, setContactForm] = useState(INITIAL_FORM);
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!GOOGLE_APPS_SCRIPT_URL) {
      setMessageType("error");
      setFormMessage("Backend URL missing. Please check your .env file.");
      return;
    }

    setIsSubmitting(true);
    setFormMessage("");

    const payload = new URLSearchParams({
      companyName: contactForm.companyName.trim(),
      companyEmail: contactForm.companyEmail.trim(),
      ServiceSelection: contactForm.ServiceSelection,
      ChooseYourPlan: contactForm.ChooseYourPlan,
      BudgetRange: contactForm.BudgetRange.trim(),
      contactNumber: contactForm.contactNumber.trim(),
      description: contactForm.description.trim(),
    });

    try {
      console.log("Google Apps Script URL:", GOOGLE_APPS_SCRIPT_URL);
      console.log("Form payload:", payload.toString());

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      setMessageType("success");
      setFormMessage(
        "Your request was submitted. Please verify the Google Sheet to confirm receipt.",
      );

      setContactForm(INITIAL_FORM);
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setMessageType("error");
      setFormMessage("Unable to send your request. Please try again.");
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
          </aside>

          {/* Contact form */}
          <section className="min-w-0 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_45px_rgba(23,23,23,0.06)] sm:p-8 lg:p-9">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Company name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Company Name <span className="text-orange-500">*</span>
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="organization"
                  placeholder="Enter your company name"
                  value={contactForm.companyName}
                  onChange={handleFormChange}
                  className={inputClassName}
                />
              </div>

              {/* Company email */}
              <div>
                <label
                  htmlFor="companyEmail"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Company Email <span className="text-orange-500">*</span>
                </label>

                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={contactForm.companyEmail}
                  onChange={handleFormChange}
                  className={inputClassName}
                />
              </div>

              {/* Service selection */}
              <div>
                <label
                  htmlFor="ServiceSelection"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Service Selection <span className="text-orange-500">*</span>
                </label>

                <select
                  id="ServiceSelection"
                  name="ServiceSelection"
                  required
                  value={contactForm.ServiceSelection}
                  onChange={handleFormChange}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="AI Based CRM">AI Based CRM</option>
                  <option value="AI Agent CRM">AI Agent CRM</option>
                  <option value="Custom CRM">Custom CRM</option>
                </select>
              </div>
              {/* Choose your plan */}
              <div>
                <label
                  htmlFor="ChooseYourPlan"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Choose Your Plan <span className="text-orange-500">*</span>
                </label>

                <select
                  id="ChooseYourPlan"
                  name="ChooseYourPlan"
                  required
                  value={contactForm.ChooseYourPlan}
                  onChange={handleFormChange}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Custom Agent">Custom Agent</option>
                </select>
              </div>

              {/* Budget range */}
              <div>
                <label
                  htmlFor="BudgetRange"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Budget Range <span className="text-orange-500">*</span>
                </label>

                <input
                  id="BudgetRange"
                  name="BudgetRange"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="Enter your budget range"
                  value={contactForm.BudgetRange}
                  onChange={handleFormChange}
                  className={inputClassName}
                />
              </div>

              {/* Contact number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Contact Number <span className="text-orange-500">*</span>
                </label>

                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={contactForm.contactNumber}
                  onChange={handleFormChange}
                  className={inputClassName}
                />
              </div>

              {/* Project description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-[#333333]"
                >
                  Project Description <span className="text-orange-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  placeholder="Describe your project, goals, or requirements..."
                  value={contactForm.description}
                  onChange={handleFormChange}
                  className={`${inputClassName} min-h-32 resize-y leading-6`}
                />

                <p className="mt-2 text-right text-xs text-[#6B7280]">
                  {contactForm.description.length}/2000 characters
                </p>
              </div>

              {/* Submission status */}
              {formMessage && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`
                    rounded-xl border px-4 py-3 text-sm leading-6
                    ${
                      messageType === "success"
                        ? "border-amber-200 bg-amber-50 text-amber-800"
                        : "border-red-200 bg-red-50 text-red-700"
                    }
                  `}
                >
                  {formMessage}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  flex w-full items-center justify-center
                  rounded-xl bg-gradient-to-r from-orange-400 to-amber-300
                  px-5 py-3.5 text-sm font-semibold text-[#17181C]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_24px_rgba(249,115,22,0.20)]
                  active:translate-y-0
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-orange-400 focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-60
                "
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
