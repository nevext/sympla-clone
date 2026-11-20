"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/data/events";
import { accordionContent, accordionItem, accordionTrigger } from "@/styles/ui.css";

export function FaqSection() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
            <HelpCircle className="h-4 w-4" />
            Precisa de ajuda?
          </span>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            Tire suas dúvidas aqui
          </h3>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="mt-8 rounded-2xl border border-gray-200 bg-white px-6 shadow-xs"
        >
          {FAQ_ITEMS.map((item) => (
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
      </div>
    </section>
  );
}
