# Brainstorming de Design — Gilce & Wladimir

## Três Abordagens Estilísticas

### 1. Romantic Botanica
Inspiração em gravuras botânicas do século XIX com toques de aquarela. Fundo creme envelhecido, ornamentos florais delicados, tipografia serifada elegante. Evoca romantismo clássico e atemporalidade.
**Probabilidade:** 0.07

### 2. Golden Dusk (ESCOLHIDA)
Estética de pôr do sol dourado sobre o Nordeste brasileiro — tons de âmbar, terracota e ouro velho. Tipografia cursiva exuberante para títulos e sans-serif limpa para corpo. Sensação de calor, celebração e intimidade.
**Probabilidade:** 0.04

### 3. Minimal Monochrome
Branco e preto com um único acento dourado. Layout assimétrico, tipografia geométrica bold. Sofisticação urbana e contemporânea.
**Probabilidade:** 0.02

---

## Abordagem Escolhida: Golden Dusk

### Design Movement
Art Nouveau Tropical — ornamentos orgânicos inspirados na natureza nordestina, combinados com a exuberância do Art Nouveau europeu adaptado ao calor e à luz do Brasil.

### Core Principles
1. **Calor e Luz** — toda paleta emana do pôr do sol; nenhuma cor fria no layout principal
2. **Tipografia Expressiva** — títulos em cursiva exuberante (Great Vibes / Cormorant Garamond Italic), corpo em serif elegante
3. **Ornamentação Contida** — detalhes florais e linhas douradas como molduras, nunca como ruído visual
4. **Hierarquia Emocional** — o casal em primeiro plano, informações práticas em segundo

### Color Philosophy
A paleta nasce do ouro velho nordestino ao entardecer:
- **Ouro Principal:** `oklch(0.72 0.12 75)` — dourado âmbar quente
- **Creme Marfim:** `oklch(0.97 0.02 85)` — fundo principal, papel envelhecido
- **Terracota Suave:** `oklch(0.62 0.08 42)` — detalhes e acentos
- **Marrom Escuro:** `oklch(0.22 0.04 55)` — texto principal, elegante e legível
- **Branco Quente:** `oklch(0.99 0.005 90)` — seções alternadas

### Layout Paradigm
Seções em fluxo vertical com largura total, alternando fundos creme e branco quente. Hero com altura total e overlay gradiente. Galeria em grade orgânica com alturas variadas. Formulário centralizado com moldura ornamental.

### Signature Elements
1. Divisores ondulados dourados entre seções
2. Monograma "G & W" em tipografia cursiva como elemento recorrente
3. Linha decorativa fina dourada abaixo de títulos de seção

### Interaction Philosophy
Transições suaves e lentas (300–500ms), como virar páginas de um álbum de fotos. Hover nos botões com expansão sutil. Scroll revela seções com fade-in elegante.

### Animation
- Hero: fade-in do título com delay escalonado (nome → data → botão)
- Seções: slide-up + fade ao entrar no viewport (IntersectionObserver)
- Contador: troca de dígitos com flip suave
- Galeria: hover com scale(1.03) e sombra mais profunda
- Botões: scale(0.97) no :active, transição 160ms ease-out

### Typography System
- **Display:** `Great Vibes` — títulos principais do casal
- **Heading:** `Cormorant Garamond` Italic — subtítulos de seção
- **Body:** `Lato` 300/400 — texto corrido, formulário
- Hierarquia: 7rem (hero) → 3rem (seção) → 1.5rem (subtítulo) → 1rem (corpo)

### Brand Essence
*Um convite digital tão bonito quanto o amor que celebra — para casais que querem que cada detalhe conte.*
Personalidade: **Caloroso · Elegante · Autêntico**

### Brand Voice
Headlines diretas e emocionais, sem clichês genéricos.
- "Gilce & Wladimir — 07 de Novembro de 2026"
- "Sua presença é o nosso maior presente"

### Wordmark & Logo
Monograma caligráfico "G & W" com um anel de flores delicadas ao redor, em dourado sobre fundo transparente.

### Signature Brand Color
**Ouro Âmbar** `oklch(0.72 0.12 75)` — inconfundível, quente, celebrativo.
