"use client";

import React, { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { FAQ_ITEMS } from "@/data/events";
import { accordionContent, accordionItem, accordionTrigger } from "@/styles/ui.css";

const PRODUCER_FAQ = [
  {
    id: "p-1",
    question: "Quanto custa publicar um evento na Sympla?",
    answer:
      "Eventos gratuitos não têm nenhuma taxa. Para eventos pagos, aplica-se a taxa de serviço de 10% sobre o valor do ingresso (podendo ser repassada ao comprador ou absorvida pelo produtor).",
  },
  {
    id: "p-2",
    question: "Quando recebo o repasse das vendas?",
    answer:
      "O repasse é programado após a realização do evento, com prazo padrão de até 3 dias úteis na conta cadastrada pelo organizador.",
  },
  {
    id: "p-3",
    question: "Como funciona o check-in na portaria?",
    answer:
      "Todos os ingressos possuem QR Code único que pode ser validado no aplicativo Sympla Organizador ou por lista de participantes.",
  },
];

export default function AjudaPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"compradores" | "produtores">("compradores");

  const items = useMemo(() => {
    const source = tab === "compradores" ? FAQ_ITEMS : PRODUCER_FAQ;
    const q = search.trim().toLowerCase();
    if (!q) return source;
    return source.filter(
      (i) =>
        i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
    );
  }, [tab, search]);

  return (
    <div className="bg-gray-50 min-h-[75vh]">
      <section className="bg-brand-950 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-300">
            <HelpCircle className="h-4 w-4" />
            Central de Ajuda
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold">
            Como podemos ajudar hoje?
          </h1>
          <div className="relative mt-6">
            <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Busque por reembolso, ingresso, certificado, repasse..."
              className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-sm text-gray-900 shadow-lg focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <Tabs.Root value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <Tabs.List className="grid grid-cols-2 gap-2 rounded-xl bg-gray-200/70 p-1">
            <Tabs.Trigger
              value="compradores"
              className="rounded-lg py-2.5 text-sm font-bold text-gray-600 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-xs cursor-pointer"
            >
              Compradores
            </Tabs.Trigger>
            <Tabs.Trigger
              value="produtores"
              className="rounded-lg py-2.5 text-sm font-bold text-gray-600 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-xs cursor-pointer"
            >
              Produtores
            </Tabs.Trigger>
          </Tabs.List>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 shadow-xs">
            {items.length > 0 ? (
              <Accordion.Root type="single" collapsible>
                {items.map((item) => (
                  <Accordion.Item key={item.id} value={item.id} className={accordionItem}>
                    <Accordion.Header>
                      <Accordion.Trigger className={`${accordionTrigger} group`}>
                        <span>{item.question}</span>
                        <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-brand-600" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={accordionContent}>
                      <p className="pb-5 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            ) : (
              <p className="py-10 text-center text-sm text-gray-500">
                Nenhum artigo encontrado para &ldquo;{search}&rdquo;.
              </p>
            )}
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
}
