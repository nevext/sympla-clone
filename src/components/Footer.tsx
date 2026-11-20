import React from "react";
import Link from "next/link";
import { SymplaLogo } from "./SymplaLogo";

const FOOTER_CITIES = [
  "Belo Horizonte",
  "São Paulo",
  "Rio de Janeiro",
  "Brasília",
  "Salvador",
  "Porto Alegre",
  "Curitiba",
  "Fortaleza",
  "Recife",
  "Goiânia",
  "Florianópolis",
  "Campinas",
];

const FOOTER_CATEGORIES = [
  { label: "Festas e shows", slug: "festas-e-shows" },
  { label: "Teatros e espetáculos", slug: "teatros-e-espetaculos" },
  { label: "Passeios e tours", slug: "passeios-e-tours" },
  { label: "Esporte", slug: "esporte" },
  { label: "Congressos e palestras", slug: "congressos-e-palestras" },
  { label: "Stand up comedy", slug: "stand-up-comedy" },
  { label: "Gastronomia", slug: "gastronomia" },
  { label: "Cursos e workshops", slug: "cursos-e-workshops" },
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
            Compre também pelo App · Experiência web clonada para fins acadêmicos
          </p>
        </div>

        {/* Colunas */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          <div>
            <h4 className="font-display font-bold text-white">Cidades</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              {FOOTER_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/eventos?cidade=${encodeURIComponent(city)}`}
                    className="hover:text-white transition-colors"
                  >
                    {city}
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
                    href={`/eventos?categoria=${cat.slug}`}
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
                <Link href="/como-funciona" className="hover:text-white transition-colors">
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
            <h4 className="font-display font-bold text-white">A Sympla (Clone)</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/como-funciona" className="hover:text-white transition-colors">
                  Sobre o projeto
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-white transition-colors">
                  Todos os eventos
                </Link>
              </li>
              <li>
                <Link href="/meus-ingressos" className="hover:text-white transition-colors">
                  Meus ingressos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">Ajuda</h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/meus-ingressos" className="hover:text-white transition-colors">
                  Compradores
                </Link>
              </li>
              <li>
                <Link href="/criar-evento" className="hover:text-white transition-colors">
                  Produtores
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
          <p className="text-slate-400">Sem fins comerciais · Dados simulados localmente</p>
        </div>
      </div>
    </footer>
  );
}
