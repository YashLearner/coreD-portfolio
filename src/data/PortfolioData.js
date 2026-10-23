


export const brand = {
  name: "CoreD",
  href: "#hero",
};


// Footer navigation links
export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "See Our Work",
    href: "/seeOurWork",
  },
  {
    label: "Case Studies",
    href: "/case-studies"
  },
  {
    label: "Terms & Condition",
    href: "/termsCondition"
  }

];



export const workflow = [
  {
    number: "01",
    title: "Capture every lead",
    description:
      "Bring website enquiries, emails, and prospects into one organised workspace.",
  },
  {
    number: "02",
    title: "Qualify with AI",
    description:
      "Prioritise opportunities using intelligent lead scoring and smart routing.",
  },
  {
    number: "03",
    title: "Follow up on time",
    description:
      "Automate reminders and follow-ups to keep customer conversations moving.",
  },
  {
    number: "04",
    title: "Track your progress",
    description:
      "Monitor pipeline performance, team activity, and business outcomes.",
  },
];

export const cases = [
  {
    name: "Retail chain",
    stat: "3x",
    text: "faster lead follow-up after switching to AI agents.",
  },
  {
    name: "Education group",
    stat: "40%",
    text: "more admissions enquiries converted.",
  },
  {
    name: "Logistics firm",
    stat: "12 hrs",
    text: "saved per week on manual data entry.",
  },
];


// External platform links
export const socialLinks = [
  {
    platform: "LinkedIn",
    // url: "https://www.linkedin.com/",
    label: "Visit CoreD on LinkedIn",
  },
  {
    platform: "GitHub",
    // url: "https://github.com/",
    label: "Visit CoreD on GitHub",
  },
  {
    platform: "Website",
    // url: "https://your-website.com",
    label: "Visit the CoreD website",
  },
];

export const footer = {
  copyrightNotice: "© 2026 CoreD. All rights reserved.",
  contact: {
    label: "Contact us",
    href: "#contact",
  },
};

// Footer text and labels
export const footerCopy = {
  description:
    "Add your CoreD platform description here.",

  navigationTitle: "Navigation",
  connectTitle: "Connect with us",
  copyrightNotice: "© 2026 CoreD. All rights reserved.",
  backToTop: "Back to top",
};

export const services = {
  'gpt-services': {
    title: 'GPT Services', lead: 'Custom GPT assistants trained on your business data, wired into your CRM.',
    points: ['Custom GPT chat assistants for sales and support', 'Knowledge-base search over your documents', 'Lead summaries and email drafts inside the CRM', 'Prompt design, evaluation and guardrails']
  },
  'cyber-security': {
    title: 'Cyber Security', lead: 'Security checks built into every CRM we ship, from code to cloud.',
    points: ['Vulnerability assessment and penetration testing (VAPT)', 'Secrets, dependency and static code scanning', 'Role-based access and audit logs', 'Incident response playbooks']
  },
  'ai-crm': {
    title: 'AI Agent Based CRM', lead: 'A CRM where AI agents capture leads, follow up and update records for you.',
    points: ['Lead capture and auto-qualification', 'Follow-up agents for email, WhatsApp and calls', 'Pipeline dashboards with live forecasts', 'Integrations with your existing tools']
  },
  'cloud-devops': {
    title: 'Cloud Solution & DevOps', lead: 'Reliable hosting, CI/CD and monitoring so your CRM stays fast and online.',
    points: ['AWS / Azure / GCP setup and migration', 'CI/CD pipelines and automated testing', 'Docker and Kubernetes deployments', 'Monitoring, backups and cost control']
  },
}

export const caseStudies = [

  {
    id: "adsmark01MarketingCRM",
    client: "Adsmark01",
    category: "AI Marketing CRM",

    title: "From Enquiry to Discovery, All in One Workflow.",

    summary:
      "An agency CRM dashboard designed to organize incoming enquiries, qualify marketing leads, coordinate follow-ups, and manage discovery-call handoffs.",

    problemTitle: "The Challenge",

    problem:
      "Agencies need a reliable way to qualify enquiries, assign owners, and track follow-ups. When lead details, outreach drafts, and booking updates are scattered, teams can miss pending actions and lose visibility into each enquiry's status.",

    solutionTitle: "Our Solution",

    solution:
      "CoreD designed an AI marketing CRM workflow that takes enquiries from capture through qualification, team review, and discovery-call handoff. The dashboard organizes lead details, service requirements, budgets, timelines, and activity history in one place. Its staged workflow tracks duplicate checks, owner assignment, and follow-up preparation. Email drafts support review before sending, while WhatsApp options and dispatch safeguards help coordinate outreach. Booking status keeps pending confirmations distinct from completed scheduling steps.",
    features: [
      {
        title: "Enquiry Management",
        description:
          "Bring incoming enquiries and relevant client details into a centralized workspace.",
      },
      {
        title: "Lead Qualification",
        description:
          "Review requested services, budgets, and expected start dates.",
      },
      {
        title: "Workflow Tracking",
        description:
          "Follow each stage from enquiry receipt through team review and booking handoff.",
      },
      {
        title: "Follow-up Drafts",
        description:
          "Review email and WhatsApp follow-up workflows before contacting a lead.",
      },
    ],

    screenshots: [
      {
        src: "/Images/AdsMark01.png",
        alt:
          "Adsmark01 AI marketing CRM dashboard showing enquiry qualification, workflow stages, and follow-up review",
        label: "Dashboard",
        caption:
          "Enquiry qualification, follow-up approval, workflow tracking, and discovery-call handoff.",
      },

      {
        src: "/Images/AdsMark02.png",
        alt:
          "Adsmark01 AI marketing CRM dashboard showing enquiry qualification, workflow stages, and follow-up review",
        label: "AI Workflow",
        caption:
          "Enquiry qualification, follow-up approval, workflow tracking, and discovery-call handoff.",
      },

      {
        src: "/Images/AdsMark01.png",
        alt:
          "Adsmark01 AI marketing CRM dashboard showing enquiry qualification, workflow stages, and follow-up review",
        label: "Growth Overview",
        caption:
          "Enquiry qualification, follow-up approval, workflow tracking, and discovery-call handoff.",
      },
    ],

    result:
      "A structured CRM interface that brings lead qualification, communication review, workflow progress, and booking status into one workspace.",
  },

  {
    id: "crawl-digitally-crm",
    client: "Crawl Digitally",
    category: "CRM Development",
    // website: "https://www.crawldigitally.com/",

    title: "One CRM. A Clearer View of Every Lead.",

    summary:
      "A centralized CRM built to bring lead management, sales opportunities, pipeline visibility, and follow-up workflows into one workspace.",

    problemTitle: "Their Problem",

    problem:
      "Lead details, sales opportunities, and follow-ups can become scattered across tools. Without clear pipeline and lead-source visibility, teams may struggle to identify pending actions and keep every opportunity moving.",

    solutionTitle: "Our Solution",

    solution:
      "CoreD developed a centralized CRM bringing lead management, sales opportunities, and follow-up coordination into one workspace. Teams can review lead details, track active and closed deals, and compare enquiries from organic, paid, and referral sources. Follow-up tracking highlights pending tasks, unassigned leads, and proposals awaiting review. An AI Co-pilot concept surfaces suggested next steps for approval, improving pipeline visibility, organizing sales activity, and supporting smoother hand-offs between marketing and sales.",
    features: [
      { title: "Lead Management" },
      { title: "Sales Pipeline" },
      { title: "Lead-Source Analytics" },
      { title: "Follow-up Tracking" },
      { title: "AI Co-pilot" },
    ],
    features: [
      {
        title: "Lead Management",
        description:
          "Organize incoming enquiries and review lead activity from a single dashboard.",
      },
      {
        title: "Sales Pipeline",
        description:
          "Get an overview of active opportunities, closed deals, and pipeline value.",
      },
      {
        title: "Lead-Source Analytics",
        description:
          "Compare enquiries across organic traffic, paid advertising, and referrals.",
      },
      {
        title: "Follow-up Tracking",
        description:
          "Identify pending follow-ups, proposals awaiting review, and unassigned enquiries.",
      },
      {
        title: "AI Co-pilot",
        description:
          "Surface suggested next actions and proposal-review tasks for team approval.",
      },
    ],

    screenshots: [
      {
        src: "/public/Images/Crawl01.png",
        alt: "Crawl Digitally CRM dashboard",
        label: "Dashboard",
        caption: "CRM dashboard overview",
      },
      {
        src: "/public/Images/Crawl03.png",
        alt: "CRM lead management page",
        label: "Leads",
        caption: "Lead management",
      },
      {
        src: "/public/Images/Crawl02.png",
        alt: "CRM follow-up page",
        label: "AI Follow-ups",
        caption: "Follow-up management",
      },
    ],

    result:
      "One workspace for reviewing leads, monitoring opportunities, and organizing follow-up activities.",
  },



  {
    id: "nextTechWavesCRM",
    client: "NextTechWaves",
    category: "Education CRM",

    title: "Simplifying Student Fees and Campus Communication.",

    summary:
      "An education CRM dashboard designed to manage student fee records, monitor outstanding balances, and coordinate campus communications from one workspace.",

    problemTitle: "Their Problem",

    problem:
      "Educational institutions need an organized way to track student payments, identify outstanding fees, and communicate with students. Managing fee records and reminders separately can make payment follow-ups and campus updates harder to coordinate.",

    solutionTitle: "Our Solution",

    solution:
      "CoreD designed an education CRM dashboard that centralizes student fee records, invoice tracking, payment balances, and due dates. The interface highlights outstanding payments and collection summaries, helping staff identify accounts that need attention. A dedicated communication workspace supports fee reminders and campus announcements with reviewable message drafts. The reminder workflow includes balance rechecks, audience selection, staff approval, and safeguards to pause reminders after payment, supporting more controlled communication and payment follow-ups.",

    features: [
      {
        title: "Student Fee Ledger",
        description:
          "Review course fees, payments received, outstanding balances, and due dates.",
      },
      {
        title: "Fee Collection Overview",
        description:
          "Monitor billed amounts, realized collections, and outstanding balances.",
      },
      {
        title: "Invoice Management",
        description:
          "Identify student dues and access invoice-related actions from the ledger.",
      },
      {
        title: "Communication Workspace",
        description:
          "Prepare fee reminders and campus announcements using organized message drafts.",
      },
      {
        title: "Reminder Workflow",
        description:
          "Track balance checks, audience selection, draft preparation, and staff review.",
      },
      {
        title: "Dispatch Safeguards",
        description:
          "Represent payment rechecks, payment-triggered pauses, and business-hour delivery rules.",
      },
    ],

    screenshots: [
      {
        src: "/Images/NextTech01.png",
        alt:
          "NextTechWaves Education CRM dashboard displaying student fee records, payment balances, communication drafts, and reminder workflow",
        label: "Fees & Communication",
        caption:
          "Education CRM dashboard for fee tracking, student communication, and reminder review.",
      },

      {
        src: "/Images/NextTech02.png",
        alt:
          "NextTechWaves Education CRM dashboard displaying student fee records, payment balances, communication drafts, and reminder workflow",
        label: "Fees & Communication",
        caption:
          "Education CRM dashboard for fee tracking, student communication, and reminder review.",
      },

      {
        src: "/Images/NextTech03.png",
        alt:
          "NextTechWaves Education CRM dashboard displaying student fee records, payment balances, communication drafts, and reminder workflow",
        label: "Fees & Communication",
        caption:
          "Education CRM dashboard for fee tracking, student communication, and reminder review.",
      },
    ],

    result:
      "A unified education CRM interface for reviewing student dues, tracking collections, preparing communications, and coordinating controlled fee-reminder workflows.",
  },


];


export const posts = [
  { t: 'How an AI agent based CRM works', d: 'A plain walk-through from lead capture to follow-up.' },
  { t: 'CRM security checklist for small teams', d: 'Seven checks to run before you go live.' },
  { t: 'When to move your CRM to the cloud', d: 'Cost, speed and risk, compared.' },
]


export const testimonials = [
 {
    review:
      "CoreD designed an AI-powered marketing CRM to streamline lead management from enquiry capture to discovery-call handoff. Its centralized dashboard organizes lead details, service requirements, budgets, timelines, and activity history in one place.",
    name: "Adsmark01",
    initials: "OL",
    role: "Product Growth",
    company: "CRM & AI Automation",
  },
  {
        review:
      "CoreD designed an education CRM dashboard that centralizes student fee records, invoice tracking, payment balances, and due dates. The interface highlights outstanding payments and collection summaries, helping staff identify accounts that need attention. ",
    name: "Crawl Digitally  ",
    initials: "TP",
    role: "Systems Integration",
    company: "Business Operations",
  },
  {
    review:
      "CoreD designed an education CRM dashboard that centralizes student fee records, invoice tracking, payment balances, and due dates. The interface highlights outstanding payments and collection summaries, helping staff identify accounts that need attention.",
    name: "NextTechWaves",
    initials: "PS",
    role: "Client Team",
    company: "Workflow Automation",
  },

]



//terms & condition section

export const termsSections = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the CoreDhristi website, you agree to follow these Terms & Conditions and applicable laws. If you do not agree with these terms, please discontinue use of the website.",
    ],
  },
  {
    title: "Website and Portfolio Information",
    paragraphs: [
      "This website presents information about CRM solutions, AI agents, automation systems, development services, and related projects. Portfolio examples, screenshots, demonstrations, and descriptions are provided for informational purposes. They may not represent the exact features, scope, or results of every client project.",
    ],
  },
  {
    title: "CRM, AI and Automation Services",
    paragraphs: [
      "Our services may include AI Based CRM, AI Agent CRM, Custom CRM development, workflow automation, integrations, consultation, and related technology services. The actual features, deliverables, timeline, support arrangements, and project scope will be defined in the applicable proposal or written agreement.",
    ],
  },
  {
    title: "AI Outputs and Service Limitations",
    paragraphs: [
      "AI-generated content, recommendations, automated decisions, and workflow outputs may contain errors or require human review. You are responsible for reviewing outputs before relying on them for important business decisions. Unless expressly agreed in writing, we do not guarantee specific revenue, conversion, productivity, or business results.",
    ],
  },
  {
    title: "Customer Responsibilities",
    paragraphs: [
      "You agree to provide accurate project information, use the services lawfully, and ensure that you have the necessary rights and permissions for any data, content, or materials you provide. You must not use our website or services to violate applicable laws, infringe third-party rights, or disrupt systems.",
    ],
  },
  {
    title: "Privacy and Data Protection",
    paragraphs: [
      "When you submit a contact or project enquiry, we may use the information you provide, including your name or company details, email address, phone number, selected service, budget, and project description, to respond to your enquiry and manage communications. Enquiry information may be processed through spreadsheet, email, and related service providers.",
      "Our Privacy Policy explains how personal information is collected, used, stored, shared, retained, and protected, as well as applicable rights and contact procedures. Please avoid submitting passwords, payment credentials, or unnecessary sensitive information through general enquiry forms.",
    ],
  },
  {
    title: "Third-Party Services and Integrations",
    paragraphs: [
      "CRM implementations may depend on third-party platforms, APIs, cloud services, communication tools, or other integrations. These services may be subject to their own terms, privacy policies, availability requirements, and charges. Third-party changes or outages may affect integrated functionality.",
    ],
  },
  {
    title: "Pricing, Payments and Cancellations",
    paragraphs: [
      "Pricing, payment schedules, taxes, subscriptions, project milestones, cancellation terms, refunds, and additional charges will be specified in the relevant quotation, proposal, invoice, or written agreement. A website enquiry alone does not establish a paid subscription or guarantee acceptance of a project.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, website text, branding, graphics, designs, and original portfolio materials are owned by or licensed to their respective rights holders. You may not copy, reproduce, redistribute, or commercially exploit these materials without appropriate permission. Ownership and licensing of custom project deliverables will be determined by the applicable written agreement.",
    ],
  },
  {
    title: "Confidential Information",
    paragraphs: [
      "Please do not submit confidential business information, production credentials, or sensitive customer records through a general contact form. Confidentiality obligations for a specific project should be documented in an appropriate written agreement where required.",
    ],
  },
  {
    title: "Website Availability and Changes",
    paragraphs: [
      "We may update website content, service descriptions, portfolio materials, or website functionality from time to time. We aim to maintain availability but cannot guarantee uninterrupted access or the absence of every technical error.",
    ],
  },
  {
    title: "Warranties and Limitation of Liability",
    paragraphs: [
      "Website information is provided for general informational purposes and should not be treated as a guarantee of service performance or business outcomes. Any service warranties, remedies, and liability limitations should be set out in the relevant written agreement and apply only to the extent permitted by applicable law.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may revise these Terms & Conditions when our website, services, or applicable requirements change. Updated terms will be published on this page with a revised update date. Continued use after changes take effect will be subject to applicable law and any requirements for notice or acceptance.",
    ],
  },
  {
    title: "Governing Law and Disputes",
    paragraphs: [
      "These terms are subject to the laws and jurisdiction specified in the final published version, to the extent permitted by applicable law. The appropriate governing location and dispute-resolution process should be confirmed before publication.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: [
      "If you have questions about these Terms & Conditions, project scope, or our services, please contact the CoreDhristi team through our Contact Us page.",
    ],
    contact: true,
  },
];



