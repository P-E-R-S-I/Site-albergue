import type { Metadata } from "next";
import { Suspense } from "react";
import ComoDoarData from "@/components/sections/ComoDoarData";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Como Doar",
  description:
    "Saiba como fazer uma doação para o Albergue São Vicente de Paulo — Pix, itens físicos ou voluntariado.",
  path: "/como-doar",
});

// Lê do estoque real (view_itens_necessarios) a cada requisição.
export const dynamic = "force-dynamic";

function ColunasSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 animate-pulse">
      <div className="space-y-6">
        <div className="h-64 bg-white border border-svp-border rounded-2xl" />
        <div className="h-40 bg-white border border-svp-border rounded-2xl" />
      </div>
      <div className="space-y-6">
        <div className="h-64 bg-white border border-svp-border rounded-2xl" />
        <div className="h-52 bg-svp-forest/20 rounded-2xl" />
      </div>
    </div>
  );
}

// Página não é mais async: o cabeçalho (estático) chega na hora; Pix, dados
// bancários e itens necessários — que dependem do banco — ficam no <Suspense>.
export default function ComoDoarPage() {
  return (
    <div className="bg-svp-cream min-h-screen">
      {/* Cabeçalho da página — estático */}
      <div className="bg-svp-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-svp-sienna/10 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Contribua
            </span>
          </div>
          <h1 className="font-display text-5xl text-svp-cream font-semibold">
            Como <em className="text-svp-sienna">Doar</em>
          </h1>
          <p className="text-svp-cream/60 mt-3 max-w-xl leading-relaxed">
            Escolha a forma que for mais conveniente. Toda doação é registrada
            e publicada no nosso painel de transparência.
          </p>
        </div>
      </div>

      <Suspense fallback={<ColunasSkeleton />}>
        <ComoDoarData />
      </Suspense>
    </div>
  );
}
