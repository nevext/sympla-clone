"use client";

import React, { useMemo, useState } from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, CITIES } from "@/data/events";
import { useSympla } from "@/context/SymplaContext";
import { EventCard } from "@/components/EventCard";

interface CatalogBrowserProps {
  title?: string;
  initialQuery?: string;
  initialCity?: string;
  initialCategory?: string;
  initialCollection?: string;
  initialPrice?: "todos" | "gratis" | "pago";
  onlyMostBought?: boolean;
}

export function CatalogBrowser({
  title = "Encontre os melhores eventos",
  initialQuery = "",
  initialCity = "Qualquer lugar",
  initialCategory = "todas",
  initialCollection = "",
  initialPrice = "todos",
  onlyMostBought = false,
}: CatalogBrowserProps) {
  const { events } = useSympla();

  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);
  const [modality, setModality] = useState<"todas" | "presencial" | "online">("todas");
  const [priceFilter, setPriceFilter] = useState<"todos" | "gratis" | "pago">(initialPrice);
  const [sortBy, setSortBy] = useState<"relevancia" | "menor-preco" | "data">("relevancia");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = events.filter((ev) => {
      if (onlyMostBought && !ev.isMostBought24h) return false;

      if (q) {
        const hit =
          ev.title.toLowerCase().includes(q) ||
          ev.subtitle.toLowerCase().includes(q) ||
          ev.venue.city.toLowerCase().includes(q) ||
          ev.categoryLabel.toLowerCase().includes(q);
        if (!hit) return false;
      }

      if (city !== "Qualquer lugar") {
        if (city === "Online") {
          if (ev.modality !== "online") return false;
        } else if (ev.venue.city.toLowerCase() !== city.toLowerCase()) {
          return false;
        }
      }

      if (category !== "todas") {
        if (category === "gratis") {
          if (ev.priceFrom !== 0) return false;
        } else if (ev.category !== category) {
          return false;
        }
      }

      if (initialCollection && !ev.collectionIds.includes(initialCollection)) {
        return false;
      }

      if (modality !== "todas" && ev.modality !== modality) return false;
      if (priceFilter === "gratis" && ev.priceFrom !== 0) return false;
      if (priceFilter === "pago" && ev.priceFrom === 0) return false;

      return true;
    });

    if (sortBy === "menor-preco") {
      return [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    }
    if (sortBy === "data") {
      return [...list].sort(
        (a, b) => new Date(a.startDateIso).getTime() - new Date(b.startDateIso).getTime()
      );
    }
    return list;
  }, [
    events,
    onlyMostBought,
    query,
    city,
    category,
    initialCollection,
    modality,
    priceFilter,
    sortBy,
  ]);

  const resetFilters = () => {
    setQuery("");
    setCity("Qualquer lugar");
    setCategory("todas");
    setModality("todas");
    setPriceFilter("todos");
    setSortBy("relevancia");
  };

  return (
    <div className="bg-gray-50 min-h-[75vh] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Catálogo Sympla
            </span>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {filtered.length}{" "}
              {filtered.length === 1 ? "evento encontrado" : "eventos encontrados"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            <label htmlFor="sort-select" className="text-xs font-semibold text-gray-600">
              Ordenar por:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 focus:border-brand-500 focus:outline-none"
            >
              <option value="relevancia">Mais relevantes</option>
              <option value="data">Próximas datas</option>
              <option value="menor-preco">Menor preço</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900">
                  <Filter className="h-4 w-4 text-brand-500" />
                  Filtros
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Limpar
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                  Palavra-chave
                </label>
                <div className="relative mt-1.5">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Show, teatro, curso..."
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-9 pr-3 py-2 text-sm focus:border-brand-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                  Cidade
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
                >
                  <option value="todas">Todas as categorias</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                  Modalidade
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      { id: "todas", label: "Todas" },
                      { id: "presencial", label: "Presencial" },
                      { id: "online", label: "Online" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setModality(opt.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        modality === opt.id
                          ? "bg-brand-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wide text-gray-600">
                  Preço
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      { id: "todos", label: "Todos" },
                      { id: "gratis", label: "Gratuitos" },
                      { id: "pago", label: "Pagos" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPriceFilter(opt.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        priceFilter === opt.id
                          ? "bg-brand-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((ev) => (
                  <EventCard key={ev.id} event={ev} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <p className="font-display text-lg font-bold text-gray-900">
                  Nenhum evento encontrado com esses filtros
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Tente remover alguns filtros ou buscar em outra cidade.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600 cursor-pointer"
                >
                  Mostrar todos os eventos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
