import { useEffect, useRef } from 'react'

const sections = []
let scrollListenerActive = false
let ticking = false

function updateAllSections() {
  const scrollY = window.scrollY
  for (let s = 0; s < sections.length; s++) {
    const { sectionTop, sectionHeight, viewportHeight, fadeElements } = sections[s]
    const scrolled = scrollY - sectionTop
    const scrollableDistance = sectionHeight - viewportHeight

    if (scrollableDistance <= 0) continue
    if (scrolled < -viewportHeight || scrolled > sectionHeight) continue

    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance))

    for (let i = 0; i < fadeElements.length; i++) {
      const { el, fadeIn, fadeOut } = fadeElements[i]

      let opacity = 0
      let translateY = 40
      let scale = 0.97

      if (fadeIn === 0 && progress <= fadeOut) {
        opacity = 1
        translateY = 0
        scale = 1
      } else if (progress < fadeIn) {
        const t = Math.max(0, (progress - (fadeIn - 0.06)) / 0.06)
        opacity = t
        translateY = 40 * (1 - t)
        scale = 0.97 + 0.03 * t
      } else if (progress >= fadeIn && progress <= fadeOut) {
        opacity = 1
        translateY = 0
        scale = 1
      }

      if (progress > fadeOut) {
        const t = Math.min(1, (progress - fadeOut) / 0.06)
        opacity = 1 - t
        translateY = -30 * t
        scale = 1 - 0.02 * t
      }

      el.style.opacity = opacity
      el.style.transform = `translateY(${translateY}px) scale(${scale})`
    }
  }
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(() => {
      updateAllSections()
      ticking = false
    })
  }
}

function onResize() {
  for (let s = 0; s < sections.length; s++) {
    const entry = sections[s]
    const scrollY = window.scrollY
    entry.sectionTop = entry.section.offsetTop || (entry.section.getBoundingClientRect().top + scrollY)
    entry.sectionHeight = entry.section.offsetHeight
    entry.viewportHeight = window.innerHeight
  }
  updateAllSections()
}

function startListening() {
  if (!scrollListenerActive) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    scrollListenerActive = true
  }
}

function stopListening() {
  if (scrollListenerActive && sections.length === 0) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    scrollListenerActive = false
  }
}

export function useScrollNarrative() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const rawElements = section.querySelectorAll('[data-scroll-fade]')
    const fadeElements = Array.from(rawElements).map(el => {
      const [fadeIn, fadeOut] = el.dataset.scrollFade.split(',').map(Number)
      el.style.willChange = 'opacity, transform'
      return { el, fadeIn, fadeOut }
    })

    const scrollY = window.scrollY
    const entry = {
      section,
      fadeElements,
      sectionTop: section.offsetTop || (section.getBoundingClientRect().top + scrollY),
      sectionHeight: section.offsetHeight,
      viewportHeight: window.innerHeight
    }

    sections.push(entry)
    startListening()
    updateAllSections()

    return () => {
      const idx = sections.indexOf(entry)
      if (idx > -1) sections.splice(idx, 1)
      fadeElements.forEach(({ el }) => { el.style.willChange = '' })
      stopListening()
    }
  }, [])

  return sectionRef
}
