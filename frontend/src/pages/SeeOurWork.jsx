import { Link } from "react-router-dom";
import { caseStudies } from "../../src/data/PortfolioData.js";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getScreenshots(study) {
    const screenshots =
        study.screenshots?.length > 0
            ? study.screenshots
            : study.screenshot
                ? [study.screenshot]
                : [];

    return screenshots.filter((image) => image?.src);
}

/* -------------------------------------------------------------------------- */
/* See Our Work                                                               */
/* -------------------------------------------------------------------------- */

export default function SeeOurWork() {
    if (!Array.isArray(caseStudies) || caseStudies.length === 0) {
        return (
            <main className="min-h-screen bg-[#faf7f1] px-4 py-20 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold sm:text-5xl">
                        See Our Work
                    </h1>

                    <p className="mt-4 text-slate-600">
                        Our case studies will appear here.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#faf7f1] px-4 py-16 text-slate-900 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto w-full max-w-7xl">

                <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                        Selected Work
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        See Our Work
                    </h1>

                    <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                        Explore our projects, the challenges businesses faced,
                        and the solutions we built to solve them.
                    </p>
                </header>

                {/* Case study cards */}
                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {caseStudies.map((study) => {
                        const screenshots = getScreenshots(study);
                        const coverImage = screenshots[0];

                        const description =
                            study.shortDescription ||
                            study.summary ||
                            study.problem ||
                            "Explore the project, its capabilities, and the solution.";

                        return (
                            <article
                                key={study.id || study.client}
                                className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 
                                            bg-white p-2 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
                            >
                                {/* Project preview */}
                                <Link
                                    to={`/case-studies/${study.id}`}
                                    aria-label={`View ${study.client} case study`}
                                    className="block overflow-hidden rounded-2xl bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                                >
                                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100">
                                        {coverImage ? (
                                            <img
                                                src={coverImage.src}
                                                alt={
                                                    coverImage.alt ||
                                                    `${study.client} project screenshot`
                                                }
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                            />
                                        ) : (
                                            <span className="px-6 text-sm text-slate-500">
                                                Project preview unavailable
                                            </span>
                                        )}
                                    </div>
                                </Link>

                                {/* Project details */}
                                <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
                                    {study.category && (
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full border border-amber-500/30 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                                                {study.category}
                                            </span>
                                        </div>
                                    )}

                                    {study.client && (
                                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                                            {study.client}
                                        </p>
                                    )}

                                    <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                                        {study.title}
                                    </h2>

                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                        {description}
                                    </p>

                                    {/* Project information */}
                                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                                        <span>
                                            {study.features?.length ?? 0} capabilities
                                        </span>

                                        <span aria-hidden="true">•</span>

                                        <span>
                                            {screenshots.length} screenshots
                                        </span>
                                    </div>

                                    {/* Open the selected case study */}
                                    <Link
                                        to={`/case-studies/${study.id}`}
                                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white 
                                                    transition hover:bg-amber-500 hover:text-slate-950 focus-visible:outline 
                                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                                    >
                                        See full case study

                                        <span
                                            aria-hidden="true"
                                            className="transition-transform group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}