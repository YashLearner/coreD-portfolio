
import { Link } from "react-router-dom";
import PageSection from "../components/ui/PageSection.jsx";
import { privacyPolicy } from "../data/PortfolioData.js";

export default function PrivacyPolicy() {
  return (
    <PageSection>
      <div className="w-full max-w-none space-y-10 sm:space-y-12">
        {/* Introduction */}
        <div className="w-full">
          <p className="w-full text-3xl font-bold text-ink">
            Privacy Policy
          </p>
        </div>

        {/* Privacy Policy content */}
        <article
          aria-label="Privacy Policy details"
          className="w-full max-w-none space-y-9 text-ink/80 sm:space-y-10"
        >
          {privacyPolicy.map((section, index) => {
            const sectionId = `privacy-section-${index + 1}`;

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
                  {section.paragraphs.map(
                    (paragraph, paragraphIndex) => (
                      <p
                        key={`${section.title}-${paragraphIndex}`}
                        className="w-full text-sm leading-7 text-ink/75 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>

                {section.contact && (
                  <div className="mt-4 flex w-full justify-end">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-3.5 text-sm font-semibold text-black shadow-md transition-all duration-200 hover:brightness-105 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                    >
                      Reach Us Out
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </article>
      </div>
    </PageSection>
  );
}
