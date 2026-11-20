import React from "react";
import { BannerTheme } from "@/data/events";

interface EventCoverArtProps {
  title: string;
  theme: BannerTheme;
  compact?: boolean;
  className?: string;
}

export function EventCoverArt({
  title,
  theme,
  compact = false,
  className = "",
}: EventCoverArtProps) {
  return (
    <div
      className={`relative w-full overflow-hidden aspect-video select-none ${className}`}
      style={{
        background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 55%, ${theme.to} 100%)`,
      }}
    >
      {/* Formas geométricas decorativas */}
      <svg
        viewBox="0 0 640 360"
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="540" cy="60" r="140" fill={theme.accent} opacity="0.35" />
        <circle cx="90" cy="310" r="120" fill="#ffffff" opacity="0.16" />
        <path
          d="M0 280 Q 180 210, 360 270 T 640 220 L 640 360 L 0 360 Z"
          fill="#000000"
          opacity="0.25"
        />
        {theme.motif === "music" || theme.motif === "reveillon" ? (
          <g stroke={theme.accent} strokeWidth="3" fill="none" opacity="0.55">
            <circle cx="500" cy="180" r="55" />
            <circle cx="500" cy="180" r="90" strokeDasharray="8 8" />
          </g>
        ) : null}
        {theme.motif === "tech" || theme.motif === "workshop" ? (
          <g stroke="#ffffff" strokeWidth="1.5" opacity="0.3">
            <line x1="420" y1="0" x2="420" y2="360" />
            <line x1="480" y1="0" x2="480" y2="360" />
            <line x1="540" y1="0" x2="540" y2="360" />
            <line x1="360" y1="120" x2="640" y2="120" />
            <line x1="360" y1="220" x2="640" y2="220" />
          </g>
        ) : null}
      </svg>

      {/* Conteúdo tipográfico da capa */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 text-white">
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: theme.accent,
              color: "#0a0d12",
            }}
          >
            {theme.badgeText}
          </span>
          <span className="rounded-md bg-black/25 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-xs">
            sympla
          </span>
        </div>

        <div className="max-w-[90%]">
          <p
            className={`font-display font-extrabold leading-tight drop-shadow-sm line-clamp-2 ${
              compact ? "text-base md:text-lg" : "text-xl md:text-3xl"
            }`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
