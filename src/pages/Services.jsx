import { useCallback, useEffect, useMemo, useState } from "react";
import ServiceTabs from "../components/services/ServiceTabs.jsx";
import ServiceHero from "../components/services/ServiceHero.jsx";
import QuotationCards from "../components/services/QuotationCards.jsx";
import QuotationModal from "../components/services/QuotationModal.jsx";
import { SERVICES } from "../components/services/servicesData.js";

/**
 * Services landing page. The site's shared Navbar and Router remain outside
 * this component; register it at /services in the existing route table.
 *
 * Pass `onSubmitRequest(payload)` to connect a backend endpoint. Without that
 * prop, the quotation dialog explicitly tells the visitor that no request was sent.
 */
export default function Services({ onSubmitRequest }) {
  const [activeServiceId, setActiveServiceId] = useState("agent");
  const [quoteSelection, setQuoteSelection] = useState(null);

  const activeIndex = useMemo(
    () => SERVICES.findIndex((service) => service.id === activeServiceId),
    [activeServiceId],
  );
  const activeService = SERVICES[activeIndex] ?? SERVICES[0];

  const switchService = useCallback((serviceId) => {
    setActiveServiceId(serviceId);
  }, []);

  const showRelativeService = useCallback((offset) => {
    const nextIndex = (activeIndex + offset + SERVICES.length) % SERVICES.length;
    setActiveServiceId(SERVICES[nextIndex].id);
  }, [activeIndex]);

  const openQuotation = useCallback((service, pkg) => {
    setQuoteSelection({ service, pkg });
  }, []);

  const closeQuotation = useCallback(() => {
    setQuoteSelection(null);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `CoreD · Services & Quotations — ${activeService.label}`;
    return () => {
      document.title = previousTitle;
    };
  }, [activeService.label]);

  return (
    <main className="min-h-screen bg-[#FAF7F1] pb-16 pt-32 text-[#1C1C1C] sm:pb-20 sm:pt-36 lg:pb-24">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <section className="mx-auto mb-8 mt-2 max-w-2xl px-1 text-center sm:mb-9 sm:mt-4" aria-labelledby="services-page-title">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.035] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#6B6B6B] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
            Core D · Services
          </span>
          <h1 id="services-page-title" className="font-[Roboto_Flex,Roboto,sans-serif] text-[34px] font-bold leading-[1.08] tracking-[-0.04em] text-[#14161A] sm:text-[42px] lg:text-[48px]">
            AI systems built around your business.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-base sm:leading-7">
            Choose a CRM, a focused AI agent, or expert guidance on your next step.
          </p>
        </section>

        <ServiceTabs services={SERVICES} activeId={activeService.id} onChange={switchService} />

        <div
          id="service-content"
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService.id}`}
          key={activeService.id}
          className="min-w-0 outline-none"
        >
          <ServiceHero
            service={activeService}
            activeIndex={activeIndex}
            serviceCount={SERVICES.length}
            onPrevious={() => showRelativeService(-1)}
            onNext={() => showRelativeService(1)}
          />
          <QuotationCards service={activeService} onRequest={openQuotation} />
        </div>
      </div>

      {quoteSelection ? (
        <QuotationModal
          service={quoteSelection.service}
          pkg={quoteSelection.pkg}
          onClose={closeQuotation}
          onSubmitRequest={onSubmitRequest}
        />
      ) : null}
    </main>
  );
}
