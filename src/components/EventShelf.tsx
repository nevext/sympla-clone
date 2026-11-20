import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SymplaEvent } from "@/data/events";
import { EventCard } from "./EventCard";

interface EventShelfProps {
  title: string;
  subtitle?: string;
  href: string;
  events: SymplaEvent[];
  bgClass?: string;
  icon?: React.ReactNode;
}

export function EventShelf({
  title,
  subtitle,
  href,
  events,
  bgClass = "bg-white",
  icon,
}: EventShelfProps) {
  if (events.length === 0) return null;

  return (
    <section className={`py-9 border-t border-gray-100 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {icon}
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                {title}
              </h2>
              {subtitle ? (
                <p className="text-xs text-gray-500">{subtitle}</p>
              ) : null}
            </div>
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            Ver tudo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.slice(0, 4).map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </section>
  );
}
