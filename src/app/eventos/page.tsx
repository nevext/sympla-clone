"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CatalogBrowser } from "@/components/CatalogBrowser";

function EventosContent() {
  const searchParams = useSearchParams();
  return (
    <CatalogBrowser
      initialQuery={searchParams.get("q") ?? ""}
      initialCity={searchParams.get("cidade") ?? "Qualquer lugar"}
      initialCategory={searchParams.get("categoria") ?? "todas"}
      initialCollection={searchParams.get("colecao") ?? ""}
      initialPrice={searchParams.get("preco") === "gratis" ? "gratis" : "todos"}
    />
  );
}

export default function EventosPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-gray-500">
          Carregando catálogo de eventos...
        </div>
      }
    >
      <EventosContent />
    </Suspense>
  );
}
