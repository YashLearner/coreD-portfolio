import { ArrowUpRight, Sparkles } from "lucide-react";


import PageSection from "../components/ui/PageSection.jsx";
import Card from "../components/ui/Card.jsx";

import {blog} from "../data/PortfolioData.js"

const COREDHRISTI_URL = "https://www.coredhristi.com/";
const PAGE_BG = "#faf7f1";

 
const article = blog;
function ArticleDate({ dateTime, dateLabel, year }) {
  return (
    <div className="relative mb-4 pl-7 sm:mb-5 lg:pl-10">
      <span
        aria-hidden="true"
        className="
          absolute left-0 top-1/2 z-10
          h-2.5 w-2.5 -translate-y-1/2
          rounded-full border-[1.5px] border-orange-500
          bg-[#f9f8f4]
          shadow-[0_0_0_4px_#f9f8f4]
        "
      />

      <time dateTime={dateTime} className="flex flex-col items-start">
        <span className="text-[10px] font-bold tracking-[0.08em] text-black sm:text-[11px]">
          {dateLabel}
        </span>
        <span className="mt-0.5 text-[10px] tracking-[0.04em] text-black/45">
          {year}
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
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600 sm:text-[11px]">
        {category}
      </span>
      <span
        aria-hidden="true"
        className="h-1 w-1 shrink-0 rounded-full bg-black/25"
      />
      <span className="text-[10px] uppercase tracking-[0.12em] text-black/45">
        {readTime}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Individual article                                                         */
/* -------------------------------------------------------------------------- */

function TimelineArticle({ post, isFirst }) {
  const titleId = `${post.id}-title`;

  return (
    <li className="relative border-b border-black/10 last:border-b-0">
      <article
        aria-labelledby={titleId}
        className={`group py-8 sm:py-10 lg:py-12 xl:py-14 ${isFirst ? "pt-0 sm:pt-0 lg:pt-0 xl:pt-0" : ""}`}
      >
        <ArticleDate
          dateTime={post.dateTime}
          dateLabel={post.dateLabel}
          year={post.year}
        />

        <div className="pl-7 lg:pl-10">
          <ArticleMeta category={post.category} readTime={post.readTime} />

          <h2
            id={titleId}
            className="
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
              mt-4 break-words
              text-[13px] leading-7 text-black/60
              sm:mt-5 sm:text-sm sm:leading-8
              lg:text-[15px] lg:leading-[2rem]
              xl:text-base xl:leading-[2.05rem]
            "
          >
            {post.excerpt}
          </p>
        </div>
      </article>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog page                                                                  */
/* -------------------------------------------------------------------------- */

export default function Blog() {
  return (
    <main
      aria-labelledby="blog-heading"
      className="relative isolate min-h-screen w-full overflow-x-clip bg-[#f9f8f4] text-black"
    >
      {/* HERO */}
      <header
        className=" w-full max-w-7xl mx-auto pt-0 sm:pt-0 lg:pt-0
      flex flex-col items-center justify-center text-center
       px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20
       pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="mb-6 inline-flex items-center gap-2 sm:mb-8">
          <Sparkles
            size={15}
            strokeWidth={1.8}
            className="shrink-0 text-orange-500"
            aria-hidden="true"
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/55 sm:text-xs">
            COREDHRISTI / JOURNAL
          </span>
        </div>

        <h1
          id="blog-heading"
          className="
              w-full
              text-[clamp(1.5rem,5.2vw,5.5rem)]
              font-semibold
              leading-[1.05]
              tracking-[-0.055em]
              text-black
              break-words
            "
        >
          IDEAS FOR AN AI-FIRST WORLD.
        </h1>

        <p className="mt-5 w-full text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
          Artificial intelligence is transforming how businesses attract
          customers, manage relationships, and improve everyday operations.
          Explore practical insights into AI-powered CRM, intelligent agents,
          sales automation, workflow integrations, and custom business
          solutions. Discover how emerging technologies can reduce repetitive
          tasks, improve customer experiences, and help teams make better
          data-driven decisions. Our journal explores real business challenges,
          responsible AI adoption, secure automation, and strategies for
          building smarter workflows. Whether you are beginning your AI journey
          or upgrading an existing CRM system, find ideas to help your business
          innovate, work more efficiently, and build lasting customer
          relationships.
        </p>
      </header>

      {/* ARTICLE TIMELINE */}
      <section
        aria-label="Journal articles"
        className="
         w-full max-w-7xl mx-auto border-b border-black/10 pt-0 pb-8 sm:pb-10 lg:pb-12 flex flex-col items-center justify-center"
      >
        <ol className="relative">
          {/* Timeline rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[4px] top-0 w-px bg-black/10"
          />

          {/* {blogPosts.map((post, index) => (
            <TimelineArticle key={post.id} post={post} isFirst={index === 0} />
          ))} */}
        </ol>
      </section>

      {/* FOOTER CTA */}
      <footer
        className="
            mt-9 flex w-full min-w-0 flex-col gap-5
            border-t border-black/10 pt-8
            sm:mt-11 sm:flex-row sm:items-center sm:justify-between sm:pt-9
            lg:pt-10
          "
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-black/85 sm:text-base">
            Build smarter customer experiences with AI.
          </p>
          <p className="mt-2 text-xs leading-6 text-black/50 sm:text-sm">
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
              group/link inline-flex w-fit shrink-0 items-center gap-2
              border border-orange-500 bg-orange-500 px-5 py-3.5
              text-xs font-semibold text-white
              transition-all duration-300
              hover:border-orange-600 hover:bg-orange-600
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-orange-500 focus-visible:ring-offset-4
              focus-visible:ring-offset-[#f9f8f4]
            "
        >
          Explore CoreDhristi
          <ArrowUpRight
            size={15}
            strokeWidth={1.8}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      </footer>
    </main>
  );
}
