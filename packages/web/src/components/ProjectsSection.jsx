import { useState, useEffect } from 'react'
import { useRevealAnimation, useRevealAnimations } from '../hooks/useRevealAnimation'
import { useTranslation } from '../i18n/index.jsx'

const STORAGE_KEY = 'luxview_projects'

export default function ProjectsSection() {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const headerRef = useRevealAnimation()
  const gridRef = useRevealAnimations('.project-card')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setProjects(stored)
  }, [])

  return (
    <section className="section section-projects" id="projetos">
      <div className="section-inner">
        <div ref={headerRef}>
          <div className="section-eyebrow">{t('projects.eyebrow')}</div>
          <h2 className="section-heading">
            {t('projects.heading').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br/>}</span>
            ))}
          </h2>
        </div>

        {projects.length > 0 ? (
          <div className="projects-grid" ref={gridRef}>
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <span className="project-card-link">
                    {t('projects.view')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <div className="empty-icon">
              <svg viewBox="0 0 64 64" fill="none">
                <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
                <path d="M24 32h16M32 24v16" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
              </svg>
            </div>
            <p>{t('projects.empty')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
