# Projeto Iluminado — Design

## Objetivo

Sistema de votacao publica onde usuarios submetem ideias de projeto. O mais votado do mes e desenvolvido gratuitamente pela Luxview. Campanha de 1 ano (12 projetos).

## Stack

- **Monorepo:** pnpm workspaces
- **Frontend:** React 19 + Vite (pacote `@luxview/web`)
- **Backend:** Node/Express + Mongoose (pacote `@luxview/server`)
- **Database:** MongoDB via Docker Compose
- **Shared:** Constantes e validacoes (pacote `@luxview/shared`)

## Estrutura Monorepo

```
luxview/
├── pnpm-workspace.yaml
├── package.json
├── docker-compose.yml
├── packages/
│   ├── web/                  @luxview/web
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── IdeaSection.jsx
│   │   │   │   ├── SubmitIdeaModal.jsx
│   │   │   │   └── ... (existentes)
│   │   │   └── ...
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── server/               @luxview/server
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   ├── models/
│   │   │   │   ├── Idea.js
│   │   │   │   └── Vote.js
│   │   │   └── routes/
│   │   │       └── ideas.js
│   │   └── package.json
│   └── shared/               @luxview/shared
│       ├── constants.js
│       └── package.json
```

## API Endpoints

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | /api/ideas | Lista ideias do mes atual, ordenadas por voteCount desc. Nunca retorna email |
| POST | /api/ideas | Submete nova ideia (name, email, title, description) |
| POST | /api/ideas/:id/vote | Upvote — checa IP duplicado via indice unico |
| GET | /api/ideas/winners | Historico de projetos contemplados |

## MongoDB Models

### Idea

```js
{
  name: String,          // max 100 chars
  email: String,         // nunca exposto na API publica
  title: String,         // max 80 chars
  description: String,   // max 500 chars
  voteCount: Number,     // counter denormalizado
  month: Number,         // 1-12
  year: Number,          // 2026
  status: String,        // 'active' | 'winner' | 'closed'
  createdAt: Date
}
```

### Vote

```js
{
  ideaId: ObjectId,
  ipAddress: String,
  createdAt: Date
}
// indice unico: { ideaId, ipAddress }
```

## Frontend — Secao "Projeto Iluminado"

Posicao na landing page: entre Servicos e Projetos.

### Layout

- Eyebrow: "Projeto do Mes"
- Heading: "Sua ideia pode ganhar vida."
- Subtitulo explicando a mecanica
- Botao "Enviar Minha Ideia" abre modal
- Grid de cards ordenados por votos

### Card da Ideia

- Contagem de votos + botao upvote (amber quando votado)
- Titulo
- Descricao truncada (3 linhas)
- Nome do autor
- Tempo relativo (ha X dias)

### Modal de Submissao

- Campos: Nome, Email, Titulo da Ideia, Descricao (textarea)
- Validacao inline (titulo max 80, descricao max 500)
- Toast de feedback
- Estilo consistente com forms existentes

### Upvote

- POST /api/ideas/:id/vote
- IP duplicado: 409 + botao desabilitado
- Animacao: escala + cor amber

## Seguranca

- Email nunca retorna na API publica
- Rate limit POST ideias: 5/IP/hora
- Rate limit POST votos: 30/IP/hora
- Sanitizacao de input (trim, XSS)
- Anti-fraude: 1 voto por IP por projeto (indice unico MongoDB)

## Ciclo Mensal

- Ao virar o mes, marcar ideia mais votada como 'winner', demais como 'closed'
- Pode ser manual (admin) ou automatizado via cron

## Docker Compose

- Servico MongoDB (porta 27017)
- Volume persistente para dados
