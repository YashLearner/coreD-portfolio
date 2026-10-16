
import { posts } from "../data.js";
import PageSection from "../components/ui/PageSection.jsx";
import Card from "../components/ui/Card.jsx";

export default function Blog() {
  return (
    <PageSection
      title="Blog"
      lead="Guides on AI, CRM and security."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.t}>
            <h2 className="text-xl font-bold">{post.t}</h2>
            <p className="mt-2 text-sm text-ink/70">{post.d}</p>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
