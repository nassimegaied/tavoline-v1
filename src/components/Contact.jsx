import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
import { TomatoSlice } from './About'

const hours = [
  { days: 'Monday – Friday', time: '12:00 – 00:00' },
  { days: 'Saturday – Sunday', time: '12:00 – 00:00' },
]

const socials = [
  {
    label: 'Facebook',
    handle: 'Tavolino',
    href: 'https://www.facebook.com/p/Tavolino-61552579055711/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@tavolino_tunisia',
    href: 'https://www.instagram.com/tavolino_tunisia/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Contact() {
  const titleRef = useScrollReveal({ y: 40, duration: 1 })
  const colsRef = useStaggerReveal('.contact-col', { stagger: 0.14, y: 28, start: 'top 80%' })

  return (
    <section id="contact" className="bg-ink py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label mb-4">Find us</p>
          <div ref={titleRef}>
            <h2 className="font-display text-5xl md:text-6xl italic text-cream">Come & Visit</h2>
          </div>
        </div>

        <div ref={colsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Address */}
          <div className="contact-col">
            <h3 className="section-label mb-5">Address</h3>
            <p className="font-display text-2xl italic text-cream mb-2">Rue de la République</p>
            <p className="font-body text-sm text-cream/45">Mégrine, Tunis Governorate</p>
            <p className="font-body text-sm text-cream/45">Tunisia</p>
            <a
              href="https://maps.google.com/?q=Tavolino+Mégrine+Tunisia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 font-body text-[11px] tracking-widest uppercase text-tomato
              border-b border-tomato/30 hover:border-tomato pb-px transition-colors"
            >
              Open in Maps →
            </a>
          </div>

          {/* Hours */}
          <div className="contact-col">
            <h3 className="section-label mb-5">Hours</h3>
            <div className="space-y-4">
              {hours.map(h => (
                <div key={h.days}>
                  <p className="font-body text-xs text-cream/35 tracking-wide mb-0.5">{h.days}</p>
                  <p className="font-display text-2xl italic text-cream">{h.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div className="contact-col">
            <h3 className="section-label mb-5">Contact</h3>

            <a
              href="tel:+21629935888"
              className="block font-display text-2xl italic text-cream hover:text-tomato transition-colors mb-1"
            >
              +216 29 935 888
            </a>
            <p className="font-body text-xs text-cream/30 mb-8 tracking-wide">Reservations & info</p>

            <div className="space-y-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="text-cream/30 group-hover:text-tomato transition-colors">{s.icon}</span>
                  <span className="font-body text-sm text-cream/45 group-hover:text-cream transition-colors">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Map placeholder */}
        <div className="mt-16 relative overflow-hidden h-56 md:h-72 border border-cream/8">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-ink flex items-center justify-center">
            <div className="text-center">
              <TomatoSlice className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-body text-xs text-cream/25 tracking-widest uppercase">Mégrine, Tunisia</p>
              <a
                href="https://maps.google.com/?q=Tavolino+Mégrine+Tunisia"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 btn-ghost text-xs inline-block"
              >
                View on Google Maps
              </a>
            </div>
          </div>
          {/* Optionally embed a real map iframe here */}
        </div>

      </div>
    </section>
  )
}
