
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
    shortDescription: "We developed a centralized CRM for leads, pipeline and follow-ups.",


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
        src: "/Images/Crawl01.png",
        alt: "Crawl Digitally CRM dashboard",
        label: "Dashboard",
        caption: "CRM dashboard overview",
      },
      {
        src: "/Images/Crawl03.png",
        alt: "CRM lead management page",
        label: "Leads",
        caption: "Lead management",
      },
      {
        src: "/Images/Crawl02.png",
        alt: "CRM follow-up page",
        label: "AI Follow-ups",
        caption: "Follow-up management",
      },
    ],

    result:
      "One workspace for reviewing leads, monitoring opportunities, and organizing follow-up activities.",
  },

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

    shortDescription: "We built an AI marketing CRM for enquiry qualification and follow-ups.",


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
        src: "/Images/AdsMark03.png",
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


    shortDescription: "We designed an education CRM for fee tracking and student communication.",

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
export const team = [
  { n: 'Team Member 1', r: 'Founder & CEO' }, { n: 'Team Member 2', r: 'Lead Engineer' },
  { n: 'Team Member 3', r: 'AI Engineer' }, { n: 'Team Member 4', r: 'UI/UX Designer' },
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




