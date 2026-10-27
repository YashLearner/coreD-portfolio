import { Link } from "react-router-dom";
import PageSection from "../components/ui/PageSection.jsx";
import { termsSections } from "../data/PortfolioData.js";

export default function Terms() {
  return (
    <PageSection
      title="Terms & Conditions"
      lead="Please review the terms governing the use of CoreD services."
    >
      <div className="space-y-12">
        {/* Terms and Conditions */}
        <article className="max-w-3xl space-y-8 text-ink/80">
          <section>
            <h2 className="text-xl font-bold text-ink">
              1. Use of Service
            </h2>
            <p className="mt-2 leading-7">
              CoreD services must be used for lawful business
              purposes and in accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">
              2. Data and Privacy
            </h2>
            <p className="mt-2 leading-7">
              Data handling and privacy practices should be
              explained in the applicable privacy policy and
              service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">
              3. Payments and Subscriptions
            </h2>
            <p className="mt-2 leading-7">
              Applicable fees, billing periods and cancellation
              terms are governed by the selected plan or service
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">
              4. Contact
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

            {/*  */}
            {section.contact && (
              <div className="mt-4 flex w-full justify-end">
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
              </div>
            )}
          </section>
        </article>
      </div>
    </PageSection>
  );
}


