import React from "react";
import Link from "next/link";
import { CATEGORIES, CITY_ROUTE_MAP } from "@/data/events";

export default function MapaDoSitePage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-gray-900">Mapa do Site</h1>
          <p className="mt-1 text-sm text-gray-600">
            Todas as páginas, categorias e cidades disponíveis no Sympla Clone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-display text-base font-extrabold text-gray-900">
              Páginas Principais
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-600">
              <li><Link href="/" className="hover:underline">Home (Vitrine)</Link></li>
              <li><Link href="/eventos" className="hover:underline">Explorar eventos</Link></li>
              <li><Link href="/categorias" className="hover:underline">Coleções e categorias</Link></li>
              <li><Link href="/eventos/mais-vistos" className="hover:underline">Mais comprados em 24h</Link></li>
              <li><Link href="/meus-ingressos" className="hover:underline">Meus ingressos</Link></li>
              <li><Link href="/criar-evento" className="hover:underline">Criar evento</Link></li>
              <li><Link href="/meus-eventos" className="hover:underline">Meus eventos (Produtor)</Link></li>
              <li><Link href="/como-funciona" className="hover:underline">Como funciona</Link></li>
              <li><Link href="/quanto-custa" className="hover:underline">Quanto custa</Link></li>
              <li><Link href="/tipos-de-eventos" className="hover:underline">Tipos de eventos</Link></li>
              <li><Link href="/ajuda" className="hover:underline">Central de Ajuda</Link></li>
              <li><Link href="/sobre-sympla" className="hover:underline">Sobre a Sympla</Link></li>
              <li><Link href="/termos" className="hover:underline">Termos e Políticas</Link></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-display text-base font-extrabold text-gray-900">Categorias</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-600">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/eventos/${cat.routeSlug}`} className="hover:underline">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-display text-base font-extrabold text-gray-900">Cidades</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-600">
              {Object.entries(CITY_ROUTE_MAP).map(([slug, label]) => (
                <li key={slug}>
                  <Link href={`/eventos/${slug}`} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
