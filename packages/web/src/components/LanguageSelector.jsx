import { useState, useRef, useEffect } from 'react'
import { useTranslation, SUPPORTED_LANGS } from '../i18n/index.jsx'

const FLAGS = {
  br: (
    <svg viewBox="0 0 640 480" className="lang-flag"><path fill="#229e45" d="M0 0h640v480H0z"/><path fill="#f8e509" d="M321.4 36.2l301.5 204L321.4 444 19.9 240.2z"/><circle fill="#2b49a3" cx="321.4" cy="240.2" r="115"/><path fill="#fff" d="M195.4 261c-4-33 7-66 29-91a116 116 0 01189 5c-35-25-85-35-130-19s-77 56-88 105z"/></svg>
  ),
  us: (
    <svg viewBox="0 0 640 480" className="lang-flag"><g fillRule="evenodd"><g strokeWidth="1pt"><path fill="#bd3d44" d="M0 0h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z"/><path fill="#fff" d="M0 37h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z"/></g><path fill="#192f5d" d="M0 0h260v259H0z"/></g></svg>
  ),
  es: (
    <svg viewBox="0 0 640 480" className="lang-flag"><path fill="#c60b1e" d="M0 0h640v480H0z"/><path fill="#ffc400" d="M0 120h640v240H0z"/></svg>
  ),
  cn: (
    <svg viewBox="0 0 640 480" className="lang-flag"><path fill="#de2910" d="M0 0h640v480H0z"/><path fill="#ffde00" d="M128 24l18.6 57.2h60.1l-48.6 35.3 18.5 57.2L128 138.4l-48.7 35.3 18.6-57.2-48.7-35.3h60.2z"/></svg>
  ),
  jp: (
    <svg viewBox="0 0 640 480" className="lang-flag"><path fill="#fff" d="M0 0h640v480H0z"/><circle fill="#bc002d" cx="320" cy="240" r="120"/></svg>
  ),
}

export default function LanguageSelector() {
  const { lang, setLang } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = SUPPORTED_LANGS.find(l => l.code === lang) || SUPPORTED_LANGS[0]

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  function selectLang(code) {
    setLang(code)
    setOpen(false)
  }

  return (
    <div className="lang-selector" ref={ref}>
      <button className="lang-current" onClick={() => setOpen(!open)} aria-label="Select language">
        {FLAGS[current.flag]}
        <span className="lang-code">{current.code.split('-')[0].toUpperCase()}</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {SUPPORTED_LANGS.map(l => (
            <button
              key={l.code}
              className={`lang-option ${l.code === lang ? 'active' : ''}`}
              onClick={() => selectLang(l.code)}
            >
              {FLAGS[l.flag]}
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
