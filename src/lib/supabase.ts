// =============================================
// CLIENTE SUPABASE + funções de leitura pública
// Conecta com o banco da Frente 1 (Núcleo de Dados)
// =============================================
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY ausentes — caindo no modo placeholder."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Se a env NEXT_PUBLIC_USE_MOCK estiver setada para "true", as funções abaixo
// devolvem dados de placeholder mesmo com Supabase configurado.
export const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" || !supabaseUrl || !supabaseAnonKey;

// ─────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────

export interface ItemEstoque {
  item: string;
  quantidade: number;
  unidade: string;
  categoria: string;
  minimo: number; // heurística no client enquanto Frente 1 não persiste minimo
}

export interface DoacaoMensal {
  mes: string;     // "Abr/26"
  valor: number;   // total em dinheiro
  itens: number;   // total de itens recebidos
}

export interface GastoMensal {
  mes: string;
  alimentacao: number;
  higiene: number;
  medicamentos: number;
  utilidades: number;
  manutencao: number;
}

export interface Faq {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string | null;
}

export interface ItemNecessario {
  item: string;
  urgente: boolean;
}

// Informações institucionais — tabela site_config (chave/valor), editada pelo
// app de gestão. O placeholder é só fallback quando o banco está inacessível.
export interface InfoAlbergue {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  whatsapp: string;
  pixKey: string;
  cnpj: string;
  banco: string;
  agencia: string;
  conta: string;
  titular: string;
  horarioFuncionamento: string;
  horarioVisitas: string;
  horarioDoacoes: string;
  agendamentoVisitas: string;
  restricaoVisitas: string;
  pontosColeta: string;
  missao: string;
  vinculo: string;
}

export interface EstatisticasAlbergue {
  idososAtendidos: number;
  voluntariosAtivos: number;
  anoFundacao: number;
  anosDeServico: number;
  familiasBeneficiadas: number;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const PT_MES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function fmtMesAno(d: Date): string {
  return `${PT_MES[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`;
}

// Converte o `mes` das views (YYYY-MM-DD) para rótulo PT-BR ("Mai/26"),
// sem depender do locale do Postgres (to_char TM devolve mês em inglês).
function mesLabelFromISO(iso: string): string {
  const [ano, mes] = String(iso).split("-");
  return `${PT_MES[Number(mes) - 1] ?? "?"}/${ano.slice(2)}`;
}

function mesKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function ultimosNMeses(n: number): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    out.push({ key: mesKey(d), label: fmtMesAno(d) });
  }
  return out;
}

// ─────────────────────────────────────────────
// Leitura de dados — estoque atual
// ─────────────────────────────────────────────

export async function getEstoqueAtual(): Promise<ItemEstoque[]> {
  const fallback = async (): Promise<ItemEstoque[]> => {
    const { PLACEHOLDER_ESTOQUE } = await import("./dados-placeholder");
    return PLACEHOLDER_ESTOQUE.map((p) => ({
      item: p.item,
      quantidade: p.quantidade,
      unidade: p.unidade,
      categoria: "—",
      minimo: p.minimo,
    }));
  };

  if (USE_MOCK) return fallback();

  const { data, error } = await supabase
    .from("view_estoque_atual")
    .select("item, quantidade_atual, unidade_medida, categoria, quantidade_minima")
    .order("quantidade_atual", { ascending: true });

  if (error || !data) {
    console.warn("[getEstoqueAtual] fallback placeholder:", error?.message);
    return fallback();
  }

  return data.map((row) => ({
    item: row.item ?? "Item",
    quantidade: Number(row.quantidade_atual ?? 0),
    unidade: row.unidade_medida ?? "un",
    categoria: row.categoria ?? "—",
    minimo: Number(row.quantidade_minima ?? 5), // critério definido pelo app (itens.quantidade_minima)
  }));
}

// ─────────────────────────────────────────────
// Leitura — doações mensais (dinheiro)
// Agrega receitas categorizadas como "doacao" em eventos_financeiro
// ─────────────────────────────────────────────

export async function getDoacoesMensais(): Promise<DoacaoMensal[]> {
  if (USE_MOCK) {
    const { PLACEHOLDER_DOACOES_MENSAIS } = await import("./dados-placeholder");
    return PLACEHOLDER_DOACOES_MENSAIS;
  }

  // view_doacoes_mensais agrega receitas (dinheiro) + eventos_estoque tipo='doacao' (itens)
  // dos ultimos 12 meses. Pegamos os 6 mais recentes para o grafico.
  const { data, error } = await supabase
    .from("view_doacoes_mensais")
    .select("mes_label, valor, itens, mes")
    .order("mes", { ascending: true });

  if (error || !data) {
    console.warn("[getDoacoesMensais] fallback placeholder:", error?.message);
    const { PLACEHOLDER_DOACOES_MENSAIS } = await import("./dados-placeholder");
    return PLACEHOLDER_DOACOES_MENSAIS;
  }

  return data.slice(-6).map((r) => ({
    mes: mesLabelFromISO(r.mes),
    valor: Number(r.valor) || 0,
    itens: Number(r.itens) || 0,
  }));
}

// ─────────────────────────────────────────────
// Leitura — gastos mensais por categoria
// Despesas em eventos_financeiro agrupadas por categoria
// ─────────────────────────────────────────────

export async function getGastosMensais(): Promise<GastoMensal[]> {
  if (USE_MOCK) {
    const { PLACEHOLDER_GASTOS_MENSAIS } = await import("./dados-placeholder");
    return PLACEHOLDER_GASTOS_MENSAIS;
  }

  // view_gastos_mensais agrupa despesas dos ultimos 12 meses por categoria.
  const { data, error } = await supabase
    .from("view_gastos_mensais")
    .select("mes_label, mes, alimentacao, higiene, medicamentos, utilidades, manutencao")
    .order("mes", { ascending: true });

  if (error || !data) {
    console.warn("[getGastosMensais] fallback placeholder:", error?.message);
    const { PLACEHOLDER_GASTOS_MENSAIS } = await import("./dados-placeholder");
    return PLACEHOLDER_GASTOS_MENSAIS;
  }

  return data.slice(-6).map((r) => ({
    mes: mesLabelFromISO(r.mes),
    alimentacao: Number(r.alimentacao) || 0,
    higiene: Number(r.higiene) || 0,
    medicamentos: Number(r.medicamentos) || 0,
    utilidades: Number(r.utilidades) || 0,
    manutencao: Number(r.manutencao) || 0,
  }));
}

// ─────────────────────────────────────────────
// Leitura — FAQs
// ─────────────────────────────────────────────

export async function getFaqs(): Promise<Faq[]> {
  if (USE_MOCK) {
    const { PLACEHOLDER_FAQ } = await import("./dados-placeholder");
    return PLACEHOLDER_FAQ.map((f, i) => ({
      id: `mock-${i}`,
      pergunta: f.pergunta,
      resposta: f.resposta,
      categoria: null,
    }));
  }

  const { data, error } = await supabase
    .from("faqs")
    .select("id, pergunta, resposta, categoria")
    .eq("ativo", true)
    .order("ordem", { ascending: true });

  if (error || !data) {
    console.warn("[getFaqs] fallback placeholder:", error?.message);
    const { PLACEHOLDER_FAQ } = await import("./dados-placeholder");
    return PLACEHOLDER_FAQ.map((f, i) => ({
      id: `mock-${i}`,
      pergunta: f.pergunta,
      resposta: f.resposta,
      categoria: null,
    }));
  }

  return data as Faq[];
}

// ─────────────────────────────────────────────
// Leitura — informações institucionais (site_config)
// Ciclo: APP cadastra → site_config → site expõe. cache() deduplica a busca
// entre layout e páginas dentro da mesma requisição.
// ─────────────────────────────────────────────

const getSiteConfigMap = cache(async (): Promise<Record<string, string> | null> => {
  if (USE_MOCK) return null;
  const { data, error } = await supabase.from("site_config").select("chave, valor");
  if (error || !data || data.length === 0) {
    if (error) console.warn("[getSiteConfigMap] fallback placeholder:", error.message);
    return null;
  }
  const map: Record<string, string> = {};
  for (const row of data) map[row.chave] = row.valor ?? "";
  return map;
});

export async function getInfoAlbergue(): Promise<InfoAlbergue> {
  const { PLACEHOLDER_INFO_ALBERGUE: fb } = await import("./dados-placeholder");
  const map = await getSiteConfigMap();
  if (!map) return { ...fb };
  return {
    nome: map.nome || fb.nome,
    endereco: map.endereco || fb.endereco,
    telefone: map.telefone || fb.telefone,
    email: map.email || fb.email,
    whatsapp: map.whatsapp || fb.whatsapp,
    pixKey: map.pix_chave || fb.pixKey,
    cnpj: map.cnpj || fb.cnpj,
    banco: map.banco || fb.banco,
    agencia: map.agencia || fb.agencia,
    conta: map.conta || fb.conta,
    titular: map.titular || fb.titular,
    horarioFuncionamento: map.horario_funcionamento || fb.horarioFuncionamento,
    horarioVisitas: map.horario_visitas || fb.horarioVisitas,
    horarioDoacoes: map.horario_doacoes || fb.horarioDoacoes,
    agendamentoVisitas: map.agendamento_visitas || fb.agendamentoVisitas,
    restricaoVisitas: map.restricao_visitas || fb.restricaoVisitas,
    pontosColeta: map.pontos_coleta || fb.pontosColeta,
    missao: map.missao || fb.missao,
    vinculo: map.vinculo || fb.vinculo,
  };
}

export async function getEstatisticas(): Promise<EstatisticasAlbergue> {
  const { PLACEHOLDER_ESTATISTICAS: fb } = await import("./dados-placeholder");
  const map = await getSiteConfigMap();
  if (!map) {
    return { ...fb, anosDeServico: new Date().getFullYear() - fb.anoFundacao };
  }
  // Inteiro não-negativo — rejeita formatos como "1.971" (Number('1.971') = 1.971)
  // e aceita zero legítimo; qualquer outra coisa cai no valor de fallback.
  const num = (v: string | undefined, def: number) => {
    const n = Number(v);
    return Number.isInteger(n) && n >= 0 ? n : def;
  };
  const anoFundacao = num(map.ano_fundacao, fb.anoFundacao);
  return {
    idososAtendidos: num(map.idosos_residentes, fb.idososAtendidos),
    voluntariosAtivos: num(map.voluntarios_ativos, fb.voluntariosAtivos),
    anoFundacao,
    anosDeServico: new Date().getFullYear() - anoFundacao,
    familiasBeneficiadas: num(map.familias_beneficiadas, fb.familiasBeneficiadas),
  };
}

// ─────────────────────────────────────────────
// Leitura — itens mais necessários (estoque baixo)
// Alimenta a seção "O que mais precisamos" da página /como-doar.
// view_itens_necessarios já filtra quantidade <= 10.
// ─────────────────────────────────────────────

export async function getItensNecessarios(): Promise<ItemNecessario[]> {
  const fallback = async (): Promise<ItemNecessario[]> => {
    const { PLACEHOLDER_ITENS_MAIS_NECESSARIOS } = await import("./dados-placeholder");
    return PLACEHOLDER_ITENS_MAIS_NECESSARIOS;
  };

  if (USE_MOCK) return fallback();

  const { data, error } = await supabase
    .from("view_itens_necessarios")
    .select("item, quantidade, categoria")
    .order("quantidade", { ascending: true })
    .limit(8);

  // Só cai no placeholder em ERRO real. Lista vazia = estoque saudável (boa notícia),
  // não motivo para exibir necessidades falsas.
  if (error || !data) {
    console.warn("[getItensNecessarios] fallback placeholder:", error?.message);
    return fallback();
  }

  return data.map((r) => ({
    item: r.item ?? "Item",
    urgente: Number(r.quantidade ?? 0) <= 5,
  }));
}
