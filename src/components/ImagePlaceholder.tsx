import React from "react";
import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label?: string;
  aspect?: "video" | "hero";
  className?: string;
}

export function ImagePlaceholder({
  label = "Imagem do evento",
  aspect = "video",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-gray-100 border border-gray-200/80 text-gray-400 select-none ${
        aspect === "hero" ? "h-full w-full" : "aspect-video"
      } ${className}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#d5d7da 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 border border-gray-200 shadow-2xs text-gray-400">
          <ImageIcon className="h-6 w-6" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>
    </div>
  );
}
