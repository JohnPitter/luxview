import { useScrollNarrative } from '../hooks/useScrollNarrative'
import { useTranslation } from '../i18n'

export default function HeroSection() {
  const { t } = useTranslation()
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
            <span className="hero-meta-text">{t('hero.established')}</span>
          </div>
          <h1 className="hero-title hero-entrance hero-entrance-2" data-scroll-fade="0,0.55">
            <span className="hero-line hero-line-accent">Luxview</span>
          </h1>
          <div className="hero-bottom hero-entrance hero-entrance-3" data-scroll-fade="0,0.6">
            <p className="hero-tagline">{t('hero.tagline')}</p>
            <a href="#sobre" className="hero-scroll-link">
              <span>{t('hero.scroll')}</span>
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
