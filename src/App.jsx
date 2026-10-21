import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from "./components/layout/Navbar.jsx"
import Footer from "./components/layout/Footer.jsx"
import Home from './pages/Home.jsx'
import Service from './pages/Service.jsx'
import Contact from './pages/Contact.jsx'
import CaseStudies from "./pages/CaseStudies.jsx";
import Blog from "./pages/Blog.jsx";
import Team from "./pages/Team.jsx";
import TermsCondition from "./pages/TermsCondition.jsx";

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
          <Route path="/termsCondition" element={TermsCondition} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}
