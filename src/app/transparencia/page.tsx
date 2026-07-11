import type { Metadata } from "next";
import { Suspense } from "react";
import TransparenciaData from "@/components/sections/TransparenciaData";
import { USE_MOCK } from "@/lib/supabase";
import { RefreshCw } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Transparência",
  description:
    "Acompanhe em tempo real as doações recebidas, os gastos e o nível de estoque do Albergue São Vicente de Paulo.",
  path: "/transparencia",
});

// Renderização sob demanda (não cacheia) para sempre refletir o banco
export const dynamic = "force-dynamic";

function GraficosSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-svp-linen rounded-2xl" />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="h-80 bg-white border border-svp-border rounded-2xl" />
        <div className="h-80 bg-white border border-svp-border rounded-2xl" />
      </div>
      <div className="h-64 bg-white border border-svp-border rounded-2xl" />
    </div>
  );
}

// Página não é mais async: o cabeçalho (100% estático) chega na hora; só os
// cards/gráficos — que dependem do banco — ficam atrás do <Suspense>.
export default function TransparenciaPage() {
  return (
    <div className="bg-svp-cream min-h-screen">
      {/* Cabeçalho — estático, nada aqui espera o banco */}
      <div className="bg-svp-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-svp-sienna/10 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Prestação de contas
            </span>
          </div>
          <h1 className="font-display text-5xl text-white font-semibold">
            <em className="text-white">Transparência</em>
          </h1>
          <p className="text-svp-cream/60 mt-3 max-w-2xl leading-relaxed">
            Toda doação recebida e todo gasto realizado são registrados no nosso sistema
            e publicados aqui. Os dados são atualizados pela equipe do Albergue.
          </p>

          {USE_MOCK && (
            <div className="mt-6 inline-flex items-center gap-2 bg-svp-amber/10 border border-svp-amber/30 rounded-lg px-4 py-2.5">
              <RefreshCw size={14} className="text-svp-amber" />
              <p className="text-svp-amber text-xs font-medium">
                Dados de demonstração — variáveis NEXT_PUBLIC_SUPABASE_* ausentes ou modo mock ativado.
              </p>
            </div>
          )}
          {!USE_MOCK && (
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/50 rounded-lg px-4 py-2.5">
              <RefreshCw size={14} className="text-emerald-400" />
              <p className="text-emerald-400 text-xs font-medium">
                Dados reais — gerados a partir dos registros do sistema interno em tempo real.
              </p>
            </div>
          )}
        </div>
      </div>

      <Suspense fallback={<GraficosSkeleton />}>
        <TransparenciaData />
      </Suspense>
    </div>
  );
}
