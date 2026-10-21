import type { Metadata } from "next";
import "./globals.css";
// Fontes self-hospedadas (arquivos ficam dentro do próprio projeto, sem
// nenhuma requisição externa ao Google Fonts — nem em build nem em runtime).
import "@fontsource-variable/lora/wght.css";
import "@fontsource-variable/lora/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBarMobile from "@/components/ActionBarMobile";
import ChatWidget from "@/components/ChatWidget";
import ScrollAnimator from "@/components/ScrollAnimator";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getInfoAlbergue } from "@/lib/supabase";

// Header/Footer exibem contato e horários vindos do banco (site_config).
// Antes era force-dynamic (buscava tudo de novo a cada requisição — garantia
// 100% atualizado, mas pagava o tempo de rede até o Supabase toda vez).
// Agora a página fica pronta em cache e se atualiza sozinha a cada 30s — os
// visitantes recebem a resposta na hora; só a 1ª visita depois da janela de
// 30s é que espera a busca de novo. Uma edição no app de gestão pode levar
// até 30s pra aparecer no site.
export const revalidate = 30;

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
  // "?v=3" força o navegador a esquecer favicons antigos em cache.
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
        <ChatWidget whatsapp={info.whatsapp} />
      </body>
    </html>
  );
}
