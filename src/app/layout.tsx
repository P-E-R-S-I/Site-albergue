import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
// Fontes self-hospedadas (arquivos ficam dentro do próprio projeto, sem
// nenhuma requisição externa ao Google Fonts — nem em build nem em runtime).
import "@fontsource-variable/lora/wght.css";
import "@fontsource-variable/lora/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import Header from "@/components/Header";
import HeaderData from "@/components/HeaderData";
import ActionBarMobile from "@/components/ActionBarMobile";
import ActionBarMobileData from "@/components/ActionBarMobileData";
import FooterData from "@/components/FooterData";
import ScrollAnimator from "@/components/ScrollAnimator";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

// Header/Footer exibem contato e horários vindos do banco (site_config) —
// renderiza a cada requisição para refletir edições feitas pelo app na hora.
export const dynamic = "force-dynamic";

const HOME_DESCRIPTION =
  "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.";

export const metadata: Metadata = {
  ...buildMetadata({
    title: SITE_NAME,
    description: HOME_DESCRIPTION,
    path: "",
  }),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  keywords: [
    "lar de idosos", "Jataí", "Jataí GO", "São Vicente de Paulo",
    "doação", "idosos", "cuidado", "albergue", "voluntariado", "Goiás",
  ],
  metadataBase: new URL(SITE_URL),
  // "?v=2" força o navegador a esquecer favicons antigos em cache.
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
};

function FooterSkeleton() {
  return (
    <div className="bg-svp-dark animate-pulse">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 lg:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        <div className="h-24 bg-white/5 rounded-lg" />
        <div className="h-24 bg-white/5 rounded-lg" />
        <div className="h-24 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

// RootLayout não é mais async: nada aqui espera o banco antes de mostrar a
// página. Header, rodapé e barra mobile buscam os próprios dados (Supabase)
// em componentes separados e entram via <Suspense> — o fallback é visualmente
// idêntico (mesmo Header/ActionBarMobile, só com o link do WhatsApp "vazio"
// por uma fração de segundo), então não há flash perceptível de layout.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-svp-cream pb-[68px] lg:pb-0">
        {/* Barra de progresso de scroll */}
        <div id="scroll-progress" aria-hidden="true" />
        <ScrollAnimator />
        <Suspense fallback={<Header whatsapp="#" />}>
          <HeaderData />
        </Suspense>
        <main>{children}</main>
        <Suspense fallback={<FooterSkeleton />}>
          <FooterData />
        </Suspense>
        {/* Barra fixa de ação (mobile) — o pb-[68px] do body reserva o espaço */}
        <Suspense fallback={<ActionBarMobile whatsapp="#" />}>
          <ActionBarMobileData />
        </Suspense>
      </body>
    </html>
  );
}
