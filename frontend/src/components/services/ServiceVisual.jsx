import {
  BookOpen,
  Building2,
  CheckCircle2,
  FileSearch,
  MessageCircle,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

function DiagramCard({ eyebrow, title, note, status, icon: Icon }) {
  const statusClass = {
    orange: "bg-[#FF9100]",
    green: "bg-emerald-400",
    muted: "bg-white/40",
  }[status] ?? "bg-white/20";

  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.055] p-2.5 sm:p-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="truncate text-[8px] font-medium uppercase tracking-[0.12em] text-white/50 sm:text-[9px]">
          {eyebrow}
        </span>
        {status ? <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusClass}`} /> : null}
      </div>
      <div className="truncate text-[10px] font-semibold text-white/90 sm:text-[11px]">{title}</div>
      {note ? <div className="mt-1 line-clamp-2 text-[8px] leading-snug text-white/50 sm:text-[9px]">{note}</div> : null}
      {Icon ? <Icon className="mt-1.5 h-3 w-3 text-[#FF9100]" aria-hidden="true" /> : null}
    </div>
  );
}

function Hub({ icon: Icon, title, subtitle, centered = false }) {
  return (
    <div className={`relative z-10 mx-auto flex max-w-full items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.08] p-3 shadow-xl sm:p-3.5 ${centered ? "justify-center text-center" : "w-fit"}`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.08] text-[#FF9100] sm:h-9 sm:w-9">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <strong className="block text-[10px] font-semibold tracking-wide text-white sm:text-xs">{title}</strong>
        <small className="mt-0.5 block text-[8px] text-[#FF9100] sm:text-[9px]">{subtitle}</small>
      </span>
      {title === "Contact Hub" ? <span className="ml-1 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#FF9100]" /> : null}
    </div>
  );
}

function Connector({ variant = "three" }) {
  if (variant === "crm") {
    return (
      <svg className="mx-auto h-14 w-full max-w-[340px] sm:h-[70px]" viewBox="0 0 340 70" fill="none" aria-hidden="true">
        <path d="M120 0V25L60 45V70M220 0V25L280 45V70" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="60" cy="45" r="3" fill="#FF9100" /><circle cx="280" cy="45" r="3" fill="#FF9100" />
      </svg>
    );
  }
  if (variant === "two") {
    return (
      <svg className="mx-auto h-12 w-full max-w-[340px]" viewBox="0 0 340 50" fill="none" aria-hidden="true">
        <path d="M170 0V15L85 30V50M170 0V15L255 30V50" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="85" cy="30" r="3" fill="#FF9100" /><circle cx="255" cy="30" r="3" fill="#FF9100" />
      </svg>
    );
  }
  return (
    <svg className="mx-auto h-14 w-full max-w-[340px]" viewBox="0 0 340 60" fill="none" aria-hidden="true">
      <path d="M170 0V15L50 35V60M170 0V60M170 0V15L290 35V60" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="50" cy="35" r="3" fill="#FF9100" /><circle cx="170" cy="30" r="3" fill="#FF9100" /><circle cx="290" cy="35" r="3" fill="#FF9100" />
    </svg>
  );
}

function CRMTopology() {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <Hub icon={Building2} title="Contact Hub" subtitle="Unified Record" />
      <Connector variant="crm" />
      <div className="grid grid-cols-2 gap-2.5">
        <DiagramCard eyebrow="Lead record" title="Enterprise Inbound" note="Qualified" status="orange" />
        <DiagramCard eyebrow="AI node" title="Pipeline Sync" note="Real-time triggers" status="green" icon={Zap} />
      </div>
    </div>
  );
}

function AgentTopology() {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <Hub icon={Workflow} title="Central Task Hub" subtitle="Autonomous Orchestrator" centered />
      <Connector />
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <DiagramCard eyebrow="Knowledge" title="Knowledge Node" note="Docs & RAG" icon={BookOpen} />
        <DiagramCard eyebrow="Qualification" title="Lead Qual Node" note="Scoring & Fit" icon={CheckCircle2} />
        <DiagramCard eyebrow="Follow-up" title="Follow-up Node" note="Email & Msg" icon={MessageCircle} />
      </div>
    </div>
  );
}

function ConsultancyTopology() {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <Hub icon={ShieldCheck} title="System Shield" subtitle="Risk & Security Guard" centered />
      <Connector variant="two" />
      <div className="grid grid-cols-2 gap-2.5">
        <DiagramCard eyebrow="Discovery" title="Architecture Audit" note="Data boundaries & access permissions" status="muted" icon={FileSearch} />
        <DiagramCard eyebrow="Planning" title="Execution Roadmap" note="Prioritised pilots & tooling fit" status="green" icon={Workflow} />
      </div>
    </div>
  );
}

const VISUALS = {
  crm: CRMTopology,
  agent: AgentTopology,
  consultancy: ConsultancyTopology,
};

export default function ServiceVisual({ service }) {
  const Diagram = VISUALS[service.id] ?? VISUALS.agent;

  return (
    <div className="relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#14161A] to-[#0E0F12] p-5 text-white shadow-[0_20px_60px_rgba(20,22,26,0.20)] sm:min-h-[390px] sm:p-7 lg:min-h-[440px] lg:w-[48%] lg:shrink-0">
      <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[9px] font-medium tracking-wide text-white/90 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
          Service {service.number}
        </span>
        <span className="truncate font-mono text-[8px] text-white/40 sm:text-[10px]">{service.code}</span>
      </div>

      <div className="relative z-10 flex flex-1 items-center py-7 sm:py-8">
        <Diagram />
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[9px] text-white/60 sm:text-xs">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />{service.footer}</span>
        <span className="font-mono text-[8px] text-white/40 sm:text-[10px]">{service.footerMeta}</span>
      </div>
    </div>
  );
}
