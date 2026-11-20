"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Globe2 } from "lucide-react";
import { useSympla } from "@/context/SymplaContext";
import { CategoryStrip } from "@/components/CategoryStrip";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CollectionsSection } from "@/components/CollectionsSection";
import { EventCard } from "@/components/EventCard";
import { ProducerBanner } from "@/components/ProducerBanner";
import { FaqSection } from "@/components/FaqSection";

export default function HomePage() {
  const { events, selectedCity } = useSympla();

  const cityFiltered = useMemo(() => {
    if (selectedCity === "Qualquer lugar") return events;
    const matches = events.filter(
      (ev) =>
        ev.venue.city.toLowerCase() === selectedCity.toLowerCase() ||
        (selectedCity === "Online" && ev.modality === "online")
    );
    return matches.length > 0 ? matches : events;
  }, [events, selectedCity]);

  const mostBought = useMemo(() => {
    const highlighted = cityFiltered.filter((e) => e.isMostBought24h);
    return highlighted.length > 0 ? highlighted : cityFiltered.slice(0, 4);
  }, [cityFiltered]);

  const onlineAndFree = useMemo(
    () => events.filter((e) => e.modality === "online" || e.priceFrom === 0),
    [events]
  );

  return (
    <div>
      <CategoryStrip />
      <HeroCarousel events={events} />
      <CollectionsSection />

      {/* Eventos mais comprados nas últimas 24h */}
      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-50 text-warning-600">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900">
                  Eventos mais comprados nas últimas 24h
                </h2>
                {selectedCity !== "Qualquer lugar" ? (
                  <p className="text-xs text-gray-500">
                    Exibindo destaques para{" "}
                    <strong className="text-brand-700">{selectedCity}</strong>
                  </p>
                ) : null}
              </div>
            </div>

            <Link
              href="/eventos"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              Ver tudo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mostBought.slice(0, 8).map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      </section>

      {/* Eventos Online e Gratuitos */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Globe2 className="h-5 w-5" />
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900">
                Eventos Online e Gratuitos
              </h2>
            </div>
            <Link
              href="/eventos?preco=gratis"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              Ver tudo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {onlineAndFree.slice(0, 4).map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      </section>

      <ProducerBanner />

      <div id="faq">
        <FaqSection />
      </div>
    </div>
  );
}
