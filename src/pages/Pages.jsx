import { cases, posts, team } from '../data/PortfolioData.js'
const Wrap = ({ title, lead, children }) => (
  <section className="mx-auto max-w-6xl px-6 pt-10">
    <h1 className="text-4xl md:text-6xl font-black tracking-tight">{title}</h1>
    {lead && <p className="mt-4 max-w-2xl text-lg text-ink/70">{lead}</p>}
    <div className="mt-10">{children}</div>
  </section>
)
const Card = ({ children }) => <div className="rounded-3xl border border-ink/10 bg-white p-6">{children}</div>

export const CaseStudies = () => (
  <Wrap title="Case studies" lead="Real results from teams using CoreD.">
    <div className="grid gap-4 md:grid-cols-3">
      {cases.map((c) => <Card key={c.name}><p className="text-sm text-ink/60">{c.name}</p><p className="mt-2 text-5xl font-black text-brand-deep">{c.stat}</p><p className="mt-2">{c.text}</p></Card>)}
    </div>
  </Wrap>
)
export const Blog = () => (
  <Wrap title="Blog" lead="Guides on AI, CRM and security.">
    <div className="grid gap-4 md:grid-cols-3">{posts.map((p) => <Card key={p.t}><h3 className="text-xl font-bold">{p.t}</h3><p className="mt-2 text-sm text-ink/70">{p.d}</p></Card>)}</div>
  </Wrap>
)

export const Team = () => (
  <Wrap title="Meet the team" lead="The people building CoreD.">
    <div className="grid gap-4 md:grid-cols-4">
      {team.map((m) => <Card key={m.n}><div className="h-24 w-24 rounded-full bg-brand/30" /><p className="mt-4 font-bold">{m.n}</p><p className="text-sm text-ink/60">{m.r}</p></Card>)}
    </div>
  </Wrap>
)
export const Terms = () => (
  <Wrap title="Terms & Conditions" lead="Replace this text with your final legal terms.">
    <div className="max-w-3xl space-y-4 text-ink/80">
      <p><b>1. Use of service.</b> CoreD CRM is provided for lawful business use.</p>
      <p><b>2. Data.</b> You own your data. We process it only to deliver the service.</p>
      <p><b>3. Payments.</b> Fees are billed as per your chosen plan.</p>
      <p><b>4. Contact.</b> Questions? Use the Reach Us Out page.</p>
    </div>
  </Wrap>
)
