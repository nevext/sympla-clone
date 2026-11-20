# Sympla Clone — Frontend Educacional

Clone fiel do frontend da plataforma [Sympla](https://www.sympla.com.br/) desenvolvido para fins acadêmicos, reproduzindo a identidade visual, os fluxos de descoberta, seleção de ingressos, checkout com reserva temporária, carteira de ingressos e publicação de eventos.

> **Aviso Educacional:** Este repositório é um projeto didático sem fins comerciais. Os dados de eventos, pagamentos (PIX/Cartão/Boleto) e autenticação são simulados localmente no navegador (`localStorage` e `sessionStorage`).

---

## Stack Tecnológica (Idêntica à Produção da Sympla)

As tecnologias abaixo foram escolhidas a partir da inspeção direta da aplicação em produção (`sympla.com.br`):

| Camada | Tecnologia | Uso no Projeto |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** + **React 19** | Roteamento, layout compartilhado e otimização de fontes |
| **Linguagem** | **TypeScript** (`strict: true`) | Tipagem forte de eventos, lotes, pedidos e contexto |
| **Estilização** | **Tailwind CSS v4** + **Vanilla Extract** | Utilitários `@theme` + tokens e estilos tipados (`.css.ts`) |
| **Acessibilidade / UI** | **Radix UI** (`Accordion`, `Dialog`, `DropdownMenu`, `Tabs`) | Menus, modais, abas de pagamento e FAQ acessível |
| **Tipografia** | **Open Sans** e **Raleway** (`next/font/google`) | Mesmas famílias tipográficas da Sympla |
| **Ícones** | **Lucide React** + SVG próprio | Ícones de interface, logo e capas vetoriais 16:9 |

---

## Como Criar e Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** `20+` (testado com Node `24.12.0` e npm `11.6.2`)
- **Git** (opcional, para versionamento)

### Passo a passo

```bash
# 1. Acesse a pasta do projeto
cd sympla-clone

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: **http://localhost:3000**

### Outros comandos úteis

```bash
# Verificar tipagem TypeScript
npm run typecheck

# Rodar linter
npm run lint

# Gerar build de produção
npm run build

# Servir build de produção
npm run start
```

---

## Rotas e Funcionalidades Implementadas

1. **`/` (Home / Vitrine):**
   - Header fixo com seletor de localização (`DropdownMenu`), busca instantânea com autocomplete, links rápidos e modal de login simulado (`Dialog`).
   - Faixa horizontal de categorias (`Festas e shows`, `Teatros`, `Stand up`, `Gastronomia`, `Congressos`, `Cursos`, `Passeios`, `Esporte`, `Grátis`).
   - Carrossel Hero de eventos em destaque.
   - Seção **"Explore nossas coleções"** (`Promoções`, `Réveillon 2027`, `Teatros e Espetáculos`, `Stand Up Comedy`, `Tech & Workshops`, `Eventos Gratuitos`).
   - Seção **"Eventos mais comprados nas últimas 24h"** (reage à cidade selecionada no Header).
   - Seção **"Eventos Online e Gratuitos"**.
   - Banner **"para Produtores"** + FAQ interativo **"Precisa de ajuda? Tire suas dúvidas aqui"** usando **Radix UI Accordion**.
2. **`/eventos` (Busca e Listagem):**
   - Filtros combináveis por palavra-chave, cidade, categoria, modalidade (`Presencial` / `Online`), preço (`Gratuitos` / `Pagos`) e ordenação.
3. **`/evento/[slug]` (Página do Evento):**
   - Layout em 2 colunas no desktop com descrição, destaques, local, organizador e **Ticket Box sticky** com seleção `+`/`-` de lotes e cálculo de taxa de serviço (10%).
   - No mobile, barra fixa inferior com gaveta modal (`Radix Dialog`).
4. **`/checkout` (Fluxo de Compra):**
   - Cronômetro regressivo de reserva de **15 minutos**.
   - Dados do comprador + formulário individual por participante (com atalho para copiar dados do comprador).
   - Abas de pagamento (`Radix Tabs`): **PIX** (QR Code + Copia e Cola), **Cartão de Crédito** (parcelamento em até 12x) e **Boleto**.
5. **`/meus-ingressos` (Carteira Digital):**
   - Lista dos pedidos confirmados e modal com **QR Code** individual de cada ingresso.
6. **`/criar-evento` e `/como-funciona` (Área do Produtor):**
   - Formulário para publicar novos eventos localmente no catálogo e página explicativa do modelo de taxas.

---

## Estrutura de Pastas

```text
sympla-clone/
├── docs/
│   ├── arquitetura.md        # Arquitetura de rotas, estado e camadas
│   └── design-system.md      # Tokens de cores, fontes e componentes
├── src/
│   ├── app/
│   │   ├── checkout/         # Fluxo de reserva e pagamento
│   │   ├── como-funciona/    # Landing page para produtores
│   │   ├── criar-evento/     # Publicação de eventos no catálogo local
│   │   ├── evento/[slug]/    # Detalhes do evento e seleção de lotes
│   │   ├── eventos/          # Catálogo com busca e filtros
│   │   ├── meus-ingressos/   # Carteira de ingressos com QR Code
│   │   ├── globals.css       # Tailwind CSS v4 + @theme Sympla
│   │   ├── layout.tsx        # RootLayout, fontes e SymplaProvider
│   │   └── page.tsx          # Vitrine principal (Home)
│   ├── components/           # Header, Footer, EventCard, HeroCarousel, FAQ, etc.
│   ├── context/              # SymplaContext (cidade, carrinho, pedidos, eventos)
│   ├── data/                 # Catálogo inicial, categorias, coleções e FAQ
│   ├── lib/                  # Utilitários de formatação BRL e códigos
│   └── styles/               # tokens.css.ts e ui.css.ts (Vanilla Extract)
├── next.config.ts            # Configuração Next.js + @vanilla-extract/next-plugin
├── postcss.config.mjs        # @tailwindcss/postcss (Tailwind v4)
└── package.json
```
