import { useState } from 'react'
import LogoIcon from './LogoIcon'

export default function Nav() {
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
          <LogoIcon className="nav-logo-icon" />
          <span className="nav-logo-text">Luxview</span>
        </a>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#ideias">Projeto do Mês</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </div>
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#sobre" onClick={closeMenu}>Sobre</a>
        <a href="#servicos" onClick={closeMenu}>Serviços</a>
        <a href="#ideias" onClick={closeMenu}>Projeto do Mês</a>
        <a href="#projetos" onClick={closeMenu}>Projetos</a>
        <a href="#contato" onClick={closeMenu}>Contato</a>
      </div>
    </>
  )
}
