import { useScrollNarrative } from '../hooks/useScrollNarrative'
import { useTranslation } from '../i18n'

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

            <div className="narrative-text" data-scroll-fade="0.25,0.40">
              <p><span className="narrative-drop-cap">{t('about.drop_cap')}</span>{t('about.text_1')}</p>
            </div>

            <div className="narrative-text" data-scroll-fade="0.50,0.65">
              <p>{t('about.text_2')}</p>
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
