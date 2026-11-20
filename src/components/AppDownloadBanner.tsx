import React from "react";
import { QrCode, Smartphone } from "lucide-react";

export function AppDownloadBanner() {
  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Smartphone className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-gray-900">
                Compre também pelo App
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Acesse seus ingressos offline, receba alertas de abertura de lotes e entre nos
                eventos direto pelo celular.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
              <QrCode className="h-8 w-8 text-gray-800" />
              <span>
                Aponte a câmera
                <br />
                <strong className="text-gray-900">iOS & Android</strong>
              </span>
            </div>
            <span className="rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white">
              App Store
            </span>
            <span className="rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white">
              Google Play
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
