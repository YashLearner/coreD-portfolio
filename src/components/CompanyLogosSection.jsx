
import React from "react";

import TohfaBazzarLogo from "../image/tohfabazzar.png";
import CrawlDigitallyLogo from "../image/crawldigitally.png";
import NextTechWavesLogo from "../image/nexttechwaves.png";
import AdsMarker from "../image/ads-marker.png";

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
    size: "rounded",
  },
  {
    id: "nexttechwaves",
    name: "NextTechWaves",
    logo: NextTechWavesLogo,
    size: "rounded",
  },
   {
    id: "ads-marker",
    name: "Ads Marker",
    logo: AdsMarker,
    size: "large",
  },
];

export default function CompanyLogosSection() {
  if (!companyLogos.length) return null;

  return (
    <section
      aria-label="Selected client and venture work"
      className="w-full overflow-hidden border-y border-black/[0.06] bg-white/70 py-4 backdrop-blur-sm sm:py-5"
    >
      <h2 className="mb-3 px-4 text-center text-[11px] font-semibold uppercase tracking-wider text-zinc-500 sm:mb-4 sm:text-xs">
        Selected client and venture work
      </h2>

      <div className="company-marquee w-full overflow-hidden">
        <div className="company-marquee-track flex w-max">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? "true" : undefined}
              className="company-marquee-group flex shrink-0 items-center gap-6 px-3 sm:gap-9 sm:px-5 md:gap-12 md:px-7"
            >
              {companyLogos.map((company) => (
                <React.Fragment key={company.id}>
                  <div className="group flex shrink-0 items-center justify-center py-1 transition-transform duration-200 hover:-translate-y-0.5">
                    <img
                      src={company.logo}
                      alt={
                        groupIndex === 0
                          ? `${company.name} logo`
                          : ""
                      }
                      width={company.size === "large" ? 200 : 150}
                      height={company.size === "large" ? 70 : 42}
                      loading="lazy"
                      decoding="async"
                      className={[
                        "w-auto object-contain transition-transform duration-300",
                        company.size === "large"
                          ? "h-9 sm:h-11 md:h-12"
                          : "h-6 sm:h-7 md:h-8",
                        company.size === "rounded"
                          ? "rounded-lg shadow-sm sm:rounded-xl"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="select-none text-sm font-light text-zinc-300 sm:text-base"
                  >
                    +
                  </span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
