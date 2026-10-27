export default function CrmWorkflowSection() {
  return (
    <section
      id="crm-workflow"
      className="crm-workflow-section relative py-28 px-6 lg:px-12 border-b border-[#14161A]/5"
      aria-labelledby="crm-workflow-title"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF9100]/5 rounded-full blur-3xl pointer-events-none -mr-20" />
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#FF9100]/25 text-[#A35D00] text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9100] animate-pulse" />
          Intelligent Architecture
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2
              className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14161A] leading-[1.15] mb-5"
              id="crm-workflow-title"
            >
              From first enquiry to the next conversation.
            </h2>
            <p className="text-lg text-[#5C616B] leading-relaxed mb-10 max-w-xl">
              Bring your leads, customer context and follow-ups into one
              connected workflow.
            </p>
            <div className="space-y-4">
              <div className="group p-5 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF3E0] text-[#A35D00] font-bold text-sm flex items-center justify-center border border-[#FF9100]/20 group-hover:bg-[#FF9100] group-hover:text-white transition-colors duration-300">
                    01
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14161A] mb-1 group-hover:text-[#A35D00] transition-colors">
                      Capture enquiries
                    </h3>
                    <p className="text-sm text-[#5C616B] leading-normal">
                      Bring leads from connected forms and communication
                      channels into the CRM.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group p-5 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF3E0] text-[#A35D00] font-bold text-sm flex items-center justify-center border border-[#FF9100]/20 group-hover:bg-[#FF9100] group-hover:text-white transition-colors duration-300">
                    02
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14161A] mb-1 group-hover:text-[#A35D00] transition-colors">
                      Understand the opportunity
                    </h3>
                    <p className="text-sm text-[#5C616B] leading-normal">
                      AI helps summarise requirements and organise the
                      information your team needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group p-5 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF3E0] text-[#A35D00] font-bold text-sm flex items-center justify-center border border-[#FF9100]/20 group-hover:bg-[#FF9100] group-hover:text-white transition-colors duration-300">
                    03
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14161A] mb-1 group-hover:text-[#A35D00] transition-colors">
                      Prepare the follow-up
                    </h3>
                    <p className="text-sm text-[#5C616B] leading-normal">
                      Create relevant message drafts, reminders and suggested
                      next actions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group p-5 rounded-2xl bg-white border border-[#14161A]/8 shadow-warm-sm hover:shadow-warm-md hover:border-[#FF9100]/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF3E0] text-[#A35D00] font-bold text-sm flex items-center justify-center border border-[#FF9100]/20 group-hover:bg-[#FF9100] group-hover:text-white transition-colors duration-300">
                    04
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14161A] mb-1 group-hover:text-[#A35D00] transition-colors">
                      Hand over with context
                    </h3>
                    <p className="text-sm text-[#5C616B] leading-normal">
                      Your team reviews, speaks to the customer and moves the
                      opportunity forward.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="crm-lifecycle-funnel w-full max-w-lg relative p-8 rounded-3xl bg-gradient-to-b from-[#F3EDE2]/80 to-[#FAF7F1] border border-[#14161A]/6 shadow-warm-lg">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#14161A_1px,transparent_1px)] [background-size:16px_16px] rounded-3xl pointer-events-none" />
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#14161A]/6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF9100]" />
                  <span className="text-xs font-semibold text-[#14161A] uppercase tracking-wider">
                    Connected Lifecycle Funnel
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-white border border-[#14161A]/8 text-[#5C616B] font-mono">
                  Agent-Synchronized
                </span>
              </div>
              <div className="relative flex flex-col items-center gap-5 py-4">
                <div className="w-full relative group">
                  <div className="w-full py-4 px-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#14161A]/10 shadow-warm-sm flex items-center justify-between transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF7F1] border border-[#14161A]/8 flex items-center justify-center text-xs font-bold text-[#14161A]">
                        1
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#14161A]">
                          Multi-Channel Ingestion
                        </div>
                        <div className="text-[11px] text-[#5C616B]">
                          Webhooks, inbox, WhatsApp, API calls
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F1] text-[#5C616B] border border-[#14161A]/5">
                      Step 01
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-gradient-to-b from-[#14161A]/20 to-[#FF9100]/40 mx-auto" />
                </div>
                <div className="w-[90%] relative group">
                  <div className="w-full py-4 px-6 rounded-2xl bg-[#FFFDF8] border border-[#FF9100]/25 shadow-warm-sm flex items-center justify-between transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#FFF3E0] border border-[#FF9100]/30 flex items-center justify-center text-xs font-bold text-[#A35D00]">
                        2
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#14161A]">
                          Context &amp; Synthesis
                        </div>
                        <div className="text-[11px] text-[#5C616B]">
                          Requirement extraction &amp; opportunity scoring
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF3E0] text-[#A35D00] border border-[#FF9100]/20">
                      Step 02
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-gradient-to-b from-[#FF9100]/40 to-[#FF9100]/60 mx-auto" />
                </div>
                <div className="w-[78%] relative group">
                  <div className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#FFF3E0] to-[#FFE8C2] border border-[#FF9100]/40 shadow-warm-md flex items-center justify-between transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#FF9100]/40 flex items-center justify-center text-xs font-bold text-[#A35D00]">
                        3
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#14161A]">
                          Smart Action Drafts
                        </div>
                        <div className="text-[11px] text-[#A35D00]">
                          Personalized email &amp; next touchpoints
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#A35D00]">
                      Step 03
                    </span>
                  </div>
                  <div className="w-0.5 h-4 bg-gradient-to-b from-[#FF9100]/60 to-[#FF9100] mx-auto" />
                </div>
                <div className="w-[66%] relative group">
                  <div className="w-full py-4 px-5 rounded-2xl bg-[#FF9100] text-white shadow-glow-orange flex items-center justify-between transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white text-[#FF9100] flex items-center justify-center text-xs font-extrabold shadow-xs">
                        4
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Live Team Handover
                        </div>
                        <div className="text-[10px] text-white/90">
                          Closing-ready briefing
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#14161A]/6 flex items-center justify-between text-xs text-[#5C616B]">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-[#A35D00]"
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
                  Continuous contextual memory
                </span>
                <span className="font-medium text-[#14161A]">
                  Zero manual copy-pasting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
