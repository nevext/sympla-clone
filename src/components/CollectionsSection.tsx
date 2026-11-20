import React from "react";
import Link from "next/link";
import {
  Baby,
  Compass,
  GraduationCap,
  Mic,
  Music,
  Percent,
  Presentation,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  Video,
} from "lucide-react";

const SYMPLA_COLLECTIONS = [
  {
    id: "collection-promocoes",
    label: "Promoções",
    href: "/eventos?colecao=collection-promocoes",
    icon: Percent,
  },
  {
    id: "collection-reveillon",
    label: "Réveillon 2027",
    href: "/eventos?colecao=collection-reveillon",
    icon: Sparkles,
  },
  {
    id: "teatros-e-espetaculos",
    label: "Teatros e Espetáculos",
    href: "/eventos?categoria=teatros-e-espetaculos",
    icon: Sparkles,
  },
  {
    id: "festas-e-shows",
    label: "Festas e Shows",
    href: "/eventos?categoria=festas-e-shows",
    icon: Music,
  },
  {
    id: "stand-up-comedy",
    label: "Stand Up Comedy",
    href: "/eventos?categoria=stand-up-comedy",
    icon: Mic,
  },
  {
    id: "esporte",
    label: "Esportes",
    href: "/eventos?categoria=esporte",
    icon: Trophy,
  },
  {
    id: "congressos-e-palestras",
    label: "Congressos e Palestras",
    href: "/eventos?categoria=congressos-e-palestras",
    icon: Presentation,
  },
  {
    id: "passeios-e-tours",
    label: "Passeios e Tours",
    href: "/eventos?categoria=passeios-e-tours",
    icon: Compass,
  },
  {
    id: "cursos-e-workshops",
    label: "Cursos e Workshops",
    href: "/eventos?categoria=cursos-e-workshops",
    icon: GraduationCap,
  },
  {
    id: "gastronomia",
    label: "Gastronomia",
    href: "/eventos?categoria=gastronomia",
    icon: UtensilsCrossed,
  },
  {
    id: "infantil",
    label: "Infantil",
    href: "/eventos",
    icon: Baby,
  },
  {
    id: "online",
    label: "Eventos Online",
    href: "/eventos?preco=gratis",
    icon: Video,
  },
];

export function CollectionsSection() {
  return (
    <section className="py-8 bg-gray-50/70 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900">
            Explore nossas coleções
          </h2>
          <Link
            href="/categorias"
            className="text-xs sm:text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            Ver tudo
          </Link>
        </div>

        {/* Faixa de cards quadrados brancos arredondados (igual à imagem real) */}
        <div className="mt-4 flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-2">
          {SYMPLA_COLLECTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex w-[112px] shrink-0 flex-col items-center gap-2.5"
              >
                <div className="flex h-[88px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-2xs group-hover:border-brand-300 group-hover:text-brand-600 group-hover:shadow-sm transition-all">
                  <Icon className="h-7 w-7 stroke-[1.5]" />
                </div>
                <span className="text-center text-xs font-medium leading-tight text-gray-700 group-hover:text-brand-600 line-clamp-2">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
