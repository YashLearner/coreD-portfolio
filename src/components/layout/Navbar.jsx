import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const HOME_BG = "#050505";
const PAGE_BG = "#f9f8f4";

const navigation = [
  { label: "Home", path: "/", end: true },
  { label: "Services", path: "/services", end: true },
  { label: "See Our Work", path: "/see-our-work" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  // Home is dark; all other routes use the light page theme.
  const isHome = location.pathname === "/";
  const pageBackground = isHome ? HOME_BG : PAGE_BG;

  // Desktop navigation styles.
  const navLinkClass = ({ isActive }) =>
    [
      "relative inline-flex items-center rounded-full px-3.5 py-2.5",
      "text-[13px] font-medium tracking-wide",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-orange-400",
      isHome
        ? isActive
          ? "bg-white/[0.08] text-orange-400"
          : "text-white/70 hover:bg-white/[0.05] hover:text-white"
        : isActive
          ? "bg-black/[0.05] text-orange-600"
          : "text-black/70 hover:bg-black/[0.04] hover:text-black",
    ].join(" ");

  // Mobile navigation styles.
  const mobileLinkClass = ({ isActive }) =>
    [
      "flex w-full items-center justify-between rounded-xl px-4 py-3.5",
      "text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-orange-400",
      isHome
        ? isActive
          ? "bg-orange-400/10 text-orange-400"
          : "text-white/75 hover:bg-white/[0.05] hover:text-white"
        : isActive
          ? "bg-orange-500/10 text-orange-700"
          : "text-black/75 hover:bg-black/[0.04] hover:text-black",
    ].join(" ");

  // Mobile menu button styles.
  const menuButtonClass = `
    grid h-10 w-10 shrink-0 place-items-center rounded-full
    border transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-orange-400 lg:hidden
    ${
      isHome
        ? "border-white/10 bg-white/[0.03] text-white hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-400"
        : "border-black/10 bg-black/[0.02] text-black hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-700"
    }
  `;

  // Close mobile navigation whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile navigation when Escape is pressed.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavigation = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =============================================================== */}
      {/* FIXED NAVBAR                                                    */}
      {/* =============================================================== */}

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav
          aria-label="Main navigation"
          style={{ backgroundColor: pageBackground }}
          className={`
            relative mx-auto flex max-w-7xl
            items-center justify-between gap-3
            rounded-full border px-3 py-2.5
            sm:px-5 sm:py-3
            transition-colors duration-200
            ${
              isHome
                ? "border-white/10 text-white"
                : "border-transparent text-black"
            }
          `}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="CoreDhristi home"
            onClick={handleNavigation}
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
                ${isHome ? "" : "brightness-0"}
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

          {/* Desktop Reach Us Out + mobile menu button */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/contact"
              onClick={handleNavigation}
              className="
                group hidden items-center gap-2
                rounded-full border border-orange-400/40
                bg-gradient-to-r from-orange-400 to-amber-300
                px-4 py-2.5 text-[13px] font-semibold text-black
                transition-all duration-200
                hover:-translate-y-0.5 hover:border-orange-300
                hover:shadow-[0_0_24px_rgba(249,115,22,0.18)]
                active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-orange-400
                sm:inline-flex sm:px-5
              "
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
            </Link>

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

        {/* =============================================================== */}
        {/* MOBILE NAVIGATION                                              */}
        {/* =============================================================== */}

        <div
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          style={{ backgroundColor: pageBackground }}
          className={`
            mx-auto mt-3 max-w-7xl overflow-hidden
            rounded-2xl border
            transition-all duration-200
            lg:hidden
            ${
              isHome
                ? "border-white/10 text-white"
                : "border-black/10 text-black"
            }
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
                  ${isHome ? "text-white/40" : "text-black/45"}
                `}
              >
                Navigation
              </span>

              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-orange-400"
              />
            </div>

            <div className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={handleNavigation}
                  className={mobileLinkClass}
                >
                  {item.label}

                  <ArrowUpRight size={15} aria-hidden="true" />
                </NavLink>
              ))}
            </div>

            {/* Mobile Reach Us Out */}
            <Link
              to="/contact"
              onClick={handleNavigation}
              tabIndex={menuOpen ? 0 : -1}
              className="
                mt-3 flex w-full items-center justify-center gap-2
                rounded-xl bg-gradient-to-r
                from-orange-400 to-amber-300
                px-4 py-3.5 text-sm font-semibold text-black
                transition-all duration-200
                hover:brightness-105
                active:scale-[0.99]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-orange-400
                sm:hidden
              "
            >
              Reach Us Out
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
