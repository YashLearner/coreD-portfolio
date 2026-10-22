import { useEffect, useState } from "react";
import { caseStudies } from "../../src/data/PortfolioData.js";

function CaseStudyCard({ study }) {
  const screenshots =
    study.screenshots ??
    (study.screenshot ? [study.screenshot] : []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const activeImage = screenshots[activeIndex];

  // Escape key se image preview close hoga.
  useEffect(() => {
    if (!previewImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewImage]);

  return (
    <>
      <article className="grid w-full min-w-0 grid-cols-1 gap-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10 xl:gap-12">
        {/* LEFT: Screenshot gallery + Our Solution */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-amber-500/30 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              {study.category}
            </span>

            <span className="text-sm text-zinc-500">
              Client: {study.client}
            </span>
          </div>

          {/* Main screenshot: poori image visible rahegi */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
            {activeImage?.src ? (
              <button
                type="button"
                onClick={() => setPreviewImage(activeImage)}
                aria-label={`Preview ${activeImage.alt || "CRM screenshot"} at full size`}
                className="group relative block w-full cursor-zoom-in p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 sm:p-3"
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt || `${study.client} CRM screenshot`}
                  loading="lazy"
                  className="mx-auto block h-auto max-h-[620px] w-full object-contain"
                />

                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white/95 px-3 py-2 text-xs font-semibold text-zinc-800 opacity-100 shadow-sm transition-colors group-hover:border-amber-400 group-hover:text-amber-700">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                  Click to preview
                </span>
              </button>
            ) : (
              <div className="flex min-h-72 items-center justify-center p-6 text-center text-sm text-zinc-500">
                Add your CRM screenshots in PortfolioData.js
              </div>
            )}
          </div>

          {activeImage?.caption && (
            <p className="mt-3 text-xs leading-5 text-zinc-500">
              {activeImage.caption}
            </p>
          )}

          {/* Screenshot thumbnails */}
          {screenshots.length > 1 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {screenshots.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                  aria-label={`Show ${image.label || `screenshot ${index + 1}`}`}
                  className={`overflow-hidden rounded-xl border bg-white text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 ${activeIndex === index
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-zinc-200 hover:border-amber-400"
                    }`}
                >
                  <div className="flex h-24 items-center justify-center bg-zinc-50 p-1 sm:h-28">
                    <img
                      src={image.src}
                      alt=""
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <span className="block truncate px-2.5 py-2 text-xs font-medium text-zinc-700">
                    {image.label || `Screenshot ${index + 1}`}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Our Solution moved below the screenshot */}

        </div>

        {/* RIGHT: Title + Their Problem + capabilities */}
        <div className="flex min-w-0 flex-col py-1 lg:py-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            Case Study
          </p>

          <h3 className="mt-3 break-words text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-4xl xl:text-5xl">
            {study.title}
          </h3>

          {study.summary && (
            <p className="mt-5 text-base leading-7 text-zinc-600">
              {study.summary}
            </p>
          )}

          {/* Their Problem */}
          <div className="mt-8 border-t border-zinc-200 pt-6 sm:mt-10">
            <h4 className="text-xl font-bold text-zinc-950 sm:text-2xl">
              Their Problem
            </h4>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-600 sm:text-base">
              {study.problem}
            </p>
          </div>

          {/* Our Solution */}
          <div className="mt-7 border-t border-zinc-200 pt-6 sm:mt-8">
            <h4 className="text-xl font-bold text-zinc-950 sm:text-2xl">
              Our Solution
            </h4>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-600 sm:text-base">
              {study.solution}
            </p>
          </div>

          {/* Key capabilities */}
          {study.features?.length > 0 && (
            <div className="mt-8 border-t border-zinc-200 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                Key Capabilities
              </h4>

              <div className="mt-4 flex flex-wrap gap-2">
                {study.features.map((feature) => {
                  const label =
                    typeof feature === "string"
                      ? feature
                      : feature.title;

                  return (
                    <span
                      key={label}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {study.website && (
            <a
              href={study.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Visit Client Website
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </article>

      {/* Full-screen screenshot preview */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="CRM screenshot preview"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewImage(null);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            aria-label="Close image preview"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-zinc-900 text-2xl text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            ×
          </button>

          <div className="flex max-h-full w-full max-w-[1600px] flex-col items-center">
            <img
              src={previewImage.src}
              alt={previewImage.alt || `${study.client} screenshot`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />

            {previewImage.caption && (
              <p className="mt-3 text-center text-sm text-white">
                {previewImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function CaseStudies() {
  if (!caseStudies?.length) {
    return null;
  }

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="w-full min-w-0 bg-white px-4 py-16 text-zinc-950 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Section heading */}
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Selected Work
          </p>

          <h2
            id="case-studies-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl"
          >
            Case Studies
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            A closer look at the business challenges we address and the
            solutions we build.
          </p>
        </div>

        <div className="space-y-10">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id || study.client}
              study={study}
            />
          ))}
        </div>
      </div>


    </section>
  );
}