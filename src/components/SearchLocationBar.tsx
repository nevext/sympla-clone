"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { CITIES } from "@/data/events";
import { useSympla } from "@/context/SymplaContext";

export function SearchLocationBar() {
  const router = useRouter();
  const { selectedCity, setSelectedCity, events } = useSympla();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const locationLabel =
    selectedCity === "Qualquer lugar" ? "Todos os lugares" : selectedCity;

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return events
      .filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          ev.categoryLabel.toLowerCase().includes(q) ||
          ev.venue.city.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [events, query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFocused(false);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedCity !== "Qualquer lugar") params.set("cidade", selectedCity);
    router.push(`/eventos?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-5 pb-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        {/* Campo de busca branco com sombra leve */}
        <div className="relative flex-1">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-gray-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 180)}
              placeholder="Buscar experiências"
              aria-label="Buscar experiências"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 shadow-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all"
            />
          </form>

          {focused && query.trim().length > 0 ? (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
              {suggestions.length > 0 ? (
                <>
                  {suggestions.map((ev) => (
                    <Link
                      key={ev.id}
                      href={`/evento/${ev.slug}`}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-brand-25 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {ev.title}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {ev.dateShort} · {ev.venue.city}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-brand-600">
                        Ver
                      </span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onMouseDown={() =>
                      router.push(`/eventos?q=${encodeURIComponent(query.trim())}`)
                    }
                    className="mt-1 w-full rounded-lg border-t border-gray-100 px-3 py-2 text-center text-xs font-bold text-brand-600 hover:bg-brand-25 cursor-pointer"
                  >
                    Ver todos os resultados para &ldquo;{query.trim()}&rdquo;
                  </button>
                </>
              ) : (
                <div className="px-3 py-4 text-center text-xs text-gray-500">
                  Nenhuma experiência encontrada para &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Pílula azul clara "Todos os lugares" */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-50 px-4 text-sm font-semibold text-brand-600 hover:bg-brand-100 transition-colors cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-brand-600" />
              <span>{locationLabel}</span>
              <ChevronDown className="h-4 w-4 text-brand-600" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 max-h-80 w-56 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
            >
              {CITIES.map((city) => {
                const label = city === "Qualquer lugar" ? "Todos os lugares" : city;
                return (
                  <DropdownMenu.Item
                    key={city}
                    onSelect={() => setSelectedCity(city)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-colors ${
                      selectedCity === city
                        ? "bg-brand-50 font-bold text-brand-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{label}</span>
                    {selectedCity === city ? (
                      <span className="h-2 w-2 rounded-full bg-brand-500" />
                    ) : null}
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
