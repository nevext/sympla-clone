"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, CheckCircle2 } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/format";

export default function QuantoCustaPage() {
  const [ticketPrice, setTicketPrice] = useState(100);
  const [quantity, setQuantity] = useState(50);
  const [absorbFee, setAbsorbFee] = useState(false);

  const feePerTicket = Number((ticketPrice * 0.1).toFixed(2));
  const buyerPays = absorbFee ? ticketPrice : ticketPrice + feePerTicket;
  const producerReceivesPerTicket = absorbFee ? ticketPrice - feePerTicket : ticketPrice;
  const totalProducer = Math.max(0, producerReceivesPerTicket * quantity);

  return (
    <div className="bg-gray-50 min-h-[75vh] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase text-brand-700">
            Transparência para Produtores
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
            Quanto custa vender na Sympla
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Eventos gratuitos têm taxa zero. Em eventos pagos, a taxa padrão é de 10%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 font-display text-lg font-extrabold text-gray-900">
              <Calculator className="h-5 w-5 text-brand-500" />
              Simulador de repasse
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600">
                Valor do ingresso (R$)
              </label>
              <input
                type="number"
                min={0}
                value={ticketPrice}
                onChange={(e) => setTicketPrice(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600">
                Quantidade estimada de vendas
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={absorbFee}
                onChange={(e) => setAbsorbFee(e.target.checked)}
                className="h-4 w-4 accent-brand-500"
              />
              Absorver a taxa de 10% no valor do ingresso
            </label>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-brand-950 p-6 text-white shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                Resultado estimado
              </p>
              <div className="flex justify-between border-b border-white/10 pb-3 text-sm">
                <span className="text-brand-100">Comprador paga por ingresso</span>
                <strong>{formatCurrencyBRL(buyerPays)}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3 text-sm">
                <span className="text-brand-100">Você recebe por ingresso</span>
                <strong>{formatCurrencyBRL(producerReceivesPerTicket)}</strong>
              </div>
              <div>
                <span className="text-xs text-brand-200">Total líquido estimado</span>
                <p className="font-display text-3xl font-extrabold text-white">
                  {formatCurrencyBRL(totalProducer)}
                </p>
              </div>
            </div>

            <Link
              href="/criar-evento"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-400 transition-colors"
            >
              Publicar evento grátis
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-wrap gap-6 text-sm text-gray-700">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success-600" />
            Sem mensalidade ou taxa de adesão
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success-600" />
            Emissão automática de ingressos e certificados
          </span>
        </div>
      </div>
    </div>
  );
}
