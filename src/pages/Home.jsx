
import { Link } from "react-router-dom";
import image from "../image/Hero.png";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";


import CompamyLogoSection from "../components/CompanyLogoSection.jsx";

import { workflow, caseStudies } from "../data/PortfolioData.js";


/* PAGE DATA */


const audiences = [
  "Sales teams",
  "Customer success",
  "Lead generation",
  "Operations",
  "Growing businesses",
  "Service teams",
];

const contactSteps = [
  "Tell us about your team and workflow.",
  "Discuss a CRM setup that fits your goals.",
  "Plan your next steps with the CoreD team.",
];

/* FLOATING LABEL */

function FloatingLabel({
  children,
  className = "",
  dotClassName = "bg-amber-400 ring-amber-400/20",
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#151515]/95 px-3.5 py-2 text-[11px] font-semibold text-zinc-200 shadow-lg backdrop-blur-md lg:flex ${className}`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ring-4 ${dotClassName}`}
      />
      {children}
    </div>
  );
}

/* REUSABLE SECTION HEADING */

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const centered = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        centered ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

/* HERO SECTION — KEEP DARK */

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#070707] text-white">
      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />

      {/* Orange glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-220px] -z-10 h-[480px] w-[min(800px,100vw)] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
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
          Meet CoreD the intelligent CRM that helps your team
          capture leads, automate follow ups, and build stronger
          customer relationships with AI agents.
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

        {/* Dashboard preview */}
        <div className="relative mx-auto mt-14 max-w-[1200px] sm:mt-16 lg:mt-20">
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

          <div className="relative h-[250px] overflow-hidden rounded-t-2xl border border-white/15 border-b-0 bg-black sm:h-[340px] sm:rounded-t-3xl md:h-[410px] lg:h-[490px]">
           <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src={image}
        alt="CoreD AI CRM dashboard"
        className="block h-full w-full select-none object-cover object-top"
        draggable={false}
        loading="eager"
        decoding="async"
      />
    </div>
          </div>
        </div>
      </div>

      {/* Orange accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
      />
    </section>
  );
}



/* WORKFLOW — LIGHT */

function WorkflowSection() {
  return (
    <section className="bg-[#faf7f1] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title="From first touch to closed deal."
          description="Give your team a clearer process while AI agents handle repetitive steps and keep important work moving."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {workflow.map((item) => (
            <article
              key={item.number}
              className="group rounded-3xl border border-violet-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-400 group-hover:text-black">
                  {item.number === "01" && (
                    <span className="text-sm font-black">01</span>
                  )}
                  {item.number === "02" && <Sparkles className="h-5 w-5" />}
                  {item.number === "03" && <ArrowRight className="h-5 w-5" />}
                  {item.number === "04" && <Check className="h-5 w-5" />}
                </span>

                <span className="text-xs font-bold tracking-widest text-slate-300">
                  {item.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-extrabold tracking-tight text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CONTACT — LIGHT */

function ContactSteps() {
  return (
    <section className="bg-[#faf7f1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-slate-200 bg-white px-6 py-10 text-slate-900 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-200/40 blur-[90px]"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              <Sparkles className="h-4 w-4" />
              Let's build a better workflow
            </p>

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Ready to put your CRM to work?
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              Tell us what your team needs. Let's explore an AI-powered CRM
              workflow that fits your business.
            </p>

            <Link
              to="/reach-us"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Reach us out
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ol className="space-y-3">
            {contactSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-400 text-sm font-black text-black">
                  {index + 1}
                </span>

                <span className="pt-1 text-sm font-semibold leading-6 text-slate-700">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* CASE STUDIES — LIGHT */

function CaseStudiesSection() {
  if (!Array.isArray(caseStudies) || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#faf7f1] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Case studies"
            title="Better systems. Clearer outcomes."
            description="Explore how thoughtful workflows and automation can help teams work with greater clarity."
          />

          <Link
            to="/case-studies"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-amber-400 hover:text-amber-700 sm:self-auto"
          >
            All case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <Link
              to="/case-studies"
              key={item.name}
              className="group rounded-3xl border border-violet-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {item.name}
                </p>

                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600" />
              </div>

              <p className="mt-6 text-4xl font-black tracking-tight text-amber-600 sm:text-5xl">
                {item.stat}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.text}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-800 transition-colors group-hover:text-amber-700">
                Read case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* HOME PAGE */

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf7f1] text-slate-950">
      <HeroSection />
      <CompamyLogoSection />

      <WorkflowSection />
      <ContactSteps />
      <CaseStudiesSection />
    </main>
  );
}
