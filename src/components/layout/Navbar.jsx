import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Menu,
  X,
  Send,
  Building2,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

const NAVBAR_BG = "#14161aeb";
const CONTACT_BG = "#0b0b0b";

const navigation = [
  { label: "Home", path: "/", end: true },
  { label: "Services", path: "/services", end: true },
  { label: "See Our Work", path: "/see-our-work" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
];

const initialFormData = {
  companyName: "",
  companyEmail: "",
  contactNumber: "",
  description: "",
};

const inputClassName = `
  w-full rounded-xl border border-white/10
  bg-white/[0.035] px-4 py-3
  text-sm text-white outline-none
  transition-all duration-200
  placeholder:text-white/30
  hover:border-white/20
  focus:border-orange-400/60
  focus:bg-white/[0.05]
  focus:ring-2 focus:ring-orange-400/10
`;

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState(initialFormData);
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const headerRef = useRef(null);
  const location = useLocation();

  // Navigation has its own dark surface, independent of the current page.

  // Keep navigation contrast consistent across routes.
  const navLinkClass = ({ isActive }) =>
    [
      "relative inline-flex items-center rounded-full px-3.5 py-2.5",
      "text-[13px] font-medium tracking-wide",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-orange-400",
      isActive
        ? "bg-white/[0.08] text-orange-400"
        : "text-white/70 hover:bg-white/[0.05] hover:text-white",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "flex w-full items-center justify-between rounded-xl px-4 py-3.5",
      "text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-orange-400",
      isActive
        ? "bg-orange-400/10 text-orange-400"
        : "text-white/75 hover:bg-white/[0.05] hover:text-white",
    ].join(" ");

  const menuButtonClass = `
    grid h-10 w-10 shrink-0 place-items-center rounded-full
    border transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-orange-400 lg:hidden
    border-white/10 bg-white/[0.03] text-white
    hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-400
  `;

  // Close the mobile menu after navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menus and modal when Escape is pressed.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setContactOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scrolling while the contact modal is open.
  useEffect(() => {
    if (!contactOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [contactOpen]);

  const openContactForm = () => {
    setMenuOpen(false);
    setFormMessage("");
    setMessageType("error");
    setContactOpen(true);
  };

  const closeContactForm = () => {
    setContactOpen(false);
    setFormMessage("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormMessage("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const companyName = contactForm.companyName.trim();
    const companyEmail = contactForm.companyEmail.trim();
    const contactNumber = contactForm.contactNumber.trim();
    const description = contactForm.description.trim();

    if (!companyName || !companyEmail || !contactNumber || !description) {
      setMessageType("error");
      setFormMessage("Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail)) {
      setMessageType("error");
      setFormMessage("Please enter a valid company email.");
      return;
    }

    if (!/^\+?[0-9\s()-]{7,20}$/.test(contactNumber)) {
      setMessageType("error");
      setFormMessage("Please enter a valid contact number.");
      return;
    }

    if (description.length < 10) {
      setMessageType("error");
      setFormMessage("Please describe your project in at least 10 characters.");
      return;
    }

    // Frontend validation only. Connect your backend/API to submit the form.
    setMessageType("success");
    setFormMessage(
      "Your form is valid. Connect the backend to send your request.",
    );
  };

  return (
    <>
      {/* ================================================================== */}
      {/* FIXED NAVBAR                                                       */}
      {/* ================================================================== */}

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
      >
        <nav
          aria-label="Main navigation"
          style={{ backgroundColor: NAVBAR_BG }}
          className={`
            relative mx-auto flex max-w-7xl
            items-center justify-between gap-3
            rounded-full border px-3 py-2.5
            sm:px-5 sm:py-3
            transition-colors duration-200
            border-white/10 text-white
          `}
        >
          {/* Ambient glow div intentionally removed. */}

          {/* Logo */}
          <Link
            to="/"
            aria-label="CoreDhristi home"
            className="group flex shrink-0 items-center"
          >
            <img
              src="https://www.coredhristi.com/coredhristi-logo-light.png"
              alt="CoreDhristi"
              className={`
                h-8 w-auto max-w-[112px] object-contain
                transition-opacity duration-200
                group-hover:opacity-80
                sm:h-9 sm:max-w-[140px]
              `}
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Contact action and mobile menu */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openContactForm}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-gradient-to-r from-orange-400 to-amber-300 px-4 py-2.5 sm:px-5 text-[13px] font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.18)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Reach Us Out
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="
                  transition-transform duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className={menuButtonClass}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* ================================================================== */}
        {/* MOBILE NAVIGATION                                                 */}
        {/* ================================================================== */}

        <div
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          style={{ backgroundColor: NAVBAR_BG }}
          className={`
            mx-auto mt-3 max-w-7xl overflow-hidden
            rounded-2xl border
            transition-all duration-200
            lg:hidden
            border-white/10 text-white
            ${
              menuOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible pointer-events-none -translate-y-2 opacity-0"
            }
          `}
        >
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between px-4 py-2">
              <span
                className={`
                  text-[10px] font-semibold uppercase tracking-[0.24em]
                  text-white/40
                `}
              >
                Navigation
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            </div>

            <div className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  tabIndex={menuOpen ? 0 : -1}
                  className={mobileLinkClass}
                >
                  {item.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </NavLink>
              ))}
            </div>

            {/* Mobile contact action */}
            <button
              type="button"
              onClick={openContactForm}
              tabIndex={menuOpen ? 0 : -1}
              className="
                mt-3 flex w-full items-center justify-center gap-2
                rounded-xl bg-gradient-to-r from-orange-400 to-amber-300
                px-4 py-3.5 text-sm font-semibold text-black
                transition-all duration-200
                hover:brightness-105
                active:scale-[0.99]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-orange-400 sm:hidden
              "
            >
              Reach Us Out
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* CONTACT MODAL                                                      */}
      {/* Modal deliberately keeps its dark theme on every page.              */}
      {/* ================================================================== */}

      {contactOpen && (
        <div
          className="
      fixed inset-0 z-[100]
      flex items-center justify-center
      overflow-y-auto bg-black/60
      p-3 backdrop-blur-md sm:p-6
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeContactForm();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            style={{ backgroundColor: CONTACT_BG }}
            className="
        relative my-auto w-full max-w-xl
        overflow-hidden rounded-3xl
        !bg-white text-[#17181C]
        border border-black/[0.08]
        shadow-[0_25px_80px_rgba(15,23,42,0.18)]
      "
          >
            {/* Subtle orange accent */}
            <div
              aria-hidden="true"
              className="
          absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent
          via-orange-400/80 to-transparent
        "
            />

            <div
              className="
          max-h-[90dvh] overflow-y-auto p-5 sm:p-8
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
            >
              {/* Modal heading */}
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span
                    className="
                text-[10px] font-bold uppercase
                tracking-[0.18em] text-orange-600 sm:text-[11px]
              "
                  >
                    Contact CoreDhristi
                  </span>

                  <h2
                    id="contact-modal-title"
                    className="
                mt-2 text-2xl font-semibold tracking-tight
                text-[#17181C] sm:text-3xl
              "
                  >
                    Let's talk about your{" "}
                    <span className="text-orange-500">project.</span>
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
                    Tell us about your business and requirements. Our team can
                    help you find the right solution.
                  </p>
                </div>

                {/* Minimal close button without icon */}
                <button
                  type="button"
                  onClick={closeContactForm}
                  aria-label="Close contact form"
                  className="
              grid h-9 w-9 shrink-0 place-items-center
              rounded-full border border-black/10
              bg-white text-[#555] text-2xl font-light
              leading-none transition-colors
              hover:border-orange-400/50
              hover:bg-orange-50 hover:text-orange-600
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-orange-400
            "
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              {/* Contact form */}
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
                    className={`
                ${inputClassName}
                !w-full !rounded-xl !border-black/10 !bg-white
                !px-4 !py-3 !text-sm !text-[#17181C]
                placeholder:!text-[#9CA3AF]
                focus:!border-orange-400
                focus:!ring-4 focus:!ring-orange-400/10
              `}
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
                    className={`
                ${inputClassName}
                !w-full !rounded-xl !border-black/10 !bg-white
                !px-4 !py-3 !text-sm !text-[#17181C]
                placeholder:!text-[#9CA3AF]
                focus:!border-orange-400
                focus:!ring-4 focus:!ring-orange-400/10
              `}
                  />
                </div>

                {/* Service selection */}

                {/* Service selection */}
                <div>
                  <label
                    htmlFor="serviceSelection"
                    className="mb-2 block text-sm font-medium text-[#333333]"
                  >
                    Service Selection <span className="text-orange-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="serviceSelection"
                      name="ServiceSelection"
                      required
                      value={contactForm.ServiceSelection}
                      onChange={handleFormChange}
                      className={`
                          ${inputClassName}
                          !w-full !appearance-none !rounded-xl
                          !border-black/10 !bg-white
                          !px-4 !py-3 !pr-10
                          !text-sm !text-[#17181C]
                          focus:!border-orange-400
                          focus:!ring-4 focus:!ring-orange-400/10
                          cursor-pointer
                        `}
                    >
                      <option value="AI Based CRM">AI Based CRM</option>

                      <option value="AI Agent CRM">AI Agent CRM</option>

                      <option value="Custom CRM">Custom CRM</option>
                    </select>

                    {/* Dropdown arrow */}
                    <span
                      aria-hidden="true"
                      className="
        pointer-events-none absolute right-4 top-1/2
        -translate-y-1/2 text-sm text-[#6B7280]
      "
                    >
                      ▾
                    </span>
                  </div>
                </div>

                {/* Choose Your Plan  */}
                <div>
                  <label
                    htmlFor="serviceSelection"
                    className="mb-2 block text-sm font-medium text-[#333333]"
                  >
                    Choose Your Plan <span className="text-orange-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="ChooseYourPlan"
                      name="Choose Your Plan"
                      required
                      value={contactForm.ChooseYourPlan}
                      onChange={handleFormChange}
                      className={`
                          ${inputClassName}
                          !w-full !appearance-none !rounded-xl
                          !border-black/10 !bg-white
                          !px-4 !py-3 !pr-10
                          !text-sm !text-[#17181C]
                          focus:!border-orange-400
                          focus:!ring-4 focus:!ring-orange-400/10
                          cursor-pointer
                        `}
                    >
                      <option value="AI Based CRM">Basic</option>

                      <option value="AI Agent CRM">Standard</option>

                      <option value="Custom CRM">Custom Agent</option>
                    </select>

                    {/* Dropdown arrow */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]"
                    >
                      ▾
                    </span>
                  </div>
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
                    className={`
                ${inputClassName}
                !w-full !rounded-xl !border-black/10 !bg-white
                !px-4 !py-3 !text-sm !text-[#17181C]
                placeholder:!text-[#9CA3AF]
                focus:!border-orange-400
                focus:!ring-4 focus:!ring-orange-400/10
              `}
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
                    className={`
                ${inputClassName}
                !w-full !rounded-xl !border-black/10 !bg-white
                !px-4 !py-3 !text-sm !text-[#17181C]
                placeholder:!text-[#9CA3AF]
                focus:!border-orange-400
                focus:!ring-4 focus:!ring-orange-400/10
              `}
                  />
                </div>

                {/* Project description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-[#333333]"
                  >
                    Project Description{" "}
                    <span className="text-orange-500">*</span>
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
                    className={`
                ${inputClassName}
                !min-h-32 !w-full !resize-y !rounded-xl
                !border-black/10 !bg-white
                !px-4 !py-3 !text-sm !leading-6 !text-[#17181C]
                placeholder:!text-[#9CA3AF]
                focus:!border-orange-400
                focus:!ring-4 focus:!ring-orange-400/10
              `}
                  />

                  <p className="mt-2 text-right text-xs text-[#6B7280]">
                    {contactForm.description.length}/2000 characters
                  </p>
                </div>

                {/* Form validation message */}
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

                {/* Submit button without icon */}
                <button
                  type="submit"
                  className="
              flex w-full items-center justify-center
              rounded-xl bg-gradient-to-r
              from-orange-400 to-amber-300
              px-5 py-3.5 text-sm font-semibold text-[#17181C]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(249,115,22,0.20)]
              active:translate-y-0
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-orange-400
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white
            "
                >
                  Submit Request
                </button>

                <p className="text-center text-xs leading-5 text-[#6B7280]">
                  Share your requirements with the CoreDhristi team.
                </p>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
