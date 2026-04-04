import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES_STORAGE_KEY, SERVICE_ICONS, DEFAULT_SERVICES } from '../components/ServicesSection'

const STORAGE_KEY = 'luxview_projects'
const ICON_OPTIONS = Object.keys(SERVICE_ICONS)
const ICON_LABELS = {
  web: 'Web',
  mobile: 'Mobile',
  enterprise: 'Empresarial',
  design: 'Design',
  digital: 'Digital',
  ai: 'IA',
  cloud: 'Cloud',
  security: 'Segurança',
  data: 'Dados',
}

function isValidUrl(string) {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default function Admin() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [toast, setToast] = useState({ show: false, message: '' })
  const debounceRef = useRef(null)

  // Services state
  const [services, setServices] = useState([])
  const [svcTitle, setSvcTitle] = useState('')
  const [svcDesc, setSvcDesc] = useState('')
  const [svcIcon, setSvcIcon] = useState('web')
  const [svcTags, setSvcTags] = useState('')
  const [editingSvcId, setEditingSvcId] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setProjects(stored)

    const storedSvcs = localStorage.getItem(SERVICES_STORAGE_KEY)
    if (storedSvcs) {
      setServices(JSON.parse(storedSvcs))
    } else {
      setServices(DEFAULT_SERVICES)
    }
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (image && isValidUrl(image)) {
        setPreviewUrl(image)
      } else {
        setPreviewUrl('')
      }
    }, 500)
    return () => clearTimeout(debounceRef.current)
  }, [image])

  function showToast(message) {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !link.trim() || !image.trim()) return

    if (!isValidUrl(link) || !isValidUrl(image)) {
      showToast('Por favor, insira URLs válidas.')
      return
    }

    const project = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      link: link.trim(),
      image: image.trim(),
      createdAt: new Date().toISOString()
    }

    const updated = [project, ...projects]
    setProjects(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    setTitle('')
    setDescription('')
    setLink('')
    setImage('')
    setPreviewUrl('')
    showToast('Projeto cadastrado com sucesso!')
  }

  function deleteProject(id) {
    if (!confirm('Tem certeza que deseja remover este projeto?')) return
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    showToast('Projeto removido.')
  }

  function handleServiceSubmit(e) {
    e.preventDefault()
    if (!svcTitle.trim() || !svcDesc.trim()) return

    const tags = svcTags.split(',').map(t => t.trim()).filter(Boolean)

    if (editingSvcId) {
      const updated = services.map(s =>
        s.id === editingSvcId
          ? { ...s, title: svcTitle.trim(), description: svcDesc.trim(), icon: svcIcon, tags }
          : s
      )
      setServices(updated)
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated))
      setEditingSvcId(null)
      showToast('Serviço atualizado!')
    } else {
      const newSvc = {
        id: Date.now().toString(),
        icon: svcIcon,
        title: svcTitle.trim(),
        description: svcDesc.trim(),
        tags,
      }
      const updated = [...services, newSvc]
      setServices(updated)
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated))
      showToast('Serviço cadastrado!')
    }

    setSvcTitle('')
    setSvcDesc('')
    setSvcIcon('web')
    setSvcTags('')
  }

  function editService(svc) {
    setSvcTitle(svc.title)
    setSvcDesc(svc.description)
    setSvcIcon(svc.icon)
    setSvcTags(svc.tags.join(', '))
    setEditingSvcId(svc.id)
  }

  function deleteService(id) {
    if (!confirm('Tem certeza que deseja remover este serviço?')) return
    const updated = services.filter(s => s.id !== id)
    setServices(updated)
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated))
    showToast('Serviço removido.')
  }

  function resetServices() {
    if (!confirm('Restaurar serviços padrão? Isso apagará suas personalizações.')) return
    setServices(DEFAULT_SERVICES)
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(DEFAULT_SERVICES))
    showToast('Serviços restaurados ao padrão.')
  }

  return (
    <div className="admin-body">
      <nav className="admin-nav">
        <Link to="/" className="admin-nav-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Voltar ao Site
        </Link>
        <div className="admin-nav-title">
          <span className="admin-nav-logo">Luxview</span>
          <span className="admin-nav-label">Admin</span>
        </div>
      </nav>

      <main className="admin-main">
        <div className="admin-container">
          <div className="admin-header">
            <h1>Gerenciar Projetos</h1>
            <p>Cadastre e gerencie os projetos exibidos no portfólio do site.</p>
          </div>

          <div className="admin-form-section">
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Novo Projeto
            </h2>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título do Projeto</label>
                <input
                  type="text"
                  placeholder="Ex: App de Delivery Premium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  placeholder="Descreva brevemente o projeto e os resultados alcançados..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Link do Projeto</label>
                <input
                  type="url"
                  placeholder="https://exemplo.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Imagem (URL da captura da home)</label>
                <input
                  type="url"
                  placeholder="https://exemplo.com/screenshot.png"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <span className="form-hint">Cole a URL de uma captura de tela da página inicial do projeto.</span>
                {previewUrl && (
                  <div className="form-preview">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      onError={() => setPreviewUrl('')}
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Cadastrar Projeto
              </button>
            </form>
          </div>

          <div className="admin-projects-section">
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              Projetos Cadastrados
            </h2>

            {projects.length > 0 ? (
              <div className="admin-projects-list">
                {projects.map((project) => (
                  <div className="admin-project-item" key={project.id}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="admin-project-thumb"
                      onError={(e) => { e.target.style.opacity = '0.3' }}
                    />
                    <div className="admin-project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-project-link"
                      >
                        {project.link}
                      </a>
                    </div>
                    <div className="admin-project-actions">
                      <button
                        className="admin-btn admin-btn-danger"
                        onClick={() => deleteProject(project.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="admin-empty">Nenhum projeto cadastrado ainda.</p>
            )}
          </div>

          <div className="admin-form-section">
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              Áreas de Atuação
            </h2>

            <form className="admin-form" onSubmit={handleServiceSubmit}>
              <div className="form-group">
                <label>Título do Serviço</label>
                <input
                  type="text"
                  placeholder="Ex: Desenvolvimento Web"
                  value={svcTitle}
                  onChange={(e) => setSvcTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  placeholder="Ex: Plataformas web modernas e responsivas."
                  value={svcDesc}
                  onChange={(e) => setSvcDesc(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ícone</label>
                <div className="icon-picker">
                  {ICON_OPTIONS.map(key => (
                    <button
                      type="button"
                      key={key}
                      className={`icon-picker-btn ${svcIcon === key ? 'active' : ''}`}
                      onClick={() => setSvcIcon(key)}
                      title={ICON_LABELS[key]}
                    >
                      <div className="icon-picker-svg">{SERVICE_ICONS[key]}</div>
                      <span>{ICON_LABELS[key]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="Ex: E-commerce, SaaS, Portais"
                  value={svcTags}
                  onChange={(e) => setSvcTags(e.target.value)}
                />
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  {editingSvcId ? 'Atualizar Serviço' : 'Adicionar Serviço'}
                </button>
                {editingSvcId && (
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    onClick={() => { setEditingSvcId(null); setSvcTitle(''); setSvcDesc(''); setSvcIcon('web'); setSvcTags(''); }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            {services.length > 0 && (
              <div className="admin-services-list">
                {services.map((svc) => (
                  <div className="admin-service-item" key={svc.id}>
                    <div className="admin-service-icon">{SERVICE_ICONS[svc.icon]}</div>
                    <div className="admin-service-info">
                      <h3>{svc.title}</h3>
                      <p>{svc.description}</p>
                      {svc.tags.length > 0 && (
                        <div className="admin-service-tags">
                          {svc.tags.map((tag, i) => <span key={i}>{tag}</span>)}
                        </div>
                      )}
                    </div>
                    <div className="admin-project-actions">
                      <button className="admin-btn" onClick={() => editService(svc)}>Editar</button>
                      <button className="admin-btn admin-btn-danger" onClick={() => deleteService(svc.id)}>Remover</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="admin-btn admin-btn-reset" onClick={resetServices}>
              Restaurar Padrão
            </button>
          </div>
        </div>
      </main>

      <div className={`toast ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>
    </div>
  )
}
