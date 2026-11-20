import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";

export function ProducerBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-6 py-10 sm:px-10 sm:py-12 text-white shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-100">
                <Sparkles className="h-3.5 w-3.5" />
                para Produtores
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold leading-tight">
                Crie eventos, divulgue e venda ingressos com facilidade
              </h3>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-50">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-300 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Da publicação à venda:</strong> suporte em todas
                    as etapas.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-300 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Publicação grátis:</strong> sem taxa de adesão
                    ou mensalidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/criar-evento"
                className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-400 transition-colors"
              >
                Crie seu evento
              </Link>
              <Link
                href="/como-funciona"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors"
              >
                Veja como funciona
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
