import React from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2, QrCode, ShieldCheck, Ticket } from "lucide-react";

const FEATURES = [
  {
    icon: Ticket,
    title: "Publicação grátis",
    desc: "Sem taxa de adesão ou mensalidade. Eventos gratuitos não têm custo algum para produtor nem participante.",
  },
  {
    icon: QrCode,
    title: "Check-in rápido com QR Code",
    desc: "Cada ingresso emitido gera um código único para validação instantânea na entrada do evento.",
  },
  {
    icon: BarChart3,
    title: "Gestão de lotes",
    desc: "Crie múltiplos setores, meia-entrada, lotes promocionais e controle a disponibilidade em tempo real.",
  },
  {
    icon: ShieldCheck,
    title: "Checkout transparente",
    desc: "Reserva garantida por 15 minutos com PIX, cartão de crédito em até 12x e boleto.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="bg-white">
      <section className="bg-brand-950 text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-brand-500/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-100">
            Sympla para Produtores
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold">
            Da publicação à venda: suporte em todas as etapas
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-brand-100">
            Veja como funciona o fluxo de publicação de eventos, cobrança de taxa de serviço e
            experiência de compra neste clone educacional.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/criar-evento"
              className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-400 transition-colors"
            >
              Crie seu evento agora
            </Link>
            <Link
              href="/eventos"
              className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
            >
              Ver eventos publicados
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-extrabold text-gray-900">
                    {f.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-display text-xl font-extrabold text-gray-900">
                Modelo de taxas transparente
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-600" />
                  Eventos gratuitos: R$ 0,00 de taxa.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-600" />
                  Eventos pagos: taxa de serviço de 10% repassada ou absorvida pelo organizador.
                </li>
              </ul>
            </div>
            <Link
              href="/criar-evento"
              className="shrink-0 rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-600 text-center"
            >
              Testar publicação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
