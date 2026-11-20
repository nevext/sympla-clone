"use client";

import React, { useMemo } from "react";
import { Flame, Globe2, GraduationCap, Mic, Music, Sparkles } from "lucide-react";
import { useSympla } from "@/context/SymplaContext";
import { SearchLocationBar } from "@/components/SearchLocationBar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CollectionsSection } from "@/components/CollectionsSection";
import { EventShelf } from "@/components/EventShelf";
import { AppDownloadBanner } from "@/components/AppDownloadBanner";
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

  const musicAndParties = useMemo(
    () => events.filter((e) => e.category === "festas-e-shows"),
    [events]
  );

  const theaters = useMemo(
    () => events.filter((e) => e.category === "teatros-e-espetaculos"),
    [events]
  );

  const standUp = useMemo(
    () => events.filter((e) => e.category === "stand-up-comedy"),
    [events]
  );

  const techAndCourses = useMemo(
    () =>
      events.filter(
        (e) =>
          e.category === "cursos-e-workshops" || e.category === "congressos-e-palestras"
      ),
    [events]
  );

  const onlineAndFree = useMemo(
    () => events.filter((e) => e.modality === "online" || e.priceFrom === 0),
    [events]
  );

  return (
    <div>
      <SearchLocationBar />
      <HeroCarousel events={events} />
      <CollectionsSection />

      <EventShelf
        title="Eventos mais comprados nas últimas 24h"
        subtitle={
          selectedCity !== "Qualquer lugar"
            ? `Exibindo destaques para ${selectedCity}`
            : undefined
        }
        href="/eventos/mais-vistos"
        events={mostBought}
        bgClass="bg-white"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-50 text-warning-600">
            <Flame className="h-5 w-5" />
          </span>
        }
      />

      <EventShelf
        title="Festas e Shows"
        href="/eventos/show-musica-festa"
        events={musicAndParties}
        bgClass="bg-gray-50/70"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Music className="h-5 w-5" />
          </span>
        }
      />

      <EventShelf
        title="Teatros e Espetáculos"
        href="/eventos/teatro-espetaculo"
        events={theaters}
        bgClass="bg-white"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Sparkles className="h-5 w-5" />
          </span>
        }
      />

      <EventShelf
        title="Stand Up Comedy"
        href="/eventos/stand-up-comedy"
        events={standUp}
        bgClass="bg-gray-50/70"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-50 text-warning-600">
            <Mic className="h-5 w-5" />
          </span>
        }
      />

      <EventShelf
        title="Congressos, Cursos e Workshops"
        href="/eventos/curso-workshop"
        events={techAndCourses}
        bgClass="bg-white"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <GraduationCap className="h-5 w-5" />
          </span>
        }
      />

      <EventShelf
        title="Eventos Online e Gratuitos"
        href="/eventos/gratis"
        events={onlineAndFree}
        bgClass="bg-gray-50/70"
        icon={
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 text-success-600">
            <Globe2 className="h-5 w-5" />
          </span>
        }
      />

      <AppDownloadBanner />
      <ProducerBanner />

      <div id="faq">
        <FaqSection />
      </div>
    </div>
  );
}
