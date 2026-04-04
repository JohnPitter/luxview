import { useScrollNarrative } from '../hooks/useScrollNarrative'
import { useTranslation } from '../i18n/index.jsx'

export default function AboutSection() {
  const { t } = useTranslation()
  const sectionRef = useScrollNarrative()

  return (
    <section className="scroll-section about-section" id="sobre" ref={sectionRef}>
      <div className="scroll-sticky">
        <div className="narrative-block">
          <div className="narrative-label" data-scroll-fade="0,0.92">
            <span>{t('about.label')}</span>
          </div>
          <div className="narrative-content">
            <div className="narrative-text narrative-large" data-scroll-fade="0,0.15">
              <h2 className="narrative-heading">
                <span className="narrative-heading-dim">{t('about.heading_dim')}</span>
                <span className="narrative-heading-light">{t('about.heading_light')}</span>
              </h2>
            </div>

            <div className="narrative-text narrative-with-image" data-scroll-fade="0.25,0.40">
              <div className="narrative-text-content">
                <p><span className="narrative-drop-cap">{t('about.drop_cap')}</span>{t('about.text_1')}</p>
              </div>
              <div className="narrative-image">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop"
                  alt="Architecture"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="narrative-text narrative-with-image reverse" data-scroll-fade="0.50,0.65">
              <div className="narrative-image">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80&auto=format&fit=crop"
                  alt="Technology"
                  loading="lazy"
                />
              </div>
              <div className="narrative-text-content">
                <p>{t('about.text_2')}</p>
              </div>
            </div>

            <div className="narrative-text narrative-emphasis" data-scroll-fade="0.75,0.92">
              <p>{t('about.text_3')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
