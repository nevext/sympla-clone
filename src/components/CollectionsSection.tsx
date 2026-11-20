import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/data/events";

export function CollectionsSection() {
  return (
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900">
            Explore nossas coleções
          </h2>
          <Link
            href="/eventos"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            Ver tudo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {COLLECTIONS.map((col) => {
            const href = col.categoryFilter
              ? `/eventos?categoria=${col.categoryFilter}`
              : `/eventos?colecao=${col.id}`;

            return (
              <Link
                key={col.id}
                href={href}
                className="group relative flex min-h-[144px] flex-col justify-between overflow-hidden rounded-xl p-4 text-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
                style={{
                  background: `linear-gradient(145deg, ${col.gradientFrom} 0%, ${col.gradientTo} 100%)`,
                }}
              >
                <span className="inline-flex w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {col.badge}
                </span>
                <div className="mt-4">
                  <h3 className="font-display text-base font-extrabold leading-tight">
                    {col.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/80 line-clamp-2">{col.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
