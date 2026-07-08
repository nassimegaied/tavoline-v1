import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 82%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      el,
      { opacity: 0, y: options.y ?? 36 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.85,
        ease: options.ease ?? 'power2.out',
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0,
      }
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return ref
}

export function useStaggerReveal(selector, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const els = container.querySelectorAll(selector)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: options.start || 'top 78%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      els,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.7,
        ease: options.ease ?? 'power2.out',
        stagger: options.stagger ?? 0.1,
        delay: options.delay ?? 0,
      }
    )

    return () => tl.kill()
  }, [selector])

  return containerRef
}
