import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, MapPin, Clock, Phone, Gift } from "lucide-react";
import type { InfoAlbergue, EstatisticasAlbergue } from "@/lib/supabase";

export default function Hero({
  info,
  stats,
  doacaoMes,
}: {
  info: InfoAlbergue;
  stats: EstatisticasAlbergue;
  doacaoMes: string | null; // já formatado em BRL pelo servidor
}) {
  return (
    <>
      {/* Hero escuro com foto de fundo */}
      <section className="relative bg-svp-dark overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/foto-hero.jpg"
            alt=""
            fill
            className="object-cover opacity-[23%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-svp-dark/55 via-svp-dark/80 to-svp-dark" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 lg:px-8 pt-10 pb-24 lg:pt-20 lg:pb-32">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 bg-svp-amber/15 border border-svp-amber/40 px-3 py-1.5 rounded-full mb-5 lg:mb-7"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-svp-amber" />
              <span className="text-svp-gold text-[10px] lg:text-xs tracking-[0.14em] uppercase font-semibold">
                Jataí, Goiás · Desde {stats.anoFundacao}
              </span>
            </div>

            <h1
              className="font-display text-[40px] leading-[1.02] md:text-6xl lg:text-7xl text-svp-cream font-bold mb-4 lg:mb-6"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
            >
              Cuidado,{" "}
              <em className="text-svp-gold not-italic">dignidade</em>{" "}
              e esperança.
            </h1>

            <p
              className="text-svp-cream/80 text-[15px] lg:text-lg leading-relaxed max-w-lg mb-6 lg:mb-8"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
            >
              {info.missao}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-4"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
            >
              <Link
                href="/como-doar"
                className="flex items-center justify-center gap-2 bg-svp-amber text-svp-dark font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-svp-gold transition-colors"
              >
                <Heart size={16} />
                Quero fazer uma doação
              </Link>
              <Link
                href="/transparencia"
                className="flex items-center justify-center gap-2 border border-svp-cream/35 text-svp-cream font-semibold text-sm px-6 py-3.5 rounded-xl hover:border-svp-cream/70 transition-colors"
              >
                Ver transparência
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Card "Este mês" — só aparece quando há doações registradas no mês corrente */}
            {doacaoMes && (
              <div
                className="mt-6 inline-flex items-baseline gap-3 rounded-xl border border-svp-amber/40 bg-svp-amber/10 px-4 py-3"
                style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
              >
                <span className="text-svp-gold text-[10px] tracking-widest uppercase font-semibold">
                  Este mês
                </span>
                <span className="font-display text-svp-gold text-xl font-bold">{doacaoMes}</span>
                <span className="text-svp-cream/70 text-xs">em doações recebidas</span>
              </div>
            )}

            {/* Social proof — dados reais (banco) */}
            <div
              className="mt-8 flex items-center gap-4"
              style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both" }}
            >
              <div className="flex -space-x-2">
                {["#803320", "#2D5A27", "#B8892A", "#4A7E43"].map((color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-svp-dark flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {["D", "M", "A", "V"][i]}
                  </div>
                ))}
              </div>
              <p className="text-svp-cream/60 text-sm leading-tight">
                <strong className="text-svp-cream">{stats.idososAtendidos} idosos</strong> recebem
                cuidado todos os dias,<br />
                com o apoio de{" "}
                <strong className="text-svp-cream">{stats.voluntariosAtivos}+ voluntários</strong>
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Quick info card sobreposto ao hero — dados do site_config */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8 -mt-12 lg:-mt-16 mb-8 lg:mb-12">
        <div className="bg-white rounded-2xl shadow-[0_14px_34px_-14px_rgba(24,18,11,0.5)] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="p-4 lg:p-5 border-r border-b border-svp-linen lg:border-b-0">
              <MapPin size={17} className="text-svp-sienna mb-1.5" />
              <p className="text-[9px] tracking-[0.12em] uppercase text-svp-muted font-semibold mb-0.5">
                Endereço
              </p>
              <p className="text-xs text-svp-dark leading-snug">{info.endereco}</p>
            </div>
            <div className="p-4 lg:p-5 border-b border-svp-linen lg:border-b-0 lg:border-r">
              <Clock size={17} className="text-svp-forest mb-1.5" />
              <p className="text-[9px] tracking-[0.12em] uppercase text-svp-muted font-semibold mb-0.5">
                Visitas
              </p>
              <p className="text-xs text-svp-dark leading-snug">{info.horarioVisitas}</p>
            </div>
            <a
              href={`tel:${info.telefone.replace(/\D/g, "")}`}
              className="p-4 lg:p-5 border-r border-svp-linen block hover:bg-svp-cream/60 transition-colors"
            >
              <Phone size={17} className="text-svp-sienna mb-1.5" />
              <p className="text-[9px] tracking-[0.12em] uppercase text-svp-muted font-semibold mb-0.5">
                Telefone
              </p>
              <p className="text-xs text-svp-dark leading-snug">{info.telefone}</p>
            </a>
            <div className="p-4 lg:p-5">
              <Gift size={17} className="text-svp-amber mb-1.5" />
              <p className="text-[9px] tracking-[0.12em] uppercase text-svp-muted font-semibold mb-0.5">
                Doações
              </p>
              <p className="text-xs text-svp-dark leading-snug">{info.horarioDoacoes}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
