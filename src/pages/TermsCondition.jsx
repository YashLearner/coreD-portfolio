import PageSection from "../components/ui/PageSection.jsx";
import { termsSections } from "../data/PortfolioData.js";
import { Link } from "react-router-dom";

// Keep your existing PageSection import.



export default function Terms() {
  return (
    <PageSection>
      <div className="w-full max-w-none space-y-10 sm:space-y-12">
        {/* Introduction */}
        <div className="w-full">
          <h1 className="w-full text-3xl font-bold text-ink">
            Terms & Conditions
          </h1>
        </div>

        {/* Terms content */}
        <article
          aria-label="Terms and Conditions details"
          className="w-full max-w-none space-y-9 text-ink/80 sm:space-y-10"
        >
          {termsSections.map((section, index) => {
            const sectionId = `terms-section-${index + 1}`;

            return (
              <section
                key={section.title}
                aria-labelledby={sectionId}
                className="w-full scroll-mt-28"
              >
                <h2
                  id={sectionId}
                  className="w-full text-lg font-bold leading-snug text-ink sm:text-xl"
                >
                  {index + 1}. {section.title}
                </h2>

                <div className="mt-3 w-full space-y-3">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${section.title}-${paragraphIndex}`}
                      className="w-full text-sm leading-7 text-ink/75 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.contact && (
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 underline underline-offset-4 transition-colors duration-200 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4"
                  >
                    Contact CoreDhristi
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </section>
            );
          })}
        </article>
      </div>
    </PageSection>
  );
}
