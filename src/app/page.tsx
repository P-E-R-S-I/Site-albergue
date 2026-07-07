import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Estatisticas from "@/components/sections/Estatisticas";
import Missao from "@/components/sections/Missao";
import ZoomWordSection from "@/components/ZoomWordSection";
import Depoimentos from "@/components/sections/Depoimentos";
import ComoAjudar from "@/components/sections/ComoAjudar";
import InstagramCarrossel from "@/components/sections/InstagramCarrossel";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { getInfoAlbergue, getEstatisticas, getDoacoesMensais } from "@/lib/supabase";
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

export default async function HomePage() {
  const [info, stats, doacoesMensais] = await Promise.all([
    getInfoAlbergue(),
    getEstatisticas(),
    getDoacoesMensais(),
  ]);
  // Card "Este mês" do Hero: só usa o valor se a última posição da série for
  // de fato o mês corrente (o fallback de placeholder termina em meses antigos).
  // Formata aqui (servidor) para evitar divergência de ICU na hidratação.
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

      {/* Wave divider */}
      <div className="wave-divider bg-svp-linen" style={{ marginBottom: "-2px" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F6EFE3" />
        </svg>
      </div>

      <Missao />

      <ZoomWordSection />

      <Depoimentos />

      <ComoAjudar whatsapp={info.whatsapp} />

      <InstagramCarrossel />

      {/* Seção de localização */}
      <section className="bg-svp-cream py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6" data-animate>
              <div className="h-px w-10 bg-svp-amber" />
              <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
                Onde estamos
              </span>
            </div>
            <h2
              className="font-display text-4xl text-svp-dark font-semibold mb-4"
              data-animate data-delay="1"
            >
              Venha nos conhecer{" "}
              <em className="text-svp-sienna">pessoalmente.</em>
            </h2>
            <p className="text-svp-brown leading-relaxed mb-8" data-animate data-delay="2">
              Estamos localizados em Jataí, GO. Se você está pensando em fazer uma visita
              para trazer doações ou conhecer o Albergue, entre em contato antes para
              confirmar o melhor horário.
            </p>
            <ul className="space-y-4 mb-8" data-animate data-delay="3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-svp-sienna mt-0.5 flex-shrink-0" />
                <span className="text-svp-brown">{info.endereco}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-svp-sienna mt-0.5 flex-shrink-0" />
                <span className="text-svp-brown">{info.telefone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-svp-sienna mt-0.5 flex-shrink-0" />
                <span className="text-svp-brown">{info.horarioVisitas}</span>
              </li>
            </ul>
            <a
              href={info.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-svp-sienna text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-svp-rose transition-colors"
              data-animate data-delay="4"
            >
              Agendar pelo WhatsApp <ArrowRight size={14} />
            </a>
          </div>

          <div
            className="rounded-2xl overflow-hidden border border-svp-border h-80"
            data-animate data-delay="2"
          >
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(info.endereco)}&z=16&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Albergue São Vicente de Paulo"
            />
          </div>
        </div>
      </section>

      {/* Faixa final de CTA */}
      <section className="bg-svp-forest py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p
            className="font-display text-3xl md:text-4xl text-white italic mb-4"
            data-animate
          >
            Pequenas ações, grande impacto.
          </p>
          <p className="text-white/70 mb-8 leading-relaxed" data-animate data-delay="1">
            Cada fraldinha, cada quilo de arroz, cada real doado chega diretamente às mãos
            de quem mais precisa. Nosso painel de transparência garante isso.
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-animate data-delay="2">
            <Link
              href="/como-doar"
              className="bg-white text-svp-forest font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-svp-cream transition-colors"
            >
              Como doar
            </Link>
            <Link
              href="/transparencia"
              className="border border-white/40 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:border-white/80 transition-colors"
            >
              Ver transparência <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
