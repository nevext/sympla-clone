"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronDown,
  LogOut,
  MapPin,
  Menu,
  PlusCircle,
  Search,
  Ticket,
  User,
  X,
} from "lucide-react";
import { CITIES } from "@/data/events";
import { useSympla } from "@/context/SymplaContext";
import { SymplaLogo } from "./SymplaLogo";
import { primaryBrandButton } from "@/styles/ui.css";

export function Header() {
  const router = useRouter();
  const { selectedCity, setSelectedCity, events, orders, user, loginDemoUser, logoutUser } =
    useSympla();

  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const searchSuggestions = useMemo(() => {
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedCity !== "Qualquer lugar") params.set("cidade", selectedCity);
    router.push(`/eventos?${params.toString()}`);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = loginName.trim() || "Visitante Sympla";
    const cleanEmail = loginEmail.trim() || "aluno@sympla-clone.edu.br";
    loginDemoUser(cleanName, cleanEmail);
    setAuthOpen(false);
    setLoginName("");
    setLoginEmail("");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo + Seletor de Cidade */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <Link href="/" aria-label="Página inicial Sympla Clone">
            <SymplaLogo />
          </Link>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-brand-300 hover:bg-brand-25 hover:text-brand-700 transition-colors cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-500" />
                <span className="max-w-[125px] truncate">{selectedCity}</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                sideOffset={8}
                className="z-50 max-h-80 w-56 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
              >
                <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Selecione sua localização
                </div>
                {CITIES.map((city) => (
                  <DropdownMenu.Item
                    key={city}
                    onSelect={() => setSelectedCity(city)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm outline-none transition-colors ${
                      selectedCity === city
                        ? "bg-brand-50 font-bold text-brand-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city ? (
                      <span className="h-2 w-2 rounded-full bg-brand-500" />
                    ) : null}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* Barra de Busca Central */}
        <div className="relative flex-1 max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              placeholder="Descubra o que fazer perto de você"
              aria-label="Descubra o que fazer perto de você"
              className="h-10 w-full rounded-full border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all"
            />
          </form>

          {searchFocused && query.trim().length > 0 ? (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
              {searchSuggestions.length > 0 ? (
                <>
                  <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Resultados rápidos
                  </div>
                  {searchSuggestions.map((ev) => (
                    <Link
                      key={ev.id}
                      href={`/evento/${ev.slug}`}
                      className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 hover:bg-brand-25 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">{ev.title}</p>
                        <p className="truncate text-xs text-gray-500">
                          {ev.dateShort} · {ev.venue.city}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-brand-600">Ver</span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onMouseDown={() =>
                      router.push(`/eventos?q=${encodeURIComponent(query.trim())}`)
                    }
                    className="mt-1 w-full rounded-lg border-t border-gray-100 px-2.5 py-2 text-center text-xs font-bold text-brand-600 hover:bg-brand-25 cursor-pointer"
                  >
                    Ver todos os resultados para &ldquo;{query.trim()}&rdquo;
                  </button>
                </>
              ) : (
                <div className="px-3 py-4 text-center text-xs text-gray-500">
                  Nenhum evento encontrado para &ldquo;{query}&rdquo;.{" "}
                  <Link href="/eventos" className="font-semibold text-brand-600 underline">
                    Explorar catálogo
                  </Link>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-2 shrink-0" aria-label="Navegação principal">
          <Link
            href="/criar-evento"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-600 transition-colors"
          >
            <PlusCircle className="h-4 w-4 text-brand-500" />
            Criar evento
          </Link>

          <Link
            href="/meus-ingressos"
            className="relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-600 transition-colors"
          >
            <Ticket className="h-4 w-4 text-gray-500" />
            Meus ingressos
            {orders.length > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[11px] font-bold text-white">
                {orders.length}
              </span>
            ) : null}
          </Link>

          {user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-800 cursor-pointer"
                >
                  <User className="h-4 w-4 text-brand-600" />
                  <span className="max-w-[110px] truncate">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 w-56 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
                >
                  <div className="px-2.5 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/meus-ingressos"
                      className="mt-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none"
                    >
                      <Ticket className="h-4 w-4" />
                      Meus ingressos
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={logoutUser}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-error-600 hover:bg-error-50 outline-none"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da conta
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="rounded-lg border border-brand-500 px-3.5 py-2 text-sm font-bold text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer"
            >
              Acesse sua conta
            </button>
          )}
        </nav>

        {/* Botão Menu Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Abrir menu"
          className="inline-flex lg:hidden items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen ? (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-gray-500">Cidade:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-800"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/eventos"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700"
            >
              Explorar eventos
            </Link>
            <Link
              href="/criar-evento"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700"
            >
              Criar evento
            </Link>
            <Link
              href="/meus-ingressos"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700"
            >
              Meus ingressos ({orders.length})
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthOpen(true);
              }}
              className="rounded-lg bg-brand-500 px-3 py-2 text-center text-sm font-bold text-white"
            >
              {user ? user.name.split(" ")[0] : "Acesse sua conta"}
            </button>
          </div>
        </div>
      ) : null}

      {/* Modal de Login / Cadastro (Radix Dialog) */}
      <Dialog.Root open={authOpen} onOpenChange={setAuthOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-950/50 backdrop-blur-xs" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl border border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="font-display text-xl font-bold text-gray-900">
                  Acesse sua conta Sympla
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-gray-600">
                  Simulação local de conta para salvar seus ingressos e eventos criados.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Fechar"
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleAuthSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="Ex.: Maria Clara Silva"
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="maria@exemplo.com.br"
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <button
                type="submit"
                className={`${primaryBrandButton} w-full py-3 text-sm cursor-pointer`}
              >
                Entrar / Continuar
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
