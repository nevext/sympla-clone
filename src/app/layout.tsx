import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import "@/styles/tokens.css";
import { SymplaProvider } from "@/context/SymplaContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpFloatingButton } from "@/components/HelpFloatingButton";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sympla (Clone) - Ingressos para Eventos, Teatros, Shows, Cursos e mais",
  description:
    "Clone educacional do frontend da Sympla desenvolvido com Next.js App Router, Tailwind CSS v4, Vanilla Extract e Radix UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${openSans.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <SymplaProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <HelpFloatingButton />
        </SymplaProvider>
      </body>
    </html>
  );
}
