import { useEffect, useRef } from 'react'

export function useRevealAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('reveal-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}

export function useRevealAnimations(selector) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach((el, i) => {
      el.classList.add('reveal-on-scroll')
      el.style.setProperty('--card-index', i)
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [selector])

  return containerRef
}
