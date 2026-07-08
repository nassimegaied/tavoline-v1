import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { TomatoSlice } from './About'

const venues = [
  { id: 'megrine', name: 'Tavolino', tag: 'Mégrine', phone: '+216 29 935 888', accent: '#D4462E' },
  { id: 'lac', name: 'Jardin Tavolino', tag: 'Lac 2', phone: '+216 29 935 666', accent: '#C9A26A' },
]

const guestOptions = ['1 person', '2 people', '3–4 people', '5–6 people', '7+ people']

export default function Reservations() {
  const [activeVenue, setActiveVenue] = useState('megrine')
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '', note: '' })
  const [submitted, setSubmitted] = useState(false)
  const titleRef = useScrollReveal({ y: 40, duration: 1 })
  const formRef = useScrollReveal({ y: 28, duration: 0.9, delay: 0.2 })

  const venue = venues.find(v => v.id === activeVenue)
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="reservations" className="bg-charcoal py-28 md:py-40 px-6 relative overflow-hidden">

      <TomatoSlice className="absolute -right-12 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.04] rotate-45" />

      <div className="max-w-2xl mx-auto relative">

        <div className="text-center mb-10">
          <p className="section-label mb-4">Join us tonight</p>
          <div ref={titleRef}>
            <h2 className="font-display text-5xl md:text-6xl italic text-cream">Reserve a Table</h2>
          </div>
        </div>

        {/* Venue tabs */}
        <div className="flex gap-2 mb-10 border-b border-cream/8 pb-0">
          {venues.map(v => (
            <button
              key={v.id}
              onClick={() => { setActiveVenue(v.id); setSubmitted(false) }}
              className="relative pb-3 px-1 font-body text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: activeVenue === v.id ? v.accent : 'rgba(242,237,228,0.3)' }}
            >
              <span>{v.name}</span>
              <span className="block text-[9px] tracking-wide normal-case opacity-60 mt-0.5">{v.tag}</span>
              {activeVenue === v.id && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: v.accent }}
                />
              )}
            </button>
          ))}
        </div>

        <p className="mb-8 font-body text-sm text-cream/35 text-center">
          Or call us directly:{' '}
          <a href={`tel:${venue.phone.replace(/\s/g, '')}`} className="hover:underline transition-colors" style={{ color: venue.accent }}>
            {venue.phone}
          </a>
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="text-center py-16 border px-8"
              style={{ borderColor: `${venue.accent}33` }}
            >
              <TomatoSlice className="w-14 h-14 mx-auto mb-6" style={{ color: venue.accent }} />
              <h3 className="font-display text-3xl italic text-cream mb-3">Table Reserved</h3>
              <p className="font-body text-sm text-cream/45 leading-relaxed">
                Thank you, <strong className="text-cream">{form.name}</strong>. We've received your request
                for <strong className="text-cream">{venue.name} — {venue.tag}</strong> and will confirm shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '', note: '' }) }}
                className="mt-8 btn-ghost text-sm"
              >
                Make another reservation
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeVenue}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              ref={formRef}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your name" accent={venue.accent} />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+216 XX XXX XXX" accent={venue.accent} />
                </div>
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" accent={venue.accent} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Date" name="date" type="date" value={form.date} onChange={handleChange} required accent={venue.accent} />
                  <Field label="Time" name="time" type="time" value={form.time} onChange={handleChange} min="12:00" max="22:30" required accent={venue.accent} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[10px] tracking-widest uppercase text-cream/35">Guests</label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    required
                    className="bg-ink border border-cream/10 text-cream/70 font-body text-sm px-4 py-3
                    focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ '--tw-ring-color': venue.accent }}
                    onFocus={e => e.target.style.borderColor = venue.accent}
                    onBlur={e => e.target.style.borderColor = 'rgba(242,237,228,0.1)'}
                  >
                    <option value="" disabled>Select number of guests</option>
                    {guestOptions.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[10px] tracking-widest uppercase text-cream/35">
                    Special Requests <span className="normal-case text-cream/20">(optional)</span>
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Allergies, celebrations, seating preferences…"
                    className="bg-ink border border-cream/10 text-cream/70 font-body text-sm px-4 py-3
                    focus:outline-none transition-colors resize-none placeholder:text-cream/20"
                    onFocus={e => e.target.style.borderColor = venue.accent}
                    onBlur={e => e.target.style.borderColor = 'rgba(242,237,228,0.1)'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-body text-[11px] tracking-widest uppercase py-4 text-ink transition-all duration-300 mt-2"
                  style={{ background: venue.accent }}
                  onMouseEnter={e => e.target.style.opacity = '0.85'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  Confirm Reservation — {venue.name}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[10px] tracking-widest uppercase text-cream/35">{label}</label>
      <input
        {...props}
        className="bg-ink border border-cream/10 text-cream/80 font-body text-sm px-4 py-3
        focus:outline-none focus:border-tomato transition-colors placeholder:text-cream/20
        [color-scheme:dark]"
      />
    </div>
  )
}
