import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import SeeOurWork from './pages/SeeOurWork.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Blog from './pages/Blog.jsx'
import TermsCondition from './pages/TermsCondition.jsx'

import PrivacyPolicy from './pages/PrivacyPolicy.jsx'

import WordReveal from './components/ui/WordReveal.jsx'
import CustomCursor from './components/ui/CustomCurser.jsx'
import { ChatbotWidget } from './components/chatbot/ChatbotWidget.jsx'


export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])



  return (
    <>
      <CustomCursor />
      <WordReveal />
      <Navbar />
      {/* The home hero supplies its own navbar clearance; outer padding exposes the cream body. */}
      <main className={pathname === '/' ? 'min-h-screen' : 'min-h-screen pt-28'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path='/see-our-work' element={<SeeOurWork/>} />
          <Route path="/case-studies/:id" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reach-us" element={<Contact />} />
          <Route path="/termsCondition" element={<TermsCondition />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
        </Routes>
      </main>
      <Footer />

      <ChatbotWidget />
    </>
  );
}
