"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Sparkles } from "lucide-react";
import { CATEGORIES, CategorySlug, CITIES, SymplaEvent } from "@/data/events";
import { useSympla } from "@/context/SymplaContext";
import { primaryBrandButton } from "@/styles/ui.css";

export default function CriarEventoPage() {
  const router = useRouter();
  const { addCustomEvent } = useSympla();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState<CategorySlug>("cursos-e-workshops");
  const [modality, setModality] = useState<"presencial" | "online">("presencial");
  const [city, setCity] = useState("São Paulo");
  const [stateUf, setStateUf] = useState("SP");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [dateInput, setDateInput] = useState("2026-12-20");
  const [timeInput, setTimeInput] = useState("19:00");
  const [ticketName, setTicketName] = useState("Ingresso Individual");
  const [ticketPrice, setTicketPrice] = useState("50");
  const [description, setDescription] = useState("");
  const [organizerName, setOrganizerName] = useState("Produtor Independente");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Math.max(0, Number(ticketPrice) || 0);
    const fee = numericPrice > 0 ? Number((numericPrice * 0.1).toFixed(2)) : 0;
    const categoryInfo = CATEGORIES.find((c) => c.slug === category);
    const slugBase = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const id = `custom-${Date.now()}`;
    const slug = `${slugBase || "evento"}-${id.slice(-5)}`;

    const newEvent: SymplaEvent = {
      id,
      slug,
      title: title.trim(),
      subtitle: subtitle.trim() || "Evento publicado diretamente na plataforma Sympla Clone",
      category,
      categoryLabel: categoryInfo?.label ?? "Eventos",
      collectionIds: numericPrice === 0 ? ["collection-gratis"] : ["collection-promocoes"],
      modality,
      startDateIso: `${dateInput}T${timeInput}:00`,
      dateShort: `${dateInput.split("-").reverse().join("/")} · ${timeInput}`,
      dateFull: `${dateInput.split("-").reverse().join("/")} às ${timeInput}`,
      timeRange: `${timeInput} em diante`,
      venue: {
        name:
          modality === "online"
            ? "Transmissão Online ao Vivo"
            : venueName.trim() || "Espaço Cultural Central",
        address:
          modality === "online"
            ? "Link enviado após a inscrição"
            : venueAddress.trim() || "Endereço a confirmar",
        city: modality === "online" ? "Online" : city,
        state: modality === "online" ? "BR" : stateUf.toUpperCase().slice(0, 2) || "BR",
      },
      organizer: {
        name: organizerName.trim() || "Produtor Sympla",
        initials: (organizerName.trim().slice(0, 2) || "PS").toUpperCase(),
        eventsCount: 1,
        verified: true,
      },
      priceFrom: numericPrice,
      isMostBought24h: true,
      description: [
        description.trim() ||
          "Evento criado pelo fluxo interativo de publicação do clone educacional da Sympla.",
      ],
      highlights: [
        "Publicado gratuitamente via Criar Evento",
        "Ingressos com emissão instantânea de QR Code",
      ],
      tickets: [
        {
          id: `tkt-${id}`,
          name: ticketName.trim() || "Ingresso Único",
          lotLabel: "1º Lote",
          price: numericPrice,
          fee,
          maxPerOrder: 6,
          available: 100,
          description: "Ingresso cadastrado pelo produtor.",
        },
      ],
      bannerTheme: {
        from: "#007fd6",
        via: "#00497b",
        to: "#012844",
        accent: "#fdb022",
        badgeText: categoryInfo?.shortLabel.toUpperCase() ?? "NOVO EVENTO",
        motif: modality === "online" ? "workshop" : "music",
      },
    };

    addCustomEvent(newEvent);
    router.push(`/evento/${newEvent.slug}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            Área do Produtor
          </span>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            Crie seu evento gratuitamente
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Preencha as informações básicas abaixo para publicar o evento no catálogo local e
            testar a compra de ingressos.
          </p>
        </div>

        <form
          onSubmit={handlePublish}
          className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="space-y-4">
            <h2 className="font-display text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-2">
              1. Informações básicas
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700">
                Nome do evento *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex.: Semana Acadêmica de Engenharia de Software"
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700">
                Subtítulo / chamada curta
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex.: Palestras, minicursos práticos e emissão de certificado"
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategorySlug)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700">
                  Modalidade
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value as "presencial" | "online")}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                >
                  <option value="presencial">Presencial</option>
                  <option value="online">Online</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-2">
              2. Data e local
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700">Data *</label>
                <input
                  type="date"
                  required
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700">
                  Horário de início *
                </label>
                <input
                  type="time"
                  required
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            {modality === "presencial" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700">
                    Cidade
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                  >
                    {CITIES.filter((c) => c !== "Qualquer lugar" && c !== "Online").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700">UF</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={stateUf}
                    onChange={(e) => setStateUf(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700">
                    Nome do espaço
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Auditório Principal"
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase text-gray-700">
                    Endereço completo
                  </label>
                  <input
                    type="text"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Av. Paulista, 1000 - Bela Vista"
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-2">
              3. Ingresso e descrição
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-gray-700">
                  Nome do ingresso *
                </label>
                <input
                  type="text"
                  required
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700">
                  Valor (R$) — 0 = Grátis
                </label>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700">
                Nome do organizador
              </label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700">
                Descrição completa
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva a programação, público-alvo e orientações aos participantes..."
                className="mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`${primaryBrandButton} w-full py-3.5 text-sm inline-flex items-center justify-center gap-2 cursor-pointer`}
          >
            <CalendarPlus className="h-4 w-4" />
            Publicar evento agora
          </button>
        </form>
      </div>
    </div>
  );
}
