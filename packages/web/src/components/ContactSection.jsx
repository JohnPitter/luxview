import { useRevealAnimation } from '../hooks/useRevealAnimation'
import { useTranslation } from '../i18n/index.jsx'

export default function ContactSection() {
  const { t } = useTranslation()
  const sectionRef = useRevealAnimation()

  return (
    <section className="section section-contact" id="contato">
      <div className="contact-watermark" aria-hidden="true">Luxview</div>
      <div className="section-inner" ref={sectionRef}>
        <div className="section-eyebrow">{t('contact.eyebrow')}</div>
        <h2 className="contact-heading">
          {t('contact.heading_start')} <span className="contact-heading-italic">{t('contact.heading_end')}</span>
        </h2>
        <a href="mailto:contato@luxview.com.br" className="contact-btn">
          <span>contato@luxview.com.br</span>
        </a>
      </div>
    </section>
  )
}
