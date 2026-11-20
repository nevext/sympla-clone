import React from "react";

export default function EticaCondutaPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">
        <h1 className="font-display text-3xl font-extrabold text-gray-900">
          Código de Ética e Conduta
        </h1>
        <p className="text-sm leading-relaxed text-gray-700">
          Diretrizes de respeito, acessibilidade, transparência na exibição de taxas e proteção
          aos participantes e produtores de eventos.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
          <li>Transparência integral no valor de ingressos, lotes e taxas de serviço.</li>
          <li>Acessibilidade digital com foco em navegação por teclado e leitores de tela via Radix UI.</li>
          <li>Uso estritamente acadêmico para demonstração de arquitetura frontend moderna.</li>
        </ul>
      </div>
    </div>
  );
}
