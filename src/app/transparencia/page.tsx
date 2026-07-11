import type { Metadata } from "next";
import DoacoesChart from "@/components/charts/DoacoesChart";
import GastosChart from "@/components/charts/GastosChart";
import EstoqueChart from "@/components/charts/EstoqueChart";
import RealtimeRefresher from "@/components/RealtimeRefresher";
import {
  getDoacoesMensais,
  getGastosMensais,
  getEstoqueAtual,
  USE_MOCK,
} from "@/lib/supabase";
import { TrendingUp, TrendingDown, BarChart2, RefreshCw } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Transparência",
  description:
    "Acompanhe em tempo real as doações recebidas, os gastos e o nível de estoque do Albergue São Vicente de Paulo.",
  path: "/transparencia",
});

// Cache de 30s — ver comentário em src/app/layout.tsx.
export const revalidate = 30;

const PT_MES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
function mesAtualLabel(): string {
  const d = new Date();
  return `${PT_MES[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`;
}

export default async function TransparenciaPage() {
  const [doacoes, gastos, estoque] = await Promise.all([
    getDoacoesMensais(),
    getGastosMensais(),
    getEstoqueAtual(),
  ]);

  const mesAtual = doacoes[doacoes.length - 1] ?? { valor: 0, itens: 0, mes: mesAtualLabel() };
  const gastoAtual = gastos[gastos.length - 1] ?? {
    mes: mesAtualLabel(),
    alimentacao: 0,
    higiene: 0,
    medicamentos: 0,
    utilidades: 0,
    manutencao: 0,
  };
  const totalGasto =
    gastoAtual.alimentacao + gastoAtual.higiene + gastoAtual.medicamentos +
    gastoAtual.utilidades + gastoAtual.manutencao;
  const saldo = mesAtual.valor - totalGasto;

  const CARDS = [
    {
      icon: <TrendingUp size={20} className="text-svp-forest" />,
      label: `Doações em dinheiro (${mesAtual.mes})`,
      valor: `R$ ${mesAtual.valor.toLocaleString("pt-BR")}`,
      cor: "border-svp-forest/30 bg-svp-forest/5",
      textoValor: "text-svp-forest",
    },
    {
      icon: <TrendingDown size={20} className="text-svp-sienna" />,
      label: `Gastos (${gastoAtual.mes})`,
      valor: `R$ ${totalGasto.toLocaleString("pt-BR")}`,
      cor: "border-svp-sienna/30 bg-svp-sienna/5",
      textoValor: "text-svp-sienna",
    },
    {
      icon: <BarChart2 size={20} className="text-svp-amber" />,
      label: "Saldo do mês",
      valor: `R$ ${saldo.toLocaleString("pt-BR")}`,
      cor: "border-svp-amber/30 bg-svp-amber/5",
      textoValor: "text-svp-amber",
    },
    {
      icon: <RefreshCw size={20} className="text-svp-muted" />,
      label: `Itens recebidos (${mesAtual.mes})`,
      valor: `${mesAtual.itens} itens`,
      cor: "border-svp-border bg-svp-linen",
      textoValor: "text-svp-dark",
    },
  ];

  return (
    <div className="bg-svp-cream min-h-screen">
      <RealtimeRefresher />

      <div className="bg-svp-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-svp-sienna/10 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4" data-animate>
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Prestação de contas
            </span>
          </div>
          <h1 className="font-display text-5xl text-white font-semibold" data-animate data-delay="1">
            <em className="text-white">Transparência</em>
          </h1>
          <p className="text-svp-cream/60 mt-3 max-w-2xl leading-relaxed" data-animate data-delay="2">
            Toda doação recebida e todo gasto realizado são registrados no nosso sistema
            e publicados aqui. Os dados são atualizados pela equipe do Albergue.
          </p>

          {USE_MOCK && (
            <div className="mt-6 inline-flex items-center gap-2 bg-svp-amber/10 border border-svp-amber/30 rounded-lg px-4 py-2.5" data-animate data-delay="3">
              <RefreshCw size={14} className="text-svp-amber" />
              <p className="text-svp-amber text-xs font-medium">
                Dados de demonstração — variáveis NEXT_PUBLIC_SUPABASE_* ausentes ou modo mock ativado.
              </p>
            </div>
          )}
          {!USE_MOCK && (
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/50 rounded-lg px-4 py-2.5" data-animate data-delay="3">
              <RefreshCw size={14} className="text-emerald-400" />
              <p className="text-emerald-400 text-xs font-medium">
                Dados reais — gerados a partir dos registros do sistema interno em tempo real.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CARDS.map((card, i) => (
            <div key={i} className={`border rounded-2xl p-5 ${card.cor}`} data-animate data-delay={String(i % 4)}>
              <div className="mb-3">{card.icon}</div>
              <p className="text-svp-muted text-xs mb-1">{card.label}</p>
              <p className={`font-display text-2xl font-bold ${card.textoValor}`}>
                {card.valor}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div data-animate>
            <DoacoesChart data={doacoes} />
          </div>
          <div data-animate data-delay="1">
            <GastosChart data={gastos} />
          </div>
        </div>

        <div data-animate>
          <EstoqueChart data={estoque} />
        </div>
      </div>
    </div>
  );
}
