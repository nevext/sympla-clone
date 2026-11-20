"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Calendar, CheckCircle2, MapPin, QrCode, Ticket, X } from "lucide-react";
import { TicketOrder, useSympla } from "@/context/SymplaContext";
import { formatCurrencyBRL } from "@/lib/format";

function MeusIngressosContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("sucesso") === "1";
  const { orders } = useSympla();
  const [activeOrder, setActiveOrder] = useState<TicketOrder | null>(null);

  return (
    <div className="bg-gray-50 min-h-[75vh] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {isSuccess ? (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-success-500/30 bg-success-50 p-5 text-success-600">
            <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-base font-extrabold text-gray-900">
                Pedido confirmado com sucesso!
              </h2>
              <p className="mt-0.5 text-sm text-gray-700">
                Seus ingressos digitais já estão disponíveis abaixo com QR Code para entrada.
              </p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
              Meus ingressos
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Pedidos realizados e ingressos ativos salvos neste navegador.
            </p>
          </div>
          <Link
            href="/eventos"
            className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
          >
            Explorar mais eventos
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Ticket className="mx-auto h-10 w-10 text-gray-300" />
            <h2 className="mt-3 font-display text-lg font-bold text-gray-900">
              Você ainda não possui ingressos
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Escolha um evento no catálogo e finalize uma reserva para visualizar seu ingresso aqui.
            </p>
            <Link
              href="/eventos"
              className="mt-5 inline-flex rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-bold text-white"
            >
              Buscar eventos
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-bold text-success-600">
                      Confirmado
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Pedido #{order.code}
                    </span>
                  </div>
                  <Link
                    href={`/evento/${order.eventSlug}`}
                    className="block font-display text-lg font-extrabold text-gray-900 hover:text-brand-600"
                  >
                    {order.eventTitle}
                  </Link>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-500" />
                      {order.eventDate}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-500" />
                      {order.eventVenue}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 pt-1">
                    {order.attendees.length}{" "}
                    {order.attendees.length === 1 ? "ingresso" : "ingressos"} · Total:{" "}
                    <strong>
                      {order.total === 0 ? "Grátis" : formatCurrencyBRL(order.total)}
                    </strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveOrder(order)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-500 bg-brand-50 px-5 py-3 text-sm font-bold text-brand-700 hover:bg-brand-100 shrink-0 cursor-pointer"
                >
                  <QrCode className="h-4 w-4" />
                  Ver QR Code e ingressos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal QR Code do Ingresso (Radix Dialog) */}
      <Dialog.Root
        open={Boolean(activeOrder)}
        onOpenChange={(open) => {
          if (!open) setActiveOrder(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-xs" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            {activeOrder ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="font-display text-xl font-extrabold text-gray-900">
                      Ingressos do Pedido #{activeOrder.code}
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-xs text-gray-500">
                      {activeOrder.eventTitle}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Fechar"
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="mt-5 space-y-4">
                  {activeOrder.attendees.map((att, idx) => (
                    <div
                      key={`${att.ticketId}-${idx}`}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase text-brand-600">
                          {att.ticketName}
                        </span>
                        <p className="font-bold text-gray-900 truncate">
                          {att.firstName} {att.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{att.email}</p>
                        <p className="mt-1 font-mono text-[11px] text-gray-600">
                          CODE: {activeOrder.code}-{idx + 1}
                        </p>
                      </div>
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white">
                        <QrCode className="h-14 w-14 text-gray-900" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default function MeusIngressosPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-gray-500">
          Carregando seus ingressos...
        </div>
      }
    >
      <MeusIngressosContent />
    </Suspense>
  );
}
