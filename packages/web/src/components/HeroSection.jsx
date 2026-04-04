import { useScrollNarrative } from '../hooks/useScrollNarrative'

export default function HeroSection() {
  const sectionRef = useScrollNarrative()

  return (
    <section className="scroll-section hero-section" id="hero" ref={sectionRef}>
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="scroll-sticky">
        <div className="hero-content">
          <div className="hero-logo-wrapper hero-entrance hero-entrance-1" data-scroll-fade="0,0.5">
            <svg viewBox="0 0 180 180" fill="none" className="hero-tree-svg">
              <line x1="90" y1="110" x2="90" y2="155" stroke="var(--ink)" strokeWidth="2.5"/>
              <path d="M90 35 Q58 65 65 100 Q72 118 90 122 Q108 118 115 100 Q122 65 90 35Z" fill="none" stroke="var(--ink)" strokeWidth="2"/>
              <circle cx="78" cy="145" r="5" fill="none" stroke="var(--ink)" strokeWidth="1.8"/>
              <path d="M72 150 Q68 158 70 163 L75 163" fill="none" stroke="var(--ink)" strokeWidth="1.5"/>
              <path d="M83 147 L93 143 L93 149 L83 150Z" fill="var(--ink)" opacity="0.3"/>
              <circle cx="90" cy="18" r="7" fill="var(--amber)" opacity="0.6" className="light-source"/>
              <line x1="90" y1="10" x2="90" y2="4" stroke="var(--amber)" strokeWidth="2" opacity="0.7"/>
              <line x1="80" y1="12" x2="74" y2="6" stroke="var(--amber)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="100" y1="12" x2="106" y2="6" stroke="var(--amber)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="72" y1="18" x2="64" y2="15" stroke="var(--amber)" strokeWidth="1" opacity="0.3"/>
              <line x1="108" y1="18" x2="116" y2="15" stroke="var(--amber)" strokeWidth="1" opacity="0.3"/>
              <path d="M90 25 L82 138" stroke="var(--amber)" strokeWidth="0.8" opacity="0.15" strokeDasharray="3 3"/>
            </svg>
          </div>
          <h1 className="hero-title hero-entrance hero-entrance-2" data-scroll-fade="0,0.55">
            <span className="hero-word">Lux</span><span className="hero-word hero-accent">view</span>
          </h1>
          <p className="hero-tagline hero-entrance hero-entrance-3" data-scroll-fade="0,0.6">Experiências únicas através da tecnologia</p>
        </div>
        <div className="hero-scroll-hint hero-entrance hero-entrance-4" data-scroll-fade="0,0.35">
          <span className="scroll-hint-text">deslize para baixo</span>
          <svg className="scroll-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 10l5 5 5-5"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
