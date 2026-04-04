import { useState, useEffect } from 'react'
import { useRevealAnimations } from '../hooks/useRevealAnimation'
import { useTranslation } from '../i18n/index.jsx'

const STORAGE_KEY = 'luxview_services'

const SERVICE_ICONS = {
  web: <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M6 18h36" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/><circle cx="18" cy="14" r="1.5" fill="currentColor"/><path d="M14 26l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  mobile: <svg viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="40" rx="4" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="12" x2="34" y2="12" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="36" x2="34" y2="36" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="40" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  enterprise: <svg viewBox="0 0 48 48" fill="none"><path d="M24 4L4 16v16l20 12 20-12V16L24 4z" stroke="currentColor" strokeWidth="2"/><path d="M4 16l20 12 20-12" stroke="currentColor" strokeWidth="2"/><line x1="24" y1="28" x2="24" y2="44" stroke="currentColor" strokeWidth="2"/></svg>,
  design: <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/><line x1="24" y1="6" x2="24" y2="18" stroke="currentColor" strokeWidth="1.5"/><line x1="24" y1="30" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5"/></svg>,
  digital: <svg viewBox="0 0 48 48" fill="none"><path d="M8 36V20l16-12 16 12v16" stroke="currentColor" strokeWidth="2"/><rect x="18" y="28" width="12" height="12" stroke="currentColor" strokeWidth="2"/><path d="M4 40h40" stroke="currentColor" strokeWidth="2"/></svg>,
  ai: <svg viewBox="0 0 48 48" fill="none"><path d="M12 24c0-8 5-16 12-16s12 8 12 16" stroke="currentColor" strokeWidth="2"/><path d="M16 24c0-5 3.5-10 8-10s8 5 8 10" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="24" r="3" fill="currentColor"/><path d="M24 27v12" stroke="currentColor" strokeWidth="2"/><path d="M18 39h12" stroke="currentColor" strokeWidth="2"/></svg>,
  cloud: <svg viewBox="0 0 48 48" fill="none"><path d="M14 36c-4.4 0-8-3.6-8-8 0-3.7 2.5-6.8 6-7.7C12.7 15 17.8 11 24 11c7.2 0 13 5.1 13.7 11.6C41 23.4 44 26.9 44 31c0 4.4-3.6 8-8 8H14z" stroke="currentColor" strokeWidth="2"/></svg>,
  security: <svg viewBox="0 0 48 48" fill="none"><path d="M24 4L8 12v12c0 10.5 6.8 20.3 16 24 9.2-3.7 16-13.5 16-24V12L24 4z" stroke="currentColor" strokeWidth="2"/><path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  data: <svg viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="12" rx="14" ry="6" stroke="currentColor" strokeWidth="2"/><path d="M10 12v12c0 3.3 6.3 6 14 6s14-2.7 14-6V12" stroke="currentColor" strokeWidth="2"/><path d="M10 24v12c0 3.3 6.3 6 14 6s14-2.7 14-6V24" stroke="currentColor" strokeWidth="2"/></svg>,
}

const DEFAULT_SERVICES = [
  { id: '1', icon: 'web', title: 'Aplicações Web', description: 'Plataformas web modernas, responsivas e intuitivas.', tags: ['E-commerce', 'SaaS', 'Portais', 'Dashboards'] },
  { id: '2', icon: 'mobile', title: 'Aplicativos Mobile', description: 'Apps nativos e híbridos com experiências fluidas.', tags: ['iOS', 'Android', 'React Native', 'Flutter'] },
  { id: '3', icon: 'enterprise', title: 'Sistemas Empresariais', description: 'ERPs, CRMs e automações sob medida.', tags: ['ERP', 'CRM', 'Automação', 'Integrações'] },
  { id: '4', icon: 'design', title: 'UX/UI Design', description: 'Interfaces que encantam e transformam interações.', tags: ['Interfaces', 'Protótipos', 'Design System', 'Pesquisa UX'] },
  { id: '5', icon: 'digital', title: 'Transformação Digital', description: 'Consultoria estratégica para modernizar sua empresa.', tags: ['Consultoria', 'Estratégia', 'Cloud', 'DevOps'] },
  { id: '6', icon: 'ai', title: 'Inteligência Artificial', description: 'Soluções com IA que automatizam e personalizam.', tags: ['Machine Learning', 'Chatbots', 'Analytics', 'NLP'] },
]

export { STORAGE_KEY as SERVICES_STORAGE_KEY, SERVICE_ICONS, DEFAULT_SERVICES }

export default function ServicesSection() {
  const { t } = useTranslation()
  const gridRef = useRevealAnimations('.service-card')
  const [services, setServices] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setServices(JSON.parse(stored))
    } else {
      setServices(DEFAULT_SERVICES)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SERVICES))
    }
  }, [])

  return (
    <section className="section section-services" id="servicos">
      <div className="section-inner">
        <div className="section-eyebrow">{t('services.eyebrow')}</div>
        <h2 className="section-heading">
          {t('services.heading').split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br/>}</span>
          ))}
        </h2>
        <div className="services-grid" ref={gridRef}>
          {services.map((service, index) => (
            <div className="service-card" key={service.id} style={{ '--card-index': index }}>
              <div className="service-icon">{SERVICE_ICONS[service.icon]}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-tags">
                {service.tags.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
