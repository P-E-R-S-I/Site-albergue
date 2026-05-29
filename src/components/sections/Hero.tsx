import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-svp-cream">

      {/* Fundo decorativo — gradiente quente */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Mancha de cor quente no canto superior direito */}
        <div className="absolute -top-20 -right-32 w-[600px] h-[600px] rounded-full bg-svp-sienna/8 blur-3xl" />
        {/* Verde no canto inferior esquerdo */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-svp-forest/8 blur-3xl" />
        {/* Linha diagonal decorativa */}
        <svg
          className="absolute right-0 top-0 h-full w-auto opacity-5"
          viewBox="0 0 400 900"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          <line x1="50" y1="0" x2="400" y2="900" stroke="#803320" strokeWidth="1" />
          <line x1="120" y1="0" x2="470" y2="900" stroke="#803320" strokeWidth="1" />
          <line x1="200" y1="0" x2="550" y2="900" stroke="#803320" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Coluna esquerda — texto */}
        <div>
          {/* Ornamento / tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Jataí, Goiás · Desde 2014
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-svp-dark leading-[1.0] font-semibold mb-6">
            Cuidado,{" "}
            <em className="text-svp-sienna not-italic">dignidade</em>{" "}
            e esperança.
          </h1>

          <p className="text-svp-brown text-lg leading-relaxed max-w-lg mb-10">
            {PLACEHOLDER_INFO_ALBERGUE.missao}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
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

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-4">
            {/* Avatares placeholder */}
            <div className="flex -space-x-2">
              {["#803320","#2D5A27","#B8892A","#4A7E43"].map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-svp-cream flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  {["D","M","A","V"][i]}
                </div>
              ))}
            </div>
            <p className="text-svp-muted text-sm leading-tight">
              <strong className="text-svp-dark">80+ idosos</strong> recebem<br />
              cuidado todos os dias
            </p>
          </div>
        </div>

        {/* Coluna direita — card flutuante */}
        <div className="relative hidden lg:flex justify-center">

          {/* Card principal — placeholder de imagem */}
          <div className="relative w-full max-w-md">
            <div
              className="w-full aspect-[4/5] rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #D4B896 0%, #A87A5A 40%, #6B3E26 100%)",
              }}
            >
              {/* Ícone central decorativo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/30">
                <svg viewBox="0 0 80 80" className="w-24 h-24" fill="none">
                  <path d="M8 36L40 10L72 36V72H52V52H28V72H8V36Z"
                    stroke="white" strokeWidth="3" strokeLinejoin="round" />
                  <rect x="36" y="22" width="8" height="22" rx="2" fill="white" fillOpacity="0.6"/>
                  <rect x="26" y="31" width="28" height="8" rx="2" fill="white" fillOpacity="0.6"/>
                </svg>
                <p className="text-sm font-medium tracking-wide text-white/50">
                  Adicione uma foto institucional aqui
                </p>
                <p className="text-xs text-white/30">public/foto-institucional.jpg</p>
              </div>
            </div>

            {/* Card flutuante — estatística */}
            <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-5 border border-svp-border">
              <p className="text-svp-muted text-xs tracking-widest uppercase mb-1">Este mês</p>
              <p className="font-display text-svp-sienna text-3xl font-bold">R$ 4.900</p>
              <p className="text-svp-brown text-xs mt-1">em doações recebidas</p>
            </div>

            {/* Card flutuante — voluntários */}
            <div className="absolute -top-4 -right-4 bg-svp-forest text-white rounded-2xl p-4 shadow-xl">
              <p className="text-white/70 text-xs tracking-widest uppercase mb-1">Voluntários</p>
              <p className="font-display text-white text-3xl font-bold">24</p>
              <p className="text-white/70 text-xs mt-1">ativos na comunidade</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
