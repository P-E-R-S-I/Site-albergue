// =============================================
// CLIENTE SUPABASE
// Conecta com o banco da Frente 1 (Núcleo de Dados)
// =============================================
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Exporta o cliente singleton do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =============================================
// FUNÇÕES DE DADOS — descomentar quando a
// API da Frente 1 estiver pronta
// =============================================

// Exemplo: buscar doações mensais do banco real
// export async function getDoacoesMensais() {
//   const { data, error } = await supabase
//     .from("view_doacoes_mensais") // VIEW que a Frente 1 vai criar
//     .select("mes, valor_total, quantidade_itens")
//     .order("mes", { ascending: true })
//     .limit(6);
//   if (error) throw error;
//   return data;
// }

// Exemplo: buscar estoque atual
// export async function getEstoqueAtual() {
//   const { data, error } = await supabase
//     .from("view_estoque_atual") // VIEW da Frente 1
//     .select("item, quantidade, unidade, minimo")
//     .order("quantidade", { ascending: true });
//   if (error) throw error;
//   return data;
// }
