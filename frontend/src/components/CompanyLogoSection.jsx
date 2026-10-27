
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import TohfaBazzarLogo from "/Images/tohfabazzar.png";
import CrawlDigitallyLogo from "/Images/CrawlDigitally.png";
import NextTechWavesLogo from "/Images/NextTechWaves.png";
import AdsMarkerLogo from "/Images/AdsMarker.png";

/* =========================
   COMPANY LOGO DATA
========================= */

const companyLogos = [
  {
    id: "tohfabazzar",
    name: "TohfaBazzar",
    logo: TohfaBazzarLogo,
    size: "large",
  },
  {
    id: "crawldigitally",
    name: "Crawl Digitally",
    logo: CrawlDigitallyLogo,
    size: "medium",
  },
  {
    id: "nexttechwaves",
    name: "NextTechWaves",
    logo: NextTechWavesLogo,
    size: "medium",
  },
  {
    id: "ads-marker",
    name: "Ads Marker",
    logo: AdsMarkerLogo,
    size: "large",
  },
];

/* =========================
   LOGO ITEM
========================= */

function CompanyLogo({ company }) {
  const isLarge = company.size === "large";

  return (
    <div className="flex shrink-0 items-center gap-4 sm:gap-7">
      <div className="flex h-12 min-w-[118px] items-center justify-center rounded-xl border border-white/10 bg-white px-3 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 sm:h-14 sm:min-w-[145px] sm:px-4">
        <img
          src={company.logo}
          alt={company.name}
          width={isLarge ? 200 : 150}
          height={isLarge ? 70 : 42}
          loading="eager"
          decoding="async"
          draggable={false}
          className={`w-auto max-w-[145px] object-contain ${
            isLarge ? "h-8 sm:h-10" : "h-6 sm:h-8"
          }`}
        />
      </div>

      <span
        aria-hidden="true"
        className="select-none text-lg font-light text-zinc-600 sm:text-xl"
      >
        +
      </span>
    </div>
  );
}

/* =========================
   GSAP MARQUEE
========================= */

export default function CompanyLogosSection() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;

    if (!track) return undefined;

    const mm = gsap.matchMedia();

    // Animate from right to left.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 24,
          ease: "none",
          repeat: -1,
        }
      );

      animationRef.current = tween;

      return () => {
        tween.kill();

        if (animationRef.current === tween) {
          animationRef.current = null;
        }
      };
    });

    // Keep the logos still when reduced motion is requested.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(track, { xPercent: 0 });
    });

    return () => {
      mm.revert();
      animationRef.current = null;
    };
  }, []);

  const pauseAnimation = () => {
    animationRef.current?.pause();
  };

  const resumeAnimation = () => {
    animationRef.current?.resume();
  };

  return (
    <section
      aria-label="Selected companies and partners"
      className="relative w-full overflow-hidden bg-white  py-5 sm:py-6"
      onMouseEnter={pauseAnimation}
      onMouseLeave={resumeAnimation}
      onFocus={pauseAnimation}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          resumeAnimation();
        }
      }}
    >
      

      {/* Marquee viewport */}
  <div className="relative w-full overflow-hidden">
  {/* Left fade */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 left-0 z-6
    w-8 bg-gradient-to-r
    sm:w-16 lg:w-24"
  />

  {/* Right fade */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 right-0 z-6
    w-8 bg-gradient-to-l
    sm:w-16 lg:w-24"
  />

  {/* Continuous infinite slider */}
  <div
    ref={trackRef}
    className="flex w-max will-change-transform"
  >
    {[0, 1].map((groupIndex) => (
      <div
        key={groupIndex}
        aria-hidden={groupIndex === 1 ? true : undefined}
        className="flex shrink-0 items-center gap-5 px-3
        sm:gap-8 sm:px-5 md:gap-10 md:px-7"
      >
        {companyLogos.map((company) => (
          <CompanyLogo key={company.id} company={company} />
        ))}
      </div>
    ))}
  </div>
</div>
    </section>
  );
}
