import { useState } from 'react'

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
          <span className="nav-logo-dot"></span>
          <span className="nav-logo-text">Luxview</span>
        </a>
        <div className="nav-links">
          <a href="#sobre">Manifesto</a>
          <a href="#servicos">Expertise</a>
          <a href="#ideias">Projeto do Mês</a>
          <a href="#projetos">Archives</a>
          <a href="#contato">Contato</a>
        </div>
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#sobre" onClick={closeMenu}>Manifesto</a>
        <a href="#servicos" onClick={closeMenu}>Expertise</a>
        <a href="#ideias" onClick={closeMenu}>Projeto do Mês</a>
        <a href="#projetos" onClick={closeMenu}>Archives</a>
        <a href="#contato" onClick={closeMenu}>Contato</a>
      </div>
    </>
  )
}
