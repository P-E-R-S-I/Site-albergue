import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILARES = [
  {
    num: "01",
    titulo: "Cuidado integral",
    desc: "Acompanhamento médico, alimentação balanceada e assistência 24h para cada residente.",
  },
  {
    num: "02",
    titulo: "Transparência total",
    desc: "Cada doação e cada gasto registrado publicamente. Você decide como ajudar sabendo para onde vai.",
  },
  {
    num: "03",
    titulo: "Comunidade ativa",
    desc: "Voluntários, doadores e a comunidade de Jataí unidos em torno de uma missão comum.",
  },
];

export default function Missao() {
  return (
    <section className="bg-svp-cream py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Lado esquerdo — missão */}
        <div>
          <div className="flex items-center gap-2.5 mb-4" data-animate>
            <div className="h-[3px] w-7 bg-svp-sienna rounded-sm" />
            <span className="text-svp-sienna text-[10.5px] lg:text-xs tracking-[0.18em] uppercase font-bold">
              Nossa missão
            </span>
          </div>

          <h2
            className="font-display text-[28px] leading-[1.12] md:text-4xl lg:text-5xl text-svp-dark font-bold mb-4 lg:mb-5 lg:leading-tight"
            data-animate
            data-delay="1"
          >
            Acolhimento com{" "}
            <em className="text-svp-sienna not-italic">dignidade</em>{" "}
            e transparência
          </h2>

          <p className="text-svp-brown text-[14.5px] lg:text-base leading-relaxed mb-3" data-animate data-delay="2">
            O Albergue São Vicente de Paulo é uma instituição sem fins lucrativos dedicada a
            oferecer moradia, cuidado e qualidade de vida para idosos em situação de
            vulnerabilidade social na região de Jataí, Goiás.
          </p>
          <p className="text-svp-brown text-[14.5px] lg:text-base leading-relaxed mb-6 lg:mb-8" data-animate data-delay="3">
            Todas as nossas doações são registradas publicamente. Aqui você pode acompanhar
            em tempo real o que recebemos, o que gastamos e o que mais precisamos — porque
            acreditamos que a transparência é parte do cuidado.
          </p>

          <div className="flex flex-wrap items-center gap-2" data-animate data-delay="4">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-1.5 bg-svp-dark text-svp-cream font-semibold text-[13px] px-5 py-2.5 rounded-[10px] hover:bg-svp-brown transition-colors"
            >
              Ver transparência <ArrowRight size={13} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-svp-brown font-semibold text-[13px] px-3 py-2.5 hover:text-svp-sienna transition-colors"
            >
              Perguntas frequentes
            </Link>
          </div>
        </div>

        {/* Lado direito — 3 pilares em lista editorial numerada */}
        <div className="border-t-2 border-svp-dark" data-animate data-delay="2">
          {PILARES.map((item, i) => (
            <div
              key={i}
              className={`py-4 px-1 flex gap-3.5 items-baseline ${
                i < PILARES.length - 1 ? "border-b border-svp-border" : ""
              }`}
            >
              <span className="font-display text-[15px] text-svp-sienna font-bold flex-shrink-0 w-7">
                {item.num}
              </span>
              <div>
                <p className="font-bold text-svp-dark text-[14.5px] mb-0.5">{item.titulo}</p>
                <p className="text-svp-brown text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
