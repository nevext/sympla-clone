import React from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export function HelpFloatingButton() {
  return (
    <Link
      href="/#faq"
      aria-label="Ajuda"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#3ecf6e] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-gray-950 shadow-lg hover:bg-[#34ba62] transition-colors"
    >
      <HelpCircle className="h-4 w-4" />
      <span>AJUDA</span>
    </Link>
  );
}
