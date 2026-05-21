# Briefing — EquipeFrontEnd

> Preencha este arquivo antes de acionar o squad. Quanto mais detalhado o briefing,
> mais preciso será o design gerado por Alessandra e o código gerado por Victor.

---

## Identificação do Projeto

**Nome do projeto** (em kebab-case, ex: `minha-loja-online`):
eduardo-barletta-portfolio

**Nome do negócio / marca**:
Eduardo Barletta — Graphic Designer

---

## Sobre o Negócio

**O que faz** (descreva em 1-3 frases):
Designer gráfico especializado em identidade visual, branding e design de comunicação. Apresenta seu trabalho no Behance (https://www.behance.net/eduardobarletta) e busca novos clientes através do portfólio online.

**Tipo de negócio**:
[x] Portfólio pessoal

**Público-alvo** (quem são as pessoas que vão acessar o site?):
Empresas e empreendedores buscando serviços de design gráfico, startups em fase de criação de marca, agências procurando freelancers criativos e marcas que precisam de rebranding. Perfil: decisores de negócio ou donos de empresa, entre 25-45 anos, que valorizam design de qualidade premium.

---

## Objetivo do Site

**O que o visitante deve FAZER ao acessar o site?** (ação principal):
Entrar em contato com Eduardo para solicitar um orçamento ou iniciar um projeto de design.

**Objetivo secundário** (opcional):
Visualizar os projetos no Behance (https://www.behance.net/eduardobarletta) e avaliar o estilo, qualidade e variedade do trabalho antes de decidir contratar.

---

## Identidade Visual

**Tom de voz / personalidade da marca**:
[x] Elegante e premium — com toque criativo e vanguardista. Eduardo é um designer que transforma conceitos em identidades visuais marcantes. O site deve transmitir maestria, atenção ao detalhe e capacidade de criar experiências visuais memoráveis.

**Cores** (se já tiver definidas, informe os hex codes; caso contrário, deixe em branco para Alessandra definir):
- Fundo principal: `#000000` (preto absoluto)
- Textos: `#F5F5F5` (branco suave)
- Cor de destaque / acento principal: `#26b0af` (verde-água / teal)
- Usar variações dessas cores para superfícies, bordas e estados interativos

**Referências visuais** (sites, marcas ou estilos que você admira):
- victortadashi.vercel.app (usar como base estrutural das seções)
- behance.net (estética de portfólio criativo de alto nível)
- Awwwards — sites premiados de designers/agências criativas
- Estilo: dark, minimalista, com detalhes em teal, tipografia forte e muito espaço negativo

**Fontes** (se já tiver preferência; caso contrário, Alessandra escolhe):
Display/headings: fonte geométrica ou grotesca moderna e impactante (ex: Space Grotesk, Syne, DM Sans Bold)
Body: fonte limpa e altamente legível (ex: Inter, DM Sans, Outfit)

---

## Conteúdo e Seções

**Seções que o site deve ter** (marque as que se aplicam e adicione outras):
[x] Hero / Banner principal
[x] Sobre / Quem sou
[x] Projetos / Portfólio
[x] Serviços
[x] Contato / CTA final

**Textos e conteúdo** (forneça rascunhos se tiver, ou deixe Alessandra criar placeholders):

### Hero
- Nome: Eduardo Barletta
- Título: Graphic Designer
- Tagline: "Crafting visual identities that leave a lasting impression."
- Subtexto: Branding • Visual Identity • Art Direction
- CTA primário: "See My Work" → ancora para seção de projetos
- CTA secundário: "Get in Touch" → ancora para seção de contato

### Sobre
- Eduardo Barletta é um designer gráfico com paixão por transformar conceitos em identidades visuais poderosas. Com expertise em branding estratégico e direção de arte, trabalha com marcas que desejam se destacar no mercado. Cada projeto começa com uma pesquisa profunda sobre o negócio e o público para criar soluções visuais únicas e memoráveis.
- Especialidades: Brand Identity, Logo Design, Visual Systems, Art Direction, Print Design, Digital Design
- Disponível para projetos freelance — behance.net/eduardobarletta

### Projetos
- Galeria de trabalhos em cards, cada um com título, categoria, ano e link para o Behance
- Projetos placeholder (Eduardo deve substituir com os reais do Behance):
  1. Brand Identity — Startup Tech (2024) → https://www.behance.net/eduardobarletta
  2. Visual Identity — Restaurant (2024) → https://www.behance.net/eduardobarletta
  3. Logo Design — Fashion Brand (2023) → https://www.behance.net/eduardobarletta
  4. Art Direction — Magazine Editorial (2023) → https://www.behance.net/eduardobarletta
  5. Packaging Design — Cosmetics (2023) → https://www.behance.net/eduardobarletta
  6. Brand Guidelines — SaaS Product (2022) → https://www.behance.net/eduardobarletta
- Botão "View All on Behance" → https://www.behance.net/eduardobarletta

### Serviços
1. **Brand Identity** — Complete visual identity systems: logo, colors, typography and brand guidelines
2. **Logo Design** — Strategic logo creation that captures the essence of your brand
3. **Art Direction** — Creative direction for campaigns, editorials and visual projects
4. **Print Design** — Packaging, brochures, posters and printed materials
5. **Visual Systems** — Cohesive design systems for digital and physical touchpoints

### Contato
- Headline: "Let's create something remarkable"
- Subtexto: Available for freelance projects and collaborations
- Links/formas de contato: Email placeholder, Behance link (https://www.behance.net/eduardobarletta), LinkedIn placeholder
- CTA: "Start a Project"

---

## Assets Disponíveis

**Imagens / Fotos fornecidas pelo cliente?**:
[x] Não — Alessandra usará placeholders CSS visuais criativos. Victor deixará espaços para assets futuros. Usar gradientes, formas geométricas abstratas e padrões tipográficos como placeholders de projeto.

**Logo existente?**:
[x] Não — usar tipografia como logo: "EB" ou "Eduardo Barletta" em tipografia display

---

## Requisitos Técnicos

**Idioma do site**:
[x] Inglês

**Animações / Interações especiais desejadas**:
- **Framer Motion** para todas as animações (obrigatório — adicionar ao package.json)
- Hero: efeito de typing/reveal no nome e tagline ao carregar a página
- Scroll animations: fade-up com stagger em todos os elementos de seções (usando Intersection Observer + Framer Motion)
- Parallax sutil no hero background
- Hover nos cards de projeto: overlay com cor teal (#26b0af) + zoom leve na imagem + reveal de título/link
- Cursor personalizado: cursor circular customizado com cor teal que cresce ao hover em elementos interativos
- Navbar: aparece com blur/glassmorphism ao rolar para baixo (scroll trigger)
- Contador animado de stats na seção Sobre (ex: "50+ projects", "5+ years")
- Transições de página suaves
- Linha decorativa animada (underline reveal em teal) nos títulos de seção

**Integrações necessárias** (além do site estático):
- Links externos para Behance: https://www.behance.net/eduardobarletta (target="_blank" em todos os links de projeto)
- Formulário de contato: apenas links (email mailto: e Behance) — sem backend necessário

**Observações adicionais**:
- Este é um portfólio para um designer gráfico — o site em si deve ser uma demonstração do nível de qualidade visual esperado pelo mercado premium
- Os cards de projeto devem ter aspect ratio 4:3 com placeholder visual criativo (não usar imagens reais — Eduardo adicionará depois)
- O site deve ser responsivo e funcionar perfeitamente em mobile
- Performance: lazy loading nas imagens, animações com `will-change` e `transform` para GPU acceleration
- Acessibilidade: WCAG AA no mínimo, semântica HTML correta
- O projeto deve ser salvo em: `skills/opensquad/skills/victor/projects/eduardo-barletta-portfolio/`
