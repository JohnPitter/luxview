import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import LanguageSelector from './LanguageSelector'
import { useTranslation } from '../i18n'

export default function Nav() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = !menuOpen ? 'hidden' : ''
  }

  function closeMenu() {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className="nav">
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-dot"></span>
          <span className="nav-logo-text">Luxview</span>
        </a>
        <div className="nav-links">
          <a href="#sobre">{t('nav.manifesto')}</a>
          <a href="#servicos">{t('nav.expertise')}</a>
          <a href="#ideias">{t('nav.project_month')}</a>
          <a href="#projetos">{t('nav.archives')}</a>
          <a href="#contato">{t('nav.contact')}</a>
          <LanguageSelector />
          <ThemeToggle />
        </div>
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#sobre" onClick={closeMenu}>{t('nav.manifesto')}</a>
        <a href="#servicos" onClick={closeMenu}>{t('nav.expertise')}</a>
        <a href="#ideias" onClick={closeMenu}>{t('nav.project_month')}</a>
        <a href="#projetos" onClick={closeMenu}>{t('nav.archives')}</a>
        <a href="#contato" onClick={closeMenu}>{t('nav.contact')}</a>
      </div>
    </>
  )
}
