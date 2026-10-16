import { Link, useParams, Navigate } from 'react-router-dom'
import { services } from '../data.js'
export default function Service() {
  const s = services[useParams().slug]
  if (!s) return <Navigate to="/" />
  return (
    <section className="mx-auto max-w-4xl px-6 pt-10">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight">{s.title}</h1>
      <p className="mt-5 text-xl text-ink/70">{s.lead}</p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {s.points.map((p) => <li key={p} className="rounded-3xl border border-ink/10 bg-white p-6 font-semibold">{p}</li>)}
      </ul>
      <Link to="/reach-us" className="mt-10 inline-block rounded-full bg-brand px-7 py-3 font-bold">Reach Us Out</Link>
    </section>
  )
}
