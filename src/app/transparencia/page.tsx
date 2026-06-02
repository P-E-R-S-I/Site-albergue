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

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "Acompanhe em tempo real as doações recebidas, os gastos e o nível de estoque do Albergue São Vicente de Paula.",
};

// Renderização sob demanda (não cacheia) para sempre refletir o banco
export const dynamic = "force-dynamic";

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
      {/* Atualiza a página ao vivo quando o estoque/doações mudam no banco */}
      <RealtimeRefresher />
      {/* Cabeçalho */}
      <div className="bg-svp-linen border-b border-svp-border py-16">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Prestação de contas
            </span>
          </div>
          <h1 className="font-display text-5xl text-svp-dark font-semibold">
            <em className="text-svp-sienna">Transparência</em>
          </h1>
          <p className="text-svp-brown mt-3 max-w-2xl leading-relaxed">
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
            <div className="mt-6 inline-flex items-center gap-2 bg-svp-forest/10 border border-svp-forest/30 rounded-lg px-4 py-2.5">
              <RefreshCw size={14} className="text-svp-forest" />
              <p className="text-svp-forest text-xs font-medium">
                Dados reais — gerados a partir dos registros do sistema interno em tempo real.
              </p>
            </div>
          )}
        </div>
      </div>

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

        {/* Nota de transparência */}
        <div className="mt-10 bg-svp-linen border border-svp-border rounded-2xl p-7">
          <h3 className="font-display text-2xl text-svp-dark font-semibold mb-3">
            Como funciona o registro?
          </h3>
          <p className="text-svp-brown text-sm leading-relaxed mb-3">
            Utilizamos um sistema de <strong>banco de dados ledger</strong> — cada doação
            que entra e cada produto que sai é registrado como um evento individual com
            data, hora, quantidade e responsável pelo lançamento. Isso garante auditoria
            completa e impossibilita alteração retroativa dos dados.
          </p>
          <p className="text-svp-brown text-sm leading-relaxed">
            Os gráficos acima são gerados automaticamente a partir desses registros,
            sem intervenção manual. Qualquer pessoa pode acompanhar o uso das doações
            em tempo real.
          </p>
        </div>
      </div>
    </div>
  );
}
