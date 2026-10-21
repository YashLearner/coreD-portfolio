import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-white">CORE D</p>
          <p className="mt-2 text-sm">AI agent based CRM, a CoreDhristi product.</p>
        </div>
        <div className="text-sm flex flex-col gap-2">
          <Link to="/services/ai-crm">AI Agent Based CRM</Link>
          <Link to="/services/cyber-security">Cyber Security</Link>
          <Link to="/services/cloud-devops">Cloud & DevOps</Link>
        </div>
        <div className="text-sm flex flex-col gap-2">
          <Link to="/team">Team</Link><Link to="/reach-us">Reach Us Out</Link><Link to="/terms">Terms & Conditions</Link>
          <a href="https://www.coredhristi.com/" className="text-brand">Visit CoreDhristi</a>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} CoreD. All rights reserved.</p>
    </footer>
  )
}
