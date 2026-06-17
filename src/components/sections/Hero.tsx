"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax suave no fundo
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-svp-cream">

      {/* Fundo decorativo com parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none parallax-bg"
        aria-hidden="true"
      >
        <div className="absolute -top-20 -right-32 w-[700px] h-[700px] rounded-full bg-svp-sienna/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-svp-forest/5 blur-3xl" />
        <svg
          className="absolute right-0 top-0 h-full w-auto opacity-[0.04]"
          viewBox="0 0 400 900"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          <line x1="50" y1="0" x2="400" y2="900" stroke="#803320" strokeWidth="1" />
          <line x1="130" y1="0" x2="480" y2="900" stroke="#803320" strokeWidth="1" />
          <line x1="220" y1="0" x2="570" y2="900" stroke="#803320" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Coluna esquerda — texto */}
        <div>
          <div
            className="flex items-center gap-3 mb-8"
            style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          >
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Jataí, Goiás · Desde 1971
            </span>
          </div>

          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl text-svp-dark leading-[1.0] font-semibold mb-6"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
          >
            Cuidado,{" "}
            <em className="text-svp-sienna not-italic">dignidade</em>{" "}
            e esperança.
          </h1>

          <p
            className="text-svp-brown text-lg leading-relaxed max-w-lg mb-10"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
          >
            {PLACEHOLDER_INFO_ALBERGUE.missao}
          </p>

          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
          >
            <Link
              href="/como-doar"
              className="flex items-center gap-2 bg-svp-sienna text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-svp-rose transition-colors"
            >
              <Heart size={16} />
              Quero fazer uma doação
            </Link>
            <Link
              href="/transparencia"
              className="flex items-center gap-2 border border-svp-border text-svp-brown font-semibold text-sm px-6 py-3.5 rounded-full hover:border-svp-sienna hover:text-svp-sienna transition-colors"
            >
              Ver transparência
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Vídeo tour do Albergue */}
          <div
            className="mt-10"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
          >
            <video
              src="/tour.mp4"
              controls
              className="rounded-2xl w-full max-w-sm border border-svp-border shadow-md"
              poster="/foto-hero.jpg"
            >
              Seu navegador não suporta vídeo HTML5.
            </video>
            <p className="text-svp-muted text-xs mt-2">🎥 Tour pelo Albergue</p>
          </div>

          {/* Social proof */}
          <div
            className="mt-10 flex items-center gap-4"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both" }}
          >
            <div className="flex -space-x-2">
              {["#803320", "#2D5A27", "#B8892A", "#4A7E43"].map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-svp-cream flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  {["D", "M", "A", "V"][i]}
                </div>
              ))}
            </div>
            <p className="text-svp-muted text-sm leading-tight">
              <strong className="text-svp-dark">78 idosos</strong> recebem<br />
              cuidado todos os dias
            </p>
          </div>
        </div>

        {/* Coluna direita — foto institucional */}
        <div className="relative hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            {/*
              Foto institucional real do Albergue São Vicente de Paulo
            */}
            <div
              className="w-full aspect-[4/5] rounded-3xl overflow-hidden"
              style={{ animation: "fadeIn 1s ease 0.3s both" }}
            >
              <Image
                src="/foto-hero.jpg"
                alt="Voluntários e equipe do Albergue São Vicente de Paulo"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Cards flutuantes */}
            <div
              className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-5 border border-svp-border"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}
            >
              <p className="text-svp-muted text-xs tracking-widest uppercase mb-1">Este mês</p>
              <p className="font-display text-svp-sienna text-3xl font-bold">R$ 4.900</p>
              <p className="text-svp-brown text-xs mt-1">em doações recebidas</p>
            </div>

            <div
              className="absolute -top-4 -right-4 bg-svp-forest text-white rounded-2xl p-4 shadow-xl"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s both" }}
            >
              <p className="text-white/70 text-xs tracking-widest uppercase mb-1">Voluntários</p>
              <p className="font-display text-white text-3xl font-bold">24</p>
              <p className="text-white/70 text-xs mt-1">ativos na comunidade</p>
            </div>
          </div>
        </div>

      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "fadeIn 1s ease 1s both" }}
        aria-hidden="true"
      >
        <span className="text-svp-muted text-[10px] tracking-[0.2em] uppercase">Role para baixo</span>
        <div className="w-px h-8 bg-svp-amber/60 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-svp-amber"
            style={{ animation: "slideDown 1.6s ease infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
