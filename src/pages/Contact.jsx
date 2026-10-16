import { useState } from 'react'
export default function Contact() {
  const [sent, setSent] = useState(false)
  const f = 'w-full rounded-2xl border border-ink/15 bg-white px-4 py-3'
  const submit = (e) => { e.preventDefault(); /* TODO: send to your API */ setSent(true) }
  return (
    <section className="mx-auto max-w-2xl px-6 pt-10">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight">Reach us out</h1>
      <p className="mt-4 text-lg text-ink/70">Fill the form and our team will get back to you.</p>
      {sent ? (
        <p className="mt-10 rounded-3xl bg-white p-8 font-semibold">Thanks! Our team will get back to you soon.</p>
      ) : (
        <form onSubmit={submit} className="mt-10 space-y-4">
          <input required className={f} placeholder="Full name" />
          <input required type="email" className={f} placeholder="Work email" />
          <input className={f} placeholder="Company" />
          <textarea required rows="4" className={f} placeholder="What does your team still do by hand?" />
          <button className="rounded-full bg-brand px-8 py-3 font-bold">Send message</button>
        </form>
      )}
    </section>
  )
}
