import type { Metadata } from "next";
import { Suspense } from "react";
import HeroData from "@/components/sections/HeroData";
import Missao from "@/components/sections/Missao";
import Depoimentos from "@/components/sections/Depoimentos";
import ComoAjudarData from "@/components/sections/ComoAjudarData";
import InstagramCarrossel from "@/components/sections/InstagramCarrossel";
import LocalizacaoData from "@/components/sections/LocalizacaoData";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  // Usa o nome completo da instituição no título social (og:title/twitter:title) —
  // é isso que aparece no card do WhatsApp/Instagram, então precisa ser
  // autoexplicativo, diferente do título curto da aba do navegador.
  ...buildMetadata({
    title: SITE_NAME,
    description:
      "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.",
    path: "",
  }),
  // Sobrescreve só o título da aba do navegador (não afeta openGraph/twitter acima).
  title: "Início",
};

// Skeleton do Hero — some assim que HeroData resolver.
function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-svp-dark py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="h-5 w-40 bg-white/10 rounded-full" />
            <div className="h-12 w-full bg-white/10 rounded-lg" />
            <div className="h-12 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-44 bg-white/10 rounded-xl" />
              <div className="h-12 w-40 bg-white/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8 -mt-12 lg:-mt-16 mb-8 lg:mb-12">
        <div className="bg-white rounded-2xl shadow-md h-28 lg:h-24" />
      </div>
    </div>
  );
}

// HomePage não é mais async: nada aqui trava esperando o banco. As únicas
// partes que dependem do Supabase (Hero/Estatísticas, ComoAjudar, Localização)
// ficam isoladas em componentes próprios e entram via <Suspense>, então o
// resto da página (que é 100% estático) chega pro navegador imediatamente.
export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroData />
      </Suspense>

      <Missao />

      <Depoimentos />

      <Suspense fallback={<div className="h-40 bg-svp-forest/10 animate-pulse" />}>
        <ComoAjudarData />
      </Suspense>

      <InstagramCarrossel />

      <Suspense fallback={<div className="h-96 bg-svp-cream" />}>
        <LocalizacaoData />
      </Suspense>

      {/* Faixa final de CTA — 100% estática */}
      <section className="bg-svp-sienna py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="font-display text-[26px] leading-[1.25] md:text-4xl text-white italic mb-3"
            data-animate
          >
            Pequenas ações, grande impacto.
          </p>
          <p className="text-white/75 text-[13.5px] lg:text-base mb-6 lg:mb-8 leading-relaxed" data-animate data-delay="1">
            Cada fraldinha, cada quilo de arroz, cada real doado chega diretamente às mãos
            de quem mais precisa. Nosso painel de transparência garante isso.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-4" data-animate data-delay="2">
            <Link
              href="/como-doar"
              className="bg-white text-svp-sienna font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-svp-cream transition-colors"
            >
              Como doar
            </Link>
            <Link
              href="/transparencia"
              className="border border-white/45 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:border-white/80 transition-colors"
            >
              Ver transparência <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
