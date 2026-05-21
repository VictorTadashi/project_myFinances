# Conversion Rules — HTML/CSS → React/Next.js + Tailwind

Regras de mapeamento que Victor aplica ao converter designs em código React.

---

## 1. Cores

### CSS Variables → Tailwind Config

**HTML original:**
```css
:root {
  --color-primary: #7C6EFA;
  --color-primary-dark: #6254D6;
  --color-accent: #00E5C8;
  --color-bg: #080810;
  --color-surface: #12121E;
  --color-text-primary: #EEEEF8;
  --color-text-secondary: #7878A0;
}
```

**Mapear para `tailwind.config.ts`:**
```ts
colors: {
  primary: {
    DEFAULT: '#7C6EFA',
    dark: '#6254D6',
  },
  accent: '#00E5C8',
  background: '#080810',
  surface: '#12121E',
  foreground: '#EEEEF8',
  muted: '#7878A0',
}
```

**Manter as variáveis CSS em `globals.css`** para uso direto em estilos não-Tailwind:
```css
:root {
  --color-primary: theme('colors.primary.DEFAULT');
  /* ... */
}
```

**Regra:** Nunca hardcodar hex no JSX. Sempre usar a classe Tailwind do token.

---

## 2. Tipografia

### Google Fonts via `<link>` → `next/font/google`

**HTML original:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
```

**Converter para `app/layout.tsx`:**
```tsx
import { Inter, Syne } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
})
```

**`tailwind.config.ts`:**
```ts
fontFamily: {
  body: ['var(--font-inter)', 'sans-serif'],
  display: ['var(--font-syne)', 'sans-serif'],
}
```

**Uso no JSX:** `className="font-body"` ou `className="font-display"`

---

## 3. Animações e Transições

### CSS Keyframes → Tailwind Config + Classes

**HTML original:**
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.animate-fade-up { animation: fadeUp 0.5s ease-out forwards; }
```

**`tailwind.config.ts`:**
```ts
keyframes: {
  'fade-up': {
    '0%':   { opacity: '0', transform: 'translateY(24px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'pulse-opacity': {
    '0%, 100%': { opacity: '1' },
    '50%':      { opacity: '0.5' },
  },
},
animation: {
  'fade-up':      'fade-up 0.5s ease-out forwards',
  'pulse-opacity':'pulse-opacity 2s ease-in-out infinite',
},
```

**Uso no JSX:** `className="animate-fade-up"`

### Transition Classes

| CSS original | Tailwind equivalente |
|--------------|---------------------|
| `transition: all 0.2s ease` | `transition-all duration-200 ease-in-out` |
| `transition: color 0.15s` | `transition-colors duration-150` |
| `transition: transform 0.3s ease` | `transition-transform duration-300` |
| `transition: opacity 0.4s` | `transition-opacity duration-400` |

---

## 4. Hover e States

### CSS Pseudo-classes → Tailwind Prefixes

**HTML original:**
```css
.btn:hover {
  background-color: #6254D6;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124,110,250,0.35);
}

.btn:active {
  transform: translateY(0);
}

.btn:focus {
  outline: 2px solid #7C6EFA;
  outline-offset: 2px;
}
```

**JSX com Tailwind:**
```tsx
<button className="
  bg-primary
  hover:bg-primary-dark
  hover:-translate-y-0.5
  hover:shadow-[0_8px_24px_rgba(124,110,250,0.35)]
  active:translate-y-0
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
  transition-all duration-200
">
```

---

## 5. Layout — Grid e Flexbox

### CSS Grid → Tailwind Grid

**HTML original:**
```css
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

@media (max-width: 768px) {
  .grid-layout { grid-template-columns: 1fr; gap: 40px; }
}
```

**Tailwind:**
```tsx
<div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
```

### CSS Flexbox → Tailwind Flex

**HTML original:**
```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
```

**Tailwind:**
```tsx
<nav className="flex items-center justify-between gap-8">
```

---

## 6. Responsividade

### Media Queries → Tailwind Breakpoints

| CSS `@media` | Tailwind prefix | Largura mínima |
|--------------|-----------------|----------------|
| `(max-width: 640px)` — mobile only | sem prefixo (mobile-first) | < 640px |
| `(min-width: 640px)` | `sm:` | ≥ 640px |
| `(min-width: 768px)` | `md:` | ≥ 768px |
| `(min-width: 1024px)` | `lg:` | ≥ 1024px |
| `(min-width: 1280px)` | `xl:` | ≥ 1280px |
| `(min-width: 1536px)` | `2xl:` | ≥ 1536px |

**Estratégia:** Tailwind é mobile-first. Estilos sem prefixo são o padrão (mobile). Adicionar prefixos para overrides em telas maiores.

**HTML original:**
```css
.hero-title { font-size: 40px; }
@media (min-width: 1024px) { .hero-title { font-size: 56px; } }
```

**Tailwind:**
```tsx
<h1 className="text-4xl lg:text-5xl">
```

---

## 7. Espaçamento

### CSS px → Tailwind Spacing Scale

A escala Tailwind usa múltiplos de 4px (1 unit = 4px):

| CSS valor | Tailwind class |
|-----------|----------------|
| 4px | `p-1` / `m-1` |
| 8px | `p-2` / `m-2` |
| 12px | `p-3` / `m-3` |
| 16px | `p-4` / `m-4` |
| 20px | `p-5` / `m-5` |
| 24px | `p-6` / `m-6` |
| 32px | `p-8` / `m-8` |
| 40px | `p-10` / `m-10` |
| 48px | `p-12` / `m-12` |
| 64px | `p-16` / `m-16` |
| 80px | `p-20` / `m-20` |
| 96px | `p-24` / `m-24` |

Para valores fora da escala padrão, usar `tailwind.config.ts` extend:
```ts
spacing: {
  '18': '72px',
  '22': '88px',
}
```

---

## 8. Sombras

### Box-Shadow → Tailwind + Arbitrary Values

**HTML original:**
```css
box-shadow: 0 8px 24px rgba(124, 110, 250, 0.35);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
```

**Opção 1 — Tailwind config (recomendado para sombras do design system):**
```ts
boxShadow: {
  'primary': '0 8px 24px rgba(124,110,250,0.35)',
  'soft': '0 2px 8px rgba(0,0,0,0.5)',
}
```
Uso: `className="shadow-primary"`

**Opção 2 — Arbitrary value (para sombras únicas):**
```tsx
className="shadow-[0_8px_24px_rgba(124,110,250,0.35)]"
```

---

## 9. Backdrop Filter (Glassmorphism)

**HTML original:**
```css
backdrop-filter: blur(12px);
background: rgba(18, 18, 30, 0.8);
```

**Tailwind:**
```tsx
<div className="backdrop-blur-md bg-surface/80">
```

> Requer `bg-opacity` ou sintaxe `color/opacity` do Tailwind v3.

---

## 10. Glassmorphism e Gradientes

**HTML original:**
```css
background: linear-gradient(135deg, #7C6EFA 0%, #00E5C8 100%);
background: linear-gradient(to bottom, rgba(8,8,16,0) 0%, rgba(8,8,16,1) 100%);
```

**Tailwind config:**
```ts
backgroundImage: {
  'gradient-brand': 'linear-gradient(135deg, #7C6EFA 0%, #00E5C8 100%)',
  'gradient-fade': 'linear-gradient(to bottom, transparent, #080810)',
}
```
Uso: `className="bg-gradient-brand"`

---

## 11. Clamp / Fluid Typography

**HTML original:**
```css
font-size: clamp(40px, 5vw, 56px);
```

**Tailwind arbitrary value:**
```tsx
className="text-[clamp(2.5rem,5vw,3.5rem)]"
```

Ou configurar como token no tailwind.config.ts:
```ts
fontSize: {
  'hero': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.1' }],
}
```

---

## 12. `"use client"` — Quando Adicionar

Adicionar `"use client"` no topo do arquivo **apenas se** o componente:
- Usa `useState`, `useEffect`, `useRef`, ou outros hooks React
- Usa event handlers (`onClick`, `onChange`, etc.)
- Usa APIs do browser (`window`, `document`, `localStorage`)
- Importa bibliotecas client-only (ex: `framer-motion`)

Componentes puramente declarativos (sem interação) são Server Components por padrão — não precisam de `"use client"`.

---

## 13. Imagens

**HTML original:**
```html
<img src="/images/hero.jpg" alt="Hero" width="600" height="400">
```

**Next.js `<Image>` component:**
```tsx
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={600}
  height={400}
  className="rounded-xl object-cover"
  priority // apenas para imagens above the fold
/>
```

---

## 14. SVG Icons

Para ícones SVG inline do HTML, converter para componentes React:

**HTML original:**
```html
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="..." fill="currentColor"/>
</svg>
```

**Componente React:**
```tsx
// components/ui/icon-arrow.tsx
export function IconArrow({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
      <path d="..." fill="currentColor"/>
    </svg>
  )
}
```

---

## Checklist de Conversão

- [ ] Todas as cores extraídas como tokens no `tailwind.config.ts`
- [ ] Fontes carregadas via `next/font/google` no `layout.tsx`
- [ ] Animações e keyframes mapeados no `tailwind.config.ts`
- [ ] Media queries convertidas para prefixos Tailwind (mobile-first)
- [ ] Hover/active/focus states convertidos para pseudo-class prefixes
- [ ] Nenhum `style={{}}` inline (exceto `transform` dinâmico ou valores calculados em JS)
- [ ] Componentes com hooks marcados com `"use client"`
- [ ] Imagens usando `next/image` com `width`/`height` corretos
- [ ] Sem classes CSS não utilizadas
- [ ] TypeScript sem erros de tipo
