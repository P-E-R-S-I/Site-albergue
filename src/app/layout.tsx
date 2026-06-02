import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: {
    default: "Albergue São Vicente de Paula",
    template: "%s | Albergue São Vicente de Paula",
  },
  description:
    "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.",
  keywords: ["lar de idosos", "Jataí", "São Vicente de Paula", "doação", "idosos", "cuidado"],
  openGraph: {
    title: "Albergue São Vicente de Paula",
    description: "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-svp-cream">
        {/* Barra de progresso de scroll */}
        <div id="scroll-progress" aria-hidden="true" />
        <ScrollAnimator />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
