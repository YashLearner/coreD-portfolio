
import { team } from "../data.js";
import PageSection from "../components/ui/PageSection.jsx";
import Card from "../components/ui/Card.jsx";

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
            <p className="mt-2 leading-7">
              Contact the CoreD team through the Reach Us page
              for questions about these terms.
            </p>
          </section>
        </article>

        {/* Team section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ink">
              Meet the Team
            </h2>
            <p className="mt-2 text-ink/60">
              The people building CoreD.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {team.map((member) => (
              <Card key={member.n}>
                <div
                  aria-hidden="true"
                  className="h-24 w-24 rounded-full bg-brand/30"
                />

                <h3 className="mt-4 font-bold text-ink">
                  {member.n}
                </h3>

                <p className="text-sm text-ink/60">
                  {member.r}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageSection>
  );
}
