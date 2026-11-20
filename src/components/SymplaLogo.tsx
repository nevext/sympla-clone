import React from "react";

interface SymplaLogoProps {
  variant?: "brand" | "white";
  className?: string;
}

export function SymplaLogo({ variant = "brand", className = "" }: SymplaLogoProps) {
  const color = variant === "white" ? "#FFFFFF" : "#0097FF";

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <span
        className="relative font-display text-[26px] font-extrabold tracking-tight leading-none"
        style={{ color }}
      >
        Sympla
        {/* Dois pontos/ondas característicos da marca Sympla sobre o 'a' */}
        <span
          className="absolute -top-1 right-1 flex gap-[3px]"
          aria-hidden="true"
        >
          <span
            className="h-[4px] w-[4px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <span
            className="h-[4px] w-[4px] rounded-full"
            style={{ backgroundColor: color }}
          />
        </span>
      </span>
    </span>
  );
}
