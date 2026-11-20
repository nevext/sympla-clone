import React from "react";
import { CATEGORIES, CATEGORY_ROUTE_MAP, CITY_ROUTE_MAP } from "@/data/events";
import { CatalogBrowser } from "@/components/CatalogBrowser";

export default async function EventosFiltroPage({
  params,
}: {
  params: Promise<{ filtro: string }>;
}) {
  const { filtro } = await params;

  const matchedCity = CITY_ROUTE_MAP[filtro];
  const matchedCategory = CATEGORY_ROUTE_MAP[filtro];
  const isMostBought = filtro === "mais-vistos";

  const categoryLabel = CATEGORIES.find((c) => c.slug === matchedCategory)?.label;

  const title = isMostBought
    ? "Eventos mais comprados nas últimas 24h"
    : matchedCity
    ? `Eventos em ${matchedCity}`
    : categoryLabel
    ? categoryLabel
    : "Explorar eventos";

  return (
    <CatalogBrowser
      title={title}
      initialCity={matchedCity ?? "Qualquer lugar"}
      initialCategory={matchedCategory ?? "todas"}
      initialPrice={matchedCategory === "gratis" ? "gratis" : "todos"}
      onlyMostBought={isMostBought}
    />
  );
}
