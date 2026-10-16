
import { cases } from "../data.js";
import PageSection from "../components/ui/PageSection.jsx";
import Card from "../components/ui/Card.jsx";

export default function CaseStudies() {
  return (
    <PageSection
      title="Case Studies"
      lead="Real results from teams using CoreD."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {cases.map((item) => (
          <Card key={item.name}>
            <p className="text-sm text-ink/60">{item.name}</p>

            <p className="mt-2 text-5xl font-black text-brand-deep">
              {item.stat}
            </p>

            <p className="mt-2">{item.text}</p>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
