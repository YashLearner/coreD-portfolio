import { Link } from 'react-router-dom'
import { cases } from '../data.js'

const logos = ['Acme Retail', 'Northwind', 'Globex', 'Initech', 'Umbrella Co', 'Stark Logistics', 'Wayne Edu', 'Hooli']
const how = [
  ['Capture', 'AI agents collect leads from your website, WhatsApp and email.'],
  ['Qualify', 'Each lead is scored and routed to the right person.'],
  ['Follow up', 'Agents send replies and reminders, so no lead goes cold.'],
  ['Report', 'Live dashboards show pipeline, revenue and team activity.'],
]
const steps = ['Click on the Reach Us Out button', 'Fill the form', 'Our team will get back to you']

function Dashboard() {
  const bars = [40, 65, 50, 80, 60, 90, 75]
  return (
    <div className="mx-auto mt-14 max-w-4xl rounded-3xl bg-ink p-4 shadow-2xl ring-1 ring-black/10">
      <div className="grid gap-3 md:grid-cols-4 text-white">
        {[['New leads', '1,284'], ['Qualified', '612'], ['Won deals', '148'], ['Revenue', '₹24.6L']].map(([a, b]) => (
          <div key={a} className="rounded-2xl bg-white/5 p-4"><p className="text-xs text-white/60">{a}</p><p className="text-2xl font-extrabold">{b}</p></div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2 flex h-40 items-end gap-3 rounded-2xl bg-white/5 p-4">
          {bars.map((h, i) => <div key={i} className="flex-1 rounded-t bg-brand" style={{ height: `${h}%` }} />)}
        </div>
        <div className="rounded-2xl bg-white/5 p-4 text-sm text-white/80 space-y-2">
          <p className="font-semibold text-white">AI agent activity</p>
          <p>Replied to 32 leads</p><p>Booked 6 demos</p><p>Updated 90 records</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-10 text-center">
        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
          Your CRM, run by <span className="text-brand-deep">AI agents</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">CoreD is the CRM platform from CoreDhristi. Agents capture, qualify and follow up on leads while your team closes deals.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/reach-us" className="rounded-full bg-ink px-7 py-3 font-bold text-white hover:bg-black">Reach Us Out</Link>
          <Link to="/case-studies" className="rounded-full border border-ink/20 bg-white px-7 py-3 font-bold hover:border-ink">Read Case Studies</Link>
        </div>
        <Dashboard />
      </section>

      <section className="mt-20 overflow-hidden">
        <p className="text-center text-sm font-semibold text-ink/60">Company dashboards designed by CoreDhristi</p>
        <div className="mt-5 flex w-max marquee gap-4">
          {[...logos, ...logos].map((l, i) => <span key={i} className="rounded-full border border-ink/15 bg-white px-8 py-3 font-extrabold text-ink/50">{l}</span>)}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">How an AI agent based CRM works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {how.map(([t, d], i) => (
            <div key={t} className="rounded-3xl border border-ink/10 bg-white p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-extrabold">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="rounded-3xl bg-ink p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold">Reach us out in 3 simple steps</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="rounded-2xl bg-white/5 p-5"><span className="text-brand font-extrabold text-xl">{i + 1}</span><p className="mt-2 font-semibold">{s}</p></li>
            ))}
          </ol>
          <Link to="/reach-us" className="mt-8 inline-block rounded-full bg-brand px-7 py-3 font-bold text-ink">Reach Us Out</Link>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">Real results</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cases.map((c) => (
            <Link to="/case-studies" key={c.name} className="rounded-3xl border border-ink/10 bg-white p-6 hover:border-brand">
              <p className="text-sm font-semibold text-ink/60">{c.name}</p>
              <p className="mt-3 text-5xl font-black text-brand-deep">{c.stat}</p><p className="mt-2 text-sm">{c.text}</p>
            </Link>
          ))}
        </div>
        <Link to="/case-studies" className="mt-8 inline-block rounded-full border-2 border-ink px-6 py-3 font-bold hover:bg-ink hover:text-white">Read all case studies</Link>
      </section>
    </>
  )
}
