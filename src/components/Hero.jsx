import { useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const HeroScene = lazy(() => import('./HeroScene'))

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <span className="font-body text-[10px] tracking-widest2 uppercase text-cream/30">Scroll</span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-cream/30 to-transparent"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  )
}

export default function Hero() {
  const logoRef = useRef(null)
  const tagRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
    )
    .fromTo(tagRef.current,
      { opacity: 0, y: 16, letterSpacing: '0.6em' },
      { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15 },
      '-=0.5'
    )
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Three.js atmospheric background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-ink" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.75) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Logo — mix-blend-mode:screen makes the black bg invisible */}
        <img
          ref={logoRef}
          src="/logo.jpg"
          alt="Tavolino Grill & Pasta"
          className="w-56 sm:w-72 md:w-80 mb-6"
          style={{ mixBlendMode: 'screen', opacity: 0 }}
        />

        <p
          ref={tagRef}
          className="font-body text-[11px] text-cream/50 uppercase tracking-widest2 mb-10"
          style={{ opacity: 0 }}
        >
          Mégrine &nbsp;·&nbsp; Tunisia
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a href="#reservations" className="btn-primary">
            Reserve a Table
          </a>
          <a href="#menu" className="btn-ghost">
            Explore Menu
          </a>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
