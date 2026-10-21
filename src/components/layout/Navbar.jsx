import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { services } from "../../data/PortfolioData.js";

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const link = ({ isActive }) => `px-3 py-2 text-sm font-semibold ${isActive ? 'text-brand' : 'text-white/90 hover:text-white'}`
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav className="mx-auto max-w-6xl rounded-full bg-ink px-5 py-3 shadow-xl flex items-center justify-between">
       
<Link
  to="/"
  className="group flex shrink-0 items-center gap-2.5 rounded-xl transition-all duration-300 hover:scale-105"
>
  {/* Logo */}
  <img
    src="https://www.coredhristi.com/coredhristi-logo-light.png"
    alt="CoreD Logo"
    className="h-9 w-auto max-w-36 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.45)] sm:h-11"
  />

 
</Link>

        <div className="hidden lg:flex items-center">
          <NavLink to="/" end className={link}>Home</NavLink>
          <div className="group relative">
            <span className="px-3 py-2 text-sm font-semibold text-white/90 cursor-pointer">Services ▾</span>
            <div className="invisible group-hover:visible group-focus-within:visible absolute left-0 top-full pt-2">
              <div className="w-60 rounded-2xl bg-white p-2 shadow-xl">
                {Object.entries(services).map(([k, s]) => (
                  <Link key={k} to={`/services/${k}`} className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-cream">{s.title}</Link>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/case-studies" className={link}>Case Studies</NavLink>
          <NavLink to="/blog" className={link}>Blog</NavLink>
          <NavLink to="/team" className={link}>Team</NavLink>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/reach-us" className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-ink hover:brightness-110">Reach Us Out</Link>
          <button className="lg:hidden text-white px-2" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden mx-auto mt-2 max-w-6xl rounded-3xl bg-ink p-4 flex flex-col" onClick={() => setOpen(false)}>
          <NavLink to="/" className={link}>Home</NavLink>
          {Object.entries(services).map(([k, s]) => <NavLink key={k} to={`/services/${k}`} className={link}>{s.title}</NavLink>)}
          <NavLink to="/case-studies" className={link}>Case Studies</NavLink>
          <NavLink to="/blog" className={link}>Blog</NavLink>
          <NavLink to="/team" className={link}>Team</NavLink>
        </div>
      )}
    </header>
  )
}
