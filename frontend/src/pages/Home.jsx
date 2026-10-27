import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CompanyLogoSection from "../components/CompanyLogoSection.jsx";
import CrmWorkflowSection from "../components/home/CrmWorkflowSection.jsx";
import CrmImportanceSection from "../components/home/CrmImportanceSection.jsx";
import FlagshipCrmSection from "../components/home/FlagshipCrmSection.jsx";
import PortfolioSection from "../components/home/PortfolioSection.jsx";
import TestimonialsSection from "../components/services/TestimonialsSection.jsx";
import "../components/home/HomeContinuation.css";
import "./Home.css";

function FloatingLabel({
  children,
  className = "",
  dotClassName = "bg-amber-400 ring-amber-400/20",
}) {
  return (
    <div
      className={`pointer-events-none absolute vh-100-full z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#151515]/95 px-3.5 py-2 text-[11px] font-semibold text-zinc-200 shadow-lg backdrop-blur-md lg:flex ${className}`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ring-4 ${dotClassName}`}
      />
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="home-hero"
      className="home-hero relative isolate overflow-hidden border-b border-white/10 bg-black text-white"
    >
      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />

      <div className="home-hero-content mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="home-hero-copy">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-300 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-amber-400" />
            </span>
            CoreD · AI Agent-Based CRM
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(2.8rem,7.5vw,6.8rem)] font-black leading-[0.98] tracking-[-0.065em] text-white">
            Your business.
            <span className="mt-2 block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text pb-2 text-transparent">
              Powered by AI.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8 lg:text-lg">
            Meet CoreD the intelligent CRM that helps your team capture leads,
            automate follow ups, and build stronger customer relationships with
            AI agents.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
            <Link
              to="/reach-us"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/case-studies"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/30 hover:bg-white/[0.08]"
            >
              Explore our work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {/* Dashboard preview */}
        <div className="home-hero-dashboard relative mx-auto w-full max-w-[1200px]">
          <FloatingLabel className="left-[2%] top-[16%]">
            AI lead scoring
          </FloatingLabel>

          <FloatingLabel
            dotClassName="bg-sky-400 ring-sky-400/20"
            className="right-[3%] top-[16%]"
          >
            Smart follow-ups
          </FloatingLabel>

          <FloatingLabel
            dotClassName="bg-amber-400 ring-amber-400/20"
            className="-left-[1%] top-[55%]"
          >
            Sales pipeline
          </FloatingLabel>

          <FloatingLabel
            dotClassName="bg-emerald-400 ring-emerald-400/20"
            className="-right-[1%] top-[55%]"
          >
            Team insights
          </FloatingLabel>

          <div className="relative overflow-hidden rounded-t-2xl border border-white/15 border-b-0 bg-black sm:rounded-t-3xl">
              <img
                src={"/Images/Hero.png"}
                alt="CoreD AI CRM dashboard"
                className="block h-auto w-full select-none object-contain"
                draggable={false}
                loading="eager"
                decoding="async"
              />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf7f1] text-slate-950">
      <HeroSection />
      <CompanyLogoSection />
      <div className="home-continuation">
        <CrmWorkflowSection />
        <CrmImportanceSection />
        <FlagshipCrmSection />
        <PortfolioSection />
        <TestimonialsSection />
      </div>
    </main>
  );
}
