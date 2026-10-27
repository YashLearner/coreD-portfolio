import { ArrowUpRight, Check, Minus } from "lucide-react";

function FeatureList({ features, featured }) {
  return (
    <ul className="space-y-2.5 text-[12px] leading-5 sm:text-[13px]">
      {features.map((feature) => {
        const item = typeof feature === "string"
          ? { label: feature, status: null, included: true }
          : feature;
        const muted = item.included === false;

        return (
          <li key={item.label} className={`flex items-start justify-between gap-2 ${muted ? (featured ? "text-white/35" : "text-black/35") : (featured ? "text-white/90" : "text-[#1C1C1C]")}`}>
            <span className="flex min-w-0 items-start gap-2">
              {muted ? (
                <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-current" aria-hidden="true" />
              ) : (
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF9100]" aria-hidden="true" />
              )}
              <span>{item.label}</span>
            </span>
            {item.status ? <span className={`shrink-0 text-[9px] font-semibold ${featured ? (muted ? "text-white/30" : "text-[#FF9100]") : (muted ? "text-black/25" : "text-[#FF9100]")}`}>{item.status}</span> : null}
          </li>
        );
      })}
    </ul>
  );
}

function PackageCard({ service, pkg, onRequest }) {
  const featured = Boolean(pkg.featured);
  const showAgentTypeHeading = Boolean(pkg.listTitle);

  return (
    <article className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border p-6 transition duration-200 hover:-translate-y-0.5 sm:p-7 lg:p-8 ${featured ? "border-white/10 bg-gradient-to-br from-[#14161A] to-[#0E0F12] text-white shadow-[0_20px_60px_rgba(20,22,26,0.20)]" : "border-black/[0.08] bg-white text-[#1C1C1C] shadow-[0_4px_20px_rgba(0,0,0,0.06)]"}`}>
      {featured ? <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/[0.045] blur-2xl" /> : null}

      <div className="relative flex-1">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className={`text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px] ${featured ? "text-white/65" : "text-[#6B6B6B]"}`}>{pkg.tier}</span>
          <span className={`inline-flex max-w-[55%] items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold leading-tight sm:text-[10px] ${featured ? "border border-[#FF9100]/30 bg-[#FF9100]/15 text-[#FF9100]" : "bg-black/[0.04] text-[#424242]"}`}>
            {featured ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF9100]" /> : null}
            {pkg.badge}
          </span>
        </div>

        <h3 className={`font-[Roboto_Flex,Roboto,sans-serif] text-[21px] font-bold leading-tight tracking-[-0.025em] sm:text-2xl ${featured ? "text-white" : "text-[#14161A]"}`}>{pkg.title}</h3>

        {pkg.price ? (
          <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
            <span className={`font-[Roboto_Flex,Roboto,sans-serif] text-3xl font-bold tracking-tight ${featured ? "text-white" : "text-[#14161A]"}`}>{pkg.price}</span>
            {pkg.billing ? <span className={`text-[11px] ${featured ? "text-white/60" : "text-[#6B6B6B]"}`}>{pkg.billing}</span> : null}
          </div>
        ) : null}

        <p className="mt-1 text-[10px] font-semibold text-[#FF9100]">{pkg.status}</p>
        <p className={`mt-4 min-h-[52px] text-[12px] leading-5 sm:text-[13px] ${featured ? "text-white/65" : "text-[#6B6B6B]"}`}>{pkg.description}</p>

        {showAgentTypeHeading ? (
          <div className={`mt-5 flex items-center justify-between gap-2 border-t pt-4 text-[9px] font-bold uppercase tracking-[0.09em] ${featured ? "border-white/10 text-white/45" : "border-black/[0.08] text-[#777]"}`}>
            <span>{pkg.listTitle}</span>
            <span className={featured ? "text-[#FF9100]" : "text-[#777]"}>{pkg.id === "custom" ? "Custom scope" : "Included"}</span>
          </div>
        ) : (
          <div className={`mt-5 border-t pt-5 ${featured ? "border-white/10" : "border-black/[0.08]"}`} />
        )}

        <div className={showAgentTypeHeading ? "mt-3" : "mt-0"}>
          <FeatureList features={pkg.features} featured={featured} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRequest(service, pkg)}
        className={`group mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-center text-xs font-semibold transition duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100] focus-visible:ring-offset-2 ${featured ? "bg-white text-[#14161A] hover:bg-[#FAF7F1] focus-visible:ring-offset-[#14161A]" : "bg-[#14161A] text-white hover:bg-black focus-visible:ring-offset-white"}`}
      >
        {pkg.cta}
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#FF9100] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </button>
    </article>
  );
}

export default function QuotationCards({ service, onRequest }) {
  const isTwoCards = service.packages.length === 2;

  return (
    <section id="quotation-section" className="scroll-mt-28" aria-labelledby="quotation-title">
      <div className="mx-auto mb-8 max-w-2xl px-2 text-center sm:mb-11">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#FF9100] sm:text-xs">{service.comparison.eyebrow}</span>
        <h2 id="quotation-title" className="font-[Roboto_Flex,Roboto,sans-serif] text-2xl font-bold tracking-[-0.035em] text-[#14161A] sm:text-3xl lg:text-[34px]">{service.comparison.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-[15px]">{service.comparison.description}</p>
      </div>

      <div className={`mx-auto grid w-full items-stretch gap-4 sm:gap-5 lg:gap-6 ${isTwoCards ? "max-w-4xl grid-cols-1 md:grid-cols-2" : "max-w-6xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
        {service.packages.map((pkg) => (
          <PackageCard key={`${service.id}-${pkg.id}`} service={service} pkg={pkg} onRequest={onRequest} />
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-black/[0.05] bg-black/[0.02] px-4 py-3 text-center text-[10px] leading-5 text-[#6B6B6B] sm:mt-7 sm:px-6 sm:text-[11px]">
        <strong className="text-[#14161A]">Transparent scoping:</strong> Your quotation will define the build scope, integrations and any ongoing usage, hosting or support costs.
      </p>
    </section>
  );
}
