import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Estatisticas from "@/components/sections/Estatisticas";
import Missao from "@/components/sections/Missao";
import Depoimentos from "@/components/sections/Depoimentos";
import ComoAjudar from "@/components/sections/ComoAjudar";
import InstagramCarrossel from "@/components/sections/InstagramCarrossel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getInfoAlbergue, getEstatisticas, getDoacoesMensais } from "@/lib/supabase";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

const OG_IMAGE_HOME = {
  url: "/og-home.jpg",
  width: 1200,
  height: 630,
  alt: "Cuidado, dignidade e esperança — Albergue São Vicente de Paulo",
};

// Cache de 30s — ver comentário em src/app/layout.tsx.
export const revalidate = 30;

export const metadata: Metadata = {
  ...buildMetadata({
    title: SITE_NAME,
    description:
      "Cuidado, dignidade e esperança para idosos em situação de vulnerabilidade em Jataí, GO. Saiba como ajudar e acompanhe nossa transparência.",
    path: "",
    image: OG_IMAGE_HOME,
  }),
  title: "Início",
};

export default async function HomePage() {
  const [info, stats, doacoesMensais] = await Promise.all([
    getInfoAlbergue(),
    getEstatisticas(),
    getDoacoesMensais(),
  ]);

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
      <Missao />
      <Depoimentos />
      <ComoAjudar whatsapp={info.whatsapp} />
      <InstagramCarrossel />

      <section className="bg-svp-cream py-14 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <span className="text-svp-sienna text-[10px] lg:text-xs tracking-[0.2em] uppercase font-bold block mb-2" data-animate>
              Onde estamos
            </span>
            <h2 className="font-display text-[26px] leading-[1.15] md:text-4xl lg:text-5xl text-svp-dark font-bold mb-3 lg:mb-4" data-animate data-delay="1">
              Venha nos conhecer{" "}
              <em className="text-svp-sienna not-italic">pessoalmente.</em>
            </h2>
            <p className="text-svp-brown text-[14.5px] lg:text-base leading-relaxed mb-5" data-animate data-delay="2">
              Estamos localizados em Jataí, GO. Se você está pensando em fazer uma visita
              para trazer doações ou conhecer o Albergue, entre em contato antes para
              confirmar o melhor horário.
            </p>

            <div className="mb-5" data-animate data-delay="3">
              <video
                src="/tour.mp4"
                controls
                preload="none"
                className="rounded-2xl w-full max-w-md border border-svp-border shadow-md"
                poster="/foto-hero.jpg"
              >
                Seu navegador não suporta vídeo HTML5.
              </video>
              <p className="text-svp-muted text-xs mt-2">🎥 Tour pelo Albergue</p>
            </div>

            <a
              href={info.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-svp-dark text-svp-cream font-semibold text-sm px-6 py-3 rounded-xl hover:bg-svp-brown transition-colors w-full sm:w-auto"
              data-animate data-delay="4"
            >
              Agendar pelo WhatsApp <ArrowRight size={14} />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-svp-dark h-64 lg:h-full lg:min-h-[420px]" data-animate data-delay="2">
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

      <section className="bg-svp-sienna py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-display text-[26px] leading-[1.25] md:text-4xl text-white italic mb-3" data-animate>
            Pequenas ações, grande impacto.
          </p>
          <p className="text-white/75 text-[13.5px] lg:text-base mb-6 lg:mb-8 leading-relaxed" data-animate data-delay="1">
            Cada fralda, cada quilo de arroz, cada real doado chega diretamente às mãos
            de quem mais precisa. Nosso painel de transparência garante isso.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-4" data-animate data-delay="2">
            <Link href="/como-doar" className="bg-white text-svp-sienna font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-svp-cream transition-colors">
              Como doar
            </Link>
            <Link href="/transparencia" className="border border-white/45 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:border-white/80 transition-colors">
              Ver transparência <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
