import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const locations = [
  {
    id: 'megrine',
    name: 'Tavolino',
    tag: 'Mégrine',
    headline: 'Intimate. Dark. Italian.',
    body: 'The original — a cosy neighbourhood address where candlelit marble tables, late-night conversation, and slow-cooked ragù have always been the point.',
    address: 'Rue de la République, Mégrine',
    phone: '+216 29 935 888',
    hours: 'Daily 12:00 – 00:00',
    image: '/gallery/tavolino megrine.jpg',
    accent: '#D4462E',
  },
  {
    id: 'lac',
    name: 'Jardin Tavolino',
    tag: 'Lac 2',
    headline: 'Grand. Light. Alive.',
    body: 'A two-storey Italian salon overlooking the lake. Cherry blossoms at the centre, warm walnut walls, amber light strips — and a table for ten if you need it.',
    address: 'Lac 2, Tunis',
    phone: '+216 29 935 666',
    hours: 'Daily 12:00 – 00:00',
    image: '/gallery/lac2.jpg',
    accent: '#C9A26A',
  },
]

function LocationCard({ loc, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden group cursor-pointer"
      style={{ minHeight: '520px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <img
          src={loc.image}
          alt={loc.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />

      {/* Accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ background: loc.accent }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-px" style={{ background: loc.accent }} />
          <span className="font-body text-[10px] tracking-widest uppercase" style={{ color: loc.accent }}>
            {loc.tag}
          </span>
        </div>

        <h3 className="font-display italic text-cream text-4xl md:text-5xl leading-tight mb-2">
          {loc.name}
        </h3>

        <p className="font-body text-xs tracking-widest uppercase text-cream/40 mb-4">
          {loc.headline}
        </p>

        <motion.p
          className="font-body text-sm text-cream/55 leading-relaxed max-w-xs mb-6"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.35 }}
        >
          {loc.body}
        </motion.p>

        <div className="space-y-1 mb-6">
          <p className="font-body text-xs text-cream/30">{loc.address}</p>
          <a
            href={`tel:${loc.phone.replace(/\s/g, '')}`}
            className="block font-display text-xl italic transition-colors hover:opacity-80"
            style={{ color: loc.accent }}
          >
            {loc.phone}
          </a>
          <p className="font-body text-[10px] tracking-wide text-cream/25 uppercase">{loc.hours}</p>
        </div>

        <a
          href="#reservations"
          className="self-start font-body text-[11px] tracking-widest uppercase px-5 py-2.5 border transition-all duration-300"
          style={{
            borderColor: loc.accent,
            color: hovered ? '#F2EDE4' : loc.accent,
            background: hovered ? loc.accent : 'transparent',
          }}
        >
          Reserve Here
        </a>
      </div>
    </motion.div>
  )
}

export default function Locations() {
  const titleRef = useScrollReveal({ y: 40, duration: 1 })

  return (
    <section id="locations" className="bg-charcoal py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label mb-4">Two addresses</p>
          <div ref={titleRef}>
            <h2 className="font-display text-5xl md:text-6xl italic text-cream">Choose your evening</h2>
          </div>
          <p className="mt-4 font-body text-sm text-cream/35 max-w-md mx-auto leading-relaxed">
            Each address has its own character. Same heart, same kitchen obsession — completely different atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
