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
  keywords: [
    "lar de idosos", "Jataí", "Jataí GO", "São Vicente de Paula",
    "doação", "idosos", "cuidado", "albergue", "voluntariado", "Goiás",
  ],
  metadataBase: new URL("https://albergue-sao-vicente.netlify.app"),
  openGraph: {
    title: "Albergue São Vicente de Paula",
    description:
      "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.",
    url: "https://albergue-sao-vicente.netlify.app",
    siteName: "Albergue São Vicente de Paula",
    images: [
      {
        url: "/foto-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Albergue São Vicente de Paula — Jataí, GO",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albergue São Vicente de Paula",
    description:
      "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO.",
    images: ["/foto-hero.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
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
