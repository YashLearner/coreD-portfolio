
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../../src/data/PortfolioData.js";

/* -------------------------------------------------------------------------- */
/* Shared helpers                                                             */
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

function getFeatureTitle(feature) {
  return typeof feature === "string" ? feature : feature?.title;
}

/* -------------------------------------------------------------------------- */
/* Case studies listing                                                       */
/* -------------------------------------------------------------------------- */

function CaseStudiesList() {
  if (!Array.isArray(caseStudies) || caseStudies.length === 0) {
    return (
      <section className="min-h-screen bg-[#faf7f1] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-5xl">
            Case Studies
          </h1>

          <p className="mt-4 text-slate-600">
            Our case studies will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#faf7f1] px-4 py-16 text-slate-900 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        {/* Page heading */}
        <header className="mb-10 max-w-3xl sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Selected Work
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Case Studies
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Explore the challenges, solutions, and capabilities behind
            the projects we build for businesses.
          </p>
        </header>

        {/* All case study cards */}
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
                className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
              >
                {/* Card screenshot */}
                <Link
                  to={`/case-studies/${study.id}`}
                  aria-label={`Read the full ${study.client} case study`}
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
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <span className="px-6 text-sm text-slate-500">
                        Project preview unavailable
                      </span>
                    )}
                  </div>
                </Link>

                {/* Card details */}
                <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-amber-500/30 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                      {study.category}
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {study.client}
                  </p>

                  <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                    {study.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>

                  {/* Project counts */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                    <span>
                      {study.features?.length ?? 0} capabilities
                    </span>

                    <span aria-hidden="true">•</span>

                    <span>
                      {screenshots.length} screenshots
                    </span>
                  </div>

                  {/* Full case study link */}
                  <Link
                    to={`/case-studies/${study.id}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
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

/* -------------------------------------------------------------------------- */
/* Full case study                                                            */
/* -------------------------------------------------------------------------- */

function CaseStudyDetail({ study }) {
  const [previewImage, setPreviewImage] = useState(null);

  const screenshots = getScreenshots(study);

  // Close the preview with Escape and restore page scrolling.
  useEffect(() => {
    if (!previewImage) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage]);

  return (
    <main className="min-h-screen bg-[#faf7f1] px-4 py-12 text-slate-900 sm:px-6 sm:py-16 lg:px-8">
      <article className="mx-auto w-full max-w-7xl">
        {/* Back to all projects */}
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
        >
          <span aria-hidden="true">←</span>
          All case studies
        </Link>

        {/* Project heading */}
        <header className="mt-8 max-w-4xl">
          {study.category && (
            <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              {study.category}
            </span>
          )}

          <p className="mt-5 text-sm font-semibold text-slate-500">
            Client: {study.client}
          </p>
          <h1 className="mt-3 whitespace-nowrap text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-6xl">
            {study.title}
          </h1>

          {study.summary && (
            <p className="mt-5 w-full text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {study.summary}
            </p>
          )}
        </header>

        {/* All screenshots */}
        {screenshots.length > 0 && (
          <section
            className="mt-12 sm:mt-16"
            aria-labelledby="project-screenshots-heading"
          >
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Project Gallery
              </p>

              <h2
                id="project-screenshots-heading"
                className="mt-2 text-2xl font-bold sm:text-3xl"
              >
                Screenshots & Preview
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore each project screen. Select an image to open
                the full-size preview.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {screenshots.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => setPreviewImage(image)}
                  aria-label={`Preview ${image.label || `screenshot ${index + 1}`
                    } at full size`}
                  className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={image.src}
                      alt={
                        image.alt ||
                        `${study.client} screenshot ${index + 1}`
                      }
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="px-3 py-3">
                    <p className="font-semibold text-slate-900">
                      {image.label || `Screenshot ${index + 1}`}
                    </p>

                    {image.caption && (
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {image.caption}
                      </p>
                    )}

                    <span className="mt-3 inline-block text-xs font-bold text-amber-700">
                      View full image ↗
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Problem and solution */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 sm:mt-16">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              The Challenge
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {study.problemTitle || "Their Problem"}
            </h2>

            {study.problem && (
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {study.problem}
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              The Approach
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {study.solutionTitle || "Our Solution"}
            </h2>

            {study.solution && (
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {study.solution}
              </p>
            )}
          </section>
        </div>

        {/* Key capabilities */}
        {study.features?.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              What We Built
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Key Capabilities
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
              {study.features.map((feature, index) => {
                const title = getFeatureTitle(feature);

                const description =
                  typeof feature === "string"
                    ? ""
                    : feature?.description;

                if (!title) return null;

                return (
                  <div
                    key={`${title}-${index}`}
                    className="rounded-2xl border border-slate-200 hover:bg-red-50 bg-white p-5 sm:p-6"
                  >
                    <h3 className="font-bold text-slate-900">
                      {title}
                    </h3>

                    {description && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Result */}
        {study.result && (
          <section className="mt-12 rounded-3xl bg-amber-200 p-6 sm:mt-16 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Outcome
            </p>

            <h2 className="mt-3 text-2xl text-black font-bold sm:text-3xl">
              The Result
            </h2>

            <p className="mt-4 max-w-4xl text-slate-900 text-sm leading-7 sm:text-base">
              {study.result}
            </p>
          </section>
        )}

        {/* Client website */}
        {study.website && (
          <a
            href={study.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Visit Client Website
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </article>

      {/* Full-screen image preview */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size screenshot preview"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewImage(null);
            }
          }}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setPreviewImage(null)}
            aria-label="Close image preview"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-2xl text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            ×
          </button>

          <div className="flex max-h-full w-full max-w-[1600px] flex-col items-center">
            <img
              src={previewImage.src}
              alt={
                previewImage.alt ||
                `${study.client} full-size screenshot`
              }
              className="max-h-[82vh] max-w-full rounded-lg object-contain"
            />

            {previewImage.caption && (
              <p className="mt-4 text-center text-sm text-white">
                {previewImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Main page router: list or selected case study                              */
/* -------------------------------------------------------------------------- */

export default function CaseStudies() {
  const { id } = useParams();

  if (!id) {
    return <CaseStudiesList />;
  }

  const study = caseStudies.find((item) => item.id === id);
''
  if (!study) {
    return (
      <main className="min-h-screen bg-[#faf7f1] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            Project not found
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            We couldn't find this case study.
          </h1>

          <p className="mt-4 text-slate-600">
            The link may be incorrect, or this project may no longer be available.
          </p>

          <Link
            to="/case-studies"
            className="mt-7 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
          >
            ← All case studies
          </Link>
        </div>
      </main>
    );
  }

  return <CaseStudyDetail study={study} />;
}
