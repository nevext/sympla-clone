"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { SymplaEvent } from "@/data/events";
import { formatCurrencyBRL } from "@/lib/format";
import { EventCoverArt } from "./EventCoverArt";

interface HeroCarouselProps {
  events: SymplaEvent[];
}

export function HeroCarousel({ events }: HeroCarouselProps) {
  const slides = events.filter((e) => e.isFeaturedHero).slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const current = slides[activeIndex % slides.length];

  const prev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActiveIndex((i) => (i + 1) % slides.length);

  return (
    <section aria-label="Destaques da Sympla" className="bg-gray-50 pt-5 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Arte do banner */}
            <div className="lg:col-span-7">
              <EventCoverArt
                title={current.title}
                theme={current.bannerTheme}
                className="h-full min-h-[240px] lg:min-h-[340px]"
              />
            </div>

            {/* Painel informativo do slide */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white">
              <div>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {current.categoryLabel}
                </span>

                <h1 className="mt-3 font-display text-xl sm:text-2xl font-extrabold leading-snug text-gray-900">
                  {current.title}
                </h1>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{current.subtitle}</p>

                <div className="mt-5 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-500 shrink-0" />
                    <span className="font-semibold">{current.dateFull}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-500 shrink-0" />
                    <span className="truncate">
                      {current.venue.name} — {current.venue.city}, {current.venue.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Ingressos
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">
                    {current.priceFrom === 0
                      ? "Gratuito"
                      : `A partir de ${formatCurrencyBRL(current.priceFrom)}`}
                  </span>
                </div>

                <Link
                  href={`/evento/${current.slug}`}
                  className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
                >
                  Ver ingressos
                </Link>
              </div>
            </div>
          </div>

          {/* Controles laterais */}
          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Slide anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        {/* Dots */}
        {slides.length > 1 ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Ir para destaque ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex ? "w-7 bg-brand-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
