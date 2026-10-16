import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Service from './pages/Service.jsx'
import { CaseStudies, Blog, Team, Terms } from './pages/Pages.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<Service />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reach-us" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
