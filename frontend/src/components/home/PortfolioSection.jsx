import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, BadgeCheckIcon, Layers, Images } from "lucide-react";
import { caseStudies } from "../../data/PortfolioData.js";

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const centered = align === "center";

  return (
    <div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : "text-left"
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

export default function PortfolioSection() {


  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useLayoutEffect(() => {
    const track = marqueeRef.current;

    if (!track || caseStudies.length < 2) {
      return undefined;
    }

    // Respect the user's reduced-motion preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, []);
  if (!Array.isArray(caseStudies) || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F3EDE2] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="bg-[#F3EDE2] mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="center"
            eyebrow="Case studies"
            title={<> Better system <br/>
                       Clearer outcome
                  </>}
            description="Explore how thoughtful workflows and automation can help teams work with greater clarity."
          />
        </div>

        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          <div
            ref={marqueeRef}
            className="flex w-max will-change-transform"
          >
            {[false, true].map((isDuplicate) => (
              <div
                key={isDuplicate ? "duplicate-cards" : "original-cards"}
                aria-hidden={isDuplicate ? true : undefined}
                className="flex shrink-0 gap-8 pr-8"
              >
                {caseStudies.map((item) => (
                  <Link
                    to={`/case-studies/${item.id}`}
                    key={`${isDuplicate ? "duplicate" : "original"}-${item.id}`}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className="group w-[min(340px,82vw)] shrink-0 rounded-[32px] bg-[#faf7f1] p-2 shadow-[0_10px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-[26px] bg-slate-100">
                      <img
                        src={item.screenshots?.[0]?.src}
                        alt={item.screenshots?.[0]?.alt || item.client}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="px-3 pb-3 pt-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                          {item.client}
                        </h3>

                        <BadgeCheckIcon className="h-5 w-5 fill-green-500 text-white" />
                      </div>

                      <p className="mt-1.5 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
                        {item.shortDescription}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                          <span
                            className="inline-flex items-center gap-1.5"
                            title="Features"
                          >
                            <Layers className="h-3.5 w-3.5 text-slate-400" />
                            {item.features?.length ?? 0}
                          </span>

                          <span
                            className="inline-flex items-center gap-1.5"
                            title="Screens"
                          >
                            <Images className="h-3.5 w-3.5 text-slate-400" />
                            {item.screenshots?.length ?? 0}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors group-hover:bg-amber-100 group-hover:text-amber-700">
                          Read more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
