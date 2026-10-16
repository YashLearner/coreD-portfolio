
import { team } from "../data.js";
import PageSection from "../components/ui/PageSection.jsx";
import Card from "../components/ui/Card.jsx";

export default function Team() {
  return (
    <PageSection
      title="Meet the Team"
      lead="The people building CoreD."
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {team.map((member) => (
          <Card key={member.n}>
            <div
              aria-hidden="true"
              className="h-24 w-24 rounded-full bg-brand/30"
            />

            <h2 className="mt-4 font-bold">{member.n}</h2>
            <p className="text-sm text-ink/60">{member.r}</p>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
