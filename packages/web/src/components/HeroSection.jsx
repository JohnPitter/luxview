import { useScrollNarrative } from '../hooks/useScrollNarrative'

export default function HeroSection() {
  const sectionRef = useScrollNarrative()

  return (
    <section className="scroll-section hero-section" id="hero" ref={sectionRef}>
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
      <div className="scroll-sticky">
        <div className="hero-content">
          <div className="hero-meta hero-entrance hero-entrance-1" data-scroll-fade="0,0.5">
            <span className="hero-meta-text">Est. 2024 — Global</span>
          </div>
          <h1 className="hero-title hero-entrance hero-entrance-2" data-scroll-fade="0,0.55">
            <span className="hero-line">Architecting</span>
            <span className="hero-line hero-line-accent">Digital</span>
            <span className="hero-line">Legacy.</span>
          </h1>
          <div className="hero-bottom hero-entrance hero-entrance-3" data-scroll-fade="0,0.6">
            <p className="hero-tagline">Experiências únicas através da tecnologia. Forjamos experiências digitais expansivas para marcas ousadas.</p>
            <a href="#sobre" className="hero-scroll-link">
              <span>Scroll to explore</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hero-scroll-arrow">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
