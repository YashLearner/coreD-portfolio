export default function CrmImportanceSection() {
  return (
    <section
      id="crm-importance"
      className="crm-importance-section relative py-28 px-6 lg:px-12 bg-[#F3EDE2]/60 border-b border-[#14161A]/5"
      aria-labelledby="crm-importance-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#14161A]/8 text-[#A35D00] text-xs font-semibold tracking-wide uppercase mb-4 shadow-warm-sm">
            Operational Advantage
          </div>
          <h2
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14161A] leading-tight mb-4"
            id="crm-importance-title"
          >
            One connected CRM. More room to grow.
          </h2>
          <p className="text-lg text-[#5C616B] leading-relaxed">
            Give your team shared context, clearer ownership and a practical
            next step for every customer conversation.
          </p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="crm-importance-card lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-[#14161A]/8 shadow-warm-md flex flex-col justify-between hover:shadow-warm-lg transition-all duration-300">
              <div className="crm-illustration w-full h-56 rounded-2xl bg-gradient-to-br from-[#FAF7F1] to-[#F3EDE2] border border-[#14161A]/6 p-5 mb-8 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#14161A]/8">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14161A]/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14161A]/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14161A]/20" />
                    <span className="ml-2 text-xs font-bold text-[#14161A]">
                      Unified Account Feed
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-[#A35D00] border border-[#FF9100]/25">
                    Auto-Merged
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 my-auto">
                  <div className="p-3 bg-white rounded-xl border border-[#14161A]/6 shadow-xs">
                    <div className="text-[10px] font-bold text-[#A35D00] uppercase">
                      Email Thread
                    </div>
                    <div className="text-xs font-medium text-[#14161A] mt-1 truncate">
                      Quote inquiry from Maya
                    </div>
                    <div className="text-[10px] text-[#5C616B] mt-0.5">
                      2 min ago
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#14161A]/6 shadow-xs">
                    <div className="text-[10px] font-bold text-[#FF9100] uppercase">
                      WhatsApp Chat
                    </div>
                    <div className="text-xs font-medium text-[#14161A] mt-1 truncate">
                      Sent PDF proposal
                    </div>
                    <div className="text-[10px] text-[#5C616B] mt-0.5">
                      14 min ago
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#14161A]/6 shadow-xs">
                    <div className="text-[10px] font-bold text-[#14161A] uppercase">
                      Form Submission
                    </div>
                    <div className="text-xs font-medium text-[#14161A] mt-1 truncate">
                      Enterprise RFP form
                    </div>
                    <div className="text-[10px] text-[#5C616B] mt-0.5">
                      Today 10:30 AM
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur rounded-xl px-4 py-2.5 border border-[#FF9100]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF9100] animate-pulse" />
                    <span className="text-xs font-semibold text-[#14161A]">
                      Single Golden Profile synthesized across all channels
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#A35D00]">
                    100% Synced
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#14161A] mb-2">
                  Your customer context, together
                </h3>
                <p className="text-base text-[#5C616B] leading-relaxed">
                  Keep lead details, conversation history and next actions
                  connected.
                </p>
              </div>
            </div>
            <div className="crm-importance-card lg:col-span-5 bg-white rounded-3xl p-8 lg:p-10 border border-[#14161A]/8 shadow-warm-md flex flex-col justify-between hover:shadow-warm-lg transition-all duration-300">
              <div className="crm-illustration w-full h-56 rounded-2xl bg-gradient-to-br from-[#FAF7F1] to-[#FFF3E0]/50 border border-[#14161A]/6 p-4 mb-8 flex flex-col justify-center space-y-2.5 overflow-hidden">
                <div className="bg-white p-3 rounded-xl border border-[#14161A]/6 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#FAF7F1] text-[#14161A] font-bold text-xs flex items-center justify-center border border-[#14161A]/10">
                      1
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#14161A]">
                        AI Draft Generated
                      </div>
                      <div className="text-[11px] text-[#5C616B]">
                        Personalized reply based on pricing notes
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#A35D00] bg-[#FFF3E0] px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#FF9100]/30 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#FF9100] text-white font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#14161A]">
                        Account Exec Review
                      </div>
                      <div className="text-[11px] text-[#5C616B]">
                        One-click approve or edit nuance
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-[#FF9100] px-2 py-0.5 rounded">
                    Pending
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#14161A]/6 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#FAF7F1] text-[#5C616B] font-bold text-xs flex items-center justify-center border border-[#14161A]/10">
                      3
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#14161A]">
                        Scheduled Follow-Up Alert
                      </div>
                      <div className="text-[11px] text-[#5C616B]">
                        Automatic trigger if unread in 48 hours
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-[#5C616B] bg-[#FAF7F1] px-2 py-0.5 rounded">
                    Queued
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#14161A] mb-2">
                  Follow-ups that stay on track
                </h3>
                <p className="text-base text-[#5C616B] leading-relaxed">
                  Help your team prepare the next conversation before an
                  opportunity goes quiet.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="crm-importance-card lg:col-span-5 bg-white rounded-3xl p-8 lg:p-10 border border-[#14161A]/8 shadow-warm-md flex flex-col justify-between hover:shadow-warm-lg transition-all duration-300">
              <div className="crm-illustration w-full h-56 rounded-2xl bg-gradient-to-br from-[#FAF7F1] to-[#F3EDE2] border border-[#14161A]/6 p-5 mb-8 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#FF9100]/30 shadow-warm-md flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[#FF9100]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-[#14161A]/6 text-xs">
                    <span className="font-medium text-[#14161A]">
                      Lead Owner: Field Sales
                    </span>
                    <span className="text-[10px] font-bold text-[#A35D00] bg-[#FFF3E0] px-2 py-0.5 rounded">
                      Full Edit
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-[#14161A]/6 text-xs">
                    <span className="font-medium text-[#14161A]">
                      Operations &amp; Support
                    </span>
                    <span className="text-[10px] font-medium text-[#5C616B] bg-[#FAF7F1] px-2 py-0.5 rounded">
                      Read Only
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#14161A] mb-2">
                  Clear ownership and access
                </h3>
                <p className="text-base text-[#5C616B] leading-relaxed">
                  Define who can access information and who is responsible for
                  the next step.
                </p>
              </div>
            </div>
            <div className="crm-importance-card lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-[#14161A]/8 shadow-warm-md flex flex-col justify-between hover:shadow-warm-lg transition-all duration-300">
              <div className="crm-illustration w-full h-56 rounded-2xl bg-gradient-to-br from-[#FAF7F1] to-[#F3EDE2] border border-[#14161A]/6 p-5 mb-8 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF9100]" />
                    <span className="text-xs font-bold text-[#14161A]">
                      Integrated Workspace View
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-white text-[10px] font-medium border border-[#14161A]/8 text-[#5C616B]">
                      Gmail
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-[10px] font-medium border border-[#14161A]/8 text-[#5C616B]">
                      Slack
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-[10px] font-medium border border-[#14161A]/8 text-[#5C616B]">
                      WhatsApp
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FFF3E0] text-[10px] font-bold border border-[#FF9100]/30 text-[#A35D00]">
                      +3 more
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#14161A]/8 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#5C616B] pb-1.5 border-b border-[#14161A]/5">
                    <span>
                      Drafting follow-up to
                      <strong className="text-[#14161A]">
                        Indiganic Procurement
                      </strong>
                    </span>
                    <span className="text-[10px] text-[#A35D00] font-semibold">
                      AI Assistant active
                    </span>
                  </div>
                  <p className="text-xs text-[#14161A] mt-2 italic bg-[#FAF7F1] p-2 rounded-lg border border-[#14161A]/5">
                    "Hi Rohan, following up on our demonstration yesterday
                    regarding the customized inventory pipeline..."
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#5C616B]">
                  <span>
                    Action dispatched across CRM &amp; Mailbox in 1 click
                  </span>
                  <span className="font-bold text-[#14161A]">
                    Zero context fragmentation
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#14161A] mb-2">
                  Less switching between tools
                </h3>
                <p className="text-base text-[#5C616B] leading-relaxed">
                  Bring everyday customer work into a workflow your team can
                  follow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
