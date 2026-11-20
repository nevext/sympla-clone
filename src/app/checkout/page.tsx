"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  Barcode,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Lock,
  QrCode,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { AttendeeInfo, useSympla } from "@/context/SymplaContext";
import { formatCurrencyBRL } from "@/lib/format";
import { primaryBrandButton } from "@/styles/ui.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, events, completeOrder, user } = useSympla();

  const event = useMemo(
    () => (cart ? events.find((e) => e.id === cart.eventId) : undefined),
    [cart, events]
  );

  const selectedItems = useMemo(() => {
    if (!cart || !event) return [];
    return event.tickets
      .filter((t) => (cart.quantities[t.id] ?? 0) > 0)
      .map((t) => ({
        ticket: t,
        quantity: cart.quantities[t.id],
      }));
  }, [cart, event]);

  const initialAttendees = useMemo<AttendeeInfo[]>(() => {
    const list: AttendeeInfo[] = [];
    for (const item of selectedItems) {
      for (let i = 0; i < item.quantity; i++) {
        list.push({
          ticketId: item.ticket.id,
          ticketName: item.ticket.name,
          firstName: "",
          lastName: "",
          email: "",
        });
      }
    }
    return list;
  }, [selectedItems]);

  const [buyerName, setBuyerName] = useState(user?.name ?? "");
  const [buyerEmail, setBuyerEmail] = useState(user?.email ?? "");
  const [buyerCpf, setBuyerCpf] = useState("");
  const [attendees, setAttendees] = useState<AttendeeInfo[]>(initialAttendees);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao" | "boleto">("pix");
  const [installments, setInstallments] = useState("1");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [copiedPix, setCopiedPix] = useState(false);

  useEffect(() => {
    setAttendees(initialAttendees);
  }, [initialAttendees]);

  useEffect(() => {
    if (!cart) return;
    const updateTimer = () => {
      const diff = Math.max(0, Math.floor((cart.reservedUntil - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    updateTimer();
    const id = setInterval(updateTimer, 1000);
    return () => clearInterval(id);
  }, [cart]);

  if (!cart || !event || selectedItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold text-gray-900">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Escolha um evento e selecione pelo menos um ingresso para iniciar a reserva.
        </p>
        <Link
          href="/eventos"
          className="mt-6 inline-flex items-center rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-bold text-white"
        >
          Explorar eventos
        </Link>
      </div>
    );
  }

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.ticket.price * item.quantity,
    0
  );
  const feeTotal = selectedItems.reduce(
    (sum, item) => sum + item.ticket.fee * item.quantity,
    0
  );
  const grandTotal = subtotal + feeTotal;

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const copyBuyerToFirstAttendee = () => {
    const parts = buyerName.trim().split(/\s+/);
    const first = parts[0] ?? "";
    const last = parts.slice(1).join(" ");
    setAttendees((prev) =>
      prev.map((att, idx) =>
        idx === 0
          ? {
              ...att,
              firstName: first || att.firstName,
              lastName: last || att.lastName,
              email: buyerEmail || att.email,
            }
          : att
      )
    );
  };

  const updateAttendee = (index: number, field: keyof AttendeeInfo, value: string) => {
    setAttendees((prev) =>
      prev.map((att, idx) => (idx === index ? { ...att, [field]: value } : att))
    );
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    completeOrder({
      eventId: event.id,
      eventSlug: event.slug,
      eventTitle: event.title,
      eventDate: `${event.dateFull} · ${event.timeRange}`,
      eventVenue: `${event.venue.name} (${event.venue.city}, ${event.venue.state})`,
      paymentMethod: grandTotal === 0 ? "pix" : paymentMethod,
      subtotal,
      feeTotal,
      total: grandTotal,
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
      attendees,
    });
    router.push("/meus-ingressos?sucesso=1");
  };

  const pixCopyCode =
    "00020126580014BR.GOV.BCB.PIX0136sympla-clone-demo-checkout-20265204000053039865802BR5913SYMPLA CLONE6009SAO PAULO62070503***6304A1B2";

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Barra Superior de Reserva */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Link
              href={`/evento/${event.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Alterar ingressos
            </Link>
            <span className="text-gray-300">|</span>
            <p className="text-xs sm:text-sm font-semibold text-brand-900 truncate">
              {event.title}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-brand-700 shadow-xs shrink-0">
            <Clock className="h-4 w-4 text-warning-500" />
            <span>
              Reserva garantida por {mins}:{secs}
            </span>
          </div>
        </div>

        <form onSubmit={handleConfirmPurchase} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Formulários */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* 1. Dados do Comprador */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                  1
                </span>
                <h2 className="font-display text-lg font-extrabold text-gray-900">
                  Dados do comprador
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Ex.: Ana Beatriz Oliveira"
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700">
                    E-mail para receber os ingressos *
                  </label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="ana@email.com"
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-700">
                    CPF *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerCpf}
                    onChange={(e) => setBuyerCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
            </section>

            {/* 2. Informações dos Participantes */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                    2
                  </span>
                  <h2 className="font-display text-lg font-extrabold text-gray-900">
                    Informações dos participantes ({attendees.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={copyBuyerToFirstAttendee}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100 cursor-pointer"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  Usar dados do comprador no 1º ingresso
                </button>
              </div>

              <div className="mt-5 space-y-5">
                {attendees.map((att, idx) => (
                  <div
                    key={`${att.ticketId}-${idx}`}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                      Ingresso #{idx + 1} — {att.ticketName}
                    </p>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        value={att.firstName}
                        onChange={(e) => updateAttendee(idx, "firstName", e.target.value)}
                        placeholder="Nome *"
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={att.lastName}
                        onChange={(e) => updateAttendee(idx, "lastName", e.target.value)}
                        placeholder="Sobrenome *"
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        value={att.email}
                        onChange={(e) => updateAttendee(idx, "email", e.target.value)}
                        placeholder="E-mail do participante *"
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Pagamento (Radix Tabs) */}
            {grandTotal > 0 ? (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                    3
                  </span>
                  <h2 className="font-display text-lg font-extrabold text-gray-900">
                    Forma de pagamento
                  </h2>
                </div>

                <Tabs.Root
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}
                  className="mt-5"
                >
                  <Tabs.List className="grid grid-cols-3 gap-2 rounded-xl bg-gray-100 p-1">
                    <Tabs.Trigger
                      value="pix"
                      className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold text-gray-600 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-xs cursor-pointer"
                    >
                      <QrCode className="h-4 w-4" />
                      PIX
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="cartao"
                      className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold text-gray-600 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-xs cursor-pointer"
                    >
                      <CreditCard className="h-4 w-4" />
                      Cartão
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="boleto"
                      className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold text-gray-600 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-xs cursor-pointer"
                    >
                      <Barcode className="h-4 w-4" />
                      Boleto
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="pix" className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-2">
                        <QrCode className="h-24 w-24 text-gray-900" />
                      </div>
                      <div className="space-y-2 text-center sm:text-left">
                        <span className="inline-block rounded-full bg-success-50 px-2.5 py-0.5 text-[11px] font-bold text-success-600">
                          Aprovação imediata
                        </span>
                        <p className="text-sm font-bold text-gray-900">
                          Pague com PIX via QR Code ou Copia e Cola
                        </p>
                        <p className="text-xs text-gray-600">
                          Ambiente simulado: clique em &ldquo;Finalizar pedido&rdquo; abaixo para
                          gerar seus ingressos imediatamente.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(pixCopyCode);
                            setCopiedPix(true);
                            setTimeout(() => setCopiedPix(false), 2000);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          {copiedPix ? "Código PIX copiado!" : "Copiar código PIX (demo)"}
                        </button>
                      </div>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="cartao" className="mt-5 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700">
                        Número do cartão (simulado)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4000 0000 0000 0000"
                        className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700">
                          Validade
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/30"
                          className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold uppercase text-gray-700">
                          Parcelas
                        </label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                        >
                          {[1, 2, 3, 6, 10, 12].map((n) => (
                            <option key={n} value={n}>
                              {n}x de {formatCurrencyBRL(grandTotal / n)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="boleto" className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
                    <p className="font-bold text-gray-900">Boleto Bancário (Simulação)</p>
                    <p className="mt-1 text-xs text-gray-600">
                      Vencimento em 2 dias úteis. Neste clone educacional, o ingresso é emitido
                      imediatamente para demonstração.
                    </p>
                  </Tabs.Content>
                </Tabs.Root>
              </section>
            ) : (
              <section className="rounded-2xl border border-success-500/30 bg-success-50 p-5 flex items-center gap-3 text-sm text-success-600">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <p className="font-semibold">
                  Pedido gratuito! Nenhum dado de pagamento é necessário para concluir sua
                  inscrição.
                </p>
              </section>
            )}
          </div>

          {/* Coluna Direita: Resumo do Pedido */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
              <div>
                <h3 className="font-display text-lg font-extrabold text-gray-900">
                  Resumo da compra
                </h3>
                <p className="mt-1 text-xs font-semibold text-brand-700">{event.title}</p>
                <p className="text-xs text-gray-500">{event.dateFull}</p>
              </div>

              <div className="divide-y divide-gray-100 border-y border-gray-100 py-3 space-y-2">
                {selectedItems.map(({ ticket, quantity }) => (
                  <div key={ticket.id} className="pt-2 first:pt-0 flex justify-between gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {quantity}x {ticket.name}
                      </p>
                      <p className="text-xs text-gray-500">{ticket.lotLabel}</p>
                    </div>
                    <span className="font-bold text-gray-900 shrink-0">
                      {ticket.price === 0
                        ? "Grátis"
                        : formatCurrencyBRL(ticket.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrencyBRL(subtotal)}</span>
                </div>
                {feeTotal > 0 ? (
                  <div className="flex justify-between text-gray-600">
                    <span>Taxa de serviço</span>
                    <span>{formatCurrencyBRL(feeTotal)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>{grandTotal === 0 ? "Grátis" : formatCurrencyBRL(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`${primaryBrandButton} w-full py-3.5 text-sm inline-flex items-center justify-center gap-2 cursor-pointer`}
              >
                <Lock className="h-4 w-4" />
                Finalizar pedido
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
                <ShieldCheck className="h-4 w-4 text-success-600 shrink-0" />
                Checkout simulado localmente para fins acadêmicos
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
