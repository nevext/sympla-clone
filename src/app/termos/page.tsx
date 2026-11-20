import React from "react";

export default function TermosPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-display text-3xl font-extrabold text-gray-900">
          Termos de Uso e Políticas
        </h1>
        <p className="text-sm leading-relaxed text-gray-700">
          Esta página reproduz a estrutura informativa de termos e políticas para o ambiente
          educacional do clone da Sympla.
        </p>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-gray-900">
            1. Natureza Educacional e Simulação
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Nenhuma transação financeira real é processada neste site. Os dados inseridos no
            checkout, criação de eventos e login permanecem exclusivamente no armazenamento local
            do seu navegador.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-gray-900">
            2. Política de Cancelamento (Referência CDC)
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Em conformidade com o Art. 49 do Código de Defesa do Consumidor, pedidos podem ser
            cancelados em até 7 dias corridos após a compra, desde que solicitados até 48 horas
            antes do início do evento.
          </p>
        </section>
      </div>
    </div>
  );
}
