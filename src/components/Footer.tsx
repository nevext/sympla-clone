import React from "react";
import Link from "next/link";
import { SymplaLogo } from "./SymplaLogo";

const FOOTER_CITIES = [
  { label: "Belo Horizonte", slug: "belo-horizonte-mg" },
  { label: "São Paulo", slug: "sao-paulo-sp" },
  { label: "Rio de Janeiro", slug: "rio-de-janeiro-rj" },
  { label: "Brasília", slug: "brasilia-df" },
  { label: "Salvador", slug: "salvador-ba" },
  { label: "Porto Alegre", slug: "porto-alegre-rs" },
  { label: "Curitiba", slug: "curitiba-pr" },
  { label: "Fortaleza", slug: "fortaleza-ce" },
  { label: "Recife", slug: "recife-pe" },
  { label: "Goiânia", slug: "goiania-go" },
  { label: "Florianópolis", slug: "florianopolis-sc" },
  { label: "Campinas", slug: "campinas-sp" },
];

const FOOTER_CATEGORIES = [
  { label: "Festas e shows", slug: "show-musica-festa" },
  { label: "Teatros e espetáculos", slug: "teatro-espetaculo" },
  { label: "Passeios e tours", slug: "experiencias" },
  { label: "Esporte", slug: "esporte" },
  { label: "Congressos e palestras", slug: "congresso-palestra" },
  { label: "Stand up comedy", slug: "stand-up-comedy" },
  { label: "Gastronomia", slug: "gastronomico" },
  { label: "Cursos e workshops", slug: "curso-workshop" },
  { label: "Grátis", slug: "gratis" },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Topo do Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-8">
          <SymplaLogo variant="white" />
          <p className="text-xs sm:text-sm text-brand-100">
            Compre também pelo App · Clone completo de Frontend para fins acadêmicos
          </p>
        </div>

        {/* Colunas 100% conectadas às rotas do projeto */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          <div>
            <h4 className="font-display font-bold text-white">Cidades</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              {FOOTER_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/eventos/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">Categorias</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/eventos/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">Seja Produtor</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/como-funciona" className="hover:text-white transition-colors">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/criar-evento" className="hover:text-white transition-colors">
                  Crie seu evento
                </Link>
              </li>
              <li>
                <Link href="/meus-eventos" className="hover:text-white transition-colors">
                  Meus eventos (Painel)
                </Link>
              </li>
              <li>
                <Link href="/tipos-de-eventos" className="hover:text-white transition-colors">
                  Tipos de eventos
                </Link>
              </li>
              <li>
                <Link href="/quanto-custa" className="hover:text-white transition-colors">
                  Quanto custa
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-white transition-colors">
                  Demonstração de eventos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">A Sympla</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/sobre-sympla" className="hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="hover:text-white transition-colors">
                  Todas as coleções
                </Link>
              </li>
              <li>
                <Link href="/eventos/mais-vistos" className="hover:text-white transition-colors">
                  Mais vistos em 24h
                </Link>
              </li>
              <li>
                <Link href="/codigo-de-etica-e-conduta" className="hover:text-white transition-colors">
                  Ética e conduta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">Ajuda</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/ajuda" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/meus-ingressos" className="hover:text-white transition-colors">
                  Compradores
                </Link>
              </li>
              <li>
                <Link href="/meus-eventos" className="hover:text-white transition-colors">
                  Produtores
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">
                  Termos e Políticas
                </Link>
              </li>
              <li>
                <Link href="/mapa-do-site" className="hover:text-white transition-colors">
                  Mapa do Site
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé legal */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Projeto Educacional — Clone de Frontend inspirado na Sympla (Next.js App Router +
            Tailwind CSS v4 + Vanilla Extract + Radix UI).
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/termos" className="hover:text-white">
              Termos e Políticas
            </Link>
            <Link href="/codigo-de-etica-e-conduta" className="hover:text-white">
              Ética e conduta
            </Link>
            <Link href="/mapa-do-site" className="hover:text-white">
              Mapa do Site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
