export type EventModality = "presencial" | "online";

export type CategorySlug =
  | "festas-e-shows"
  | "teatros-e-espetaculos"
  | "stand-up-comedy"
  | "gastronomia"
  | "congressos-e-palestras"
  | "cursos-e-workshops"
  | "passeios-e-tours"
  | "esporte"
  | "gratis";

export interface TicketLot {
  id: string;
  name: string;
  lotLabel: string;
  price: number;
  fee: number;
  maxPerOrder: number;
  available: number;
  description: string;
}

export interface EventVenue {
  name: string;
  address: string;
  city: string;
  state: string;
}

export interface EventOrganizer {
  name: string;
  initials: string;
  eventsCount: number;
  verified: boolean;
}

export interface BannerTheme {
  from: string;
  via: string;
  to: string;
  accent: string;
  badgeText: string;
  motif: "music" | "theater" | "tech" | "comedy" | "food" | "sport" | "reveillon" | "workshop";
}

export interface SymplaEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: CategorySlug;
  categoryLabel: string;
  collectionIds: string[];
  modality: EventModality;
  startDateIso: string;
  dateShort: string;
  dateFull: string;
  timeRange: string;
  venue: EventVenue;
  organizer: EventOrganizer;
  priceFrom: number;
  isMostBought24h?: boolean;
  isFeaturedHero?: boolean;
  ratingLabel?: string;
  description: string[];
  highlights: string[];
  tickets: TicketLot[];
  bannerTheme: BannerTheme;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  gradientFrom: string;
  gradientTo: string;
  categoryFilter?: CategorySlug;
}

export interface CategoryItem {
  slug: CategorySlug;
  routeSlug: string;
  label: string;
  shortLabel: string;
  iconName:
    | "Music"
    | "Theater"
    | "Mic"
    | "UtensilsCrossed"
    | "Presentation"
    | "GraduationCap"
    | "Compass"
    | "Trophy"
    | "Ticket";
}

export const CITIES = [
  "Qualquer lugar",
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Brasília",
  "Salvador",
  "Porto Alegre",
  "Curitiba",
  "Fortaleza",
  "Recife",
  "Goiânia",
  "Florianópolis",
  "Campinas",
  "Online",
] as const;

export const CITY_ROUTE_MAP: Record<string, string> = {
  "belo-horizonte-mg": "Belo Horizonte",
  "sao-paulo-sp": "São Paulo",
  "rio-de-janeiro-rj": "Rio de Janeiro",
  "brasilia-df": "Brasília",
  "salvador-ba": "Salvador",
  "porto-alegre-rs": "Porto Alegre",
  "curitiba-pr": "Curitiba",
  "fortaleza-ce": "Fortaleza",
  "recife-pe": "Recife",
  "goiania-go": "Goiânia",
  "florianopolis-sc": "Florianópolis",
  "campinas-sp": "Campinas",
};

export const CATEGORY_ROUTE_MAP: Record<string, CategorySlug> = {
  "show-musica-festa": "festas-e-shows",
  "teatro-espetaculo": "teatros-e-espetaculos",
  "stand-up-comedy": "stand-up-comedy",
  "gastronomico": "gastronomia",
  "congresso-palestra": "congressos-e-palestras",
  "curso-workshop": "cursos-e-workshops",
  "experiencias": "passeios-e-tours",
  "esporte": "esporte",
  "gratis": "gratis",
};

export const CATEGORIES: CategoryItem[] = [
  { slug: "festas-e-shows", routeSlug: "show-musica-festa", label: "Festas e shows", shortLabel: "Festas e shows", iconName: "Music" },
  { slug: "teatros-e-espetaculos", routeSlug: "teatro-espetaculo", label: "Teatros e espetáculos", shortLabel: "Teatros", iconName: "Theater" },
  { slug: "stand-up-comedy", routeSlug: "stand-up-comedy", label: "Stand up comedy", shortLabel: "Stand up", iconName: "Mic" },
  { slug: "gastronomia", routeSlug: "gastronomico", label: "Gastronomia", shortLabel: "Gastronomia", iconName: "UtensilsCrossed" },
  { slug: "congressos-e-palestras", routeSlug: "congresso-palestra", label: "Congressos e palestras", shortLabel: "Congressos", iconName: "Presentation" },
  { slug: "cursos-e-workshops", routeSlug: "curso-workshop", label: "Cursos e workshops", shortLabel: "Cursos", iconName: "GraduationCap" },
  { slug: "passeios-e-tours", routeSlug: "experiencias", label: "Passeios e tours", shortLabel: "Passeios", iconName: "Compass" },
  { slug: "esporte", routeSlug: "esporte", label: "Esporte", shortLabel: "Esporte", iconName: "Trophy" },
  { slug: "gratis", routeSlug: "gratis", label: "Eventos gratuitos", shortLabel: "Grátis", iconName: "Ticket" },
];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: "collection-promocoes",
    slug: "promocoes",
    title: "Promoções",
    subtitle: "Ingressos com descontos exclusivos e lotes especiais",
    badge: "Até 40% OFF",
    gradientFrom: "#007fd6",
    gradientTo: "#012844",
  },
  {
    id: "collection-reveillon",
    slug: "reveillon",
    title: "Réveillon 2027",
    subtitle: "Festas open bar, shows na praia e viradas inesquecíveis",
    badge: "Mais buscados",
    gradientFrom: "#141729",
    gradientTo: "#0063a5",
    categoryFilter: "festas-e-shows",
  },
  {
    id: "collection-teatros-e-espetaculos",
    slug: "teatros-e-espetaculos",
    title: "Teatros e Espetáculos",
    subtitle: "Musicais, comédias e grandes produções em cartaz",
    badge: "Em cartaz",
    gradientFrom: "#5b21b6",
    gradientTo: "#1e1b4b",
    categoryFilter: "teatros-e-espetaculos",
  },
  {
    id: "collection-stand-up",
    slug: "stand-up-comedy",
    title: "Stand Up Comedy",
    subtitle: "Os principais comediantes do país nos melhores comedy clubs",
    badge: "Risos garantidos",
    gradientFrom: "#df5d11",
    gradientTo: "#7a2e0e",
    categoryFilter: "stand-up-comedy",
  },
  {
    id: "collection-tech-cursos",
    slug: "cursos-e-workshops",
    title: "Tech & Workshops",
    subtitle: "Conferências de software, IA, UX e bootcamps práticos",
    badge: "Certificado incluso",
    gradientFrom: "#0e9384",
    gradientTo: "#062c41",
    categoryFilter: "cursos-e-workshops",
  },
  {
    id: "collection-gratis",
    slug: "gratis",
    title: "Eventos Gratuitos",
    subtitle: "Cultura, feiras, palestras e encontros com entrada franca",
    badge: "Entrada franca",
    gradientFrom: "#079455",
    gradientTo: "#053321",
    categoryFilter: "gratis",
  },
];

export const SEED_EVENTS: SymplaEvent[] = [
  {
    id: "evt-1",
    slug: "festival-verao-urbano-sp-2026",
    title: "Festival Verão Urbano — Edição Paulista 2026",
    subtitle: "12 horas de música ao vivo, palco 360º e praça gastronômica",
    category: "festas-e-shows",
    categoryLabel: "Festas e shows",
    collectionIds: ["collection-promocoes", "collection-reveillon"],
    modality: "presencial",
    startDateIso: "2026-12-05T15:00:00",
    dateShort: "SÁB, 05 DEZ · 15:00",
    dateFull: "Sábado, 05 de Dezembro de 2026",
    timeRange: "15:00 às 03:00",
    venue: {
      name: "Parque Villa-Lobos — Arena Sul",
      address: "Av. Prof. Fonseca Rodrigues, 2001 - Alto de Pinheiros",
      city: "São Paulo",
      state: "SP",
    },
    organizer: { name: "Urbano Live Produções", initials: "UL", eventsCount: 42, verified: true },
    priceFrom: 110,
    isMostBought24h: true,
    isFeaturedHero: true,
    ratingLabel: "Top vendas 24h",
    description: [
      "O Festival Verão Urbano retorna a São Paulo com dois palcos simultâneos, cenografia imersiva e mais de 10 atrações nacionais de pop, indie e música eletrônica.",
      "O espaço conta com área coberta, praça gastronômica assinada por chefs paulistanos, pontos de hidratação gratuitos e acessibilidade completa.",
      "Classificação indicativa: 18 anos. Apresente o ingresso digital no app ou PDF na portaria principal.",
    ],
    highlights: [
      "Abertura dos portões às 14:30",
      "Line-up completo divulgado nos canais oficiais",
      "Setores Pista, Pista Premium e Lounge Open Bar",
      "Cancelamento gratuito em até 7 dias após a compra",
    ],
    tickets: [
      { id: "tkt-1-1", name: "Pista — Meia-Entrada / Social", lotLabel: "2º Lote", price: 110, fee: 11, maxPerOrder: 6, available: 84, description: "Válido mediante carteira de estudante, ID Jovem ou doação de 1kg de alimento não perecível." },
      { id: "tkt-1-2", name: "Pista — Inteira", lotLabel: "2º Lote", price: 220, fee: 22, maxPerOrder: 6, available: 120, description: "Acesso completo à área de pista e praça gastronômica." },
      { id: "tkt-1-3", name: "Lounge Front Stage Open Bar", lotLabel: "1º Lote", price: 390, fee: 39, maxPerOrder: 4, available: 28, description: "Visão privilegiada em frente ao palco principal + open bar premium." },
    ],
    bannerTheme: { from: "#007fd6", via: "#00497b", to: "#012844", accent: "#fdb022", badgeText: "DESTAQUE EM SÃO PAULO", motif: "music" },
  },
  {
    id: "evt-2",
    slug: "o-fantasma-da-avenida-teatro-clara-nunes",
    title: "O Fantasma da Avenida — O Musical",
    subtitle: "Temporada especial no Rio de Janeiro com orquestra ao vivo",
    category: "teatros-e-espetaculos",
    categoryLabel: "Teatros e espetáculos",
    collectionIds: ["collection-teatros-e-espetaculos", "collection-promocoes"],
    modality: "presencial",
    startDateIso: "2026-11-28T20:00:00",
    dateShort: "SÁB, 28 NOV · 20:00",
    dateFull: "Sábado, 28 de Novembro de 2026",
    timeRange: "20:00 às 22:15",
    venue: { name: "Teatro Clara Nunes", address: "Rua Marquês de São Vicente, 52 - Gávea", city: "Rio de Janeiro", state: "RJ" },
    organizer: { name: "Companhia Cena Carioca", initials: "CC", eventsCount: 19, verified: true },
    priceFrom: 75,
    isMostBought24h: true,
    isFeaturedHero: true,
    ratingLabel: "Sucesso de crítica",
    description: [
      "Aclamado pelo público e premiado pela crítica, o espetáculo mistura drama, humor e números musicais inéditos acompanhados por orquestra ao vivo.",
      "Duração aproximada: 135 minutos com 15 minutos de intervalo. Chegue com 30 minutos de antecedência.",
    ],
    highlights: ["Orquestra ao vivo com 14 músicos", "Assentos numerados por setor", "Tradução simultânea em Libras na sessão de sábado"],
    tickets: [
      { id: "tkt-2-1", name: "Balcão Superior — Meia", lotLabel: "Lote Único", price: 75, fee: 7.5, maxPerOrder: 6, available: 42, description: "Visão panorâmica do palco no segundo pavimento." },
      { id: "tkt-2-2", name: "Plateia Central — Inteira", lotLabel: "Lote Único", price: 160, fee: 16, maxPerOrder: 6, available: 36, description: "Assentos nas fileiras centrais com acústica ideal." },
    ],
    bannerTheme: { from: "#4c1d95", via: "#2e1065", to: "#141729", accent: "#f79009", badgeText: "TEATRO E MUSICAL", motif: "theater" },
  },
  {
    id: "evt-3",
    slug: "brazil-frontend-summit-2026",
    title: "Brazil Frontend & React Summit 2026",
    subtitle: "Next.js, React Server Components, Design Systems e Performance Web",
    category: "congressos-e-palestras",
    categoryLabel: "Congressos e palestras",
    collectionIds: ["collection-tech-cursos"],
    modality: "presencial",
    startDateIso: "2026-12-12T09:00:00",
    dateShort: "SÁB, 12 DEZ · 09:00",
    dateFull: "Sábado, 12 de Dezembro de 2026",
    timeRange: "09:00 às 18:30",
    venue: { name: "Expo Center Minas — Auditório Principal", address: "Av. Amazonas, 6200 - Gameleira", city: "Belo Horizonte", state: "MG" },
    organizer: { name: "DevBrasil Comunidade", initials: "DB", eventsCount: 31, verified: true },
    priceFrom: 149,
    isMostBought24h: true,
    isFeaturedHero: true,
    ratingLabel: "Últimas vagas",
    description: [
      "Um dia inteiro de imersão técnica em arquitetura frontend moderna, com trilhas dedicadas a Next.js App Router, Vanilla Extract, Tailwind CSS v4, acessibilidade com Radix UI e Web Vitals.",
      "Inclui coffee break, kit do participante, acesso às gravações por 90 dias e certificado digital.",
    ],
    highlights: ["18 palestrantes de grandes empresas de tecnologia", "Certificado digital de 9 horas complementares", "Networking lounge e feira de carreiras"],
    tickets: [
      { id: "tkt-3-1", name: "Ingresso Estudante / Acadêmico", lotLabel: "2º Lote", price: 149, fee: 14.9, maxPerOrder: 2, available: 25, description: "Acesso presencial completo + certificado digital." },
      { id: "tkt-3-2", name: "Ingresso Profissional", lotLabel: "2º Lote", price: 299, fee: 29.9, maxPerOrder: 5, available: 90, description: "Acesso presencial completo, kit exclusivo e gravações on-demand." },
    ],
    bannerTheme: { from: "#088ab2", via: "#0063a5", to: "#062c41", accent: "#2ed3b7", badgeText: "CONFERÊNCIA TECH", motif: "tech" },
  },
  {
    id: "evt-4",
    slug: "noite-stand-up-comedy-clube-minhoca",
    title: "Comédia de Sexta: Show Especial de Improviso & Stand Up",
    subtitle: "Quatro comediantes no palco em noite de humor sem roteiro",
    category: "stand-up-comedy",
    categoryLabel: "Stand up comedy",
    collectionIds: ["collection-stand-up", "collection-promocoes"],
    modality: "presencial",
    startDateIso: "2026-11-27T21:30:00",
    dateShort: "SEX, 27 NOV · 21:30",
    dateFull: "Sexta-feira, 27 de Novembro de 2026",
    timeRange: "21:30 às 23:10",
    venue: { name: "Bixiga Comedy House", address: "Rua Rui Barbosa, 340 - Bela Vista", city: "São Paulo", state: "SP" },
    organizer: { name: "Bixiga Entretenimento", initials: "BH", eventsCount: 118, verified: true },
    priceFrom: 45,
    isMostBought24h: true,
    isFeaturedHero: true,
    description: [
      "A tradicional noite de sexta reúne quatro nomes consagrados do stand-up nacional em textos inéditos e quadros de interação direta com a plateia.",
      "Serviço de bar e petiscos disponível durante todo o show.",
    ],
    highlights: ["Abertura da casa às 20:00", "Classificação: 16 anos", "Desconto especial para compras em grupo"],
    tickets: [
      { id: "tkt-4-1", name: "Mesa Compartilhada — Antecipado", lotLabel: "1º Lote", price: 45, fee: 4.5, maxPerOrder: 6, available: 54, description: "Assento em mesa próxima ao palco principal." },
      { id: "tkt-4-2", name: "Mesa VIP (Para 2 pessoas)", lotLabel: "1º Lote", price: 120, fee: 12, maxPerOrder: 3, available: 12, description: "Mesa reservada na primeira fileira para 2 participantes." },
    ],
    bannerTheme: { from: "#df5d11", via: "#b3430f", to: "#4e1d09", accent: "#fec84b", badgeText: "STAND UP COMEDY", motif: "comedy" },
  },
  {
    id: "evt-5",
    slug: "workshop-design-systems-figma-react-online",
    title: "Workshop Prático: Design Systems com Figma, Tokens e Radix UI",
    subtitle: "Do protótipo acessível aos componentes em produção — 100% Online ao Vivo",
    category: "cursos-e-workshops",
    categoryLabel: "Cursos e workshops",
    collectionIds: ["collection-tech-cursos", "collection-gratis"],
    modality: "online",
    startDateIso: "2026-12-03T19:30:00",
    dateShort: "QUI, 03 DEZ · 19:30",
    dateFull: "Quinta-feira, 03 de Dezembro de 2026",
    timeRange: "19:30 às 22:00",
    venue: { name: "Transmissão Online ao Vivo (Sympla Streaming)", address: "Link exclusivo liberado na área Meus Ingressos", city: "Online", state: "BR" },
    organizer: { name: "Instituto UI Engenharia", initials: "IU", eventsCount: 27, verified: true },
    priceFrom: 0,
    isMostBought24h: true,
    isFeaturedHero: true,
    description: [
      "Aprenda na prática como estruturar um Design System escalável conectando tokens de cor e tipografia do Figma diretamente ao Tailwind CSS v4 e Vanilla Extract.",
      "Evento gratuito com vagas limitadas e emissão de certificado após confirmação de presença na transmissão.",
    ],
    highlights: ["100% gratuito e ao vivo", "Material de apoio e repositório no GitHub inclusos", "Q&A ao vivo com especialistas de produto"],
    tickets: [
      { id: "tkt-5-1", name: "Inscrição Gratuita + Certificado", lotLabel: "Vagas Abertas", price: 0, fee: 0, maxPerOrder: 2, available: 320, description: "Acesso à transmissão ao vivo e certificado digital." },
    ],
    bannerTheme: { from: "#079455", via: "#067647", to: "#053321", accent: "#86cb3c", badgeText: "ONLINE E GRATUITO", motif: "workshop" },
  },
  {
    id: "evt-6",
    slug: "festival-gastronomico-sabores-de-minas",
    title: "Festival Sabores de Minas — Praça da Liberdade",
    subtitle: "Cervejas artesanais, queijos premiados, cozinha ao vivo e música",
    category: "gastronomia",
    categoryLabel: "Gastronomia",
    collectionIds: ["collection-gratis", "collection-promocoes"],
    modality: "presencial",
    startDateIso: "2026-12-06T11:00:00",
    dateShort: "DOM, 06 DEZ · 11:00",
    dateFull: "Domingo, 06 de Dezembro de 2026",
    timeRange: "11:00 às 21:00",
    venue: { name: "Alameda da Liberdade", address: "Praça da Liberdade, s/n - Funcionários", city: "Belo Horizonte", state: "MG" },
    organizer: { name: "Circuito Gastronômico MG", initials: "CG", eventsCount: 53, verified: true },
    priceFrom: 0,
    isMostBought24h: true,
    isFeaturedHero: true,
    description: [
      "Mais de 30 expositores da gastronomia mineira reunidos em um domingo ao ar livre com aulas-show gratuitas e música instrumental.",
      "Retire seu ingresso gratuito antecipado para garantir acesso rápido.",
    ],
    highlights: ["Entrada franca mediante retirada de ingresso", "Espaço pet friendly e área kids", "Aulas de culinária ao vivo durante a tarde"],
    tickets: [
      { id: "tkt-6-1", name: "Entrada Gratuita", lotLabel: "Lote Único", price: 0, fee: 0, maxPerOrder: 4, available: 500, description: "Acesso livre ao circuito gastronômico." },
      { id: "tkt-6-2", name: "Passaporte Degustação (4 Vouchers)", lotLabel: "Promocional", price: 68, fee: 6.8, maxPerOrder: 4, available: 65, description: "Inclui 4 porções ou chopes artesanais em qualquer estande participante." },
    ],
    bannerTheme: { from: "#e7710b", via: "#df5d11", to: "#7a2e0e", accent: "#fef0c7", badgeText: "GASTRONOMIA", motif: "food" },
  },
  {
    id: "evt-7",
    slug: "reveillon-atlantica-copacabana-2027",
    title: "Réveillon Atlântica Vista Mar 2027 — All Inclusive",
    subtitle: "Open bar premium, buffet completo e vista privilegiada da queima de fogos",
    category: "festas-e-shows",
    categoryLabel: "Festas e shows",
    collectionIds: ["collection-reveillon"],
    modality: "presencial",
    startDateIso: "2026-12-31T21:00:00",
    dateShort: "QUI, 31 DEZ · 21:00",
    dateFull: "Quinta-feira, 31 de Dezembro de 2026",
    timeRange: "21:00 às 06:00",
    venue: { name: "Terraço Atlântica Rooftop", address: "Av. Atlântica, 2964 - Copacabana", city: "Rio de Janeiro", state: "RJ" },
    organizer: { name: "Rio Virada Eventos", initials: "RV", eventsCount: 14, verified: true },
    priceFrom: 480,
    isMostBought24h: true,
    isFeaturedHero: true,
    description: [
      "Celebre a chegada de 2027 em frente à Praia de Copacabana com open bar de destilados importados, espumante para a virada, buffet jantar e café da manhã.",
      "Line-up com banda de samba, pop e DJs até o nascer do sol.",
    ],
    highlights: ["9 horas de Open Bar & Open Food", "Vista frontal para os fogos de Copacabana", "Ambiente climatizado + terraço aberto"],
    tickets: [
      { id: "tkt-7-1", name: "Convite Feminino — All Inclusive", lotLabel: "3º Lote", price: 480, fee: 48, maxPerOrder: 4, available: 35, description: "Acesso total ao evento com open bar e buffet completos." },
      { id: "tkt-7-2", name: "Convite Masculino — All Inclusive", lotLabel: "3º Lote", price: 540, fee: 54, maxPerOrder: 4, available: 40, description: "Acesso total ao evento com open bar e buffet completos." },
    ],
    bannerTheme: { from: "#012844", via: "#00365a", to: "#141729", accent: "#fdb022", badgeText: "RÉVEILLON 2027", motif: "reveillon" },
  },
  {
    id: "evt-8",
    slug: "meia-maratona-orla-floripa-2026",
    title: "Meia Maratona da Orla — Etapa Beira-Mar Norte",
    subtitle: "Percursos de 5km, 10km e 21km com kit atleta completo",
    category: "esporte",
    categoryLabel: "Esporte",
    collectionIds: ["collection-promocoes"],
    modality: "presencial",
    startDateIso: "2026-12-13T06:30:00",
    dateShort: "DOM, 13 DEZ · 06:30",
    dateFull: "Domingo, 13 de Dezembro de 2026",
    timeRange: "06:30 às 11:30",
    venue: { name: "Parque da Luz — Beira-Mar Norte", address: "Av. Jorn. Rubéns de Arruda Ramos - Centro", city: "Florianópolis", state: "SC" },
    organizer: { name: "Sul Sports Brasil", initials: "SS", eventsCount: 64, verified: true },
    priceFrom: 95,
    description: [
      "Corra à beira-mar em um dos percursos mais bonitos e planos do Brasil. Cronometragem eletrônica por chip, postos de hidratação a cada 2,5km e medalha finisher.",
      "Retirada de kits na sexta e sábado anteriores à prova.",
    ],
    highlights: ["Camiseta dry-fit, sacochila e número de peito com chip", "Premiação por faixa etária e geral", "Guarda-volumes e recovery pós-prova"],
    tickets: [
      { id: "tkt-8-1", name: "Kit Atleta 5km / 10km", lotLabel: "2º Lote", price: 95, fee: 9.5, maxPerOrder: 4, available: 150, description: "Inscrição oficial com kit completo e medalha pós-prova." },
      { id: "tkt-8-2", name: "Kit Atleta 21km", lotLabel: "2º Lote", price: 135, fee: 13.5, maxPerOrder: 4, available: 95, description: "Inscrição oficial para meia maratona com chip e hidratação isotônica." },
    ],
    bannerTheme: { from: "#0086c9", via: "#026aa2", to: "#062c41", accent: "#47cd89", badgeText: "CORRIDA DE RUA", motif: "sport" },
  },
  {
    id: "evt-9",
    slug: "noite-samba-raiz-pelourinho-salvador",
    title: "Samba de Roda & MPB no Largo do Pelourinho",
    subtitle: "Encontro cultural ao ar livre com convidados especiais da Bahia",
    category: "festas-e-shows",
    categoryLabel: "Festas e shows",
    collectionIds: ["collection-promocoes"],
    modality: "presencial",
    startDateIso: "2026-12-04T19:00:00",
    dateShort: "SEX, 04 DEZ · 19:00",
    dateFull: "Sexta-feira, 04 de Dezembro de 2026",
    timeRange: "19:00 às 00:00",
    venue: { name: "Largo Quincas Berro d'Água", address: "Rua do Açouguinho, 12 - Pelourinho", city: "Salvador", state: "BA" },
    organizer: { name: "Axé Cultural", initials: "AC", eventsCount: 28, verified: true },
    priceFrom: 40,
    isMostBought24h: true,
    description: ["Noite dedicada ao samba de roda e à música baiana no coração do Centro Histórico de Salvador."],
    highlights: ["Área coberta em caso de chuva", "Classificação: 18 anos"],
    tickets: [
      { id: "tkt-9-1", name: "Pista — Lote Promocional", lotLabel: "1º Lote", price: 40, fee: 4, maxPerOrder: 6, available: 110, description: "Acesso à área principal do largo." },
    ],
    bannerTheme: { from: "#007fd6", via: "#00497b", to: "#012844", accent: "#fdb022", badgeText: "SHOWS EM SALVADOR", motif: "music" },
  },
  {
    id: "evt-10",
    slug: "auto-da-compadecida-teatro-guaira-curitiba",
    title: "O Auto da Compadecida — Turnê Nacional",
    subtitle: "Montagem premiada com elenco completo em Curitiba",
    category: "teatros-e-espetaculos",
    categoryLabel: "Teatros e espetáculos",
    collectionIds: ["collection-teatros-e-espetaculos"],
    modality: "presencial",
    startDateIso: "2026-12-11T20:30:00",
    dateShort: "SEX, 11 DEZ · 20:30",
    dateFull: "Sexta-feira, 11 de Dezembro de 2026",
    timeRange: "20:30 às 22:20",
    venue: { name: "Teatro Guaíra — Auditório Bento Munhoz", address: "Rua Conselheiro Laurindo, 175 - Centro", city: "Curitiba", state: "PR" },
    organizer: { name: "Palco Sul Produções", initials: "PS", eventsCount: 37, verified: true },
    priceFrom: 60,
    description: ["Clássico da dramaturgia brasileira em montagem vibrante com trilha sonora executada ao vivo."],
    highlights: ["Classificação: 12 anos", "Duração: 110 minutos"],
    tickets: [
      { id: "tkt-10-1", name: "Plateia — Meia-Entrada", lotLabel: "2º Lote", price: 60, fee: 6, maxPerOrder: 4, available: 45, description: "Assento numerado na plateia." },
      { id: "tkt-10-2", name: "Plateia — Inteira", lotLabel: "2º Lote", price: 120, fee: 12, maxPerOrder: 4, available: 80, description: "Assento numerado na plateia." },
    ],
    bannerTheme: { from: "#4c1d95", via: "#2e1065", to: "#141729", accent: "#f79009", badgeText: "TEATRO", motif: "theater" },
  },
  {
    id: "evt-11",
    slug: "humor-sem-filtro-brasilia-comedy",
    title: "Humor Sem Filtro — Especial de Fim de Ano",
    subtitle: "Show solo de comédia stand-up em Brasília",
    category: "stand-up-comedy",
    categoryLabel: "Stand up comedy",
    collectionIds: ["collection-stand-up"],
    modality: "presencial",
    startDateIso: "2026-12-10T21:00:00",
    dateShort: "QUI, 10 DEZ · 21:00",
    dateFull: "Quinta-feira, 10 de Dezembro de 2026",
    timeRange: "21:00 às 22:30",
    venue: { name: "Teatro Brasília Shopping", address: "SCN Quadra 5 Bloco A - Asa Norte", city: "Brasília", state: "DF" },
    organizer: { name: "Planalto Riso", initials: "PR", eventsCount: 22, verified: true },
    priceFrom: 50,
    description: ["Textos inéditos sobre cotidiano, tecnologia e família em uma noite de gargalhadas."],
    highlights: ["Classificação: 16 anos", "Estacionamento no local"],
    tickets: [
      { id: "tkt-11-1", name: "Ingresso Solidário (+1kg alimento)", lotLabel: "1º Lote", price: 50, fee: 5, maxPerOrder: 6, available: 60, description: "Acesso à plateia mediante entrega de 1kg de alimento na entrada." },
    ],
    bannerTheme: { from: "#df5d11", via: "#b3430f", to: "#4e1d09", accent: "#fec84b", badgeText: "STAND UP", motif: "comedy" },
  },
  {
    id: "evt-12",
    slug: "trilha-guiada-jardim-botanico-porto-alegre",
    title: "Passeio Fotográfico & Trilha Guiada no Jardim Botânico",
    subtitle: "Caminhada educativa com biólogo e fotógrafo de natureza",
    category: "passeios-e-tours",
    categoryLabel: "Passeios e tours",
    collectionIds: ["collection-gratis"],
    modality: "presencial",
    startDateIso: "2026-12-07T08:30:00",
    dateShort: "SEG, 07 DEZ · 08:30",
    dateFull: "Segunda-feira, 07 de Dezembro de 2026",
    timeRange: "08:30 às 11:30",
    venue: { name: "Jardim Botânico de Porto Alegre", address: "Rua Dr. Salvador França, 1427 - Jardim Botânico", city: "Porto Alegre", state: "RS" },
    organizer: { name: "Gaúcha Ecotur", initials: "GE", eventsCount: 16, verified: true },
    priceFrom: 0,
    description: ["Atividade ao ar livre para todas as idades explorando a flora nativa do Rio Grande do Sul."],
    highlights: ["Inscrição gratuita", "Leve água e protetor solar"],
    tickets: [
      { id: "tkt-12-1", name: "Participação Gratuita", lotLabel: "Vagas Limitadas", price: 0, fee: 0, maxPerOrder: 3, available: 40, description: "Inclui acompanhamento com guia credenciado." },
    ],
    bannerTheme: { from: "#079455", via: "#067647", to: "#053321", accent: "#86cb3c", badgeText: "PASSEIO", motif: "sport" },
  },
];

export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Como eu cancelo ou peço reembolso de ingressos?",
    answer:
      "O cancelamento com reembolso integral pode ser solicitado em até 7 dias corridos após a compra, desde que a solicitação seja feita com pelo menos 48 horas de antecedência do início do evento, conforme o Código de Defesa do Consumidor.",
  },
  {
    id: "faq-2",
    question: "Como localizar meus ingressos?",
    answer:
      "Após a confirmação do pagamento, seus ingressos ficam disponíveis imediatamente na seção 'Meus ingressos' (no topo da página) e também são enviados em formato digital para o e-mail informado na compra.",
  },
  {
    id: "faq-3",
    question: "Como trocar a titularidade do ingresso?",
    answer:
      "Você pode alterar o nome e e-mail do participante diretamente em 'Meus ingressos' até 24 horas antes do início do evento, caso o organizador habilite a transferência de titularidade.",
  },
  {
    id: "faq-4",
    question: "Como acesso meu certificado?",
    answer:
      "Para eventos que oferecem certificado digital, o documento é liberado automaticamente na sua conta após a conclusão do evento e validação do seu check-in pelo organizador.",
  },
  {
    id: "faq-5",
    question: "Não consigo acessar minha conta, o que fazer?",
    answer:
      "Utilize a opção 'Acesse sua conta' no cabeçalho para entrar com seu e-mail cadastrado ou redefinir sua senha. Caso tenha comprado como convidado, use o mesmo e-mail do pedido para vincular seus ingressos.",
  },
];
