"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { SymplaEvent } from "@/data/events";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface HeroCarouselProps {
  events: SymplaEvent[];
}

export function HeroCarousel({ events }: HeroCarouselProps) {
  const slides = events.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const total = slides.length;
  const current = slides[activeIndex % total];

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  // Calcula deslocamento circular entre -3 e +3 para efeito coverflow empilhado
  const getRelativeOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section aria-label="Eventos em destaque na Sympla" className="bg-white pt-4 pb-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stage do Carrossel Coverflow */}
        <div className="relative mx-auto flex h-[230px] sm:h-[310px] md:h-[360px] w-full max-w-5xl items-center justify-center">
          {slides.map((slide, idx) => {
            const offset = getRelativeOffset(idx);
            const abs = Math.abs(offset);
            if (abs > 3) return null;

            const isCenter = offset === 0;
            const scale = isCenter ? 1 : abs === 1 ? 0.88 : abs === 2 ? 0.77 : 0.67;
            const translateX = offset * 125; // sobreposição progressiva como no print
            const zIndex = 30 - abs * 5;
            const opacity = isCenter ? 1 : abs === 1 ? 0.92 : abs === 2 ? 0.82 : 0.7;

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute w-[84vw] max-w-[540px] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white transition-all duration-300 ease-out ${
                  isCenter ? "cursor-default shadow-2xl" : "cursor-pointer brightness-90 hover:brightness-95"
                }`}
              >
                {isCenter ? (
                  <Link href={`/evento/${slide.slug}`} className="block h-full w-full">
                    <ImagePlaceholder
                      aspect="hero"
                      label={`Banner destaque · ${slide.categoryLabel}`}
                    />
                  </Link>
                ) : (
                  <ImagePlaceholder aspect="hero" label="" />
                )}
              </div>
            );
          })}

          {/* Botões circulares brancos < e > nas bordas do card central */}
          <button
            type="button"
            onClick={prev}
            aria-label="Slide anterior"
            className="absolute left-2 sm:left-[calc(50%-290px)] z-40 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo slide"
            className="absolute right-2 sm:right-[calc(50%-290px)] z-40 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots de paginação */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir para destaque ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? "w-2.5 bg-brand-500"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Título centralizado e metadados abaixo dos dots (igual ao print) */}
        <div className="mt-3 text-center">
          <Link
            href={`/evento/${current.slug}`}
            className="font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-gray-900 hover:text-brand-600 transition-colors"
          >
            {current.title}
          </Link>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              {current.modality === "online"
                ? "Online"
                : `${current.venue.city} - ${current.venue.state}`}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-500" />
              {current.dateShort}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
