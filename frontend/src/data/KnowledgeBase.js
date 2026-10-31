/**
 * Business content for the CoreD website assistant.
 *
 * This file holds content only. It contains no UI and no matching logic, so
 * adding or changing an answer never requires touching the components.
 *
 * FAQ entry schema
 * ----------------
 *   id         Unique, stable, kebab-case. Suggested questions and tests refer to it.
 *   category   Free-form group name, for maintenance only.
 *   questions  Natural ways a visitor might ask. English and Hinglish are fine.
 *   keywords   Short topic phrases, matched like extra, lower-weight questions.
 *              Avoid single generic words such as "crm" or "cored".
 *   answer     Plain text. It is rendered as text, never as HTML. Use "\n" for line breaks.
 *   action     Optional. "contact" shows a button that jumps to the Contact section.
 *
 * Accuracy rule
 * -------------
 * Only the following are confirmed business facts:
 *   - CoreD provides CRM services to businesses.
 *   - CoreD offers custom CRM and AI-agent-based CRM solutions.
 *   - Basic is structured around one AI agent.
 *   - Standard is structured around three AI agents.
 *   - Custom CRM solutions are tailored to a client's needs.
 * Do not add prices, feature lists, agent responsibilities, integrations, channels,
 * security claims, timelines, metrics, emails or URLs until they are verified.
 */

/**
 * The only contact route that is currently verified: the "Contact us" link in the
 * site footer (footer.contact.href in PortfolioData.js). Keep the two in sync.
 */



import { expandedKnowledgeBase } from "./knowledgebaseExpanded";


export const contactChannel = {
  label: "Contact CoreD",
  href: "#contact",
};

export const assistantCopy = {
  name: "CoreD Assistant",
  tagline: "CRM & AI-agent solutions",
  chatLabel: "CoreD assistant chat",
  inputLabel: "Ask a question about CoreD's CRM services",
  inputPlaceholder: "Ask about CoreD's CRM services...",
  welcome:
    "Hi, I'm the CoreD assistant. Ask me about our CRM services, the Basic, Standard and Custom CRM options, or how AI agents fit into a CRM.",
  fallback: {
    content:
      "I don't have verified information on that yet. I can help with what CoreD does, the Basic, Standard and Custom CRM options, how AI agents fit into a CRM, and how to discuss your requirements. For anything else, please use the Contact us option so the CoreD team can answer directly.",

    alternatives: [
      "I'm not fully sure about that, and I don't want to give you incorrect information. You can ask me about CoreD's CRM solutions, AI agents, or available plans. For other queries, please contact the CoreD team.",

      "That's a good question! I don't have a verified answer for it right now. I can explain CoreD's CRM services, the Basic and Standard plans, or Custom CRM solutions. For further details, please reach out through Contact us.",

      "I don't have enough confirmed information to answer that accurately. The CoreD team can help clarify your specific requirements. You can also ask me about our CRM options, AI-agent-based solutions, and custom CRM development."
    ],

    action: "contact",
  },
  // faqId points at an entry below. If an id is ever removed, the label is
  // matched like a typed question instead, so a stale id cannot break the chat.
  suggestions: [
    { faqId: "what-is-cored", label: "What does CoreD do?" },
    { faqId: "plans-overview", label: "What plans do you offer?" },
    { faqId: "basic-vs-standard", label: "Basic vs Standard?" },
    { faqId: "custom-crm", label: "Can you build a custom CRM?" },
    { faqId: "pricing", label: "How do I get pricing?" },
  ],
};
const existingKnowledgeBase = [
  /* ------------------------------ Conversation ----------------------------- */
  {
    id: "greeting",
    category: "conversation",
    questions: [
      "Hi",
      "Hello",
      "Hey",
      "Hey there",
      "Good morning",
      "Good afternoon",
      "Good evening",
      "Namaste",
    ],
    keywords: [],
    answer:
      "Hello! What would you like to know about CoreD's CRM services, our plans, or how AI agents fit into a CRM?",
  },
  {
    id: "thanks",
    category: "conversation",
    questions: [
      "Thanks",
      "Thank you",
      "Thanks a lot",
      "Thank you so much",
      "Thanks for the help",
      "Shukriya",
      "Dhanyavad",
    ],
    keywords: [],
    answer:
      "You're welcome! If you have more questions about CoreD's CRM services or plans, just ask.",
  },
  {
    id: "goodbye",
    category: "conversation",
    questions: ["Bye", "Goodbye", "Bye bye", "See you later", "Alvida"],
    keywords: [],
    answer:
      "Thanks for stopping by. When you're ready to talk through your requirements, the Contact us option on this website is the best place to start.",
    action: "contact",
  },
  {
    id: "assistant-identity",
    category: "conversation",
    questions: [
      "Who are you?",
      "Are you a bot?",
      "Are you a human?",
      "Are you a real person?",
      "Am I talking to an AI?",
      "Is this chat powered by AI?",
      "What can you do?",
      "What can you help me with?",
      "How do you work?",
      "Aap kaun ho?",
      "Tum kaun ho?",
    ],
    keywords: ["talk to a human", "speak to a person", "real person"],
    answer:
      "I'm the CoreD website assistant, a program rather than a person. I answer from a prepared set of information about CoreD's CRM services and plans, so I can explain the Basic, Standard and Custom CRM options, but I can't assess your business or give a technical recommendation. For anything beyond that, the CoreD team can help directly.",
    action: "contact",
  },

  /* -------------------------------- Company -------------------------------- */
  {
    id: "what-is-cored",
    category: "company",
    questions: [
      "CoreD",
      "What is CoreD?",
      "What does CoreD do?",
      "Tell me about CoreD",
      "Who is CoreD?",
      "What is your company about?",
      "What do you do?",
      "Tell me about your company",
      "CoreD kya hai?",
      "CoreD kya karta hai?",
      "CoreD ke baare mein batao",
    ],
    keywords: ["company overview", "about your company"],
    answer:
      "CoreD provides CRM services to businesses. We help companies organise their workflows through CRM solutions, including custom CRM development and AI-agent-based CRM systems. You can ask me about our plans, how AI agents fit into a CRM, or how to discuss your requirements with the team.",
  },
  {
    id: "services-overview",
    category: "company",
    questions: [
      "What services does CoreD provide?",
      "What services do you offer?",
      "What does CoreD offer?",
      "Do you provide CRM services?",
      "Do you offer CRM solutions for businesses?",
      "What CRM solutions do you have?",
      "What can CoreD build for my business?",
      "CoreD kaun si services deta hai?",
      "Aap kaun si services provide karte ho?",
    ],
    keywords: ["our offerings", "crm services", "service list"],
    answer:
      "CoreD provides CRM services to businesses. Our offerings include:\n- CRM solutions for businesses\n- Custom CRM development\n- AI-agent-based CRM solutions\n- CRM workflows tailored to your operational requirements\n- CRM options configured around the number and purpose of AI agents you need\n\nIf a standard plan can't handle your workflow well, we can discuss a custom solution.",
  },
  {
    id: "other-services",
    category: "company",
    questions: [
      "Do you offer cyber security services?",
      "Do you provide GPT services?",
      "Do you offer cloud and DevOps services?",
      "Do you do anything besides CRM?",
      "What other services do you have?",
      "Do you offer AI chatbots?",
    ],
    keywords: ["cyber security", "devops", "gpt services", "cloud services"],
    answer:
      "The Services section of this website also lists GPT Services, Cyber Security, and Cloud Solution & DevOps alongside AI Agent Based CRM. I don't have verified details about what those services cover, so please check the Services page or ask the CoreD team directly.",
    action: "contact",
  },
  {
    id: "case-studies",
    category: "company",
    questions: [
      "Do you have case studies?",
      "Can I see examples of your work?",
      "Who are your clients?",
      "What have you built before?",
      "Do you have a portfolio?",
      "Show me past projects",
      "Aapne pehle kya banaya hai?",
    ],
    keywords: ["past clients", "previous work", "client examples"],
    answer:
      "The Case Studies page on this website describes CRM dashboards CoreD designed for three clients: Adsmark01 (an AI marketing CRM that takes enquiries through qualification and discovery-call handoff), Crawl Digitally (a centralised CRM for leads, sales pipeline and follow-ups), and NextTechWaves (an education CRM for student fees and campus communication). Each case study shows the problem, the solution and screenshots. I don't have verified performance figures to share.",
  },

  /* -------------------------------- Concepts ------------------------------- */
  {
    id: "what-is-crm",
    category: "concepts",
    questions: [
      "CRM",
      "What is a CRM?",
      "What does CRM mean?",
      "What does CRM stand for?",
      "Explain CRM",
      "CRM kya hota hai?",
    ],
    keywords: ["customer relationship management", "crm meaning"],
    answer:
      "CRM stands for customer relationship management. A CRM is software that keeps customer and lead information, conversations and follow-ups in one organised place, so a team can see who needs attention and what should happen next.",
  },
  {
    id: "what-is-ai-agent-crm",
    category: "concepts",
    questions: [
      "What is an AI-agent-based CRM?",
      "What is an AI agent CRM?",
      "What are AI agents in a CRM?",
      "How do AI agents work in a CRM?",
      "What is an AI agent?",
      "AI agent CRM kya hota hai?",
    ],
    keywords: ["agent based crm", "ai agents in crm"],
    answer:
      "An AI-agent-based CRM adds AI agents that are set up to handle defined parts of a CRM workflow alongside your team. CoreD offers CRM solutions built around one agent (Basic), three agents (Standard), or a custom number and purpose of agents. The exact tasks an agent performs depend on the solution, so please confirm those with CoreD.",
    action: "contact",
  },
  {
    id: "crm-business-benefits",
    category: "concepts",
    questions: [
      "How can a CRM help my business?",
      "Why do I need a CRM?",
      "What are the benefits of a CRM?",
      "Is a CRM useful for my business?",
      "How does a CRM improve my workflow?",
      "CRM se business ko kya fayda hota hai?",
    ],
    keywords: ["crm benefits", "why use a crm"],
    answer:
      "A CRM can help a business keep lead and customer details in one place, see where each opportunity stands, remember follow-ups, and coordinate work across a team. How much it helps depends on your business and how the CRM is used, so I can't promise specific results. If you tell the CoreD team which part of your workflow is hardest to manage, they can discuss what might suit it.",
  },
  {
    id: "traditional-vs-agent-crm",
    category: "concepts",
    questions: [
      "What is the difference between a traditional CRM and an AI-agent-based CRM?",
      "How is an AI agent CRM different from a normal CRM?",
      "Traditional CRM vs AI agent workflows",
      "Why choose an AI-agent-based CRM over a regular CRM?",
      "Normal CRM aur AI agent CRM mein kya difference hai?",
    ],
    keywords: ["traditional crm", "regular crm", "agent workflows"],
    answer:
      "A traditional CRM mainly stores and organises information that people enter, review and act on. In an AI-agent-based CRM, AI agents are set up to take on defined steps of the workflow alongside your team. Which steps suit an agent depends on your process, which is worth discussing with CoreD.",
    action: "contact",
  },

  /* --------------------------------- Plans --------------------------------- */
  {
    id: "plans-overview",
    category: "plans",
    questions: [
      "What plans does CoreD offer?",
      "What plans do you offer?",
      "What are your CRM plans?",
      "What are the available CRM options?",
      "Tell me about your packages",
      "Plan",
      "Plans",
      "Packages",
      "Options",
      "Basic",
      "Standard",
      "Custom",
      "Aapke plans kya hain?",
    ],
    keywords: ["crm plans", "plan options", "available packages"],
    answer:
      "CoreD offers three CRM options:\n- Basic Plan: a CRM solution with one AI agent\n- Standard Plan: a CRM solution with three AI agents\n- Custom CRM Solution: built around your requirements, with the CRM functionality and the number or purpose of agents set according to your needs\n\nAsk me about any of them, or about pricing.",
  },
  {
    id: "basic-plan",
    category: "plans",
    questions: [
      "What is the Basic plan?",
      "What is your Basic plan?",
      "Tell me about the Basic plan",
      "What is included in the Basic plan?",
      "What do I get with the Basic package?",
      "I need one AI agent",
      "I want a single-agent CRM",
      "One agent",
      "Basic plan kya hai?",
    ],
    keywords: ["basic plan", "single agent crm", "simple crm setup"],
    answer:
      "The Basic Plan is a CRM solution built around one AI agent. It's an option for businesses considering a simpler, single-agent setup. I don't have verified details about its exact agent capabilities, integrations, limits or included modules, so please confirm those with CoreD.",
    action: "contact",
  },
  {
    id: "basic-agent-count",
    category: "plans",
    questions: [
      "How many AI agents does the Basic plan have?",
      "How many agents come with Basic?",
      "How many agents are in the Basic package?",
      "What is the number of agents in Basic?",
      "Does Basic have one agent?",
      "Basic plan mein kitne agents hain?",
    ],
    keywords: ["basic agent count", "agents in basic"],
    answer:
      "The Basic Plan is built around one AI agent. If you expect to need more than one, the Standard Plan has three agents, and a Custom CRM Solution can be set up around your needs.",
  },
  {
    id: "standard-plan",
    category: "plans",
    questions: [
      "What is the Standard plan?",
      "What is your Standard plan?",
      "Tell me about the Standard plan",
      "What is included in the Standard plan?",
      "What do I get with the Standard package?",
      "I need three AI agents",
      "I want a multi-agent CRM",
      "Three agents",
      "Standard plan kya hai?",
    ],
    keywords: ["standard plan", "multi agent crm", "three agent crm"],
    answer:
      "The Standard Plan is a CRM solution built around three AI agents. It's an option for businesses that need a multi-agent setup. I don't have verified details about what each agent does, which workflows are included, or its integrations and limits, so please confirm those with CoreD.",
    action: "contact",
  },
  {
    id: "standard-agent-count",
    category: "plans",
    questions: [
      "How many AI agents does the Standard plan have?",
      "How many AI agents are in Standard?",
      "How many agents come with Standard?",
      "What is the number of agents in the Standard package?",
      "Does Standard have three agents?",
      "Standard plan mein kitne agents hain?",
    ],
    keywords: ["standard agent count", "agents in standard"],
    answer:
      "The Standard Plan is built around three AI agents. If your workflow needs a different number or purpose of agents, a Custom CRM Solution can be discussed.",
  },
  {
    id: "basic-vs-standard",
    category: "plans",
    questions: [
      "What is the difference between Basic and Standard?",
      "Basic vs Standard",
      "Compare the Basic and Standard plans",
      "Which is better, Basic or Standard?",
      "How is Standard different from Basic?",
      "Should I choose Basic or Standard?",
      "Basic aur Standard mein kya difference hai?",
    ],
    keywords: ["compare plans", "plan comparison", "basic or standard"],
    answer:
      "The difference I can confirm is the agent setup: the Basic Plan is a CRM solution with one AI agent, while the Standard Plan is a CRM solution with three AI agents. I don't have verified details on any other differences, such as features, agent tasks, limits or pricing, so please confirm those with CoreD. If neither setup fits, a Custom CRM Solution is also available.",
    action: "contact",
  },
  {
    id: "custom-crm",
    category: "plans",
    questions: [
      "Can you build a custom CRM?",
      "Can you create a custom AI CRM for my business?",
      "Can CoreD tailor a CRM to my business requirements?",
      "Do you offer custom CRM development?",
      "What is the Custom CRM Solution?",
      "I want a tailored CRM for my company",
      "Can you make a CRM for my workflow?",
      "Custom CRM bana sakte ho?",
      "Mere business ke liye custom CRM chahiye",
    ],
    keywords: ["custom crm solution", "custom crm development", "tailored crm"],
    answer:
      "Yes. CoreD offers a Custom CRM Solution for businesses with specific operational requirements, including AI-agent-based CRM. The CRM functionality and the number or purpose of agents can be set according to your needs. The best next step is to discuss your workflow and requirements with CoreD. I can't confirm specific features, integrations or timelines in advance, since those depend on that discussion.",
    action: "contact",
  },
  {
    id: "when-custom-crm",
    category: "plans",
    questions: [
      "When should I consider a Custom CRM Solution?",
      "When do I need a custom CRM instead of a standard plan?",
      "What if the Basic and Standard plans don't fit my workflow?",
      "My workflow is very specific",
      "I need something more specific",
      "I have a specialised workflow",
      "I need a different number of agents",
      "I need more than three AI agents",
    ],
    keywords: ["custom instead of standard", "plans do not fit"],
    answer:
      "A Custom CRM Solution is worth exploring if your workflow is specialised, if you need a different number or purpose of AI agents than one (Basic) or three (Standard), or if you think a standard plan won't handle your process well. This is only preliminary guidance. The CoreD team can discuss your requirements to identify a suitable solution.",
    action: "contact",
  },
  {
    id: "which-option",
    category: "plans",
    questions: [
      "How do I know which CRM option suits my business?",
      "Which plan is right for me?",
      "Which plan should I choose?",
      "Help me choose a plan",
      "How do I decide between the plans?",
      "Mere liye kaun sa plan sahi rahega?",
    ],
    keywords: ["choose a plan", "right plan", "which option"],
    answer:
      "As a starting point:\n- If you're considering one AI agent, explore the Basic Plan.\n- If you're considering three AI agents, explore the Standard Plan.\n- If your workflow is specialised or needs a different agent setup, enquire about a Custom CRM Solution.\n\nThis is preliminary guidance, not a technical assessment or a guarantee that a plan meets every requirement. Which sounds closest to your situation: one agent, three agents, or something more specific?",
    action: "contact",
  },

  /* ----------------------------- Enquiries & limits ------------------------ */
  {
    id: "pricing",
    category: "enquiry",
    questions: [
      "How much does CoreD cost?",
      "What is the price of Basic?",
      "What is the price of the Standard plan?",
      "How much does the Basic plan cost?",
      "How much does the Standard plan cost?",
      "What is the pricing?",
      "What are your prices?",
      "How can I enquire about pricing?",
      "Can I get a quote?",
      "How do I get pricing?",
      "Price kitna hai?",
      "Basic plan ka price kya hai?",
      "Standard plan ki kimat kitni hai?",
    ],
    keywords: ["plan pricing", "cost of crm", "get a quote", "billing"],
    answer:
      "I don't have verified pricing for the Basic Plan, Standard Plan or Custom CRM Solutions, so I can't give you a number or billing details. Exact pricing needs to be confirmed with CoreD. Use the Contact us option and mention which plan you're considering.",
    action: "contact",
  },
  {
    id: "contact-cored",
    category: "enquiry",
    questions: [
      "How can I discuss my requirements with CoreD?",
      "How do I contact CoreD?",
      "How can I get in touch with your team?",
      "I want to talk to someone at CoreD",
      "Can I book a call?",
      "How do I start a project with CoreD?",
      "CoreD se contact kaise karu?",
      "Apni requirements kaise discuss karu?",
    ],
    keywords: ["contact us", "speak to the team", "book a meeting", "get started"],
    answer:
      "The best way to discuss your requirements is through the Contact us option on this website. It helps to mention your business workflow, what you'd like to organise or automate, and whether you're thinking of one agent, three agents or a custom setup. I don't have a verified email address, phone number or booking link to share here.",
    action: "contact",
  },
  {
    id: "prepare-custom-crm",
    category: "enquiry",
    questions: [
      "What information should I prepare before discussing a custom CRM?",
      "What should I have ready before contacting CoreD?",
      "What details do you need from me?",
      "What do I need to tell you about my requirements?",
      "Custom CRM ke liye kya information chahiye?",
    ],
    keywords: ["prepare requirements", "before the discussion", "what to share"],
    answer:
      "You don't need everything ready to start a conversation, but these help:\n- The workflow you want the CRM to support, such as how enquiries or leads come in and get followed up today\n- What you'd like to organise or automate, and where you think an AI agent could help\n- Roughly how many agents or separate responsibilities you have in mind\n- Who on your team would use it\n- Any existing tools or processes it would need to work alongside\n- Anything you consider a must-have\n\nThe CoreD team can then discuss what a suitable solution might look like.",
    action: "contact",
  },
  {
    id: "unlisted-feature",
    category: "enquiry",
    questions: [
      "What if my required feature is not mentioned?",
      "What if you don't have the feature I need?",
      "Can CoreD build a feature that isn't listed?",
      "What if I need something that's not in the plans?",
      "Is feature X available?",
      "Mujhe jo feature chahiye wo list mein nahi hai",
    ],
    keywords: ["missing feature", "feature not listed", "unlisted requirement"],
    answer:
      "My information is limited to CoreD's CRM services and the Basic, Standard and Custom CRM structure, so a feature missing from my answers doesn't mean it isn't possible. I can't confirm whether a specific feature is supported. Please describe it to the CoreD team, and if it falls outside a standard plan, ask about a Custom CRM Solution.",
    action: "contact",
  },
  {
    id: "unconfirmed-details",
    category: "enquiry",
    questions: [
      "Do you integrate with other tools?",
      "Do you support WhatsApp?",
      "Can you automate WhatsApp or email follow-ups?",
      "Which communication channels do you support?",
      "Do you have an API?",
      "Is my data secure?",
      "Do you have security certifications?",
      "How long does implementation take?",
      "What is the delivery timeline?",
      "How many users are included?",
      "Do you offer a free trial or demo?",
      "What support do you provide after delivery?",
    ],
    keywords: [
      "integrations",
      "whatsapp",
      "api access",
      "data security",
      "timeline",
      "uptime guarantee",
      "service level agreement",
      "free trial",
    ],
    answer:
      "I don't have verified information about integrations with other tools, supported communication channels, API access, data security practices or certifications, support commitments, implementation timelines, user limits, or trials and demos. Please ask the CoreD team directly so you get a confirmed answer rather than my guess.",
    action: "contact",
  },
  {
    id: "results-guarantee",
    category: "enquiry",
    questions: [
      "Do you guarantee a particular business result?",
      "Can you guarantee more sales?",
      "Will a CRM increase my revenue?",
      "What results can I expect?",
      "Do you promise better conversions?",
      "What is the ROI?",
      "Kya aap results ki guarantee dete ho?",
    ],
    keywords: ["guaranteed results", "expected outcomes", "performance promise"],
    answer:
      "I don't have a confirmed commitment about specific business results to share, so I can't promise outcomes such as more leads, higher conversions, time saved or revenue growth. Results depend on your business and how the CRM is used. You can discuss your goals and expectations with the CoreD team.",
    action: "contact",
  },
];


export const knowledgeBase = [
  ...existingKnowledgeBase,
  ...expandedKnowledgeBase,
];





