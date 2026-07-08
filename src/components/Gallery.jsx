import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const photos = [
  {
    id: 1,
    src: '/gallery/491417245_17909715204102317_2486132530746889434_n.jpg',
    label: 'Tagliatelle au Poulet Croustillant',
    sub: 'Pasta',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 2,
    src: '/gallery/472844496_122195143622085968_6544792708775862420_n.jpg',
    label: 'Risotto aux Fruits de Mer',
    sub: 'Pasta & Risotto',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 3,
    src: '/gallery/467770743_17890865175102317_2109437998874622924_n.jpg',
    label: 'Tarte au Chocolat',
    sub: 'Desserts',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    src: '/gallery/468081450_17890864920102317_255322970350888397_n.jpg',
    label: 'Cheesecake Caramel Salé',
    sub: 'Desserts',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 5,
    src: '/gallery/tavolino megrine.jpg',
    label: 'Tavolino Mégrine',
    sub: 'Our Space',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 6,
    src: '/gallery/468031663_17890862613102317_4965505887570975841_n.jpg',
    label: 'Falafel Maison',
    sub: 'Entrées',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 7,
    src: '/gallery/Risotto.jpg',
    label: 'Risotto au Poulet',
    sub: 'Pasta & Risotto',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 8,
    src: '/gallery/495378924_17910266616102317_7786130961937882585_n.jpg',
    label: 'Salade Fraîcheur',
    sub: 'Salades',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 9,
    src: '/gallery/lac2.jpg',
    label: 'Jardin Tavolino — Lac 2',
    sub: 'Our Space',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 10,
    src: '/gallery/lazane.jpg',
    label: 'Lasagne Maison',
    sub: 'Pasta',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 11,
    src: '/gallery/tavolino lac.jpg',
    label: 'Jardin Tavolino — Intérieur',
    sub: 'Our Space',
    span: 'col-span-1 row-span-1',
  },
]

function GalleryCard({ photo, index }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className={`${photo.span} relative group overflow-hidden cursor-pointer bg-charcoal`}
    >
      {/* Real photo */}
      <img
        src={photo.src}
        alt={photo.label}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
          group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionProperty: 'transform, opacity' }}
      />

      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-charcoal animate-pulse" />
      )}

      {/* Always-visible dark vignette at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)' }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 md:p-5
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 65%)' }}
      >
        <span className="font-body text-[9px] tracking-widest uppercase text-tomato mb-1">{photo.sub}</span>
        <span className="font-display italic text-cream text-lg md:text-xl leading-snug">{photo.label}</span>
      </div>

      {/* Tomato corner tick */}
      <div className="absolute top-0 left-0 w-0 h-0
        border-t-[28px] border-l-[28px] border-t-tomato/40 border-l-transparent
        group-hover:border-t-tomato/80 transition-all duration-300" />
    </motion.div>
  )
}

export default function Gallery() {
  const titleRef = useScrollReveal({ y: 40, duration: 1 })

  return (
    <section id="gallery" className="bg-ink py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label mb-4">Moments at Tavolino</p>
          <div ref={titleRef}>
            <h2 className="font-display text-5xl md:text-6xl italic text-cream">The Gallery</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 auto-rows-[170px] md:auto-rows-[210px]">
          {photos.map((photo, i) => (
            <GalleryCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center font-body text-[10px] text-cream/20 tracking-widest uppercase">
          Follow us · <a href="https://www.instagram.com/tavolino_tunisia/" target="_blank" rel="noopener noreferrer"
            className="hover:text-cream/40 transition-colors">@tavolino_tunisia</a>
        </p>

      </div>
    </section>
  )
}
