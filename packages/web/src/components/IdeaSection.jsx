import { useState, useEffect } from 'react'
import { useRevealAnimation, useRevealAnimations } from '../hooks/useRevealAnimation'
import SubmitIdeaModal from './SubmitIdeaModal'
import { useTranslation } from '../i18n/index.jsx'

export default function IdeaSection() {
  const { t } = useTranslation()
  const [ideas, setIdeas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [votingId, setVotingId] = useState(null)
  const headerRef = useRevealAnimation()
  const gridRef = useRevealAnimations('.idea-card')

  useEffect(() => {
    fetchIdeas()
  }, [])

  async function fetchIdeas() {
    try {
      const res = await fetch('/api/ideas')
      if (res.ok) {
        const data = await res.json()
        setIdeas(data)
      }
    } catch (err) {
      console.error('Erro ao buscar ideias:', err)
    }
  }

  async function handleVote(id) {
    if (votingId) return
    setVotingId(id)

    try {
      const res = await fetch(`/api/ideas/${id}/vote`, { method: 'POST' })
      if (res.ok) {
        setIdeas(prev =>
          prev.map(idea =>
            idea._id === id
              ? { ...idea, voteCount: idea.voteCount + 1, hasVoted: true }
              : idea
          )
        )
      }
    } catch (err) {
      console.error('Erro ao votar:', err)
    } finally {
      setVotingId(null)
    }
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return t('ideas.time_today')
    if (days === 1) return t('ideas.time_1day')
    return t('ideas.time_days', { n: days })
  }

  function handleIdeaSubmitted() {
    setShowModal(false)
    fetchIdeas()
  }

  return (
    <section className="section section-ideas" id="ideias">
      <div className="section-inner">
        <div ref={headerRef}>
          <div className="section-eyebrow">{t('ideas.eyebrow')}</div>
          <h2 className="section-heading">
            {t('ideas.heading').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br/>}</span>
            ))}
          </h2>
          <p className="ideas-lead">
            {t('ideas.lead')}
          </p>
          <button className="ideas-submit-btn" onClick={() => setShowModal(true)}>
            {t('ideas.submit_btn')}
          </button>
        </div>

        {ideas.length > 0 ? (
          <div className="ideas-grid" ref={gridRef}>
            {ideas.map((idea, index) => (
              <div className="idea-card" key={idea._id}>
                {index === 0 && idea.voteCount > 0 && (
                  <span className="idea-badge">{t('ideas.badge_leading')}</span>
                )}
                <div className="idea-card-header">
                  <div className="idea-votes">
                    <button
                      className={`idea-vote-btn ${idea.hasVoted ? 'voted' : ''}`}
                      onClick={() => handleVote(idea._id)}
                      disabled={idea.hasVoted || votingId === idea._id}
                      aria-label={`Votar em ${idea.title}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </button>
                    <span className="idea-vote-count">{idea.voteCount}</span>
                  </div>
                  <div className="idea-card-content">
                    <h3 className="idea-card-title">{idea.title}</h3>
                    <p className="idea-card-desc">{idea.description}</p>
                    <div className="idea-card-meta">
                      <span>{t('ideas.by')} {idea.name}</span>
                      <span>{timeAgo(idea.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ideas-empty">
            <p>{t('ideas.empty')}</p>
          </div>
        )}
      </div>

      {showModal && (
        <SubmitIdeaModal
          onClose={() => setShowModal(false)}
          onSubmitted={handleIdeaSubmitted}
        />
      )}
    </section>
  )
}
