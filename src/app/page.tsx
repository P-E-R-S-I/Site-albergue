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
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";

export const metadata: Metadata = {
  title: "Início",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Estatisticas />

      {/* Wave divider */}
      <div className="wave-divider bg-svp-linen" style={{ marginBottom: "-2px" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F6EFE3" />
        </svg>
      </div>

      <Missao />

      <ZoomWordSection />

      <Depoimentos />

      <ComoAjudar />

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
                <span className="text-svp-brown">{PLACEHOLDER_INFO_ALBERGUE.endereco}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-svp-sienna mt-0.5 flex-shrink-0" />
                <span className="text-svp-brown">{PLACEHOLDER_INFO_ALBERGUE.telefone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-svp-sienna mt-0.5 flex-shrink-0" />
                <span className="text-svp-brown">{PLACEHOLDER_INFO_ALBERGUE.horarioVisitas}</span>
              </li>
            </ul>
            <a
              href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-svp-sienna text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-svp-rose transition-colors"
              data-animate data-delay="4"
            >
              Agendar pelo WhatsApp <ArrowRight size={14} />
            </a>
          </div>

          <div
            className="rounded-2xl overflow-hidden border border-svp-border bg-svp-linen h-80 flex items-center justify-center"
            data-animate data-delay="2"
          >
            <div className="text-center text-svp-muted">
              <MapPin size={32} className="mx-auto mb-3 text-svp-sienna/40" />
              <p className="text-sm font-medium">Mapa do Google Maps</p>
              <p className="text-xs mt-1 max-w-[200px] mx-auto">
                Substitua pelo embed real nas instruções do código
              </p>
            </div>
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
