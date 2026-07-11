import DoacoesChart from "@/components/charts/DoacoesChart";
import GastosChart from "@/components/charts/GastosChart";
import EstoqueChart from "@/components/charts/EstoqueChart";
import RealtimeRefresher from "@/components/RealtimeRefresher";
import {
  getDoacoesMensais,
  getGastosMensais,
  getEstoqueAtual,
} from "@/lib/supabase";
import { TrendingUp, TrendingDown, BarChart2, RefreshCw } from "lucide-react";

const PT_MES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
function mesAtualLabel(): string {
  const d = new Date();
  return `${PT_MES[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`;
}

// Toda a parte que depende do banco (cards + gráficos) isolada aqui, pra
// streamar independente do cabeçalho estático da página.
export default async function TransparenciaData() {
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
    <>
      {/* Atualiza a página ao vivo quando o estoque/doações mudam no banco */}
      <RealtimeRefresher />
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
        {/* Cards de resumo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CARDS.map((card, i) => (
            <div key={i} className={`border rounded-2xl p-5 ${card.cor}`}>
              <div className="mb-3">{card.icon}</div>
              <p className="text-svp-muted text-xs mb-1">{card.label}</p>
              <p className={`font-display text-2xl font-bold ${card.textoValor}`}>
                {card.valor}
              </p>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <DoacoesChart data={doacoes} />
          <GastosChart data={gastos} />
        </div>

        <EstoqueChart data={estoque} />
      </div>
    </>
  );
}
