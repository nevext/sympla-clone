import React from "react";

interface SymplaLogoProps {
  variant?: "brand" | "white";
  className?: string;
}

export function SymplaLogo({ variant = "brand", className = "" }: SymplaLogoProps) {
  const fill = variant === "white" ? "#FFFFFF" : "#0097FF";
  const accent = variant === "white" ? "#8ACFFF" : "#012844";

  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill={fill} />
        <path
          d="M21.4 11.4C20.2 10.3 18.4 9.7 16.3 9.7C12.9 9.7 10.5 11.5 10.5 14.1C10.5 16.8 12.8 17.8 15.9 18.4C18.1 18.8 19.2 19.3 19.2 20.5C19.2 21.7 18.0 22.5 16.0 22.5C14.1 22.5 12.4 21.8 11.2 20.6L9.2 23.1C10.8 24.6 13.3 25.5 15.9 25.5C19.8 25.5 22.4 23.5 22.4 20.4C22.4 17.6 20.3 16.3 16.8 15.7C14.6 15.3 13.7 14.8 13.7 13.8C13.7 12.8 14.7 12.2 16.3 12.2C17.8 12.2 19.1 12.7 20.0 13.5L21.4 11.4Z"
          fill={variant === "white" ? "#012844" : "#FFFFFF"}
        />
        <circle cx="24" cy="8" r="2.5" fill={accent} />
      </svg>
      <span
        className="font-display text-[22px] font-extrabold tracking-tight"
        style={{ color: fill }}
      >
        sympla
      </span>
    </span>
  );
}
