import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Locations from './components/Locations'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reservations from './components/Reservations'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    return () => ScrollTrigger.killAll()
  }, [])

  return (
    <div className="bg-ink text-cream overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Locations />
      <Menu />
      <Gallery />
      <Reservations />
      <Contact />
      <Footer />
    </div>
  )
}
