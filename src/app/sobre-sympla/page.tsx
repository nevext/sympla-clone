import React from "react";
import Link from "next/link";

export default function SobreSymplaPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase text-brand-700">
          Sobre o Projeto
        </span>
        <h1 className="font-display text-3xl font-extrabold text-gray-900">
          Sobre a Sympla (Clone Educacional)
        </h1>
        <p className="text-base leading-relaxed text-gray-700">
          A Sympla é a maior plataforma de eventos do Brasil, conectando produtores e participantes
          em shows, teatros, congressos, cursos, gastronomia e experiências online.
        </p>
        <p className="text-base leading-relaxed text-gray-700">
          Este repositório é um <strong>clone educacional completo de frontend</strong>,
          desenvolvido com as mesmas tecnologias identificadas na plataforma real:
          <strong> Next.js (App Router)</strong>, <strong>TypeScript</strong>,{" "}
          <strong>Tailwind CSS v4</strong>, <strong>Vanilla Extract</strong> e{" "}
          <strong>Radix UI</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="font-display text-2xl font-extrabold text-brand-600">12+</p>
            <p className="mt-1 text-xs text-gray-600">Eventos demonstrativos em todo o Brasil</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="font-display text-2xl font-extrabold text-brand-600">15+ rotas</p>
            <p className="mt-1 text-xs text-gray-600">Navegação completa de comprador e produtor</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="font-display text-2xl font-extrabold text-brand-600">100%</p>
            <p className="mt-1 text-xs text-gray-600">Simulação local sem backend externo</p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/eventos"
            className="inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            Explorar eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
