import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Story', href: '#about' },
  { label: 'Locations', href: '#locations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink/90 backdrop-blur-sm border-b border-cream/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left links */}
          <div className="hidden md:flex gap-8">
            {links.slice(0, 2).map(l => (
              <NavLink key={l.label} href={l.href}>{l.label}</NavLink>
            ))}
          </div>

          {/* Logo center */}
          <a href="#" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/logo.jpg"
              alt="Tavolino"
              className="h-8"
              style={{ mixBlendMode: 'screen' }}
            />
          </a>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-8">
            {links.slice(2).map(l => (
              <NavLink key={l.label} href={l.href}>{l.label}</NavLink>
            ))}
            <a
              href="#reservations"
              className="font-body text-[11px] tracking-widest uppercase text-tomato border border-tomato px-5 py-2
              hover:bg-tomato hover:text-cream transition-all duration-300"
            >
              Book
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-cream block"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-px bg-cream block"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-cream block"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.15 }}
                className="font-display text-4xl italic text-cream hover:text-tomato transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#reservations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="btn-primary mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Reserve a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="font-body text-[11px] tracking-widest uppercase text-cream/50 hover:text-cream transition-colors duration-300 relative group"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-tomato group-hover:w-full transition-all duration-300" />
    </a>
  )
}
