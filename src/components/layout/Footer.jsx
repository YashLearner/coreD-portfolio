import { Link } from "react-router-dom";

import {
  brand,
  navLinks,
  socialLinks,
  footerCopy,

} from "../../data/PortfolioData";

export default function Footer() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
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
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-amber-500 transition-colors group-hover:bg-amber-500/10">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-45"
                  aria-hidden="true"
                >
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                </svg>
              </span>

              <span>{brand.name}</span>
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

            <ul className="grid grid-cols-2 gap-3 text-sm">
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
          <div className="flex flex-col lg:col-span-3">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-200">
              {footerCopy.connectTitle}
            </h2>

            <div className="flex flex-col gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-amber-500/40 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                >
                  <span>{item.platform}</span>

                  <span
                    aria-hidden="true"
                    className="text-zinc-500 transition-all group-hover:translate-x-0.5 group-hover:text-amber-400"
                  >
                    ↗
                  </span>
                </a>
              ))}
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




