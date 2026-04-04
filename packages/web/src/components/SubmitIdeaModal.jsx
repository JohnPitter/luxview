import { useState } from 'react'

const TITLE_MAX = 80
const DESC_MAX = 500

export default function SubmitIdeaModal({ onClose, onSubmitted }) {
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
      setError('Preencha todos os campos.')
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
      setError('Erro de conexão. Tente novamente.')
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

        <h2 className="modal-title">Envie sua ideia</h2>
        <p className="modal-subtitle">
          Descreva o projeto que você gostaria que a Luxview desenvolvesse gratuitamente.
        </p>

        {error && <div className="modal-error">{error}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Seu Nome</label>
            <input
              type="text"
              placeholder="Ex: Maria Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>Seu Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="form-hint">Usado apenas para contato caso seu projeto seja contemplado.</span>
          </div>

          <div className="form-group">
            <label>Título da Ideia <span className="char-count">{title.length}/{TITLE_MAX}</span></label>
            <input
              type="text"
              placeholder="Ex: App de Delivery para Pet Shops"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={TITLE_MAX}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição <span className="char-count">{description.length}/{DESC_MAX}</span></label>
            <textarea
              placeholder="Descreva sua ideia com detalhes..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={DESC_MAX}
              required
            />
          </div>

          <button type="submit" className="modal-submit-btn" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Ideia'}
          </button>
        </form>
      </div>
    </div>
  )
}
