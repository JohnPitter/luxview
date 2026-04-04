# Luxview Design System Rules

> Rules for translating Figma designs into production code for the Luxview project.

---

## 1. Project Overview

**Luxview** is a premium portfolio/agency landing page built as a single-page React application with an Apple-inspired aesthetic. The site emphasizes scroll-driven storytelling, warm amber accents on a clean white canvas, and sophisticated micro-animations.

- **Framework:** React 19.2.0 (JSX, no TypeScript)
- **Build:** Vite 7.x
- **Routing:** React Router 7.x
- **Smooth Scroll:** Lenis 1.3.x
- **Styling:** Vanilla CSS with CSS Custom Properties (no Tailwind, no CSS-in-JS)
- **Language:** Brazilian Portuguese (`pt-BR`)

---

## 2. Token Definitions

All design tokens live in CSS custom properties defined in `:root` at `src/styles/global.css`.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--white` | `#ffffff` | Page background, card backgrounds |
| `--bg` | `#fbfbfd` | Light off-white for sections |
| `--bg-alt` | `#f5f5f7` | Alternative backgrounds, form inputs |
| `--ink` | `#1d1d1f` | Primary text, buttons, dark elements |
| `--ink-secondary` | `#6e6e73` | Secondary text, descriptions |
| `--ink-tertiary` | `#a1a1a6` | Tertiary text, captions, hints |
| `--amber` | `#c87d2f` | Brand accent — CTAs, icons, active states |
| `--amber-light` | `#e8a84c` | Lighter amber for highlights |
| `--amber-bg` | `rgba(200, 125, 47, 0.06)` | Amber tinted backgrounds (tags, badges) |

### Borders & Shadows

| Token | Value | Usage |
|---|---|---|
| `--border` | `rgba(0, 0, 0, 0.08)` | Default card/input borders |
| `--border-strong` | `rgba(0, 0, 0, 0.12)` | Hover/active borders |
| `--card-shadow` | `0 2px 20px rgba(0, 0, 0, 0.04)` | Resting card shadow |
| `--card-shadow-hover` | `0 8px 40px rgba(0, 0, 0, 0.08)` | Elevated hover shadow |

### Spacing & Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `16px` | Standard card/component radius |
| `--radius-lg` | `24px` | Large sections, project cards |

### Typography

| Token | Value |
|---|---|
| `--font` | `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif` |

**Google Fonts import** includes weights 200–700, italic, optical sizing 9–40px.

### Animation Easing

| Token | Value | Usage |
|---|---|---|
| `--ease` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Standard transitions |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrance/reveal animations |

---

## 3. Typography Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Hero title | `clamp(4.5rem, 14vw, 10rem)` | 700 | 0.85 | -0.04em |
| Section heading | `clamp(2.5rem, 5vw, 3.5rem)` | 700 | 1.1 | -0.03em |
| Narrative large | `clamp(2rem, 5vw, 3.5rem)` | 300 | 1.4 | -0.03em |
| Narrative text | `clamp(1.5rem, 3.5vw, 2.2rem)` | 300 | 1.4 | -0.02em |
| Value heading (h3) | `clamp(2rem, 4vw, 3rem)` | 700 | 1.1 | -0.03em |
| Service card heading | `1.15rem` | 600 | — | — |
| Body text | inherited (default) | 400 | 1.6 | 0 |
| Service description | `0.88rem` | 400 | 1.6 | — |
| Service tags | `0.7rem` | 500 | — | 0.01em |
| Eyebrows/labels | `0.75rem` | 600 | — | 0.08em (uppercase) |
| Captions/hints | `0.8rem` | 400 | — | — |

---

## 4. Component Library

### Architecture

- **No external UI library** — all components are custom React functional components
- **Location:** `src/components/` (flat structure)
- **Export pattern:** `export default function ComponentName()`
- **Import pattern:** direct file imports, no barrel exports
- **Styling:** CSS class names (BEM-like), no inline styles

### Component Inventory

| Component | File | Purpose |
|---|---|---|
| `Nav` | `src/components/Nav.jsx` | Fixed nav with logo, links, mobile menu |
| `LogoIcon` | `src/components/LogoIcon.jsx` | SVG tree logo, accepts `className` prop |
| `HeroSection` | `src/components/HeroSection.jsx` | Scroll-narrative hero with ambient orbs |
| `AboutSection` | `src/components/AboutSection.jsx` | Scroll-triggered fade narrative |
| `ValuesSection` | `src/components/ValuesSection.jsx` | 3 values with image cards |
| `ServicesSection` | `src/components/ServicesSection.jsx` | 6-card grid of services |
| `ProjectsSection` | `src/components/ProjectsSection.jsx` | Portfolio grid from localStorage |
| `ContactSection` | `src/components/ContactSection.jsx` | CTA with email link |
| `Footer` | `src/components/Footer.jsx` | Brand + copyright |

### Pages

| Page | File | Notes |
|---|---|---|
| `Home` | `src/pages/Home.jsx` | Assembles all section components |
| `Admin` | `src/pages/Admin.jsx` | Project CRUD with forms, toasts |

### Custom Hooks

| Hook | File | Purpose |
|---|---|---|
| `useScrollNarrative` | `src/hooks/useScrollNarrative.js` | RAF-based scroll progress → opacity/translate |
| `useRevealAnimation` | `src/hooks/useRevealAnimation.js` | IntersectionObserver single-element reveal |
| `useRevealAnimations` | `src/hooks/useRevealAnimation.js` | IntersectionObserver multi-element reveal |

---

## 5. Styling Approach

### Methodology

- **Single global CSS file:** `src/styles/global.css` (~1200 lines)
- **BEM-like naming:** `.nav`, `.nav-logo`, `.nav-links`, `.service-card`, `.project-card-body`
- **CSS Custom Properties** for all design tokens
- **No preprocessor** (no SCSS/LESS)
- **No utility classes** (no Tailwind)

### Key CSS Patterns

**Cards:**
```css
background: var(--white);
border: 1px solid var(--border);
border-radius: var(--radius);
transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
```

**Card hover:**
```css
transform: translateY(-4px);  /* -6px for project cards */
box-shadow: var(--card-shadow-hover);
border-color: var(--border-strong);
```

**Form inputs:**
```css
background: var(--bg-alt);
border: 1px solid var(--border);
border-radius: 10px;
padding: 0.75rem 1rem;
/* Focus: */
border-color: var(--amber);
box-shadow: 0 0 0 3px rgba(200, 125, 47, 0.1);
```

**Tags/badges:**
```css
background: var(--amber-bg);
color: var(--amber);
border-radius: 20px;
padding: 0.25rem 0.6rem;
font-size: 0.7rem;
font-weight: 500;
```

**Buttons (primary):**
```css
background: var(--ink);
color: var(--white);
border-radius: 980px; /* pill shape */
padding: 0.9rem 2rem;
/* Hover: background: var(--amber); transform: scale(1.03) */
```

### Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|---|---|---|
| `max-width: 1024px` | Tablet | Services grid → 2 columns |
| `max-width: 768px` | Mobile | 1-column grids, hamburger nav, reduced section heights |

---

## 6. Icon System

- **No icon library** — all icons are **inline SVGs** in JSX
- SVGs use `currentColor` for color inheritance from parent CSS
- Icon sizes vary by context:
  - Service icons: `40px × 40px`
  - Navigation/inline: `16–20px`
  - Empty states: `64px`
  - Logo tree: `40px × 40px` viewBox
- `LogoIcon.jsx` is the only extracted icon component; all others are inline in their section components

---

## 7. Animation System

### Entrance Animations

**Hero staggered reveal:**
```css
animation: heroReveal 1s var(--ease-out) forwards;
/* Delays: 0.2s, 0.5s, 0.75s, 1.1s */
```

**Scroll reveal (IntersectionObserver):**
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px) translateZ(0);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}
.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}
/* Staggered cards: transition-delay: calc(var(--card-index, 0) * 0.08s) */
```

### Continuous Animations

| Animation | Duration | Effect |
|---|---|---|
| `lightPulse` | 3s infinite | Opacity 0.4 → 0.8 → 0.4 |
| `chevronBounce` | 2s infinite | translateY 0 → 8px → 0 |
| `orbFloat` | 20–25s infinite | Translate + scale ambient motion |

### Scroll-Narrative System

The `useScrollNarrative` hook maps scroll progress (0–1) to element `opacity`, `translateY`, and `scale` using `data-scroll-fade="fadeIn,fadeOut"` attributes. Performance-optimized with RAF throttling and `will-change`.

---

## 8. Asset Management

- **Public assets:** `public/` — favicon.svg, WhatsApp banner/logo SVGs
- **No local image assets** — external URLs (Unsplash) for value section images
- **Project images:** URLs stored in localStorage, loaded dynamically
- **Font:** Google Fonts CDN (`DM Sans`) imported in `index.html`

---

## 9. Project Structure

```
luxview/
├── public/
│   ├── favicon.svg
│   ├── banner-whatsapp.svg
│   └── logo-whatsapp.svg
├── src/
│   ├── assets/              (empty, reserved)
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── LogoIcon.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ValuesSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useScrollNarrative.js
│   │   └── useRevealAnimation.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Admin.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 10. Figma-to-Code Translation Rules

### When implementing from Figma designs:

1. **Colors** → Always map to CSS variables (`var(--amber)`, `var(--ink)`, etc.). Never hardcode hex values.
2. **Typography** → Use the DM Sans font family. Match weights to the scale above. Use `clamp()` for responsive sizes.
3. **Spacing** → Follow the 4px base grid. Common values: 0.75rem, 1rem, 1.5rem, 2rem.
4. **Border radius** → Use `var(--radius)` (16px) for cards, `var(--radius-lg)` (24px) for large sections, `10px` for inputs, `20px` for pills/tags.
5. **Shadows** → Use `var(--card-shadow)` and `var(--card-shadow-hover)` tokens.
6. **Icons** → Implement as inline SVGs with `currentColor`. Do not add icon libraries.
7. **Components** → Create as React functional components with default exports. Place in `src/components/`.
8. **Styles** → Add to `src/styles/global.css` using BEM-like class names matching existing patterns.
9. **Animations** → Use `var(--ease)` and `var(--ease-out)` for transitions. Hover: `translateY(-4px)` + shadow. Entrance: `translateY(30px)` → `0` with `opacity`.
10. **Responsive** → Desktop-first. Adapt at 1024px (tablet) and 768px (mobile).
11. **Hover states** → Every interactive element needs: transform, shadow upgrade, and color transition with 0.3–0.4s duration.
12. **No new dependencies** — implement within existing stack (React + vanilla CSS).
