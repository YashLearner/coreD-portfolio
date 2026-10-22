import { Check, Circle } from "lucide-react";

export default function ServiceTabs({ services, activeId, onChange }) {
  const handleKeyDown = (event, currentIndex) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % services.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + services.length) % services.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = services.length - 1;
    else return;

    event.preventDefault();
    const nextService = services[nextIndex];
    onChange(nextService.id);
    requestAnimationFrame(() => document.getElementById(`service-tab-${nextService.id}`)?.focus());
  };

  return (
    <div className="mx-auto mb-8 w-full max-w-3xl px-1 sm:mb-9">
      <div
        role="tablist"
        aria-label="Choose a CoreD service"
        className="grid grid-cols-3 gap-1 rounded-2xl border border-black/[0.06] bg-black/[0.035] p-1.5 shadow-inner sm:gap-1.5"
      >
        {services.map((service, index) => {
          const active = service.id === activeId;
          return (
            <button
              id={`service-tab-${service.id}`}
              key={service.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="service-content"
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(service.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={[
                "flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-center",
                "text-[11px] font-semibold leading-tight transition-all duration-200 sm:gap-2 sm:px-4 sm:text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100] focus-visible:ring-offset-2",
                active
                  ? "border border-black/[0.05] bg-white text-[#14161A] shadow-sm"
                  : "border border-transparent text-[#6B6B6B] hover:bg-white/60 hover:text-[#14161A]",
              ].join(" ")}
            >
              {active ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-[#FF9100]" aria-hidden="true" />
              ) : (
                <Circle className="h-3 w-3 shrink-0 text-black/30" aria-hidden="true" />
              )}
              <span>{service.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
