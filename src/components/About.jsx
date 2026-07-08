import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 'Daily', label: 'Open 7 days a week' },
  { value: '12–00', label: 'Noon to midnight' },
  { value: '+100', label: 'Dishes & specialties' },
]

function TomatoSlice({ className = '' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`text-tomato ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* seed chambers */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 30 + Math.cos(rad) * 4
        const y1 = 30 + Math.sin(rad) * 4
        const x2 = 30 + Math.cos(rad) * 20
        const y2 = 30 + Math.sin(rad) * 20
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.4" />
        )
      })}
      <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export { TomatoSlice }

export default function About() {
  const titleRef = useScrollReveal({ y: 48, duration: 1 })
  const textRef = useScrollReveal({ y: 32, duration: 0.9, delay: 0.15 })
  const statsRef = useStaggerReveal('.stat-item', { stagger: 0.12, y: 24 })

  return (
    <section id="about" className="bg-ink py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — text */}
          <div>
            <p className="section-label mb-5">Our Story</p>
            <div ref={titleRef}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl italic text-cream leading-[0.95] mb-8">
                Born from a<br />
                love of Italy
              </h2>
            </div>

            <div ref={textRef} className="space-y-5">
              <p className="font-body text-cream/55 text-base leading-relaxed font-light">
                Tavolino — Italian for "small table" — was born from a simple idea: that great food
                doesn't need ceremony, only care. Nestled in the heart of Mégrine, we bring the soul
                of Italian cooking to Tunisia — each dish made with patience, seasonal ingredients,
                and an obsession with getting the details right.
              </p>
              <p className="font-body text-cream/55 text-base leading-relaxed font-light">
                From slow-cooked pastas to flame-grilled meats and stone-baked pizzas, every plate
                is a conversation between tradition and the warmth of this city. Pull up a chair.
                The table is small, the flavour is not.
              </p>
            </div>

            <div className="mt-10">
              <a href="#menu" className="btn-primary">View the Menu</a>
            </div>
          </div>

          {/* Right — stats + decoration */}
          <div className="flex flex-col justify-between h-full">

            {/* Decorative tomato */}
            <div className="flex justify-end mb-10 lg:mb-0">
              <TomatoSlice className="w-28 h-28 lg:w-40 lg:h-40 opacity-20 rotate-12" />
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-1 gap-8 mt-auto pt-8 border-t border-cream/8">
              {stats.map(s => (
                <div key={s.value} className="stat-item flex items-baseline gap-5">
                  <span className="font-display text-4xl text-tomato font-light italic">{s.value}</span>
                  <span className="font-body text-xs text-cream/40 tracking-widest uppercase">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Horizontal rule with tomato dot */}
        <div className="mt-24 flex items-center gap-4">
          <div className="flex-1 h-px bg-cream/8" />
          <TomatoSlice className="w-5 h-5 opacity-40" />
          <div className="flex-1 h-px bg-cream/8" />
        </div>

      </div>
    </section>
  )
}
