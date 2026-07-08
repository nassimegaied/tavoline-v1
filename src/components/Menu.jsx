import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
import { TomatoSlice } from './About'

const categories = [
  {
    id: 'pasta',
    label: 'Pasta & Risotto',
    icon: '🍝',
    description: 'Handmade daily, cooked to order',
    items: [
      { name: 'Spaghetti al Pomodoro', desc: 'San Marzano tomato, basil, olive oil', price: '22' },
      { name: 'Rigatoni alla Carbonara', desc: 'Egg, pecorino, guanciale, black pepper', price: '26' },
      { name: 'Pappardelle al Ragù', desc: 'Slow-cooked beef & pork ragù, parmigiano', price: '28' },
      { name: 'Risotto ai Funghi', desc: 'Porcini, white wine, parmigiano, truffle oil', price: '30' },
      { name: 'Linguine Frutti di Mare', desc: 'Mixed seafood, white wine, cherry tomato', price: '34' },
    ],
  },
  {
    id: 'grill',
    label: 'Grill',
    icon: '🥩',
    description: 'Flame-grilled to perfection',
    items: [
      { name: 'Entrecôte Grillée', desc: '300g aged beef, herbs, roasted potato', price: '58' },
      { name: 'Brochettes Mixtes', desc: 'Beef & chicken, house-made chermoula', price: '38' },
      { name: 'Côtelettes d\'Agneau', desc: 'French-cut lamb chops, rosemary, garlic', price: '52' },
      { name: 'Poulet au Grill', desc: 'Half chicken, lemon, herbs, frites', price: '30' },
      { name: 'Merguez & Boulettes', desc: 'House-made, harissa, fresh bread', price: '26' },
    ],
  },
  {
    id: 'pizza',
    label: 'Pizza',
    icon: '🍕',
    description: 'Stone-baked, thin-crust',
    items: [
      { name: 'Margherita', desc: 'San Marzano, fior di latte, basil', price: '18' },
      { name: 'Diavola', desc: 'Spicy salami, tomato, mozzarella, chilli', price: '22' },
      { name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, fontina, parmigiano', price: '24' },
      { name: 'Prosciutto e Rucola', desc: 'Parma ham, rocket, cherry tomato, parmesan', price: '26' },
      { name: 'Tavolino Special', desc: 'Mixed grill topping, peppers, house sauce', price: '28' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    icon: '🍮',
    description: 'Dolci & drinks to finish',
    items: [
      { name: 'Tiramisu Classico', desc: 'Mascarpone, espresso, savoiardi, cocoa', price: '14' },
      { name: 'Panna Cotta', desc: 'Vanilla, wild berry coulis', price: '12' },
      { name: 'Fondant au Chocolat', desc: 'Warm chocolate core, vanilla ice cream', price: '16' },
      { name: 'Salade de Fruits', desc: 'Fresh seasonal fruits, honey, mint', price: '10' },
      { name: 'Café Italien', desc: 'Espresso, macchiato, or cappuccino', price: '6' },
    ],
  },
]

function MenuItem({ name, desc, price, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group flex items-baseline gap-3 py-4 border-b border-cream/6 last:border-0
      hover:border-tomato/20 transition-colors cursor-default"
    >
      <div className="flex-1 min-w-0">
        <span className="font-display text-lg text-cream group-hover:text-tomato transition-colors">
          {name}
        </span>
        <span className="block font-body text-xs text-cream/35 mt-0.5 leading-relaxed">{desc}</span>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1">
        <span className="font-body text-xs text-cream/30">TND</span>
        <span className="font-display text-xl text-gold font-light">{price}</span>
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('pasta')
  const titleRef = useScrollReveal({ y: 40, duration: 1 })
  const tabsRef = useStaggerReveal('.tab-btn', { stagger: 0.08, y: 16, start: 'top 85%' })

  const activeCategory = categories.find(c => c.id === active)

  return (
    <section id="menu" className="bg-charcoal py-28 md:py-40 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label mb-4">What we serve</p>
          <div ref={titleRef}>
            <h2 className="font-display text-5xl md:text-6xl italic text-cream">The Menu</h2>
          </div>
        </div>

        {/* Category tabs */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`tab-btn font-body text-[11px] tracking-widest uppercase px-6 py-2.5 border transition-all duration-300
              ${active === cat.id
                ? 'border-tomato bg-tomato text-cream'
                : 'border-cream/15 text-cream/40 hover:border-cream/40 hover:text-cream/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active category */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="divider-tomato" />
                <p className="font-body text-xs text-cream/35 tracking-widest uppercase">
                  {activeCategory.description}
                </p>
              </div>

              <div>
                {activeCategory.items.map((item, i) => (
                  <MenuItem key={item.name} {...item} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <div className="mt-14 flex items-center gap-4">
          <TomatoSlice className="w-5 h-5 opacity-30" />
          <p className="font-body text-[11px] text-cream/25 tracking-wide">
            All prices in Tunisian Dinar (TND) · Menu changes seasonally
          </p>
        </div>

      </div>
    </section>
  )
}
