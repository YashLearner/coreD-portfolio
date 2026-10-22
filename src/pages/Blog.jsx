import { ArrowUpRight, Sparkles } from "lucide-react";

const COREDHRISTI_URL = "https://www.coredhristi.com/";
const PAGE_BG = "#f9f8f4";

const articles = [
  {
    id: "future-of-ai-crm",
    dateTime: "2026-10-21",
    dateLabel: "OCT 21",
    year: "2026",
    category: "Future of AI",
    readTime: "8 MIN READ",
    title: "AI AGENTS IN THE NEXT FIVE YEARS",
    excerpt:
      "The next five years could fundamentally change how businesses operate, communicate, and manage customer relationships. AI agents are evolving beyond simple chatbots into systems that can assist with research, organise information, coordinate tasks, and support complex business workflows. In AI-powered CRM platforms, these agents could help identify promising leads, analyse customer interactions, recommend the next sales action, and personalise follow-ups according to customer needs. Businesses may also use intelligent automation to reduce repetitive administration, improve response times, and gain clearer insights from their customer data. However, successful adoption will require more than implementing new technology. Organisations must consider data privacy, security, reliability, and meaningful human oversight. Discover how businesses can prepare for this changing landscape, identify practical opportunities for AI adoption, and combine human expertise with intelligent systems to build more efficient operations, stronger customer relationships, and sustainable long-term growth.",
  },
  {
    id: "customer-relationships",
    dateTime: "2026-10-14",
    dateLabel: "OCT 14",
    year: "2026",
    category: "Customer Experience",
    readTime: "7 MIN READ",
    title: "HOW AI AGENTS CAN TRANSFORM CUSTOMER RELATIONSHIPS",
    excerpt:
      "Building lasting customer relationships requires timely communication, a clear understanding of customer needs, and consistent service throughout the customer journey. AI-powered CRM agents can help teams bring these activities together by organising customer records, summarising previous conversations, identifying unanswered enquiries, and recommending relevant follow-up actions. Intelligent workflows may also help businesses personalise communication, prioritise urgent requests, and make customer information easier for sales and support teams to access. Instead of spending hours updating records and tracking routine activities, employees can focus more attention on solving problems, understanding customer expectations, and developing meaningful relationships. The goal is not to replace human interaction, but to support it with better information and more efficient processes. Explore how businesses can introduce AI into their customer management strategy, maintain appropriate human supervision, protect sensitive information, and create more consistent customer experiences that encourage satisfaction, trust, repeat purchases, and long-term loyalty.",
  },
  {
    id: "ai-crm-revenue",
    dateTime: "2026-10-07",
    dateLabel: "OCT 07",
    year: "2026",
    category: "Business Growth",
    readTime: "9 MIN READ",
    title: "TURN CUSTOM AI CRM SOLUTIONS INTO REVENUE",
    excerpt:
      "Custom AI CRM solutions can create business opportunities for developers, agencies, startups, and entrepreneurs who understand real customer-management challenges. Businesses may need specialised systems for lead qualification, sales pipeline management, automated follow-ups, customer support, reporting, and internal operations. Instead of building a generic product, developers can identify a specific industry or recurring problem and create a solution that delivers measurable value. Potential revenue models include project-based development, custom CRM implementation, workflow integration, monthly subscriptions, and ongoing maintenance or support. A successful approach begins with understanding the target customer, validating demand, defining a clear solution, and demonstrating how the product saves time or improves business performance. Strong security, reliable integrations, and an easy-to-use interface can further strengthen the offering. Discover how to turn practical AI and CRM development skills into service opportunities, build long-term client relationships, price solutions around the value delivered, and develop sustainable business models without relying on unrealistic promises of guaranteed income.",
  },
  {
    id: "intelligent-sales",
    dateTime: "2026-09-30",
    dateLabel: "SEP 30",
    year: "2026",
    category: "Sales Automation",
    readTime: "7 MIN READ",
    title: "BUILD A SMARTER SALES PIPELINE WITH AI",
    excerpt:
      "An effective sales pipeline helps a business understand where every opportunity stands, which customers need attention, and what actions may move a deal forward. Manual spreadsheets and disconnected tools can make this process difficult, especially when a team manages hundreds of leads and multiple conversations. AI-powered CRM systems can help centralise prospect information, summarise interactions, identify engagement patterns, and highlight opportunities that deserve closer attention. Automated reminders and follow-up workflows can reduce missed tasks, while pipeline dashboards can give managers a clearer view of sales activity and potential bottlenecks. AI-generated recommendations can support prioritisation, but sales teams should verify important information and apply their own judgement before taking action. Learn how to design a more organised sales process, define useful performance indicators, connect customer communication with CRM records, and use automation to reduce repetitive work. With the right processes in place, businesses can improve visibility, respond more consistently to prospects, and make better-informed decisions throughout the sales cycle.",
  },
  {
    id: "connected-business",
    dateTime: "2026-09-23",
    dateLabel: "SEP 23",
    year: "2026",
    category: "AI Integrations",
    readTime: "8 MIN READ",
    title: "CONNECT AI AGENTS WITH YOUR BUSINESS WORKFLOWS",
    excerpt:
      "AI agents become more useful when they can work with the business systems and information employees already depend on. Connecting CRM platforms with communication tools, databases, scheduling systems, and internal applications can reduce repetitive data entry and help teams coordinate activities more consistently. Well-designed integrations may allow an agent to retrieve approved information, prepare a summary, update a permitted record, or recommend a next step within a defined workflow. However, connecting systems requires careful planning. Businesses need clear access permissions, secure handling of customer data, reliable error management, and safeguards against unauthorised actions. Sensitive updates and high-impact decisions may also require human approval. Discover how to identify suitable automation opportunities, map existing workflows, select the right integration approach, and test each step before deployment. By combining useful integrations with clear rules, monitoring, and ongoing improvement, organisations can create more connected operations while keeping their AI systems transparent, manageable, and aligned with business requirements.",
  },
];

/* -------------------------------------------------------------------------- */
/* Article date                                                               */
/* -------------------------------------------------------------------------- */

function ArticleDate({ post }) {
  return (
    <div className="relative mb-4 flex items-center sm:mb-5">
      {/* Timeline marker */}
      <span
        aria-hidden="true"
        className="
          absolute -left-[5px] top-1/2 z-10
          h-2.5 w-2.5
          -translate-y-1/2
          rounded-full
          border-[1.5px] border-orange-500
          bg-[#f9f8f4]
          shadow-[0_0_0_3px_rgba(249,248,244,0.9)]
          lg:-left-[19px]
        "
      />

      <time
        dateTime={post.dateTime}
        className="
          inline-flex flex-col items-start
          bg-[#f9f8f4]
          pr-3
        "
      >
        <span
          className="
            text-[10px] font-bold
            tracking-[0.08em]
            text-black
            sm:text-[11px]
          "
        >
          {post.dateLabel}
        </span>

        <span
          className="
            mt-0.5
            text-[10px]
            tracking-[0.04em]
            text-black/45
          "
        >
          {post.year}
        </span>
      </time>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Article metadata                                                           */
/* -------------------------------------------------------------------------- */

function ArticleMeta({ category, readTime }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-4">
      <span
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-orange-600
          sm:text-[11px]
        "
      >
        {category}
      </span>

      <span
        aria-hidden="true"
        className="h-1 w-1 shrink-0 rounded-full bg-black/25"
      />

      <span
        className="
          text-[10px]
          uppercase
          tracking-[0.12em]
          text-black/45
        "
      >
        {readTime}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Optional article highlights                                                */
/* -------------------------------------------------------------------------- */

function ArticleHighlights({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul
      aria-label="Article highlights"
      className="mt-5 flex flex-wrap gap-2 sm:mt-6"
    >
      {items.map((item) => (
        <li
          key={item}
          className="
            border
            border-black/10
            bg-white/55
            px-3
            py-1.5
            text-[11px]
            font-medium
            text-black/60
            transition-all
            duration-200
            hover:border-orange-500/40
            hover:bg-white
            hover:text-black
          "
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Individual article                                                         */
/* -------------------------------------------------------------------------- */

function TimelineArticle({ post }) {
  return (
    <article
      aria-labelledby={`${post.id}-title`}
      className="
        group
        relative
        w-full
        min-w-0
        border-b
        border-black/10
        py-8
        first:pt-0
        last:border-b-0
        sm:py-10
        lg:py-12
        xl:py-14
      "
    >
      <ArticleDate post={post} />

      <ArticleMeta
        category={post.category}
        readTime={post.readTime}
      />

      <h2
        id={`${post.id}-title`}
        className="
          max-w-none
          break-words
          text-[clamp(1.55rem,3.25vw,3.25rem)]
          font-semibold
          leading-[1.08]
          tracking-[-0.045em]
          text-black
          transition-colors
          duration-300
          group-hover:text-orange-950
        "
      >
        {post.title}
      </h2>

      <p
        className="
          mt-4
          max-w-none
          break-words
          text-[13px]
          leading-7
          text-black/60
          sm:mt-5
          sm:text-sm
          sm:leading-8
          lg:text-[15px]
          lg:leading-[2rem]
          xl:text-base
          xl:leading-[2.05rem]
        "
      >
        {post.excerpt}
      </p>

      <ArticleHighlights items={post.highlights} />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog page                                                                  */
/* -------------------------------------------------------------------------- */
import { posts } from "../data/PortfolioData.js";
import PageSection from "../components/ui/PageSection.jsx";
import Card from "../components/ui/Card.jsx";

export default function Blog() {
  return (
    <main
      className="
        relative
        isolate
        min-h-screen
        w-full
        overflow-x-clip
        bg-[#f9f8f4]
        text-black
      "
      aria-labelledby="blog-heading"
    >
      <section
        className="
          w-full
          px-4
          pb-16
          pt-14
          sm:px-6
          sm:pb-20
          sm:pt-16
          md:px-8
          lg:px-10
          lg:pb-24
          lg:pt-20
          xl:px-14
          2xl:px-20
        "
      >
        {/* ================================================================== */}
        {/* HERO                                                               */}
        {/* ================================================================== */}

        <header
          className="
            w-full
            border-b
            border-black/10
            pb-8
            sm:pb-10
            lg:pb-12
          "
        >
          {/* Eyebrow */}
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              sm:mb-8
            "
          >
            <Sparkles
              size={15}
              strokeWidth={1.8}
              className="shrink-0 text-orange-500"
              aria-hidden="true"
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-black/55
                sm:text-xs
              "
            >
              COREDHRISTI / JOURNAL
            </span>
          </div>

          {/* Main heading */}
          <h1
            id="blog-heading"
            className="
              w-full
              max-w-none
              whitespace-nowrap
              text-[clamp(1rem,5.2vw,5.5rem)]
              font-semibold
              leading-[1.05]
              tracking-[-0.055em]
              text-black
            "
          >
            IDEAS FOR AN AI-FIRST WORLD.
          </h1>

          {/* Hero description */}
          <p
            className="
    mt-5
    w-full max-w-none
    text-sm leading-7
    text-black/60
    sm:mt-5
    sm:text-base sm:leading-8
  "
          >
            Artificial intelligence is transforming how businesses attract
            customers, manage relationships, and improve everyday operations.
            Explore practical insights into AI-powered CRM, intelligent agents,
            sales automation, workflow integrations, and custom business
            solutions. Discover how emerging technologies can reduce repetitive
            tasks, improve customer experiences, and help teams make better
            data-driven decisions. Our journal explores real business
            challenges, responsible AI adoption, secure automation, and
            strategies for building smarter workflows. Whether you are beginning
            your AI journey or upgrading an existing CRM system, find ideas to
            help your business innovate, work more efficiently, and build
            lasting customer relationships.
          </p>
        </header>

        {/* ================================================================== */}
        {/* ARTICLE TIMELINE                                                   */}
        {/* ================================================================== */}

        <section
          className="
    w-full
    px-4
    pb-16 pt-24
    sm:px-6 sm:pb-20 sm:pt-28
    md:px-8
    lg:px-10 lg:pb-24 lg:pt-32
    xl:px-14
    2xl:px-20
  "
        >
          {articles.map((post) => (
            <TimelineArticle key={post.id} post={post} />
          ))}
        </section>

        {/* ================================================================== */}
        {/* FOOTER CTA                                                         */}
        {/* ================================================================== */}

        <footer
          className="
            mt-9
            flex
            w-full
            min-w-0
            flex-col
            gap-5
            border-t
            border-black/10
            pt-8
            sm:mt-11
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:pt-9
            lg:pt-10
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-sm
                font-semibold
                text-black/85
                sm:text-base
              "
            >
              Build smarter customer experiences with AI.
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-black/50
                sm:text-sm
              "
            >
              Explore intelligent CRM solutions, AI agents, and business
              automation with CoreDhristi.
            </p>
          </div>

          <a
            href={COREDHRISTI_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore CoreDhristi solutions"
            className="
              group/link
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              border
              border-orange-500
              bg-orange-500
              px-5
              py-3.5
              text-xs
              font-semibold
              text-white
              transition-all
              duration-300
              hover:border-orange-600
              hover:bg-orange-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-orange-500
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#f9f8f4]
            "
          >
            Explore CoreDhristi
            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
              className="
                transition-transform
                duration-200
                group-hover/link:-translate-y-0.5
                group-hover/link:translate-x-0.5
              "
            />
          </a>
        </footer>
      </section>
    </main>
  );
}