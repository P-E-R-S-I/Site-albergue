import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const HOME_DESCRIPTION =
  "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.";

export const metadata: Metadata = {
  // buildMetadata() já preenche description, openGraph e twitter completos
  // (ver src/lib/seo.ts para o porquê disso ser necessário).
  ...buildMetadata({
    title: SITE_NAME,
    description: HOME_DESCRIPTION,
    path: "",
  }),
  // Sobrescreve o "title" com o objeto de template, para que as páginas
  // internas (Como Doar, Transparência, FAQ...) recebam automaticamente
  // o sufixo " | Albergue São Vicente de Paulo" na aba do navegador.
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  keywords: [
    "lar de idosos", "Jataí", "Jataí GO", "São Vicente de Paulo",
    "doação", "idosos", "cuidado", "albergue", "voluntariado", "Goiás",
  ],
  metadataBase: new URL(SITE_URL),
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
