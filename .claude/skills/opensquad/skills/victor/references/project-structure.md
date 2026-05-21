# Project Structure — Next.js 15 + TypeScript + Tailwind

Template canônico que Victor segue para todos os projetos gerados.

## Estrutura Completa

```
{nome-do-projeto}/
│
├── app/                            ← Next.js App Router
│   ├── layout.tsx                  ← Root layout: fonts, metadata, <html>, <body>
│   ├── page.tsx                    ← Página principal: monta sections em ordem
│   ├── globals.css                 ← Tailwind directives + CSS vars globais
│   └── favicon.ico
│
├── components/
│   ├── ui/                         ← Componentes atômicos reutilizáveis
│   │   ├── button.tsx              ← Button com variants (primary, secondary, ghost...)
│   │   ├── card.tsx                ← Card container
│   │   ├── badge.tsx               ← Badge/tag
│   │   ├── input.tsx               ← Input, Textarea
│   │   └── ...
│   │
│   ├── layout/                     ← Estrutura da página
│   │   ├── header.tsx              ← Cabeçalho/navbar principal
│   │   ├── footer.tsx              ← Rodapé
│   │   └── ...
│   │
│   └── sections/                   ← Seções da página (uma por "bloco" do design)
│       ├── hero-section.tsx
│       ├── features-section.tsx
│       ├── cta-section.tsx
│       ├── testimonials-section.tsx
│       └── ...
│
├── lib/
│   └── utils.ts                    ← cn() helper + funções utilitárias
│
├── types/
│   └── index.ts                    ← Interfaces e types compartilhados
│
├── public/
│   └── images/                     ← Assets estáticos
│       ├── logo.svg
│       └── ...
│
├── tailwind.config.ts              ← Design tokens: cores, fonts, keyframes, spacing
├── postcss.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

## Arquivos Base

### `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Todas as CSS vars do design original vão aqui */
  /* Ex: --color-primary: #7C6EFA; */
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Project Name',
  description: 'Project description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### `app/page.tsx`

```tsx
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  )
}
```

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Extrair do design — ex:
        primary: {
          DEFAULT: '#7C6EFA',
          dark: '#6254D6',
        },
        accent: '#00E5C8',
        background: '#080810',
        surface: '#12121E',
        foreground: '#EEEEF8',
        muted: '#7878A0',
      },
      fontFamily: {
        // Mapear para variáveis CSS das fonts
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        // Animações do design original
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
```

### `lib/utils.ts`

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

> Requer: `npm install clsx tailwind-merge`

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Padrão de Componente

```tsx
// components/sections/hero-section.tsx
'use client' // apenas se usar hooks ou eventos

interface HeroSectionProps {
  title?: string
  subtitle?: string
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="...">
      {/* implementação */}
    </section>
  )
}
```

## Regras de Organização

| Critério | ui/ | layout/ | sections/ |
|----------|-----|---------|-----------|
| Reutilizável em múltiplos lugares | ✅ | parcial | ❌ |
| Aparece uma vez por página | ❌ | ✅ | ✅ |
| Representa "bloco" do design | ❌ | ❌ | ✅ |
| Sem estado próprio geralmente | ✅ | parcial | ❌ |
| Tamanho típico | < 50 linhas | < 100 linhas | < 200 linhas |
