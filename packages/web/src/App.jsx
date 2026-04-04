import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (location.pathname === '/admin') return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    function handleAnchorClick(e) {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return

      const targetId = link.getAttribute('href')
      if (!targetId || targetId === '#') return

      const target = document.querySelector(targetId)
      if (!target) return

      e.preventDefault()
      window.history.replaceState(null, '', targetId)

      // Logo / top of page
      if (targetId === '#hero') {
        lenis.scrollTo(0, { duration: 1.6 })
        return
      }

      const isScrollNarrative = target.classList.contains('scroll-section')

      if (isScrollNarrative) {
        // First, jump quickly to the start of the target section
        // Then scroll slowly through the narrative content
        const sectionTop = target.offsetTop
        const currentY = window.scrollY
        const distanceToSection = Math.abs(sectionTop - currentY)

        let nextSection = target.nextElementSibling
        while (nextSection && nextSection.classList.contains('scroll-section')) {
          nextSection = nextSection.nextElementSibling
        }

        const scrollEnd = nextSection
          ? nextSection.offsetTop - 60
          : target.offsetTop + target.offsetHeight - window.innerHeight

        if (distanceToSection > 200) {
          // Jump fast to the section, then slow-scroll through it
          lenis.scrollTo(sectionTop, {
            duration: 1.2,
            onComplete: () => {
              const narrativeDistance = Math.abs(scrollEnd - sectionTop)
              const duration = Math.max(14, narrativeDistance / 40)
              lenis.scrollTo(scrollEnd, {
                duration: Math.min(duration, 30),
                easing: (t) => t,
              })
            },
          })
        } else {
          // Already near the section, just scroll slowly
          const distance = Math.abs(scrollEnd - currentY)
          const duration = Math.max(14, distance / 40)
          lenis.scrollTo(scrollEnd, {
            duration: Math.min(duration, 30),
            easing: (t) => t,
          })
        }
      } else {
        // Non-narrative sections (Serviços, Projetos, etc.)
        // Jump instantly then smooth-land, so we don't animate through narratives
        const targetY = target.offsetTop - 60

        // If we'd scroll through narrative sections, teleport instead
        const narrativeSections = document.querySelectorAll('.scroll-section')
        const currentY = window.scrollY
        let crossesNarrative = false

        narrativeSections.forEach(section => {
          const sTop = section.offsetTop
          const sBottom = sTop + section.offsetHeight
          const scrollingDown = targetY > currentY
          // Check if a narrative section sits between current position and target
          if (scrollingDown && sTop > currentY + window.innerHeight && sBottom < targetY) {
            crossesNarrative = true
          } else if (!scrollingDown && sBottom < currentY && sTop > targetY) {
            crossesNarrative = true
          }
        })

        if (crossesNarrative) {
          // Disable smooth scroll, jump near target, then smooth the last bit
          lenis.stop()
          window.scrollTo(0, targetY - 200)
          lenis.start()
          requestAnimationFrame(() => {
            lenis.scrollTo(targetY, { duration: 0.8 })
          })
        } else {
          const distance = Math.abs(target.getBoundingClientRect().top)
          const duration = Math.max(1.2, Math.min(2.5, distance / 600))
          lenis.scrollTo(target, { offset: -60, duration })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
