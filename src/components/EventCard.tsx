import React from "react";
import Link from "next/link";
import { MapPin, Video } from "lucide-react";
import { SymplaEvent } from "@/data/events";
import { formatCurrencyBRL } from "@/lib/format";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { eventCardRoot } from "@/styles/ui.css";

interface EventCardProps {
  event: SymplaEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/evento/${event.slug}`} className={`${eventCardRoot} group`}>
      <div className="relative">
        <ImagePlaceholder label={event.categoryLabel} />
        {event.ratingLabel ? (
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-gray-900/75 px-2 py-0.5 text-[11px] font-semibold text-white">
            {event.ratingLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
            {event.dateShort}
          </p>
          <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
            {event.title}
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            {event.modality === "online" ? (
              <Video className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            ) : (
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            )}
            <span className="truncate">
              {event.modality === "online"
                ? "Evento Online"
                : `${event.venue.name} · ${event.venue.city}, ${event.venue.state}`}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-gray-500">{event.categoryLabel}</span>
            <span
              className={`font-bold ${
                event.priceFrom === 0 ? "text-success-600" : "text-gray-900"
              }`}
            >
              {event.priceFrom === 0
                ? "Grátis"
                : `A partir de ${formatCurrencyBRL(event.priceFrom)}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
