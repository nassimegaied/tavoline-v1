import { TomatoSlice } from './About'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-cream/5 px-6 py-14">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <a href="#" className="block">
            <img
              src="/logo.jpg"
              alt="Tavolino Grill & Pasta"
              className="h-12"
              style={{ mixBlendMode: 'screen' }}
            />
          </a>

          {/* Center nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {['Story', 'Menu', 'Gallery', 'Reservations', 'Contact'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="font-body text-[11px] tracking-widest uppercase text-cream/30 hover:text-cream/70 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/p/Tavolino-61552579055711/"
              target="_blank" rel="noopener noreferrer"
              className="text-cream/25 hover:text-tomato transition-colors"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tavolino_tunisia/"
              target="_blank" rel="noopener noreferrer"
              className="text-cream/25 hover:text-tomato transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <TomatoSlice className="w-4 h-4 opacity-30" />
            <p className="font-body text-[10px] text-cream/20 tracking-wide">
              © {year} Tavolino Grill & Pasta · Mégrine, Tunisia
            </p>
          </div>
          <p className="font-body text-[10px] text-cream/15 tracking-wide">
            All rights reserved
          </p>
        </div>

      </div>
    </footer>
  )
}
