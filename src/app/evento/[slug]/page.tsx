"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Ticket,
  Video,
  X,
} from "lucide-react";
import { useSympla } from "@/context/SymplaContext";
import { formatCurrencyBRL } from "@/lib/format";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { primaryBrandButton, stickyTicketCard } from "@/styles/ui.css";

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { events, setTicketReservation } = useSympla();

  const event = useMemo(
    () => events.find((e) => e.slug === params.slug),
    [events, params.slug]
  );

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold text-gray-900">
          Evento não encontrado
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          O link pode estar incorreto ou o evento foi encerrado.
        </p>
        <Link
          href="/eventos"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-bold text-white"
        >
          Explorar outros eventos
        </Link>
      </div>
    );
  }

  const updateQty = (ticketId: string, delta: number, max: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] ?? 0;
      const next = Math.max(0, Math.min(max, current + delta));
      return { ...prev, [ticketId]: next };
    });
  };

  const totals = event.tickets.reduce(
    (acc, t) => {
      const q = quantities[t.id] ?? 0;
      acc.count += q;
      acc.subtotal += q * t.price;
      acc.fees += q * t.fee;
      return acc;
    },
    { count: 0, subtotal: 0, fees: 0 }
  );

  const grandTotal = totals.subtotal + totals.fees;

  const handleProceedCheckout = () => {
    if (totals.count === 0) return;
    setTicketReservation(event.id, quantities);
    setMobileModalOpen(false);
    router.push("/checkout");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // no-op
    }
  };

  const renderTicketSelector = () => (
    <div className={stickyTicketCard}>
      <div className="bg-brand-950 px-5 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="h-5 w-5 text-brand-300" />
          <span className="font-display text-base font-extrabold">Ingressos</span>
        </div>
        <span className="text-xs font-semibold text-brand-200">
          {event.tickets.length} {event.tickets.length === 1 ? "opção" : "opções"}
        </span>
      </div>

      <div className="divide-y divide-gray-100 p-5">
        {event.tickets.map((ticket) => {
          const qty = quantities[ticket.id] ?? 0;
          return (
            <div key={ticket.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">
                    {ticket.lotLabel}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-gray-900">{ticket.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500">{ticket.description}</p>
                  <p className="mt-2 text-base font-extrabold text-gray-900">
                    {ticket.price === 0 ? (
                      <span className="text-success-600">Grátis</span>
                    ) : (
                      <>
                        {formatCurrencyBRL(ticket.price)}{" "}
                        <span className="text-xs font-normal text-gray-500">
                          (+ {formatCurrencyBRL(ticket.fee)} taxa)
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-1">
                  <button
                    type="button"
                    onClick={() => updateQty(ticket.id, -1, ticket.maxPerOrder)}
                    disabled={qty === 0}
                    aria-label={`Remover ${ticket.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-gray-700 shadow-xs disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-gray-900">{qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(ticket.id, 1, ticket.maxPerOrder)}
                    disabled={qty >= ticket.maxPerOrder}
                    aria-label={`Adicionar ${ticket.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white shadow-xs hover:bg-brand-600 disabled:opacity-40 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 bg-gray-50 p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Subtotal ({totals.count} {totals.count === 1 ? "ingresso" : "ingressos"})</span>
          <span>{formatCurrencyBRL(totals.subtotal)}</span>
        </div>
        {totals.fees > 0 ? (
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Taxa de serviço</span>
            <span>{formatCurrencyBRL(totals.fees)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between border-t border-gray-200 pt-2.5 text-base font-extrabold text-gray-900">
          <span>Total</span>
          <span>{totals.count === 0 ? "R$ 0,00" : formatCurrencyBRL(grandTotal)}</span>
        </div>

        <button
          type="button"
          onClick={handleProceedCheckout}
          disabled={totals.count === 0}
          className={`${primaryBrandButton} w-full py-3.5 text-sm cursor-pointer`}
        >
          {totals.count === 0 ? "Selecione um ingresso" : "Comprar ingressos"}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
          <ShieldCheck className="h-3.5 w-3.5 text-success-600" />
          Compra segura · Cancelamento grátis em até 7 dias
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 pb-24 lg:pb-14">
      {/* Hero Banner Escuro com Arte do Evento */}
      <div className="relative overflow-hidden bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-white mb-5"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para eventos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-white">
                <ImagePlaceholder label={`Imagem do evento · ${event.categoryLabel}`} />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-500/25 px-3 py-1 text-xs font-bold text-brand-100">
                  {event.categoryLabel}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  {event.modality === "online" ? "Evento Online" : "Presencial"}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight">
                {event.title}
              </h1>
              <p className="text-sm sm:text-base text-brand-100">{event.subtitle}</p>

              <div className="space-y-2.5 pt-2 text-sm text-white/90">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-brand-300 shrink-0" />
                  <span>{event.dateFull}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-brand-300 shrink-0" />
                  <span>{event.timeRange}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  {event.modality === "online" ? (
                    <Video className="h-4 w-4 text-brand-300 shrink-0 mt-0.5" />
                  ) : (
                    <MapPin className="h-4 w-4 text-brand-300 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{event.venue.name}</p>
                    <p className="text-xs text-brand-200">
                      {event.venue.address} · {event.venue.city}, {event.venue.state}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {copiedShare ? "Link copiado!" : "Compartilhar evento"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corpo Principal (2 Colunas Desktop) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Descrição, Destaques, Local e Organizador */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="font-display text-xl font-extrabold text-gray-900">
                Descrição do evento
              </h2>
              <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
                {event.description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {event.highlights.length > 0 ? (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    Informações importantes
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {event.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-success-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            {/* Localização */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="font-display text-xl font-extrabold text-gray-900">Local</h2>
              <p className="mt-2 font-semibold text-gray-900">{event.venue.name}</p>
              <p className="text-sm text-gray-600">
                {event.venue.address} — {event.venue.city}, {event.venue.state}
              </p>
              <div className="mt-4 flex h-40 items-center justify-center rounded-xl border border-gray-200 bg-brand-25 text-center p-4">
                <div>
                  <MapPin className="mx-auto h-7 w-7 text-brand-500" />
                  <p className="mt-1.5 text-xs font-semibold text-gray-700">
                    {event.modality === "online"
                      ? "Acesso digital enviado após confirmação da inscrição"
                      : `${event.venue.city}, ${event.venue.state} — Localização verificada`}
                  </p>
                </div>
              </div>
            </section>

            {/* Organizador */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
              <h2 className="font-display text-xl font-extrabold text-gray-900">
                Sobre o produtor
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 font-display text-lg font-extrabold text-brand-800">
                  {event.organizer.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-gray-900">{event.organizer.name}</p>
                    {event.organizer.verified ? (
                      <BadgeCheck className="h-4 w-4 text-brand-500" />
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500">
                    {event.organizer.eventsCount} eventos publicados na plataforma
                  </p>
                </div>
              </div>
            </section>

            {/* Política de Cancelamento */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs text-xs leading-relaxed text-gray-600">
              <strong className="block text-sm text-gray-900 mb-1">
                Política de cancelamento e reembolso
              </strong>
              Cancelamentos de pedidos serão aceitos até 7 dias após a compra, desde que a
              solicitação seja enviada até 48 horas antes do início do evento (Art. 49 do CDC).
            </section>
          </div>

          {/* Coluna Direita: Sticky Ticket Box (Desktop) */}
          <aside className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            {renderTicketSelector()}
          </aside>
        </div>
      </div>

      {/* Barra Fixa Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white px-4 py-3 shadow-2xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] font-semibold text-gray-500">
              {totals.count > 0 ? `${totals.count} selecionado(s)` : "Ingressos"}
            </span>
            <span className="text-base font-extrabold text-gray-900">
              {totals.count > 0
                ? formatCurrencyBRL(grandTotal)
                : event.priceFrom === 0
                ? "Grátis"
                : `A partir de ${formatCurrencyBRL(event.priceFrom)}`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileModalOpen(true)}
            className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-600 cursor-pointer"
          >
            {totals.count > 0 ? "Revisar e comprar" : "Selecionar ingressos"}
          </button>
        </div>
      </div>

      {/* Modal Mobile de Ingressos (Radix Dialog) */}
      <Dialog.Root open={mobileModalOpen} onOpenChange={setMobileModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-950/60" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3">
              <Dialog.Title className="font-display text-lg font-bold text-gray-900">
                Escolha seus ingressos
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Fechar"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            {renderTicketSelector()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
