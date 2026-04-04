# Projeto Iluminado — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transformar o Luxview em monorepo pnpm e adicionar sistema de votacao publica de ideias com backend Express + MongoDB.

**Architecture:** Monorepo com 3 packages — web (React frontend existente), server (Express + Mongoose API), shared (constantes). MongoDB via Docker Compose. Frontend consome API via fetch. Anti-fraude por IP unico.

**Tech Stack:** pnpm workspaces, React 19, Vite, Express, Mongoose, MongoDB, Docker Compose

---

### Task 1: Migrar para pnpm workspaces

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `packages/web/package.json`
- Modify: `package.json` (root — transformar em workspace root)
- Move: `src/`, `public/`, `index.html`, `vite.config.js`, `eslint.config.js` → `packages/web/`

**Step 1: Instalar pnpm (se necessario)**

Run: `npm install -g pnpm`

**Step 2: Limpar node_modules e lock file antigos**

Run: `rm -rf node_modules package-lock.json`

**Step 3: Criar pnpm-workspace.yaml**

```yaml
packages:
  - 'packages/*'
```

**Step 4: Criar estrutura de diretorios**

Run: `mkdir -p packages/web packages/server/src/{models,routes} packages/shared`

**Step 5: Mover arquivos do frontend para packages/web/**

Run:
```bash
mv src packages/web/
mv public packages/web/
mv index.html packages/web/
mv vite.config.js packages/web/
mv eslint.config.js packages/web/
```

**Step 6: Criar packages/web/package.json**

```json
{
  "name": "@luxview/web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lenis": "^1.3.17",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

**Step 7: Atualizar root package.json**

```json
{
  "name": "luxview",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "dev:web": "pnpm --filter @luxview/web dev",
    "dev:server": "pnpm --filter @luxview/server dev",
    "build": "pnpm -r build"
  }
}
```

**Step 8: Instalar dependencias**

Run: `pnpm install`

**Step 9: Testar frontend**

Run: `pnpm dev:web`
Expected: Vite sobe em http://localhost:5173 e landing page funciona normalmente.

**Step 10: Commit**

```bash
git add -A
git commit -m "refactor: migrate to pnpm workspaces monorepo"
```

---

### Task 2: Criar @luxview/shared

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/constants.js`
- Create: `packages/shared/index.js`

**Step 1: Criar packages/shared/package.json**

```json
{
  "name": "@luxview/shared",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "index.js"
}
```

**Step 2: Criar packages/shared/constants.js**

```js
export const IDEA_STATUS = {
  ACTIVE: 'active',
  WINNER: 'winner',
  CLOSED: 'closed',
};

export const VALIDATION = {
  TITLE_MAX: 80,
  DESCRIPTION_MAX: 500,
  NAME_MAX: 100,
  EMAIL_MAX: 200,
};

export const RATE_LIMITS = {
  IDEAS_PER_HOUR: 5,
  VOTES_PER_HOUR: 30,
};
```

**Step 3: Criar packages/shared/index.js**

```js
export { IDEA_STATUS, VALIDATION, RATE_LIMITS } from './constants.js';
```

**Step 4: Commit**

```bash
git add packages/shared
git commit -m "feat: add @luxview/shared with constants"
```

---

### Task 3: Criar Docker Compose com MongoDB

**Files:**
- Create: `docker-compose.yml`
- Create: `.env.example`

**Step 1: Criar docker-compose.yml**

```yaml
services:
  mongodb:
    image: mongo:7
    container_name: luxview-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_DATABASE: luxview

volumes:
  mongo-data:
```

**Step 2: Criar .env.example**

```
MONGODB_URI=mongodb://localhost:27017/luxview
PORT=3001
```

**Step 3: Adicionar .env ao .gitignore**

Verificar se ja existe `.gitignore` e adicionar `.env` se nao estiver.

**Step 4: Subir MongoDB**

Run: `docker compose up -d`
Expected: Container luxview-mongo rodando na porta 27017.

**Step 5: Commit**

```bash
git add docker-compose.yml .env.example .gitignore
git commit -m "infra: add docker-compose with MongoDB"
```

---

### Task 4: Criar @luxview/server — Setup Express + Mongoose

**Files:**
- Create: `packages/server/package.json`
- Create: `packages/server/src/index.js`
- Create: `packages/server/.env`

**Step 1: Criar packages/server/package.json**

```json
{
  "name": "@luxview/server",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "start": "node src/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "express-rate-limit": "^7.5.0",
    "mongoose": "^8.14.1",
    "@luxview/shared": "workspace:*"
  }
}
```

**Step 2: Criar packages/server/.env**

```
MONGODB_URI=mongodb://localhost:27017/luxview
PORT=3001
```

**Step 3: Criar packages/server/src/index.js**

```js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ideasRouter from './routes/ideas.js';

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxview';

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());
app.set('trust proxy', true);

app.use('/api/ideas', ideasRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch(console.error);
```

**Step 4: Instalar dependencias**

Run: `pnpm install`

**Step 5: Commit (server ainda nao roda — falta routes/models)**

```bash
git add packages/server
git commit -m "feat: add @luxview/server Express + Mongoose setup"
```

---

### Task 5: Criar Models — Idea e Vote

**Files:**
- Create: `packages/server/src/models/Idea.js`
- Create: `packages/server/src/models/Vote.js`

**Step 1: Criar packages/server/src/models/Idea.js**

```js
import mongoose from 'mongoose';
import { IDEA_STATUS, VALIDATION } from '@luxview/shared';

const ideaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: VALIDATION.NAME_MAX,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: VALIDATION.EMAIL_MAX,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: VALIDATION.TITLE_MAX,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: VALIDATION.DESCRIPTION_MAX,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(IDEA_STATUS),
    default: IDEA_STATUS.ACTIVE,
  },
}, { timestamps: true });

ideaSchema.index({ month: 1, year: 1, status: 1 });
ideaSchema.index({ voteCount: -1 });

export default mongoose.model('Idea', ideaSchema);
```

**Step 2: Criar packages/server/src/models/Vote.js**

```js
import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
}, { timestamps: true });

voteSchema.index({ ideaId: 1, ipAddress: 1 }, { unique: true });

export default mongoose.model('Vote', voteSchema);
```

**Step 3: Commit**

```bash
git add packages/server/src/models
git commit -m "feat: add Idea and Vote mongoose models"
```

---

### Task 6: Criar Routes — CRUD + Vote

**Files:**
- Create: `packages/server/src/routes/ideas.js`

**Step 1: Criar packages/server/src/routes/ideas.js**

```js
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Idea from '../models/Idea.js';
import Vote from '../models/Vote.js';
import { IDEA_STATUS, VALIDATION, RATE_LIMITS } from '@luxview/shared';

const router = Router();

const ideasLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_LIMITS.IDEAS_PER_HOUR,
  keyGenerator: (req) => req.ip,
  message: { error: 'Limite de submissoes atingido. Tente novamente em 1 hora.' },
});

const votesLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_LIMITS.VOTES_PER_HOUR,
  keyGenerator: (req) => req.ip,
  message: { error: 'Limite de votos atingido. Tente novamente em 1 hora.' },
});

// GET /api/ideas — lista ideias do mes atual
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const month = Number(req.query.month) || now.getMonth() + 1;
    const year = Number(req.query.year) || now.getFullYear();

    const ideas = await Idea.find({ month, year, status: IDEA_STATUS.ACTIVE })
      .select('-email')
      .sort({ voteCount: -1, createdAt: 1 })
      .lean();

    // Checar quais ideias o IP atual ja votou
    const ip = req.ip;
    const ideaIds = ideas.map(i => i._id);
    const userVotes = await Vote.find({ ideaId: { $in: ideaIds }, ipAddress: ip })
      .select('ideaId')
      .lean();
    const votedSet = new Set(userVotes.map(v => v.ideaId.toString()));

    const result = ideas.map(idea => ({
      ...idea,
      hasVoted: votedSet.has(idea._id.toString()),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar ideias.' });
  }
});

// GET /api/ideas/winners — historico de contemplados
router.get('/winners', async (req, res) => {
  try {
    const winners = await Idea.find({ status: IDEA_STATUS.WINNER })
      .select('-email')
      .sort({ year: -1, month: -1 })
      .lean();
    res.json(winners);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contemplados.' });
  }
});

// POST /api/ideas — submeter nova ideia
router.post('/', ideasLimiter, async (req, res) => {
  try {
    const { name, email, title, description } = req.body;

    if (!name || !email || !title || !description) {
      return res.status(400).json({ error: 'Todos os campos sao obrigatorios.' });
    }

    if (title.length > VALIDATION.TITLE_MAX) {
      return res.status(400).json({ error: `Titulo deve ter no maximo ${VALIDATION.TITLE_MAX} caracteres.` });
    }

    if (description.length > VALIDATION.DESCRIPTION_MAX) {
      return res.status(400).json({ error: `Descricao deve ter no maximo ${VALIDATION.DESCRIPTION_MAX} caracteres.` });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalido.' });
    }

    const now = new Date();

    const idea = await Idea.create({
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      description: description.trim(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });

    const { email: _, ...safe } = idea.toObject();
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao submeter ideia.' });
  }
});

// POST /api/ideas/:id/vote — upvote
router.post('/:id/vote', votesLimiter, async (req, res) => {
  try {
    const { id } = req.params;
    const ip = req.ip;

    const idea = await Idea.findById(id);
    if (!idea || idea.status !== IDEA_STATUS.ACTIVE) {
      return res.status(404).json({ error: 'Ideia nao encontrada.' });
    }

    try {
      await Vote.create({ ideaId: id, ipAddress: ip });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ error: 'Voce ja votou nesta ideia.' });
      }
      throw err;
    }

    idea.voteCount += 1;
    await idea.save();

    res.json({ voteCount: idea.voteCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao votar.' });
  }
});

export default router;
```

**Step 2: Testar server**

Run: `pnpm dev:server`
Expected: "Connected to MongoDB" + "Server running on port 3001"

Run: `curl http://localhost:3001/api/health`
Expected: `{"status":"ok"}`

Run: `curl http://localhost:3001/api/ideas`
Expected: `[]`

**Step 3: Commit**

```bash
git add packages/server/src/routes
git commit -m "feat: add ideas API routes with rate limiting"
```

---

### Task 7: Configurar proxy no Vite

**Files:**
- Modify: `packages/web/vite.config.js`

**Step 1: Adicionar proxy para /api**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

**Step 2: Commit**

```bash
git add packages/web/vite.config.js
git commit -m "feat: add vite proxy for /api to backend"
```

---

### Task 8: Criar componente IdeaSection

**Files:**
- Create: `packages/web/src/components/IdeaSection.jsx`
- Modify: `packages/web/src/pages/Home.jsx`

**Step 1: Criar packages/web/src/components/IdeaSection.jsx**

```jsx
import { useState, useEffect } from 'react'
import SubmitIdeaModal from './SubmitIdeaModal'

export default function IdeaSection() {
  const [ideas, setIdeas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [votingId, setVotingId] = useState(null)

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
    if (days === 0) return 'hoje'
    if (days === 1) return 'ha 1 dia'
    return `ha ${days} dias`
  }

  function handleIdeaSubmitted() {
    setShowModal(false)
    fetchIdeas()
  }

  return (
    <section className="section section-ideas" id="ideias">
      <div className="section-inner">
        <div className="section-eyebrow">Projeto do Mes</div>
        <h2 className="section-heading">
          Sua ideia pode<br />ganhar vida.
        </h2>
        <p className="ideas-lead">
          Todo mes desenvolvemos gratuitamente o projeto mais votado pela comunidade.
          Envie sua ideia e conquiste votos!
        </p>
        <button className="ideas-submit-btn" onClick={() => setShowModal(true)}>
          Enviar Minha Ideia
        </button>

        {ideas.length > 0 ? (
          <div className="ideas-grid">
            {ideas.map((idea, index) => (
              <div className="idea-card" key={idea._id}>
                {index === 0 && idea.voteCount > 0 && (
                  <span className="idea-badge">Liderando</span>
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
                      <span>por {idea.name}</span>
                      <span>{timeAgo(idea.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ideas-empty">
            <p>Nenhuma ideia submetida neste mes. Seja o primeiro!</p>
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
```

**Step 2: Adicionar IdeaSection ao Home.jsx**

Inserir entre ServicesSection e ProjectsSection:

```jsx
import Nav from '../components/Nav'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ValuesSection from '../components/ValuesSection'
import ServicesSection from '../components/ServicesSection'
import IdeaSection from '../components/IdeaSection'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ServicesSection />
      <IdeaSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  )
}
```

**Step 3: Commit**

```bash
git add packages/web/src/components/IdeaSection.jsx packages/web/src/pages/Home.jsx
git commit -m "feat: add IdeaSection component to landing page"
```

---

### Task 9: Criar componente SubmitIdeaModal

**Files:**
- Create: `packages/web/src/components/SubmitIdeaModal.jsx`

**Step 1: Criar packages/web/src/components/SubmitIdeaModal.jsx**

```jsx
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
      setError('Erro de conexao. Tente novamente.')
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
          Descreva o projeto que voce gostaria que a Luxview desenvolvesse gratuitamente.
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
            <label>Titulo da Ideia <span className="char-count">{title.length}/{TITLE_MAX}</span></label>
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
            <label>Descricao <span className="char-count">{description.length}/{DESC_MAX}</span></label>
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
```

**Step 2: Commit**

```bash
git add packages/web/src/components/SubmitIdeaModal.jsx
git commit -m "feat: add SubmitIdeaModal component"
```

---

### Task 10: Adicionar estilos CSS

**Files:**
- Modify: `packages/web/src/styles/global.css`

**Step 1: Adicionar CSS da secao IdeaSection e modal**

Adicionar ANTES do `/* --- Admin Panel ---*/` no global.css:

```css
/* ============================================
   IDEA SECTION — Projeto Iluminado
   ============================================ */

.section-ideas {
    background: var(--bg);
}

.ideas-lead {
    font-size: 1.05rem;
    color: var(--ink-secondary);
    text-align: center;
    max-width: 520px;
    margin: 0 auto 2rem;
    line-height: 1.6;
}

.ideas-submit-btn {
    display: block;
    margin: 0 auto 3rem;
    padding: 0.85rem 2rem;
    background: var(--ink);
    color: var(--white);
    border: none;
    border-radius: 980px;
    font-family: var(--font);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s var(--ease), transform 0.2s var(--ease);
}

.ideas-submit-btn:hover {
    background: var(--amber);
    transform: scale(1.03);
}

.ideas-submit-btn:active {
    transform: scale(0.98);
}

/* Ideas Grid */
.ideas-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 700px;
    margin: 0 auto;
}

.idea-card {
    position: relative;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), border-color 0.3s;
}

.idea-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--card-shadow-hover);
    border-color: var(--border-strong);
}

.idea-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.2rem 0.6rem;
    background: var(--amber-bg);
    color: var(--amber);
    border-radius: 20px;
}

.idea-card-header {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
}

.idea-votes {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    min-width: 44px;
}

.idea-vote-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid var(--border-strong);
    border-radius: 10px;
    background: var(--white);
    color: var(--ink-secondary);
    cursor: pointer;
    transition: all 0.2s var(--ease);
}

.idea-vote-btn svg {
    width: 18px;
    height: 18px;
}

.idea-vote-btn:hover:not(:disabled) {
    border-color: var(--amber);
    color: var(--amber);
    background: var(--amber-bg);
    transform: scale(1.08);
}

.idea-vote-btn:active:not(:disabled) {
    transform: scale(0.95);
}

.idea-vote-btn.voted {
    border-color: var(--amber);
    color: var(--white);
    background: var(--amber);
}

.idea-vote-btn:disabled {
    cursor: default;
}

.idea-vote-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ink);
}

.idea-card-content {
    flex: 1;
    min-width: 0;
}

.idea-card-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 0.4rem;
    line-height: 1.3;
}

.idea-card-desc {
    font-size: 0.88rem;
    color: var(--ink-secondary);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0.75rem;
}

.idea-card-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--ink-tertiary);
}

.ideas-empty {
    text-align: center;
    padding: 3rem 0;
    color: var(--ink-tertiary);
    font-size: 0.95rem;
}

/* ============================================
   MODAL
   ============================================ */

.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: modalFadeIn 0.25s var(--ease-out);
}

@keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    position: relative;
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideUp 0.3s var(--ease-out);
}

@keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: var(--bg-alt);
    border-radius: 8px;
    color: var(--ink-secondary);
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.modal-close svg {
    width: 18px;
    height: 18px;
}

.modal-close:hover {
    background: var(--border-strong);
    color: var(--ink);
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
}

.modal-subtitle {
    font-size: 0.9rem;
    color: var(--ink-secondary);
    line-height: 1.5;
    margin-bottom: 1.5rem;
}

.modal-error {
    padding: 0.75rem 1rem;
    background: rgba(220, 38, 38, 0.08);
    color: #dc2626;
    border-radius: 10px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.char-count {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--ink-tertiary);
    float: right;
}

.modal-submit-btn {
    width: 100%;
    padding: 0.85rem;
    background: var(--ink);
    color: var(--white);
    border: none;
    border-radius: 10px;
    font-family: var(--font);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s var(--ease), transform 0.2s;
    margin-top: 0.5rem;
}

.modal-submit-btn:hover:not(:disabled) {
    background: var(--amber);
}

.modal-submit-btn:active:not(:disabled) {
    transform: scale(0.98);
}

.modal-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
    .idea-card {
        padding: 1.25rem;
    }

    .idea-card-header {
        gap: 1rem;
    }

    .modal-content {
        padding: 1.75rem;
    }
}
```

**Step 2: Commit**

```bash
git add packages/web/src/styles/global.css
git commit -m "feat: add IdeaSection and modal styles"
```

---

### Task 11: Testar fluxo completo

**Step 1: Subir tudo**

Run:
```bash
docker compose up -d
pnpm dev
```

**Step 2: Verificar landing page**

Abrir http://localhost:5173 — a secao "Projeto do Mes" deve aparecer entre Servicos e Projetos.

**Step 3: Testar submissao**

- Clicar "Enviar Minha Ideia"
- Preencher formulario e enviar
- Ideia deve aparecer na lista

**Step 4: Testar upvote**

- Clicar no botao de upvote
- Contagem deve incrementar
- Botao deve ficar amber (votado)
- Clicar de novo deve estar desabilitado

**Step 5: Commit final**

```bash
git add -A
git commit -m "feat: complete Projeto Iluminado - ideas voting system"
```
