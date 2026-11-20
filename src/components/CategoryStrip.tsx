import React from "react";
import Link from "next/link";
import {
  Compass,
  GraduationCap,
  Mic,
  Music,
  Presentation,
  Sparkles,
  Ticket,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { CATEGORIES, CategoryItem } from "@/data/events";

const ICON_MAP: Record<CategoryItem["iconName"], React.ReactNode> = {
  Music: <Music className="h-5 w-5" />,
  Theater: <Sparkles className="h-5 w-5" />,
  Mic: <Mic className="h-5 w-5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-5 w-5" />,
  Presentation: <Presentation className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  Compass: <Compass className="h-5 w-5" />,
  Trophy: <Trophy className="h-5 w-5" />,
  Ticket: <Ticket className="h-5 w-5" />,
};

export function CategoryStrip() {
  return (
    <section aria-label="Categorias de eventos" className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/eventos?categoria=${category.slug}`}
              className="group flex shrink-0 flex-col items-center gap-2 rounded-xl px-3 py-2 min-w-[92px] hover:bg-brand-25 transition-colors"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-brand-600 group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                {ICON_MAP[category.iconName]}
              </span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-brand-700 whitespace-nowrap">
                {category.shortLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
