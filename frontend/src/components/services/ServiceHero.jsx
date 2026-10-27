import { ArrowDown, ArrowLeft, ArrowRight, Check } from "lucide-react";
import ServiceVisual from "./ServiceVisual.jsx";

export default function ServiceHero({ service, activeIndex, serviceCount, onPrevious, onNext }) {
  const compareLabel = service.id === "consultancy"
    ? "Explore consultancy"
    : `Compare ${service.id === "crm" ? "CRM" : "agent"} packages`;

  return (
    <section aria-labelledby="service-hero-title" className="relative mb-20 w-full lg:mb-24">
      <div className="relative flex items-stretch lg:justify-center">
        {/* Subtle card glimpse on desktop gives depth without adding interaction. */}
        <div aria-hidden="true" className="absolute right-0 top-4 hidden h-[88%] w-[82%] translate-x-3 scale-[0.98] rounded-[28px] border border-black/[0.05] bg-white/70 opacity-60 lg:block" />

        <div className="relative z-10 flex w-full flex-col items-stretch lg:flex-row">
          <ServiceVisual service={service} />

          <div className="relative z-10 -mt-3 flex min-w-0 flex-1 flex-col justify-between rounded-[24px] border border-black/[0.07] bg-white px-5 pb-6 pt-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:px-8 sm:pb-7 sm:pt-9 lg:-ml-6 lg:mt-0 lg:rounded-[28px] lg:py-10 lg:pl-10 lg:pr-9 xl:pl-12">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FF9100] sm:text-xs">
                <span className="h-0.5 w-2.5 bg-[#FF9100]" />
                {service.eyebrow}
              </div>
              <h2 id="service-hero-title" className="max-w-2xl font-[Roboto_Flex,Roboto,sans-serif] text-[27px] font-bold leading-[1.12] tracking-[-0.035em] text-[#14161A] sm:text-3xl lg:text-[38px]">
                {service.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-[15px] sm:leading-6">
                {service.description}
              </p>

              <div className="mt-6 sm:mt-7">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1C1C1C] sm:text-[11px]">Core capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.map((capability) => (
                    <span key={capability} className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#FAF7F1] px-3 py-1.5 text-[10px] font-medium leading-tight text-[#14161A] sm:text-[11px]">
                      <Check className="h-3 w-3 shrink-0 text-[#FF9100]" aria-hidden="true" />
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-5 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <a
                href="#quotation-section"
                className="group inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-[#14161A] px-5 py-3 text-xs font-semibold text-white transition hover:-translate-y-px hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100] focus-visible:ring-offset-2 sm:text-sm"
              >
                {compareLabel}
                <ArrowDown className="h-4 w-4 text-[#FF9100] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-1.5" aria-label={`Service ${activeIndex + 1} of ${serviceCount}`}>
                  {Array.from({ length: serviceCount }, (_, index) => (
                    <span key={index} aria-hidden="true" className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-[#14161A]" : "w-1.5 bg-black/20"}`} />
                  ))}
                </div>
                <span className="h-7 w-px bg-black/[0.08]" aria-hidden="true" />
                <button type="button" onClick={onPrevious} aria-label="Previous service" className="grid h-9 w-9 place-items-center rounded-full border border-black/[0.09] text-[#14161A] transition hover:border-black/20 hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100]">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={onNext} aria-label="Next service" className="grid h-9 w-9 place-items-center rounded-full border border-black/[0.09] text-[#14161A] transition hover:border-black/20 hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100]">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
