export default function FlagshipCrmSection() {
  return (
    <section
      id="flagship-crm"
      className="flagship-crm-section relative py-28 px-6 lg:px-12 bg-[#FAF7F1] border-b border-[#14161A]/5"
      aria-labelledby="flagship-crm-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#FF9100]/25 text-[#A35D00] text-xs font-semibold tracking-wide uppercase mb-4">
            Product Showcase
          </div>
          <h2
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14161A] leading-tight mb-4"
            id="flagship-crm-title"
          >
            A closer look at our flagship CRM.
          </h2>
          <p className="text-lg text-[#5C616B] leading-relaxed">
            Engineered from the ground up for teams who demand deep operational
            context, real-time agent automation, and clear customer visibility.
          </p>
        </div>
        <div className="w-full rounded-3xl bg-gradient-to-b from-white to-[#F3EDE2]/60 p-4 lg:p-6 border border-[#14161A]/8 shadow-warm-lg mb-16">
          <div className="w-full rounded-2xl bg-[#14161A]/[0.02] border-2 border-dashed border-[#14161A]/15 py-24 lg:py-32 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#14161A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="w-20 h-20 rounded-2xl bg-white border border-[#FF9100]/30 shadow-warm-md flex items-center justify-center mb-6 text-[#FF9100]">
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FF9100]/30 text-[#A35D00] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF9100] animate-ping" />
              Flagship preview coming soon
            </div>
            <h3 className="text-2xl font-bold text-[#14161A] max-w-md mb-2">
              Next-generation intelligence interface in final review
            </h3>
            <p className="text-sm text-[#5C616B] max-w-lg leading-relaxed">
              High-resolution product screenshots and interactive workflow
              walkthroughs will be published following founder verification.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#A35D00] flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#14161A] mb-1.5">
              Lead management
            </h4>
            <p className="text-sm text-[#5C616B] leading-normal">
              Capture, qualify and automatically segment new leads into
              appropriate pipelines.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#A35D00] flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#14161A] mb-1.5">
              AI assistance
            </h4>
            <p className="text-sm text-[#5C616B] leading-normal">
              Automated conversation summaries and intelligent draft proposals
              for busy reps.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#A35D00] flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#14161A] mb-1.5">
              Sales pipeline
            </h4>
            <p className="text-sm text-[#5C616B] leading-normal">
              Visual deal progression with custom stages aligned to your unique
              sales cycle.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#A35D00] flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#14161A] mb-1.5">
              Follow-up workflows
            </h4>
            <p className="text-sm text-[#5C616B] leading-normal">
              Automated reminders and proactive alerts to keep every client
              dialogue active.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#A35D00] flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#14161A] mb-1.5">
              Connected tools
            </h4>
            <p className="text-sm text-[#5C616B] leading-normal">
              Direct bi-directional sync with email, calendar, messaging, and
              cloud documents.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] text-[#A35D00] flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#14161A] mb-1.5">
              Team visibility
            </h4>
            <p className="text-sm text-[#5C616B] leading-normal">
              Real-time activity logs and role-based permissions for clean
              executive oversight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
