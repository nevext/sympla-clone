"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { BarChart3, CalendarDays, Eye, PlusCircle, Ticket, Users } from "lucide-react";
import { useSympla } from "@/context/SymplaContext";
import { formatCurrencyBRL } from "@/lib/format";

export default function MeusEventosPage() {
  const { events, orders } = useSympla();

  const customEvents = useMemo(
    () => events.filter((e) => e.id.startsWith("custom-")),
    [events]
  );

  const managedEvents = customEvents.length > 0 ? customEvents : events.slice(0, 3);

  const totalTicketsSold = useMemo(
    () => orders.reduce((sum, o) => sum + o.attendees.length, 0) + 148,
    [orders]
  );

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.subtotal, 0) + 16420,
    [orders]
  );

  return (
    <div className="bg-gray-50 min-h-[75vh] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Sympla Organizador (Demo)
            </span>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
              Meus eventos
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Acompanhe vendas, participantes e acesse seus eventos publicados.
            </p>
          </div>
          <Link
            href="/criar-evento"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Criar novo evento
          </Link>
        </div>

        {/* KPIs do Organizador */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-500">
              <span>Eventos ativos</span>
              <CalendarDays className="h-4 w-4 text-brand-500" />
            </div>
            <p className="mt-2 font-display text-2xl font-extrabold text-gray-900">
              {managedEvents.length}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {customEvents.length > 0
                ? `${customEvents.length} criado(s) por você agora`
                : "Exibindo eventos de demonstração"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-500">
              <span>Ingressos emitidos</span>
              <Ticket className="h-4 w-4 text-success-600" />
            </div>
            <p className="mt-2 font-display text-2xl font-extrabold text-gray-900">
              {totalTicketsSold}
            </p>
            <p className="mt-1 text-xs text-success-600 font-semibold">
              Atualizado em tempo real com seus pedidos
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-500">
              <span>Receita líquida (simulada)</span>
              <BarChart3 className="h-4 w-4 text-brand-500" />
            </div>
            <p className="mt-2 font-display text-2xl font-extrabold text-gray-900">
              {formatCurrencyBRL(totalRevenue)}
            </p>
            <p className="mt-1 text-xs text-gray-500">Repasse via PIX ou conta bancária</p>
          </div>
        </div>

        {/* Lista de Eventos */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <h2 className="font-display text-base font-extrabold text-gray-900">
              Eventos gerenciados
            </h2>
            <span className="text-xs text-gray-500 inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              Painel local
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {managedEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-success-50 px-2.5 py-0.5 text-[11px] font-bold text-success-600">
                      Publicado
                    </span>
                    <span className="text-xs text-gray-500">{ev.dateShort}</span>
                  </div>
                  <p className="mt-1 font-display text-base font-bold text-gray-900 truncate">
                    {ev.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ev.venue.name} · {ev.venue.city}, {ev.venue.state}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/evento/${ev.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ver página
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
