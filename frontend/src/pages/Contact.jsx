
import { useEffect, useRef, useState } from "react";

import { currencies } from "countries-list/currencies";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import {
  termsSections,
  privacyPolicy,
} from "../data/PortfolioData.js";

// const SCRIPT_URL = import.meta.env.VITE_QUOTATION_FORM_SCRIPT_URL;

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwAd_rHgOY5MhU6cYI8uOEpNYtKVcSVuP6nji7f_ZWkIxBfibp5W_-ThK2tDgJ_emQPZA/exec";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Spam protection settings
const MIN_FILL_MS = 3000;
const MAX_LINKS = 2;

// Automatically load all available currencies
const currencyOptions = Object.entries(currencies).sort(
  ([, a], [, b]) => a.name.localeCompare(b.name)
);

const inputClassName = `
  w-full rounded-xl border border-black/10 bg-white
  px-4 py-3 text-sm text-[#17181C] outline-none transition-all duration-200
  placeholder:text-[#9CA3AF] hover:border-black/20
  focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10
`;

const labelClassName = "mb-2 block text-sm font-medium text-[#333333]";

const SUCCESS_TEXT =
  "Thank you! Your request was submitted. Our team will contact you soon.";

const FIXED_PLAN_BUDGETS = {
  Basic: "300 USD",
  Standard: "700 USD",
};

export default function Contact() {
  const formRef = useRef(null);
  const startedAt = useRef(Date.now());

  // Cloudflare Turnstile refs
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);

  // Plan and budget states
  const [selectedPlan, setSelectedPlan] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("USD");
  const [customBudget, setCustomBudget] = useState("");

  // International phone state
  const [phone, setPhone] = useState("");

  // CAPTCHA states
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaLoadError, setCaptchaLoadError] = useState("");

  // Terms and Privacy modal state
  const [activePolicy, setActivePolicy] = useState(null);

  // Load and render Cloudflare Turnstile
  useEffect(() => {
    let cancelled = false;

    if (!TURNSTILE_SITE_KEY) {
      setCaptchaLoadError(
        "Security verification is not configured. Please try again later."
      );
      return;
    }

    const renderTurnstile = () => {
      if (
        cancelled ||
        !turnstileContainerRef.current ||
        !window.turnstile ||
        turnstileWidgetId.current !== null
      ) {
        return;
      }

      try {
        turnstileWidgetId.current = window.turnstile.render(
          turnstileContainerRef.current,
          {
            sitekey: TURNSTILE_SITE_KEY,
            theme: "light",
            size: "flexible",

            callback: (token) => {
              setTurnstileToken(token);
              setCaptchaReady(true);
              setCaptchaLoadError("");
            },

            "expired-callback": () => {
              setTurnstileToken("");
              setCaptchaLoadError(
                "CAPTCHA verification expired. Please verify again."
              );
            },

            "error-callback": () => {
              setTurnstileToken("");
              setCaptchaLoadError(
                "CAPTCHA verification failed. Please try again."
              );
            },

            "timeout-callback": () => {
              setTurnstileToken("");
              setCaptchaLoadError(
                "CAPTCHA verification timed out. Please try again."
              );
            },
          }
        );

        setCaptchaReady(true);
        setCaptchaLoadError("");
      } catch (error) {
        console.error("Turnstile rendering failed:", error);

        setCaptchaLoadError(
          "Unable to load security verification. Please refresh the page."
        );
      }
    };

    let script = document.querySelector(
      'script[data-turnstile-script="true"]'
    );

    const handleScriptLoad = () => {
      renderTurnstile();
    };

    const handleScriptError = () => {
      if (!cancelled) {
        setCaptchaLoadError(
          "Unable to load CAPTCHA. Please check your internet connection."
        );
      }
    };

    if (window.turnstile) {
      renderTurnstile();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.dataset.turnstileScript = "true";

        script.addEventListener("load", handleScriptLoad);
        script.addEventListener("error", handleScriptError);

        document.head.appendChild(script);
      } else {
        script.addEventListener("load", handleScriptLoad);
        script.addEventListener("error", handleScriptError);
      }
    }

    return () => {
      cancelled = true;

      if (script) {
        script.removeEventListener("load", handleScriptLoad);
        script.removeEventListener("error", handleScriptError);
      }

      if (
        turnstileWidgetId.current !== null &&
        window.turnstile?.remove
      ) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  // Lock background scrolling and support Escape key while a policy is open
  useEffect(() => {
    if (!activePolicy) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePolicy(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePolicy]);

  const showError = (text) => {
    setStatus({ type: "error", text });
  };

  const resetTurnstile = () => {
    setTurnstileToken("");
    setCaptchaLoadError("");

    if (
      turnstileWidgetId.current !== null &&
      window.turnstile?.reset
    ) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  };

  const showSuccess = () => {
    setStatus({ type: "success", text: SUCCESS_TEXT });

    formRef.current?.reset();

    // Reset controlled fields
    setSelectedPlan("");
    setBudgetCurrency("USD");
    setCustomBudget("");
    setPhone("");
    setDescriptionLength(0);

    // Reset CAPTCHA
    resetTurnstile();

    startedAt.current = Date.now();
  };

  const handleChange = () => {
    // Remove previous success/error message when user edits the form
    if (status) setStatus(null);
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
    setCustomBudget("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const get = (key) => String(formData.get(key) ?? "").trim();

    // 1. Honeypot protection
    if (get("Website") !== "") {
      showSuccess();
      return;
    }

    // 2. Minimum form filling time
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      showError("Please review your details and submit again.");
      return;
    }

    // 3. Terms and Privacy consent validation
    if (get("TermsAccepted") !== "yes") {
      showError("Please accept the Terms & Conditions.");
      return;
    }

    if (get("PrivacyAccepted") !== "yes") {
      showError("Please accept the Privacy Policy.");
      return;
    }

    // 4. CAPTCHA validation
    if (!TURNSTILE_SITE_KEY) {
      showError("Security verification is currently unavailable.");
      return;
    }

    if (!turnstileToken) {
      showError("Please complete the CAPTCHA verification.");
      return;
    }

    // 5. Form validation
    const email = get("CompanyEmail");
    const contactNumber = get("ContactNumber");
    const description = get("ProjectDescription");
    const budgetRange = get("BudgetRange");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Basic international phone number sanity check
    const phoneDigits = contactNumber.replace(/\D/g, "");

    if (
      !contactNumber.startsWith("+") ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      showError("Please enter a valid contact number.");
      return;
    }

    // Validate budget according to selected plan
    if (!budgetRange) {
      showError("Please select a plan and enter your budget.");
      return;
    }

    if (selectedPlan === "Custom Solution") {
      if (
        !Number.isFinite(Number(customBudget)) ||
        Number(customBudget) <= 0
      ) {
        showError("Please enter a valid budget amount.");
        return;
      }
    }

    // 6. Description link spam protection
    const linkCount = (
      description.match(/https?:\/\/|www\./gi) || []
    ).length;

    if (linkCount > MAX_LINKS) {
      showError("Please remove extra links from the description.");
      return;
    }

    // 7. Prepare form data for Google Apps Script
    const body = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (key === "Website") continue;

      body.append(key, String(value).trim());
    }

    // Send the Cloudflare Turnstile token to the backend
    body.set("turnstileToken", turnstileToken);

    setIsSubmitting(true);
    setStatus(null);

    try {


      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body,
      });

      const responseText = await response.text();

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        // Support the previous plain-text Apps Script response
        if (
          response.ok &&
          responseText.trim() === "Success: Data added to Google Sheet"
        ) {
          showSuccess();
          return;
        }

        throw new Error("Unexpected response from server.");
      }

      if (!response.ok || result?.success !== true) {
        const captchaMessages = [
          "CAPTCHA verification required.",
          "CAPTCHA verification failed. Please try again.",
        ];

        const serverMessage = captchaMessages.includes(result?.message)
          ? result.message
          : "Unable to send your request. Please try again.";

        throw new Error(serverMessage);
      }

      showSuccess();



    } catch (error) {
      console.error("Contact form submission failed:", error);

      showError(
        error.message?.startsWith("CAPTCHA")
          ? error.message
          : "Unable to send your request. Please try again."
      );

      // Turnstile tokens are single-use, so reset after a failed attempt
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  const activePolicyTitle =
    activePolicy === "terms"
      ? "Terms & Conditions"
      : "Privacy Policy";

  const activePolicySections =
    activePolicy === "terms"
      ? termsSections
      : privacyPolicy;

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
                For business related query:{" "}
                <a
                  href="mailto:info@coredhristi.com"
                  className="font-semibold text-orange-400 transition-colors hover:underline"
                >
                  info@coredhristi.com
                </a>
              </p>

              <p className="text-xs text-slate-300">
                Contact HR:{" "}
                <a
                  href="mailto:carrers@cored.com"
                  className="font-semibold text-orange-400 transition-colors hover:underline"
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
                  <option value="AI Agent CRM">AI Agent Development</option>
                  <option value="Custom CRM">Consultancy</option>
                  <option value="ERP Solution">ERP Solution</option>
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
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a plan
                  </option>

                  <option value="Basic">Basic</option>

                  <option value="Standard">Standard</option>

                  <option value="Custom Solution">Custom Solution</option>
                </select>
              </div>

              {/* Budget Range */}

              {/* Basic Plan: Fixed $300 */}
              {selectedPlan === "Basic" && (
                <input
                  type="hidden"
                  name="BudgetRange"
                  value={FIXED_PLAN_BUDGETS.Basic}
                />
              )}

              {/* Standard Plan: Fixed $700 */}
              {selectedPlan === "Standard" && (
                <input
                  type="hidden"
                  name="BudgetRange"
                  value={FIXED_PLAN_BUDGETS.Standard}
                />
              )}

              {/* Custom Solution: Currency + Amount */}
              {selectedPlan === "Custom Solution" && (
                <div>
                  <label htmlFor="CustomBudget" className={labelClassName}>
                    Budget Range <span className="text-orange-500">*</span>
                  </label>

                  <div
                    className="
                      flex w-full items-center overflow-hidden rounded-xl border border-black/10 bg-white
                      transition-all duration-200 hover:border-black/20
                      focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-400/10"
                  >
                    {/* Currency dropdown */}
                    <select
                      aria-label="Select budget currency"
                      value={budgetCurrency}
                      onChange={(e) => setBudgetCurrency(e.target.value)}
                      className="
                        w-[125px] shrink-0 cursor-pointer border-0 bg-transparent py-3 pl-3 pr-1
                        text-sm text-[#17181C] outline-none focus:ring-0 sm:w-[155px] sm:pl-4
                      "
                    >
                      {currencyOptions.map(([code, currency]) => (
                        <option key={code} value={code}>
                          {code} ({currency.symbol || code})
                        </option>
                      ))}
                    </select>

                    {/* Vertical separator */}
                    <span
                      aria-hidden="true"
                      className="h-7 w-px shrink-0 bg-black/10"
                    />

                    {/* Budget amount */}
                    <input
                      id="CustomBudget"
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      placeholder="Enter your budget"
                      className="
                        min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm text-[#17181C]
                        outline-none focus:ring-0 placeholder:text-[#9CA3AF]"
                    />

                    {/* Combined value for Google Sheets */}
                    <input
                      type="hidden"
                      name="BudgetRange"
                      value={
                        customBudget
                          ? `${customBudget} ${budgetCurrency}`
                          : ""
                      }
                    />
                  </div>
                </div>
              )}

              {/* Contact number */}
              <div>
                <label htmlFor="ContactNumber" className={labelClassName}>
                  Contact Number <span className="text-orange-500">*</span>
                </label>

                <PhoneInput
                  defaultCountry="in"
                  value={phone}
                  onChange={setPhone}
                  name="ContactNumber"
                  required
                  autoComplete="tel"
                  placeholder="Enter phone number"
                  preferredCountries={["in", "ae", "us", "gb"]}
                  className="w-full rounded-xl border border-black/10 bg-whitetransition-all duration-200 hover:border-black/20 
                            focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-400/10"
                  inputClassName="
                    !h-12 !w-full !border-0 !bg-transparent
                    !px-3 !text-sm !text-[#17181C]
                    !shadow-none !outline-none
                    focus:!border-0 focus:!ring-0
                    placeholder:!text-[#9CA3AF]
                  "
                  style={{
                    "--react-international-phone-height": "48px",
                    "--react-international-phone-background-color": "#ffffff",
                    "--react-international-phone-text-color": "#17181C",
                    "--react-international-phone-font-size": "14px",
                    "--react-international-phone-border-radius": "12px",
                    "--react-international-phone-border-color": "rgba(0,0,0,0.1)",
                  }}
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
                  maxLength={5000}
                  rows={4}
                  placeholder="Describe your project, goals, or requirements..."
                  onChange={(e) =>
                    setDescriptionLength(e.target.value.length)
                  }
                  className={`${inputClassName} min-h-32 resize-y leading-6`}
                />

                <p className="mt-2 text-right text-xs text-[#6B7280]">
                  {descriptionLength}/5000 characters
                </p>
              </div>

              {/* Cloudflare Turnstile CAPTCHA */}
              <div className="rounded-xl border border-black/10 bg-[#FAF7F1]/50 p-4">
                <p className="mb-3 text-sm font-medium text-[#333333]">
                  Security Verification{" "}
                  <span className="text-orange-500">*</span>
                </p>

                <div
                  ref={turnstileContainerRef}
                  className="min-h-[65px] w-full"
                  aria-label="Cloudflare CAPTCHA verification"
                />

                {!captchaReady && !captchaLoadError && (
                  <p className="mt-2 text-xs text-[#6B7280]">
                    Loading security verification...
                  </p>
                )}

                {captchaLoadError && (
                  <p
                    role="alert"
                    className="mt-2 text-xs leading-5 text-red-600"
                  >
                    {captchaLoadError}
                  </p>
                )}

                <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                  This verification helps protect the form against automated
                  submissions.
                </p>
              </div>

              {/* Terms & Conditions consent */}
              <div className="flex items-start gap-3">
                <input
                  id="TermsAccepted"
                  name="TermsAccepted"
                  type="checkbox"
                  value="yes"
                  required
                  className="
                    mt-1 h-4 w-4 shrink-0 cursor-pointer
                    rounded border-black/20 accent-orange-500
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-orange-400
                    focus-visible:ring-offset-2
                  "
                />

                <p className="text-sm leading-6 text-[#6B7280]">
                  <label
                    htmlFor="TermsAccepted"
                    className="cursor-pointer"
                  >
                    I have read and agree to the{" "}
                  </label>

                  <button
                    type="button"
                    onClick={() => setActivePolicy("terms")}
                    className="font-semibold text-orange-600 underline underline-offset-2 transition-colors hover:text-orange-700"
                  >
                    Terms & Conditions
                  </button>
                  .
                  <span className="ml-1 text-orange-500">*</span>
                </p>
              </div>

              {/* Privacy Policy consent */}
              <div className="flex items-start gap-3">
                <input
                  id="PrivacyAccepted"
                  name="PrivacyAccepted"
                  type="checkbox"
                  value="yes"
                  required
                  className="
                    mt-1 h-4 w-4 shrink-0 cursor-pointer
                    rounded border-black/20 accent-orange-500
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-orange-400
                    focus-visible:ring-offset-2
                  "
                />

                <p className="text-sm leading-6 text-[#6B7280]">
                  <label
                    htmlFor="PrivacyAccepted"
                    className="cursor-pointer"
                  >
                    I have read and agree to the{" "}
                  </label>

                  <button
                    type="button"
                    onClick={() => setActivePolicy("privacy")}
                    className="font-semibold text-orange-600 underline underline-offset-2 transition-colors hover:text-orange-700"
                  >
                    Privacy Policy
                  </button>
                  .
                  <span className="ml-1 text-orange-500">*</span>
                </p>
              </div>

              {/* Status message */}
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
                className="
                  flex w-full items-center justify-center
                  rounded-xl bg-gradient-to-r from-orange-400
                  to-amber-300 px-5 py-3.5 text-sm font-semibold
                  text-[#17181C] transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_24px_rgba(249,115,22,0.20)]
                  active:translate-y-0
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-orange-400
                  focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-60
                  disabled:hover:translate-y-0
                  disabled:hover:shadow-none sm:text-base
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

      {/* Terms & Conditions / Privacy Policy Modal */}
      {activePolicy && (
        <div
          className="
            fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActivePolicy(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            className="
              flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl
            "
          >
            {/* Modal header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/10 px-5 py-4 sm:px-7 sm:py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-600 sm:text-xs">
                  CoreDhristi
                </p>

                <h2
                  id="policy-modal-title"
                  className="mt-1 text-xl font-bold text-[#17181C] sm:text-2xl"
                >
                  {activePolicyTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label="Close policy"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 text-xl text-[#17181C]
                  transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                &times;
              </button>
            </div>

            {/* Modal content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-7">
              <div className="space-y-7">
                {activePolicySections.map((section, index) => {
                  const paragraphs = Array.isArray(section.paragraphs)
                    ? section.paragraphs
                    : section.paragraphs
                      ? [section.paragraphs]
                      : [];

                  return (
                    <section
                      key={`${section.title || "policy-section"}-${index}`}
                    >
                      <h3 className="text-base font-semibold text-[#17181C] sm:text-lg">
                        {section.title}
                      </h3>

                      <div className="mt-2 space-y-3 text-sm leading-7 text-[#6B7280] sm:text-[15px]">
                        {paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}

                        {section.contact && (
                          <p>
                            For questions or concerns, contact us at{" "}
                            <a
                              href="mailto:info@coredhristi.com"
                              className="font-semibold text-orange-600 underline underline-offset-2"
                            >
                              info@coredhristi.com
                            </a>
                            .
                          </p>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            {/* Modal footer */}
            <div className="shrink-0 border-t border-black/10 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="
                  w-full rounded-xl bg-[#17181C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
