import { Link } from "react-router-dom";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";

import {
  brand,
  navLinks,
  socialLinks,
  footerCopy,
} from "../../data/PortfolioData";

const SupportEmail = "coredhristi@gmail.com"



export default function Footer() {

 
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#121214] px-4 pb-8 pt-16 text-zinc-400 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand information */}
          <div className="flex flex-col items-start lg:col-span-5">
            <Link
              to={brand.href}
              className="group flex items-center gap-2.5 rounded-lg py-1 text-lg font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span className="flex h-full w-full items-center object-cover justify-center rounded-lg text-amber-500 transition-colors group-hover:bg-amber-500/10">
                <img
                  src="/Images/coreD.svg"
                  alt="CRM Logo"
                  width={28}
                  height={28}
                  className="w-20 h-10 object-contain"
                />
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              {footerCopy.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col lg:col-span-4">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-200">
              {footerCopy.navigationTitle}
            </h2>

            <ul className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-block rounded-sm py-0.5 transition-colors hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect with us */}
          <div className=" ml-10 flex flex-col lg:col-span-3 items-start gap-3 ">
            <h2 className="ml-5 text-xs font-bold uppercase tracking-wider text-zinc-200 text-left  ">
              {footerCopy.connectTitle}
            </h2>

            <div className="flex flex-center gap-3">
              <span className="flex items-center justify-center gap-3 p-2  text-white rounded-lg shadow-sm w-fit self-start mr-auto w-fit-left">
                {socialLinks
                  .filter((item) => item.platform !== "Gmail")
                  .map((item) => (
                    <a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex items-center justify-center p-2 text-[#dfd7d7] rounded-lg transition-all  hover:text-amber-400"
                    >
                      {item.platform === "GitHub" && (
                        <GithubLogoIcon size={28} />
                      )}
                      {item.platform === "LinkedIn" && (
                        <LinkedinLogoIcon size={28} />
                      )}
                    </a>
                  ))}

                <a
                  href={`mailto:${SupportEmail}`}
                  aria-label={socialLinks[2]?.label || "Contact CoreD on gmail"}
                  className="inline-flex items-center justify-center p-2 text-[#dfd7d7] rounded-lg transition-all  hover:text-amber-400"
                >
                  <EnvelopeSimpleIcon size={28} />
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Copyright and back to top */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
          <p>{footerCopy.copyrightNotice}</p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={footerCopy.backToTop}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300 transition-all hover:border-amber-500/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            <span>{footerCopy.backToTop}</span>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
