import { useRevealAnimation } from '../hooks/useRevealAnimation'
import { useTranslation } from '../i18n'

export default function ValuesSection() {
  const { t } = useTranslation()
  const ref = useRevealAnimation()

  return (
    <section className="section section-values" ref={ref}>
      <div className="values-row">
        <div className="value-pillar">
          <div className="value-num-outline">01</div>
          <h3 className="value-title">{t('values.title_1')}</h3>
          <p className="value-desc">{t('values.desc_1')}</p>
        </div>
        <div className="value-pillar">
          <div className="value-num-outline">02</div>
          <h3 className="value-title">{t('values.title_2')}</h3>
          <p className="value-desc">{t('values.desc_2')}</p>
        </div>
        <div className="value-pillar">
          <div className="value-num-outline">03</div>
          <h3 className="value-title">{t('values.title_3')}</h3>
          <p className="value-desc">{t('values.desc_3')}</p>
        </div>
      </div>
    </section>
  )
}
