import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Services from './sections/Services'
import About from './sections/About'
import Work from './sections/Work'
import Process from './sections/Process'
import Benefits from './sections/Benefits'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Re-compute ScrollTrigger on resize
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      lenis.destroy()
      gsap.ticker.remove()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Work />
        <Process />
        <Benefits />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
