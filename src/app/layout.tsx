import type { Metadata } from "next";
import "./globals.css";
// Fontes self-hospedadas (arquivos ficam dentro do próprio projeto, sem
// nenhuma requisição externa ao Google Fonts — nem em build nem em runtime).
// Isso elimina a cadeia de requisições bloqueante que causava o lag.
import "@fontsource-variable/lora/wght.css";
import "@fontsource-variable/lora/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBarMobile from "@/components/ActionBarMobile";
import ScrollAnimator from "@/components/ScrollAnimator";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getInfoAlbergue } from "@/lib/supabase";

// Header/Footer exibem contato e horários vindos do banco (site_config) —
// renderiza a cada requisição para refletir edições feitas pelo app na hora.
export const dynamic = "force-dynamic";

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
  // (abordagem mais confiável no Netlify — arquivos em public/ chegam sempre no deploy).
  // O "?v=2" força o navegador a tratar como um arquivo novo — favicon é o recurso
  // mais teimoso pra cache do navegador, ignora até header de cache-control às vezes.
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const info = await getInfoAlbergue();
  return (
    <html lang="pt-BR">
      <body className="bg-svp-cream pb-[68px] lg:pb-0">
        {/* Barra de progresso de scroll */}
        <div id="scroll-progress" aria-hidden="true" />
        <ScrollAnimator />
        <Header whatsapp={info.whatsapp} />
        <main>{children}</main>
        <Footer info={info} />
        {/* Barra fixa de ação (mobile) — o pb-[68px] do body reserva o espaço */}
        <ActionBarMobile whatsapp={info.whatsapp} />
      </body>
    </html>
  );
}
