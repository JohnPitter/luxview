import { useRevealAnimation } from '../hooks/useRevealAnimation'
import { useTranslation } from '../i18n/index.jsx'

export default function ValuesSection() {
  const { t } = useTranslation()
  const ref = useRevealAnimation()

  return (
    <section className="section section-values" ref={ref}>
      <div className="values-row">
        <div className="value-pillar">
          <div className="value-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center&q=80"
              alt="Vision"
              className="value-image"
              loading="lazy"
            />
          </div>
          <div className="value-num-outline">01</div>
          <h3 className="value-title">{t('values.title_1')}</h3>
          <p className="value-desc">{t('values.desc_1')}</p>
        </div>
        <div className="value-pillar">
          <div className="value-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&crop=center&q=80"
              alt="Innovation"
              className="value-image"
              loading="lazy"
            />
          </div>
          <div className="value-num-outline">02</div>
          <h3 className="value-title">{t('values.title_2')}</h3>
          <p className="value-desc">{t('values.desc_2')}</p>
        </div>
        <div className="value-pillar">
          <div className="value-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&crop=center&q=80"
              alt="Excellence"
              className="value-image"
              loading="lazy"
            />
          </div>
          <div className="value-num-outline">03</div>
          <h3 className="value-title">{t('values.title_3')}</h3>
          <p className="value-desc">{t('values.desc_3')}</p>
        </div>
      </div>
    </section>
  )
}
