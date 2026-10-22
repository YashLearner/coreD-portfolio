import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials as portfolioTestimonials } from "../../data/PortfolioData.js";

function ArrowIcon({ direction = "left" }) {
  const isLeft = direction === "left";

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      {isLeft ? (
        <path
          d="M19 12H5m0 0 7 7m-7-7 7-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12h14m0 0-7-7m7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function TestimonialCard({ testimonial, index, count, isActive }) {
  const { review, name, initials, role, company } = testimonial;

  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}`}
      aria-hidden={!isActive}
      className={`relative flex min-h-[320px] w-full flex-col rounded-[28px] border border-black/[0.07] bg-gradient-to-br from-white via-white to-[#FFF7E9] p-6 shadow-[0_16px_45px_rgba(23,23,23,0.09)] sm:min-h-[330px] sm:rounded-[30px] sm:p-8 md:min-h-[340px] ${
        isActive ? "shadow-[0_22px_55px_rgba(23,23,23,0.12)]" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="select-none font-serif text-[66px] font-bold leading-[0.72] text-[#F15A24] sm:text-[74px]"
      >
        “
      </span>

      <blockquote className="mt-4 flex-1 text-left text-[16px] italic leading-[1.75] text-[#F08A00] sm:mt-5 sm:text-[19px] sm:leading-[1.75]">
        “{review}”
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-black/[0.06] pt-5 sm:mt-7 sm:gap-4">
        <div
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] bg-gradient-to-br from-[#17181C] to-[#35363C] text-sm font-bold text-[#FFAA16] shadow-sm sm:h-[50px] sm:w-[50px]"
        >
          {initials}
        </div>

        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-bold leading-5 text-[#17181C] sm:text-[15px]">
            {name}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-[#737373] sm:text-[13px]">
            {role}
            {company ? ` · ${company}` : ""}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection({
  testimonials = portfolioTestimonials,
  autoPlay = true,
  interval = 4000,
}) {
  const testimonialCount = Array.isArray(testimonials)
    ? testimonials.length
    : 0;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (testimonialCount < 1) return;

      const nextIndex =
        ((index % testimonialCount) + testimonialCount) % testimonialCount;

      setActiveIndex(nextIndex);
    },
    [testimonialCount],
  );

  const goPrevious = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  // Reset the current slide if the testimonials change.
  useEffect(() => {
    if (activeIndex >= testimonialCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, testimonialCount]);

  // Detect the user's reduced-motion preference.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);

      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    // Compatibility with older browsers.
    mediaQuery.addListener(updatePreference);

    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  // AUTOMATIC SLIDER
  
  useEffect(() => {
    if (!autoPlay || testimonialCount < 2 || prefersReducedMotion) {
      return undefined;
    }

    const delay = Number.isFinite(interval) ? Math.max(1000, interval) : 4000;

    const timerId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % testimonialCount;
      });
    }, delay);

    return () => window.clearInterval(timerId);
  }, [autoPlay, interval, prefersReducedMotion, testimonialCount]);

  // Mobile swipe support.
  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;

    const distance = touchStartX.current - touchEndX;

    touchStartX.current = null;

    if (Math.abs(distance) < 45) return;

    if (distance > 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  if (testimonialCount === 0) return null;

  const activeTestimonial = testimonials[activeIndex] ?? testimonials[0];

  return (
    <section
      aria-labelledby="client-testimonials-title"
      aria-roledescription="carousel"
      className="relative w-full py-14 sm:py-16 lg:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Section heading */}
        <header className="mx-auto max-w-[680px] text-center md:mx-0 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFAA16]/40 bg-[#FFAA16]/[0.09] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#D97706] sm:text-[11px]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#FF9100]"
            />
            Client endorsements
          </span>

          <h2
            id="client-testimonials-title"
            className="mt-4 font-[Roboto_Flex,Roboto,sans-serif] text-[32px] font-bold leading-[1.12] tracking-[-0.04em] text-[#14161A] sm:text-[40px] lg:text-[44px]"
          >
            What Partners &amp; Clients Say
          </h2>

          <p className="mx-auto mt-3 max-w-[580px] text-sm leading-6 text-[#626262] sm:mt-4 sm:text-base sm:leading-7 md:mx-0">
            Feedback on CRM, AI automation, and the systems built around real
            business workflows.
          </p>
        </header>

        {/* Testimonial slides */}
        <div
          className="relative mx-auto mt-8 h-[390px] w-full max-w-[1000px] overflow-hidden sm:mt-10 sm:h-[410px] md:h-[420px]"
          aria-label="Client testimonial slides"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((testimonial, index) => {
            let offset = index - activeIndex;

            if (offset > testimonialCount / 2) {
              offset -= testimonialCount;
            } else if (offset < -testimonialCount / 2) {
              offset += testimonialCount;
            }

            const isActive = offset === 0;
            const isAdjacent = Math.abs(offset) === 1;

            const transform = isActive
              ? "translate(-50%, -50%) scale(1)"
              : offset < 0
                ? "translate(calc(-50% - clamp(16rem, 28vw, 22rem)), -50%) scale(0.9)"
                : "translate(calc(-50% + clamp(16rem, 28vw, 22rem)), -50%) scale(0.9)";

            return (
              <div
                key={`${testimonial.name ?? "testimonial"}-${index}`}
                className={`absolute left-1/2 top-1/2 ${
                  isActive
                    ? "w-[min(88vw,40rem)] md:w-[min(78vw,40rem)]"
                    : "hidden md:block md:w-[min(72vw,28rem)]"
                }`}
                style={{
                  zIndex: isActive ? 30 : isAdjacent ? 20 : 0,
                  opacity: isActive ? 1 : isAdjacent ? 0.62 : 0,
                  pointerEvents: isActive || isAdjacent ? "auto" : "none",
                  transform,
                  transition: prefersReducedMotion
                    ? "none"
                    : "transform 650ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 650ms ease",
                }}
                aria-hidden={!isActive}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  count={testimonialCount}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation controls */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={goPrevious}
            disabled={testimonialCount < 2}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#222] shadow-sm transition hover:border-[#FFAA16] hover:bg-[#FFF8EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAA16] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowIcon direction="left" />
          </button>

          {/* Pagination dots */}
          <div className="flex max-w-[min(60vw,360px)] items-center justify-center gap-2 overflow-x-auto px-1 py-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={`dot-${testimonial.name ?? "testimonial"}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show testimonial ${index + 1} from ${testimonial.name ?? "client"}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-2.5 shrink-0 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAA16] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                  index === activeIndex
                    ? "w-7 bg-[#FF9100]"
                    : "w-2.5 bg-[#D6D3D1] hover:bg-[#A8A29E]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={testimonialCount < 2}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#222] shadow-sm transition hover:border-[#FFAA16] hover:bg-[#FFF8EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAA16] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowIcon direction="right" />
          </button>

          <span className="w-full text-center text-xs tabular-nums text-[#85817B] sm:w-auto">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(testimonialCount).padStart(2, "0")}
          </span>
        </div>

        {/* Screen-reader announcement */}
        <p
          className="sr-only"
          aria-live={autoPlay && !isHovered && !isFocused ? "off" : "polite"}
          aria-atomic="true"
        >
          Showing testimonial {activeIndex + 1} of {testimonialCount}:{" "}
          {activeTestimonial.name}.
        </p>
      </div>
    </section>
  );
}
