import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, COLLECTIONS } from "@/data/events";

export default function CategoriasPage() {
  return (
    <div className="bg-gray-50 min-h-[75vh] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Descubra por tema
          </span>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            Todas as categorias e coleções
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Escolha um segmento para explorar eventos presenciais e online em todo o Brasil.
          </p>
        </div>

        <section>
          <h2 className="font-display text-lg font-extrabold text-gray-900 mb-4">
            Coleções em destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={
                  col.categoryFilter
                    ? `/eventos?categoria=${col.categoryFilter}`
                    : `/eventos?colecao=${col.id}`
                }
                className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div>
                  <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
                    {col.badge}
                  </span>
                  <h3 className="mt-2 font-display text-base font-extrabold text-gray-900 group-hover:text-brand-600">
                    {col.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">{col.subtitle}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-600 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-extrabold text-gray-900 mb-4">
            Categorias oficiais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/eventos/${cat.routeSlug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 font-display text-sm font-bold text-gray-800 hover:border-brand-300 hover:text-brand-600 transition-colors"
              >
                <span>{cat.label}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
