import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: {
    default: "Albergue São Vicente de Paulo",
    template: "%s | Albergue São Vicente de Paulo",
  },
  description:
    "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.",
  keywords: [
    "lar de idosos", "Jataí", "Jataí GO", "São Vicente de Paulo",
    "doação", "idosos", "cuidado", "albergue", "voluntariado", "Goiás",
  ],
  metadataBase: new URL("https://albergue-sao-vicente.netlify.app"),
  openGraph: {
    title: "Albergue São Vicente de Paulo",
    description:
      "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.",
    url: "https://albergue-sao-vicente.netlify.app",
    siteName: "Albergue São Vicente de Paulo",
    images: [
      {
        url: "/foto-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Albergue São Vicente de Paulo — Jataí, GO",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albergue São Vicente de Paulo",
    description:
      "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO.",
    images: ["/foto-hero.jpg"],
  },
  // Favicon declarado explicitamente via metadata.icons apontando para public/
  // (abordagem mais confiável no Netlify — arquivos em public/ chegam sempre no deploy)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
