import React from "react";
import Link from "next/link";
import { Building2, GraduationCap, Music, Sparkles, Video } from "lucide-react";

const EVENT_TYPES = [
  {
    icon: Music,
    title: "Festas, Shows e Festivais",
    desc: "Controle de lotes, setores, meia-entrada, Open Bar e check-in rápido para grandes públicos.",
  },
  {
    icon: GraduationCap,
    title: "Cursos, Workshops e Congressos",
    desc: "Formulários personalizados de inscrição, cupons promocionais e emissão automática de certificados.",
  },
  {
    icon: Video,
    title: "Eventos Online e Híbridos",
    desc: "Integração de links de transmissão ao vivo liberados diretamente na área Meus Ingressos.",
  },
  {
    icon: Sparkles,
    title: "Teatro, Cultura e Stand Up",
    desc: "Temporadas recorrentes, sessões em múltiplos horários e divulgação nas coleções da plataforma.",
  },
  {
    icon: Building2,
    title: "Eventos Corporativos e Feiras",
    desc: "Credenciamento ágil, gestão de participantes e relatórios consolidados.",
  },
];

export default function TiposDeEventosPage() {
  return (
    <div className="bg-gray-50 min-h-[75vh] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Soluções por formato
          </span>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-gray-900">
            Tipos de eventos na Sympla
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Do encontro gratuito online ao festival de grande porte, a plataforma se adapta ao seu
            modelo de evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EVENT_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-extrabold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div>
          <Link
            href="/criar-evento"
            className="inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            Criar meu evento agora
          </Link>
        </div>
      </div>
    </div>
  );
}
