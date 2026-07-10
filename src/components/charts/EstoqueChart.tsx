"use client";

import type { ItemEstoque } from "@/lib/supabase";

export default function EstoqueChart({ data }: { data: ItemEstoque[] }) {
  // Ordena por quantidade (menor primeiro = mais urgente)
  const sorted = [...data].sort((a, b) => a.quantidade - b.quantidade);

  return (
    <div className="bg-white rounded-2xl border border-svp-border p-6">
      <p className="text-svp-muted text-xs tracking-[0.18em] uppercase font-semibold mb-1">
        Estoque atual
      </p>
      <p className="font-display text-2xl text-svp-dark font-semibold mb-2">
        Nível dos principais itens
      </p>
      <p className="text-svp-muted text-xs mb-6">
        Vermelho = abaixo do mínimo · Âmbar = abaixo do recomendado
      </p>

      <div className="space-y-3">
        {sorted.map((item) => {
          const recomendado = item.recomendado ?? item.minimo * 2;
          const critico = item.quantidade < item.minimo;
          const atencao = !critico && item.quantidade < recomendado;
          // Classes literais — o JIT do Tailwind não gera nomes interpolados
          const corTexto = critico ? "text-svp-sienna" : atencao ? "text-svp-amber" : "text-svp-forest";
          const corBarra = critico ? "bg-svp-sienna" : atencao ? "bg-svp-amber" : "bg-svp-forest";
          const pct = Math.min((item.quantidade / (item.minimo * 3)) * 100, 100);
          return (
            <div key={item.item}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-svp-dark text-sm font-medium truncate max-w-[60%]">
                  {item.item}
                </span>
                <span className={`text-xs font-semibold ${corTexto}`}>
                  {item.quantidade} {item.unidade}
                </span>
              </div>
              <div className="w-full h-2 bg-svp-linen rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${corBarra}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
