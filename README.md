<div align="center">

# Luxview

**Experiencias unicas atraves da tecnologia — site institucional com narrativa scroll-driven e sistema de votacao de projetos.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![License](https://img.shields.io/badge/License-MIT-orange?style=flat-square)](#license)

[Features](#-features) · [Como Funciona](#-como-funciona) · [Tech Stack](#-tech-stack) · [Desenvolvimento](#-desenvolvimento) · [Estrutura](#-estrutura)

</div>

---

## O que e o Luxview?

Luxview e o site institucional de uma agencia de tecnologia, construido como uma **single-page application** com narrativa scroll-driven inspirada na Apple. Alem do site, inclui um **sistema de votacao publica** onde a comunidade submete ideias de projeto — o mais votado do mes e desenvolvido gratuitamente.

---

## Features

| Categoria | O que voce encontra |
|---|---|
| **Scroll Narrative** | Secoes About e Values com animacao scroll-driven — textos aparecem e somem conforme o scroll |
| **Smooth Scroll** | Navegacao suave com Lenis, transicoes animadas entre secoes via menu |
| **Projeto do Mes** | Sistema de votacao publica — envie ideias, vote nos favoritos, o mais votado ganha |
| **Anti-fraude** | 1 voto por IP por projeto, rate limiting em submissoes e votos |
| **Portfolio Dinamico** | Projetos cadastrados via painel admin, exibidos em grid responsivo |
| **Areas de Atuacao** | Servicos customizaveis pelo admin com icon picker e tags |
| **Reveal Animations** | Todas as secoes com animacoes de entrada (fade-in, slide-up, stagger) via IntersectionObserver |
| **Ambient Orbs** | Efeitos visuais decorativos com blur e animacoes float na hero |
| **Responsivo** | Mobile-first com breakpoints em 768px e 1024px |
| **Admin Panel** | Gerenciamento de projetos e servicos via `/admin` |

---

## Como Funciona

```
                    +-----------+
                    |  Browser  |
                    +-----+-----+
                          |
              +-----------+-----------+
              |                       |
        +-----v-----+          +-----v-----+
        | @luxview/  |          | @luxview/  |
        |    web     |  proxy   |   server   |
        |  (React)   +--------->+ (Express)  |
        |  :5173     |   /api   |   :3001    |
        +-----+-----+          +-----+------+
              |                       |
              |                 +-----v-----+
              |                 |  MongoDB   |
              |                 |   :27017   |
              |                 +------------+
              |
        +-----v-----+
        | @luxview/  |
        |   shared   |
        | (constants)|
        +------------+
```

### Fluxo do Projeto Iluminado

1. Usuario acessa o site e scrolla ate a secao "Projeto do Mes"
2. Envia sua ideia preenchendo nome, email, titulo e descricao
3. Outros visitantes votam (upvote) — 1 voto por IP
4. Ao final do mes, o projeto mais votado e desenvolvido gratuitamente
5. Campanha de 12 meses = 12 projetos gratuitos

---

## Tech Stack

### Frontend (`@luxview/web`)

| Tecnologia | Uso |
|---|---|
| **React 19** | UI components e rendering |
| **Vite 7** | Build tool e dev server com HMR |
| **Lenis** | Smooth scroll e scroll-to animations |
| **CSS Custom Properties** | Design tokens (cores, espacamentos, sombras) |
| **IntersectionObserver** | Reveal animations e scroll-triggered effects |

### Backend (`@luxview/server`)

| Tecnologia | Uso |
|---|---|
| **Express 5** | API REST |
| **Mongoose** | ODM para MongoDB |
| **express-rate-limit** | Protecao contra brute force |

### Infra

| Tecnologia | Uso |
|---|---|
| **pnpm workspaces** | Monorepo com 3 packages |
| **Docker Compose** | MongoDB containerizado |
| **MongoDB 7** | Persistencia de ideias e votos |

---

## Desenvolvimento

### Pre-requisitos

- Node.js 20+
- pnpm 10+
- Docker (para MongoDB)

### Setup

```bash
# Clonar o repositorio
git clone https://github.com/JohnPitter/luxview.git
cd luxview

# Instalar dependencias
pnpm install

# Subir MongoDB
docker compose up -d

# Rodar em desenvolvimento (frontend + backend)
pnpm dev
```

| Comando | O que faz |
|---|---|
| `pnpm dev` | Roda frontend (:5173) e backend (:3001) em paralelo |
| `pnpm dev:web` | Roda apenas o frontend |
| `pnpm dev:server` | Roda apenas o backend |
| `pnpm build` | Build de producao de todos os packages |
| `docker compose up -d` | Sobe MongoDB na porta 27017 |

### Variaveis de Ambiente

Crie `packages/server/.env` baseado no `.env.example`:

```
MONGODB_URI=mongodb://localhost:27017/luxview
PORT=3001
```

---

## Estrutura

```
luxview/
├── packages/
│   ├── web/                    @luxview/web — Frontend React
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Nav.jsx              — Navegacao com smooth scroll
│   │   │   │   ├── HeroSection.jsx      — Hero com orbs e scroll narrative
│   │   │   │   ├── AboutSection.jsx     — Narrativa com fade animations
│   │   │   │   ├── ValuesSection.jsx    — Visao, Inovacao, Excelencia
│   │   │   │   ├── ServicesSection.jsx  — Areas de atuacao (customizaveis)
│   │   │   │   ├── IdeaSection.jsx      — Projeto do Mes (votacao)
│   │   │   │   ├── SubmitIdeaModal.jsx  — Modal de submissao de ideias
│   │   │   │   ├── ProjectsSection.jsx  — Portfolio de projetos
│   │   │   │   ├── ContactSection.jsx   — CTA de contato
│   │   │   │   └── Footer.jsx           — Rodape
│   │   │   ├── hooks/
│   │   │   │   ├── useScrollNarrative.js   — Scroll-driven fade animations
│   │   │   │   └── useRevealAnimation.js   — IntersectionObserver reveals
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx             — Landing page
│   │   │   │   └── Admin.jsx            — Painel administrativo
│   │   │   └── styles/
│   │   │       └── global.css           — Design system completo
│   │   └── vite.config.js
│   │
│   ├── server/                 @luxview/server — API Express
│   │   └── src/
│   │       ├── index.js                 — Entry point
│   │       ├── models/
│   │       │   ├── Idea.js              — Schema de ideias
│   │       │   └── Vote.js              — Schema de votos (IP unico)
│   │       └── routes/
│   │           └── ideas.js             — CRUD + votacao + rate limit
│   │
│   └── shared/                 @luxview/shared — Constantes
│       └── constants.js                 — Status, validacoes, limites
│
├── docker-compose.yml          — MongoDB 7
├── pnpm-workspace.yaml         — Workspace config
└── package.json                — Scripts globais
```

---

## API

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/api/ideas` | Lista ideias do mes atual (ordenadas por votos) |
| `POST` | `/api/ideas` | Submete nova ideia |
| `POST` | `/api/ideas/:id/vote` | Vota em uma ideia (1 por IP) |
| `GET` | `/api/ideas/winners` | Historico de projetos contemplados |
| `GET` | `/api/health` | Health check |

---

## Design System

| Token | Valor | Uso |
|---|---|---|
| `--white` | `#ffffff` | Fundo de pagina e cards |
| `--bg` | `#fbfbfd` | Background alternativo |
| `--ink` | `#1d1d1f` | Texto primario |
| `--amber` | `#c87d2f` | Cor de destaque (CTAs, icones) |
| `--radius` | `16px` | Border radius de cards |
| `--radius-lg` | `24px` | Border radius de secoes |
| `--font` | `DM Sans` | Tipografia principal |

---

## License

MIT
