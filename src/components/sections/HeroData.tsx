import Hero from "@/components/sections/Hero";
import Estatisticas from "@/components/sections/Estatisticas";
import { getInfoAlbergue, getEstatisticas, getDoacoesMensais } from "@/lib/supabase";

// Componente assíncrono isolado: busca os dados do Hero/Estatísticas e
// transmite (stream) essa parte assim que estiver pronta, sem travar o
// resto da página (que não depende do banco) atrás desse fetch.
export default async function HeroData() {
  const [info, stats, doacoesMensais] = await Promise.all([
    getInfoAlbergue(),
    getEstatisticas(),
    getDoacoesMensais(),
  ]);

  // Card "Este mês" do Hero: só usa o valor se a última posição da série for
  // de fato o mês corrente (o fallback de placeholder termina em meses antigos).
  const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const hoje = new Date();
  const mesAtualLabel = `${MESES[hoje.getMonth()]}/${String(hoje.getFullYear()).slice(2)}`;
  const ultima = doacoesMensais[doacoesMensais.length - 1];
  const doacaoMesFmt =
    ultima && ultima.mes === mesAtualLabel && ultima.valor > 0
      ? ultima.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
      : null;

  return (
    <>
      <Hero info={info} stats={stats} doacaoMes={doacaoMesFmt} />
      <Estatisticas stats={stats} />
    </>
  );
}
