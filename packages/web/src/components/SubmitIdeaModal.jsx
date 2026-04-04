import { useState } from 'react'
import { useTranslation } from '../i18n/index.jsx'

const TITLE_MAX = 80
const DESC_MAX = 500

export default function SubmitIdeaModal({ onClose, onSubmitted }) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !title.trim() || !description.trim()) {
      setError(t('modal.error_fill'))
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          title: title.trim(),
          description: description.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Erro ao enviar ideia.')
        return
      }

      onSubmitted()
    } catch (err) {
      setError(t('modal.error_connection'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="modal-title">{t('modal.title')}</h2>
        <p className="modal-subtitle">
          {t('modal.subtitle')}
        </p>

        {error && <div className="modal-error">{error}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('modal.name_label')}</label>
            <input
              type="text"
              placeholder={t('modal.name_placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('modal.email_label')}</label>
            <input
              type="email"
              placeholder={t('modal.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="form-hint">{t('modal.email_hint')}</span>
          </div>

          <div className="form-group">
            <label>{t('modal.idea_label')} <span className="char-count">{title.length}/{TITLE_MAX}</span></label>
            <input
              type="text"
              placeholder={t('modal.idea_placeholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={TITLE_MAX}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('modal.desc_label')} <span className="char-count">{description.length}/{DESC_MAX}</span></label>
            <textarea
              placeholder={t('modal.desc_placeholder')}
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={DESC_MAX}
              required
            />
          </div>

          <button type="submit" className="modal-submit-btn" disabled={loading}>
            {loading ? t('modal.submitting') : t('modal.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
