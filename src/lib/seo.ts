import type { Metadata } from "next";

/**
 * Configuração central de SEO / Open Graph do site.
 *
 * IMPORTANTE — por que esse arquivo existe:
 * No Next.js (App Router), se uma página define seu próprio campo
 * `openGraph` (ou `twitter`), esse objeto SUBSTITUI por completo o do
 * layout pai — ele não é mesclado campo a campo. Ou seja: se a página
 * "Como Doar" definisse `openGraph: { description: "..." }` sozinha,
 * os campos `images`, `siteName`, `locale` e `type` herdados do
 * layout.tsx simplesmente desapareceriam do HTML, e o card de
 * compartilhamento (WhatsApp/Instagram) ficaria sem imagem.
 *
 * Por isso, toda página que precisa de um preview social próprio deve
 * usar a função `buildMetadata()` abaixo, que sempre monta o objeto
 * `openGraph`/`twitter` completo, em vez de declarar esses campos
 * manualmente em cada `page.tsx`.
 */

// Domínio real de produção (Netlify). Se um domínio próprio for configurado
// no futuro, atualizar apenas esta constante.
export const SITE_URL = "https://alberguesaovicente.com.br";
export const SITE_NAME = "Albergue São Vicente de Paulo";

// Imagem padrão usada nos cards de compartilhamento (WhatsApp, Instagram,
// Facebook, Twitter/X). Gerada a partir de foto-hero.jpg, recortada para a
// proporção 1200×630 — o tamanho recomendado pelo Open Graph. Usar sempre
// essas dimensões reais aqui; declarar um tamanho que não bate com o
// arquivo de verdade é um dos motivos mais comuns do preview não aparecer.
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Voluntários do Albergue São Vicente de Paulo organizando cestas de doação",
};

interface BuildMetadataParams {
  /** Título da página (ex: "Como Doar"). Vai para a aba do navegador
   * (combinado com o template do layout) e para o og:title. */
  title: string;
  /** Descrição específica da página — aparece no card de compartilhamento. */
  description: string;
  /** Caminho da rota, com barra inicial (ex: "/como-doar"). Vazio para a Home. */
  path?: string;
  /** Permite usar uma imagem diferente da padrão, se a página tiver uma própria. */
  image?: typeof DEFAULT_OG_IMAGE;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
}: BuildMetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = path ? `${title} | ${SITE_NAME}` : title;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [image],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
