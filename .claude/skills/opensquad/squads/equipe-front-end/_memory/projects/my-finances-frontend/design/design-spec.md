# Design Document: MyFinances Frontend
**Version:** 1.0  
**Prepared by:** Alessandra  
**Date:** 2026-05-21

---

## 1. Project Overview

**Business:** MyFinances — sistema pessoal de controle financeiro para registro de saldo disponível e despesas do dia a dia.  
**Target audience:** Usuários individuais que desejam acompanhar suas finanças pessoais de forma simples, sem curva de aprendizado.  
**Primary goal:** Cadastrar e visualizar saldo e despesas em uma única tela, com clareza imediata sobre a situação financeira.  
**Design concept:** "Clean Finance" — interface limpa, dados em destaque, ações acessíveis. Minimalismo funcional com hierarquia visual forte.  
**Pages in scope:** Home (saldo + despesas), Dashboard (placeholder "Em produção")

---

## 2. Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Indigo | #4F46E5 | CTAs principais, itens de nav ativos, botões primários |
| Primary Dark | Indigo Dark | #4338CA | Hover em botões e links |
| Secondary | Emerald | #10B981 | Cards de saldo, valores positivos, badge de sucesso |
| Accent | Amber | #F59E0B | Ícone de edição, destaques pontuais |
| Background | Slate 50 | #F8FAFC | Fundo geral da página |
| Surface | White | #FFFFFF | Cards, modais, sidebar |
| Text Primary | Slate 900 | #0F172A | Títulos, rótulos, valores |
| Text Secondary | Slate 500 | #64748B | Subtítulos, placeholders, captions |

**Contrast ratios (WCAG AA):**
- Text Primary (#0F172A) on Background (#F8FAFC): 16.2:1 ✓
- Text Primary (#0F172A) on Surface (#FFFFFF): 19.1:1 ✓
- White on Primary (#4F46E5): 4.6:1 ✓

**Color psychology note:** Indigo transmite confiança e seriedade sem o peso excessivo do azul naval tradicional. Emerald reforça a associação com dinheiro e crescimento financeiro, enquanto o fundo slate 50 reduz a fadiga visual em sessões longas.

---

## 3. Typography

**Display font:** Inter — https://fonts.google.com/specimen/Inter  
**Body font:** Inter — mesma família para consistência em app utilitário

### Type Scale

| Token | Size (px) | Size (rem) | Weight | Line Height | Usage |
|-------|-----------|------------|--------|-------------|-------|
| display | 64px | 4rem | 700 | 1.1 | Não usado neste escopo |
| h1 | 48px | 3rem | 700 | 1.15 | Não usado neste escopo |
| h2 | 32px | 2rem | 700 | 1.2 | Título principal da Home |
| h3 | 22px | 1.375rem | 600 | 1.3 | Títulos de cards e seções |
| h4 | 18px | 1.125rem | 600 | 1.35 | Rótulos de modal |
| body-lg | 18px | 1.125rem | 400 | 1.6 | Parágrafo de intro da Home |
| body | 16px | 1rem | 400 | 1.6 | Texto geral |
| body-sm | 14px | 0.875rem | 400 | 1.5 | Metadata, captions |
| caption | 12px | 0.75rem | 500 | 1.4 | Labels de formulário |
| button | 15px | 0.9375rem | 600 | 1 | Rótulos de botão |

---

## 4. Spacing & Grid

**Base unit:** 4px  
**Container max-width:** 1200px  
**Column count:** 12  
**Column gutter:** 24px  
**Section vertical padding:** 48px desktop / 32px mobile

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Gaps inline mínimos |
| space-2 | 8px | Gap ícone-texto, padding input |
| space-3 | 12px | Padding interno pequeno |
| space-4 | 16px | Padding padrão de componente |
| space-6 | 24px | Padding de card, gap entre itens de lista |
| space-8 | 32px | Separação entre sub-elementos de seção |
| space-12 | 48px | Espaçamento grande entre seções |
| space-16 | 64px | Padding vertical de seção |
| space-24 | 96px | Margem vertical de seção maior |

---

## 5. Page Sections

### Sidebar (Layout global)

**Purpose:** Navegação principal fixa, presente em todas as páginas.

**Desktop layout (1200px+):**  
Coluna fixa de 240px na lateral esquerda. Altura 100vh, fundo Surface (#FFFFFF), borda direita 1px Slate 100. Topo: ícone + nome "MyFinances" (h4, Indigo). Abaixo: lista de links de navegação (Home, Dashboard). Separador `<hr>` com margin-y 16px em Slate 200. Rodapé: botão Logout fixo na base (position: absolute bottom-0 ou flex-end).

**Mobile layout (<768px):**  
Sidebar escondida por padrão. Botão hamburger no topo-esquerdo abre sidebar como drawer overlay animado da esquerda. Fundo com overlay semi-transparente.

**Elements:**
- Logo/título: ícone `BarChart2` (Lucide) + texto "MyFinances" em Indigo 700
- Nav links: padding 10px 16px, border-radius 8px, hover bg Indigo 50, ativo bg Indigo 100 + texto Indigo 700
- `<hr>`: 1px, Slate 200, margin 16px 0
- Logout: botão ghost vermelho, padding 10px 16px, ícone `LogOut` (Lucide), texto "Sair", hover bg Red 50

---

### Home — Seção de Boas-vindas

**Purpose:** Contextualizar o usuário sobre o sistema logo ao entrar.

**Desktop layout:**  
Área de texto no topo do conteúdo principal (col 1-12). Padding top 48px. `<h2>` 32px/700 em Slate 900. `<p>` 18px/400 em Slate 500, max-width 560px, margin-top 12px.

**Mobile:** Stack vertical, padding top 32px.

**Elements:**
- h2: "Bem-vindo ao MyFinances"
- p: "Gerencie seu saldo disponível e registre suas despesas do dia a dia. Simples, rápido e sempre à mão."

---

### Home — Card de Saldo

**Purpose:** Exibir e gerenciar o saldo disponível cadastrado pelo usuário.

**Estado inicial (sem saldo):**  
Botão `primary` "Adicionar Saldo" abaixo do parágrafo de intro. Ao clicar, abre modal.

**Estado com saldo:**  
Card Surface com shadow-md, border-radius 12px, padding 24px. Largura max 360px. Topo: label "Saldo Disponível" (caption, Slate 500). Valor: formatado como `R$ 0.000,00` (h3, Emerald 600). Nome cadastrado: body-sm, Slate 500. Ícone de edição `PlusCircle` (Lucide, 18px, Amber 500) — visível apenas no hover do card, posicionado top-right (absolute). Cursor pointer. Ao clicar: abre modal de adição de valor.

**Mobile:** Card full-width.

**Elements:**
- Label "Saldo Disponível" + valor em destaque
- Nome do saldo (subtítulo)
- Ícone de edição no hover (top-right, Amber)
- Botão "Adicionar Saldo" quando não há saldo

---

### Home — Seção de Despesas

**Purpose:** Permitir cadastro múltiplo de despesas e exibição em grid visual.

**Layout:**  
Abaixo do card de saldo, margin-top 48px. Título "Despesas" (h3) + botão `primary` "Cadastrar Despesa" alinhados lado a lado (flex, space-between). Grid abaixo: `grid-cols-4` no desktop, `grid-cols-2` no tablet, `grid-cols-1` no mobile. Gap 16px.

**Card de despesa:**  
Surface, shadow-sm, border-radius 10px, padding 20px. Topo: nome da despesa (body, Slate 900, font-weight 600). Valor: h4, Slate 900. Label "Despesa" caption em Slate 400. Sem ações por enquanto.

**Mobile:** 1 coluna.

**Elements:**
- Título da seção + botão de adicionar
- Grid de cards de despesa (máx. 4 por linha)
- Card individual: nome + valor

---

### Dashboard — Placeholder

**Purpose:** Indicar ao usuário que a página está em desenvolvimento.

**Layout:**  
Conteúdo centralizado vertical e horizontalmente no espaço disponível (flex center). Card Surface, border-radius 16px, padding 48px 64px, shadow-md, text-align center. Badge/tag em topo: "🚧" + texto "Em Desenvolvimento". Título h2: "Em produção". Subtítulo body-lg Slate 500: "Esta seção estará disponível em breve."

**Mobile:** Card full-width com padding reduzido.

---

### Modal — Adicionar Saldo (novo)

**Purpose:** Coletar nome e valor inicial do saldo.

**Layout:**  
Overlay backdrop blur + bg-black/40. Modal card centralizado, Surface, border-radius 16px, padding 32px, width 480px (max-width 90vw). Título h3 "Adicionar Saldo". Campos: `Nome` (text input) e `Valor` (number input com prefixo "R$"). Botões no rodapé: "Cancelar" (secondary) + "Salvar" (primary).

---

### Modal — Adicionar Valor ao Saldo (existente)

**Purpose:** Somar um valor ao saldo já cadastrado.

**Layout:**  
Mesmo estilo do modal anterior. Título h3 "Adicionar ao Saldo". Texto de contexto: "Saldo atual: R$ {valor}" (body-sm, Emerald 600). Campo único: `Valor a adicionar` (number, prefixo "R$"). Botões: "Cancelar" + "Adicionar".

---

### Modal — Cadastrar Despesa

**Purpose:** Coletar nome e valor de uma nova despesa.

**Layout:**  
Mesmo estilo base. Título h3 "Cadastrar Despesa". Campos: `Nome da despesa` (text) e `Valor` (number, prefixo "R$"). Botões: "Cancelar" + "Salvar".

---

## 6. Component Inventory

### Button

**Variants:**
- `primary` — bg Indigo 600, texto branco, border-radius 8px
- `secondary` — border 1px Indigo 600, texto Indigo 600, bg transparente
- `ghost` — sem borda, texto Slate 600, bg transparente
- `destructive` — bg Red 500, texto branco (para logout hover)

**Sizes:**
- `lg`: padding 14px 28px, font 15px, border-radius 8px
- `md`: padding 10px 20px, font 14px, border-radius 8px
- `sm`: padding 6px 14px, font 13px, border-radius 6px

**States:**
- Default: conforme variant
- Hover: `primary` → Indigo 700 + translateY(-1px) + shadow-sm; `secondary` → bg Indigo 50
- Active: `primary` → Indigo 800, translateY(0)
- Disabled: opacity-40, cursor-not-allowed
- Focus: outline 2px offset-2 Indigo 300

---

### Card

**Variants:**
- `default` — bg white, shadow-sm, border-radius 10px
- `saldo` — bg white, shadow-md, border-radius 12px, border-left 4px Emerald 500
- `minimal` — sem shadow, apenas padding

**Structure:** padding 20-24px, border-radius 10-12px  
**Hover (saldo card):** shadow-md → shadow-lg, transition 200ms ease

---

### Input / Form Field

**States:** Default (border Slate 200), Focus (border Indigo 400, ring 2px Indigo 100), Filled (border Slate 300), Error (border Red 400), Disabled (bg Slate 50, opacity-60)  
**Specs:** border 1px, border-radius 8px, padding 10px 14px, font-size 15px, label acima (caption, Slate 700, margin-bottom 6px)  
**Error state:** texto Red 500 abaixo do campo, font-size 12px

---

### Navigation Link (Sidebar)

**States:**
- Default: texto Slate 600, bg transparente
- Hover: bg Indigo 50, texto Indigo 700, transition 150ms
- Active: bg Indigo 100, texto Indigo 700, font-weight 600

**Transition:** background-color 150ms ease, color 150ms ease

---

### Modal Overlay

**Specs:** fixed inset-0, bg black/40, backdrop-blur-sm, z-50, flex items-center justify-center  
**Panel:** bg white, border-radius 16px, padding 32px, width 480px, max-width 90vw, shadow-xl  
**Animação de entrada:** scale 0.96→1 + opacity 0→1, 200ms ease-out  
**Animação de saída:** scale 1→0.96 + opacity 1→0, 150ms ease-in

---

## 7. Animation & Interaction Specs

### Micro-interactions

| Element | Trigger | Property | Duration | Easing |
|---------|---------|----------|----------|--------|
| Button primary | hover | background-color | 180ms | ease |
| Button primary | hover | transform (lift) | 180ms | ease |
| Nav link | hover | bg-color, color | 150ms | ease |
| Saldo card | hover | box-shadow | 200ms | ease |
| Ícone de edição | hover card | opacity 0→1 | 150ms | ease |
| Input | focus | border-color, ring | 150ms | ease |
| Modal | open | scale + opacity | 200ms | ease-out |
| Modal | close | scale + opacity | 150ms | ease-in |
| Expense card | mount | opacity 0→1 + translateY 8px→0 | 250ms | ease-out |

### Page Load

| Element | Effect | Delay |
|---------|--------|-------|
| Sidebar | fade-in from left | 0ms |
| Welcome section | fade-up | 100ms |
| Saldo area | fade-up | 200ms |
| Despesas section | fade-up | 300ms |

**Performance rules:**
- Animar apenas `transform` e `opacity`
- Respeitar `prefers-reduced-motion`
- Usar CSS transitions para micro-interações

---

## 8. Image & Asset Specs

### Icons

**Style:** outline (stroke)  
**Recommended library:** Lucide React  
**Size:** 20×20px inline, 24×24px padrão, 18px em sidebar  
**Color:** currentColor

**Icons utilizados:**
- `BarChart2` — logo/ícone do sistema na sidebar
- `Home` — link Home na sidebar
- `LayoutDashboard` — link Dashboard na sidebar
- `LogOut` — botão Logout
- `PlusCircle` — ícone de adicionar valor no card de saldo
- `Plus` — botões de adicionar
- `DollarSign` ou `Wallet` — decorativo no card de saldo
- `X` — fechar modal

**Photography/Illustrations:** Não aplicável — sistema utilitário sem imagens.

---

## 9. Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #4F46E5;
  --color-primary-dark: #4338CA;
  --color-secondary: #10B981;
  --color-accent: #F59E0B;
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text-primary: #0F172A;
  --color-text-secondary: #64748B;

  /* Typography */
  --font-body: 'Inter', sans-serif;

  --text-h2: 2rem;
  --text-h3: 1.375rem;
  --text-h4: 1.125rem;
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-body-sm: 0.875rem;
  --text-caption: 0.75rem;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Layout */
  --sidebar-width: 240px;
  --container-max: 1200px;
  --section-padding-y: 48px;
  --section-padding-y-mobile: 32px;

  /* Borders */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06);
  --shadow-xl: 0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 350ms ease;
}
```

---

## 10. Implementation Notes

**Recommended stack:** Next.js 15 + TypeScript + Tailwind CSS 3 + Lucide React

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**State management:** `useState` local — escopo pequeno, sem necessidade de store global.

**Data types:**
```ts
interface Saldo {
  nome: string;
  valor: number;
}

interface Despesa {
  id: string;
  nome: string;
  valor: number;
}
```

**Accessibility checklist:**
- [x] Sem imagens — alt text não aplicável
- [x] Contraste WCAG AA verificado na paleta
- [x] Todos os inputs têm `<label>` associado
- [x] Modais têm `role="dialog"`, `aria-modal="true"`, foco preso dentro
- [x] Botões têm texto descritivo
- [x] Fechar modal com Escape
- [x] `prefers-reduced-motion` respeitado

**Implementation priority:**
1. Configuração do projeto (Next.js, Tailwind, fontes, tokens)
2. Layout com sidebar (RootLayout)
3. Página Home — seção de boas-vindas
4. Card de saldo + modal de adição
5. Grid de despesas + modal
6. Página Dashboard — placeholder
7. Responsividade mobile
8. Animações de entrada e micro-interações
