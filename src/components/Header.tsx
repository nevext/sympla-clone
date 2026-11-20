"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CalendarDays,
  LogOut,
  Menu,
  PlusCircle,
  Ticket,
  User,
  X,
} from "lucide-react";
import { useSympla } from "@/context/SymplaContext";
import { SymplaLogo } from "./SymplaLogo";
import { primaryBrandButton } from "@/styles/ui.css";

export function Header() {
  const { orders, user, loginDemoUser, logoutUser } = useSympla();

  const [authOpen, setAuthOpen] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

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
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo Sympla à esquerda */}
        <Link href="/" aria-label="Página inicial Sympla Clone">
          <SymplaLogo />
        </Link>

        {/* Links + Pill de Menu/Conta à direita (idêntico ao layout real) */}
        <div className="flex items-center gap-2 sm:gap-5">
          <nav
            className="hidden md:flex items-center gap-5 text-[13px] font-medium text-gray-600"
            aria-label="Navegação principal"
          >
            <Link
              href="/criar-evento"
              className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              <PlusCircle className="h-4 w-4 text-gray-500" />
              <span>Criar evento</span>
            </Link>

            <Link
              href="/eventos"
              className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span>Meus eventos</span>
            </Link>

            <Link
              href="/meus-ingressos"
              className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              <Ticket className="h-4 w-4 text-gray-500" />
              <span>Meus ingressos</span>
              {orders.length > 0 ? (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {orders.length}
                </span>
              ) : null}
            </Link>
          </nav>

          {/* Pílula arredondada com hambúrguer + avatar */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                aria-label="Menu da conta"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-2.5 py-1.5 text-gray-600 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <Menu className="h-4 w-4 text-gray-600" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-500">
                  <User className="h-3.5 w-3.5" />
                </span>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 w-60 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl"
              >
                {user ? (
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                ) : (
                  <DropdownMenu.Item
                    onSelect={() => setAuthOpen(true)}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm font-bold text-brand-600 hover:bg-brand-50 outline-none"
                  >
                    Acesse sua conta / Cadastre-se
                  </DropdownMenu.Item>
                )}

                <DropdownMenu.Item asChild>
                  <Link
                    href="/eventos"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none"
                  >
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    Explorar eventos
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <Link
                    href="/meus-ingressos"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-gray-500" />
                      Meus ingressos
                    </span>
                    {orders.length > 0 ? (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                        {orders.length}
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <Link
                    href="/criar-evento"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 outline-none"
                  >
                    <PlusCircle className="h-4 w-4 text-gray-500" />
                    Criar evento
                  </Link>
                </DropdownMenu.Item>

                {user ? (
                  <DropdownMenu.Item
                    onSelect={logoutUser}
                    className="mt-1 border-t border-gray-100 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-error-600 hover:bg-error-50 outline-none"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da conta
                  </DropdownMenu.Item>
                ) : null}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

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
